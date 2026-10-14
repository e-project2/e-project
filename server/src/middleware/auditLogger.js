import AuditLog from '../models/AuditLog.js';

/**
 * Ghi log thao tác Quản trị viên
 * @param {object} params
 * @param {import('express').Request} params.req
 * @param {string} params.action - VD: CREATE_BOOK, UPDATE_USER
 * @param {string} params.resource - VD: books, users, authors
 * @param {string} [params.resourceId]
 * @param {any} [params.details]
 */
export async function logAdminAction({ req, action, resource, resourceId = '', details = {} }) {
  try {
    if (!req.user) return;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';
    const userAgent = req.headers['user-agent'] || '';

    await AuditLog.create({
      adminId: req.user._id,
      adminEmail: req.user.email,
      action,
      resource,
      resourceId: String(resourceId),
      details,
      ipAddress,
      userAgent
    });
  } catch (err) {
    console.error('⚠️ Không thể ghi Audit Log:', err.message);
  }
}

export default { logAdminAction };
