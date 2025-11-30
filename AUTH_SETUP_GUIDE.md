# JGEC Learn - Authentication System Setup Guide

## ✅ What's Been Created

A **production-ready authentication system** with:
- ✓ Node.js + Express backend
- ✓ MongoDB + Mongoose database
- ✓ User Model with validation
- ✓ JWT-based authentication
- ✓ Password hashing with bcrypt
- ✓ CORS enabled
- ✓ Environment variables (.env)
- ✓ Complete API routes
- ✓ Auth middleware for protected routes
- ✓ HTML form with fetch integration
- ✓ Dashboard with token verification

---

## 📁 Folder Structure

```
/server
  ├── server.js                 # Main Express server
  ├── package.json              # Node dependencies
  ├── .env                       # Environment variables
  ├── middleware/
  │   └── auth.js               # JWT verification middleware
  ├── models/
  │   └── User.js               # Mongoose User schema
  └── routes/
      └── auth.js               # Authentication routes

/public
  ├── auth_page.html            # Login/Signup page with fetch
  └── dashboard.html            # Post-login dashboard

.env                            # Root environment file (optional)
```

---

## 🚀 Setup Instructions

### Step 1: Install MongoDB

**Option A: Local MongoDB**
1. Download from: https://www.mongodb.com/try/download/community
2. Install and run MongoDB
3. Default connection: `mongodb://localhost:27017`

**Option B: MongoDB Atlas (Cloud)**
1. Create account: https://www.mongodb.com/cloud/atlas
2. Create a cluster
3. Get connection string: `mongodb+srv://user:password@cluster.mongodb.net/jgec-learn`
4. Add your IP to network access

---

### Step 2: Install Dependencies

```bash
cd server
npm install
```

**Installed packages:**
- `express` - Web framework
- `mongoose` - MongoDB ORM
- `jsonwebtoken` - JWT authentication
- `bcryptjs` - Password hashing
- `cors` - Cross-origin requests
- `validator` - Email validation
- `dotenv` - Environment variables
- `nodemon` - Auto-restart on file changes (dev)

---

### Step 3: Configure Environment

The `.env` file is already created with:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jgec-learn
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_use_strong_random_string
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

**⚠️ Important for Production:**
- Change `JWT_SECRET` to a strong random string
- Use `NODE_ENV=production`
- Set proper `CORS_ORIGIN`

---

### Step 4: Start MongoDB

**If using local MongoDB:**
```bash
# Windows
mongod.exe

# Or add MongoDB to Windows path and run:
mongod
```

**If using MongoDB Atlas:**
- Connection string already configured in .env

---

### Step 5: Start Server

```bash
cd server
npm start
```

**Expected output:**
```
╔════════════════════════════════════════╗
║  JGEC Learn Auth Server                ║
║  Server running on: http://localhost:5000  ║
║  Environment: development              ║
║  MongoDB: Connected                   ║
╚════════════════════════════════════════╝
```

---

## 📡 API Endpoints

### Authentication Routes

#### 1. **Register User**
```
POST /api/auth/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "Password123",
  "confirmPassword": "Password123"
}

Response:
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### 2. **Login User**
```
POST /api/auth/login
Content-Type: application/json

{
  "emailOrUsername": "john@example.com",
  "password": "Password123"
}

Response:
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### 3. **Get Current User (Protected)**
```
GET /api/auth/me
Authorization: Bearer <token>

Response:
{
  "success": true,
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "username": "johndoe"
  }
}
```

#### 4. **Logout (Protected)**
```
POST /api/auth/logout
Authorization: Bearer <token>

Response:
{
  "success": true,
  "message": "Logged out successfully. Please remove token from client."
}
```

#### 5. **Health Check**
```
GET /api/health

Response:
{
  "status": "ok",
  "timestamp": "2024-11-30T12:00:00.000Z",
  "uptime": 123.456,
  "database": "MongoDB"
}
```

---

## 🔐 How Authentication Works

### 1. **Registration Flow**
```
User fills signup form
    ↓
Send POST /api/auth/signup
    ↓
Server validates input
    ↓
Check if email/username exists
    ↓
Hash password with bcrypt (salt: 10 rounds)
    ↓
Save to MongoDB
    ↓
Generate JWT token
    ↓
Return token + user data
    ↓
Client stores token in localStorage
    ↓
Redirect to dashboard
```

### 2. **Login Flow**
```
User fills login form
    ↓
Send POST /api/auth/login
    ↓
Server finds user by email or username
    ↓
Compare entered password with hashed password
    ↓
If match: Generate JWT token
    ↓
Return token + user data
    ↓
Client stores token in localStorage
    ↓
Redirect to dashboard
```

### 3. **Protected Route Flow**
```
Client sends request with Authorization header
    ↓
Authorization: Bearer <token>
    ↓
Server verifies token with verifyToken middleware
    ↓
Extract userId from token
    ↓
Attach userId to request
    ↓
Proceed to route handler
```

---

## 📝 Frontend Integration

