import http from 'http';
import dotenv from 'dotenv';
import app from '../server.js';
import { connectDB, disconnectDB } from '../config/db.js';

dotenv.config();

let testServer = null;
let baseUrl = '';

// Helper hàm gửi HTTP request dạng JSON
function makeRequest(method, path, body = null, headers = {}) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, baseUrl);
    const reqHeaders = {
      'Content-Type': 'application/json',
      ...headers
    };

    let postData = null;
    if (body) {
      postData = JSON.stringify(body);
      reqHeaders['Content-Length'] = Buffer.byteLength(postData);
    }

    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname + url.search,
      method,
      headers: reqHeaders
    };

    const req = http.request(options, (res) => {
      let rawData = '';
      res.on('data', (chunk) => {
        rawData += chunk;
      });
      res.on('end', () => {
        let json = null;
        try {
          json = JSON.parse(rawData);
        } catch {
          json = rawData;
        }
        resolve({
          status: res.statusCode,
          headers: res.headers,
          data: json
        });
      });
    });

    req.on('error', reject);
    if (postData) {
      req.write(postData);
    }
    req.end();
  });
}

// Báo cáo kiểm thử
let passedTests = 0;
let failedTests = 0;

function assert(condition, testName) {
  if (condition) {
    console.log(`  ✅ PASS: ${testName}`);
    passedTests++;
  } else {
    console.error(`  ❌ FAIL: ${testName}`);
    failedTests++;
  }
}

