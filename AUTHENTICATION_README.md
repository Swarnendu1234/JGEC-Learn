# 🔐 JGEC Learn - Complete Authentication System

A **production-ready** authentication system with JWT, MongoDB, and secure password hashing.

## ✨ Features

✅ **User Registration** - Sign up with validation  
✅ **User Login** - Email or username login  
✅ **JWT Authentication** - Secure token-based auth  
✅ **Password Hashing** - bcryptjs with salt rounds  
✅ **MongoDB Integration** - Mongoose models  
✅ **CORS Enabled** - Cross-origin requests  
✅ **Protected Routes** - Middleware verification  
✅ **Error Handling** - Proper HTTP status codes  
✅ **Environment Config** - .env file support  
✅ **Beautiful UI** - Modern responsive design  

## 📦 Tech Stack

**Backend:**
- Node.js + Express.js
- MongoDB + Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

**Frontend:**
- HTML5
- CSS3 (Responsive Design)
- JavaScript (Fetch API)
- LocalStorage (Token Management)

## 🗂️ Project Structure

```
jgec-learn/
├── server/
│   ├── models/
│   │   └── User.js              # MongoDB User schema
│   ├── routes/
│   │   └── auth.js              # Auth endpoints
│   ├── middleware/
│   │   └── auth.js              # JWT verification
│   ├── server.js                # Express app
│   ├── package.json             # Dependencies
│   └── .env                      # Config
├── public/
│   ├── auth_page.html           # Login/Signup UI
│   └── dashboard.html           # Post-login page
├── AUTH_SETUP_GUIDE.md          # Detailed setup
├── start-auth-server.bat        # Windows start script
└── start-auth-server.ps1        # PowerShell script
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14+)
- MongoDB (local or Atlas)

### Installation

**1. Install Dependencies**
```bash
cd server
npm install
```

**2. Start MongoDB**
```bash
# Local MongoDB
mongod

# Or use MongoDB Atlas (set MONGODB_URI in .env)
```

**3. Start Server**
```bash
npm start
```

**4. Open Browser**
```
http://localhost:5000
```

### Using Start Scripts

**Windows (Command Prompt):**
```bash
start-auth-server.bat
```

**Windows (PowerShell):**
```powershell
.\start-auth-server.ps1
```

## 📖 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### 1. Register User
```
POST /auth/signup

Body:
{
  "name": "John Doe",
  "email": "john@example.com",
  "username": "johndoe",
  "password": "Password123",
  "confirmPassword": "Password123"
}

Response (201):
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

#### 2. Login User
```
POST /auth/login

Body:
{
  "emailOrUsername": "john@example.com",
  "password": "Password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": { ... }
}
```

#### 3. Get Current User
```
GET /auth/me
Headers:
  Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "user": { ... }
}
```

#### 4. Logout
```
POST /auth/logout
Headers:
  Authorization: Bearer <token>

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

#### 5. Health Check
```
GET /health

Response (200):
{
  "status": "ok",
  "timestamp": "2024-11-30T12:00:00.000Z",
  "database": "MongoDB"
}
```

## 🔒 Security

- **Password Hashing:** bcryptjs with 10 salt rounds
- **JWT Tokens:** Signed with secret, expires in 7 days
- **Input Validation:** Email, username, password validation
- **Database Constraints:** Unique email/username enforcement
- **CORS Protection:** Configured origin whitelist
- **Error Handling:** No sensitive data in responses

## 💾 Database Schema

```javascript
User {
  _id: ObjectId,
  name: String (2-50 chars),
  email: String (unique, valid email),
  username: String (unique, 3-30 chars, alphanumeric + _-),
  password: String (hashed, 6+ chars),
  createdAt: Date
}
```

## 🧪 Testing

### With cURL

**Register:**
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

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "emailOrUsername": "test@example.com",
    "password": "Test123!"
  }'
```

**Get User:**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer <your_token>"
```

### With Browser
1. Visit `http://localhost:5000`
2. Fill signup form
3. Click "Create Account"
4. Should redirect to dashboard

## 🐛 Troubleshooting

| Problem | Solution |
|---------|----------|
| Cannot connect to MongoDB | Start MongoDB or check MONGODB_URI in .env |
| Port 5000 already in use | Kill process: `netstat -ano \| findstr :5000` |
| CORS error | Check CORS_ORIGIN in .env matches frontend URL |
| Token expired | Login again (expires after 7 days) |
| Invalid credentials | Check email/username and password |

