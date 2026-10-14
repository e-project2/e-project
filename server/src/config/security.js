import dotenv from 'dotenv';
dotenv.config();

export const securityConfig = {
  jwt: {
    secret: process.env.JWT_SECRET || 'bookbridge_default_jwt_secret_change_me_998877',
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    refreshSecret: process.env.JWT_REFRESH_SECRET || 'bookbridge_refresh_secret_key_2026',
    refreshExpiresIn: process.env.JWT_REFRESH_EXPIRES_IN || '30d'
  },
  bcrypt: {
    saltRounds: 12
  },
  cors: {
    origin: (origin, callback) => {
      const allowed = (process.env.CORS_ORIGINS || '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      
      // Cho phép requests không có origin (như Mobile apps, Postman, curl) hoặc nằm trong danh sách whitelist
      if (!origin || allowed.length === 0 || allowed.includes(origin) || allowed.includes('*')) {
        return callback(null, true);
      }
      return callback(new Error('CORS Policy: Origin not allowed'));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
  },
  rateLimits: {
    // Giới hạn chung cho toàn bộ API (100 requests / 1 phút)
    general: {
      windowMs: 1 * 60 * 1000,
      max: 150,
      message: {
        success: false,
        message: 'Bạn đã gửi quá nhiều yêu cầu. Vui lòng thử lại sau 1 phút.'
      },
      standardHeaders: true,
      legacyHeaders: false
    },
    // Giới hạn cho đăng nhập / đăng ký (10 requests / 15 phút) nhằm chống brute-force
    auth: {
      windowMs: 15 * 60 * 1000,
      max: 15,
      message: {
        success: false,
        message: 'Quá nhiều yêu cầu xác thực. Vui lòng chờ 15 phút trước khi thử lại.'
      },
      standardHeaders: true,
      legacyHeaders: false
    },
    // Giới hạn gửi tin nhắn liên hệ (5 requests / 1 giờ) chống spam
    contact: {
      windowMs: 60 * 60 * 1000,
      max: 5,
      message: {
        success: false,
        message: 'Bạn đã gửi tối đa lượt liên hệ cho phép trong 1 giờ. Vui lòng quay lại sau.'
      },
      standardHeaders: true,
      legacyHeaders: false
    }
  }
};

export default securityConfig;
