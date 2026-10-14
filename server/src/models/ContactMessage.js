import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Họ và tên không được để trống'],
      trim: true,
      maxlength: 100
    },
    email: {
      type: String,
      required: [true, 'Email không được để trống'],
      trim: true,
      lowercase: true,
      match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Email không đúng định dạng']
    },
    subject: {
      type: String,
      required: [true, 'Tiêu đề liên hệ không được để trống'],
      trim: true,
      maxlength: 200
    },
    message: {
      type: String,
      required: [true, 'Nội dung tin nhắn không được để trống'],
      trim: true,
      maxlength: 2000
    },
    status: {
      type: String,
      enum: ['unread', 'read', 'replied'],
      default: 'unread',
      index: true
    },
    adminNotes: {
      type: String,
      default: ''
    },
    ipAddress: {
      type: String,
      default: ''
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const ContactMessage = mongoose.model('ContactMessage', contactMessageSchema);
export default ContactMessage;
