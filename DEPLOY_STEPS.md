# Step-by-Step Vercel Deployment

## Step 1: Deploy Backend

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select your GitHub repository
4. **IMPORTANT: Set Root Directory to `server`**
5. Click "Environment Variables" and add:
   ```
   MONGODB_URI = mongodb+srv://collegebusiness207_db_user:iJinkjBpKGIk48jx@cluster0.udlmizf.mongodb.net/learningplatform?appName=Cluster0
   JWT_SECRET = your_super_secret_jwt_key_change_this_in_production_12345
   JWT_EXPIRE = 7d
   EMAIL_USER = swarnendumajumder099@gmail.com
   EMAIL_APP_PASSWORD = cnyugaxzmrpdeifz
   ```
6. Click "Deploy"
7. **Copy the backend URL** (e.g., `https://your-backend.vercel.app`)

## Step 2: Deploy Frontend

1. Go to https://vercel.com/new
2. Click "Import Project"
3. Select the SAME GitHub repository
4. **Root Directory: Leave as `.` (root)**
5. Click "Environment Variables" and add:
   ```
   VITE_API_URL = https://your-backend.vercel.app/api
   ```
   (Replace with YOUR backend URL from Step 1)
6. Click "Deploy"

## Step 3: Update Backend CORS (Optional)

1. Go to backend project settings
2. Add environment variable:
   ```
   FRONTEND_URL = https://jgec-learn2025.vercel.app
   ```
3. Redeploy backend

## Done! 🎉

Your app should now work:
- Frontend: https://jgec-learn2025.vercel.app
- Backend: https://your-backend.vercel.app

## Troubleshooting

If login still fails:
1. Check backend logs in Vercel
2. Verify `VITE_API_URL` is set correctly
3. Make sure MongoDB Atlas allows connections from anywhere (0.0.0.0/0)
