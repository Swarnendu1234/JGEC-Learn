# Fix 405 Error - Frontend Not Connected to Backend

## The Problem
Your frontend is trying to call `/api/auth/login` on the same domain (jgec-learn2025.vercel.app), but your backend is deployed separately.

## The Solution

### Step 1: Get Your Backend URL
1. Go to your backend project in Vercel
2. Copy the URL (e.g., `https://jgec-learn-backend.vercel.app`)

### Step 2: Add Environment Variable to Frontend
1. Go to your **FRONTEND** project in Vercel (jgec-learn2025)
2. Click "Settings" → "Environment Variables"
3. Add new variable:
   - **Name**: `VITE_API_URL`
   - **Value**: `https://your-backend-url.vercel.app/api` (replace with YOUR backend URL)
   - **Environment**: Production, Preview, Development (select all)
4. Click "Save"

### Step 3: Redeploy Frontend
1. Go to "Deployments" tab
2. Click the three dots on latest deployment
3. Click "Redeploy"

## Example
If your backend URL is: `https://jgec-backend-abc123.vercel.app`

Then set:
```
VITE_API_URL = https://jgec-backend-abc123.vercel.app/api
```

## Verify It Works
After redeploying, open browser console and check:
- Network tab should show requests going to your backend URL
- No more 405 errors

Done! 🚀
