import express from 'express';
import {
  getUserProgress,
  getBookProgress,
  upsertProgress,
  deleteProgress,
  getReadingStats
} from '../controllers/trackerController.js';
import { verifyToken } from '../middleware/auth.js';
import { validateReadingProgress } from '../middleware/validation.js';

const router = express.Router();

// Mọi thao tác theo dõi tiến độ đọc đều cần xác thực (verifyToken)
router.use(verifyToken);

router.get('/', getUserProgress);
router.get('/stats', getReadingStats);
router.get('/:bookId', getBookProgress);
router.post('/:bookId', validateReadingProgress, upsertProgress);
router.delete('/:bookId', deleteProgress);

export default router;
