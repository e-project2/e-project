# Stitch UI/UX Requirements Specification
## Dự án: BookBridge — Interactive Book Discovery & Reading Management Platform

---

## 1. Tổng quan Dự án & Triết lý Thiết kế (Design Philosophy)

### 1.1 Mục tiêu dự án
**BookBridge** là nền tảng web tương tác khám phá sách đa ngôn ngữ và quản lý kế hoạch đọc sách cá nhân (Reading Organisation). Ứng dụng tập trung vào trải nghiệm người dùng tinh tế, thẩm mỹ cao (Editorial / Modern Literary Design), khả năng tìm kiếm thông minh và theo dõi tiến độ đọc cá nhân tiện lợi qua Local Storage.

### 1.2 Design System Tokens (Hệ thống thiết kế chuẩn cho Stitch)
* **Tone & Mood**: Trang nhã, tri thức, ấm áp, hiện đại (Literary Modernism, Glassmorphism nhẹ, thẻ bo góc mềm mại, bóng đổ êm dịu).
* **Bảng màu (Color Palette)**:
  * **Primary (Chủ đạo)**: `#1E293B` (Deep Navy / Slate) kết hợp `#3B82F6` (Electric Accent Blue) hoặc `#6366F1` (Indigo).
  * **Secondary / Accent**: `#D97706` (Warm Amber / Gold — đại diện cho đánh dấu sách & thư viện tri thức), `#F59E0B`.
  * **Neutral & Surface**:
    * Light Theme: Surface `#F8FAFC`, Card Background `#FFFFFF`, Text `#0F172A`, Subtext `#64748B`, Border `#E2E8F0`.
    * Dark Theme (Tùy chọn): Surface `#0F172A`, Card `#1E293B`, Border `#334155`.
  * **Semantic Colors**: Success `#10B981`, Warning `#F59E0B`, Danger `#EF4444`, Info `#0EA5E9`.
* **Typography**:
  * Serif hiển thị tiêu đề (Editorial & sang trọng): `Playfair Display` hoặc `Merriweather`.
  * Sans-Serif cho nội dung, nút bấm, UI label: `Inter` hoặc `Plus Jakarta Sans`.
* **Border Radius**: Cards & Panels `12px` - `16px`; Buttons & Badges `8px` - `9999px` (Pill style).
* **Elevation & Shadow**: Shadow tinh tế nhiều lớp (`0 4px 20px -2px rgba(0, 0, 0, 0.05)`, hover `0 10px 25px -5px rgba(0, 0, 0, 0.1)`).

---

## 2. Kiến trúc Màn hình (Screen Architecture & Sitemap)

BookBridge bao gồm **10 màn hình chính** và **3 thành phần UI dùng chung (Global Modals / Overlays)**:

