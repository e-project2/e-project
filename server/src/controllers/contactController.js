import ContactMessage from '../models/ContactMessage.js';
import { sendSuccess } from '../utils/response.js';

/**
 * Tiếp nhận thông tin phản hồi & liên hệ từ độc giả
 */
export async function submitContact(req, res, next) {
  try {
    const { name, email, subject, message } = req.body;
    const ipAddress = req.headers['x-forwarded-for'] || req.socket?.remoteAddress || '';

    const newContact = await ContactMessage.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      status: 'unread',
      ipAddress
    });

    return sendSuccess(
      res,
      {
        id: newContact._id,
        createdAt: newContact.createdAt
      },
      'Cảm ơn bạn đã liên hệ! Thông điệp của bạn đã được ghi nhận và gửi tới ban quản trị BookBridge.',
      null,
      201
    );
  } catch (error) {
    next(error);
  }
}

export default { submitContact };
