# 📚 Learning Platform - Complete Setup Guide

## ✅ System Status

Your frontend and backend are now **fully integrated and working**!

### Current Setup
- ✅ **Frontend**: React with Vite on `http://localhost:5173`
- ✅ **Backend**: Express.js on `http://localhost:3000`
- ✅ **Database**: File-based JSON storage (`server/courses.json`)
- ✅ **CORS**: Properly configured for localhost communication
- ✅ **Error Handling**: ErrorBoundary prevents blank UI
- ✅ **Proxy Setup**: Vite automatically proxies API calls

---

## 🚀 How to Run

### Quickest Way (Automated)

**Option A: Windows Batch**
```bash
start-all.bat
```

**Option B: PowerShell**
```powershell
.\start-all.ps1
```

Both scripts will:
1. Install dependencies (if not already installed)
2. Start backend server in a new terminal
3. Start frontend server in a new terminal

### Manual Way (For Development)

**Terminal 1 - Backend:**
```bash
cd server
npm install    # First time only
node server.js
```

**Terminal 2 - Frontend:**
```bash
npm install    # First time only
npm run dev
```

---

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│              http://localhost:5173                      │
├─────────────────────────────────────────────────────────┤
│                                                          │
│    React App + Vite + Error Boundary                   │
│                                                          │
│    API calls: /api/courses (relative URLs)             │
│                                                          │
└──────────────┬──────────────────────────────────────────┘
               │
               │ Vite Proxy: /api/* → http://localhost:3000/api/*
               │ CORS enabled
               │
┌──────────────▼──────────────────────────────────────────┐
│              EXPRESS.JS BACKEND                         │
│             http://localhost:3000                       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│    GET    /api/courses      - Fetch all courses       │
│    POST   /api/courses      - Add new course          │
│    DELETE /api/courses/:id  - Remove course           │
│    GET    /api/health       - Server status           │
│                                                          │
└──────────────┬──────────────────────────────────────────┘
               │
               │ File I/O
               │
┌──────────────▼──────────────────────────────────────────┐
│         FILE-BASED DATABASE                            │
│        server/courses.json                             │
├─────────────────────────────────────────────────────────┤
│                                                          │
│    [                                                   │
│      {                                                 │
│        id: 1,                                          │
│        title: "Course Title",                          │
│        badge: "University",                            │
│        progress: 45,                                   │
│        status: "active",                               │
│        tags: ["tag1", "tag2"],                        │
│        image: "url..."                                │
│      },                                                │
│      ...                                               │
│    ]                                                   │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

---

## 🔧 Configuration Files

### 1. `vite.config.js` - Frontend Build & Proxy

```javascript
server: {
    port: 5173,
    proxy: {
        '/api': {
            target: 'http://localhost:3000',
            changeOrigin: true
        }
    }
}
```

**What it does:**
- Runs frontend on port 5173
- Proxies `/api/*` requests to backend
- Avoids CORS issues in development

### 2. `src/services/api.js` - API Communication

```javascript
const API_BASE = '/api';

// Uses relative URLs - safe for both dev and production
const response = await fetch(`${API_BASE}/courses`);
```

**What it does:**
- Centralizes all API calls
- Uses relative URLs to leverage Vite's proxy
- Includes comprehensive error logging
- Provides helpful error messages

### 3. `server/server.js` - Backend Server

```javascript
app.use(cors(corsOptions)); // CORS enabled
app.listen(3000, '0.0.0.0'); // Listens on all interfaces
```

**What it does:**
- Runs Express.js server on port 3000
- Enables CORS for localhost requests
- Provides CRUD endpoints for courses
- Uses file-based storage (courses.json)

---

## 🎯 URLs and Endpoints

| Component | URL | Purpose |
|-----------|-----|---------|
| **Frontend** | `http://localhost:5173` | Main app |
| **Admin Panel** | `http://localhost:5173/admin` | Manage courses |
| **Backend** | `http://localhost:3000` | API server |
| **Health Check** | `http://localhost:3000/api/health` | Server status |
| **Get Courses** | `http://localhost:3000/api/courses` | Fetch all courses |

---

## 📱 Features

### ✨ Frontend Features
- 🎨 Dark/Light mode toggle
- 🔍 Course search and filtering
- 📊 Progress tracking
- 🏆 Achievement badges
- 💬 AI Chatbot
- 📝 Admin panel for course management

### 🔧 Backend Features
- 📥 Course CRUD operations
- 💾 File-based data persistence
- 📊 Health check endpoint
- 🛡️ CORS protection
- 📋 Request logging
- ⚠️ Error handling

### 🚨 Error Handling
- **ErrorBoundary Component**: Catches React errors before UI goes blank
- **API Error Logging**: Detailed console messages for debugging
- **Fallback Data**: Uses local coursesData if backend is unavailable
- **User-Friendly Messages**: Shows why features aren't working

---

## 🔐 Admin Panel

**Access:** `http://localhost:5173/admin`

**Login Credentials:**
- **Email:** `admin@learningplatform.com`
- **Password:** `admin123`

**Capabilities:**
- ✅ Add new courses
- ✅ Remove existing courses
- ✅ Changes persist in `server/courses.json`

---

## 🐛 Troubleshooting

### Problem: Frontend is Blank

**Causes & Solutions:**
1. **Backend not running**
   - Open backend terminal: `cd server && node server.js`
   - Wait 3 seconds, then refresh frontend

2. **JavaScript error**
   - Press F12 to open browser DevTools
   - Check Console tab for error message
   - ErrorBoundary will show the error

3. **Network issue**
   - Verify backend is on `http://localhost:3000`
   - Verify frontend is on `http://localhost:5173`
   - Check firewall isn't blocking ports

### Problem: "Cannot connect to backend" Message

**Solution:**
1. **Start backend server**
   ```bash
   cd server
   node server.js
   ```
2. **Wait 3 seconds** for it to start
3. **Refresh frontend** (F5)

### Problem: Port Already in Use

**For port 3000 (backend):**
```bash
# Find process
netstat -ano | findstr :3000

# Kill it (Windows)
taskkill /PID <PID> /F

# Or use different port
SET PORT=3001 && node server.js
```

**For port 5173 (frontend):**
```bash
npm run dev -- --port 5174
```

### Problem: Courses Not Persisting

1. **Check file exists:** `server/courses.json` should exist
2. **Check permissions:** File should be readable/writable
3. **Check server logs:** Look for error messages in backend terminal
4. **Check data format:** Courses should be a JSON array

---

## 📋 Project Structure

```
d:\New Thing/
│
├── 📁 server/                     # Backend
│   ├── server.js                  # Express.js server
│   ├── courses.json               # Database file
│   ├── package.json               # Dependencies
│   └── node_modules/              # Installed packages
│
├── 📁 src/                        # Frontend
│   ├── main.jsx                   # Entry with ErrorBoundary
│   ├── App.jsx                    # Main component
│   ├── styles.css                 # Global styles
│   │
│   ├── 📁 components/
│   │   ├── ErrorBoundary.jsx      # Error handling
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── CourseCard.jsx
│   │   ├── AdminPanel.jsx
│   │   └── ... (other components)
│   │
│   ├── 📁 services/
│   │   └── api.js                 # API calls
│   │
│   ├── 📁 pages/
│   │   └── AdminPage.jsx
│   │
│   ├── 📁 hooks/
│   │   ├── useDarkMode.js
│   │   ├── useToast.js
│   │   └── ... (other hooks)
│   │
│   └── 📁 data/
│       └── coursesData.js         # Fallback data
│
├── vite.config.js                 # Vite configuration with proxy
├── package.json                   # Frontend dependencies
├── index.html                     # HTML entry point
│
├── start-all.bat                  # Windows startup script
├── start-all.ps1                  # PowerShell startup script
│
└── 📄 FRONTEND_BACKEND_SETUP.md    # This guide

```

---

## 🧪 Testing

### Test Backend Endpoint
```bash
# In your browser or with curl
curl http://localhost:3000/api/courses

# Expected response:
[
  {
    "id": 1,
    "title": "Introduction to Computer Science",
    "badge": "MIT",
    ...
  },
  ...
]
```

### Test Frontend Loading
1. Open `http://localhost:5173` in browser
2. Wait for page to load (2-3 seconds)
3. Check browser console (F12 → Console)
4. Should see:
   ```
   🚀 Application starting...
   📡 Fetching courses from: /api/courses
   ✅ Courses fetched successfully: 6 courses
   ```

### Test Admin Panel
1. Go to `http://localhost:5173/admin`
2. Login with provided credentials
3. Add a test course
4. Check `server/courses.json` - new course should be there
5. Remove a course
6. Refresh page - courses should persist

---

## 🎯 Key Integration Points

### 1. Vite Proxy (No CORS Issues)
**File:** `vite.config.js`
```javascript
proxy: {
    '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
    }
}
```

### 2. Relative URLs (URL Agnostic)
**File:** `src/services/api.js`
```javascript
const API_BASE = '/api';
fetch(`${API_BASE}/courses`)  // Works in dev and production!
```

### 3. CORS Headers (Backend Ready)
**File:** `server/server.js`
```javascript
app.use(cors(corsOptions));  // Allows requests from localhost:5173
```

### 4. Error Boundary (No Blank UI)
**File:** `src/main.jsx`
```javascript
<ErrorBoundary>
    <App />
</ErrorBoundary>
```

### 5. Fallback Data (Graceful Degradation)
**File:** `src/App.jsx`
```javascript
catch (error) {
    setCourses(coursesData);  // Use local data if API fails
}
```

---

## 📚 Data Flow Example

### Adding a Course via Admin Panel

```
1. User clicks "Add Course" in Admin Panel
   ↓
2. AdminPanel.jsx calls api.addCourse(courseData)
   ↓
3. POST /api/courses (with Vite proxy)
   ↓
4. Backend receives request at http://localhost:3000/api/courses
   ↓
5. server.js reads courses.json, adds new course, saves file
   ↓
6. API returns new course data
   ↓
7. Frontend updates UI with new course
   ↓
8. User sees course added instantly
   ↓
9. Refresh page → course still there (persisted in file)
```

---

## 🚀 Performance Tips

1. **Keep both terminals open** - Server needs to keep running
2. **Use separate monitor/workspace** for each terminal
3. **Use npm run dev** not `vite` directly (better with Vite config)
4. **Don't rename/move files** while servers are running
5. **Restart servers** if you change package.json

---

## 🔒 Security Notes

⚠️ **This setup is for DEVELOPMENT ONLY**

For production:
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS
- [ ] Restrict CORS to specific domains
- [ ] Use proper database (MongoDB, PostgreSQL, etc.)
- [ ] Implement proper authentication (JWT, OAuth, etc.)
- [ ] Add input validation and sanitization
- [ ] Set up API rate limiting
- [ ] Use environment-based configuration

---

## 📞 Common Commands

```bash
# Start both servers
start-all.bat                    # Windows
./start-all.ps1                  # PowerShell

# Manual start
cd server && node server.js      # Backend
npm run dev                      # Frontend

# Install dependencies
npm install                      # Frontend
cd server && npm install         # Backend

# Check if ports are listening
netstat -ano | findstr :3000     # Backend port
netstat -ano | findstr :5173     # Frontend port

# Kill Node processes
taskkill /F /IM node.exe         # All Node processes
taskkill /PID <PID> /F           # Specific process

# Build for production
npm run build                    # Frontend build
```

---

## 🎓 Next Steps

1. **Explore the code** - Check out components in `src/components/`
2. **Add new features** - Extend the Admin Panel capabilities
3. **Style customization** - Modify `src/styles.css`
4. **Database upgrade** - Replace `courses.json` with MongoDB
5. **Deployment** - Deploy to Vercel (frontend) + Railway (backend)

---

## 📝 Notes

- **Frontend loads immediately** - Doesn't wait for backend
- **Fallback data used if backend unavailable** - App still works
- **Courses persist in file** - Survives server restarts
- **Auto-reload enabled** - Changes reflected without restart
- **Console logging enabled** - Detailed debugging info

---

## ✅ Verification Checklist

Before concluding, verify:

- [ ] Backend terminal shows: "✅ Backend server is running!"
- [ ] Frontend terminal shows: "ready in XXX ms"
- [ ] Browser shows courses and UI (not blank)
- [ ] Console shows no red errors (F12 → Console)
- [ ] Admin panel is accessible at `/admin`
- [ ] Can add/remove courses in admin panel
- [ ] Courses persist after page refresh
- [ ] Dark mode toggle works
- [ ] Search functionality works

---

## 🎉 Summary

Your learning platform now has:
✅ Fully integrated frontend and backend  
✅ Working API communication  
✅ File-based persistent storage  
✅ Error handling with user-friendly messages  
✅ Proper CORS configuration  
✅ Admin panel for course management  
✅ Comprehensive logging for debugging  
✅ Startup scripts for easy deployment  

**You're all set! Open `http://localhost:5173` and enjoy!** 🚀

---

**Last Updated:** November 30, 2025  
**Status:** ✅ Production Ready (for development)
