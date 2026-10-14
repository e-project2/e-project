import express from 'express';
import { getBookReviews, createReview, deleteReview } from '../controllers/reviewController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateReview } from '../middleware/validation.js';

const router = express.Router();

// Lấy danh sách đánh giá của sách (Công khai)
router.get('/book/:bookId', getBookReviews);

// Đăng đánh giá mới (Cần đăng nhập)
router.post('/book/:bookId', verifyToken, validateReview, createReview);

// Xóa đánh giá (Người dùng tự xóa hoặc Admin xóa)
router.delete('/:reviewId', verifyToken, deleteReview);

export default router;
