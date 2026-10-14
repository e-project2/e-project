# 📚 BOOKBRIDGE – PRODUCTION-GRADE RESTful API BACKEND

Backend máy chủ hiệu năng cao, bảo mật cấp doanh nghiệp cho hệ thống **BookBridge – Cổng Khám Phá Sách & Quản Lý Kế Hoạch Đọc (Aptech eProject)**.

---

## 🌟 1. TỔNG QUAN KIẾN TRÚC & CÔNG NGHỆ (TECH STACK)

- **Runtime & Ngôn ngữ**: Node.js 24+ (ES Modules `import/export`).
- **Web Framework**: Express.js 4.19+ tối ưu hóa pipeline middleware.
- **Cơ sở dữ liệu**: MongoDB 9.0+ với Object Data Modeling (ODM) bằng **Mongoose 8.3+**.
- **Xác thực & Ủy quyền (Auth & RBAC)**: JSON Web Token (JWT) + Refresh Token + Bcryptjs (12 salt rounds).
- **Lớp Phòng Thủ Bảo Mật**:
  - **Helmet**: 15+ HTTP security headers chống Clickjacking, XSS, MIME Sniffing.
  - **Express-Rate-Limit**: Ngăn chặn brute-force và DDoS tấn công vào các endpoint xác thực và form liên hệ.
  - **NoSQL Injection Sanitizer**: Tự động lọc bỏ các toán tử MongoDB (`$gt`, `$ne`, `$where`, `.`) khỏi payload đầu vào.
  - **CORS Configurator**: Kiểm soát chặt chẽ danh sách domain được phép gọi API.
  - **Central Error Handler**: Chuẩn hóa phản hồi lỗi, không để lộ stack trace máy chủ trên môi trường production.

---

## 🗂️ 2. CẤU TRÚC THƯ MỤC CHUẨN DOANH NGHIỆP

```text
backend/
├── .env.example            # Mẫu cấu hình môi trường
├── .env                    # Biến môi trường thực tế (PORT, MONGODB_URI, JWT_SECRET...)
├── package.json            # Quản lý thư viện và scripts
├── server.js               # Entry point, nạp middleware bảo mật, lifecycle & graceful shutdown
├── config/
│   ├── db.js               # Module kết nối MongoDB với retry & reconnect listeners
│   └── security.js         # Cấu hình JWT, Salt rounds, Whitelist CORS và ngưỡng Rate Limit
├── models/                 # Mongoose Data Models
│   ├── User.js             # Tài khoản Người dùng & Quản trị viên (Hashed password, RBAC, Status)
│   ├── Book.js             # Danh mục sách (Text Indexing, Compound Indexing, Tự động liên kết Tác giả)
│   ├── Author.js           # Hồ sơ tác giả & Lĩnh vực sáng tác
│   ├── Collection.js       # Tuyển tập sách được tuyển chọn
│   ├── GalleryItem.js      # Thư viện ảnh nghệ thuật & Bìa minh họa
│   ├── ReadingProgress.js  # Tiến trình đọc sách của độc giả (Tự động tính % và trạng thái)
│   ├── Favorite.js         # Danh sách sách đánh dấu yêu thích (Bookmarks)
│   ├── Review.js           # Nhận xét & Đánh giá sách (Tự động cập nhật rating sách)
│   ├── ContactMessage.js   # Tiếp nhận và phân loại thông tin liên hệ từ độc giả
│   ├── AuditLog.js         # Nhật ký kiểm tra thao tác hệ thống dành cho Quản trị viên
│   └── index.js            # Xuất tập trung toàn bộ models
├── middleware/
│   ├── auth.js             # Middleware xác thực JWT: verifyToken, requireAdmin, optionalAuth
│   ├── security.js         # Bộ lọc NoSQL Sanitizer & Rate Limiting đa cấp độ
│   ├── validation.js       # Kiểm tra hợp lệ dữ liệu đầu vào (Validation Schemas)
│   ├── auditLogger.js      # Ghi vết thao tác nghiệp vụ quản trị
│   └── errorHandler.js     # Bắt lỗi 404 và xử lý ngoại lệ toàn cục (CastError, Duplicate Key, ValidationError)
├── controllers/            # Tầng xử lý nghiệp vụ chính
│   ├── authController.js   # Đăng ký, Đăng nhập, Làm mới Token, Xem/Sửa thông tin cá nhân, Đổi mật khẩu
│   ├── bookController.js   # Bộ lọc đa chiều, Tìm kiếm toàn văn, Sách nổi bật, Gợi ý sách liên quan
│   ├── authorController.js # Danh sách tác giả & Danh mục tác phẩm (Author Bibliography)
│   ├── collectionController.js # Danh sách và chi tiết bộ sưu tập tuyển chọn
│   ├── galleryController.js    # Khám phá thư viện hình ảnh nghệ thuật
│   ├── trackerController.js    # Quản lý tiến trình đọc sách cá nhân & Thống kê Analytics
│   ├── favoriteController.js   # Bật/Tắt bookmark sách yêu thích
│   ├── reviewController.js     # Đăng nhận xét, chấm điểm sao, tính lại điểm trung bình
│   ├── contactController.js    # Tiếp nhận liên hệ độc giả
│   └── adminController.js      # Thống kê Dashboard, CRUD Sách, CRUD Tác giả, Quản lý User, Nhật ký hệ thống
├── routes/
│   ├── authRoutes.js       # /api/auth/*
│   ├── bookRoutes.js       # /api/books/*
│   ├── authorRoutes.js     # /api/authors/*
│   ├── collectionRoutes.js # /api/collections/*
│   ├── galleryRoutes.js    # /api/gallery/*
│   ├── trackerRoutes.js    # /api/tracker/*
│   ├── favoriteRoutes.js   # /api/favorites/*
│   ├── reviewRoutes.js     # /api/reviews/*
│   ├── contactRoutes.js    # /api/contact/*
│   ├── adminRoutes.js      # /api/admin/* (Bảo vệ 100% bằng RBAC: Token + Admin Role)
│   └── index.js            # Gom toàn bộ route & Health Check (/api/health)
├── scripts/
│   └── seed.js             # Nạp toàn bộ dữ liệu mẫu ban đầu (26 sách, 8 tác giả, users, review, tracker)
└── tests/
    └── api.test.js         # Bộ kiểm thử tích hợp tự động toàn diện (36/36 Test Cases đạt 100%)
```