| STT | Tên Màn hình (Screen Name) | Route / Identifier | Mục đích chính |
| :-- | :------------------------- | :----------------- | :------------- |
| **01** | **Home & Landing Page** | `/` (`home-page`) | Giới thiệu nền tảng, sách nổi bật, bộ sưu tập, thanh tìm kiếm nhanh |
| **02** | **Books Directory & Search** | `/books` (`books-directory`) | Danh mục toàn bộ sách (>= 20 bản ghi), lưới thẻ sách, bộ lọc đa năng |
| **03** | **Book Details Page** | `/books/:id` (`book-details`) | Chi tiết từng cuốn sách, tác giả, nội dung tóm tắt, sách liên quan, nút thêm vào danh sách |
| **04** | **Author Profile Page** | `/authors/:id` (`author-profile`) | Hồ sơ tác giả, tiểu sử, phong cách sáng tác, danh sách tác phẩm liên kết |
| **05** | **Language & Genre Explorer** | `/explore` (`explorer-page`) | Khám phá sách trực quan theo ngôn ngữ và thể loại |
| **06** | **Featured Collections** | `/collections` (`collections-page`) | Bộ sưu tập chọn lọc (Kinh điển, Đọc nhanh, Đương đại, Người mới bắt đầu) |
| **07** | **Interactive Book Gallery** | `/gallery` (`gallery-page`) | Phòng trưng bày bìa sách tương tác kèm Lightbox Fullscreen |
| **08** | **My Library & Reading Tracker** | `/my-library` (`my-library-page`) | Quản lý sách đã lưu (Bookmarks), trạng thái (To Read, Reading, Completed), theo dõi tiến độ trang |
| **09** | **About BookBridge** | `/about` (`about-page`) | Giới thiệu sứ mệnh dự án, hướng dẫn sử dụng, nguồn dữ liệu & bản quyền |
| **10** | **Contact Us Page** | `/contact` (`contact-page`) | Form liên hệ & phản hồi kèm kiểm tra dữ liệu phía Client (Demo submission) |
| **—** | **Global Navigation & Footer** | Toàn bộ ứng dụng | Header cố định, Menu điều hướng, Tìm kiếm nhanh, Mobile Drawer, Footer |
| **—** | **Lightbox Preview Modal** | Kích hoạt từ Gallery | Xem ảnh phóng to, điều hướng Previous / Next, thoát bằng phím ESC |
| **—** | **Update Reading Progress Modal** | Kích hoạt từ My Library / Detail | Modal cập nhật số trang đã đọc, kiểm tra hợp lệ và lưu LocalStorage |

---

## 3. Đặc tả Chi tiết Từng Màn hình (Screen Specifications)

### Màn hình 1: Home & Landing Page (`home-page`)
* **Mục tiêu**: Gây ấn tượng thị giác, định vị thương hiệu BookBridge, điều hướng nhanh đến thư mục sách và chức năng cốt lõi.
* **Các Section UI**:
  1. **Hero Section**:
     * Tiêu đề chính (H1) đậm tính văn học: *"Bridge Worlds, Discover Voices Through Books"*.
     * Mô tả giá trị cốt lõi của BookBridge (sách đa ngôn ngữ, cầu nối văn hóa).
     * Ô tìm kiếm nổi bật (Prominent Search Bar) hỗ trợ gõ tên sách, từ khóa hoặc ngôn ngữ + nút bấm "Explore Now".
     * Nút Call-to-Action (CTA): `Browse All Books` và `Start Reading List`.
     * Hình ảnh đồ họa/bìa sách 3D nổi bật tạo chiều sâu (Visual Identity).
  2. **Platform Value & Features Highlight**:
     * 3-4 card tính năng: "Multi-Language Discovery", "Smart Curated Lists", "Zero-friction Reading Tracker (Local Storage)".
  3. **Featured Books Carousel / Showcase**:
     * Hàng thẻ sách trượt ngang hoặc grid 4 cuốn sách tiêu biểu (kèm badge: "Staff Pick", "Trending", "Bilingual").
  4. **Curated Collections Teaser**:
     * 4 ô card lớn đại diện cho các bộ sưu tập: Classics, Short Reads, Contemporary, Beginner.
  5. **Quick Language Pill Selector**:
     * Thanh chọn nhanh các ngôn ngữ phổ biến (English, Vietnamese, French, Japanese, Spanish, v.v.).
* **Yêu cầu UI/UX**:
  * Chuyển động mượt mà khi hover vào card sách (hiệu ứng nâng card `transform: translateY(-4px)`).
  * Thanh tìm kiếm tại Hero tự động chuyển sang trang `/books` kèm từ khóa đã nhập.

---

### Màn hình 2: Books Directory & Smart Search (`books-directory`)
* **Mục tiêu**: Duyệt và tìm kiếm danh mục ít nhất 20 cuốn sách với bộ lọc đa tiêu chí linh hoạt.
* **Bố cục Layout**:
  * Cột trái (Desktop): **Filter Sidebar** (Bộ lọc thông minh, có thể thu gọn trên Mobile thành Drawer).
  * Khu vực chính: Thanh công cụ (Toolbar hiển thị kết quả, nút Clear-all, nút sắp xếp) + **Book Card Grid** responsive (1 cột Mobile, 2 cột Tablet, 3-4 cột Desktop).
