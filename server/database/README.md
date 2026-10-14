# 📚 BOOKBRIDGE – MONGODB DATABASE SPECIFICATION & GUIDE

Cơ sở dữ liệu MongoDB hoàn chỉnh được thiết kế riêng cho hệ thống **BookBridge** (Đồ án eProject Aptech), tuân thủ chuẩn Enterprise, tối ưu hóa truy vấn tìm kiếm toàn văn (Text Search) và bộ lọc kết hợp đa chiều (Compound Filter Pipeline).

---

## 🗂️ 1. Cấu Trúc Thư Mục Cơ Sở Dữ Liệu

```text
database/
├── README.md               # Tài liệu hướng dẫn sử dụng chi tiết
├── docker-compose.yml      # Khởi chạy MongoDB 7.0 & Web UI Mongo-Express trong 1 lệnh
├── init-mongo.js           # Script khởi tạo Database, Schema validation, Indexes và nạp dữ liệu (mongosh)
├── seed.js                 # Script nạp dữ liệu bằng Node.js & Mongoose
├── connection.js           # Module kết nối MongoDB (Mongoose) chuẩn retry & event handling
├── package.json            # Cấu hình dependency Mongoose và các lệnh npm
├── .env.example            # Mẫu biến môi trường kết nối
├── data/                   # File JSON nguồn (26 sách, 8 tác giả, collections, gallery)
│   ├── books.json          # 26 cuốn sách chuẩn eProject Aptech
│   ├── authors.json        # 8 tác giả kinh điển & đương đại
│   ├── collections.json    # 4 bộ sưu tập tuyển chọn
│   ├── gallery.json        # 6 minh họa nghệ thuật
│   ├── reading_progress.json
│   └── favorites.json
└── models/                 # Mongoose Data Models (Schemas)
    ├── Author.js
    ├── Book.js
    ├── Collection.js
    ├── GalleryItem.js
    ├── ReadingProgress.js
    ├── Favorite.js
    └── index.js
```

---

## 📊 2. Danh Sách Collections & Thiết Kế Thực Thể

| Tên Collection | Số lượng bản ghi mẫu | Mô tả & Vai trò | Indexes chính |
| :--- | :---: | :--- | :--- |
| **`books`** | 26 | Lưu trữ danh mục sách: tựa đề, mã ISBN, ngôn ngữ, thể loại, độ khó đọc, tóm tắt, ảnh bìa, rating. | - Text Search: `{ title, synopsis, themes }`<br>- Compound: `{ genre, language, readingLevel }`<br>- Unique: `{ isbn }` |
| **`authors`** | 8 | Thông tin tiểu sử, quốc tịch, chuyên môn và các chủ đề tiêu biểu của tác giả. | - Text Search: `{ name, specialization }` |
| **`collections`** | 4 | Các bộ sưu tập sách tuyển chọn (Timeless Classics, Fast & Engaging Reads, v.v.). | - Default `_id` |
| **`gallery_items`** | 6 | Hình ảnh nghệ thuật, phác thảo minh họa, bìa sách nghệ thuật kèm bản quyền (Credits). | - Index: `{ bookId }` |
| **`reading_progress`** | 3 | Trạng thái đọc (To Read, Reading, Completed), trang hiện tại, % hoàn thành và ghi chú. | - Unique Index: `{ bookId }` |
| **`favorites`** | 4 | Danh sách sách được người dùng đánh dấu yêu thích (Bookmarks). | - Unique Index: `{ bookId }` |


---

## 🔗 3. Sơ Đồ Thực Thể & Mối Liên Kết Dữ Liệu (ERD & Relationships)

### 3.1. Sơ đồ Quan hệ Thực thể (Mermaid ERD)
```mermaid
erDiagram
    authors ||--o{ books : "1:N (writes / sang-tac)"
    collections }o--o{ books : "N:N (curates / tong-hop)"
    books ||--o{ gallery_items : "1:N (illustrates / minh-hoa)"
    books ||--o| reading_progress : "1:1 (tracks / theo-doi)"
    books ||--o| favorites : "1:1 (bookmarks / yeu-thich)"

    authors {
        string _id PK "auth-xx"
        string name "Ten tac gia"
        string avatar "URL anh dai dien"
        string nationality "Quoc tich"
        string specialization "Chuyen mon"
        string bio "Tieu su"
        string[] notableThemes "Mang chu de"
    }

    books {
        string _id PK "bk-xx"
        string title "Tua de sach"
        string authorId FK "Ref authors._id"
        string isbn "Ma ISBN (Unique)"
        string language "Ngon ngu"
        string genre "The loai"
        string readingLevel "Beginner | Intermediate | Advanced"
        string period "Classic | Modern | Contemporary"
        int publicationYear "Nam xuat ban"
        int pageCount "So trang (Min: 1)"
        string coverImage "Duong dan anh bia"
        string synopsis "Tom tat noi dung"
        string[] themes "Mang chu de chinh"
        double rating "Diem danh gia (0-5)"
        bool isFeatured "Sach noi bat"
    }

    collections {
        string _id PK "col-xx"
        string title "Ten tuyen tap"
        string description "Mo ta tuyen tap"
        string badge "Nhan phan loai"
        string[] bookIds FK "Mang Ref books._id"
    }

    gallery_items {
        string _id PK "gal-xx"
        string bookId FK "Ref books._id"
        string imageUrl "Duong dan anh"
        string caption "Chu thich tac pham"
        string credit "Nguon ban quyen"
        string aspect "portrait | landscape | square"
    }

    reading_progress {
        string bookId PK_FK "Unique Ref books._id"
        string status "To Read | Reading | Completed"
        int currentPage "Trang hien tai"
        int totalPages "Tong so trang"
        int percentage "% da doc (Tu dong tinh)"
        string notes "Ghi chu cam nhan"
        date lastUpdated "Thoi diem cap nhat"
    }

    favorites {
        string bookId PK_FK "Unique Ref books._id"
        date addedAt "Thoi diem them"
    }
```

