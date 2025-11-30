# Deploy Backend to Vercel - Step by Step

## Step 1: Push Code to GitHub
```bash
git add .
git commit -m "Ready for deployment"
git push
```

## Step 2: Go to Vercel
1. Open https://vercel.com
2. Sign in with GitHub
3. Click "Add New..." → "Project"

## Step 3: Import Repository
1. Find your repository in the list
2. Click "Import"

## Step 4: Configure Backend Project
**IMPORTANT:** Configure these settings:

1. **Project Name**: `jgec-learn-backend` (or any name you want)

2. **Root Directory**: Click "Edit" → Type `server` → Click "Continue"
   ```
   Root Directory: server
   ```

3. **Build Settings**: Leave as default

4. **Environment Variables**: Click "Add" for each:
   ```
   MONGODB_URI
   mongodb+srv://collegebusiness207_db_user:iJinkjBpKGIk48jx@cluster0.udlmizf.mongodb.net/learningplatform?appName=Cluster0

   JWT_SECRET
   your_super_secret_jwt_key_change_this_in_production_12345

   JWT_EXPIRE
   7d

   EMAIL_USER
   swarnendumajumder099@gmail.com

   EMAIL_APP_PASSWORD
   cnyugaxzmrpdeifz
   ```

5. Click "Deploy"

## Step 5: Wait for Deployment
- Wait 1-2 minutes
- You'll see "Congratulations!" when done

## Step 6: Copy Backend URL
1. Click "Visit" or copy the URL
2. It will be like: `https://jgec-learn-backend.vercel.app`
3. **SAVE THIS URL** - you need it for frontend!

## Step 7: Test Backend
Open: `https://your-backend-url.vercel.app/api/health`

Should see:
```json
{
  "status": "ok",
  "timestamp": "...",
  "uptime": 123,
  "database": "MongoDB"
}
```

## Done! ✅
Your backend is live. Now use this URL for frontend deployment.

Next: Deploy frontend with `VITE_API_URL=https://your-backend-url.vercel.app/api`
