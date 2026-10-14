import Book from '../models/Book.js';
import Author from '../models/Author.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Lấy danh sách sách kèm bộ lọc đa tiêu chí, tìm kiếm & phân trang
 */
export async function getBooks(req, res, next) {
  try {
    const {
      q,
      genre,
      language,
      readingLevel,
      period,
      authorId,
      isFeatured,
      minRating,
      sort,
      page = 1,
      limit = 12
    } = req.query;

    const query = {};

    // Tìm kiếm từ khóa (tựa đề, tác giả, tóm tắt, chủ đề)
    if (q && q.trim()) {
      const searchTerm = q.trim();
      const matchingAuthors = await Author.find({
        name: { $regex: searchTerm, $options: 'i' }
      }).select('_id');
      const authorIds = matchingAuthors.map((a) => a._id);

      query.$or = [
        { title: { $regex: searchTerm, $options: 'i' } },
        { synopsis: { $regex: searchTerm, $options: 'i' } },
        { themes: { $in: [new RegExp(searchTerm, 'i')] } },
        ...(authorIds.length > 0 ? [{ authorId: { $in: authorIds } }] : [])
      ];
    }

    // Bộ lọc theo Thể loại (Genre)
    if (genre && genre !== 'All') {
      query.genre = genre;
    }

    // Bộ lọc theo Ngôn ngữ (Language)
    if (language && language !== 'All') {
      query.language = language;
    }

    // Bộ lọc theo Cấp độ đọc (Reading Level)
    if (readingLevel && readingLevel !== 'All') {
      query.readingLevel = readingLevel;
    }

    // Bộ lọc theo Giai đoạn (Period)
    if (period && period !== 'All') {
      query.period = period;
    }

    // Bộ lọc theo Tác giả
    if (authorId) {
      query.authorId = authorId;
    }

    // Bộ lọc Sách nổi bật
    if (isFeatured !== undefined) {
      query.isFeatured = isFeatured === 'true';
    }

    // Bộ lọc điểm đánh giá tối thiểu
    if (minRating && !isNaN(minRating)) {
      query.rating = { $gte: Number(minRating) };
    }

    // Tùy chọn sắp xếp (Sort)
    let sortOption = { isFeatured: -1, rating: -1, _id: 1 };
    switch (sort) {
      case 'rating_desc':
        sortOption = { rating: -1 };
        break;
      case 'rating_asc':
        sortOption = { rating: 1 };
        break;
      case 'year_desc':
        sortOption = { publicationYear: -1 };
        break;
      case 'year_asc':
        sortOption = { publicationYear: 1 };
        break;
      case 'title_asc':
        sortOption = { title: 1 };
        break;
      case 'title_desc':
        sortOption = { title: -1 };
        break;
      case 'newest':
        sortOption = { createdAt: -1 };
        break;
      default:
        break;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 12);
    const skip = (pageNum - 1) * limitNum;

    const [total, books] = await Promise.all([
      Book.countDocuments(query),
      Book.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum)
        .populate('authorId', 'name avatar nationality specialization')
    ]);

    const totalPages = Math.ceil(total / limitNum);

    return sendSuccess(
      res,
      books,
      'Lấy danh sách sách thành công!',
      {
        total,
        page: pageNum,
        limit: limitNum,
        totalPages,
        hasMore: pageNum < totalPages
      }
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy chi tiết một cuốn sách kèm sách liên quan (Related Books)
 */
export async function getBookById(req, res, next) {
  try {
    const { id } = req.params;

    const book = await Book.findById(id).populate('authorId');
    if (!book) {
      return sendError(res, `Không tìm thấy cuốn sách với mã '${id}'.`, 404);
    }

    // Thuật toán tìm 4 cuốn sách liên quan (cùng thể loại hoặc cùng tác giả)
    const relatedBooks = await Book.find({
      _id: { $ne: book._id },
      $or: [{ genre: book.genre }, { authorId: book.authorId?._id || book.authorId }]
    })
      .limit(4)
      .populate('authorId', 'name avatar');

    return sendSuccess(
      res,
      {
        book,
        relatedBooks
      },
      'Lấy chi tiết sách thành công!'
    );
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy danh sách các cuốn sách nổi bật (Featured Books)
 */
export async function getFeaturedBooks(req, res, next) {
  try {
    const books = await Book.find({ isFeatured: true })
      .limit(8)
      .populate('authorId', 'name avatar nationality');

    return sendSuccess(res, books, 'Lấy danh mục sách nổi bật thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Tìm kiếm nhanh gợi ý (Quick Search / Autocomplete)
 */
export async function searchBooks(req, res, next) {
  try {
    const { q } = req.query;
    if (!q || !q.trim()) {
      return sendSuccess(res, [], 'Không có từ khóa tìm kiếm.');
    }

    const searchTerm = q.trim();
    const matchingAuthors = await Author.find({
      name: { $regex: searchTerm, $options: 'i' }
    }).select('_id');
    const authorIds = matchingAuthors.map((a) => a._id);

    const books = await Book.find({
      $or: [
        { title: { $regex: searchTerm, $options: 'i' } },
        { isbn: { $regex: searchTerm, $options: 'i' } },
        ...(authorIds.length > 0 ? [{ authorId: { $in: authorIds } }] : [])
      ]
    })
      .select('_id title coverImage genre language rating authorId')
      .limit(6)
      .populate('authorId', 'name');

    return sendSuccess(res, books, 'Kết quả tìm kiếm nhanh');
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy các bộ giá trị phục vụ dropdowns / filter tabs
 */
export async function getFilterOptions(req, res, next) {
  try {
    const [genres, languages, readingLevels, periods] = await Promise.all([
      Book.distinct('genre'),
      Book.distinct('language'),
      Book.distinct('readingLevel'),
      Book.distinct('period')
    ]);

    return sendSuccess(
      res,
      {
        genres,
        languages,
        readingLevels,
        periods
      },
      'Lấy danh sách các tiêu chí lọc thành công!'
    );
  } catch (error) {
    next(error);
  }
}

export default {
  getBooks,
  getBookById,
  getFeaturedBooks,
  searchBooks,
  getFilterOptions
};