* **Các thành phần UI chi tiết**:
  1. **Bộ lọc thông minh (Smart Filtering)**:
     * **Search Input**: Tìm kiếm không phân biệt hoa thường (Case-insensitive) theo tên sách, từ khóa, ngôn ngữ.
     * **Language Filter**: Checkbox / Dropdown (English, Vietnamese, French, Japanese, etc.).
     * **Genre Filter**: Fiction, Non-Fiction, Sci-Fi, Historical, Romance, Mystery,...
     * **Reading Level Filter**: Beginner, Intermediate, Advanced.
     * **Publication Period Filter**: Trước 1950, 1950-2000, Sau 2000.
     * **Nút "Clear All Filters"**: Xóa mọi tiêu chí lọc đã chọn chỉ với 1 cú click.
  2. **Thanh thống kê & Sắp xếp**:
     * Hiển thị số lượng kết quả: *"Showing X of 20 books"*.
     * Sắp xếp theo: Tên A-Z, Năm xuất bản, Số trang.
  3. **Book Card Component**:
     * Bìa sách sắc nét (tỉ lệ chuẩn 2:3).
     * Tên sách (Title), Tên tác giả (Author - có link đến trang tác giả).
     * Badges: Ngôn ngữ (Language), Thể loại (Genre), Trình độ đọc (Reading Level).
     * Nút Bookmark (Icon trái tim/ribbon để lưu nhanh vào Local Storage).
     * Nút "View Details" mở trang chi tiết sách.
  4. **Trạng thái Trống (No Match State)**:
     * Khi không có kết quả phù hợp: Hiển thị illustration minh họa, thông báo *"No books found matching your criteria"*, kèm nút bấm *"Reset All Filters"*.

---

### Màn hình 3: Book Details Page (`book-details`)
* **Mục tiêu**: Cung cấp toàn bộ thông tin chuyên sâu của một cuốn sách và cho phép thêm sách vào Reading Tracker.
* **Bố cục Layout**: 2 cột chính (Two-column layout):
  * **Cột trái (Book Media & Actions)**:
    * Bìa sách kích thước lớn, độ phân giải cao.
    * Nút hành động chính: **"Add to Reading List"** (kèm dropdown chọn trạng thái: *To Read / Currently Reading / Completed*).
    * Nút "Save to Bookmarks".
    * Thông tin nhanh (Metadata Table): Ngôn ngữ gốc, Năm xuất bản, Số trang (Page Count), Nhà xuất bản, ISBN/Identifier.
  * **Cột phải (Deep Content)**:
    * Breadcrumbs: `Home > Books > [Book Title]`.
    * Tựa đề sách (H1) + Tên tác giả (liên kết sang trang tác giả).
    * Huy hiệu phân loại: Thể loại, Reading Level, Đối tượng phù hợp (Suitable Audience).
    * **Tóm tắt nội dung (Concise Synopsis)**: Đoạn văn súc tích, làm nổi bật cốt truyện và giá trị văn học mà không sao chép nguyên văn sách.
    * **Chủ đề chính (Key Themes)**: Danh sách tag chủ đề (ví dụ: Tình bạn, Triết học, Khám phá bản sắc,...).
  * **Section Phụ bên dưới (Related Books)**:
    * Lưới sách liên quan (Related Books Grid) dựa trên chung tác giả hoặc chung thể loại.
* **Yêu cầu UI/UX**:
  * Nút "Add to Reading List" hiển thị trạng thái động (nếu sách đã được lưu: hiển thị badge "In Your Library: Reading - Page 45/300").
  * Breadcrumb rõ ràng hỗ trợ quay lại danh mục dễ dàng.

