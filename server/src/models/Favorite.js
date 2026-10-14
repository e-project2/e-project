import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
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
    addedAt: {
      type: Date,
      default: Date.now
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Mỗi người dùng chỉ có 1 bản ghi yêu thích cho mỗi cuốn sách
favoriteSchema.index({ userId: 1, bookId: 1 }, { unique: true });

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
