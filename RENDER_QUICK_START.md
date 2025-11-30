# Render Quick Start (5 Minutes)

## 1. Push to GitHub
```bash
git add .
git commit -m "Deploy to Render"
git push
```

## 2. Deploy Backend
1. Go to https://render.com → Sign up with GitHub
2. New + → Web Service → Connect your repo
3. Settings:
   - Root Directory: `server`
   - Build: `npm install`
   - Start: `node server.js`
4. Add 5 environment variables (MongoDB, JWT, Email)
5. Create → Wait 3 minutes
6. **Copy backend URL**

## 3. Deploy Frontend
1. New + → Static Site → Same repo
2. Settings:
   - Build: `npm install && npm run build`
   - Publish: `dist`
3. Add env: `VITE_API_URL` = `your-backend-url/api`
4. Create → Wait 2 minutes

## 4. Done! 🎉
Open your frontend URL and test login!

**Note:** First load takes 30s (free tier cold start)
