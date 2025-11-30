import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

console.log('📦 Modules loaded successfully');

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataFile = path.join(__dirname, 'courses.json');

const app = express();
console.log('✓ Express app created');

app.use(cors());
app.use(express.json());
console.log('✓ Middleware configured');

console.log('\n🚀 Server starting...');

// Load courses from JSON file
function loadCourses() {
  try {
    if (fs.existsSync(dataFile)) {
      const data = fs.readFileSync(dataFile, 'utf-8');
      return JSON.parse(data);
    }
    return [];
  } catch (error) {
    console.error('Error reading courses:', error.message);
    return [];
  }
}

// Save courses to JSON file
function saveCourses(courses) {
  try {
    fs.writeFileSync(dataFile, JSON.stringify(courses, null, 2));
    return true;
  } catch (error) {
    console.error('Error saving courses:', error.message);
    return false;
  }
}

// GET all courses
app.get('/api/courses', (req, res) => {
  try {
    const courses = loadCourses();
    res.json(courses);
  } catch (error) {
    console.error('Error fetching courses:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// POST - Add course
app.post('/api/courses', (req, res) => {
  try {
    const courses = loadCourses();
    const newCourse = req.body;
    
    if (!newCourse.title) {
      return res.status(400).json({ error: 'Title is required' });
    }
    
    courses.push(newCourse);
    saveCourses(courses);
    res.json(newCourse);
  } catch (error) {
    console.error('Error saving course:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// DELETE course
app.delete('/api/courses/:id', (req, res) => {
  try {
    const courses = loadCourses();
    const id = parseInt(req.params.id);
    const initialLength = courses.length;
    
    const filtered = courses.filter(c => c.id !== id);
    
    if (filtered.length === initialLength) {
      return res.status(404).json({ error: 'Course not found' });
    }
    
    saveCourses(filtered);
    res.json({ success: true });
  } catch (error) {
    console.error('Error deleting course:', error.message);
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 3000;

console.log(`\n🚀 Attempting to start server on port ${PORT}...`);

const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`\n✅ Server successfully listening on http://localhost:${PORT}`);
  console.log(`📂 Storage: File-Based (courses.json)`);
  console.log(`📝 Ready to accept requests...\n`);
});

server.on('error', (error) => {
  if (error.code === 'EADDRINUSE') {
    console.error(`❌ Port ${PORT} is already in use`);
  } else {
    console.error('❌ Server error:', error);
  }
  process.exit(1);
});

// Graceful shutdown on SIGINT (Ctrl+C)
let shutdownInProgress = false;
process.on('SIGINT', () => {
  if (shutdownInProgress) return;
  shutdownInProgress = true;
  console.log('\n⛔ Server shutting down...');
  server.close(() => {
    console.log('✓ Server stopped');
    process.exit(0);
  });
  // Force exit after 5 seconds if not closed
  setTimeout(() => {
    console.error('⚠️ Forced exit');
    process.exit(1);
  }, 5000);
});