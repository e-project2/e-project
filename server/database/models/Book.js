import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // Định dạng id như 'bk-01', 'bk-02' theo đặc tả dự án
      required: true
    },
    title: {
      type: String,
      required: [true, 'Tựa đề sách không được để trống'],
      trim: true,
      index: true
    },
    authorId: {
      type: String,
      ref: 'Author',
      required: [true, 'Mã tác giả (authorId) là bắt buộc'],
      index: true
    },
    isbn: {
      type: String,
      unique: true,
      sparse: true,
      trim: true
    },
    language: {
      type: String,
      required: true,
      enum: [
        'English',
        'French',
        'Japanese',
        'German',
        'Spanish',
        'Vietnamese',
        'Russian',
        'Italian'
      ],
      index: true
    },
    genre: {
      type: String,
      required: true,
      enum: [
        'Classic',
        'Fiction',
        'Science Fiction',
        'Dystopian',
        'Philosophy',
        'Mystery',
        'Non-Fiction',
        'Fantasy',
        'Historical Fiction',
        'Biography'
      ],
      index: true
    },
    readingLevel: {
      type: String,
      required: true,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      index: true
    },
    period: {
      type: String,
      enum: ['Classic', 'Modern', 'Contemporary'],
      default: 'Modern'
    },
    publicationYear: {
      type: Number,
      required: true
    },
    pageCount: {
      type: Number,
      required: true,
      min: [1, 'Số trang sách phải lớn hơn 0']
    },
    coverImage: {
      type: String,
      default: '/images/books/placeholder.jpg'
    },
    synopsis: {
      type: String,
      required: true
    },
    themes: {
      type: [String],
      default: []
    },
    targetAudience: {
      type: String,
      default: 'General Readers'
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5
    },
    isFeatured: {
      type: Boolean,
      default: false,
      index: true
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// Hỗ trợ tìm kiếm từ khóa toàn văn (Full-text search)
bookSchema.index(
  { title: 'text', synopsis: 'text', themes: 'text' },
  { default_language: 'none', language_override: 'none' }
);

// Compound index để tối ưu bộ lọc đa tiêu chí (Compound filter pipeline)
bookSchema.index({ genre: 1, language: 1, readingLevel: 1 });

const Book = mongoose.model('Book', bookSchema);
export default Book;
