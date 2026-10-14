import mongoose from 'mongoose';

const galleryItemSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // e.g. 'gal-01'
      required: true
    },
    bookId: {
      type: String,
      ref: 'Book',
      required: true
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
      default: 'BookBridge Media Archive'
    },
    aspect: {
      type: String,
      enum: ['portrait', 'landscape', 'square'],
      default: 'portrait'
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const GalleryItem = mongoose.model('GalleryItem', galleryItemSchema);
export default GalleryItem;
