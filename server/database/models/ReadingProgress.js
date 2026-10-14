import mongoose from 'mongoose';

const readingProgressSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      ref: 'Book',
      required: true,
      unique: true
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
      default: ''
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

// Tự động tính toán percentage trước khi lưu
readingProgressSchema.pre('save', function (next) {
  if (this.totalPages > 0) {
    this.percentage = Math.min(100, Math.round((this.currentPage / this.totalPages) * 100));
    if (this.percentage === 100 && this.status !== 'Completed') {
      this.status = 'Completed';
    }
  }
  this.lastUpdated = new Date();
  next();
});

const ReadingProgress = mongoose.model('ReadingProgress', readingProgressSchema);
export default ReadingProgress;
