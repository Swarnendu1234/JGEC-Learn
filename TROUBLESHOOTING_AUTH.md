# 🔧 Authentication Troubleshooting Guide

## Quick Diagnostics

### Is Backend Running?
```bash
# Check if backend is running
curl http://localhost:3000/api/health
```
✅ Should return: `{"status":"ok",...}`
❌ If error: Backend is not running

### Is Frontend Running?
```bash
# Check if frontend is running
curl http://localhost:5173/
```
✅ Should return HTML
❌ If error: Frontend is not running

### Is MongoDB Connected?
Check backend console for:
```
✅ MongoDB connected successfully
```
❌ If you see connection errors, check MongoDB Atlas whitelist

---

## Common Issues & Solutions

### 1. "Network error" on Login/Signup

**Symptoms:**
- Login button shows "Network error"
- Signup fails with network error
- API calls fail

**Causes:**
- Backend server not running
- Backend running on wrong port
- CORS issues

**Solutions:**

**A. Check if backend is running:**
```bash
cd server
npm start
```

**B. Verify backend port:**
- Backend should run on port 3000
- Check server console: `Server URL: http://localhost:3000`

**C. Check CORS configuration:**
- Open `server/server.js`
- Verify CORS allows `http://localhost:5173`

**D. Clear browser cache:**
- Press Ctrl+Shift+Delete
- Clear cached images and files
- Restart browser

---

### 2. Can't Access /your-courses

**Symptoms:**
- Redirected to login when accessing /your-courses
- Even after login, can't access courses

**Causes:**
- Not logged in
- Token expired
- Token not stored properly

**Solutions:**

**A. Check if logged in:**
- Open DevTools (F12)
- Go to Application → Local Storage
- Check if `token` exists

**B. Verify token:**
- If token exists, try logging out and logging in again
- Token might be expired (7 days)

**C. Clear localStorage:**
```javascript
// In browser console
localStorage.clear()
// Then login again
```

---

### 3. OTP Not Received

**Symptoms:**
- Signup successful but no OTP email
- Waiting for OTP but nothing arrives

**Causes:**
- Email in spam folder
- Email service configuration issue
- Invalid email address

**Solutions:**

**A. Check spam folder:**
- Look in spam/junk folder
- Add sender to contacts

**B. Use "Resend Code" button:**
- Click "Resend Code" on OTP page
- Wait 1-2 minutes

**C. Check email configuration:**
- Open `server/.env`
- Verify EMAIL_USER and EMAIL_APP_PASSWORD are set

**D. Check backend console:**
- Look for: `✅ OTP sent to <email>: <code>`
- If you see the OTP in console, use that

---

### 4. Backend Shows HTML Page

**Symptoms:**
- Visiting http://localhost:3000/ shows HTML auth page
- Backend serving UI instead of APIs

**Causes:**
- Old code still running
- Browser cache
- Wrong server file

**Solutions:**

**A. Restart backend:**
```bash
# Stop backend (Ctrl+C)
cd server
npm start
```

**B. Clear browser cache:**
- Press Ctrl+Shift+Delete
- Clear everything
- Restart browser

**C. Verify server.js:**
- Open `server/server.js`
- Should NOT have: `app.use(express.static(...))`
- Should NOT have: `app.get('/', ...)`

---

### 5. "Token expired" Error

**Symptoms:**
- Logged out automatically
- "Token has expired" message
- Can't access protected routes

**Causes:**
- Token expired (7 days)
- System time changed
- Token invalidated

**Solutions:**

**A. Login again:**
- Simply login with your credentials
- New token will be issued

**B. Check system time:**
- Make sure system time is correct
- JWT tokens are time-sensitive

---

### 6. Infinite Redirect Loop

**Symptoms:**
- Page keeps redirecting
- Can't access any page
- Browser shows "Too many redirects"

**Causes:**
- AuthContext not loading properly
- Token validation failing
- Route configuration issue

