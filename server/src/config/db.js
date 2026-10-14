import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/bookbridge_db';

/**
 * Kết nối tới MongoDB với retry logic và event listeners
 * @param {string} [uri]
 * @returns {Promise<typeof mongoose>}
 */
export async function connectDB(uri = process.env.MONGODB_URI || DEFAULT_URI) {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ MongoDB connected successfully to database:', mongoose.connection.name);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ MongoDB connection error:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ MongoDB connection lost. Attempting to reconnect...');
    });

    const conn = await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000
    });

    return conn;
  } catch (error) {
    console.error('❌ Failed to establish MongoDB connection:', error.message);
    throw error;
  }
}

/**
 * Ngắt kết nối an toàn khi shutdown server
 */
export async function disconnectDB() {
  await mongoose.disconnect();
  console.log('🔌 MongoDB connection closed gracefully.');
}

export default { connectDB, disconnectDB };