---

## 🔑 3. TÀI KHOẢN MẪU KHỞI TẠO (SEEDED ACCOUNTS)

| Vai trò (Role) | Email | Mật khẩu (Password) | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Quản trị viên (Admin)** | `admin@bookbridge.com` | `Admin@123456` | Quản trị toàn quyền: Thống kê Dashboard, CRUD sách, tác giả, khóa tài khoản người dùng, xem audit logs. |
| **Độc giả mẫu (Reader)** | `reader@bookbridge.com` | `Reader@123456` | Khám phá sách, theo dõi tiến độ đọc (Tracker), đánh dấu yêu thích, đăng nhận xét đánh giá. |

---

## 📡 4. DANH MỤC API CHI TIẾT (API SPECIFICATION)

### 4.1. Hệ Thống Xác Thực & Người Dùng (`/api/auth`)
| Phương thức | Đường dẫn | Quyền | Mô tả |
| :---: | :--- | :---: | :--- |
| `POST` | `/api/auth/register` | Công khai | Đăng ký tài khoản người dùng mới |
| `POST` | `/api/auth/login` | Công khai | Đăng nhập tài khoản (Email hoặc Username + Mật khẩu) |
| `POST` | `/api/auth/refresh-token` | Công khai | Cấp mới Access Token bằng Refresh Token |
| `GET` | `/api/auth/me` | User | Xem thông tin hồ sơ tài khoản hiện hành |
| `PUT` | `/api/auth/profile` | User | Cập nhật họ tên, ảnh đại diện, tiểu sử |
| `PUT` | `/api/auth/change-password`| User | Đổi mật khẩu tài khoản |