**Solutions:**

**A. Clear localStorage:**
```javascript
// In browser console
localStorage.clear()
location.reload()
```

**B. Check browser console:**
- Open DevTools (F12)
- Look for error messages
- Fix any JavaScript errors

**C. Restart both servers:**
```bash
# Terminal 1
cd server
npm start

# Terminal 2
npm run dev
```

---

### 7. "User not found" on Login

**Symptoms:**
- Login fails with "User not found"
- Sure the credentials are correct

**Causes:**
- User not registered
- Email not verified
- Wrong database

**Solutions:**

**A. Verify email is verified:**
- Check if you completed OTP verification
- Try signup again if needed

**B. Check MongoDB:**
- Login to MongoDB Atlas
- Check if user exists in database
- Verify `isEmailVerified: true`

**C. Try signup again:**
- Use a different email
- Complete full signup flow

---

### 8. Protected Route Not Working

**Symptoms:**
- Can access /your-courses without login
- Protected routes not protected

**Causes:**
- ProtectedRoute not applied
- AuthContext not working
- Route configuration wrong

**Solutions:**

**A. Check main.jsx:**
- Open `src/main.jsx`
- Verify routes are wrapped with `<ProtectedRoute>`

**B. Check AuthProvider:**
- Verify `<AuthProvider>` wraps all routes
- Check if AuthContext is imported

**C. Clear cache and restart:**
```bash
# Stop frontend (Ctrl+C)
npm run dev
```

---

### 9. API Returns 401 Unauthorized

**Symptoms:**
- API calls fail with 401 error
- "No token provided" message
- Can't fetch courses

**Causes:**
- Token not sent with request
- Token invalid
- Authorization header missing

**Solutions:**

**A. Check if logged in:**
- Verify token exists in localStorage
- Login again if needed

**B. Check API calls:**
- Open `src/services/api.js`
- Verify Authorization header is added

**C. Check Network tab:**
- Open DevTools → Network
- Find API request
- Check if Authorization header is present

---

### 10. MongoDB Connection Failed

**Symptoms:**
- Backend shows "Failed to connect to MongoDB"
- Database operations fail
- Can't signup/login

**Causes:**
- MongoDB Atlas not accessible
- IP not whitelisted
- Wrong connection string

**Solutions:**

**A. Check MongoDB Atlas:**
- Login to MongoDB Atlas
- Go to Network Access
- Add your IP address (or use 0.0.0.0/0 for all)

**B. Verify connection string:**
- Open `server/.env`
- Check MONGODB_URI is correct
- No extra spaces or characters

**C. Test connection:**
```bash
cd server
node -e "require('./db.js').connectDB()"
```

---

### 11. Frontend Won't Start

**Symptoms:**
- `npm run dev` fails
- Port 5173 already in use
- Vite errors

**Causes:**
- Port already in use
- Dependencies not installed
- Node modules corrupted

**Solutions:**

**A. Kill existing process:**
```bash
# Windows
netstat -ano | findstr :5173
taskkill /PID <PID> /F

# Or just use different port
npm run dev -- --port 5174
```

**B. Reinstall dependencies:**
```bash
rm -rf node_modules package-lock.json
npm install
npm run dev
```

---

### 12. Backend Won't Start

**Symptoms:**
- `npm start` fails
- Port 3000 already in use
- Module errors

**Causes:**
- Port already in use
- Dependencies not installed
- Environment variables missing

**Solutions:**

**A. Kill existing process:**
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**B. Check .env file:**
```bash
cd server
# Make sure .env exists with all variables
```

**C. Reinstall dependencies:**
```bash
cd server
rm -rf node_modules package-lock.json
npm install
npm start
```

---

### 13. Styles Not Loading

**Symptoms:**
- Auth pages look broken
- No styling applied
- Plain HTML visible

**Causes:**
- CSS file not imported
- Build cache issue
- Path incorrect

