# 🚀 Frontend-Backend Integration Guide

## Quick Start

### Option 1: Automated Setup (Recommended)

**Windows:**
```bash
start-all.bat
```

**Windows PowerShell:**
```powershell
.\start-all.ps1
```

### Option 2: Manual Setup

#### Terminal 1 - Backend Server
```bash
cd server
npm install  # First time only
node server.js
```

Expected output:
```
✅ Backend server is running!
📡 Server URL: http://localhost:3000
🔗 API Base: http://localhost:3000/api
```

#### Terminal 2 - Frontend Server
```bash
npm install  # First time only
npm run dev
```

Expected output:
```
  VITE v5.0.0  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  press h to show help
```

## 🏗️ Project Structure

```
d:\New Thing/
├── server/                    # Backend Express.js server
│   ├── server.js             # Main server file
│   ├── courses.json          # File-based database
│   ├── package.json
│   └── node_modules/
│
├── src/                       # Frontend React code
│   ├── main.jsx              # Entry point with ErrorBoundary
│   ├── App.jsx               # Main app component
│   ├── components/           # React components
│   │   ├── ErrorBoundary.jsx # Error handling
│   │   └── ...
│   ├── services/
│   │   └── api.js            # API calls with logging
│   ├── pages/
│   ├── hooks/
│   ├── data/
│   └── styles.css
│
├── vite.config.js            # Vite with proxy configuration
├── package.json              # Frontend dependencies
└── index.html
```

## 🔗 How Frontend-Backend Communication Works

### 1. **Vite Proxy Setup** (vite.config.js)
- Frontend runs on `http://localhost:5173`
- Backend runs on `http://localhost:3000`
- Vite automatically proxies `/api/*` requests to `http://localhost:3000/api/*`

### 2. **API Service** (src/services/api.js)
- Uses relative URLs: `/api/courses` instead of `http://localhost:3000/api/courses`
- Includes comprehensive error logging
- Detects when backend is not running and shows helpful messages

### 3. **CORS Configuration** (server/server.js)
- Backend allows requests from:
  - `http://localhost:5173` (default frontend)
  - `http://127.0.0.1:5173`
  - `http://0.0.0.0:5173`
- All HTTP methods allowed: GET, POST, PUT, DELETE, OPTIONS

### 4. **Error Boundary** (src/components/ErrorBoundary.jsx)
- Catches React errors before the UI goes blank
- Shows user-friendly error messages
- Provides retry functionality
- Displays helpful troubleshooting steps

## 🐛 Troubleshooting

### Frontend is Blank
1. **Check browser console** (F12 → Console tab)
2. **Check error message** - ErrorBoundary will display it
3. **Verify backend is running**: Visit `http://localhost:3000/api/health`
4. **Check Vite terminal** for build errors

### "Backend server may not be running" Warning
1. **Open Terminal 1 and run backend**:
   ```bash
   cd server
   node server.js
   ```
2. **Wait 3 seconds** for server to start
3. **Refresh frontend** (F5)

### CORS Error
- Already fixed in vite.config.js proxy and server CORS configuration
- If still seeing CORS errors, make sure:
  - Backend is running on `http://localhost:3000`
  - Frontend is running on `http://localhost:5173`

### Port Already in Use

#### Port 3000 (Backend)
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Or change port
SET PORT=3001 && node server.js
```

#### Port 5173 (Frontend)
```bash
npm run dev -- --port 5174
```

### Data Not Persisting
- Check `server/courses.json` file exists
- Verify file has read/write permissions
- Check server console for error messages

## 📡 API Endpoints

### Health Check
```bash
GET /api/health
Response: { status: 'ok', timestamp: '...', uptime: ... }
```

### Get All Courses
```bash
GET /api/courses
Response: [ { id, title, badge, progress, status, tags, image }, ... ]
```

### Add Course
```bash
POST /api/courses
Body: { title: "Course Title", badge: "Badge", progress: 0, status: "in-progress", tags: [], image: "..." }
Response: { ...course data... }
```

### Delete Course
```bash
DELETE /api/courses/:id
Response: { success: true }
```

## 🔐 Admin Panel

**URL**: `http://localhost:5173/admin`

**Login Credentials**:
- Email: `admin@learningplatform.com`
- Password: `admin123`

**Features**:
- Add new courses
- Remove existing courses
- Changes persist in `server/courses.json`

## 📊 Console Logging

Both frontend and backend log detailed messages:

**Frontend (Browser Console)**:
```
🚀 Application starting...
📡 Fetching courses from: /api/courses
✅ Courses fetched successfully: 6 courses
```

**Backend (Terminal)**:
```
📡 GET /api/courses
✅ Courses fetched: 6 items
```

## 🛠️ Development Tips

### Hot Reload
- **Frontend**: Changes to React code auto-reload (via Vite)
- **Backend**: Restart required after changes to `server.js`

### Check What's Running
```bash
# Windows - list processes
tasklist | findstr node

# Check if ports are listening
netstat -ano | findstr :3000
netstat -ano | findstr :5173
```

### View Database
```bash
# Open courses.json in your editor
server/courses.json
```

### Toggle Dark Mode
- **Frontend**: Click moon icon (top right)
- **Shortcut**: Ctrl+D

### Open Admin Panel
- **Button**: Look for admin button in UI
- **Direct URL**: http://localhost:5173/admin

## 🎯 Common Issues & Solutions

| Issue | Solution |
|-------|----------|
| "Cannot connect to backend" | Ensure backend is running: `cd server && node server.js` |
| Frontend blank | Check browser console (F12) for errors, check ErrorBoundary message |
| Courses not saving | Verify `server/courses.json` exists and is writable |
| Port conflict | Change port: `SET PORT=3001 && node server.js` |
| CORS errors | Ensure frontend is on :5173 and backend on :3000 |
| No courses showing | Check `server/courses.json` has content |

## 📝 File Descriptions

### server/server.js
- Express.js server
- CORS enabled for localhost:5173
- File-based database using courses.json
- Health check endpoint
- Course CRUD operations

### src/services/api.js
- Centralized API calls
- Comprehensive error handling
- Helpful error messages
- Request/response logging

### src/components/ErrorBoundary.jsx
- React error boundary
- Prevents blank UI on errors
- Shows error details
- Retry functionality

### vite.config.js
- Vite build configuration
- Proxy setup for `/api/*` routes
- Dev server on port 5173

## ✅ Checklist

Before reporting issues, verify:
- [ ] Backend running: `cd server && node server.js`
- [ ] Frontend running: `npm run dev`
- [ ] Backend on `http://localhost:3000`
- [ ] Frontend on `http://localhost:5173`
- [ ] `server/courses.json` file exists
- [ ] No firewall blocking ports 3000 and 5173
- [ ] Browser console (F12) shows no errors

## 📞 Still Having Issues?

1. **Check browser console** (F12 → Console)
2. **Check backend terminal** for error messages
3. **Check ErrorBoundary** display for hints
4. **Restart both servers**:
   - Close both terminals
   - Run setup script again

---

**Last Updated**: November 30, 2025
