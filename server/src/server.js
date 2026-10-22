import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

import { connectDB, disconnectDB } from './config/db.js';
import { securityConfig } from './config/security.js';
import { apiLimiter, sanitizeInputs } from './middleware/security.js';
import { notFoundHandler, globalErrorHandler } from './middleware/errorHandler.js';
import routes from './routes/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Nạp các biến môi trường từ .env
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ==========================================================================
   TẦNG BẢO MẬT & TIỀN XỬ LÝ (SECURITY & PRE-PROCESSING MIDDLEWARE)
   ========================================================================== */

// 1. Helmet: Thiết lập các HTTP Security Headers (XSS, Clickjacking, CSP, v.v.)
app.use(
  helmet({
    crossOriginResourcePolicy: { policy: 'cross-origin' }
  })
);

// 2. CORS: Cấu hình nguồn truy cập hợp lệ và cho phép credentials
app.use(cors(securityConfig.cors));

// 3. Request Logging: Ghi vết HTTP requests để kiểm soát truy cập
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan(':method :url :status :response-time ms - :remote-addr'));
}

// 4. Body Parsers: Giới hạn dung lượng tải trọng (Payload limit) chống tràn bộ nhớ
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// 5. NoSQL Injection Sanitizer: Ngăn chặn tấn công chèn toán tử MongoDB
app.use(sanitizeInputs);

// 6. Phục vụ tĩnh tài nguyên hình ảnh (Static Images)
const staticImagesPath = path.join(__dirname, '../../client/public/images');
app.use('/images', (req, res, next) => {
  if (req.path.endsWith('.jpg') || req.path.endsWith('.jpeg')) {
    const svgPath = path.join(staticImagesPath, req.path.replace(/\.jpe?g$/, '.svg'));
    if (fs.existsSync(svgPath)) {
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
      return res.sendFile(svgPath);
    }
  }
  next();
}, express.static(staticImagesPath, {
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.svg')) {
      res.setHeader('Content-Type', 'image/svg+xml; charset=utf-8');
    }
  }
}));

/* ==========================================================================
   TẦNG ĐỊA CHỈ & ROUTES CỦA HỆ THỐNG (API ROUTES LAYER)
   ========================================================================== */

// Trang chào mừng và tài liệu tóm tắt API ở trang chủ (/)
app.get('/', (req, res) => {
  res.status(200).json({
    service: 'BookBridge High-Performance API Server',
    description: 'Cổng Khám Phá Sách & Quản Lý Kế Hoạch Đọc (Aptech eProject)',
    version: '1.0.0',
    status: 'online',
    documentation: {
      healthCheck: '/api/health',
      auth: '/api/auth (register, login, me, profile)',
      books: '/api/books (list, search, filters, featured, :id)',
      authors: '/api/authors (list, :id)',
      collections: '/api/collections',
      gallery: '/api/gallery',
      readingTracker: '/api/tracker (user progress, stats)',
      favorites: '/api/favorites (user bookmarks)',
      reviews: '/api/reviews (ratings & reviews)',
      contact: '/api/contact (reader inquiries)',
      admin: '/api/admin (stats, books CRUD, authors CRUD, users, contacts, audit logs)'
    }
  });
});

// Gắn Rate Limiter và các API Routes chính thức
app.use('/api', apiLimiter, routes);

/* ==========================================================================
   TẦNG XỬ LÝ LỖI (ERROR HANDLING MIDDLEWARE)
   ========================================================================== */

// Bắt lỗi 404 cho các endpoint không hợp lệ
app.use(notFoundHandler);

// Bắt và chuẩn hóa toàn bộ ngoại lệ hệ thống
app.use(globalErrorHandler);

/* ==========================================================================
   KHỞI ĐỘNG MÁY CHỦ & ĐÓNG KẾT NỐI AN TOÀN (SERVER LIFECYCLE)
   ========================================================================== */

let server = null;

export async function startServer() {
  try {
    // Kết nối Cơ sở dữ liệu MongoDB
    await connectDB();

    server = app.listen(PORT, () => {
      console.log('\n======================================================');
      console.log(`🚀 BOOKBRIDGE BACKEND ĐANG CHẠY TẠI CỔNG: ${PORT}`);
      console.log(`📡 URL API Cơ sở: http://localhost:${PORT}/api`);
      console.log(`🏥 Health Check: http://localhost:${PORT}/api/health`);
      console.log(`🛡️  Bảo mật: Helmet, Rate Limiter, JWT & NoSQL Sanitizer`);
      console.log('======================================================\n');
    });

    return server;
  } catch (error) {
    console.error('❌ Khởi động máy chủ thất bại:', error.message);
    process.exit(1);
  }
}

// Lắng nghe tín hiệu dừng an toàn (Graceful Shutdown)
async function gracefulShutdown(signal) {
  console.log(`\n🛑 Nhận được tín hiệu ${signal}. Đang tắt máy chủ một cách an toàn...`);
  if (server) {
    server.close(async () => {
      console.log('HTTP Server đã đóng.');
      await disconnectDB();
      process.exit(0);
    });
  } else {
    await disconnectDB();
    process.exit(0);
  }
}

process.on('SIGINT', () => gracefulShutdown('SIGINT'));
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));

// Tự động khởi động nếu là file thực thi chính
const isDirectRun = process.argv[1] && (process.argv[1].endsWith('server.js') || process.argv[1].endsWith('server'));
if (isDirectRun && process.env.NODE_ENV !== 'test') {
  startServer();
}

export default app;
