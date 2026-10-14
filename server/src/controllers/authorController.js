import Author from '../models/Author.js';
import Book from '../models/Book.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Lấy danh sách tác giả kèm tìm kiếm & phân trang
 */
export async function getAuthors(req, res, next) {
  try {
    const { q, nationality, page = 1, limit = 10 } = req.query;
    const query = {};

    if (q && q.trim()) {
      const term = q.trim();
      query.$or = [
        { name: { $regex: term, $options: 'i' } },
        { specialization: { $regex: term, $options: 'i' } },
        { bio: { $regex: term, $options: 'i' } }
      ];
    }

    if (nationality) {
      query.nationality = nationality;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [total, authors] = await Promise.all([
      Author.countDocuments(query),
      Author.find(query).sort({ name: 1 }).skip(skip).limit(limitNum)
    ]);

    return sendSuccess(res, authors, 'Lấy danh sách tác giả thành công!', {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy chi tiết tác giả kèm toàn bộ tác phẩm trong hệ thống (Author Profile & Bibliography)
 */
export async function getAuthorById(req, res, next) {
  try {
    const { id } = req.params;

    const author = await Author.findById(id);
    if (!author) {
      return sendError(res, `Không tìm thấy tác giả với mã '${id}'.`, 404);
    }

    // Lấy các tác phẩm của tác giả này
    const books = await Book.find({ authorId: id }).sort({ publicationYear: 1 });

    return sendSuccess(
      res,
      {
        author,
        books,
        totalWorks: books.length
      },
      'Lấy thông tin tác giả và danh mục tác phẩm thành công!'
    );
  } catch (error) {
    next(error);
  }
}

export default { getAuthors, getAuthorById };