**Solutions:**

**A. Check imports:**
- Open `src/pages/LoginPage.jsx`
- Verify: `import '../styles/AuthPages.css'`

**B. Clear Vite cache:**
```bash
rm -rf node_modules/.vite
npm run dev
```

**C. Hard refresh browser:**
- Press Ctrl+Shift+R
- Or Ctrl+F5

---

### 14. User Info Not Displaying

**Symptoms:**
- Shows "Guest User" or "User"
- Profile shows wrong name
- Avatar not loading

**Causes:**
- User data not loaded
- AuthContext not working
- Token invalid

**Solutions:**

**A. Check AuthContext:**
- Open browser console
- Look for auth errors
- Verify user object exists

**B. Re-login:**
- Logout and login again
- Fresh token will load user data

**C. Check API response:**
- Open DevTools → Network
- Find `/api/auth/me` request
- Verify user data is returned

---

### 15. OTP Verification Fails

**Symptoms:**
- "Invalid OTP" error
- Correct OTP not working
- Can't verify email

**Causes:**
- OTP expired (10 minutes)
- Wrong OTP entered
- Database issue

**Solutions:**

**A. Check OTP carefully:**
- Make sure all 6 digits are correct
- No spaces or extra characters

**B. Resend OTP:**
- Click "Resend Code"
- Use new OTP

**C. Check backend console:**
- Look for OTP in console logs
- Use that OTP if visible

**D. Check timer:**
- If timer shows 0, OTP expired
- Resend new OTP

---

## 🔍 Debug Mode

### Enable Detailed Logging

**Frontend:**
```javascript
// Add to src/main.jsx
console.log('Auth Debug:', {
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null')
})
```

**Backend:**
```javascript
// Add to server/server.js
app.use((req, res, next) => {
  console.log('Request:', {
    method: req.method,
    path: req.path,
    headers: req.headers,
    body: req.body
  })
  next()
})
```

---

## 📞 Still Having Issues?

### Check These Files:

1. **server/.env** - Environment variables
2. **server/server.js** - Backend configuration
3. **src/main.jsx** - Route configuration
4. **src/context/AuthContext.jsx** - Auth logic
5. **src/services/api.js** - API calls

### Useful Commands:

```bash
# Check Node version (should be 14+)
node --version

# Check npm version
npm --version

# Check if ports are in use
netstat -ano | findstr :3000
netstat -ano | findstr :5173

# Clear all caches
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

### Browser DevTools:

- **Console**: Check for JavaScript errors
- **Network**: Check API requests/responses
- **Application**: Check localStorage for token
- **Sources**: Debug JavaScript code

---

## ✅ Verification Steps

After fixing any issue:

1. [ ] Restart backend server
2. [ ] Restart frontend server
3. [ ] Clear browser cache
4. [ ] Clear localStorage
5. [ ] Try login/signup again
6. [ ] Check browser console for errors
7. [ ] Check backend console for errors

---

## 🎯 Quick Reset

If nothing works, try a complete reset:

```bash
# 1. Stop all servers (Ctrl+C)

# 2. Clear everything
rm -rf node_modules package-lock.json
cd server
rm -rf node_modules package-lock.json
cd ..

# 3. Reinstall
npm install
cd server
npm install
cd ..

# 4. Clear browser
# - Clear cache (Ctrl+Shift+Delete)
# - Clear localStorage (DevTools → Application)

# 5. Restart servers
cd server
npm start
# New terminal
npm run dev

# 6. Try again
# Open http://localhost:5173/
```

---

## 📧 Contact Support

If you're still stuck:

1. Check error messages in console
2. Take screenshots of errors
3. Note what you were trying to do
4. Check if backend/frontend are running
5. Verify MongoDB connection

Most issues are related to:
- Servers not running
- MongoDB not connected
- Browser cache
- Token expired

Good luck! 🚀
