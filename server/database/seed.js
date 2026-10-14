import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectDB, disconnectDB } from './connection.js';
import {
  Author,
  Book,
  Collection,
  GalleryItem,
  ReadingProgress,
  Favorite
} from './models/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJSON(relativePath) {
  const filePath = path.join(__dirname, relativePath);
  const data = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

async function runSeed() {
  console.log('🚀 Bắt đầu quá trình nạp dữ liệu (Database Seeding) cho BookBridge...');
  
  try {
    await connectDB();

    console.log('🧹 Đang làm sạch dữ liệu cũ...');
    await Promise.all([
      Author.deleteMany({}),
      Book.deleteMany({}),
      Collection.deleteMany({}),
      GalleryItem.deleteMany({}),
      ReadingProgress.deleteMany({}),
      Favorite.deleteMany({})
    ]);
    console.log('✓ Dọn dẹp hoàn tất.');

    console.log('📥 Đang nạp dữ liệu từ thư mục data/...');
    const authors = loadJSON('./data/authors.json');
    const books = loadJSON('./data/books.json');
    const collections = loadJSON('./data/collections.json');
    const galleryItems = loadJSON('./data/gallery.json');
    const readingProgress = loadJSON('./data/reading_progress.json');
    const favorites = loadJSON('./data/favorites.json');

    const insertedAuthors = await Author.insertMany(authors);
    console.log(`✅ Đã nạp ${insertedAuthors.length} tác giả (authors).`);

    const insertedBooks = await Book.insertMany(books);
    console.log(`✅ Đã nạp ${insertedBooks.length} cuốn sách (books).`);

    const insertedCollections = await Collection.insertMany(collections);
    console.log(`✅ Đã nạp ${insertedCollections.length} bộ sưu tập (collections).`);

    const insertedGallery = await GalleryItem.insertMany(galleryItems);
    console.log(`✅ Đã nạp ${insertedGallery.length} hình ảnh gallery (gallery_items).`);

    const insertedProgress = await ReadingProgress.insertMany(readingProgress);
    console.log(`✅ Đã nạp ${insertedProgress.length} tiến độ đọc (reading_progress).`);

    const insertedFavorites = await Favorite.insertMany(favorites);
    console.log(`✅ Đã nạp ${insertedFavorites.length} mục yêu thích (favorites).`);

    console.log('\n======================================================');
    console.log('🎉 SEED DỮ LIỆU VÀO MONGODB THÀNH CÔNG RỰC RỠ!');
    console.log('======================================================');
  } catch (err) {
    console.error('❌ Lỗi trong quá trình seed dữ liệu:', err);
  } finally {
    await disconnectDB();
  }
}

runSeed();
