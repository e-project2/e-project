# BookBridge — Interactive Multilingual Book Discovery & Reading Tracker Portal

> **Aptech eProject Standard Web Application**  
> Kiến trúc: **Client-Server Single Page Application (SPA)** kết hợp **RESTful API** và **NoSQL Database (MongoDB)**.

---

## 📁 1. Cấu Trúc Dự Án (Project Structure)

Dự án được phân chia mô đun hóa chuẩn theo cấu trúc phân tầng công nghiệp:

```text
c:/e project/
├── client/                      # TOÀN BỘ MÃ NGUỒN FRONTEND (React 18 + Vite)
│   ├── public/                  # Favicon & assets hình ảnh (books, authors, gallery)
│   ├── src/
│   │   ├── components/          # UI Component Library (Home, Directory, Explorer, Gallery, Tracker...)
│   │   ├── constants/           # Genres, Languages, Reading Levels
│   │   ├── context/             # State Providers (Theme, Auth, Book, Favorites, Tracker)
│   │   ├── data/                # Mock Data Fallback độc lập
│   │   ├── hooks/               # useLocalStorage, useDebounce, useModal
│   │   ├── services/            # apiService, storageService
│   │   ├── utils/               # filterEngine, validators, formatters
│   │   ├── App.jsx              # Main Layout & Dynamic Router
│   │   ├── main.jsx             # React DOM Entry Point
│   │   └── index.css            # Design Tokens, Glassmorphism, Dark/Light theme
│   ├── index.html               # HTML Entry với typography Playfair Display & Icons
│   ├── vite.config.js           # Cấu hình Vite & API Proxy sang http://localhost:5000
│   └── package.json             # Dependencies Frontend (React, Vite, Lucide Icons)
│
├── server/                      # TOÀN BỘ MÃ NGUỒN BACKEND (Node.js / Express API)
│   ├── database/                # Cơ sở dữ liệu nguồn & script triển khai
│   │   ├── data/                # books.json, authors.json, collections.json...
│   │   ├── docker-compose.yml   # Khởi chạy container MongoDB 7.x
│   │   ├── init-mongo.js        # Script khởi tạo cơ sở dữ liệu MongoDB
│   │   ├── connection.js        # Kết nối Mongoose
│   │   └── seed.js              # Kịch bản nạp dữ liệu gốc
│   ├── src/
│   │   ├── config/              # Kết nối Database và bảo mật CORS/RateLimit
│   │   ├── controllers/         # Xử lý nghiệp vụ (Books, Authors, Tracker, Auth, Admin...)
│   │   ├── middleware/          # JWT Auth, Rate Limiter, NoSQL Sanitizer, Error Handler
│   │   ├── models/              # Mongoose Schemas (User, Book, Author, Review, Tracker...)
│   │   ├── routes/              # Modular Express Endpoints
│   │   ├── scripts/             # Kịch bản nạp dữ liệu và tiện ích
│   │   ├── tests/               # Bộ kiểm thử tích hợp (36/36 tests PASSED)
│   │   ├── utils/               # Password hash, JWT helpers, Logger
│   │   └── server.js            # Entry Point Backend Server (Port 5000)
│   ├── .env                     # Biến môi trường Backend
│   ├── .env.example             # Mẫu cấu hình môi trường
│   └── package.json             # Dependencies Backend (Express, Mongoose, JWT, Helmet...)
│
├── docs/                        # TÀI LIỆU DỰ ÁN & THIẾT KẾ
│   ├── PROJECT_ANALYSIS.md      # Phân tích kỹ thuật & kiến trúc sản phẩm
│   ├── DATABASE_SPECIFICATION.md# Đặc tả Cơ sở dữ liệu MongoDB
│   └── stitch_book_finder_web_design/ # 22 màn hình UI nguyên mẫu từ Stitch
│
├── package.json                 # Script điều phối khởi chạy toàn bộ Monorepo
└── README.md                    # Tài liệu hướng dẫn sử dụng & vận hành
```

---

## 🚀 2. Hướng Dẫn Cài Đặt & Khởi Chạy (Getting Started)

