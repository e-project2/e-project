import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // ID định dạng 'col-01', 'col-02'
      required: true
    },
    title: {
      type: String,
      required: [true, 'Tiêu đề bộ sưu tập không được để trống'],
      trim: true
    },
    description: {
      type: String,
      required: true
    },
    badge: {
      type: String,
      default: 'Curated'
    },
    bookIds: [
      {
        type: String,
        ref: 'Book'
      }
    ]
  },
  {
    timestamps: true,
    versionKey: false
  }
);

const Collection = mongoose.model('Collection', collectionSchema);
export default Collection;
