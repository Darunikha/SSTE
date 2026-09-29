const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/srisastha_db', {
      serverSelectionTimeoutMS: 5000,
    });
    console.log(`[MongoDB] Database connected successfully: ${conn.connection.host}`);
  } catch (error) {
    // No database: fail queries immediately so controllers fall back to built-in data without a 10s wait
    mongoose.set('bufferCommands', false);
    console.warn(`[MongoDB] Notice: Could not connect to local MongoDB database (${error.message}). Running in mock/memory database mode for seamless testing.`);
  }
};

module.exports = connectDB;
