import {
  User,
  Book,
  Author,
  Collection,
  GalleryItem,
  ReadingProgress,
  Favorite,
  Review,
  ContactMessage,
  AuditLog
} from '../models/index.js';
import { sendSuccess, sendError } from '../utils/response.js';
import { logAdminAction } from '../middleware/auditLogger.js';

/**
 * 1. Tổng quan bảng điều khiển Quản trị viên (Dashboard Overview Statistics)
 */
export async function getDashboardStats(req, res, next) {
  try {
    const [
      totalBooks,
      totalAuthors,
      totalCollections,
      totalGallery,
      totalUsers,
      totalProgress,
      totalFavorites,
      totalReviews,
      unreadContactsCount,
      genreStats,
      languageStats,
      levelStats,
      recentUsers,
      recentContacts,
      recentLogs
    ] = await Promise.all([
      Book.countDocuments(),
      Author.countDocuments(),
      Collection.countDocuments(),
      GalleryItem.countDocuments(),
      User.countDocuments(),
      ReadingProgress.countDocuments(),
      Favorite.countDocuments(),
      Review.countDocuments(),
      ContactMessage.countDocuments({ status: 'unread' }),

      // Thống kê phân bổ thể loại
      Book.aggregate([
        { $group: { _id: '$genre', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      // Thống kê phân bổ ngôn ngữ
      Book.aggregate([
        { $group: { _id: '$language', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      // Thống kê phân bổ cấp độ đọc
      Book.aggregate([
        { $group: { _id: '$readingLevel', count: { $sum: 1 } } },
        { $sort: { count: -1 } }
      ]),

      // Người dùng mới nhất
      User.find().sort({ createdAt: -1 }).limit(5).select('-password'),

      // Tin nhắn liên hệ mới nhất
      ContactMessage.find().sort({ createdAt: -1 }).limit(5),

      // Nhật ký thao tác admin gần nhất
      AuditLog.find().sort({ createdAt: -1 }).limit(6)
    ]);

    return sendSuccess(
      res,
      {
        counters: {
          books: totalBooks,
          authors: totalAuthors,
          collections: totalCollections,
          gallery: totalGallery,
          users: totalUsers,
          activeReaders: totalProgress,
          favorites: totalFavorites,
          reviews: totalReviews,
          unreadContacts: unreadContactsCount
        },
        distributions: {
          genres: genreStats,
          languages: languageStats,
          readingLevels: levelStats
        },
        recentActivity: {
          users: recentUsers,
          contacts: recentContacts,
          logs: recentLogs
        }
      },
      'Lấy dữ liệu thống kê quản trị thành công!'
    );
  } catch (error) {
    next(error);
  }
}

/**
 * 2. Quản lý Sách (Book CRUD)
 */
export async function createBook(req, res, next) {
  try {
    let { _id, title, authorId, isbn, language, genre, readingLevel, period, publicationYear, pageCount, coverImage, synopsis, themes, targetAudience, rating, isFeatured } = req.body;

    // Tự sinh ID nếu không truyền (e.g. bk-27)
    if (!_id) {
      const count = await Book.countDocuments();
      const padded = String(count + 1).padStart(2, '0');
      _id = `bk-${padded}`;
    }

    const existing = await Book.findById(_id);
    if (existing) {
      return sendError(res, `Mã sách '${_id}' đã tồn tại trong hệ thống.`, 409);
    }

    const newBook = await Book.create({
      _id,
      title,
      authorId,
      isbn,
      language,
      genre,
      readingLevel,
      period: period || 'Modern',
      publicationYear: Number(publicationYear),
      pageCount: Number(pageCount),
      coverImage: coverImage || '/images/books/placeholder.jpg',
      synopsis,
      themes: Array.isArray(themes) ? themes : (themes ? themes.split(',').map((s) => s.trim()) : []),
      targetAudience: targetAudience || 'General Readers',
      rating: rating ? Number(rating) : 4.5,
      isFeatured: Boolean(isFeatured)
    });

    await logAdminAction({
      req,
      action: 'CREATE_BOOK',
      resource: 'books',
      resourceId: newBook._id,
      details: { title: newBook.title }
    });

    return sendSuccess(res, newBook, 'Thêm mới sách thành công!', null, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateBook(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };

    delete updateData._id; // Không cho phép đổi khóa chính

    const updatedBook = await Book.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    }).populate('authorId');

    if (!updatedBook) {
      return sendError(res, `Không tìm thấy sách với mã '${id}'.`, 404);
    }

    await logAdminAction({
      req,
      action: 'UPDATE_BOOK',
      resource: 'books',
      resourceId: id,
      details: updateData
    });

    return sendSuccess(res, updatedBook, 'Cập nhật thông tin sách thành công!');
  } catch (error) {
    next(error);
  }
}

export async function deleteBook(req, res, next) {
  try {
    const { id } = req.params;

    const book = await Book.findById(id);
    if (!book) {
      return sendError(res, `Không tìm thấy sách với mã '${id}'.`, 404);
    }

    // Xóa cascade dữ liệu liên quan
    await Promise.all([
      Book.findByIdAndDelete(id),
      ReadingProgress.deleteMany({ bookId: id }),
      Favorite.deleteMany({ bookId: id }),
      Review.deleteMany({ bookId: id }),
      GalleryItem.deleteMany({ bookId: id }),
      Collection.updateMany({ bookIds: id }, { $pull: { bookIds: id } })
    ]);

    await logAdminAction({
      req,
      action: 'DELETE_BOOK',
      resource: 'books',
      resourceId: id,
      details: { title: book.title }
    });

    return sendSuccess(res, null, 'Đã xóa cuốn sách và các dữ liệu liên quan thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * 3. Quản lý Tác giả (Author CRUD)
 */
export async function createAuthor(req, res, next) {
  try {
    let { _id, name, avatar, nationality, specialization, bio, notableThemes } = req.body;

    if (!_id) {
      const count = await Author.countDocuments();
      _id = `auth-${String(count + 1).padStart(2, '0')}`;
    }

    const existing = await Author.findById(_id);
    if (existing) {
      return sendError(res, `Mã tác giả '${_id}' đã tồn tại.`, 409);
    }

    const newAuthor = await Author.create({
      _id,
      name,
      avatar: avatar || '/images/authors/placeholder.jpg',
      nationality,
      specialization,
      bio,
      notableThemes: Array.isArray(notableThemes)
        ? notableThemes
        : notableThemes ? notableThemes.split(',').map((s) => s.trim()) : []
    });

    await logAdminAction({
      req,
      action: 'CREATE_AUTHOR',
      resource: 'authors',
      resourceId: newAuthor._id,
      details: { name: newAuthor.name }
    });

    return sendSuccess(res, newAuthor, 'Thêm mới tác giả thành công!', null, 201);
  } catch (error) {
    next(error);
  }
}

export async function updateAuthor(req, res, next) {
  try {
    const { id } = req.params;
    const updateData = { ...req.body };
    delete updateData._id;

    const updated = await Author.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true
    });

    if (!updated) {
      return sendError(res, `Không tìm thấy tác giả với mã '${id}'.`, 404);
    }

    await logAdminAction({
      req,
      action: 'UPDATE_AUTHOR',
      resource: 'authors',
      resourceId: id,
      details: updateData
    });

    return sendSuccess(res, updated, 'Cập nhật tác giả thành công!');
  } catch (error) {
    next(error);
  }
}

export async function deleteAuthor(req, res, next) {
  try {
    const { id } = req.params;

    // Kiểm tra xem tác giả còn tác phẩm nào trong hệ thống không
    const worksCount = await Book.countDocuments({ authorId: id });
    if (worksCount > 0) {
      return sendError(
        res,
        `Không thể xóa tác giả này vì đang có ${worksCount} tác phẩm gắn liền trong hệ thống. Vui lòng cập nhật hoặc xóa các sách trước.`,
        400
      );
    }

    const author = await Author.findByIdAndDelete(id);
    if (!author) {
      return sendError(res, 'Không tìm thấy tác giả để xóa.', 404);
    }

    await logAdminAction({
      req,
      action: 'DELETE_AUTHOR',
      resource: 'authors',
      resourceId: id,
      details: { name: author.name }
    });

    return sendSuccess(res, null, 'Đã xóa tác giả thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * 4. Quản lý Người dùng (User Management)
 */
export async function getUsers(req, res, next) {
  try {
    const { q, role, status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (q && q.trim()) {
      const term = q.trim();
      query.$or = [
        { username: { $regex: term, $options: 'i' } },
        { email: { $regex: term, $options: 'i' } },
        { fullName: { $regex: term, $options: 'i' } }
      ];
    }

    if (role) query.role = role;
    if (status) query.status = status;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [total, users] = await Promise.all([
      User.countDocuments(query),
      User.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum)
    ]);

    return sendSuccess(res, users, 'Lấy danh sách người dùng thành công!', {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    next(error);
  }
}

export async function updateUserStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!['active', 'banned'].includes(status)) {
      return sendError(res, "Trạng thái chỉ có thể là 'active' hoặc 'banned'.", 400);
    }

    // Không cho phép tự ban chính mình
    if (req.user._id.toString() === id) {
      return sendError(res, 'Bạn không thể tự khóa tài khoản của chính mình.', 400);
    }

    const user = await User.findByIdAndUpdate(id, { status }, { new: true });
    if (!user) {
      return sendError(res, 'Không tìm thấy người dùng.', 404);
    }

    await logAdminAction({
      req,
      action: status === 'banned' ? 'BAN_USER' : 'UNBAN_USER',
      resource: 'users',
      resourceId: id,
      details: { email: user.email, status }
    });

    return sendSuccess(
      res,
      user,
      status === 'banned' ? 'Đã khóa tài khoản người dùng!' : 'Đã kích hoạt lại tài khoản người dùng!'
    );
  } catch (error) {
    next(error);
  }
}

export async function updateUserRole(req, res, next) {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['user', 'admin'].includes(role)) {
      return sendError(res, "Vai trò chỉ có thể là 'user' hoặc 'admin'.", 400);
    }

    if (req.user._id.toString() === id && role !== 'admin') {
      return sendError(res, 'Bạn không thể tự tước quyền Quản trị viên của chính mình.', 400);
    }

    const user = await User.findByIdAndUpdate(id, { role }, { new: true });
    if (!user) {
      return sendError(res, 'Không tìm thấy người dùng.', 404);
    }

    await logAdminAction({
      req,
      action: 'CHANGE_USER_ROLE',
      resource: 'users',
      resourceId: id,
      details: { email: user.email, role }
    });

    return sendSuccess(res, user, `Đã cập nhật quyền thành: ${role}`);
  } catch (error) {
    next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const { id } = req.params;

    if (req.user._id.toString() === id) {
      return sendError(res, 'Bạn không thể tự xóa tài khoản của mình.', 400);
    }

    const user = await User.findById(id);
    if (!user) {
      return sendError(res, 'Không tìm thấy người dùng để xóa.', 404);
    }

    await Promise.all([
      User.findByIdAndDelete(id),
      ReadingProgress.deleteMany({ userId: id }),
      Favorite.deleteMany({ userId: id }),
      Review.deleteMany({ userId: id })
    ]);

    await logAdminAction({
      req,
      action: 'DELETE_USER',
      resource: 'users',
      resourceId: id,
      details: { email: user.email }
    });

    return sendSuccess(res, null, 'Đã xóa người dùng và dữ liệu liên quan thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * 5. Quản lý Tin nhắn Liên hệ (Contact Messages Management)
 */
export async function getContactMessages(req, res, next) {
  try {
    const { status, page = 1, limit = 10 } = req.query;
    const query = {};

    if (status && ['unread', 'read', 'replied'].includes(status)) {
      query.status = status;
    }

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 10);
    const skip = (pageNum - 1) * limitNum;

    const [total, messages] = await Promise.all([
      ContactMessage.countDocuments(query),
      ContactMessage.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum)
    ]);

    return sendSuccess(res, messages, 'Lấy danh sách tin nhắn liên hệ thành công!', {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    next(error);
  }
}

export async function updateContactStatus(req, res, next) {
  try {
    const { id } = req.params;
    const { status, adminNotes } = req.body;

    const update = {};
    if (status) update.status = status;
    if (adminNotes !== undefined) update.adminNotes = adminNotes;

    const message = await ContactMessage.findByIdAndUpdate(id, update, { new: true });
    if (!message) {
      return sendError(res, 'Không tìm thấy tin nhắn liên hệ.', 404);
    }

    return sendSuccess(res, message, 'Cập nhật trạng thái tin nhắn thành công!');
  } catch (error) {
    next(error);
  }
}

export async function deleteContactMessage(req, res, next) {
  try {
    const { id } = req.params;
    const deleted = await ContactMessage.findByIdAndDelete(id);
    if (!deleted) {
      return sendError(res, 'Không tìm thấy tin nhắn để xóa.', 404);
    }

    return sendSuccess(res, null, 'Đã xóa tin nhắn liên hệ thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * 6. Nhật ký kiểm tra thao tác hệ thống (Audit Logs)
 */
export async function getAuditLogs(req, res, next) {
  try {
    const { resource, page = 1, limit = 15 } = req.query;
    const query = {};

    if (resource) query.resource = resource;

    const pageNum = Math.max(1, parseInt(page, 10) || 1);
    const limitNum = Math.max(1, parseInt(limit, 10) || 15);
    const skip = (pageNum - 1) * limitNum;

    const [total, logs] = await Promise.all([
      AuditLog.countDocuments(query),
      AuditLog.find(query).sort({ createdAt: -1 }).skip(skip).limit(limitNum)
    ]);

    return sendSuccess(res, logs, 'Lấy nhật ký kiểm tra hệ thống thành công!', {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(total / limitNum)
    });
  } catch (error) {
    next(error);
  }
}

export default {
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
};
