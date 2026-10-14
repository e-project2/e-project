import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // ID định dạng 'gal-01'
      required: true
    },
    bookId: {
      type: String,
      ref: 'Book',
      required: true,
      index: true
    },
    imageUrl: {
      type: String,
      required: true
    },
    caption: {
      type: String,
      required: true
    },
    credit: {
      type: String,
      default: 'BookBridge Visual Archive'
    },
    aspect: {
      type: String,
      enum: ['portrait', 'landscape', 'square'],
      default: 'landscape'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;