---

### Màn hình 4: Author Profiles Page (`author-profile`)
* **Mục tiêu**: Giới thiệu chân dung tác giả, quá trình sáng tác và toàn bộ tác phẩm có mặt trên BookBridge.
* **Các thành phần UI**:
  1. **Author Header / Banner**:
     * Ảnh chân dung tác giả (Avatar chất lượng cao trong khung tròn hoặc bo góc nghệ thuật).
     * Tên tác giả, Quốc tịch, Năm sinh/thời kỳ hoạt động.
     * Chuyên môn & Lĩnh vực sáng tác (Specialisation: ví dụ: Nhà văn Hiện thực phê phán, Tiểu thuyết gia Khoa học viễn tưởng).
  2. **Author Biography**:
     * Đoạn tiểu sử ngắn gọn, xúc tích về bối cảnh xuất thân và hành trình sáng tác.
  3. **Writing Themes & Philosophy**:
     * Thẻ/Tag các chủ đề nổi bật mà tác giả theo đuổi.
  4. **Authored Books Showcase**:
     * Lưới thẻ sách (Book Grid) trưng bày toàn bộ tác phẩm của tác giả này có trong hệ thống BookBridge.
* **Yêu cầu UI/UX**:
  * Thẻ sách tại đây có thể mở trực tiếp trang Book Details.

---

### Màn hình 5: Language & Genre Explorer (`explorer-page`)
* **Mục tiêu**: Cung cấp công cụ trực quan để độc giả khám phá sách qua lăng kính ngôn ngữ và thể loại văn học.
* **Các thành phần UI**:
  1. **Visual Language Selector (Bộ chọn ngôn ngữ trực quan)**:
     * Dạng thẻ tương tác (Interactive Cards / Tabs) đại diện cho các ngôn ngữ: Tiếng Việt, English, Français, Español, 日本語, v.v.
     * Mỗi thẻ có cờ / ký hiệu đặc trưng, số lượng sách khả dụng (`X books`), mô tả văn hóa ngắn gọn.
     * Trạng thái đã chọn (Selected State) nổi bật với border màu chủ đạo và badge "Active".
     *(Lưu ý: Không yêu cầu bản đồ số phức tạp hoặc API ngoài, sử dụng visual card selector tinh tế).*
  2. **Genre Filter Bar**:
     * Thanh chọn thể loại dạng chip cuộn ngang.
  3. **Explorer Results Grid**:
     * Hiển thị danh sách các cuốn sách tương ứng với ngôn ngữ và thể loại đang chọn.
     * Nhãn giải thích rõ ràng: *"Exploring Books in Vietnamese — 8 titles found"*.

---

### Màn hình 6: Featured Reading Collections (`collections-page`)
* **Mục tiêu**: Trưng bày các bộ sưu tập sách được biên tập chọn lọc theo chủ đề người đọc quan tâm.
* **Các bộ sưu tập bắt buộc (Curated Collections)**:
  1. **Timeless Classics**: Tuyệt tác kinh điển thế giới.
  2. **Bite-sized / Short Reads**: Sách dưới 200 trang phù hợp đọc nhanh trong tuần.
  3. **Contemporary Fiction**: Tác phẩm đương đại phản ánh nhịp sống hiện đại.
  4. **Beginner Reading Lists**: Sách dễ tiếp cận, ngôn ngữ trong sáng cho người mới bắt đầu.
* **Bố cục UI**:
  * Mỗi bộ sưu tập là một cụm thành phần tái sử dụng (Reusable Component):
    * Header bộ sưu tập: Tên Collection, Icon biểu trưng, Lời giới thiệu ngắn.
    * Hàng thẻ sách (Grid hoặc Horizontal Scroll with smooth snap).
    * Thẻ sách hiển thị bìa, tên, tác giả và nút "Inspect Book".
