import mongoose from 'mongoose';

export async function connectDB() {
  try {
    const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/learning-platform';
    
    console.log('🔌 Connecting to MongoDB...');
    console.log('📍 Using URI:', mongodbUri.split('@')[0] + '@***'); // Hide password in logs
    
    await mongoose.connect(mongodbUri, {
      serverSelectionTimeoutMS: 5000,
    });

    console.log('✅ MongoDB connected successfully!');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    console.log('\n💡 Make sure MongoDB is running:');
    console.log('   Windows: mongod.exe');
    console.log('   Or use MongoDB Atlas for cloud database');
    return false;
  }
}

export async function disconnectDB() {
  try {
    await mongoose.disconnect();
    console.log('✓ MongoDB disconnected');
  } catch (error) {
    console.error('Error disconnecting:', error.message);
  }
}

export default mongoose;

