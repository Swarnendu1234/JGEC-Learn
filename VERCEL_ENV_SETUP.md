# Vercel Environment Variables Setup

## Backend Environment Variables

Go to your backend project in Vercel → Settings → Environment Variables

Add these 6 variables:

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

FRONTEND_URL
https://jgec-learn2025.vercel.app
```

## Frontend Environment Variables

Go to your frontend project in Vercel → Settings → Environment Variables

Add this 1 variable:

```
VITE_API_URL
https://jgec-learn-backend.vercel.app/api
```

## After Adding Variables

1. Go to Deployments tab
2. Click "..." on latest deployment
3. Click "Redeploy"
4. Wait for deployment to complete

Done! 🚀