* **Yêu cầu UI/UX**:
  * Người dùng có thể click vào bất kỳ cuốn sách nào để mở xem Book Details.

---

### Màn hình 7: Interactive Book Gallery & Lightbox (`gallery-page`)
* **Mục tiêu**: Trải nghiệm thị giác với phòng trưng bày bìa sách mỹ thuật, hỗ trợ phóng to và xem thông tin bản quyền hình ảnh.
* **Bố cục & Thành phần**:
  1. **Gallery Grid (Masonry hoặc Equal Ratio Grid)**:
     * Hiển thị các bìa sách chất lượng cao.
     * Khi hover: Hiệu ứng phóng to nhẹ (zoom-in `scale: 1.05`), lớp phủ mờ (overlay) hiện tên sách, tác giả và icon kính lúp.
  2. **Lightbox View (Modal phóng to toàn màn hình)**:
     * Ảnh bìa sách hiển thị trung tâm, sắc nét.
     * Thanh thông tin dưới ảnh: Tên sách, Tác giả, Chú thích hình ảnh (Caption), Nguồn gốc & Bản quyền ảnh (Image Credits / Asset Acknowledgements).
     * Nút điều hướng: Mũi tên Previous (`<`) và Next (`>`).
     * Nút đóng modal (`X`).
* **Yêu cầu Accessibility & Tương tác**:
  * Hỗ trợ phím bàn phím: Phím `Esc` để đóng Lightbox; Phím mũi tên trái/phải (`ArrowLeft` / `ArrowRight`) để chuyển ảnh.
  * Thuộc tính `alt` đầy đủ và có ý nghĩa cho mọi ảnh bìa.

---

### Màn hình 8: My Library & Reading Tracker (`my-library-page`)
* **Mục tiêu**: Quản lý sách yêu thích (Bookmarks) và theo dõi tiến độ đọc sách cá nhân không cần đăng nhập (Lưu trữ 100% qua Local Storage).
* **Các thành phần UI**:
  1. **Library Header & Summary Stats**:
     * Thống kê nhanh: Tổng số sách đã lưu, Số sách đang đọc (*Reading*), Đã đọc xong (*Completed*), Dự định đọc (*To Read*).
  2. **Tab chuyển đổi danh mục**:
     * `All Saved Books` | `To Read` | `Reading` | `Completed`.
  3. **Thẻ sách trong Library (Interactive Management Card)**:
     * Thông tin sách: Bìa, Tên sách, Tác giả, Tổng số trang (ví dụ: `320 pages`).
     * **Reading Status Selector**: Dropdown chọn nhanh giữa `To Read`, `Reading`, `Completed`.
     * **Thanh tiến độ đọc (Progress Bar & Tracker)**:
       * Hiển thị số trang đã đọc: `160 / 320 pages (50%)`.
       * Nút bấm `Update Progress` mở popup nhập số trang hiện tại.
       * Tự động chuyển trạng thái thành `Completed` khi số trang đọc = tổng số trang.
       * Nút `Clear Progress` để đưa tiến độ về 0.
     * **Nút Xóa (Remove / Unsave)**: Icon thùng rác hoặc nút "Remove from Library" (xóa khỏi Local Storage ngay lập tức, không để trùng lặp).
  4. **Trạng thái Trống (Empty State)**:
     * Khi chưa có cuốn sách nào được lưu: Hiển thị minh họa rỗng, thông báo *"Your reading list is empty. Start exploring and bookmark your favorite titles!"*, kèm nút CTA *"Discover Books Now"*.
  5. **Validation & Error Handling**:
     * Kiểm tra số trang nhập vào: Không được là số âm, không được vượt quá tổng số trang của cuốn sách (`page <= totalPages`).
     * Thông báo lỗi rõ ràng nếu nhập sai hoặc nếu bộ nhớ trình duyệt gặp sự cố.

---

