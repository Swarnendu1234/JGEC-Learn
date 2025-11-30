# 🚀 Deploy to Render.com - Complete Tutorial

## Why Render?
✅ Free tier available
✅ No serverless complications
✅ Easy MongoDB integration
✅ Automatic HTTPS
✅ Simple deployment

---

## Step 1: Prepare Your Code

### 1.1 Push to GitHub
```bash
git add .
git commit -m "Ready for Render deployment"
git push
```

---

## Step 2: Deploy Backend

### 2.1 Go to Render
1. Open https://render.com
2. Click "Get Started" or "Sign Up"
3. Sign up with GitHub

### 2.2 Create Backend Service
1. Click "New +" → "Web Service"
2. Click "Connect" next to your repository
3. Configure:
   - **Name:** `jgec-learn-backend`
   - **Region:** Singapore (or closest to you)
   - **Root Directory:** `server`
   - **Environment:** Node
   - **Build Command:** `npm install`
   - **Start Command:** `node server.js`
   - **Plan:** Free

### 2.3 Add Environment Variables
Click "Advanced" → Add these variables:

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

NODE_ENV
production
```

### 2.4 Deploy
1. Click "Create Web Service"
2. Wait 3-5 minutes for deployment
3. **Copy your backend URL** (e.g., `https://jgec-learn-backend.onrender.com`)

### 2.5 Test Backend
Open: `https://your-backend-url.onrender.com/api/health`

Should see:
```json
{"status":"ok","timestamp":"...","database":"MongoDB"}
```

✅ Backend is live!

---

## Step 3: Deploy Frontend

### 3.1 Update API URL in Code
Open `src/services/api.js` and update:
```javascript
const API_BASE = import.meta.env.VITE_API_URL || 'https://your-backend-url.onrender.com/api';
```
Replace with YOUR backend URL from Step 2.4

### 3.2 Push Changes
```bash
git add .
git commit -m "Update API URL for Render"
git push
```

### 3.3 Create Frontend Service
1. Go back to Render Dashboard
2. Click "New +" → "Static Site"
3. Connect your repository
4. Configure:
   - **Name:** `jgec-learn-frontend`
   - **Root Directory:** Leave empty (root)
   - **Build Command:** `npm install && npm run build`
   - **Publish Directory:** `dist`

### 3.4 Add Environment Variable
Click "Advanced" → Add:
```
VITE_API_URL
https://your-backend-url.onrender.com/api
```

### 3.5 Deploy
1. Click "Create Static Site"
2. Wait 2-3 minutes
3. Your frontend URL: `https://jgec-learn-frontend.onrender.com`

---

## Step 4: Update Backend CORS

### 4.1 Add Frontend URL to Backend
1. Go to backend service in Render
2. Click "Environment"
3. Add new variable:
```
FRONTEND_URL
https://jgec-learn-frontend.onrender.com
```

### 4.2 Redeploy Backend
1. Click "Manual Deploy" → "Deploy latest commit"
2. Wait for deployment

---

## Step 5: Test Your App

1. Open your frontend URL: `https://jgec-learn-frontend.onrender.com`
2. Try to login/signup
3. Everything should work! 🎉

---

## Important Notes

### Free Tier Limitations
- Backend sleeps after 15 minutes of inactivity
- First request after sleep takes 30-60 seconds (cold start)
- 750 hours/month free

### Keep Backend Awake (Optional)
Use a service like UptimeRobot to ping your backend every 10 minutes:
- URL to ping: `https://your-backend-url.onrender.com/api/health`

### MongoDB Atlas
Make sure MongoDB Atlas allows connections from anywhere:
1. Go to MongoDB Atlas
2. Network Access → Add IP Address
3. Add `0.0.0.0/0` (Allow from anywhere)

---

## Troubleshooting

### Backend not starting?
- Check logs in Render dashboard
- Verify all environment variables are set
- Check MongoDB connection string

### Frontend can't connect to backend?
- Verify `VITE_API_URL` is set correctly
- Check backend CORS allows your frontend URL
- Test backend health endpoint

### Login not working?
- Check browser console for errors
- Verify backend URL in network tab
- Make sure MongoDB is accessible

---

## Your Live URLs

After deployment:
- **Frontend:** `https://jgec-learn-frontend.onrender.com`
- **Backend:** `https://jgec-learn-backend.onrender.com`
- **API Health:** `https://jgec-learn-backend.onrender.com/api/health`

---

## Updating Your App

When you make changes:
```bash
git add .
git commit -m "Your changes"
git push
```

Render will automatically redeploy! 🚀

---

## Cost

**Free Forever:**
- 750 hours/month backend
- Unlimited static site hosting
- Automatic SSL
- Custom domains (optional)

**Upgrade to Paid ($7/month):**
- No sleep
- Faster builds
- More resources

---

## Success! 🎉

Your learning platform is now live on Render!

**Next Steps:**
1. Share your frontend URL with users
2. Set up custom domain (optional)
3. Monitor usage in Render dashboard
4. Add UptimeRobot to prevent sleep (optional)

Enjoy your deployed app! 🚀
