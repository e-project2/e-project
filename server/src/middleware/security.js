import rateLimit from 'express-rate-limit';
import { securityConfig } from '../config/security.js';

// Rate Limiter cho các API chung
export const apiLimiter = rateLimit(securityConfig.rateLimits.general);

// Rate Limiter bảo vệ đăng nhập / đăng ký chống brute force
export const authLimiter = rateLimit(securityConfig.rateLimits.auth);

// Rate Limiter chống spam biểu mẫu liên hệ
export const contactLimiter = rateLimit(securityConfig.rateLimits.contact);

/**
 * Middleware làm sạch NoSQL injection (chặn các key bắt đầu bằng $ hoặc có dấu chấm)
 */
export function sanitizeInputs(req, res, next) {
  function clean(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        clean(obj[key]);
      }
    }
    return obj;
  }

  if (req.body) clean(req.body);
  if (req.params) clean(req.params);
  // Không sửa đổi req.query trực tiếp nếu là read-only, xử lý an toàn
  try {
    if (req.query) clean(req.query);
  } catch {
    // req.query may be getter-only in some express configs
  }

  next();
}

export default {
  apiLimiter,
  authLimiter,
  contactLimiter,
  sanitizeInputs
};
