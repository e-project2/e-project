import ReadingProgress from '../models/ReadingProgress.js';
import Book from '../models/Book.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Lấy toàn bộ danh sách tiến độ đọc của người dùng hiện tại
 */
export async function getUserProgress(req, res, next) {
  try {
    const userId = req.user._id;
    const { status } = req.query;

    const filter = { userId };
    if (status && ['To Read', 'Reading', 'Completed'].includes(status)) {
      filter.status = status;
    }

    const list = await ReadingProgress.find(filter)
      .populate({
        path: 'bookId',
        select: '_id title authorId coverImage genre language pageCount rating',
        populate: { path: 'authorId', select: 'name' }
      })
      .sort({ lastUpdated: -1 });

    return sendSuccess(res, list, 'Lấy danh sách tiến trình đọc thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy tiến độ đọc của 1 cuốn sách cụ thể
 */
export async function getBookProgress(req, res, next) {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;

    const progress = await ReadingProgress.findOne({ userId, bookId }).populate('bookId');
    if (!progress) {
      return sendSuccess(res, null, 'Chưa có tiến trình đọc cho cuốn sách này.');
    }

    return sendSuccess(res, progress, 'Lấy tiến trình đọc của sách thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Thêm mới hoặc cập nhật tiến độ đọc sách (Upsert)
 */
export async function upsertProgress(req, res, next) {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;
    const { currentPage, totalPages, status, notes } = req.body;

    // Kiểm tra sách có tồn tại không
    const book = await Book.findById(bookId);
    if (!book) {
      return sendError(res, `Không tìm thấy cuốn sách với mã '${bookId}'.`, 404);
    }

    const effectiveTotalPages = totalPages ? Number(totalPages) : book.pageCount;
    const effectiveCurrentPage = currentPage !== undefined ? Number(currentPage) : 0;

    if (effectiveCurrentPage < 0) {
      return sendError(res, 'Số trang đã đọc không được nhỏ hơn 0.', 400);
    }

    if (effectiveCurrentPage > effectiveTotalPages) {
      return sendError(
        res,
        `Số trang đã đọc (${effectiveCurrentPage}) không được vượt quá tổng số trang (${effectiveTotalPages}).`,
        400
      );
    }

    let progress = await ReadingProgress.findOne({ userId, bookId });

    if (!progress) {
      // Tạo mới
      progress = new ReadingProgress({
        userId,
        bookId,
        currentPage: effectiveCurrentPage,
        totalPages: effectiveTotalPages,
        status: status || (effectiveCurrentPage > 0 ? 'Reading' : 'To Read'),
        notes: notes || ''
      });
    } else {
      // Cập nhật
      if (currentPage !== undefined) progress.currentPage = effectiveCurrentPage;
      if (totalPages !== undefined) progress.totalPages = effectiveTotalPages;
      if (notes !== undefined) progress.notes = notes;
      if (status) progress.status = status;
    }

    await progress.save();
    await progress.populate({
      path: 'bookId',
      select: '_id title authorId coverImage genre pageCount',
      populate: { path: 'authorId', select: 'name' }
    });

    return sendSuccess(res, progress, 'Cập nhật tiến trình đọc thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Xóa cuốn sách khỏi danh sách theo dõi đọc
 */
export async function deleteProgress(req, res, next) {
  try {
    const userId = req.user._id;
    const { bookId } = req.params;

    const result = await ReadingProgress.findOneAndDelete({ userId, bookId });
    if (!result) {
      return sendError(res, 'Không tìm thấy bản ghi tiến độ để xóa.', 404);
    }

    return sendSuccess(res, null, 'Đã xóa sách khỏi danh sách theo dõi đọc.');
  } catch (error) {
    next(error);
  }
}

/**
 * Thống kê đọc sách cá nhân (Personal Reading Analytics)
 */
export async function getReadingStats(req, res, next) {
  try {
    const userId = req.user._id;

    const allProgress = await ReadingProgress.find({ userId });
    const totalTracked = allProgress.length;

    let toReadCount = 0;
    let readingCount = 0;
    let completedCount = 0;
    let totalPagesRead = 0;

    for (const item of allProgress) {
      if (item.status === 'Completed') completedCount++;
      else if (item.status === 'Reading') readingCount++;
      else toReadCount++;

      totalPagesRead += item.currentPage || 0;
    }

    return sendSuccess(
      res,
      {
        totalTracked,
        toReadCount,
        readingCount,
        completedCount,
        totalPagesRead,
        overallCompletionRate: totalTracked > 0 ? Math.round((completedCount / totalTracked) * 100) : 0
      },
      'Lấy thống kê đọc sách thành công!'
    );
  } catch (error) {
    next(error);
  }
}

export default {
  getUserProgress,
  getBookProgress,
  upsertProgress,
  deleteProgress,
  getReadingStats
};
