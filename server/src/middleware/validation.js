import { sendError } from '../utils/response.js';

const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

/**
 * Validate thông tin đăng ký tài khoản
 */
export function validateRegister(req, res, next) {
  const { username, email, password } = req.body;
  const errors = [];

  if (!username || typeof username !== 'string' || username.trim().length < 3) {
    errors.push('Tên đăng nhập phải có ít nhất 3 ký tự.');
  }

  if (!email || !emailRegex.test(email)) {
    errors.push('Địa chỉ email không hợp lệ.');
  }

  if (!password || typeof password !== 'string' || password.length < 6) {
    errors.push('Mật khẩu phải chứa ít nhất 6 ký tự.');
  }

  if (errors.length > 0) {
    return sendError(res, 'Dữ liệu đăng ký không hợp lệ.', 422, errors);
  }

  next();
}

/**
 * Validate thông tin đăng nhập
 */
export function validateLogin(req, res, next) {
  const { identifier, email, username, password } = req.body;
  const loginKey = identifier || email || username;

  if (!loginKey) {
    return sendError(res, 'Vui lòng cung cấp email hoặc tên đăng nhập.', 422);
  }

  if (!password) {
    return sendError(res, 'Vui lòng nhập mật khẩu.', 422);
  }

  next();
}

/**
 * Validate tạo mới / chỉnh sửa sách
 */
export function validateBook(req, res, next) {
  const { title, authorId, language, genre, readingLevel, publicationYear, pageCount, synopsis } = req.body;
  const errors = [];

  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    errors.push('Tựa đề sách không được để trống.');
  }

  if (!authorId || typeof authorId !== 'string') {
    errors.push('Mã tác giả (authorId) là bắt buộc.');
  }

  if (!language) {
    errors.push('Ngôn ngữ sách là bắt buộc.');
  }

  if (!genre) {
    errors.push('Thể loại sách là bắt buộc.');
  }

  if (!readingLevel) {
    errors.push('Cấp độ đọc là bắt buộc.');
  }

  if (!publicationYear || isNaN(publicationYear)) {
    errors.push('Năm xuất bản phải là số nguyên.');
  }

  if (!pageCount || isNaN(pageCount) || Number(pageCount) < 1) {
    errors.push('Số trang sách phải lớn hơn 0.');
  }

  if (!synopsis || typeof synopsis !== 'string' || synopsis.trim().length === 0) {
    errors.push('Tóm tắt nội dung sách không được để trống.');
  }

  if (errors.length > 0) {
    return sendError(res, 'Dữ liệu thông tin sách không hợp lệ.', 422, errors);
  }

  next();
}

/**
 * Validate cập nhật tiến trình đọc
 */
export function validateReadingProgress(req, res, next) {
  const { currentPage, totalPages, status } = req.body;
  const errors = [];

  if (currentPage !== undefined && (isNaN(currentPage) || Number(currentPage) < 0)) {
    errors.push('Số trang hiện tại không được âm.');
  }

  if (totalPages !== undefined && (isNaN(totalPages) || Number(totalPages) < 1)) {
    errors.push('Tổng số trang sách phải lớn hơn 0.');
  }

  if (currentPage !== undefined && totalPages !== undefined && Number(currentPage) > Number(totalPages)) {
    errors.push('Số trang đã đọc không thể vượt quá tổng số trang của cuốn sách.');
  }

  if (status && !['To Read', 'Reading', 'Completed'].includes(status)) {
    errors.push('Trạng thái đọc phải là To Read, Reading hoặc Completed.');
  }

  if (errors.length > 0) {
    return sendError(res, 'Dữ liệu tiến độ đọc không hợp lệ.', 422, errors);
  }

  next();
}

/**
 * Validate gửi biểu mẫu liên hệ
 */
export function validateContact(req, res, next) {
  const { name, email, subject, message } = req.body;
  const errors = [];

  if (!name || name.trim().length === 0) {
    errors.push('Họ và tên không được để trống.');
  }

  if (!email || !emailRegex.test(email)) {
    errors.push('Địa chỉ email không hợp lệ.');
  }

  if (!subject || subject.trim().length === 0) {
    errors.push('Tiêu đề liên hệ không được để trống.');
  }

  if (!message || message.trim().length < 5) {
    errors.push('Nội dung tin nhắn phải từ 5 ký tự trở lên.');
  }

  if (errors.length > 0) {
    return sendError(res, 'Dữ liệu liên hệ không hợp lệ.', 422, errors);
  }

  next();
}

/**
 * Validate đánh giá sách
 */
export function validateReview(req, res, next) {
  const { rating, comment } = req.body;
  const errors = [];

  if (!rating || isNaN(rating) || Number(rating) < 1 || Number(rating) > 5) {
    errors.push('Điểm đánh giá phải là số nguyên từ 1 đến 5 sao.');
  }

  if (!comment || comment.trim().length === 0) {
    errors.push('Nội dung nhận xét không được để trống.');
  }

  if (errors.length > 0) {
    return sendError(res, 'Dữ liệu đánh giá không hợp lệ.', 422, errors);
  }

  next();
}

export default {
  validateRegister,
  validateLogin,
  validateBook,
  validateReadingProgress,
  validateContact,
  validateReview
};
