# Fix Render Deployment Error

## The Problem
Render is trying to run `npm run build` but backend doesn't have that script.

## The Solution

### In Render Dashboard:

1. Go to your service (jgec-learn-backend)
2. Click "Settings" (left sidebar)
3. Scroll to "Build & Deploy"
4. Change these:

**Root Directory:**
```
server
```

**Build Command:**
```
npm install
```

**Start Command:**
```
node server.js
```

5. Click "Save Changes"
6. Go to "Manual Deploy" → "Deploy latest commit"

## Done! 🚀

Now push the updated code:
```bash
git add .
git commit -m "Fix Render config"
git push
```

Then redeploy in Render!