### Màn hình 9: About BookBridge (`about-page`)
* **Mục tiêu**: Giới thiệu mục đích, sứ mệnh dự án, cách sử dụng nền tảng và minh bạch nguồn tư liệu.
* **Các Section UI**:
  1. **Our Mission & Scope**:
     * Giới thiệu BookBridge là cây cầu kết nối văn hóa và độc giả qua tác phẩm văn học đa ngôn ngữ.
  2. **How to Use BookBridge**:
     * Hướng dẫn 3 bước: 1. Khám phá & Lọc sách -> 2. Khám phá Tác giả & Ngôn ngữ -> 3. Lưu trữ & Theo dõi tiến độ đọc cá nhân.
  3. **Sample Data & Content Categories**:
     * Thuyết minh về tập dữ liệu mẫu (Sample Dataset gồm 20+ đầu sách được chọn lọc kỹ lưỡng).
  4. **Source & Asset Acknowledgements**:
     * Lời cảm ơn và ghi nhận bản quyền hình ảnh, tư liệu (Unsplash, Open Library, Google Books, Project Gutenberg).

---

### Màn hình 10: Contact Us Page (`contact-page`)
* **Mục tiêu**: Cung cấp biểu mẫu gửi phản hồi của độc giả kèm kiểm tra tính hợp lệ dữ liệu.
* **Các thành phần UI**:
  1. **Contact Information Panel**:
     * Địa chỉ giả định, Email hỗ trợ (`support@bookbridge.local`), Giờ làm việc, Liên kết mạng xã hội.
  2. **Contact Form**:
     * Trường `Full Name` (Bắt buộc).
     * Trường `Email Address` (Bắt buộc, kiểm tra đúng định dạng regex email).
     * Trường `Subject / Topic` (Dropdown chọn: Góp ý sách, Báo lỗi, Hợp tác).
     * Trường `Message` (Textarea, bắt buộc, tối thiểu 10 ký tự).
     * Nút bấm `Send Message`.
  3. **Client-side Validation & Feedback**:
     * Hiển thị thông báo lỗi ngay dưới từng ô input nếu bỏ trống hoặc email sai định dạng.
     * **Demonstration Confirmation Banner**: Sau khi bấm gửi hợp lệ, hiển thị Banner/Modal xác nhận thành công mang tính chất thử nghiệm: *"Thank you! Your feedback has been simulated and validated successfully. (Note: This is a frontend demonstration; no email has been dispatched)."* (Tuyệt đối không tuyên bố email thật đã được gửi).

---

## 4. Thành phần Dùng chung & Trải nghiệm Toàn cục (Common UI & Global Layout)

### 4.1 Header & Navigation Bar
* **Thành phần**:
  * Logo BookBridge (Icon cuốn sách cách điệu + Tên thương hiệu phong cách typography sang trọng).
  * Menu điều hướng chính: `Home`, `Directory`, `Explorer`, `Collections`, `Gallery`, `My Library`, `About`, `Contact`.
  * Huy hiệu đếm số sách đã lưu trên tab `My Library` (Badge hiển thị số lượng, cập nhật theo thời gian thực từ LocalStorage).
  * Nút chuyển giao diện Dark / Light Mode.
  * **Mobile Navigation**: Nút Hamburger Menu có icon đóng/mở rõ ràng, khi bấm trượt ra Drawer Menu mượt mà, hỗ trợ đóng khi nhấn ra ngoài hoặc nhấn phím ESC.

### 4.2 Footer
* Tóm tắt thương hiệu BookBridge, Bản quyền © 2026 BookBridge.
* Quick Links đến các trang chính.
* Disclaimer: Nền tảng học thuật / Demo dự án eProject.

### 4.3 Breadcrumbs & Return Links
* Mọi trang con (Book Details, Author Profile, v.v.) đều có Breadcrumb hoặc nút `← Back to Directory` rõ ràng.

