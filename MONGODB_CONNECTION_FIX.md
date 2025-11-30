# MongoDB Connection Setup - Choose Your Method

Your error shows MongoDB connection issues. Choose one of these 2 solutions:

---

## ✅ OPTION 1: Use Local MongoDB (Recommended for Development)

### Step 1: Install MongoDB Community Edition
- **Windows**: Download from https://www.mongodb.com/try/download/community
- **Mac**: `brew install mongodb-community`
- **Linux**: Follow MongoDB official guide

### Step 2: Start MongoDB Service

**Windows**:
1. Open Services (press `Win + R` → `services.msc`)
2. Find "MongoDB Server"
3. Right-click → Start
4. Or run: `mongod` in terminal

**Mac**:
```bash
brew services start mongodb-community
# Or run: mongod
```

**Linux**:
```bash
sudo systemctl start mongod
# Or: mongod
```

### Step 3: Verify .env Configuration
```
MONGODB_URI=mongodb://localhost:27017/jgec-learn
PORT=3000
```

### Step 4: Start Server
```bash
cd server
npm run start
```

**Expected Output**:
```
Server running on http://localhost:3000
✅ MongoDB connected successfully
```

---

## ✅ OPTION 2: Use MongoDB Atlas (Cloud)

If you want to use MongoDB Atlas instead:

### Step 1: Create MongoDB Atlas Account
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create a cluster

### Step 2: Get Connection String
1. Click "Connect" on your cluster
2. Choose "Drivers"
3. Copy the connection string

### Step 3: Update .env
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/jgec-learn?retryWrites=true&w=majority
PORT=3000
```

### Step 4: Whitelist Your IP
1. In Atlas Dashboard → Security → Network Access
2. Click "Add IP Address"
3. Add your IP or `0.0.0.0/0` (allows all - not recommended for production)

### Step 5: Start Server
```bash
cd server
npm run start
```

---

## 🐛 Troubleshooting

### "MongoDB is not running"
✅ **Fix**: Start MongoDB service (see Option 1, Step 2)

### SSL/TLS Connection Error
✅ **Fix**: If using Atlas, make sure:
- IP is whitelisted in Network Access
- Connection string has correct credentials
- String includes `?retryWrites=true&w=majority`

### "Connection refused"
✅ **Fix**: 
- Check MongoDB is running
- Check port 27017 is available
- Restart MongoDB service

### "Could not connect to any servers"
✅ **Fix**: 
- Stop server (`Ctrl+C`)
- Restart MongoDB
- Restart server: `npm run start`

---

## 🔍 Test Your Connection

### For Local MongoDB
```bash
# Open another terminal and run:
mongosh
# You should see: > _

# See your database:
show dbs

# Use your database:
use jgec-learn

# See your courses:
db.courses.find()

# Exit:
exit
```

### For MongoDB Atlas
```bash
# In Atlas Dashboard, click "Connect" → "MongoDB Compass"
# Or use mongosh with your connection string
```

---

## 📝 Current Configuration

Your `.env` is set up for **local MongoDB**:
```
MONGODB_URI=mongodb://localhost:27017/jgec-learn
PORT=3000
```

To use this:
1. ✅ Install MongoDB (if not done)
2. ✅ Start MongoDB service
3. ✅ Run `npm run start`
4. ✅ Test by adding a course

---

## ✨ Next Steps

1. **Choose**: Local MongoDB (Option 1) or Atlas (Option 2)
2. **Setup**: Follow the steps for your choice
3. **Start**: Run `npm run start` in server folder
4. **Test**: Add a course through Admin Panel
5. **Verify**: Check MongoDB has the course

---

## 💡 Quick Check

Run this to see what MongoDB your server is trying to use:
```bash
cd server
node -e "require('dotenv').config(); console.log('Connecting to:', process.env.MONGODB_URI)"
```

Should output:
```
Connecting to: mongodb://localhost:27017/jgec-learn
```

If you see something different, update your `.env` file.

---

**Need Help?** 
- For local MongoDB: Make sure `mongod` is running
- For Atlas: Check IP whitelist and credentials
- Ask in terminal if you get error messages
