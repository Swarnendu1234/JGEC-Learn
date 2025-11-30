# 📊 System Architecture & Data Flow Diagrams

## 🏗️ Complete System Architecture

```
╔═══════════════════════════════════════════════════════════════════════════╗
║                           LEARNING PLATFORM                              ║
╚═══════════════════════════════════════════════════════════════════════════╝

┌─────────────────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                                    │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                    Web Browser (Any OS)                                 │
│                                                                          │
│              http://localhost:5173                                      │
│                                                                          │
│    ┌──────────────────────────────────────────────────────────┐        │
│    │                   React Application                      │        │
│    ├──────────────────────────────────────────────────────────┤        │
│    │  • App.jsx (Main component)                             │        │
│    │  • Header, Sidebar, CourseCard components              │        │
│    │  • AdminPanel (authenticated users only)               │        │
│    │  • Hooks (useDarkMode, useToast, etc.)                │        │
│    │  • Error Boundary (catches errors)                     │        │
│    └──────────────────────────────────────────────────────────┘        │
│                           │                                             │
│                           │ fetch('/api/courses')                      │
│                           ▼                                             │
│    ┌──────────────────────────────────────────────────────────┐        │
│    │          Vite Dev Server (Proxy Layer)                  │        │
│    ├──────────────────────────────────────────────────────────┤        │
│    │  • Intercepts /api/* requests                           │        │
│    │  • Routes to http://localhost:3000/api/*               │        │
│    │  • Hot Module Reloading (HMR)                          │        │
│    │  • Port 5173                                            │        │
│    └──────────────────────────────────────────────────────────┘        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                             │ HTTP Request
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                       SERVER LAYER                                      │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│                    Express.js Backend                                   │
│                                                                          │
│              http://localhost:3000                                      │
│                                                                          │
│    ┌──────────────────────────────────────────────────────────┐        │
│    │                 Middleware Stack                         │        │
│    ├──────────────────────────────────────────────────────────┤        │
│    │  1. CORS Middleware (cors)                              │        │
│    │  2. JSON Parser (express.json)                          │        │
│    │  3. Request Logger (custom)                             │        │
│    └──────────────────────────────────────────────────────────┘        │
│                             │                                            │
│                             ▼                                            │
│    ┌──────────────────────────────────────────────────────────┐        │
│    │              Route Handlers                             │        │
│    ├──────────────────────────────────────────────────────────┤        │
│    │  • GET /api/courses → Return all courses                │        │
│    │  • POST /api/courses → Add new course                   │        │
│    │  • DELETE /api/courses/:id → Remove course              │        │
│    │  • GET /api/health → Server status                      │        │
│    └──────────────────────────────────────────────────────────┘        │
│                             │                                            │
│                             ▼                                            │
│    ┌──────────────────────────────────────────────────────────┐        │
│    │            Business Logic Layer                         │        │
│    ├──────────────────────────────────────────────────────────┤        │
│    │  • loadCourses() - Read from file                       │        │
│    │  • saveCourses() - Write to file                        │        │
│    │  • Validation - Check required fields                   │        │
│    │  • Error Handling - Catch and log errors                │        │
│    └──────────────────────────────────────────────────────────┘        │
│                             │                                            │
│                             ▼                                            │
│    ┌──────────────────────────────────────────────────────────┐        │
│    │          Error Handling Middleware                      │        │
│    ├──────────────────────────────────────────────────────────┤        │
│    │  • Catch all errors                                     │        │
│    │  • Return helpful messages                              │        │
│    │  • Log to console                                       │        │
│    └──────────────────────────────────────────────────────────┘        │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
                             │ HTTP Response (JSON)
                             ▼
┌─────────────────────────────────────────────────────────────────────────┐
│                      DATA LAYER                                         │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                          │
│              File-Based Database                                        │
│                                                                          │
│              server/courses.json                                        │
│                                                                          │
│    [                                                                    │
│      {                                                                  │
│        id: 1,                                                           │
│        title: "Course Title",                                           │
│        badge: "University",                                             │
│        progress: 45,                                                    │
│        status: "active",                                                │
│        tags: ["tag1", "tag2"],                                         │
│        image: "https://..."                                             │
│      },                                                                 │
│      ...                                                                │
│    ]                                                                    │
│                                                                          │
└─────────────────────────────────────────────────────────────────────────┘
```

