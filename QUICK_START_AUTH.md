# Quick Start Guide - Authentication Fixed

## ✅ What's Fixed

1. **Authentication pages now run ONLY on frontend** (http://localhost:5173/)
2. **Backend serves ONLY APIs** (http://localhost:3000/)
3. **Your Courses page is fully protected** - requires login
4. **Automatic redirect to login** if user tries to access protected pages

## 🚀 How to Start

### Step 1: Start Backend Server
```bash
cd server
npm start
```
✅ Backend running on: **http://localhost:3000/**

### Step 2: Start Frontend (New Terminal)
```bash
npm run dev
```
✅ Frontend running on: **http://localhost:5173/**

### Step 3: Open Browser
Navigate to: **http://localhost:5173/**

You'll see the **Login Page** 🎉

## 📝 Testing the Flow

### 1. Create New Account
- Click "Create Account" on login page
- Fill in all fields (name, email, username, password)
- Click "Create Account"
- Check your email for 6-digit OTP
- Enter OTP and verify
- ✅ You'll be logged in and redirected to Your Courses

### 2. Login with Existing Account
- Enter email/username and password
- Click "Sign In"
- ✅ Redirected to Your Courses page

### 3. Try Accessing Protected Route Without Login
- Logout from the app
- Try to visit: http://localhost:5173/your-courses
- ✅ Automatically redirected to login page
- After login, you'll be redirected back to Your Courses

### 4. Logout
- Click on your profile avatar (top right)
- Click "Logout"
- ✅ Redirected to login page

## 🔒 Security Features

✅ JWT token authentication
✅ Email verification with OTP
✅ Protected routes (can't access without login)
✅ Automatic token validation
✅ Secure password storage (bcrypt)
✅ Token expiration (7 days)

## 📍 Important URLs

| Service | URL | Purpose |
|---------|-----|---------|
| Frontend | http://localhost:5173/ | Login, Signup, Your Courses |
| Backend | http://localhost:3000/ | APIs only (no UI) |
| Login Page | http://localhost:5173/login | User login |
| Signup Page | http://localhost:5173/signup | User registration |
| Your Courses | http://localhost:5173/your-courses | Protected - requires login |

## 🎯 Key Changes

### Before:
- ❌ Auth pages on http://localhost:3000/ (backend)
- ❌ Your Courses accessible without login
- ❌ Backend serving HTML pages

### After:
- ✅ Auth pages on http://localhost:5173/ (frontend)
- ✅ Your Courses requires login (protected route)
- ✅ Backend only serves APIs

## 🐛 Troubleshooting

### Issue: "Network error" on login/signup
**Solution**: Make sure backend server is running on port 3000

### Issue: Can't access Your Courses
**Solution**: You need to login first. The page is now protected.

### Issue: OTP not received
**Solution**: Check your email spam folder or use the "Resend Code" button

### Issue: Token expired
**Solution**: Login again. Tokens expire after 7 days.

## 📧 Email Configuration

The backend uses Gmail SMTP for sending OTP emails.
Email credentials are in `server/.env`:
```
EMAIL_USER=swarnendumajumder099@gmail.com
EMAIL_APP_PASSWORD=cnyugaxzmrpdeifz
```

## 🎉 Success!

Your authentication system is now properly configured:
- ✅ Frontend handles all UI (port 5173)
- ✅ Backend handles all APIs (port 3000)
- ✅ Protected routes work correctly
- ✅ Login/Signup flow is seamless
- ✅ Email verification with OTP

Enjoy your secure learning platform! 🚀
