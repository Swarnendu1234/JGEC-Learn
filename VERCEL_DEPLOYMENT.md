# Vercel Deployment Guide

## 🚀 Deploy to Vercel

### Frontend Deployment

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy Frontend**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Framework Preset: **Vite**
   - Root Directory: `./`
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Click "Deploy"

3. **Environment Variables (Frontend)**
   - Go to Project Settings → Environment Variables
   - Add: `VITE_API_URL` = `https://your-backend-url.vercel.app`

### Backend Deployment

1. **Deploy Backend Separately**
   - Create new Vercel project
   - Import same repository
   - Root Directory: `./server`
   - Click "Deploy"

2. **Environment Variables (Backend)**
   - Go to Project Settings → Environment Variables
   - Add these variables:
     - `MONGODB_URI` = Your MongoDB connection string
     - `JWT_SECRET` = Your JWT secret key
     - `JWT_EXPIRE` = `7d`
     - `EMAIL_USER` = Your email
     - `EMAIL_APP_PASSWORD` = Your email app password

### Update Frontend API URL

After backend is deployed, update frontend:

**File: `src/services/api.js`**
```javascript
const API_BASE = import.meta.env.VITE_API_URL || '/api'
```

### CORS Configuration

Update `server/server.js`:
```javascript
const corsOptions = {
  origin: ['https://your-frontend-url.vercel.app'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}
```

## ✅ Deployment Checklist

- [ ] Frontend deployed to Vercel
- [ ] Backend deployed to Vercel
- [ ] Environment variables set
- [ ] MongoDB Atlas IP whitelist updated (0.0.0.0/0)
- [ ] CORS configured with production URLs
- [ ] Frontend API_BASE updated
- [ ] Test login/signup
- [ ] Test protected routes

## 🔗 URLs

- Frontend: `https://your-app.vercel.app`
- Backend: `https://your-api.vercel.app`

Your platform is now live! 🎉