## 🔄 Request-Response Flow

### 1. GET Courses (Read Operation)

```
User opens http://localhost:5173
            ↓
App.jsx useEffect hook fires
            ↓
fetch('/api/courses')
            ↓
Vite proxy: /api/courses → http://localhost:3000/api/courses
            ↓
Backend receives GET /api/courses
            ↓
Console: "📥 GET /api/courses"
            ↓
loadCourses() function
            ↓
fs.readFileSync('courses.json')
            ↓
Parse JSON → Array of 6 courses
            ↓
Return JSON response
            ↓
HTTP 200 OK with course data
            ↓
Vite proxy returns to browser
            ↓
Browser receives JSON
            ↓
Frontend code: const data = await response.json()
            ↓
Console: "✅ Courses fetched successfully: 6 courses"
            ↓
setState(data)
            ↓
React re-renders UI
            ↓
User sees course grid with 6 courses displayed ✅
```

### 2. POST Course (Create Operation)

```
User in Admin Panel clicks "Add Course"
            ↓
Form validation passes
            ↓
POST /api/courses with JSON body
            ↓
Vite proxy: → http://localhost:3000/api/courses
            ↓
Backend receives POST /api/courses
            ↓
Console: "📥 POST /api/courses"
            ↓
Parse request body
            ↓
Validate: Check title exists
            ↓
loadCourses() → Current array
            ↓
courses.push(newCourse)
            ↓
saveCourses(courses)
            ↓
fs.writeFileSync('courses.json', JSON.stringify(...))
            ↓
File written to disk ✅
            ↓
Return HTTP 200 with course data
            ↓
Frontend receives response
            ↓
Console: "✅ Course added successfully"
            ↓
Update state with new course
            ↓
React re-renders
            ↓
New course visible in grid ✅
            ↓
User refreshes page
            ↓
App.jsx fetches courses again
            ↓
New course still in server/courses.json ✅
```

### 3. DELETE Course (Delete Operation)

```
User in Admin Panel clicks "Remove" on a course
            ↓
Confirm deletion
            ↓
DELETE /api/courses/5 (id=5)
            ↓
Vite proxy: → http://localhost:3000/api/courses/5
            ↓
Backend receives DELETE /api/courses/5
            ↓
Console: "📥 DELETE /api/courses/5"
            ↓
loadCourses() → Array of 6 courses
            ↓
Parse id from URL: parseInt('5') = 5
            ↓
Filter: courses.filter(c => c.id !== 5)
            ↓
Result: Array of 5 courses (without id 5)
            ↓
saveCourses(filtered)
            ↓
fs.writeFileSync(...)
            ↓
File updated on disk ✅
            ↓
Return HTTP 200 { success: true }
            ↓
Frontend receives response
            ↓
Console: "✅ Course deleted successfully"
            ↓
Update state, remove course
            ↓
React re-renders
            ↓
Course disappears from grid ✅
            ↓
File now has 5 courses instead of 6 ✅
```

## 🛡️ Error Handling Flow

```
User tries action
            ↓
      ┌─────────────────────────┐
      │ Try Something           │
      └──────────────┬──────────┘
                     │
        ┌────────────┴───────────┐
        ▼                        ▼
   ✅ Success           ❌ Error occurs
        │                        │
        │              ┌─────────┴──────────┐
        │              ▼                    ▼
        │         Is it a        Is it a network error?
        │         network        (backend not running)
        │         error?              │
        │              │              ├─ Yes: Show "Backend not running"
        │              │              └─ No: Continue
        │              ├─ Yes:
        │              │   Store error
        │              │   Use fallback data
        │              │   Show toast message
        │              │
        │              └─ No:
        │                  ErrorBoundary catches it
        │                  Show error component
        │                  Display error details
        │                  Offer retry button
        │
        ▼
   Display result
   Update UI
   User happy ✅
```

## 📊 Component Hierarchy

```
App.jsx (Main)
├── Header.jsx
│   ├── SearchBar.jsx
│   ├── NotificationPanel.jsx
│   └── MessagesPanel.jsx
├── Sidebar.jsx
│   └── SidebarItems
├── main content
│   ├── PageHeader.jsx
│   ├── FilterChips.jsx
│   ├── StreakBanner.jsx
│   ├── Heatmap.jsx
│   └── CourseCard.jsx (repeated for each course)
│       └── CircularProgress.jsx
├── RightSidebar.jsx
├── DarkModeToggle.jsx
├── AdminButton → AdminPanel.jsx (modal/page)
├── AIChatbot.jsx
└── ErrorBoundary.jsx (wraps everything)
    └── Shows error if something breaks
```

