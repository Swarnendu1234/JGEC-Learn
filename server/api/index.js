import express from 'express';
import cors from 'cors';
import { connectDB } from '../db.js';
import { Course } from '../models/Course.js';
import { verifyToken } from '../middleware/auth.js';
import authRouter from '../routes/auth.js';

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

let isConnected = false;
const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    await connectDB();
    isConnected = true;
  } catch (error) {
    console.error('DB connection error:', error);
  }
};

app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    database: 'MongoDB'
  });
});

app.use('/api/auth', authRouter);

app.get('/api/courses', verifyToken, async (req, res) => {
  try {
    await connectToDatabase();
    const courses = await Course.find().sort({ id: 1 });
    res.json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/courses', async (req, res) => {
  try {
    await connectToDatabase();
    const newCourse = req.body;
    
    if (!newCourse.title) {
      return res.status(400).json({ error: 'Title is required' });
    }

    if (!newCourse.id) {
      const lastCourse = await Course.findOne().sort({ id: -1 });
      newCourse.id = lastCourse ? lastCourse.id + 1 : 1;
    }

    if (typeof newCourse.id === 'string') {
      newCourse.id = parseInt(newCourse.id, 10);
    }
    
    const course = new Course(newCourse);
    const savedCourse = await course.save();
    res.json(savedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/api/courses/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const id = parseInt(req.params.id);
    const result = await Course.deleteOne({ id });
    
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/courses/:id', async (req, res) => {
  try {
    await connectToDatabase();
    const id = parseInt(req.params.id);
    const updatedCourse = await Course.findOneAndUpdate({ id }, req.body, { new: true });
    
    if (!updatedCourse) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    res.json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default app;
