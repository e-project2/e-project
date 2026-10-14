import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { connectDB, disconnectDB } from '../config/db.js';
import {
  User,
  Book,
  Author,
  Collection,
  GalleryItem,
  ReadingProgress,
  Favorite,
  Review,
  ContactMessage,
  AuditLog
} from '../models/index.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Đường dẫn tới thư mục data của database
const DATA_DIR = path.resolve(__dirname, '../../database/data');

function readJSONFile(filename) {
  const filePath = path.join(DATA_DIR, filename);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️ Không tìm thấy file: ${filePath}`);
    return [];
  }
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

async function seedDatabase() {
  console.log('🚀 [SEEDER] Bắt đầu nạp dữ liệu toàn diện cho BookBridge Backend...');

  try {
    await connectDB();

    console.log('🧹 [1/8] Làm sạch dữ liệu các bảng...');
    await Promise.all([
      User.deleteMany({}),
      Book.deleteMany({}),
      Author.deleteMany({}),
      Collection.deleteMany({}),
      GalleryItem.deleteMany({}),
      ReadingProgress.deleteMany({}),
      Favorite.deleteMany({}),
      Review.deleteMany({}),
      ContactMessage.deleteMany({}),
      AuditLog.deleteMany({})
    ]);
    try {
      await Book.collection.dropIndexes();
      await ReadingProgress.collection.dropIndexes();
      await Favorite.collection.dropIndexes();
    } catch {}
    await Promise.all([
      Book.syncIndexes(),
      ReadingProgress.syncIndexes(),
      Favorite.syncIndexes()
    ]);
    console.log('✓ Dọn dẹp và đồng bộ hóa Indexes hoàn tất.');

    console.log('👥 [2/8] Khởi tạo tài khoản Quản trị viên (Admin) và Độc giả mẫu...');
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123456';
    const readerPassword = process.env.DEFAULT_READER_PASSWORD || 'Reader@123456';

    const admin = await User.create({
      username: process.env.DEFAULT_ADMIN_USERNAME || 'admin',
      email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@bookbridge.com',
      password: adminPassword,
      fullName: 'Hệ Thống Quản Trị Viên (Lead Admin)',
      role: 'admin',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      bio: 'Quản trị viên trưởng hệ thống BookBridge Portal.'
    });

    const reader = await User.create({
      username: process.env.DEFAULT_READER_USERNAME || 'reader_demo',
      email: process.env.DEFAULT_READER_EMAIL || 'reader@bookbridge.com',
      password: readerPassword,
      fullName: 'Minh Trang (Demo Reader)',
      role: 'user',
      status: 'active',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80',
      bio: 'Độc giả yêu thích sách kinh điển và văn học song ngữ.'
    });

    console.log(`✅ Đã tạo tài khoản Admin: ${admin.email} (Mật khẩu: ${adminPassword})`);
    console.log(`✅ Đã tạo tài khoản Reader: ${reader.email} (Mật khẩu: ${readerPassword})`);

    console.log('✍️ [3/8] Nạp dữ liệu tác giả (authors)...');
    const authorsData = readJSONFile('authors.json');
    const insertedAuthors = await Author.insertMany(authorsData);
    console.log(`✅ Đã nạp ${insertedAuthors.length} tác giả.`);

    console.log('📚 [4/8] Nạp dữ liệu sách (books)...');
    const booksData = readJSONFile('books.json');
    const insertedBooks = await Book.insertMany(booksData);
    console.log(`✅ Đã nạp ${insertedBooks.length} cuốn sách.`);

    console.log('🗂️ [5/8] Nạp dữ liệu bộ sưu tập (collections)...');
    const collectionsData = readJSONFile('collections.json');
    const insertedCollections = await Collection.insertMany(collectionsData);
    console.log(`✅ Đã nạp ${insertedCollections.length} bộ sưu tập.`);

    console.log('🖼️ [6/8] Nạp thư viện ảnh minh họa (gallery_items)...');
    const galleryData = readJSONFile('gallery.json');
    const insertedGallery = await GalleryItem.insertMany(galleryData);
    console.log(`✅ Đã nạp ${insertedGallery.length} hình ảnh minh họa.`);

    console.log('📖 [7/8] Khởi tạo dữ liệu người dùng (Tiến độ đọc, Yêu thích & Đánh giá)...');
    // Gắn tiến độ đọc cho tài khoản demo reader
    await ReadingProgress.create([
      {
        userId: reader._id,
        bookId: 'bk-01',
        status: 'Reading',
        currentPage: 142,
        totalPages: 328,
        percentage: 43,
        notes: 'Tiểu thuyết phản địa đàng sâu sắc của George Orwell, cực kỳ cuốn hút!'
      },
      {
        userId: reader._id,
        bookId: 'bk-05',
        status: 'Completed',
        currentPage: 280,
        totalPages: 280,
        percentage: 100,
        notes: 'Cuốn sách mở ra một thế giới hiện thực huyền ảo tuyệt diệu.'
      },
      {
        userId: reader._id,
        bookId: 'bk-03',
        status: 'To Read',
        currentPage: 0,
        totalPages: 96,
        percentage: 0,
        notes: 'Dự định đọc vào cuối tuần này.'
      }
    ]);

    // Gắn sách yêu thích cho demo reader
    await Favorite.create([
      { userId: reader._id, bookId: 'bk-01' },
      { userId: reader._id, bookId: 'bk-03' },
      { userId: reader._id, bookId: 'bk-05' },
      { userId: reader._id, bookId: 'bk-07' }
    ]);

    // Khởi tạo một số đánh giá review mẫu
    await Review.create([
      {
        userId: reader._id,
        bookId: 'bk-01',
        rating: 5,
        comment: 'Tác phẩm 1984 là một kiệt tác cảnh tỉnh nhân loại. Cốt truyện chặt chẽ và không khí truyện đặc quánh.'
      },
      {
        userId: reader._id,
        bookId: 'bk-03',
        rating: 5,
        comment: 'Hoàng tử bé - cuốn sách dành cho những người lớn từng là trẻ con. Rất cảm động và triết lý.'
      }
    ]);

    console.log('✉️ [8/8] Khởi tạo tin nhắn liên hệ mẫu & Ghi nhận Audit Log...');
    await ContactMessage.create([
      {
        name: 'Nguyễn Văn Minh',
        email: 'minh.nguyen@example.com',
        subject: 'Đóng góp ý kiến về bộ sưu tập sách Pháp',
        message: 'Chào ban quản trị, giao diện BookBridge rất đẹp và tinh tế. Tôi rất mong hệ thống bổ sung thêm các tác phẩm của Victor Hugo.',
        status: 'unread'
      },
      {
        name: 'Trần Thị Thu Thảo',
        email: 'thao.tran@example.com',
        subject: 'Cảm ơn vì công cụ theo dõi đọc sách',
        message: 'Tính năng Reading Tracker giúp tôi có động lực đọc sách mỗi ngày hơn rất nhiều!',
        status: 'read',
        adminNotes: 'Đã gửi lời cảm ơn độc giả qua email.'
      }
    ]);

    await AuditLog.create({
      adminId: admin._id,
      adminEmail: admin.email,
      action: 'SYSTEM_INITIAL_SEED',
      resource: 'system',
      details: {
        booksSeeded: insertedBooks.length,
        authorsSeeded: insertedAuthors.length,
        collectionsSeeded: insertedCollections.length
      }
    });

    console.log('\n================================================================');
    console.log('🎉 SEED DỮ LIỆU BACKEND BOOKBRIDGE THÀNH CÔNG RỰC RỠ!');
    console.log('----------------------------------------------------------------');
    console.log(`🔑 ADMIN LOGIN : ${admin.email} / ${adminPassword}`);
    console.log(`👤 READER LOGIN: ${reader.email} / ${readerPassword}`);
    console.log('================================================================\n');
  } catch (error) {
    console.error('❌ Lỗi trong quá trình Seed Backend:', error);
  } finally {
    await disconnectDB();
  }
}

seedDatabase();
