import fs from 'fs';
import path from 'path';

const collection = {
  info: {
    _postman_id: "bookbridge-api-collection-v1",
    name: "BookBridge API - Complete Test Suite",
    description: "Bộ kiểm thử API toàn diện cho dự án BookBridge (Aptech eProject). Bao gồm xác thực JWT, Sách, Tác giả, Bộ sưu tập, Thư viện ảnh, Reading Tracker, Yêu thích, Đánh giá và Phân hệ Quản trị viên (Admin).",
    schema: "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  variable: [
    { key: "baseUrl", value: "http://localhost:5000/api", type: "string" },
    { key: "adminToken", value: "", type: "string" },
    { key: "readerToken", value: "", type: "string" },
    { key: "bookId", value: "bk-01", type: "string" },
    { key: "authorId", value: "auth-01", type: "string" },
    { key: "collectionId", value: "col-01", type: "string" },
    { key: "galleryId", value: "gal-01", type: "string" },
    { key: "createdBookId", value: "bk-test-99", type: "string" },
    { key: "createdAuthorId", value: "auth-test-99", type: "string" }
  ],
  item: [
    {
      name: "00. Health Check & Root",
      item: [
        {
          name: "Server Root / Info",
          request: {
            method: "GET",
            header: [],
            url: { raw: "http://localhost:5000/", protocol: "http", host: ["localhost"], port: "5000", path: [""] }
          }
        },
        {
          name: "Health Check (DB & Uptime)",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/health", host: ["{{baseUrl}}"], path: ["health"] }
          }
        }
      ]
    },
    {
      name: "01. Auth & Users (/api/auth)",
      item: [
        {
          name: "Đăng nhập Admin (Auto Save adminToken)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 200', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "var jsonData = pm.response.json();",
                  "if (jsonData.data && jsonData.data.accessToken) {",
                  "    pm.collectionVariables.set('adminToken', jsonData.data.accessToken);",
                  "    console.log('✅ Đã lưu adminToken vào Collection Variable');",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({ email: "admin@bookbridge.com", password: "Admin@123456" }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/login", host: ["{{baseUrl}}"], path: ["auth", "login"] }
          }
        },
        {
          name: "Đăng nhập Reader (Auto Save readerToken)",
          event: [
            {
              listen: "test",
              script: {
                exec: [
                  "pm.test('Status code is 200', function () {",
                  "    pm.response.to.have.status(200);",
                  "});",
                  "var jsonData = pm.response.json();",
                  "if (jsonData.data && jsonData.data.accessToken) {",
                  "    pm.collectionVariables.set('readerToken', jsonData.data.accessToken);",
                  "    console.log('✅ Đã lưu readerToken vào Collection Variable');",
                  "}"
                ],
                type: "text/javascript"
              }
            }
          ],
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({ email: "reader@bookbridge.com", password: "Reader@123456" }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/login", host: ["{{baseUrl}}"], path: ["auth", "login"] }
          }
        },
        {
          name: "Đăng ký tài khoản mới (Register)",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                username: "newuser_" + Math.floor(Math.random() * 10000),
                email: "newuser_" + Math.floor(Math.random() * 10000) + "@test.com",
                password: "Password@123",
                fullName: "Người Dùng Mới"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/register", host: ["{{baseUrl}}"], path: ["auth", "register"] }
          }
        },
        {
          name: "Xem thông tin cá nhân (/me)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/auth/me", host: ["{{baseUrl}}"], path: ["auth", "me"] }
          }
        },
        {
          name: "Cập nhật hồ sơ (/profile)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                fullName: "Minh Trang - Cập nhật",
                bio: "Yêu thích sách kinh điển và nghiên cứu văn học song ngữ."
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/profile", host: ["{{baseUrl}}"], path: ["auth", "profile"] }
          }
        },
        {
          name: "Đổi mật khẩu (/change-password)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                currentPassword: "Reader@123456",
                newPassword: "Reader@123456"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/auth/change-password", host: ["{{baseUrl}}"], path: ["auth", "change-password"] }
          }
        }
      ]
    },
    {
      name: "02. Books & Catalog (/api/books)",
      item: [
        {
          name: "Lấy danh sách sách (Phân trang & Lọc)",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{baseUrl}}/books?page=1&limit=8&genre=Fiction&sort=rating_desc",
              host: ["{{baseUrl}}"],
              path: ["books"],
              query: [
                { key: "page", value: "1" },
                { key: "limit", value: "8" },
                { key: "genre", value: "Fiction" },
                { key: "sort", value: "rating_desc" }
              ]
            }
          }
        },
        {
          name: "Lấy sách nổi bật (Featured Books)",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/books/featured", host: ["{{baseUrl}}"], path: ["books", "featured"] }
          }
        },
        {
          name: "Tìm kiếm sách nhanh (Search autocomplete)",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{baseUrl}}/books/search?q=gatsby",
              host: ["{{baseUrl}}"],
              path: ["books", "search"],
              query: [{ key: "q", value: "gatsby" }]
            }
          }
        },
        {
          name: "Lấy danh mục các bộ lọc (Filters: Genres, Languages...)",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/books/filters", host: ["{{baseUrl}}"], path: ["books", "filters"] }
          }
        },
        {
          name: "Chi tiết sách theo ID kèm sách liên quan",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/books/{{bookId}}", host: ["{{baseUrl}}"], path: ["books", "{{bookId}}"] }
          }
        }
      ]
    },
    {
      name: "03. Authors (/api/authors)",
      item: [
        {
          name: "Danh sách tác giả (Phân trang)",
          request: {
            method: "GET",
            header: [],
            url: {
              raw: "{{baseUrl}}/authors?page=1&limit=6",
              host: ["{{baseUrl}}"],
              path: ["authors"],
              query: [{ key: "page", value: "1" }, { key: "limit", value: "6" }]
            }
          }
        },
        {
          name: "Chi tiết tác giả & Danh sách tác phẩm",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/authors/{{authorId}}", host: ["{{baseUrl}}"], path: ["authors", "{{authorId}}"] }
          }
        }
      ]
    },
    {
      name: "04. Collections & Gallery",
      item: [
        {
          name: "Danh sách 4 Bộ sưu tập",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/collections", host: ["{{baseUrl}}"], path: ["collections"] }
          }
        },
        {
          name: "Chi tiết bộ sưu tập kèm danh sách sách",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/collections/{{collectionId}}", host: ["{{baseUrl}}"], path: ["collections", "{{collectionId}}"] }
          }
        },
        {
          name: "Thư viện ảnh nghệ thuật (Gallery)",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/gallery", host: ["{{baseUrl}}"], path: ["gallery"] }
          }
        },
        {
          name: "Chi tiết ảnh trong Gallery",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/gallery/{{galleryId}}", host: ["{{baseUrl}}"], path: ["gallery", "{{galleryId}}"] }
          }
        }
      ]
    },
    {
      name: "05. Reading Tracker & Favorites & Reviews",
      item: [
        {
          name: "Lấy danh sách tiến độ đọc của User",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/tracker", host: ["{{baseUrl}}"], path: ["tracker"] }
          }
        },
        {
          name: "Thống kê đọc sách cá nhân (Stats)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/tracker/stats", host: ["{{baseUrl}}"], path: ["tracker", "stats"] }
          }
        },
        {
          name: "Thêm / Cập nhật tiến độ đọc 1 cuốn sách",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                currentPage: 180,
                totalPages: 328,
                status: "Reading",
                notes: "Cuốn sách tuyệt vời, sắp hoàn thành!"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/tracker/{{bookId}}", host: ["{{baseUrl}}"], path: ["tracker", "{{bookId}}"] }
          }
        },
        {
          name: "Lấy danh sách sách Yêu thích (Favorites)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/favorites", host: ["{{baseUrl}}"], path: ["favorites"] }
          }
        },
        {
          name: "Kiểm tra trạng thái Yêu thích (Check Bookmark)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/favorites/{{bookId}}/check", host: ["{{baseUrl}}"], path: ["favorites", "{{bookId}}", "check"] }
          }
        },
        {
          name: "Bật / Tắt Yêu thích (Toggle Bookmark)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "POST",
            header: [],
            url: { raw: "{{baseUrl}}/favorites/{{bookId}}", host: ["{{baseUrl}}"], path: ["favorites", "{{bookId}}"] }
          }
        },
        {
          name: "Xem danh sách đánh giá của sách (Reviews)",
          request: {
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/reviews/book/{{bookId}}", host: ["{{baseUrl}}"], path: ["reviews", "book", "{{bookId}}"] }
          }
        },
        {
          name: "Đăng đánh giá nhận xét sách",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{readerToken}}", type: "string" }] },
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                rating: 5,
                comment: "Tác phẩm kinh điển vượt thời gian, rất đáng để đọc đi đọc lại."
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/reviews/book/{{bookId}}", host: ["{{baseUrl}}"], path: ["reviews", "book", "{{bookId}}"] }
          }
        }
      ]
    },
    {
      name: "06. Contact (/api/contact)",
      item: [
        {
          name: "Gửi tin nhắn liên hệ (Reader Inquiries)",
          request: {
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                name: "Nguyễn Văn Test",
                email: "test.contact@example.com",
                subject: "Góp ý về tính năng đọc sách song ngữ",
                message: "Dự án BookBridge giao diện rất đẹp và trải nghiệm mượt mà!"
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/contact", host: ["{{baseUrl}}"], path: ["contact"] }
          }
        }
      ]
    },
    {
      name: "07. Admin Panel (/api/admin)",
      item: [
        {
          name: "Thống kê Dashboard tổng quan",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/admin/stats", host: ["{{baseUrl}}"], path: ["admin", "stats"] }
          }
        },
        {
          name: "Quản lý Người dùng (Danh sách User)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: {
              raw: "{{baseUrl}}/admin/users?page=1&limit=10",
              host: ["{{baseUrl}}"],
              path: ["admin", "users"],
              query: [{ key: "page", value: "1" }, { key: "limit", value: "10" }]
            }
          }
        },
        {
          name: "Thêm sách mới (Create Book)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                _id: "bk-postman-test",
                title: "Cuốn Sách Thử Nghiệm Postman",
                authorId: "auth-01",
                language: "English",
                genre: "Fiction",
                readingLevel: "Intermediate",
                period: "Modern",
                publicationYear: 2026,
                pageCount: 350,
                coverImage: "/images/books/placeholder.jpg",
                synopsis: "Một cuốn sách thử nghiệm tạo tự động qua Postman test suite.",
                themes: ["Technology", "Adventure"],
                targetAudience: "Young Adults",
                rating: 4.8,
                isFeatured: false
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/admin/books", host: ["{{baseUrl}}"], path: ["admin", "books"] }
          }
        },
        {
          name: "Cập nhật sách (Update Book)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "PUT",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                title: "Cuốn Sách Thử Nghiệm (Đã Sửa)",
                pageCount: 360
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/admin/books/bk-postman-test", host: ["{{baseUrl}}"], path: ["admin", "books", "bk-postman-test"] }
          }
        },
        {
          name: "Xóa sách thử nghiệm (Delete Book)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "DELETE",
            header: [],
            url: { raw: "{{baseUrl}}/admin/books/bk-postman-test", host: ["{{baseUrl}}"], path: ["admin", "books", "bk-postman-test"] }
          }
        },
        {
          name: "Thêm tác giả mới (Create Author)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "POST",
            header: [{ key: "Content-Type", value: "application/json" }],
            body: {
              mode: "raw",
              raw: JSON.stringify({
                _id: "auth-postman-test",
                name: "Tác Giả Thử Nghiệm",
                nationality: "Việt Nam",
                specialization: "Tiểu thuyết hiện đại",
                bio: "Tác giả thử nghiệm được khởi tạo qua Postman.",
                notableThemes: ["Đổi mới", "Công nghệ"]
              }, null, 2)
            },
            url: { raw: "{{baseUrl}}/admin/authors", host: ["{{baseUrl}}"], path: ["admin", "authors"] }
          }
        },
        {
          name: "Xóa tác giả thử nghiệm (Delete Author)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "DELETE",
            header: [],
            url: { raw: "{{baseUrl}}/admin/authors/auth-postman-test", host: ["{{baseUrl}}"], path: ["admin", "authors", "auth-postman-test"] }
          }
        },
        {
          name: "Danh sách tin nhắn liên hệ (Admin Contacts)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: { raw: "{{baseUrl}}/admin/contacts", host: ["{{baseUrl}}"], path: ["admin", "contacts"] }
          }
        },
        {
          name: "Xem lịch sử thao tác quản trị (Audit Logs)",
          request: {
            auth: { type: "bearer", bearer: [{ key: "token", value: "{{adminToken}}", type: "string" }] },
            method: "GET",
            header: [],
            url: {
              raw: "{{baseUrl}}/admin/logs?page=1&limit=15",
              host: ["{{baseUrl}}"],
              path: ["admin", "logs"],
              query: [{ key: "page", value: "1" }, { key: "limit", value: "15" }]
            }
          }
        }
      ]
    }
  ]
};

const outputDir = path.resolve('postman/collections');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'BookBridge_API_Collection.json');
fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2), 'utf-8');

// Copy thêm 1 bản ở thư mục postman gốc để dễ thấy
fs.writeFileSync(path.resolve('postman/BookBridge_API_Collection.json'), JSON.stringify(collection, null, 2), 'utf-8');

console.log('✅ Đã tạo thành công Postman Collection tại:');
console.log('   - ' + outputPath);
console.log('   - ' + path.resolve('postman/BookBridge_API_Collection.json'));
