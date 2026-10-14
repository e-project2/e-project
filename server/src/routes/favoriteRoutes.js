import express from 'express';
import {
  getUserFavorites,
  toggleFavorite,
  checkFavorite,
  removeFavorite
} from '../controllers/favoriteController.js';
import { verifyToken } from '../middleware/auth.js';

const router = express.Router();

// Yêu cầu xác thực người dùng cho danh mục yêu thích
router.use(verifyToken);

router.get('/', getUserFavorites);
router.get('/:bookId/check', checkFavorite);
router.post('/:bookId', toggleFavorite);
router.delete('/:bookId', removeFavorite);

export default router;