### 2.1. Yêu cầu môi trường
- **Node.js**: v18.0.0 trở lên (khuyến nghị v20.x hoặc v24.x)
- **MongoDB**: Chạy cục bộ tại `mongodb://127.0.0.1:27017/bookbridge_db` hoặc qua Docker:
  ```bash
  cd server/database
  docker-compose up -d
  ```

---

### 2.2. Khởi chạy Cả Frontend & Backend Đồng Thời (Khuyến Nghị)

Tại thư mục gốc `c:/e project`, bạn chỉ cần chạy **một câu lệnh duy nhất**:

```bash
npm run dev
# hoặc
npm start
```

> 🎯 **Kết quả**: Cả Backend (Port 5000) và Frontend (Port 5173) sẽ khởi động cùng lúc trên cùng một cửa sổ terminal, với log được phân biệt màu sắc (`[SERVER]` màu xanh dương, `[CLIENT]` màu tím hồng).
> - **Giao diện Web Frontend**: http://localhost:5173/
> - **API Server Backend**: http://localhost:5000/api
> - **Health Check**: http://localhost:5000/api/health

---

### 2.3. Các Lệnh Bổ Trợ Khác Tại Thư Mục Gốc

```bash
# 1. Chỉ chạy riêng Frontend Client (React + Vite)
npm run client

# 2. Chỉ chạy riêng Backend Server (Node.js + Express)
npm run server:dev

# 3. Chạy toàn bộ 36 Integration Tests của Backend
npm run test:server

# 4. Nạp lại dữ liệu mẫu vào MongoDB
npm run server:seed

# 5. Build đóng gói Production cho Client
npm run client:build
```

---

### 2.3. Khởi chạy Riêng Lẻ Từng Phần

#### Chạy Frontend (`client/`):
```bash
cd client
npm install
npm run dev
```

#### Chạy Backend (`server/`):
```bash
cd server
npm install
npm run dev
```

---

## 🔑 3. Tài Khoản Thử Nghiệm Sẵn Có (Demo Credentials)

Hệ thống đã tích hợp sẵn cơ chế nạp nhanh thông tin đăng nhập tại Modal Sign In:

| Vai trò (Role) | Email / Username | Mật khẩu (Password) | Quyền hạn |
| :--- | :--- | :--- | :--- |
| **Administrator** | `admin@bookbridge.com` | `Admin@123456` | Toàn quyền Dashboard, thêm/sửa/xóa sách, quản lý tác giả, xem logs |
| **Reader (Độc giả)** | `reader@bookbridge.com` | `Reader@123456` | Bookmark thư viện, ghi chép số trang đã đọc, đánh giá sách |

---

## 🌟 4. Các Tính Năng Nổi Bật

1. **Khám phá sách đa ngôn ngữ (Multilingual Exploration)**:
   - 26 cuốn sách kinh điển đại diện cho 7+ ngôn ngữ: Tiếng Việt, Anh, Pháp, Nhật, Đức, Tây Ban Nha, Nga.
   - Lọc kết hợp (Compound Filtering): Từ khóa tức thì (Debounced 250ms), Thể loại, Trình độ đọc (Beginner -> Advanced), Giai đoạn xuất bản.
2. **Interactive Gallery & Lightbox**:
   - Trưng bày ảnh bìa mỹ thuật, hỗ trợ phóng to Fullscreen Lightbox, điều hướng phím mũi tên `Left/Right` và phím `Escape`.
3. **Reading Tracker Cá nhân hóa**:
   - Lưu trữ an toàn tại `LocalStorage` với tính năng Fallback ngoại lệ bộ nhớ.
   - Kiểm tra hợp lệ số trang `0 <= currentPage <= totalPages`, tự động tính toán % và trạng thái (*To Read*, *Reading*, *Completed*).
4. **Bảo mật & Độ bền Backend**:
   - Helmet Security Headers, NoSQL Injection Sanitizer, Express Rate Limiter, JWT Authentication và RBAC.
   - Tự động Fallback: Nếu Backend mất kết nối, Frontend tự động kích hoạt chế độ Standalone Mock Data, trải nghiệm người dùng không bao giờ bị đứt quãng.
