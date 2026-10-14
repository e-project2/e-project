import Review from '../models/Review.js';
import Book from '../models/Book.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Cập nhật lại điểm đánh giá trung bình của cuốn sách
 * @param {string} bookId
 */
async function recalculateBookRating(bookId) {
  const reviews = await Review.find({ bookId });
  if (reviews.length === 0) {
    await Book.findByIdAndUpdate(bookId, { rating: 4.5, reviewCount: 0 });
    return;
  }
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const avg = Math.round((totalRating / reviews.length) * 10) / 10;
  await Book.findByIdAndUpdate(bookId, { rating: avg, reviewCount: reviews.length });
}

/**
 * Lấy danh sách nhận xét & đánh giá của 1 cuốn sách
 */
export async function getBookReviews(req, res, next) {
  try {
    const { bookId } = req.params;

    const reviews = await Review.find({ bookId })
      .populate('userId', 'username fullName avatar')
      .sort({ createdAt: -1 });

    return sendSuccess(res, reviews, 'Lấy danh sách đánh giá thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Tạo mới hoặc cập nhật đánh giá sách của người dùng
 */
export async function createReview(req, res, next) {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;
    const { rating, comment } = req.body;

    const book = await Book.findById(bookId);
    if (!book) {
      return sendError(res, `Không tìm thấy cuốn sách với mã '${bookId}'.`, 404);
    }

    let review = await Review.findOne({ userId, bookId });
    let isNew = false;

    if (review) {
      review.rating = Number(rating);
      review.comment = comment.trim();
      await review.save();
    } else {
      review = await Review.create({
        userId,
        bookId,
        rating: Number(rating),
        comment: comment.trim()
      });
      isNew = true;
    }

    // Tính toán lại điểm số cho sách
    await recalculateBookRating(bookId);

    await review.populate('userId', 'username fullName avatar');

    return sendSuccess(
      res,
      review,
      isNew ? 'Đăng cảm nhận thành công!' : 'Cập nhật cảm nhận thành công!',
      null,
      isNew ? 201 : 200
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Xóa đánh giá (Người dùng tự xóa hoặc Quản trị viên xóa)
 */
export async function deleteReview(req, res, next) {
  try {
    const { reviewId } = req.params;
    const user = req.user;

    const review = await Review.findById(reviewId);
    if (!review) {
      return sendError(res, 'Không tìm thấy đánh giá cần xóa.', 404);
    }

    // Chỉ chủ sở hữu hoặc admin mới được xóa
    if (review.userId.toString() !== user._id.toString() && user.role !== 'admin') {
      return sendError(res, 'Bạn không có quyền xóa đánh giá này.', 403);
    }

    const bookId = review.bookId;
    await Review.findByIdAndDelete(reviewId);

    // Tính toán lại điểm số cho sách
    await recalculateBookRating(bookId);

    return sendSuccess(res, null, 'Đã xóa đánh giá thành công!');
  } catch (error) {
    next(error);
  }
}

export default { getBookReviews, createReview, deleteReview };
