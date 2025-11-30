# Quick Setup Guide - MongoDB Integration Fix

## What Was Fixed
Your Admin Panel can now properly add and remove courses in MongoDB. Previously, changes only existed in frontend state.

## Changes Made

### 1. **Backend Error Handling** (`server/server.js`)
- ✅ POST endpoint now returns saved course data
- ✅ DELETE endpoint validates if course exists
- ✅ Both endpoints have proper error handling with HTTP status codes

### 2. **Admin Panel Component** (`src/components/AdminPanel.jsx`)
- ✅ Added error state and error display
- ✅ Validates course title before submission
- ✅ Shows user-friendly error messages
- ✅ Properly handles API responses

### 3. **App Component** (`src/App.jsx`)
- ✅ Improved course loading from MongoDB
- ✅ Better error handling with fallback to local data
- ✅ Added handler function for course updates

### 4. **Environment Config** (`.env`)
- ✅ Created with MongoDB connection URI
- ✅ Server port configuration

## Before Testing

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Setup MongoDB
```bash
# If you don't have MongoDB installed, download from https://www.mongodb.com/try/download/community

# Start MongoDB service (Windows)
# MongoDB should run on localhost:27017
```

### 3. Seed Initial Data (Optional)
```bash
cd server
npm run seed
```

## Running the Application

### Terminal 1 - Start Backend
```bash
cd server
npm run start
# Server will run on http://localhost:3000
```

### Terminal 2 - Start Frontend
```bash
npm run dev
# Frontend will run on http://localhost:5173
```

## Testing the Fix

1. **Login to Admin Panel**
   - Click the Admin button (red button at bottom-left)
   - Email: `admin@learningplatform.com`
   - Password: `admin123`

2. **Add a Course**
   - Click "Add Course"
   - Fill in course details
   - Click "Add Course" button
   - Course should appear in the list
   - **Check MongoDB**: `mongosh` → `use jgec-learn` → `db.courses.find()`

3. **Remove a Course**
   - Click "Remove" button on any course
   - Course should disappear from list
   - **Check MongoDB**: `mongosh` → `use jgec-learn` → `db.courses.find()`

4. **Persist Test**
   - Add a new course
   - Refresh the page (F5)
   - New course should still be there (loaded from MongoDB)

## Troubleshooting

### MongoDB Connection Error
- Check if MongoDB service is running
- Verify `.env` has correct `MONGODB_URI`
- Default: `mongodb://localhost:27017/jgec-learn`

### Course Not Saving
- Check browser console for errors (F12 → Console)
- Check server console for error messages
- Verify server is running on port 3000

### Admin Panel Won't Open
- Check if `AdminButton` or admin trigger is implemented
- Look in `src/pages/AdminPage.jsx` for the Admin Panel route

## File Changes Summary

| File | Changes |
|------|---------|
| `server/server.js` | Error handling, response validation |
| `src/components/AdminPanel.jsx` | Error state, validation, error display |
| `src/App.jsx` | Better course loading, update handler |
| `.env` (NEW) | MongoDB URI, port configuration |
| `MONGODB_FIX.md` (NEW) | Detailed documentation |

## Database Schema
```
Collection: courses
{
  _id: ObjectId (MongoDB auto-generated),
  id: Number,
  title: String (required),
  badge: String,
  progress: Number,
  status: String,
  tags: [String],
  image: String
}
```

## Admin Credentials
- **Email**: `admin@learningplatform.com`
- **Password**: `admin123`

(Located in `AdminPanel.jsx` - change if needed)
