# 🚀 QUICK START GUIDE

## ⚡ 30-Second Setup

### Windows
```cmd
start-all.bat
```

### PowerShell
```powershell
.\start-all.ps1
```

### Manual
```bash
# Terminal 1
cd server && node server.js

# Terminal 2
npm run dev
```

### Step 4: Terminal 2 - Frontend
```bash
npm run dev
# Runs on http://localhost:5173
```

### Step 5: Test
1. Open app → Find Admin button
2. Login: `admin@learningplatform.com` / `admin123`
3. Add a course → See it appear
4. Refresh page → Course still there! ✅

---

## 📋 Admin Panel Commands

| Action | Steps |
|--------|-------|
| **Login** | Click Admin button → Enter credentials |
| **Add Course** | Click "Add Course" → Fill form → Submit |
| **Remove Course** | Click "Remove" on any course |
| **Logout** | Click "Logout" button |

---

## 🔧 Database Commands

```bash
# Connect to MongoDB
mongosh

# Use database
use jgec-learn

# See all courses
db.courses.find()

# Count courses
db.courses.countDocuments()

# Delete all courses
db.courses.deleteMany({})

# Exit
exit
```

---

## 📁 Key Files

| File | Purpose |
|------|---------|
| `.env` | Configuration (MongoDB URI, Port) |
| `server/server.js` | Backend API |
| `src/App.jsx` | Main app (loads courses) |
| `src/components/AdminPanel.jsx` | Admin interface |
| `src/services/api.js` | API client |

---

## 🐛 Quick Fixes

| Problem | Fix |
|---------|-----|
| MongoDB not connecting | Start MongoDB service |
| Server not found | Run `npm run start` in server folder |
| Courses not persisting | Check MongoDB is running |
| Admin won't login | Check credentials in AdminPanel.jsx |
| Port already in use | Change PORT in .env or kill process |

---

## 📊 Default Data

**Admin Credentials**
- Email: `admin@learningplatform.com`
- Password: `admin123`

**MongoDB Connection**
- Host: `localhost:27017`
- Database: `jgec-learn`
- Collection: `courses`

**Server**
- Backend: `http://localhost:3000`
- Frontend: `http://localhost:5173`

---

## ✅ Checklist

- [ ] Installed server dependencies
- [ ] Created .env file
- [ ] MongoDB installed and running
- [ ] Backend started on port 3000
- [ ] Frontend started on port 5173
- [ ] Can see Admin button in app
- [ ] Can login to Admin Panel
- [ ] Can add a course
- [ ] Course persists after refresh
- [ ] Can remove a course
- [ ] Course gone after refresh

---

## 📞 Common Issues

**"Cannot find module"**  
→ Run `npm install` in server folder

**"Connection refused"**  
→ Start MongoDB service

**"Port already in use"**  
→ Change PORT in .env or restart computer

**"Admin panel won't open"**  
→ Check if Admin button exists in UI

**"Adding course fails"**  
→ Open browser console (F12) for error message

---

## 📚 Full Documentation

1. **CHANGES_SUMMARY.md** - What changed
2. **SETUP_GUIDE.md** - Detailed setup
3. **ARCHITECTURE.md** - System design
4. **TROUBLESHOOTING.md** - Common issues
5. **MONGODB_FIX.md** - Technical details

---

## 🎯 Core Workflow

```
Add Course
    ↓
Frontend validates → POST /api/courses
    ↓
Server saves to MongoDB
    ↓
Returns saved course
    ↓
Frontend updates state
    ↓
UI shows new course ✅
    ↓
Refresh page → Course still there ✅
```

---

## 🔄 API Reference

```javascript
// Fetch all courses
GET /api/courses
Response: [{id, title, badge, ...}, ...]

// Add new course
POST /api/courses
Body: {id, title, badge, progress, status, tags, image}
Response: {_id, id, title, ...}

// Delete course
DELETE /api/courses/:id
Response: {success: true}
```

---

## 🛑 Before You Start

1. ✅ Do you have Node.js installed?
2. ✅ Do you have MongoDB installed?
3. ✅ Are you in the correct project directory?
4. ✅ Did you read the SETUP_GUIDE.md?

If all yes → You're ready to go! 🚀

---

## 📱 Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Cmd+K` | Focus search (if implemented) |
| `Cmd+D` | Toggle dark mode |
| `Esc` | Clear search (if implemented) |

---

## 🎓 Learning Resources

- **Express.js**: Handling HTTP requests
- **MongoDB**: NoSQL database
- **Mongoose**: MongoDB object modeling
- **React**: Frontend component library
- **Vite**: Frontend build tool

---

## 🔒 Security Notes

⚠️ **For Development Only**

Current setup has hardcoded credentials.

For production:
- Use proper authentication (JWT, OAuth)
- Hash passwords (bcrypt)
- Validate inputs
- Use environment variables
- Enable HTTPS
- Add rate limiting

---

## 📞 Need Help?

1. Check TROUBLESHOOTING.md
2. Check browser console (F12)
3. Check server console logs
4. Check MongoDB with `mongosh`
5. Read ARCHITECTURE.md for system design

**Most common issue**: MongoDB not running!

---

## 🎉 You Did It!

Once courses start persisting → Everything is working! 🎊

Celebrate by:
1. ✅ Adding a course
2. ✅ Refreshing page
3. ✅ Seeing it still there
4. ✅ Doing a victory dance! 🕺💃
