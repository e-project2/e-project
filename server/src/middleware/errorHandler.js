import { sendError } from '../utils/response.js';

/**
 * 404 Not Found Handler
 */
export function notFoundHandler(req, res) {
  return sendError(
    res,
    `Đường dẫn API không tồn tại: [${req.method}] ${req.originalUrl}`,
    404
  );
}

/**
 * Global Error Handler Middleware
 */
export function globalErrorHandler(err, req, res, next) {
  // Ghi log lỗi chi tiết ra console
  console.error('💥 [Server Error]:', {
    method: req.method,
    url: req.originalUrl,
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });

  // Mongoose Validation Error
  if (err.name === 'ValidationError') {
    const errorDetails = Object.values(err.errors).map((e) => e.message);
    return sendError(res, 'Dữ liệu không hợp lệ.', 422, errorDetails);
  }

  // MongoDB Duplicate Key (Code 11000)
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue || {})[0] || 'trường dữ liệu';
    const val = err.keyValue ? err.keyValue[field] : '';
    return sendError(
      res,
      `Giá trị '${val}' cho ${field} đã tồn tại trong hệ thống. Vui lòng chọn giá trị khác.`,
      409
    );
  }

  // Mongoose CastError (Sai kiểu dữ liệu ObjectId, Number)
  if (err.name === 'CastError') {
    return sendError(
      res,
      `Định dạng dữ liệu không hợp lệ cho trường: ${err.path}`,
      400
    );
  }

  // JWT Errors
  if (err.name === 'JsonWebTokenError') {
    return sendError(res, 'Mã thông báo không hợp lệ.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    return sendError(res, 'Mã thông báo đã hết hạn.', 401);
  }

  // Lỗi máy chủ chung (500)
  const statusCode = err.statusCode || 500;
  const message =
    process.env.NODE_ENV === 'production' && statusCode === 500
      ? 'Đã xảy ra lỗi nội bộ phía máy chủ. Vui lòng thử lại sau.'
      : err.message || 'Lỗi máy chủ không xác định.';

  return sendError(res, message, statusCode);
}

export default { notFoundHandler, globalErrorHandler };