async function runTestSuite() {
  console.log('\n======================================================');
  console.log('🧪 BẮT ĐẦU CHẠY BỘ KIỂM THỬ TÍCH HỢP (INTEGRATION TESTS)');
  console.log('======================================================\n');

  // Khởi chạy test server trên cổng ngẫu nhiên
  await connectDB();
  testServer = http.createServer(app);
  await new Promise((resolve) => {
    testServer.listen(0, '127.0.0.1', () => {
      const port = testServer.address().port;
      baseUrl = `http://127.0.0.1:${port}`;
      console.log(`🌐 Test Server đang chạy tại: ${baseUrl}\n`);
      resolve();
    });
  });

  try {
    // -----------------------------------------------------------------
    // 1. HEALTH & WELCOME ENDPOINTS
    // -----------------------------------------------------------------
    console.log('📌 NHÓM 1: KIỂM THỬ HỆ THỐNG CƠ BẢN & HEALTH CHECK');
    const rootRes = await makeRequest('GET', '/');
    assert(rootRes.status === 200 && rootRes.data.status === 'online', 'Trang chủ phản hồi 200 OK với thông tin hệ thống');

    const healthRes = await makeRequest('GET', '/api/health');
    assert(
      healthRes.status === 200 && healthRes.data.status === 'healthy' && healthRes.data.database.status === 'Connected',
      'API Health Check phản hồi 200 OK và MongoDB đã kết nối'
    );

    // -----------------------------------------------------------------
    // 2. AUTHENTICATION & SECURITY TESTS
    // -----------------------------------------------------------------
    console.log('\n📌 NHÓM 2: KIỂM THỬ XÁC THỰC NGƯỜI DÙNG & BẢO MẬT (AUTH & RBAC)');

    // Đăng ký tài khoản mới
    const testUsername = `user_${Date.now()}`;
    const registerRes = await makeRequest('POST', '/api/auth/register', {
      username: testUsername,
      email: `${testUsername}@example.com`,
      password: 'User@123456',
      fullName: 'Test Automation User'
    });
    assert(registerRes.status === 201 && registerRes.data.success === true, 'Đăng ký tài khoản người dùng mới thành công (201)');

    const newUserToken = registerRes.data.data.accessToken;

    // Đăng nhập đúng mật khẩu
    const loginRes = await makeRequest('POST', '/api/auth/login', {
      identifier: `${testUsername}@example.com`,
      password: 'User@123456'
    });
    assert(loginRes.status === 200 && loginRes.data.data.accessToken !== undefined, 'Đăng nhập người dùng thành công (200)');

    // Đăng nhập sai mật khẩu -> Chặn 401
    const wrongLoginRes = await makeRequest('POST', '/api/auth/login', {
      identifier: `${testUsername}@example.com`,
      password: 'WrongPassword999'
    });
    assert(wrongLoginRes.status === 401, 'Đăng nhập sai mật khẩu bị từ chối chính xác (401)');

    // Lấy thông tin cá nhân (Profile Me)
    const meRes = await makeRequest('GET', '/api/auth/me', null, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(meRes.status === 200 && meRes.data.data.user.username === testUsername, 'Lấy profile cá nhân với Bearer token (200)');

    // Cập nhật hồ sơ
    const updateProfileRes = await makeRequest('PUT', '/api/auth/profile', {
      fullName: 'Updated Automation Name',
      bio: 'Yêu thích đọc sách khoa học viễn tưởng'
    }, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(updateProfileRes.status === 200 && updateProfileRes.data.data.user.fullName === 'Updated Automation Name', 'Cập nhật hồ sơ cá nhân thành công (200)');

    // Đăng nhập Admin
    const adminLoginRes = await makeRequest('POST', '/api/auth/login', {
      identifier: 'admin@bookbridge.com',
      password: 'Admin@123456'
    });
    assert(adminLoginRes.status === 200 && adminLoginRes.data.data.user.role === 'admin', 'Đăng nhập tài khoản Quản trị viên (Admin) thành công (200)');
    const adminToken = adminLoginRes.data.data.accessToken;

    // Kiểm tra bảo mật RBAC: Người dùng thường cố truy cập Admin API -> Chặn 403
    const forbiddenRes = await makeRequest('GET', '/api/admin/stats', null, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(forbiddenRes.status === 403, 'Người dùng thường bị từ chối khi truy cập Admin API (403 Forbidden)');

    // Truy cập không có Token -> Chặn 401
    const unauthRes = await makeRequest('GET', '/api/admin/stats');
    assert(unauthRes.status === 401, 'Không có Token bị từ chối (401 Unauthorized)');

    // -----------------------------------------------------------------
    // 3. BOOK CATALOG & COMPOUND FILTER TESTS
    // -----------------------------------------------------------------
    console.log('\n📌 NHÓM 3: KIỂM THỬ DANH MỤC SÁCH, TÌM KIẾM & BỘ LỌC ĐA CHIỀU');

    // Lấy toàn bộ sách
    const booksRes = await makeRequest('GET', '/api/books?limit=30');
    assert(booksRes.status === 200 && booksRes.data.data.length >= 26, `Lấy danh mục sách thành công, tổng cộng ${booksRes.data.meta.total} cuốn`);

    // Tìm kiếm từ khóa 'Orwell'
    const searchRes = await makeRequest('GET', '/api/books?q=Orwell');
    assert(searchRes.status === 200 && searchRes.data.data.length >= 2, 'Tìm kiếm từ khóa "Orwell" trả về kết quả chính xác');

    // Lọc theo thể loại & ngôn ngữ
    const filterRes = await makeRequest('GET', '/api/books?genre=Classic&language=English');
    assert(filterRes.status === 200 && filterRes.data.data.length > 0, 'Bộ lọc kết hợp Thể loại (Classic) + Ngôn ngữ (English) hoạt động chuẩn xác');

    // Sách nổi bật (Featured Books)
    const featuredRes = await makeRequest('GET', '/api/books/featured');
    assert(featuredRes.status === 200 && featuredRes.data.data.length > 0, 'Lấy danh sách sách nổi bật (Featured) thành công');

    // Chi tiết sách bk-01 kèm sách liên quan
    const bookDetailRes = await makeRequest('GET', '/api/books/bk-01');
    assert(
      bookDetailRes.status === 200 &&
      bookDetailRes.data.data.book._id === 'bk-01' &&
      Array.isArray(bookDetailRes.data.data.relatedBooks),
      'Lấy chi tiết sách "1984" kèm 4 cuốn sách liên quan (Related Books) thành công'
    );

    // Tiêu chí bộ lọc dropdowns
    const filterOptionsRes = await makeRequest('GET', '/api/books/filters');
    assert(
      filterOptionsRes.status === 200 &&
      filterOptionsRes.data.data.genres.length > 0 &&
      filterOptionsRes.data.data.languages.length > 0,
      'Lấy danh sách các tùy chọn bộ lọc cho UI thành công'
    );

    // -----------------------------------------------------------------
    // 4. AUTHORS, COLLECTIONS & GALLERY
    // -----------------------------------------------------------------
    console.log('\n📌 NHÓM 4: KIỂM THỬ TÁC GIẢ, BỘ SƯU TẬP & THƯ VIỆN ẢNH');

    const authorsRes = await makeRequest('GET', '/api/authors');
    assert(authorsRes.status === 200 && authorsRes.data.data.length === 8, 'Lấy danh sách 8 tác giả kinh điển thành công');

    const authorDetailRes = await makeRequest('GET', '/api/authors/auth-01');
    assert(
      authorDetailRes.status === 200 &&
      authorDetailRes.data.data.author.name === 'George Orwell' &&
      authorDetailRes.data.data.books.length >= 2,
      'Hồ sơ tác giả George Orwell kèm toàn bộ danh mục tác phẩm (Bibliography)'
    );

    const collectionsRes = await makeRequest('GET', '/api/collections');
    assert(collectionsRes.status === 200 && collectionsRes.data.data.length === 4, 'Lấy danh sách 4 bộ sưu tập sách tuyển chọn');

    const galleryRes = await makeRequest('GET', '/api/gallery');
    assert(galleryRes.status === 200 && galleryRes.data.data.length === 6, 'Lấy thư viện 6 tác phẩm nghệ thuật / bìa minh họa');

    // -----------------------------------------------------------------
    // 5. READING TRACKER & FAVORITES
    // -----------------------------------------------------------------
    console.log('\n📌 NHÓM 5: KIỂM THỬ TIẾN ĐỘ ĐỌC (TRACKER) & DANH SÁCH YÊU THÍCH');

    // Thêm tiến độ đọc
    const upsertProgressRes = await makeRequest('POST', '/api/tracker/bk-02', {
      currentPage: 70,
      totalPages: 140,
      notes: 'Đã đọc một nửa Animal Farm'
    }, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(
      upsertProgressRes.status === 200 &&
      upsertProgressRes.data.data.percentage === 50 &&
      upsertProgressRes.data.data.status === 'Reading',
      'Cập nhật tiến độ đọc sách: tự động tính 50% và trạng thái "Reading"'
    );

    // Thống kê đọc cá nhân
    const trackerStatsRes = await makeRequest('GET', '/api/tracker/stats', null, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(
      trackerStatsRes.status === 200 && trackerStatsRes.data.data.totalPagesRead >= 70,
      'Thống kê đọc sách cá nhân (Analytics) phản hồi chính xác'
    );

    // Toggle Favorite
    const addFavRes = await makeRequest('POST', '/api/favorites/bk-02', null, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(addFavRes.status === 201 && addFavRes.data.data.isFavorited === true, 'Đánh dấu yêu thích sách bk-02 (Toggle Add)');

    const checkFavRes = await makeRequest('GET', '/api/favorites/bk-02/check', null, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(checkFavRes.status === 200 && checkFavRes.data.data.isFavorited === true, 'Kiểm tra trạng thái yêu thích thành công');

    const removeFavRes = await makeRequest('POST', '/api/favorites/bk-02', null, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(removeFavRes.status === 200 && removeFavRes.data.data.isFavorited === false, 'Bỏ yêu thích sách bk-02 (Toggle Remove)');

    // -----------------------------------------------------------------
    // 6. REVIEWS & CONTACT
    // -----------------------------------------------------------------
    console.log('\n📌 NHÓM 6: KIỂM THỬ ĐÁNH GIÁ SÁCH & BIỂU MẪU LIÊN HỆ');

    const reviewRes = await makeRequest('POST', '/api/reviews/book/bk-01', {
      rating: 5,
      comment: 'Cuốn sách xuất sắc nhất mà tôi từng đọc trong năm nay!'
    }, {
      Authorization: `Bearer ${newUserToken}`
    });
    assert(reviewRes.status === 201 && reviewRes.data.success === true, 'Đăng bài đánh giá sách 5 sao thành công');

    const contactRes = await makeRequest('POST', '/api/contact', {
      name: 'Nguyễn Độc Giả',
      email: 'reader.test@example.com',
      subject: 'Góp ý giao diện tìm kiếm',
      message: 'Hệ thống tìm kiếm sách rất nhạy và giao diện rất trang nhã!'
    });
    assert(contactRes.status === 201 && contactRes.data.success === true, 'Gửi biểu mẫu liên hệ thành công (201)');

    // -----------------------------------------------------------------
    // 7. ADMIN MANAGEMENT OPERATIONS
    // -----------------------------------------------------------------
    console.log('\n📌 NHÓM 7: KIỂM THỬ CÁC TÍNH NĂNG QUẢN TRỊ VIÊN (ADMIN DASHBOARD & CRUD)');

    // Admin Dashboard Stats
    const adminStatsRes = await makeRequest('GET', '/api/admin/stats', null, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(
      adminStatsRes.status === 200 &&
      adminStatsRes.data.data.counters.books >= 26 &&
      adminStatsRes.data.data.counters.users >= 2,
      'Bảng điều khiển Admin lấy đủ số liệu tổng hợp (Books, Authors, Users, Distributions)'
    );

    // Admin thêm sách mới
    const testBookId = `bk-test-${Date.now()}`;
    const createBookRes = await makeRequest('POST', '/api/admin/books', {
      _id: testBookId,
      title: 'Tác Phẩm Thử Nghiệm Tự Động',
      authorId: 'auth-01',
      isbn: `978-${Date.now()}`,
      language: 'Vietnamese',
      genre: 'Philosophy',
      readingLevel: 'Intermediate',
      period: 'Contemporary',
      publicationYear: 2026,
      pageCount: 250,
      synopsis: 'Tác phẩm thử nghiệm hệ thống quản trị BookBridge API.'
    }, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(createBookRes.status === 201 && createBookRes.data.data._id === testBookId, 'Admin tạo cuốn sách mới thành công (201)');

    // Admin cập nhật sách
    const updateBookRes = await makeRequest('PUT', `/api/admin/books/${testBookId}`, {
      title: 'Tác Phẩm Thử Nghiệm (Đã Sửa Đổi)',
      isFeatured: true
    }, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(updateBookRes.status === 200 && updateBookRes.data.data.isFeatured === true, 'Admin cập nhật thông tin sách thành công');

    // Admin xóa sách
    const deleteBookRes = await makeRequest('DELETE', `/api/admin/books/${testBookId}`, null, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(deleteBookRes.status === 200, 'Admin xóa cuốn sách thử nghiệm thành công (200)');

    // Admin xem danh sách người dùng
    const adminUsersRes = await makeRequest('GET', '/api/admin/users', null, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(adminUsersRes.status === 200 && adminUsersRes.data.data.length >= 2, 'Admin xem danh sách người dùng trong hệ thống');

    // Admin xem tin nhắn liên hệ
    const adminContactsRes = await makeRequest('GET', '/api/admin/contacts', null, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(adminContactsRes.status === 200 && adminContactsRes.data.data.length > 0, 'Admin xem danh sách tin nhắn liên hệ');

    // Admin xem nhật ký thao tác (Audit Logs)
    const auditLogsRes = await makeRequest('GET', '/api/admin/logs', null, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(auditLogsRes.status === 200 && auditLogsRes.data.data.length > 0, 'Admin xem nhật ký kiểm tra hệ thống (Audit Logs)');

    // -----------------------------------------------------------------
    // 8. ERROR & SECURITY BOUNDARY HANDLING
    // -----------------------------------------------------------------
    console.log('\n📌 NHÓM 8: KIỂM THỬ XỬ LÝ LỖI BIÊN & BẢO MẬT (404, 422)');

    const notFoundRes = await makeRequest('GET', '/api/invalid-non-existent-route');
    assert(notFoundRes.status === 404, 'Endpoint không tồn tại trả về lỗi chuẩn 404');

    const invalidBookRes = await makeRequest('POST', '/api/admin/books', {
      title: '' // Thiếu các trường bắt buộc
    }, {
      Authorization: `Bearer ${adminToken}`
    });
    assert(invalidBookRes.status === 422, 'Gửi dữ liệu sách thiếu trường bắt buộc bị từ chối 422 Unprocessable Entity');

  } catch (err) {
    console.error('❌ Lỗi ngoại lệ trong quá trình test:', err);
    failedTests++;
  } finally {
    if (testServer) {
      await new Promise((res) => testServer.close(res));
    }
    await disconnectDB();

    console.log('\n======================================================');
    console.log(`📊 KẾT QUẢ TỔNG HỢP KIỂM THỬ:`);
    console.log(`   ✅ SỐ TEST PASS : ${passedTests}`);
    console.log(`   ❌ SỐ TEST FAIL : ${failedTests}`);
    console.log('======================================================\n');

    if (failedTests > 0) {
      process.exit(1);
    } else {
      process.exit(0);
    }
  }
}

runTestSuite();
