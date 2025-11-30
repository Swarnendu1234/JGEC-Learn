# Fix Network Error on Vercel

## Problem
Frontend can't connect to backend API (405 error)

## Solution

### Step 1: Deploy Backend First

1. Go to Vercel Dashboard
2. Click "Add New" → "Project"
3. Import your repository
4. **Root Directory**: `server`
5. Add Environment Variables:
   - `MONGODB_URI` = your MongoDB connection string
   - `JWT_SECRET` = your JWT secret
   - `JWT_EXPIRE` = 7d
   - `EMAIL_USER` = your email
   - `EMAIL_APP_PASSWORD` = your email password
6. Deploy

### Step 2: Update Frontend Environment Variable

1. Copy your backend URL (e.g., `https://your-backend.vercel.app`)
2. Go to Frontend Project Settings → Environment Variables
3. Add: `VITE_API_URL` = `https://your-backend.vercel.app/api`
4. Redeploy frontend

### Step 3: Update Backend CORS

In `server/server.js`, update CORS:
```javascript
const corsOptions = {
  origin: ['https://jgec-learn2025.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

Redeploy backend.

## Quick Fix

**In Vercel Dashboard:**

Frontend Project:
- Environment Variables → Add `VITE_API_URL` = `https://your-backend.vercel.app/api`
- Redeploy

Backend Project:
- Deploy from `server` directory
- Add all environment variables
- Update CORS with frontend URL

Done! 🚀
