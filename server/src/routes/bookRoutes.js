import express from 'express';
import {
  getBooks,
  getBookById,
  getFeaturedBooks,
  searchBooks,
  getFilterOptions
} from '../controllers/bookController.js';

const router = express.Router();

router.get('/', getBooks);
router.get('/featured', getFeaturedBooks);
router.get('/search', searchBooks);
router.get('/filters', getFilterOptions);
router.get('/:id', getBookById);

export default router;
