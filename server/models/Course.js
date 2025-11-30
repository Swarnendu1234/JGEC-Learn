import mongoose from 'mongoose';

const courseSchema = new mongoose.Schema({
  id: { type: Number },
  title: { type: String, required: true },
  badge: { type: String },
  badgeColor: { type: String },
  progress: { type: Number, default: 0 },
  status: { type: String, default: 'progress' }, // Flexible status field
  modules: {
    completed: { type: Number, default: 0 },
    total: { type: Number, default: 0 }
  },
  enrolled: { type: String },
  duration: { type: String },
  rating: { type: String },
  certificateEarned: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  tags: [String],
  image: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update timestamp on save
courseSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

export const Course = mongoose.model('Course', courseSchema);
