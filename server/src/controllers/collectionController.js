import Collection from '../models/Collection.js';
import { sendSuccess, sendError } from '../utils/response.js';

/**
 * Lấy danh sách các bộ sưu tập tuyển chọn
 */
export async function getCollections(req, res, next) {
  try {
    const collections = await Collection.find()
      .populate({
        path: 'bookIds',
        select: '_id title coverImage genre language rating authorId',
        populate: { path: 'authorId', select: 'name' }
      });

    return sendSuccess(res, collections, 'Lấy danh sách bộ sưu tập thành công!');
  } catch (error) {
    next(error);
  }
}

/**
 * Lấy chi tiết một bộ sưu tập kèm danh sách sách đầy đủ
 */
export async function getCollectionById(req, res, next) {
  try {
    const { id } = req.params;

    const collection = await Collection.findById(id).populate({
      path: 'bookIds',
      populate: { path: 'authorId', select: 'name avatar nationality' }
    });

    if (!collection) {
      return sendError(res, `Không tìm thấy bộ sưu tập với mã '${id}'.`, 404);
    }

    return sendSuccess(res, collection, 'Lấy chi tiết bộ sưu tập thành công!');
  } catch (error) {
    next(error);
  }
}

export default { getCollections, getCollectionById };