### 4.4 Accessibility (Khả năng tiếp cận theo chuẩn WCAG 2.1 AA)
* **Keyboard Navigation**: Người dùng có thể điều hướng toàn bộ qua phím `Tab`, `Enter`, `Space`, `Arrow Keys`, `Esc`.
* **Focus States**: Vòng tròn chỉ báo tiêu điểm (Visible Focus Ring) nổi bật trên mọi nút bấm, link và input (`outline: 2px solid #3B82F6; outline-offset: 2px`).
* **Screen Reader Support**: Thuộc tính `aria-label`, `aria-expanded`, `role="dialog"` đầy đủ trên menu mobile, modal và nút chức năng.

---

## 5. Cấu trúc Dữ liệu & Lưu trữ Trình duyệt (Local Storage Schema)

Ứng dụng không yêu cầu Backend, mọi dữ liệu tương tác người dùng được quản lý an toàn và bền bỉ qua Browser Local Storage:

```typescript
// Khóa lưu trữ 1: Sách đã lưu vào thư viện (Bookmarks / Reading List)
// Key: "bookbridge_saved_books"
interface SavedBookItem {
  id: string;              // Mã định danh duy nhất của cuốn sách (vd: "book-001")
  savedAt: string;         // ISO Date string
  readingStatus: 'TO_READ' | 'READING' | 'COMPLETED'; // Trạng thái đọc
  currentPage: number;     // Số trang hiện tại người dùng đã đọc
  totalPages: number;      // Tổng số trang của cuốn sách
  lastUpdated: string;     // ISO Date string
}

// Khóa lưu trữ 2: Cài đặt giao diện
// Key: "bookbridge_theme" -> "light" | "dark"
```

**Quy tắc xử lý dữ liệu**:
* Dữ liệu giữ nguyên sau khi người dùng F5 hoặc tắt trình duyệt.
* Không cho phép trùng lặp mã `id` khi lưu sách.
* Khi xóa sách: Loại bỏ chính xác phần tử và cập nhật lại badge đếm số lượng trên Header.
* Xử lý trường hợp bộ nhớ đầy hoặc Private Mode của trình duyệt với thông báo thân thiện.

---

## 6. Danh mục 20 Cuốn sách Mẫu (Sample Dataset Requirements)

Hệ thống cung cấp sẵn tối thiểu **20 bản ghi sách độc lập** với cấu trúc dữ liệu chuẩn hóa:
* **Mã ID ổn định**: `book-001` đến `book-020`.
* **Đa dạng ngôn ngữ**: Tiếng Việt (Truyện Kiều, Dế Mèn Phiêu Lưu Ký, Nỗi Buồn Chiến Tranh,...), Tiếng Anh (1984, To Kill a Mockingbird, The Great Gatsby,...), Tiếng Pháp (Le Petit Prince,...), Tiếng Nhật (Norwegian Wood,...), Tiếng Tây Ban Nha (One Hundred Years of Solitude,...).
* **Đầy đủ trường thông tin**:
  * `id`, `title`, `authorId`, `authorName`, `language`, `genre`, `readingLevel`, `publishedYear`, `pageCount`, `coverImage`, `synopsis`, `themes` (array), `suitableAudience`.

---

## 7. Mẫu Prompt Chuẩn hóa dành cho Stitch (Stitch Screen Prompts)

Dưới đây là các prompt mẫu tối ưu để nạp vào công cụ Stitch (hoặc Stitch MCP) nhằm sinh giao diện tự động cho từng màn hình:

### Prompt cho Màn hình Home:
> *"Design a modern, elegant, literary-inspired Home Page for 'BookBridge' - an interactive multi-language book discovery web application. The design should feature a deep navy and warm amber color palette, sophisticated typography (serif headings like Playfair Display and clean sans-serif body). Include a sticky navbar with logo and navigation links, an impactful hero section with an inspiring literary headline, prominent search bar with language/genre pills, quick CTA buttons ('Browse Books', 'My Library'), a 'Why BookBridge' 3-card feature grid, a curated carousel of featured books with badges, a 4-card showcase of reading collections, and a polished footer. Ensure high visual hierarchy, clean card shadows, and responsive layout."*

