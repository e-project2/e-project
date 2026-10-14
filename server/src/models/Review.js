import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema(
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
    rating: {
      type: Number,
      required: [true, 'Đánh giá điểm số từ 1 đến 5 sao'],
      min: 1,
      max: 5
    },
    comment: {
      type: String,
      required: [true, 'Nội dung cảm nhận không được để trống'],
      trim: true,
      maxlength: [1000, 'Nội dung nhận xét tối đa 1000 ký tự']
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Một người dùng chỉ đánh giá 1 lần cho mỗi cuốn sách
reviewSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);
export default Review;