## 🔐 CORS Flow

```
Browser (localhost:5173)
    ↓
    │ fetch request with:
    │   Origin: http://localhost:5173
    │   
    ▼
Vite Proxy (same origin)
    ↓
    │ Forwards to backend
    │ changeOrigin: true
    │
    ▼
Backend (localhost:3000)
    ↓
    │ Receives CORS request
    │ Checks: Access-Control-Allow-Origin
    │
    ▼
CORS Middleware
    ↓
    │ corsOptions = {
    │   origin: ['http://localhost:5173', ...],
    │   credentials: true,
    │   methods: ['GET', 'POST', 'DELETE', 'OPTIONS'],
    │   allowedHeaders: ['Content-Type']
    │ }
    │
    ▼
Check: Is origin in allowedList?
    │
    ├─ Yes: Add CORS headers to response
    │   └─ Access-Control-Allow-Origin: http://localhost:5173
    │   └─ Access-Control-Allow-Methods: GET, POST, DELETE
    │   └─ Return with HTTP 200
    │
    └─ No: Reject request
        └─ Return with HTTP 403 (usually Vite proxy)
```

## 🌐 Network Request Timeline

```
Time  Component          Action
────────────────────────────────────────────────────────────
T+0ms  Browser          User opens localhost:5173
T+100ms Vite            Loads React app
T+200ms App.jsx         useEffect hook fires
T+210ms api.js          fetch('/api/courses')
T+215ms Vite Proxy      Intercepts /api/courses
T+220ms Vite Proxy      Forwards to localhost:3000/api/courses
T+230ms Backend         Receives request
T+240ms Backend         Logs: "📥 GET /api/courses"
T+250ms Backend         Reads courses.json file
T+260ms Backend         Parses JSON (6 courses)
T+270ms Backend         Sends response
T+280ms Vite Proxy      Receives response
T+290ms Browser         Receives response
T+300ms React           setState(courses)
T+310ms React           Re-renders UI
T+400ms Browser         User sees courses ✅

Total time: ~400ms from page open to courses visible
```

## 📈 Data Storage Format

### courses.json Structure

```json
[
  {
    "id": 1,
    "title": "Introduction to Computer Science",
    "badge": "MIT",
    "progress": 75,
    "status": "active",
    "tags": ["Computer Science", "Programming", "Algorithms"],
    "image": "https://images.unsplash.com/photo-1517694712202..."
  },
  {
    "id": 2,
    "title": "Python for Everybody",
    "badge": "Harvard",
    "progress": 42,
    "status": "active",
    "tags": ["Python", "Programming", "Data Science"],
    "image": "https://images.unsplash.com/photo-1526379095098..."
  },
  ...
]
```

## 🔧 Configuration Flow

```
Startup Sequence:
    ↓
Load vite.config.js
    ├─ port: 5173
    ├─ host: '0.0.0.0'
    └─ proxy: {'/api': {target: 'http://localhost:3000'}}
    ↓
Load .env (if exists)
    └─ MONGODB_URI: (ignored, using file storage)
    ↓
Start Vite dev server
    ↓
Vite ready on localhost:5173
    ↓
User opens localhost:5173
    ↓
React app loads
    ↓
App tries to fetch('/api/courses')
    ↓
Vite proxy intercepts
    ↓
Forwarded to localhost:3000/api/courses
    ↓
Backend must be running...
```

## 🎯 Success Criteria Matrix

```
Component      Expected      Actual      Status
─────────────────────────────────────────────
Backend        Running       Running      ✅
Frontend       Running       Running      ✅
API Calls      Working       Working      ✅
CORS           No errors     No errors    ✅
Data           Persisting    Persisting   ✅
UI             Never blank   Never blank  ✅
Logging        Detailed      Detailed     ✅
Error Handling Working       Working      ✅
```

---

This architecture ensures:
- ✅ Separation of concerns
- ✅ Scalability
- ✅ Maintainability
- ✅ Error resilience
- ✅ Easy debugging
- ✅ Clear data flow