### Prompt cho Màn hình Books Directory & Smart Search:
> *"Design an intuitive and responsive Books Directory & Search page for BookBridge. Layout includes a left collapsible sidebar with case-insensitive search input, multi-select checkboxes for Language, Genre, Reading Level, and Publication Period, along with a prominent 'Clear All Filters' button. Main area displays search result counter ('Showing 20 of 20 books'), sorting dropdown, and a responsive 4-column grid of book cards. Each card displays high-resolution cover image, book title, author, badges for language and genre, a heart bookmark icon, and 'View Details' button. Include an elegant empty state design for when no books match filters."*

### Prompt cho Màn hình Book Details:
> *"Design a comprehensive Book Details page for BookBridge. Top breadcrumb navigation ('Home > Books > Title'). Two-column layout: Left column features a large high-resolution book cover, an 'Add to Reading List' status selector button (To Read, Reading, Completed), and quick metadata table (Language, Pages, Year, Publisher). Right column contains the book title, clickable author name, audience and genre tags, a concise and beautifully formatted literary synopsis, and bulleted themes. Bottom section features a 'Related Books' responsive carousel. Clean literary aesthetic, elegant typography, warm neutral background."*

### Prompt cho Màn hình My Library & Reading Tracker:
> *"Design a functional and aesthetically pleasing 'My Library & Reading Tracker' page for BookBridge. Top section features user reading statistics (Total Saved, Reading, Completed, To Read). Tab bar switches between reading states. List/Grid of saved book cards showing cover, title, author, a dropdown to switch reading status, an interactive progress bar showing pages read out of total pages, an 'Update Progress' button that opens a page input modal, a 'Clear Progress' link, and a delete button to remove book from library. Include a charming empty state illustration for when no books are saved yet."*

### Prompt cho Màn hình Contact Us:
> *"Design a clean, reassuring Contact Us page for BookBridge. Split layout: Left column shows contact details, office hours, and helpful FAQs. Right column shows a glassmorphism contact card with fields: Full Name, Email Address, Subject Dropdown, and Message textarea with required indicators. Include real-time validation error hints. Show a mock success state banner stating 'Demo Submission Successful - Message validated (Demo mode: no actual email sent)'. Professional, elegant, and accessible."*

---

## 8. Bảng Tiêu chí Kiểm thử & Nghiệm thu Frontend (QA Checklist)

* [ ] Đủ 10 màn hình và các modal theo đúng cấu trúc.
* [ ] Danh mục sách chứa đủ tối thiểu 20 bản ghi dữ liệu mẫu với ID ổn định.
* [ ] Tìm kiếm không phân biệt hoa thường và hoạt động kết hợp với các bộ lọc thể loại, ngôn ngữ.
* [ ] Nút Clear All đưa toàn bộ bộ lọc về mặc định và cập nhật lại danh sách tức thì.
* [ ] Tính năng Bookmark và Reading Tracker lưu chính xác vào `localStorage`, không mất dữ liệu khi F5.
* [ ] Xác thực số trang đọc: Không cho phép nhập số âm hoặc số trang lớn hơn tổng số trang của sách.
* [ ] Lightbox ảnh hoạt động trơn tru, chuyển ảnh bằng mũi tên và đóng bằng phím ESC.
* [ ] Biểu mẫu liên hệ kiểm tra hợp lệ email và hiển thị thông báo demo chuẩn xác.
* [ ] Responsive hoàn hảo trên Mobile (375px), Tablet (768px), và Desktop (1200px+).
* [ ] Đạt chuẩn tương phản màu sắc và hiển thị Focus Ring rõ ràng khi duyệt bằng phím Tab.
