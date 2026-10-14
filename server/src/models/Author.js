import mongoose from 'mongoose';

const authorSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // ID định dạng 'auth-01', 'auth-02'
      required: true
    },
    name: {
      type: String,
      required: [true, 'Tên tác giả không được để trống'],
      trim: true,
      index: true
    },
    avatar: {
      type: String,
      default: '/images/authors/placeholder.jpg'
    },
    nationality: {
      type: String,
      required: true,
      trim: true
    },
    specialization: {
      type: String,
      trim: true
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
