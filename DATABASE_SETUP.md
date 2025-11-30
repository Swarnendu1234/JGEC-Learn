# Database Setup Instructions

## MongoDB Connection
Your courses are now stored in MongoDB Atlas database.

**Connection String:**
```
mongodb+srv://collegebusiness207_db_user:iJinkjBpKGIk48jx@cluster0.udlmizf.mongodb.net/learningplatform
```

## Setup Steps

### 1. Install Server Dependencies
```bash
cd server
npm install
```

### 2. Start Backend Server
```bash
cd server
npm start
```
Server will run on `http://localhost:3000`

### 3. Start Frontend (in new terminal)
```bash
npm run dev
```
Frontend will run on `http://localhost:5173`

## API Endpoints

- **GET** `/api/courses` - Fetch all courses
- **POST** `/api/courses` - Add new course
- **DELETE** `/api/courses/:id` - Remove course

## Admin Panel

Access at: `http://localhost:5173/admin`

**Credentials:**
- Email: `admin@learningplatform.com`
- Password: `admin123`

## Features

✅ All courses saved to MongoDB database
✅ Add/Remove courses via admin panel
✅ Real-time updates across the application
✅ Automatic fallback to local data if database unavailable

## Database Schema

```javascript
{
  id: Number,
  title: String,
  badge: String,
  progress: Number,
  status: String,
  tags: [String],
  image: String
}
```

## Notes

- Backend must be running for database operations
- Frontend will use local data if backend is unavailable
- All changes in admin panel are saved to database immediately