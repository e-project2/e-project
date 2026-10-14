import mongoose from 'mongoose';

const DEFAULT_URI = 'mongodb://127.0.0.1:27017/bookbridge_db';

/**
 * Kết nối tới MongoDB Database
 * @param {string} [uri] - MongoDB Connection URI (mặc định lấy từ process.env.MONGODB_URI hoặc localhost)
 * @returns {Promise<typeof mongoose>}
 */
export async function connectDB(uri = process.env.MONGODB_URI || DEFAULT_URI) {
  try {
    mongoose.connection.on('connected', () => {
      console.log('✅ Đã kết nối thành công tới MongoDB:', mongoose.connection.name);
    });

    mongoose.connection.on('error', (err) => {
      console.error('❌ Lỗi kết nối MongoDB:', err.message);
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️ Đã ngắt kết nối với MongoDB');
    });

    const conn = await mongoose.connect(uri, {
      autoIndex: true,
      serverSelectionTimeoutMS: 5000
    });

    return conn;
  } catch (error) {
    console.error('❌ Không thể khởi tạo kết nối MongoDB:', error.message);
    throw error;
  }
}

/**
 * Đóng kết nối MongoDB an toàn
 */
export async function disconnectDB() {
  await mongoose.disconnect();
  console.log('🔌 Đã đóng kết nối MongoDB an toàn.');
}

export default { connectDB, disconnectDB };