### 3.2. Bảng Ma Trận Liên Kết Giữa Các Collections

| Mối quan hệ | Cặp Collection | Trường liên kết (Foreign Key) | Bản số (Cardinality) | Ý nghĩa nghiệp vụ |
| :--- | :--- | :--- | :---: | :--- |
| **Tác giả – Sách** | `authors` ➔ `books` | `books.authorId` ➔ `authors._id` | **1 : N** | Một tác giả viết nhiều cuốn sách; mỗi cuốn sách liên kết với 1 tác giả chính. |
| **Tuyển tập – Sách** | `collections` ➔ `books` | `collections.bookIds[]` ➔ `books._id` | **N : N** | Một bộ sưu tập chứa nhiều sách; một cuốn sách có thể xuất hiện trong nhiều bộ sưu tập. |
| **Sách – Ảnh minh họa**| `books` ➔ `gallery_items` | `gallery_items.bookId` ➔ `books._id` | **1 : N** | Một cuốn sách có thể có nhiều hình ảnh nghệ thuật/bìa phác thảo trong thư viện. |
| **Sách – Tiến độ đọc**| `books` ➔ `reading_progress`| `reading_progress.bookId` ➔ `books._id`| **1 : 1 (0..1)** | Mỗi sách có tối đa 1 bản ghi lưu trạng thái đọc (*To Read / Reading / Completed*) và số trang. |
| **Sách – Yêu thích** | `books` ➔ `favorites` | `favorites.bookId` ➔ `books._id` | **1 : 1 (0..1)** | Mỗi sách chỉ được đánh dấu bookmark yêu thích một lần duy nhất (`bookId` là Unique). |

---

## 🚀 4. Hướng Dẫn Khởi Tạo Database (Chọn 1 trong 4 cách)

### 👉 Cách 1: Sử dụng MongoDB Shell (`mongosh`) — *Khuyên dùng, Nhanh nhất!*
Nếu máy tính của bạn đã cài MongoDB và `mongosh`:
1. Mở Terminal / PowerShell tại thư mục `c:/e project/database`.
2. Chạy lệnh:
```bash
mongosh "mongodb://localhost:27017/bookbridge_db" init-mongo.js
```
> Script sẽ tự động tạo database `bookbridge_db`, áp dụng Schema Rules, tạo Indexes và nạp toàn bộ 26 cuốn sách, 8 tác giả, collections và gallery.

---

### 👉 Cách 2: Sử dụng MongoDB Compass (Giao diện trực quan)
1. Mở **MongoDB Compass**, nhấn **Connect** tới `mongodb://localhost:27017`.
2. Ở thanh công cụ bên dưới đáy ứng dụng, bấm vào tab **`_MONGOSH`**.
3. Mở file [init-mongo.js](file:///c:/e%20project/database/init-mongo.js), copy toàn bộ nội dung, dán vào cửa sổ `_MONGOSH` của Compass và nhấn **Enter**.
4. Bấm nút Refresh ở danh sách Database bên trái, bạn sẽ thấy `bookbridge_db` xuất hiện với đầy đủ 6 collections!

*Hoặc import thủ công bằng JSON:*
- Tạo database `bookbridge_db`, tạo collection `books`.
- Chọn nút **Add Data** -> **Import JSON or CSV file** -> Chọn file [books.json](file:///c:/e%20project/database/data/books.json). Làm tương tự cho [authors.json](file:///c:/e%20project/database/data/authors.json).

---

### 👉 Cách 3: Sử dụng Node.js & Mongoose Script
1. Mở Terminal tại thư mục `c:/e project/database`.
2. Cài đặt thư viện Mongoose:
```bash
npm install
```
3. Chạy lệnh nạp dữ liệu:
```bash
npm run seed
```
*(hoặc `node seed.js`)*

---

### 👉 Cách 4: Chạy qua Docker Compose (Không cần cài MongoDB lên máy)
Nếu bạn đã có Docker Desktop:
```bash
cd "c:/e project/database"
docker compose up -d
```
- MongoDB Server sẽ chạy tại cổng `27017`.
- Dữ liệu và cấu hình index được tự động import qua `init-mongo.js`.
- Giao diện web quản lý cơ sở dữ liệu **Mongo Express** sẵn sàng tại: [http://localhost:8081](http://localhost:8081) *(User/Pass: admin / admin)*.

---

## 🔍 5. Một Số Mẫu Truy Vấn Thường Dùng (Query Examples)

### 1. Tìm kiếm sách theo từ khóa (Full-text search):
```javascript
db.books.find({ $text: { $search: "Orwell Dystopian" } });
```

### 2. Lọc sách theo nhiều tiêu chí (Genre + Language + Reading Level):
```javascript
db.books.find({
  genre: "Classic",
  language: "English",
  readingLevel: "Beginner"
});
```

### 3. Lấy thông tin sách kèm chi tiết tác giả ($lookup):
```javascript
db.books.aggregate([
  {
    $lookup: {
      from: "authors",
      localField: "authorId",
      foreignField: "_id",
      as: "authorDetails"
    }
  },
  { $unwind: "$authorDetails" }
]);
```

### 4. Lấy các cuốn sách trong bộ sưu tập "Timeless Classics":
```javascript
const col = db.collections.findOne({ _id: "col-01" });
db.books.find({ _id: { $in: col.bookIds } });
```