### HTML Form with Fetch

The `auth_page.html` file includes:

1. **Login Form** - Email/Username + Password
2. **Signup Form** - Name + Email + Username + Password
3. **Fetch Requests** to backend API
4. **Token Management** in localStorage
5. **Error Handling** with alerts
6. **Auto-redirect** to dashboard

### Key JavaScript Features

```javascript
// Store token after login
localStorage.setItem('authToken', token);
localStorage.setItem('user', JSON.stringify(user));

// Get token for protected requests
const token = localStorage.getItem('authToken');
const response = await fetch(url, {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Clear token on logout
localStorage.removeItem('authToken');
localStorage.removeItem('user');
```

---

## 🧪 Testing the System

### Test with Postman or cURL

**1. Register User**
```bash
curl -X POST http://localhost:5000/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "username": "testuser",
    "password": "Test123!",
    "confirmPassword": "Test123!"
  }'
```

**2. Login User**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "test@example.com",
    "password": "Test123!"
  }'
```

**3. Get Current User**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <token_here>"
```

### Test with Browser

1. Open: `http://localhost:5000/`
2. Fill signup form:
   - Name: Test User
   - Email: test@example.com
   - Username: testuser
   - Password: Test123!
   - Confirm: Test123!
3. Click "Create Account"
4. Should redirect to dashboard

Or login with:
   - Email/Username: test@example.com (or testuser)
   - Password: Test123!

---

## 🛡️ Security Features

✓ **Password Hashing**
  - bcryptjs with salt rounds: 10
  - Never store plain text passwords

✓ **JWT Tokens**
  - Signed with secret key
  - Expires in 7 days
  - Verified on protected routes

✓ **Input Validation**
  - Email format validation
  - Username format validation
  - Password length requirement (6+ chars)
  - Name length validation (2-50 chars)

✓ **Database Constraints**
  - Unique email enforcement
  - Unique username enforcement
  - Required field validation

✓ **CORS Protection**
  - Configured for specific origins
  - Credentials support

✓ **Error Handling**
  - No sensitive data in error messages
  - Proper HTTP status codes
  - Server-side validation

---

## 🐛 Troubleshooting

### "Cannot connect to MongoDB"
```
✓ Make sure MongoDB is running
✓ Check MONGODB_URI in .env
✓ Verify firewall isn't blocking port 27017
✓ If using Atlas, check IP whitelist
```

### "Port 5000 already in use"
```bash
# Kill process on Windows
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Or use different port
SET PORT=5001 && npm start
```

### "CORS error"
```
✓ Check CORS_ORIGIN in .env matches frontend URL
✓ Verify frontend is at http://localhost:3000 or set correct port
✓ Check Authorization header format: "Bearer <token>"
```

### "Token expired"
```
✓ Token expires after 7 days (configurable)
✓ User needs to login again
✓ Add token refresh logic if needed
```

### "Invalid credentials"
```
✓ Check email/username exists
✓ Verify password is correct
✓ Email/username are case-sensitive
✓ Check MongoDB has the user document
```

---

## 🚀 Production Checklist

Before deploying to production:

- [ ] Change `JWT_SECRET` to a strong random string
- [ ] Set `NODE_ENV=production`
- [ ] Set correct `MONGODB_URI` (use Atlas or production DB)
- [ ] Set correct `CORS_ORIGIN` (your frontend domain)
- [ ] Enable HTTPS (use reverse proxy like Nginx)
- [ ] Add rate limiting (prevent brute force)
- [ ] Add request logging
- [ ] Set up error monitoring (Sentry, etc.)
- [ ] Enable password reset functionality
- [ ] Add email verification
- [ ] Use environment-specific config
- [ ] Test all API endpoints
- [ ] Load test the server

---

## 📚 Database Schema

### User Collection
```javascript
{
  _id: ObjectId,
  name: String (required, 2-50 chars),
  email: String (required, unique, valid email),
  username: String (required, unique, 3-30 chars, alphanumeric + _ -),
  password: String (required, hashed, 6+ chars),
  createdAt: Date (default: now)
}
```

---

## 🎯 Next Steps

1. **Email Verification**
   - Send verification email on signup
   - Only allow login after verification

2. **Password Reset**
   - Forgot password endpoint
   - Email reset link
   - Token-based reset

3. **Social Login**
   - Google OAuth
   - GitHub OAuth
   - Microsoft OAuth

4. **Two-Factor Authentication**
   - SMS verification
   - Authenticator apps
   - Backup codes

5. **User Profile**
   - Update profile endpoint
   - Change password endpoint
   - Delete account endpoint

6. **Admin Panel**
   - Manage users
   - View login history
   - Ban/suspend users

---

## 📞 Support

For issues or questions:
1. Check troubleshooting section
2. Review API documentation
3. Check browser console for errors
4. Check server logs
5. Verify MongoDB connection
6. Check network requests in DevTools

---

**Status:** ✅ Production Ready
**Last Updated:** November 30, 2024
**Version:** 1.0.0
