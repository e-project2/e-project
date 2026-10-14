import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Hỗ trợ định dạng mã ID như 'auth-01' theo tài liệu dự án
      required: true
    },
    name: {
      type: String,
      required: [true, 'Tên tác giả không được để trống'],
      trim: true
    },
    avatar: {
      type: String,
      default: ''
    },
    nationality: {
      type: String,
      required: true,
      trim: true
    },
    specialization: {
      type: String,
      default: 'Literature'
    },
    bio: {
      type: String,
      required: true
    },
    notableThemes: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

authorSchema.index({ name: 'text', specialization: 'text' });

const Author = mongoose.model('Author', authorSchema);
export default Author;
