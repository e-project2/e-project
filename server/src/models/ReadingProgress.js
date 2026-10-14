import mongoose from 'mongoose';

const readingProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      index: true
    },
    bookId: {
      type: String,
      ref: 'Book',
      required: true,
      index: true
    },
    status: {
      type: String,
      enum: ['To Read', 'Reading', 'Completed'],
      default: 'To Read'
    },
    currentPage: {
      type: Number,
      default: 0,
      min: [0, 'Số trang đọc không được âm']
    },
    totalPages: {
      type: Number,
      required: true,
      min: [1, 'Tổng số trang phải lớn hơn 0']
    },
    percentage: {
      type: Number,
      default: 0,
      min: 0,
      max: 100
    },
    notes: {
      type: String,
      default: '',
      maxlength: 1000
    },
    lastUpdated: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Mỗi người dùng chỉ có 1 bản ghi tiến độ cho mỗi cuốn sách
readingProgressSchema.index({ userId: 1, bookId: 1 }, { unique: true });

// Tự động tính toán percentage và cập nhật trạng thái trước khi lưu
readingProgressSchema.pre('save', function (next) {
  if (this.totalPages > 0) {
    this.percentage = Math.min(100, Math.round((this.currentPage / this.totalPages) * 100));
    if (this.percentage === 100 && this.status !== 'Completed') {
      this.status = 'Completed';
    } else if (this.currentPage > 0 && this.percentage < 100 && this.status === 'To Read') {
      this.status = 'Reading';
    }
  }
  this.lastUpdated = new Date();
  next();
});

const ReadingProgress = mongoose.model('ReadingProgress', readingProgressSchema);
export default ReadingProgress;
