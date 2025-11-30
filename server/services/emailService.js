import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

// Create transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_APP_PASSWORD
  }
});

// Generate random OTP (6 digits)
export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send OTP email
export const sendOTPEmail = async (email, otp, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🔐 Your Email Verification OTP - JGEC Learn',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0; text-align: center;">Email Verification</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 40px; border-radius: 0 0 10px 10px;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 30px;">
              Welcome to JGEC Learn! Please use the OTP below to verify your email address. 
              This OTP will expire in 10 minutes.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border: 2px solid #667eea; text-align: center; margin: 30px 0;">
              <p style="margin: 0; color: #333; font-size: 12px; text-transform: uppercase; letter-spacing: 2px;">Your OTP</p>
              <h1 style="margin: 15px 0 0 0; color: #667eea; font-size: 36px; letter-spacing: 5px; font-weight: bold;">
                ${otp}
              </h1>
            </div>
            
            <p style="color: #666; font-size: 13px; margin: 20px 0;">
              ⏰ <strong>Expires in:</strong> 10 minutes
            </p>
            
            <p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
              If you didn't request this OTP, please ignore this email or contact support immediately.
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              Best regards,<br/>
              <strong>JGEC Learn Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; color: #999; font-size: 11px; padding: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0;">© 2025 JGEC Learn. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✉️ OTP sent to ${email}`);
    return result;
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    throw new Error('Failed to send verification email');
  }
};

// Send welcome email after verification
export const sendWelcomeEmail = async (email, name) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: '🎉 Welcome to JGEC Learn!',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; border-radius: 10px 10px 0 0;">
            <h2 style="color: white; margin: 0; text-align: center;">Welcome to JGEC Learn</h2>
          </div>
          
          <div style="background: #f8f9fa; padding: 40px; border-radius: 0 0 10px 10px;">
            <p style="color: #333; font-size: 16px; margin-bottom: 20px;">
              Hi <strong>${name}</strong>,
            </p>
            
            <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
              🎓 Your email has been verified successfully! Welcome to JGEC Learn, 
              your gateway to premium learning experience.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea; margin: 20px 0;">
              <h3 style="color: #667eea; margin-top: 0;">What's Next?</h3>
              <ul style="color: #666; font-size: 14px; line-height: 1.8;">
                <li>✅ Explore our premium courses</li>
                <li>📚 Start your learning journey</li>
                <li>🏆 Earn certificates and badges</li>
                <li>💬 Join our learning community</li>
              </ul>
            </div>
            
            <p style="color: #999; font-size: 12px; border-top: 1px solid #ddd; padding-top: 20px; margin-top: 20px;">
              If you have any questions, feel free to reach out to our support team.
            </p>
            
            <p style="color: #999; font-size: 12px; margin-top: 20px;">
              Best regards,<br/>
              <strong>JGEC Learn Team</strong>
            </p>
          </div>
          
          <div style="text-align: center; color: #999; font-size: 11px; padding: 20px; border-top: 1px solid #ddd;">
            <p style="margin: 0;">© 2025 JGEC Learn. All rights reserved.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log(`✉️ Welcome email sent to ${email}`);
    return result;
  } catch (error) {
    console.error('❌ Error sending welcome email:', error.message);
    throw new Error('Failed to send welcome email');
  }
};