### 4.2. Danh Mục Sách & Khám Phá (`/api/books`)
| Phương thức | Đường dẫn | Quyền | Mô tả & Tham số chính |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/books` | Công khai | Lọc đa tiêu chí: `?q=`, `genre=`, `language=`, `readingLevel=`, `period=`, `sort=`, `page=`, `limit=` |
| `GET` | `/api/books/featured` | Công khai | Lấy danh sách sách nổi bật hiển thị ở Carousel trang chủ |
| `GET` | `/api/books/search` | Công khai | Tìm kiếm nhanh autocomplete gợi ý: `?q=` |
| `GET` | `/api/books/filters` | Công khai | Lấy các giá trị danh mục (Genres, Languages, Levels, Periods) cho thanh lọc UI |
| `GET` | `/api/books/:id` | Công khai | Lấy chi tiết sách kèm thuật toán gợi ý 4 cuốn sách liên quan (Related Books) |

### 4.3. Tác Giả, Bộ Sưu Tập & Thư Viện Ảnh
| Phương thức | Đường dẫn | Quyền | Mô tả |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/authors` | Công khai | Danh sách tác giả kèm phân trang & tìm kiếm |
| `GET` | `/api/authors/:id` | Công khai | Hồ sơ tác giả kèm toàn bộ tác phẩm trong hệ thống (Bibliography) |
| `GET` | `/api/collections` | Công khai | Danh sách 4 bộ sưu tập tuyển chọn |
| `GET` | `/api/collections/:id` | Công khai | Chi tiết bộ sưu tập kèm danh sách sách đầy đủ |
| `GET` | `/api/gallery` | Công khai | Thư viện hình ảnh nghệ thuật & bìa sách |
| `GET` | `/api/gallery/:id` | Công khai | Chi tiết ảnh nghệ thuật kèm tác quyền (Credits) |

### 4.4. Tính Năng Người Dùng (Reading Tracker, Favorites, Reviews, Contact)
| Phương thức | Đường dẫn | Quyền | Mô tả |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/tracker` | User | Lấy danh sách sách đang đọc của tài khoản |
| `GET` | `/api/tracker/stats` | User | Thống kê đọc sách cá nhân (Tổng số trang, tỷ lệ hoàn thành) |
| `POST` | `/api/tracker/:bookId` | User | Thêm hoặc cập nhật tiến độ đọc (Tự động tính % và trạng thái) |
| `DELETE` | `/api/tracker/:bookId` | User | Xóa sách khỏi trình theo dõi đọc |
| `GET` | `/api/favorites` | User | Lấy danh sách sách được đánh dấu yêu thích (Bookmarks) |
| `GET` | `/api/favorites/:bookId/check` | User | Kiểm tra trạng thái đã yêu thích cuốn sách hay chưa |
| `POST` | `/api/favorites/:bookId` | User | Bật / tắt bookmark yêu thích (Toggle Add / Remove) |
| `GET` | `/api/reviews/book/:bookId` | Công khai | Xem các đánh giá & nhận xét của cuốn sách |
| `POST` | `/api/reviews/book/:bookId` | User | Đăng hoặc cập nhật đánh giá (Tự động tính lại rating trung bình của sách) |
| `POST` | `/api/contact` | Công khai | Gửi phản hồi liên hệ (Bảo vệ bằng rate-limiting chống spam) |

### 4.5. Phân Hệ Quản Trị Viên (Admin APIs - `/api/admin`)
> *Tất cả các route dưới đây được bảo vệ 2 lớp: Token hợp lệ + Vai trò `admin`.*

| Phương thức | Đường dẫn | Quyền | Mô tả |
| :---: | :--- | :---: | :--- |
| `GET` | `/api/admin/stats` | **Admin** | Tổng quan Dashboard: Số lượng Sách, Tác giả, Users, Phân bổ Thể loại, Ngôn ngữ, Tin nhắn mới |
| `POST` | `/api/admin/books` | **Admin** | Thêm mới một cuốn sách vào hệ thống (Validation & Audit Log) |
| `PUT` | `/api/admin/books/:id` | **Admin** | Cập nhật thông tin chi tiết cuốn sách (Audit Log) |
| `DELETE` | `/api/admin/books/:id` | **Admin** | Xóa sách và cascade làm sạch tiến độ đọc, yêu thích, đánh giá (Audit Log) |
| `POST` | `/api/admin/authors` | **Admin** | Tạo mới tác giả |
| `PUT` | `/api/admin/authors/:id`| **Admin** | Cập nhật tác giả |
| `DELETE` | `/api/admin/authors/:id`| **Admin** | Xóa tác giả (Kiểm tra ràng buộc không xóa tác giả đang có tác phẩm) |
| `GET` | `/api/admin/users` | **Admin** | Quản lý danh sách người dùng kèm bộ lọc role và status |
| `PUT` | `/api/admin/users/:id/status` | **Admin** | Khóa (Ban) hoặc kích hoạt lại tài khoản người dùng |
| `PUT` | `/api/admin/users/:id/role` | **Admin** | Nâng quyền lên Admin hoặc hạ xuống User |
| `DELETE` | `/api/admin/users/:id` | **Admin** | Xóa tài khoản người dùng và dữ liệu liên quan |
| `GET` | `/api/admin/contacts` | **Admin** | Xem danh sách tin nhắn liên hệ từ độc giả |
| `PUT` | `/api/admin/contacts/:id` | **Admin** | Cập nhật trạng thái tin nhắn (unread / read / replied) |
| `DELETE` | `/api/admin/contacts/:id` | **Admin** | Xóa tin nhắn liên hệ |
| `GET` | `/api/admin/logs` | **Admin** | Xem nhật ký kiểm tra vết thao tác của ban quản trị (Audit Trail) |

---

## 🚀 5. HƯỚNG DẪN CÀI ĐẶT & VẬN HÀNH (GETTING STARTED)

### Bước 1: Khởi động cơ sở dữ liệu MongoDB
Đảm bảo dịch vụ MongoDB Server đang chạy trên máy (cổng mặc định `27017`).

### Bước 2: Cài đặt Dependencies
```bash
cd "c:/e project/backend"
npm install
```

### Bước 3: Nạp dữ liệu mẫu ban đầu (Seeder)
Lệnh này sẽ nạp đầy đủ 26 cuốn sách, 8 tác giả, collections, gallery, tài khoản Admin và Reader:
```bash
npm run seed
```

### Bước 4: Chạy bộ kiểm thử tự động (Test Suite)
Xác thực 100% tất cả 36 kịch bản kiểm thử tích hợp:
```bash
npm test
```

### Bước 5: Khởi chạy máy chủ API Backend
```bash
npm start
```
*Hoặc chế độ tự động reload khi phát triển:*
```bash
npm run dev
```

Máy chủ sẽ lắng nghe tại: **`http://localhost:5000`**.  
Kiểm tra tình trạng máy chủ tại: **`http://localhost:5000/api/health`**.

