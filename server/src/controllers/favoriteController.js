import Favorite from '../models/Favorite.js';
import Book from '../models/Book.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Lấy danh sách sách yêu thích của người dùng hiện hành
 */
export async function getUserFavorites(req, res, next) {
  try {
    const userId = req.user._id;

    const favorites = await Favorite.find({ userId })
      .populate({
        path: 'bookId',
        select: '_id title authorId coverImage genre language rating readingLevel',
        populate: { path: 'authorId', select: 'name' }
      })
      .sort({ addedAt: -1 });

    return sendSuccess(res, favorites, 'Lấy danh sách yêu thích thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Bật/Tắt trạng thái yêu thích một cuốn sách (Toggle Favorite)
 */
export async function toggleFavorite(req, res, next) {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;

    const book = await Book.findById(bookId);
    if (!book) {
      return sendError(res, `Không tìm thấy cuốn sách với mã '${bookId}'.`, 404);
    }

    const existing = await Favorite.findOne({ userId, bookId });

    if (existing) {
      await Favorite.deleteOne({ _id: existing._id });
      return sendSuccess(
        res,
        { bookId, isFavorited: false },
        'Đã bỏ cuốn sách khỏi danh sách yêu thích.'
      );
    } else {
      const newFav = await Favorite.create({ userId, bookId });
      return sendSuccess(
        res,
        { bookId, isFavorited: true, addedAt: newFav.addedAt },
        'Đã thêm cuốn sách vào danh sách yêu thích!',
        null,
        201
      );
    }
  } catch (error) {
    next(error);
  }
}

/**
 * Kiểm tra xem 1 cuốn sách đã được người dùng yêu thích chưa
 */
export async function checkFavorite(req, res, next) {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;

    const existing = await Favorite.findOne({ userId, bookId });
    return sendSuccess(res, { bookId, isFavorited: !!existing }, 'Kiểm tra trạng thái yêu thích');
  } catch (error) {
    next(error);
  }
}

/**
 * Xóa một cuốn sách khỏi danh sách yêu thích
 */
export async function removeFavorite(req, res, next) {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;

    const result = await Favorite.findOneAndDelete({ userId, bookId });
    if (!result) {
      return sendError(res, 'Sách không có trong danh sách yêu thích.', 404);
    }

    return sendSuccess(res, null, 'Đã xóa sách khỏi danh sách yêu thích.');
  } catch (error) {
    next(error);
  }
}

export default {
  getUserFavorites,
  toggleFavorite,
  checkFavorite,
  removeFavorite
};
