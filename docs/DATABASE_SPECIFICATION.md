# TÀI LIỆU ĐẶC TẢ CƠ SỞ DỮ LIỆU MONGODB: BOOKBRIDGE
**Database Specification & Schema Design Report**
*Dự án: BookBridge – Responsive Book Discovery & Reading Tracker Portal*
*Chuẩn phát triển: NoSQL Database Architecture (MongoDB 7.x)*

---

## 1. MỤC TIÊU THIẾT KẾ CƠ SỞ DỮ LIỆU (DATABASE OBJECTIVES)
1. **Khả năng mở rộng linh hoạt (High Scalability & Schema Flexibility)**: Thích ứng dễ dàng với đặc thù dữ liệu sách phong phú, đa ngôn ngữ và các chủ đề mở rộng.
2. **Tối ưu hóa hiệu năng truy vấn (High-Performance Compound Querying)**: Sử dụng Single & Compound Indexes phục vụ thuật toán lọc sách tức thì theo Thể loại, Ngôn ngữ và Cấp độ đọc.
3. **Tìm kiếm toàn văn (Text Indexing)**: Cho phép tìm kiếm không dấu/có dấu trên tựa đề sách, tóm tắt và chủ đề nổi bật.
4. **Tính toàn vẹn dữ liệu (Data Integrity via $jsonSchema Validation)**: Định nghĩa luật kiểm tra kiểu dữ liệu và trường bắt buộc ở tầng database engine.

---

## 2. TỔNG QUAN HỆ CƠ SỞ DỮ LIỆU `bookbridge_db`

```mermaid
erDiagram
    authors ||--o{ books : "writes"
    collections }o--o{ books : "aggregates"
    books ||--o| reading_progress : "tracked"
    books ||--o| favorites : "favorited"
    books ||--o{ gallery_items : "visualized"

    authors {
        string _id PK "auth-xx"
        string name "Required"
        string nationality "Required"
        string specialization
        string bio "Required"
        string[] notableThemes
    }

    books {
        string _id PK "bk-xx"
        string title "Required"
        string authorId FK "Ref authors._id"
        string isbn "Unique"
        string language "Enum"
        string genre "Enum"
        string readingLevel "Enum"
        int publicationYear "Required"
        int pageCount "Required"
        string coverImage
        string synopsis "Required"
        string[] themes
        float rating
        boolean isFeatured
    }

    collections {
        string _id PK "col-xx"
        string title "Required"
        string description "Required"
        string badge
        string[] bookIds FK "Array of bk-xx"
    }

    gallery_items {
        string _id PK "gal-xx"
        string bookId FK "Ref books._id"
        string imageUrl "Required"
        string caption "Required"
        string credit
        string aspect "portrait | landscape | square"
    }

    reading_progress {
        string bookId PK_FK "Unique Ref books._id"
        string status "To Read | Reading | Completed"
        int currentPage
        int totalPages
        int percentage
        string notes
        date lastUpdated
    }

    favorites {
        string bookId PK_FK "Unique Ref books._id"
        date addedAt
    }
```

---

## 3. CHI TIẾT CÁC BẢNG DỮ LIỆU (COLLECTIONS SPECIFICATION)

### 3.1. Collection: `books`
- **Tập dữ liệu khởi tạo**: 26 bản ghi (từ `bk-01` đến `bk-26`).
- **Phân bổ ngôn ngữ**: English, French, Japanese, German, Spanish, Vietnamese, Russian.
- **Phân bổ cấp độ đọc**: Beginner (nhập môn), Intermediate (trung cấp), Advanced (nâng cao).
- **Index Rules**:
  - `{ title: "text", synopsis: "text", themes: "text" }`
  - `{ genre: 1, language: 1, readingLevel: 1 }`
  - `{ authorId: 1 }`
  - `{ isFeatured: 1 }`
  - `{ isbn: 1 }` (Unique, Sparse)

### 3.2. Collection: `authors`
- **Tập dữ liệu khởi tạo**: 8 tác giả lớn thế giới và Việt Nam (George Orwell, Antoine de Saint-Exupéry, Haruki Murakami, Franz Kafka, Gabriel García Márquez, Nam Cao, Fyodor Dostoevsky, Albert Camus).
- **Index Rules**:
  - `{ name: "text", specialization: "text" }`

### 3.3. Collection: `collections`
- **Tập dữ liệu khởi tạo**: 4 bộ sưu tập định hướng (Timeless Classics, Fast & Engaging Reads, Modern Literary Gems, Polyglot Starter Kit).

### 3.4. Collection: `gallery_items`
- **Tập dữ liệu khởi tạo**: 6 tư liệu minh họa hình ảnh nghệ thuật kết hợp ghi nhận nguồn gốc bản quyền.

### 3.5. Collection: `reading_progress`
- **Tính năng**: Lưu trữ tiến trình đọc sách cá nhân theo cuốn sách. Có trường `percentage` tính tự động dựa trên `currentPage / totalPages * 100`.

### 3.6. Collection: `favorites`
- **Tính năng**: Quản lý danh sách sách được đánh dấu yêu thích kèm mốc thời gian `addedAt`.

---

## 4. TÀI NGUYÊN TRIỂN KHAI KÈM THEO
Toàn bộ mã nguồn, data JSON và kịch bản thực thi được lưu tại thư mục [database/](file:///c:/e%20project/database):
1. **Dữ liệu nguồn JSON**: [database/data/](file:///c:/e%20project/database/data)
2. **Kịch bản thực thi tự động (MongoDB Shell)**: [init-mongo.js](file:///c:/e%20project/database/init-mongo.js)
3. **Mongoose Models (Node.js)**: [database/models/](file:///c:/e%20project/database/models)
4. **Khởi chạy container**: [database/docker-compose.yml](file:///c:/e%20project/database/docker-compose.yml)
