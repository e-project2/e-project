import mongoose from 'mongoose';

const collectionSchema = new mongoose.Schema(
  {
    _id: {
      type: String, // e.g. 'col-01'
      required: true
    },
    title: {
      type: String,
      required: true,
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
