import GalleryItem from '../models/GalleryItem.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Lấy danh sách ảnh gallery nghệ thuật kèm liên kết sách
 */
export async function getGalleryItems(req, res, next) {
  try {
    const { aspect, bookId } = req.query;
    const query = {};

    if (aspect) query.aspect = aspect;
    if (bookId) query.bookId = bookId;

    const items = await GalleryItem.find(query)
      .populate('bookId', 'title authorId coverImage genre')
      .sort({ _id: 1 });

    return sendSuccess(res, items, 'Lấy danh sách ảnh gallery thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy chi tiết một ảnh gallery
 */
export async function getGalleryItemById(req, res, next) {
  try {
    const { id } = req.params;

    const item = await GalleryItem.findById(id).populate('bookId');
    if (!item) {
      return sendError(res, `Không tìm thấy hình ảnh với mã '${id}'.`, 404);
    }

    return sendSuccess(res, item, 'Lấy chi tiết hình ảnh thành công!');
  } catch (error) {
    next(error);
  }
}

export default { getGalleryItems, getGalleryItemById };