## 📝 Environment Variables

Create `.env` file in `/server`:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/jgec-learn
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Production Deployment

### Before Deploying:
- [ ] Change JWT_SECRET to strong random string
- [ ] Set NODE_ENV=production
- [ ] Use production MongoDB (Atlas)
- [ ] Enable HTTPS
- [ ] Set correct CORS_ORIGIN
- [ ] Add rate limiting
- [ ] Enable error monitoring
- [ ] Test all endpoints

### Deploy to Heroku

```bash
# Install Heroku CLI
heroku login
heroku create your-app-name

# Set environment variables
heroku config:set JWT_SECRET=your_secret
heroku config:set MONGODB_URI=your_mongodb_uri

# Deploy
git push heroku main
```

## 📚 Frontend Integration

The HTML form (`auth_page.html`) includes:

1. **Login Form** - Email/Username + Password
2. **Signup Form** - Full registration
3. **Fetch Integration** - API calls with error handling
4. **Token Management** - LocalStorage handling
5. **Auto-redirect** - Dashboard after login

### Usage in Your App

```javascript
// Get token
const token = localStorage.getItem('authToken');

// Make authenticated request
const response = await fetch('http://localhost:5000/api/auth/me', {
  headers: {
    'Authorization': `Bearer ${token}`
  }
});

// Clear on logout
localStorage.removeItem('authToken');
localStorage.removeItem('user');
```

## 🔄 Authentication Flow

```
┌─────────────────────────────────────────┐
│          User Registration              │
├─────────────────────────────────────────┤
│ User → Signup Form                      │
│ ↓                                       │
│ Validation (client-side)                │
│ ↓                                       │
│ POST /api/auth/signup                   │
│ ↓                                       │
│ Server Validation + Hash Password       │
│ ↓                                       │
│ Save to MongoDB                         │
│ ↓                                       │
│ Generate JWT Token                      │
│ ↓                                       │
│ Return Token + User Data                │
│ ↓                                       │
│ Client saves token in localStorage      │
│ ↓                                       │
│ Redirect to Dashboard                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│           User Login                    │
├─────────────────────────────────────────┤
│ User → Login Form                       │
│ ↓                                       │
│ POST /api/auth/login                    │
│ ↓                                       │
│ Find User by Email/Username             │
│ ↓                                       │
│ Compare Password (bcrypt)               │
│ ↓                                       │
│ Generate JWT Token                      │
│ ↓                                       │
│ Return Token + User Data                │
│ ↓                                       │
│ Client saves token in localStorage      │
│ ↓                                       │
│ Redirect to Dashboard                   │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Protected Route Access             │
├─────────────────────────────────────────┤
│ Client sends: Authorization: Bearer ... │
│ ↓                                       │
│ verifyToken Middleware                  │
│ ↓                                       │
│ Extract & Verify Token                  │
│ ↓                                       │
│ Token Valid? → Proceed                  │
│ Token Invalid? → Return 401             │
│ ↓                                       │
│ Process Request                         │
│ ↓                                       │
│ Return Response                         │
└─────────────────────────────────────────┘
```

## 📊 Database Connection

### MongoDB Local
```javascript
mongodb://localhost:27017/jgec-learn
```

### MongoDB Atlas
```javascript
mongodb+srv://username:password@cluster.mongodb.net/jgec-learn?retryWrites=true&w=majority
```

## 🎯 What's Next?

1. **Email Verification** - Verify email on signup
2. **Password Reset** - Forgot password flow
3. **Social Login** - Google, GitHub OAuth
4. **Two-Factor Auth** - SMS/Authenticator
5. **User Profile** - Update profile endpoint
6. **Admin Panel** - Manage users

## 📞 Support

For issues:
1. Check `AUTH_SETUP_GUIDE.md`
2. Review error messages
3. Check browser console
4. Verify server logs
5. Ensure MongoDB is running

## 📄 License

MIT License - Feel free to use in your projects

## 🙏 Credits

Built with ❤️ for JGEC Learn Platform

---

**Status:** ✅ Production Ready  
**Last Updated:** November 30, 2024  
**Version:** 1.0.0
