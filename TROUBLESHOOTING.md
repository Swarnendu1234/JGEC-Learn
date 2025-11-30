# FAQ & Troubleshooting

## Q1: Courses are being added but disappearing after refresh
**Problem**: Changes aren't persisting in MongoDB
**Solutions**:
1. Check MongoDB is running: `mongosh`
2. Verify `.env` has correct URI: `mongodb://localhost:27017/jgec-learn`
3. Check server console for errors
4. Use `mongosh` to verify courses are actually in database

## Q2: Getting "Cannot find module 'mongoose'" error
**Problem**: Server dependencies not installed
**Solution**:
```bash
cd server
npm install
```

## Q3: Admin Panel not showing
**Problem**: Admin button or panel not accessible
**Solutions**:
1. Check if there's an admin button in the UI
2. Check `src/pages/AdminPage.jsx` for admin panel route
3. Verify AdminPanel component is being imported

## Q4: "Error adding course: Network error"
**Problem**: Frontend cannot reach backend
**Solutions**:
1. Verify backend is running: `npm run start` in server folder
2. Check API URL in `src/services/api.js` matches backend port (default 3000)
3. Verify CORS is enabled in `server/server.js`
4. Check firewall isn't blocking port 3000

## Q5: MongoDB connection keeps timing out
**Problem**: MongoDB service not running
**Solutions**:

**Windows**:
- Install from: https://www.mongodb.com/try/download/community
- Open Services (services.msc)
- Find "MongoDB Server"
- Right-click → Start

**Mac/Linux**:
```bash
brew services start mongodb-community
# or
sudo systemctl start mongod
```

Check with: `mongosh` in terminal

## Q6: Want to reset all courses
**Problem**: Need to clear database and start fresh
**Solution**:
```bash
cd server
npm run seed
```

This will:
1. Delete all existing courses
2. Insert sample courses from `seedDatabase.js`

## Q7: Want to change admin credentials
**Location**: `src/components/AdminPanel.jsx` (lines 24-25)
```javascript
const ADMIN_EMAIL = 'admin@learningplatform.com';
const ADMIN_PASSWORD = 'admin123';
```

## Q8: Courses loading very slowly
**Causes**:
- MongoDB on slow disk
- Network latency
- Too many courses in database

**Solutions**:
1. Use `mongosh` to check database size:
   ```
   use jgec-learn
   db.courses.countDocuments()
   ```
2. Check MongoDB indexes (advanced)
3. Consider pagination for large datasets

## Q9: Can't connect to MongoDB locally but need to use cloud
**Problem**: Need MongoDB Atlas or cloud MongoDB
**Solution**: 
Update `.env`:
```
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/jgec-learn
```

Note: 
- Replace `username` and `password`
- Replace `cluster0.xxxxx` with your Atlas URL
- May need to whitelist IP in Atlas dashboard

## Q10: Getting CORS error
**Problem**: Frontend blocked from calling backend
**Already Fixed**: CORS is enabled in `server/server.js` (line 6)
**If still having issues**:
1. Verify backend URL in `api.js` is correct
2. Check if backend is actually running
3. Check browser console (F12) for exact error

## Command Reference

### Start Backend
```bash
cd server
npm install  # First time only
npm run start
```

### Start Frontend
```bash
npm install  # First time only
npm run dev
```

### Seed Database
```bash
cd server
npm run seed
```

### Check MongoDB
```bash
mongosh
> use jgec-learn
> db.courses.find()
> db.courses.countDocuments()
```

### Check if Server is Running
```bash
# Should return course data
curl http://localhost:3000/api/courses
```

## Performance Notes

- First load might be slow as MongoDB connects
- Courses are cached in frontend state
- Each add/remove triggers UI update
- No pagination implemented (ok for <1000 courses)

## Security Notes

⚠️ **Current Implementation is for Development Only**:
- Admin credentials are hardcoded (should use real auth)
- No password hashing (use bcrypt in production)
- No input validation for XSS (use validators)
- No rate limiting (add in production)

To improve for production:
1. Use JWT tokens instead of hardcoded credentials
2. Hash passwords with bcrypt
3. Add input validation
4. Implement rate limiting
5. Use HTTPS
6. Hide MongoDB credentials

## Files Modified

1. ✅ `server/server.js` - Added error handling
2. ✅ `src/components/AdminPanel.jsx` - Added validation & errors
3. ✅ `src/App.jsx` - Improved data loading
4. ✅ `.env` - Created with config
5. ✅ `MONGODB_FIX.md` - Created documentation
6. ✅ `SETUP_GUIDE.md` - Created setup instructions

All changes are backward compatible and non-breaking.
