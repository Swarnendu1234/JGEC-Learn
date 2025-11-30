import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGODB_URI);

const courseSchema = new mongoose.Schema({
  id: Number,
  title: String,
  badge: String,
  progress: Number,
  status: String,
  tags: [String],
  image: String
});

const Course = mongoose.model('Course', courseSchema);

const courses = [
  {
    id: 1,
    title: "Introduction to Computer Science",
    badge: "MIT",
    progress: 75,
    status: "active",
    tags: ["Computer Science", "Programming", "Algorithms"],
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97"
  },
  {
    id: 2,
    title: "Python for Everybody",
    badge: "Harvard",
    progress: 42,
    status: "active",
    tags: ["Python", "Programming", "Data Science"],
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935"
  },
  {
    id: 3,
    title: "Machine Learning Specialization",
    badge: "Stanford",
    progress: 18,
    status: "active",
    tags: ["Machine Learning", "AI", "Python"],
    image: "https://images.unsplash.com/photo-1555949963-aa79dcee981c"
  },
  {
    id: 4,
    title: "Web Development Bootcamp",
    badge: "Google",
    progress: 100,
    status: "completed",
    tags: ["Web Development", "HTML", "CSS", "JavaScript"],
    image: "https://images.unsplash.com/photo-1547658719-da2b51169166"
  },
  {
    id: 5,
    title: "Data Science Professional Certificate",
    badge: "IBM",
    progress: 65,
    status: "active",
    tags: ["Data Science", "Python", "Analytics"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71"
  },
  {
    id: 6,
    title: "Full Stack Development",
    badge: "Yale",
    progress: 30,
    status: "active",
    tags: ["Full Stack", "React", "Node.js"],
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
  }
];

async function seedDatabase() {
  await Course.deleteMany({});
  await Course.insertMany(courses);
  console.log('Database seeded with courses!');
  process.exit();
}

seedDatabase();