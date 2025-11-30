# MongoDB Integration - Data Flow Diagram

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        React Frontend                            │
│  (http://localhost:5173)                                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  App.jsx                                                 │  │
│  │  • Manages courses state                                 │  │
│  │  • Loads courses from MongoDB on startup                 │  │
│  │  • Listens for updates from AdminPanel                   │  │
│  └──────────────────────────────────────────────────────────┘  │
│           │                            │                         │
│           ▼                            ▼                         │
│  ┌──────────────────┐      ┌──────────────────────────┐         │
│  │ CourseCard.jsx   │      │ AdminPanel.jsx           │         │
│  │ (Display)        │      │ (Add/Remove Courses)     │         │
│  │                  │      │                          │         │
│  │ Shows courses    │      │ • Login validation       │         │
│  │ in grid format   │      │ • Form validation        │         │
│  │                  │      │ • API calls              │         │
│  │                  │      │ • Error handling         │         │
│  └──────────────────┘      └──────────────────────────┘         │
│           ▲                            │                         │
│           │                            ▼                         │
│           │                  ┌──────────────────────┐            │
│           │                  │ api.js               │            │
│           │                  │ (Service Layer)      │            │
│           │                  │                      │            │
│           │                  │ • fetchCourses()     │            │
│           │                  │ • addCourse()        │            │
│           │                  │ • deleteCourse()     │            │
│           └──────────────────│ POST, DELETE, GET    │            │
│                              └──────────────────────┘            │
└─────────────────────────────────────────────────────────────────┘
                                      │
                                      │ HTTP Requests
                                      ▼
┌─────────────────────────────────────────────────────────────────┐
│                     Node.js Backend                              │
│  (http://localhost:3000)                                         │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ server.js (Express)                                      │  │
│  │                                                          │  │
│  │ GET /api/courses                                         │  │
│  │   └─► Course.find() ─► Returns all courses              │  │
│  │                                                          │  │
│  │ POST /api/courses                                        │  │
│  │   └─► Validate ─► Course.save() ─► Return saved course  │  │
│  │       (NEW)      (to MongoDB)     (with _id)             │  │
│  │                                                          │  │
│  │ DELETE /api/courses/:id                                  │  │
│  │   └─► Validate ─► Course.deleteOne() ─► Return success  │  │
│  │       (ID exists)  (from MongoDB)                        │  │
│  └──────────────────────────────────────────────────────────┘  │
│           │
│           ▼
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ MongoDB Connection (mongoose)                            │  │
│  │                                                          │  │
│  │ const courseSchema = {                                   │  │
│  │   id, title, badge, progress,                           │  │
│  │   status, tags, image                                   │  │
│  │ }                                                        │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│                  MongoDB Database                                │
│  (mongodb://localhost:27017/jgec-learn)                          │
│                                                                  │
│  Database: jgec-learn                                            │
│  Collection: courses                                             │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │ Documents:                                               │  │
│  │                                                          │  │
│  │ {                                                        │  │
│  │   _id: ObjectId("..."),                                  │  │
│  │   id: 1,                                                 │  │
│  │   title: "Introduction to Computer Science",            │  │
│  │   badge: "MIT",                                          │  │
│  │   progress: 75,                                          │  │
│  │   status: "active",                                      │  │
│  │   tags: ["Computer Science", "Programming"],            │  │
│  │   image: "https://..."                                   │  │
│  │ }                                                        │  │
│  │                                                          │  │
│  │ ... more courses ...                                     │  │
│  └──────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Flow - Add Course

```
User Input (AdminPanel)
         │
         ▼
Form Validation
  • Check title not empty
  • Parse tags from comma-separated string
  └─ Invalid? Show error message ─────────┐
         │                                │
         ├─ Valid                         │
         ▼                                │
Generate Course Object                   │
  {                                       │
    id: Date.now(),                       │
    title, badge, progress,               │
    status, tags, image                   │
  }                                       │
         │                                │
         ▼                                │
POST /api/courses                         │
(Send to backend)                         │
         │                                │
         ▼                                │
Server Receives Request                   │
         │                                │
         ▼                                │
Create Course Document                    │
  course = new Course(data)                │
         │                                │
         ▼                                │
Save to MongoDB                           │
  course.save()                            │
         │                                │
         ├─ Error? ──────────────────────┤
         │                               │
         ├─ Success ──┐                  │
         │            ▼                  │
         │     Return Saved Course       │
         │     (with MongoDB _id)        │
         │            │                  │
         ▼            ▼                  │
Frontend receives response                │
         │                                │
         ├─ Has _id? ──────────────────┐ │
         │                            │ │
         ├─ Yes ────┐                 │ │
         │          ▼                 │ │
         │    Add to local state      │ │
         │    setCourses([...])       │ │
         │          │                 │ │
         │          ▼                 │ │
         │    Call onUpdateCourses()  │ │
         │    (pass to App)           │ │
         │          │                 │ │
         │          ▼                 │ │
         │    Clear form              │ │
         │    Close form              │ │
         │          │                 │ │
         │          ▼                 │ │
         │    ✅ Course appears on UI │ │
         │                            │ │
         └────────────────────────────┘ │
                                        │
         ◀──────────────────────────────┘
            Error displayed to user
```

---

## Data Flow - Remove Course

```
User clicks Remove (AdminPanel)
         │
         ▼
DELETE /api/courses/:id
(Send to backend)
         │
         ▼
Server Receives Request
         │
         ▼
Find Course in MongoDB
  Course.deleteOne({ id: parseInt(id) })
         │
         ├─ Not found? ─────────────────┐
         │                              │
         ├─ Found ──┐                   │
         │          ▼                   │
         │    Delete Document           │
         │          │                   │
         │          ▼                   │
         │    Return { success: true }  │
         │          │                   │
         ▼          ▼                   │
Frontend receives response              │
         │                              │
         ├─ success: true? ──┐          │
         │                  │          │
         ├─ Yes             ▼          │
         │          Remove from state   │
         │          setCourses([...])   │
         │                  │          │
         │                  ▼          │
         │          Call onUpdateCourses
         │                  │          │
         │                  ▼          │
         │          ✅ Course removed  │
         │             from UI         │
         │                             │
         └─────────────────────────────┘
                  │
                  └─ Error
                     Show error message
```

---

## Data Flow - Page Refresh

```
User refreshes page (F5)
         │
         ▼
App.jsx mounts
         │
         ▼
useEffect runs (on component load)
         │
         ▼
fetchCourses() API call
  GET /api/courses
         │
         ▼
Server receives request
         │
         ▼
Course.find() (get all documents)
         │
         ▼
Return courses array from MongoDB
  [{id, title, badge, ...}, {...}, ...]
         │
         ▼
Frontend receives response
         │
         ├─ Valid array? ──────┐
         │                     │
         ├─ Yes               ▼
         │      setCourses(data)
         │           │
         │           ▼
         │      ✅ All saved courses
         │         displayed on page
         │
         └─ No / Error
            setCourses(coursesData)
                (fallback to local data)
                     │
                     ▼
                 ✅ Shows default courses
                    (MongoDB unavailable)
```

---

## File Relationships

```
.env (Configuration)
  │
  ├─ MONGODB_URI
  │  └─► server/server.js (mongoose.connect)
  │       └─► MongoDB (jgec-learn database)
  │
  └─ PORT
     └─► server/server.js (app.listen)


src/App.jsx (Main App)
  │
  ├─► src/services/api.js (API calls)
  │    ├─► fetchCourses() [GET]
  │    ├─► addCourse() [POST]
  │    └─► deleteCourse() [DELETE]
  │
  └─► src/components/
       │
       ├─ AdminPanel.jsx
       │  ├─ Imports: addCourse, deleteCourse
       │  ├─ Calls: api functions
       │  └─ Emits: onUpdateCourses callback
       │
       └─ CourseCard.jsx
          └─ Receives: courses from App state


server/server.js (Backend)
  │
  ├─► GET /api/courses ──► Course.find()
  ├─► POST /api/courses ──► Course.save()
  └─► DELETE /api/courses/:id ──► Course.deleteOne()
       │
       └─► MongoDB (courses collection)
```

---

## Status Codes

```
200 OK
  • GET /api/courses
  • POST /api/courses (with success)
  • DELETE /api/courses/:id (with success)

404 Not Found
  • DELETE /api/courses/:id (course not found)

500 Internal Server Error
  • Any operation fails (MongoDB error, etc.)
```

---

## Environment Flow

```
.env
  │
  ├─ MONGODB_URI="mongodb://localhost:27017/jgec-learn"
  │  └─ Read by: server.js
  │     └─ Passes to: mongoose.connect()
  │        └─ Connects to: MongoDB server
  │
  └─ PORT="3000"
     └─ Read by: server.js
        └─ Passes to: app.listen()
           └─ Server listens on: 3000


Frontend API URL
  └─ Hardcoded in: src/services/api.js
     └─ Value: "http://localhost:3000/api"
        └─ Must match backend PORT
```

---

This diagram shows how all components work together to save courses in MongoDB! 🚀
