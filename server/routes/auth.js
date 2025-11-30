import express from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { verifyToken } from '../middleware/auth.js';
import { generateOTP, sendOTPEmail, sendWelcomeEmail } from '../services/emailService.js';

const router = express.Router();

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d'
  });
};

// @route   POST /api/auth/signup
// @desc    Register a new user and send OTP
// @access  Public
router.post('/signup', async (req, res) => {
  try {
    const { name, email, username, password, confirmPassword } = req.body;

    // Validate required fields
    if (!name || !email || !username || !password || !confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required fields'
      });
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({
        success: false,
        message: 'Passwords do not match'
      });
    }

    // Check if user already exists
    let user = await User.findOne({
      $or: [{ email }, { username }]
    });

    if (user) {
      return res.status(400).json({
        success: false,
        message: 'User with this email or username already exists'
      });
    }

    // Generate OTP
    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Create new user
    user = new User({
      name,
      email,
      username,
      password,
      otp,
      otpExpiration,
      isEmailVerified: false
    });

    // Save user to database
    await user.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, name);
      console.log(`✅ OTP sent to ${email}: ${otp}`);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      // Don't fail the signup if email fails, but notify user
      return res.status(201).json({
        success: false,
        message: 'User created but failed to send OTP. Please contact support.',
        requiresOTP: true,
        email
      });
    }

    // Return success response
    res.status(201).json({
      success: true,
      message: 'User created successfully. Please check your email for OTP.',
      requiresOTP: true,
      email: email,
      userId: user._id
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error during signup'
    });
  }
});

// @route   POST /api/auth/verify-otp
// @desc    Verify OTP and activate account
// @access  Public
router.post('/verify-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Validate required fields
    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email and OTP'
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+otp +otpExpiration');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Check if OTP exists
    if (!user.otp) {
      return res.status(400).json({
        success: false,
        message: 'No OTP found. Please signup again.'
      });
    }

    // Check if OTP has expired
    if (new Date() > user.otpExpiration) {
      user.otp = undefined;
      user.otpExpiration = undefined;
      await user.save();
      
      return res.status(400).json({
        success: false,
        message: 'OTP has expired. Please signup again.'
      });
    }

    // Check if OTP matches
    if (user.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: 'Invalid OTP. Please try again.'
      });
    }

    // Mark email as verified
    user.isEmailVerified = true;
    user.otp = undefined;
    user.otpExpiration = undefined;
    await user.save();

    // Send welcome email
    try {
      await sendWelcomeEmail(email, user.name);
    } catch (emailError) {
      console.error('Error sending welcome email:', emailError);
    }

    // Generate token
    const token = generateToken(user._id);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Email verified successfully!',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error verifying OTP'
    });
  }
});

// @route   POST /api/auth/resend-otp
// @desc    Resend OTP to user email
// @access  Public
router.post('/resend-otp', async (req, res) => {
  try {
    const { email } = req.body;

    // Validate required field
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email'
      });
    }

    // Find user by email
    const user = await User.findOne({ email }).select('+otp +otpExpiration');

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Check if already verified
    if (user.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: 'Email is already verified'
      });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiration = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    user.otp = otp;
    user.otpExpiration = otpExpiration;
    await user.save();

    // Send OTP email
    try {
      await sendOTPEmail(email, otp, user.name);
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      return res.status(500).json({
        success: false,
        message: 'Failed to send OTP email'
      });
    }

    res.status(200).json({
      success: true,
      message: 'OTP sent successfully. Check your email.',
      email
    });
  } catch (error) {
    console.error('Resend OTP error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error resending OTP'
    });
  }
});

// @route   POST /api/auth/login
// @desc    Login user (requires email verification)
// @access  Public
router.post('/login', async (req, res) => {
  try {
    const { emailOrUsername, password } = req.body;

    // Validate required fields
    if (!emailOrUsername || !password) {
      return res.status(400).json({
        success: false,
        message: 'Please provide email/username and password'
      });
    }

    // Find user by email or username
    const user = await User.findOne({
      $or: [{ email: emailOrUsername }, { username: emailOrUsername }]
    }).select('+password');

    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Check if email is verified
    if (!user.isEmailVerified) {
      return res.status(403).json({
        success: false,
        message: 'Please verify your email first',
        requiresOTP: true,
        email: user.email
      });
    }

    // Check password
    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }

    // Generate token
    const token = generateToken(user._id);

    // Return success response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: error.message || 'Error during login'
    });
  }
});

// @route   GET /api/auth/me
// @desc    Get current user (requires token)
// @access  Private
router.get('/me', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        isEmailVerified: user.isEmailVerified
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching user data'
    });
  }
});

// @route   POST /api/auth/logout
// @desc    Logout user (client-side token removal)
// @access  Private
router.post('/logout', verifyToken, (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Logged out successfully. Please remove token from client.'
  });
});

export default router;
