import mongoose from 'mongoose';

const favoriteSchema = new mongoose.Schema(
  {
    bookId: {
      type: String,
      ref: 'Book',
      required: true,
      unique: true
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

const Favorite = mongoose.model('Favorite', favoriteSchema);
export default Favorite;
