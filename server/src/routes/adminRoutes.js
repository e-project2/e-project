import express from 'express';
import {
  getDashboardStats,
  createBook,
  updateBook,
  deleteBook,
  createAuthor,
  updateAuthor,
  deleteAuthor,
  getUsers,
  updateUserStatus,
  updateUserRole,
  deleteUser,
  getContactMessages,
  updateContactStatus,
  deleteContactMessage,
  getAuditLogs
} from '../controllers/adminController.js';
import { verifyToken, requireAdmin } from '../middleware/auth.js';
import { validateBook } from '../middleware/validation.js';

const router = express.Router();

// Tất cả các route bên dưới đều bắt buộc phải đăng nhập và có quyền Quản trị viên (Admin)
router.use(verifyToken, requireAdmin);

// 1. Thống kê Bảng điều khiển (Dashboard Analytics)
router.get('/stats', getDashboardStats);

// 2. Quản lý Sách (Book Operations)
router.post('/books', validateBook, createBook);
router.put('/books/:id', updateBook);
router.delete('/books/:id', deleteBook);

// 3. Quản lý Tác giả (Author Operations)
router.post('/authors', createAuthor);
router.put('/authors/:id', updateAuthor);
router.delete('/authors/:id', deleteAuthor);

// 4. Quản trị Người dùng (User Management)
router.get('/users', getUsers);
router.put('/users/:id/status', updateUserStatus);
router.put('/users/:id/role', updateUserRole);
router.delete('/users/:id', deleteUser);

// 5. Quản lý Tin nhắn Liên hệ (Contact Messages)
router.get('/contacts', getContactMessages);
router.put('/contacts/:id', updateContactStatus);
router.delete('/contacts/:id', deleteContactMessage);

// 6. Nhật ký kiểm tra hệ thống (Audit Trail)
router.get('/logs', getAuditLogs);

export default router;