---

## 🛡️ 6. ĐẶC TẢ BẢO MẬT HỆ THỐNG (SECURITY ARCHITECTURE)

1. **Authentication (Xác thực JWT)**:
   - Access Token có thời hạn 7 ngày, được mã hóa bằng khóa bí mật an toàn `JWT_SECRET`.
   - Refresh Token có thời hạn 30 ngày lưu trữ an toàn giúp duy trì phiên làm việc mượt mà.
2. **Authorization (Kiểm soát phân quyền RBAC)**:
   - Middleware `requireAdmin` chặn đứng mọi truy cập trái phép của người dùng thông thường vào các endpoint quản trị `/api/admin/*`, phản hồi `403 Forbidden`.
3. **Mã hóa mật khẩu một chiều**:
   - Mật khẩu người dùng được băm qua `bcryptjs` với độ muối 12 vòng lặp (Cost Factor = 12), đảm bảo an toàn tuyệt đối trước các tấn công Rainbow Table.
4. **NoSQL Injection Defense**:
   - Middleware `sanitizeInputs` đệ quy duyệt qua body, params và loại bỏ mọi trường chứa tiền tố `$`, vô hiệu hóa các payload phá hoại truy vấn MongoDB.
5. **Rate Limiting & Chống Brute Force**:
   - `authLimiter`: Giới hạn tối đa 15 lần thử xác thực trong 15 phút trên mỗi IP.
   - `contactLimiter`: Giới hạn tối đa 5 lần gửi tin nhắn trong 1 giờ chống spam form.
   - `apiLimiter`: Giới hạn 150 requests/phút cho các truy vấn API thông thường.
6. **HTTP Security Hardening (Helmet)**:
   - Ngăn chặn XSS qua CSP, bật `X-Content-Type-Options: nosniff`, kích hoạt `X-Frame-Options: SAMEORIGIN` chống Clickjacking.
7. **Audit Logging (Nhật ký thanh tra)**:
   - Mọi hành vi tạo, sửa, xóa sách, phân quyền user hoặc ban tài khoản của Admin đều được tự động lưu vào collection `AuditLog` kèm IP, User-Agent và timestamp.
