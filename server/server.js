import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, disconnectDB } from './db.js';
import { Course } from './models/Course.js';
import { verifyToken } from './middleware/auth.js';
import courseDetailsRouter from './routes/courseDetails.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('\n📦 Initializing backend server...');

// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, '.env') });
console.log('📁 Loading env from:', path.join(__dirname, '.env'));
console.log('🔐 MONGODB_URI loaded:', !!process.env.MONGODB_URI);

const app = express();

// Enhanced CORS configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'http://localhost:3000', 'http://127.0.0.1:5173', 'http://0.0.0.0:5173'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📥 ${req.method} ${req.path}`);
  next();
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err);
  res.status(500).json({ 
    error: 'Internal server error',
    details: err.message 
  });
});

console.log('\n🚀 Server starting...');

// Mount routes
app.use('/api', courseDetailsRouter);
app.use('/api/auth', (await import('./routes/auth.js')).default);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: 'MongoDB'
  });
});

// GET all courses
// GET all courses (Protected - requires authentication)
app.get('/api/courses', verifyToken, async (req, res) => {
  try {
    const courses = await Course.find().sort({ id: 1 });
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST - Add course
app.post('/api/courses', async (req, res) => {
  try {
    const newCourse = req.body;
    
    if (!newCourse.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    // Generate ID if not provided
    if (!newCourse.id) {
      const lastCourse = await Course.findOne().sort({ id: -1 });
      newCourse.id = lastCourse ? lastCourse.id + 1 : 1;
    }

    // Convert id to number if it's a string
    if (typeof newCourse.id === 'string') {
      newCourse.id = parseInt(newCourse.id, 10);
    }
    
    const course = new Course(newCourse);
    const savedCourse = await course.save();
    console.log(`✅ Course added: "${savedCourse.title}" (ID: ${savedCourse.id})`);
    res.json(savedCourse);
  } catch (error) {
    console.error('❌ Error saving course:');
    console.error('   Message:', error.message);
    console.error('   Full Error:', error);
    res.status(500).json({ error: error.message, details: error.toString() });
  }
});

// DELETE course
app.delete('/api/courses/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const result = await Course.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE course
app.put('/api/courses/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const updatedCourse = await Course.findOneAndUpdate({ id }, req.body, { new: true });
    
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(updatedCourse);
  } catch (error) {
    console.error('Error updating course:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found', path: req.path });
});

const PORT = process.env.PORT || 3000;

// Initialize server with MongoDB connection
async function startServer() {
  try {
    const connected = await connectDB();
    
    if (!connected) {
      console.error('❌ Failed to connect to MongoDB. Please ensure MongoDB is running.');
      console.log('\n💡 For local MongoDB:');
      console.log('   1. Download: https://www.mongodb.com/try/download/community');
      console.log('   2. Install and run mongod.exe');
      console.log('\n💡 Or use MongoDB Atlas (Cloud):');
      console.log('   1. Create account: https://www.mongodb.com/cloud/atlas');
      console.log('   2. Get connection string');
      console.log('   3. Set MONGODB_URI environment variable');
      process.exit(1);
    }

    // Check if database has courses, if not seed them
    const courseCount = await Course.countDocuments();
    if (courseCount === 0) {
      console.log('\n📝 No courses found, seeding database...');
      await seedInitialCourses();
    }

    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`\n✅ Backend server is running!`);
      console.log(`📡 Server URL: http://localhost:${PORT}`);
      console.log(`🔗 API Base: http://localhost:${PORT}/api`);
      console.log(`💾 Database: MongoDB`);
      console.log(`🎯 Frontend should be running on http://localhost:5173`);
      console.log('✓ Ready to accept requests\n');
    });

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use!`);
        console.log(`💡 Try killing the existing process or use a different port:`);
        console.log(`   SET PORT=3001 && node server.js`);
      } else {
        console.error('❌ Server startup error:', error);
      }
      process.exit(1);
    });

    // Keep process alive
    if (process.stdin.isTTY) {
      process.stdin.pause();
    }

    // Graceful shutdown
    let shutdownInProgress = false;
    process.on('SIGINT', async () => {
      if (shutdownInProgress) return;
      shutdownInProgress = true;
      console.log('\n\n⛔ Shutting down server gracefully...');
      server.close(async () => {
        await disconnectDB();
        console.log('✓ Server stopped');
        process.exit(0);
      });
      setTimeout(() => {
        console.error('⚠️ Forced shutdown after timeout');
        process.exit(1);
      }, 5000);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
}

// Seed initial courses
async function seedInitialCourses() {
  const initialCourses = [
    {
      id: 1,
      title: "Introduction to Computer Science",
      badge: "MIT",
      badgeColor: "blue",
      progress: 75,
      status: "progress",
      modules: { completed: 15, total: 20 },
      enrolled: "2,345",
      duration: "4 weeks",
      rating: "4.8",
      certificateEarned: false,
      isActive: true,
      tags: ["Computer Science", "Programming", "Algorithms"],
      image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
    },
    {
      id: 2,
      title: "Python for Everybody",
      badge: "Harvard",
      badgeColor: "red",
      progress: 42,
      status: "progress",
      modules: { completed: 8, total: 19 },
      enrolled: "3,891",
      duration: "6 weeks",
      rating: "4.7",
      certificateEarned: false,
      isActive: true,
      tags: ["Python", "Programming", "Data Science"],
      image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935"
    },
    {
      id: 3,
      title: "Machine Learning Specialization",
      badge: "Stanford",
      badgeColor: "orange",
      progress: 18,
      status: "progress",
      modules: { completed: 3, total: 17 },
      enrolled: "1,567",
      duration: "8 weeks",
      rating: "4.9",
      certificateEarned: false,
      isActive: true,
      tags: ["Machine Learning", "AI", "Python"],
      image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
    },
    {
      id: 4,
      title: "Web Development Bootcamp",
      badge: "Google",
      badgeColor: "green",
      progress: 100,
      status: "completed",
      modules: { completed: 22, total: 22 },
      enrolled: "5,234",
      duration: "12 weeks",
      rating: "4.6",
      certificateEarned: true,
      isActive: false,
      tags: ["Web Development", "HTML", "CSS", "JavaScript"],
      image: "https://images.unsplash.com/photo-1547658719-da2b51169166"
    },
    {
      id: 5,
      title: "Data Science Professional Certificate",
      badge: "IBM",
      badgeColor: "purple",
      progress: 65,
      status: "progress",
      modules: { completed: 13, total: 20 },
      enrolled: "2,876",
      duration: "5 weeks",
      rating: "4.5",
      certificateEarned: false,
      isActive: true,
      tags: ["Data Science", "Python", "Analytics"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
    },
    {
      id: 6,
      title: "Full Stack Development",
      badge: "Yale",
      badgeColor: "pink",
      progress: 30,
      status: "progress",
      modules: { completed: 6, total: 20 },
      enrolled: "4,123",
      duration: "10 weeks",
      rating: "4.7",
      certificateEarned: false,
      isActive: true,
      tags: ["Full Stack", "React", "Node.js"],
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
    }
  ];

  try {
    await Course.insertMany(initialCourses);
    console.log(`✅ Seeded ${initialCourses.length} courses into MongoDB`);
  } catch (error) {
    console.error('Error seeding courses:', error.message);
  }
}

// Start the server
startServer();