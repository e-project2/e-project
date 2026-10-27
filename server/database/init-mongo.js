/**
 * ==============================================================================
 * BOOKBRIDGE MONGODB INITIALIZATION SCRIPT
 * File: init-mongo.js
 * Sử dụng:
 *   - Cách 1: Chạy qua mongosh CLI:
 *       mongosh "mongodb://localhost:27017/bookbridge_db" init-mongo.js
 *   - Cách 2: Mở MongoDB Compass -> Click "_MONGOSH" ở dưới cùng -> Dán nội dung file này vào và Enter.
 *   - Cách 3: Tự động chạy khi khởi động Docker container (đặt trong /docker-entrypoint-initdb.d/)
 * ==============================================================================
 */

// 1. Chuyển sang database 'bookbridge_db'
const dbName = 'bookbridge_db';
db = db.getSiblingDB(dbName);
print(`\n>>> [1/5] Đang khởi tạo Database: ${dbName}...`);

// 2. Dọn dẹp dữ liệu cũ (Clean slate)
print('>>> [2/5] Dọn dẹp collections cũ nếu tồn tại...');
db.books.drop();
db.authors.drop();
db.collections.drop();
db.gallery_items.drop();
db.reading_progress.drop();
db.favorites.drop();

// 3. Thiết lập Collection Schema Validation (Chuẩn doanh nghiệp)
print('>>> [3/5] Thiết lập Schema Validation cho collections...');

// 3.1. Collection: authors
db.createCollection('authors', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['_id', 'name', 'nationality', 'bio'],
      properties: {
        _id: { bsonType: 'string', description: 'ID định dạng chuỗi auth-xx' },
        name: { bsonType: 'string', description: 'Tên tác giả bắt buộc' },
        avatar: { bsonType: 'string' },
        nationality: { bsonType: 'string', description: 'Quốc tịch tác giả' },
        specialization: { bsonType: 'string' },
        bio: { bsonType: 'string' },
        notableThemes: {
          bsonType: 'array',
          items: { bsonType: 'string' }
        }
      }
    }
  }
});

// 3.2. Collection: books
db.createCollection('books', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['_id', 'title', 'authorId', 'language', 'genre', 'readingLevel', 'publicationYear', 'pageCount', 'synopsis'],
      properties: {
        _id: { bsonType: 'string', description: 'ID định dạng chuỗi bk-xx' },
        title: { bsonType: 'string' },
        authorId: { bsonType: 'string' },
        isbn: { bsonType: 'string' },
        language: { bsonType: 'string' },
        genre: { bsonType: 'string' },
        readingLevel: { enum: ['Beginner', 'Intermediate', 'Advanced'] },
        period: { enum: ['Classic', 'Modern', 'Contemporary'] },
        publicationYear: { bsonType: 'int' },
        pageCount: { bsonType: 'int', minimum: 1 },
        coverImage: { bsonType: 'string' },
        synopsis: { bsonType: 'string' },
        themes: { bsonType: 'array', items: { bsonType: 'string' } },
        targetAudience: { bsonType: 'string' },
        rating: { bsonType: ['double', 'int'] },
        isFeatured: { bsonType: 'bool' }
      }
    }
  }
});

// 3.3. Collection: collections
db.createCollection('collections');

// 3.4. Collection: gallery_items
db.createCollection('gallery_items');

// 3.5. Collection: reading_progress
db.createCollection('reading_progress');

// 3.6. Collection: favorites
db.createCollection('favorites');

// 4. Tạo Indexes tối ưu hóa truy vấn
print('>>> [4/5] Đang tạo Indexes tối ưu hóa truy vấn...');

// Indexes cho books
db.books.createIndex({ title: 'text', synopsis: 'text', themes: 'text' }, { name: 'BookTextSearchIndex' });
db.books.createIndex({ genre: 1, language: 1, readingLevel: 1 }, { name: 'BookCompoundFilterIndex' });
db.books.createIndex({ authorId: 1 }, { name: 'BookAuthorIndex' });
db.books.createIndex({ isFeatured: 1 }, { name: 'BookFeaturedIndex' });
db.books.createIndex({ isbn: 1 }, { unique: true, sparse: true });

// Indexes cho authors
db.authors.createIndex({ name: 'text', specialization: 'text' }, { name: 'AuthorTextSearchIndex' });

// Indexes cho reading_progress & favorites
db.reading_progress.createIndex({ bookId: 1 }, { unique: true });
db.favorites.createIndex({ bookId: 1 }, { unique: true });
db.gallery_items.createIndex({ bookId: 1 });

// 5. Nạp dữ liệu hạt giống (Seed Data)
print('>>> [5/5] Đang nạp toàn bộ dữ liệu mẫu phong phú...');

// 5.1. Nạp Authors
const authorsData = [
  {
    _id: "auth-01",
    name: "George Orwell",
    avatar: "/images/authors/george-orwell.jpg",
    nationality: "British",
    specialization: "Dystopian Fiction & Political Commentary",
    bio: "Eric Arthur Blair (George Orwell) là tiểu thuyết gia, nhà viết tiểu luận người Anh nổi tiếng với các tác phẩm phản ánh áp bức xã hội và chuyên chế.",
    notableThemes: ["Totalitarianism", "Surveillance", "Social Injustice", "Individual Freedom"]
  },
  {
    _id: "auth-02",
    name: "Antoine de Saint-Exupéry",
    avatar: "/images/authors/antoine-de-saint-exupery.jpg",
    nationality: "French",
    specialization: "Philosophical Allegory & Aviation Literature",
    bio: "Nhà văn, phi công tiên phong người Pháp. Tác phẩm của ông kết hợp sâu sắc giữa triết lý nhân sinh, tình yêu thương và sự thuần khiết.",
    notableThemes: ["Innocence", "Humanity", "Love", "Friendship", "Responsibility"]
  },
  {
    _id: "auth-03",
    name: "Haruki Murakami",
    avatar: "/images/authors/haruki-murakami.jpg",
    nationality: "Japanese",
    specialization: "Magical Realism & Contemporary Fiction",
    bio: "Nhà văn đương đại hàng đầu Nhật Bản với lối viết siêu thực huyền ảo, khai thác nỗi cô đơn và thế giới song song ẩn sau đô thị.",
    notableThemes: ["Loneliness", "Memory", "Magical Realism", "Subconscious", "Music"]
  },
  {
    _id: "auth-04",
    name: "Franz Kafka",
    avatar: "/images/authors/franz-kafka.jpg",
    nationality: "German",
    specialization: "Existential Fiction & Absurdist Literature",
    bio: "Tiểu thuyết gia vĩ đại thế kỷ 20, nổi tiếng với các tác phẩm khắc họa sự ngột ngạt của bộ máy quan liêu và sự phi lý của đời sống.",
    notableThemes: ["Alienation", "Bureaucracy", "Existential Dread", "Identity Crisis"]
  },
  {
    _id: "auth-05",
    name: "Gabriel García Márquez",
    avatar: "/images/authors/gabriel-garcia-marquez.jpg",
    nationality: "Spanish / Colombian",
    specialization: "Magical Realism & Latin American Epic",
    bio: "Nhà văn đoạt giải Nobel Văn học năm 1982, người đưa trường phái Hiện thực huyền ảo (Magic Realism) trở thành hiện tượng toàn cầu.",
    notableThemes: ["Solitude", "Fate", "Family Heritage", "Time Cycles"]
  },
  {
    _id: "auth-06",
    name: "Nam Cao",
    avatar: "/images/authors/nam-cao.jpg",
    nationality: "Vietnamese",
    specialization: "Realistic Social Critique & Psychology",
    bio: "Cây bút hiện thực xuất sắc của văn học Việt Nam trước 1945, với cái nhìn xót xa sâu sắc về bi kịch tha hóa và nỗi đau tinh thần của trí thức nghèo.",
    notableThemes: ["Human Dignity", "Rural Poverty", "Psychological Tragedy", "Empathy"]
  },
  {
    _id: "auth-07",
    name: "Fyodor Dostoevsky",
    avatar: "/images/authors/fyodor-dostoevsky.jpg",
    nationality: "Russian",
    specialization: "Psychological Realism & Philosophical Novel",
    bio: "Bậc thầy tiểu thuyết tâm lý người Nga, khai phá các xung đột đạo đức, đức tin, tội lỗi và sự chuộc tội trong chiều sâu tâm hồn con người.",
    notableThemes: ["Guilt & Redemption", "Moral Philosophy", "Free Will", "Faith vs Reason"]
  },
  {
    _id: "auth-08",
    name: "Albert Camus",
    avatar: "/images/authors/albert-camus.jpg",
    nationality: "French",
    specialization: "Absurdism & Existential Ethics",
    bio: "Nhà triết học và văn hào Pháp đoạt giải Nobel Văn học 1957, đặt nền móng cho Triết học Phi lý và tinh thần phản kháng bất khuất.",
    notableThemes: ["The Absurd", "Revolt", "Freedom", "Morality without God"]
  }
];
db.authors.insertMany(authorsData);
print(`✓ Đã nạp ${db.authors.countDocuments()} bản ghi tác giả (authors).`);

// 5.2. Nạp Books (26 bản ghi chuẩn)
const booksData = [
  {
    _id: "bk-01",
    title: "1984",
    authorId: "auth-01",
    isbn: "978-0451524935",
    language: "English",
    genre: "Dystopian",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1949),
    pageCount: NumberInt(328),
    coverImage: "/images/books/1984.jpg",
    synopsis: "Một kiệt tác phản địa đàng mô tả một xã hội độc tài toàn trị dưới sự giám sát tối cao của Anh Cả (Big Brother).",
    themes: ["Totalitarianism", "Surveillance", "Freedom of Speech"],
    targetAudience: "Young Adults & Adults",
    rating: 4.9,
    isFeatured: true
  },
  {
    _id: "bk-02",
    title: "Animal Farm",
    authorId: "auth-01",
    isbn: "978-0451526342",
    language: "English",
    genre: "Classic",
    readingLevel: "Beginner",
    period: "Modern",
    publicationYear: NumberInt(1945),
    pageCount: NumberInt(140),
    coverImage: "/images/books/animal-farm.jpg",
    synopsis: "Truyện ngụ ngôn chính trị sâu sắc về một cuộc nổi dậy của đàn gia súc trong nông trại nhằm lật đổ người chủ.",
    themes: ["Power Corruption", "Class Struggle", "Propaganda"],
    targetAudience: "All Ages",
    rating: 4.7,
    isFeatured: true
  },
  {
    _id: "bk-03",
    title: "Le Petit Prince (The Little Prince)",
    authorId: "auth-02",
    isbn: "978-0156012195",
    language: "French",
    genre: "Philosophy",
    readingLevel: "Beginner",
    period: "Modern",
    publicationYear: NumberInt(1943),
    pageCount: NumberInt(96),
    coverImage: "/images/books/little-prince.jpg",
    synopsis: "Chuyến du hành liên hành tinh của hoàng tử bé thơ ngây, hé lộ những bài học sâu sắc về bản chất của tình yêu và sự gắn kết.",
    themes: ["Love & Attachment", "Childlike Wonder", "Human Solitude"],
    targetAudience: "Children & Adults",
    rating: 4.95,
    isFeatured: true
  },
  {
    _id: "bk-04",
    title: "Vol de Nuit (Night Flight)",
    authorId: "auth-02",
    isbn: "978-2070360048",
    language: "French",
    genre: "Fiction",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1931),
    pageCount: NumberInt(180),
    coverImage: "/images/books/night-flight.jpg",
    synopsis: "Tác phẩm đoạt giải Prix Femina về những chuyến bay đêm chở bưu phẩm xuyên Nam Mỹ đầy hiểm nguy và lòng quả cảm.",
    themes: ["Duty & Responsibility", "Courage", "Nature vs Man"],
    targetAudience: "Adults",
    rating: 4.4,
    isFeatured: false
  },
  {
    _id: "bk-05",
    title: "Norwegian Wood (Rừng Na Uy)",
    authorId: "auth-03",
    isbn: "978-0375704024",
    language: "Japanese",
    genre: "Fiction",
    readingLevel: "Intermediate",
    period: "Contemporary",
    publicationYear: NumberInt(1987),
    pageCount: NumberInt(296),
    coverImage: "/images/books/norwegian-wood.jpg",
    synopsis: "Hồi ức hoài niệm của Toru Watanabe về tuổi thanh xuân tại Tokyo thập niên 60, những mất mát đau thương và tình yêu.",
    themes: ["Youth & Grief", "Mental Health", "Love & Loss"],
    targetAudience: "Young Adults & Adults",
    rating: 4.6,
    isFeatured: true
  },
  {
    _id: "bk-06",
    title: "Kafka on the Shore (Kafka bên bờ biển)",
    authorId: "auth-03",
    isbn: "978-1400079278",
    language: "Japanese",
    genre: "Fiction",
    readingLevel: "Advanced",
    period: "Contemporary",
    publicationYear: NumberInt(2002),
    pageCount: NumberInt(505),
    coverImage: "/images/books/kafka-shore.jpg",
    synopsis: "Hai tuyến truyện song song kỳ ảo đan xen: Cậu bé Kafka Tamura bỏ trốn và cụ già Nakata có năng lực trò chuyện với mèo.",
    themes: ["Fate & Free Will", "Magical Realism", "Subconscious"],
    targetAudience: "Adults",
    rating: 4.75,
    isFeatured: true
  },
  {
    _id: "bk-07",
    title: "Die Verwandlung (The Metamorphosis)",
    authorId: "auth-04",
    isbn: "978-0553213690",
    language: "German",
    genre: "Classic",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1915),
    pageCount: NumberInt(120),
    coverImage: "/images/books/metamorphosis.jpg",
    synopsis: "Gregor Samsa thức dậy và thấy mình biến thành một con côn trùng khổng lồ gớm ghiếc, kéo theo sự xa lánh lạnh lùng từ gia đình.",
    themes: ["Alienation", "Family Burden", "Existential Crisis"],
    targetAudience: "Adults",
    rating: 4.65,
    isFeatured: true
  },
  {
    _id: "bk-08",
    title: "Der Process (The Trial)",
    authorId: "auth-04",
    isbn: "978-0805210408",
    language: "German",
    genre: "Philosophy",
    readingLevel: "Advanced",
    period: "Modern",
    publicationYear: NumberInt(1925),
    pageCount: NumberInt(255),
    coverImage: "/images/books/the-trial.jpg",
    synopsis: "Josef K. bất ngờ bị bắt giữ và truy tố bởi một hệ thống tòa án bí ẩn mà không hề được thông báo về tội danh.",
    themes: ["Bureaucracy", "Absurdity of Justice", "Guilt & Powerlessness"],
    targetAudience: "Adults & Scholars",
    rating: 4.5,
    isFeatured: false
  },
  {
    _id: "bk-09",
    title: "Cien Años de Soledad (One Hundred Years of Solitude)",
    authorId: "auth-05",
    isbn: "978-0060883287",
    language: "Spanish",
    genre: "Fiction",
    readingLevel: "Advanced",
    period: "Modern",
    publicationYear: NumberInt(1967),
    pageCount: NumberInt(417),
    coverImage: "/images/books/hundred-years.jpg",
    synopsis: "Biên niên sử huyền thoại qua bảy thế hệ của dòng họ Buendía tại ngôi làng biệt lập Macondo, đỉnh cao của Hiện thực huyền ảo.",
    themes: ["Solitude", "Incest & Fate", "Repetition of History"],
    targetAudience: "Adults",
    rating: 4.85,
    isFeatured: true
  },
  {
    _id: "bk-10",
    title: "El Coronel No Tiene Quien Le Escriba",
    authorId: "auth-05",
    isbn: "978-0307474728",
    language: "Spanish",
    genre: "Classic",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1961),
    pageCount: NumberInt(115),
    coverImage: "/images/books/coronel.jpg",
    synopsis: "Một đại tá già nghèo khó trải qua mười lăm năm mòn mỏi chờ đợi khoản lương hưu trợ cấp chiến tranh cùng niềm tin vào con gà chọi.",
    themes: ["Patience & Dignity", "Poverty", "Political Indifference"],
    targetAudience: "Adults",
    rating: 4.4,
    isFeatured: false
  },
  {
    _id: "bk-11",
    "title": "Chí Phèo",
    authorId: "auth-06",
    isbn: "978-6042188449",
    language: "Vietnamese",
    genre: "Classic",
    readingLevel: "Beginner",
    period: "Modern",
    publicationYear: NumberInt(1941),
    pageCount: NumberInt(85),
    coverImage: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=600&q=80",
    synopsis: "Tấn bi kịch lưu manh hóa và khát vọng làm người lương thiện tuyệt vọng của Chí Phèo trong làng Vũ Đại phong kiến.",
    themes: ["Human Dignity", "Class Exploitation", "Awakening of Conscience"],
    targetAudience: "General Readers & Students",
    rating: 4.9,
    isFeatured: true
  },
  {
    _id: "bk-12",
    title: "Sống Mòn",
    authorId: "auth-06",
    isbn: "978-6041088726",
    language: "Vietnamese",
    genre: "Fiction",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1944),
    pageCount: NumberInt(240),
    coverImage: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=600&q=80",
    synopsis: "Bức tranh chân thực về nỗi đau sống mòn và sự bế tắc của người trí thức tiểu tư sản nghèo trong vòng xoáy cơm áo gạo tiền.",
    themes: ["Wasted Potential", "Poverty & Idealism", "Psychological Struggles"],
    targetAudience: "Young Adults & Adults",
    rating: 4.7,
    isFeatured: false
  },
  {
    _id: "bk-13",
    title: "Crime and Punishment (Tội ác và Hình phạt)",
    authorId: "auth-07",
    isbn: "978-0140449136",
    language: "Russian",
    genre: "Classic",
    readingLevel: "Advanced",
    period: "Classic",
    publicationYear: NumberInt(1866),
    pageCount: NumberInt(671),
    coverImage: "/images/books/crime-punishment.jpg",
    synopsis: "Cuộc vật lộn tâm lý dữ dội của cựu sinh viên Raskolnikov sau khi sát hại bà lão cầm đồ để thử thách lý thuyết cá nhân.",
    themes: ["Guilt & Conscience", "Redemption", "Moral Philosophy"],
    targetAudience: "Adults",
    rating: 4.88,
    isFeatured: true
  },
  {
    _id: "bk-14",
    title: "Notes from Underground",
    authorId: "auth-07",
    isbn: "978-0679734529",
    language: "Russian",
    genre: "Philosophy",
    readingLevel: "Advanced",
    period: "Classic",
    publicationYear: NumberInt(1864),
    pageCount: NumberInt(160),
    coverImage: "/images/books/notes-underground.jpg",
    synopsis: "Bản tuyên ngôn triết học tiên phong cho chủ nghĩa hiện sinh, phơi bày những mâu thuẫn sâu kín và sự nổi loạn của cá nhân.",
    themes: ["Free Will", "Nihilism", "Irrational Human Nature"],
    targetAudience: "Philosophical Readers",
    rating: 4.55,
    isFeatured: false
  },
  {
    _id: "bk-15",
    title: "L'Étranger (The Stranger / Kẻ Xa Lạ)",
    authorId: "auth-08",
    isbn: "978-0679720201",
    language: "French",
    genre: "Philosophy",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1942),
    pageCount: NumberInt(159),
    coverImage: "/images/books/the-stranger.jpg",
    synopsis: "Meursault – một người đàn ông hờ hững với mọi quy ước xã hội, bị kết án tử hình sau vụ nổ súng trên bãi biển Alger.",
    themes: ["The Absurd", "Alienation", "Societal Conventions"],
    targetAudience: "Adults & Thinkers",
    rating: 4.8,
    isFeatured: true
  },
  {
    _id: "bk-16",
    title: "La Peste (The Plague / Dịch Hạch)",
    authorId: "auth-08",
    isbn: "978-0679720218",
    language: "French",
    genre: "Fiction",
    readingLevel: "Advanced",
    period: "Modern",
    publicationYear: NumberInt(1947),
    pageCount: NumberInt(308),
    coverImage: "/images/books/the-plague.jpg",
    synopsis: "Trận dịch hạch bùng phát phong tỏa thành phố Oran và cuộc chiến chống chọi đầy kiên cường của bác sĩ Rieux.",
    themes: ["Solidarity", "Human Resistance", "Suffering"],
    targetAudience: "Adults",
    rating: 4.72,
    isFeatured: false
  },
  {
    _id: "bk-17",
    title: "Brave New World",
    authorId: "auth-01",
    isbn: "978-0060850524",
    language: "English",
    genre: "Science Fiction",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1932),
    pageCount: NumberInt(288),
    coverImage: "/images/books/brave-new-world.jpg",
    synopsis: "Viễn cảnh tương lai đen tối nơi loài người được nhân bản theo giai cấp trong ống nghiệm và bị kiểm soát bằng lạc thú nhân tạo.",
    themes: ["Technological Control", "Loss of Individuality", "Consumerism"],
    targetAudience: "Young Adults & Adults",
    rating: 4.68,
    isFeatured: false
  },
  {
    _id: "bk-18",
    title: "Terre des Hommes (Wind, Sand and Stars)",
    authorId: "auth-02",
    isbn: "978-0156027625",
    language: "French",
    genre: "Non-Fiction",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1939),
    pageCount: NumberInt(240),
    coverImage: "/images/books/wind-sand-stars.jpg",
    synopsis: "Hồi ký triết học về tình đồng đội phi công, sự mỏng manh của số phận và vẻ đẹp thiêng liêng của Trái Đất.",
    themes: ["Human Fraternity", "Adventure", "Cosmic Perspective"],
    targetAudience: "General Readers",
    rating: 4.62,
    isFeatured: false
  },
  {
    _id: "bk-19",
    title: "1Q84 (Book 1 & 2)",
    authorId: "auth-03",
    isbn: "978-0307593313",
    language: "Japanese",
    genre: "Science Fiction",
    readingLevel: "Advanced",
    period: "Contemporary",
    publicationYear: NumberInt(2009),
    pageCount: NumberInt(928),
    coverImage: "/images/books/1q84.jpg",
    synopsis: "Thế giới năm 1984 bị bẻ cong thành năm 1Q84 với hai mặt trăng lơ lửng, nơi Aomame và Tengo tìm kiếm nhau giữa các giáo phái bí ẩn.",
    themes: ["Parallel Realities", "Love & Destiny", "Cults & Power"],
    targetAudience: "Adults",
    rating: 4.52,
    isFeatured: false
  },
  {
    _id: "bk-20",
    title: "Das Schloss (The Castle)",
    authorId: "auth-04",
    isbn: "978-0805211061",
    language: "German",
    genre: "Classic",
    readingLevel: "Advanced",
    period: "Modern",
    publicationYear: NumberInt(1926),
    pageCount: NumberInt(352),
    coverImage: "/images/books/the-castle.jpg",
    synopsis: "Chàng trắc địa viên K. tìm mọi cách tiếp cận chính quyền tòa lâu đài bí hiểm nhưng liên tục bị chối từ bởi bức tường hành chính.",
    themes: ["Unreachable Authority", "Isolation", "Hopeless Search for Meaning"],
    targetAudience: "Scholars & Advanced Readers",
    rating: 4.38,
    isFeatured: false
  },
  {
    _id: "bk-21",
    title: "Crónica de una Muerte Anunciada",
    authorId: "auth-05",
    isbn: "978-1400034710",
    language: "Spanish",
    genre: "Mystery",
    readingLevel: "Beginner",
    period: "Modern",
    publicationYear: NumberInt(1981),
    pageCount: NumberInt(128),
    coverImage: "/images/books/cronica.jpg",
    synopsis: "Một vụ ám sát danh dự được báo trước cho toàn bộ thị trấn, nhưng chuỗi trùng hợp đã khiến nó thành thảm kịch không thể đảo ngược.",
    themes: ["Collective Guilt", "Honor Code", "Fate vs Inaction"],
    targetAudience: "All Readers",
    rating: 4.65,
    isFeatured: true
  },
  {
    _id: "bk-22",
    title: "Đôi Mắt",
    authorId: "auth-06",
    isbn: "978-6042078917",
    language: "Vietnamese",
    genre: "Classic",
    readingLevel: "Beginner",
    period: "Modern",
    publicationYear: NumberInt(1948),
    pageCount: NumberInt(65),
    coverImage: "https://images.unsplash.com/photo-1491841573634-28140fc7ced7?auto=format&fit=crop&w=600&q=80",
    synopsis: "Tác phẩm ngắn kinh điển đặt ra vấn đề cách nhìn nhận người nông dân và thời cuộc của người trí thức trong những ngày đầu kháng chiến.",
    themes: ["Perspective", "Intellectual Responsibility", "Patriotism"],
    targetAudience: "Students & General",
    rating: 4.78,
    isFeatured: false
  },
  {
    _id: "bk-23",
    title: "The Brothers Karamazov (Anh Em Nhà Karamazov)",
    authorId: "auth-07",
    isbn: "978-0374528379",
    language: "Russian",
    genre: "Classic",
    readingLevel: "Advanced",
    period: "Classic",
    publicationYear: NumberInt(1880),
    pageCount: NumberInt(824),
    coverImage: "/images/books/brothers-karamazov.jpg",
    synopsis: "Đỉnh cao tư tưởng thế giới xoay quanh vụ án giết cha và bốn người con trai đại diện cho đam mê, lý trí, đức tin và hận thù.",
    themes: ["Existence of God", "Moral Responsibility", "Patricide"],
    targetAudience: "Advanced Thinkers",
    rating: 4.92,
    isFeatured: true
  },
  {
    _id: "bk-24",
    title: "Le Mythe de Sisyphe (The Myth of Sisyphus)",
    authorId: "auth-08",
    isbn: "978-0679733737",
    language: "French",
    genre: "Philosophy",
    readingLevel: "Advanced",
    period: "Modern",
    publicationYear: NumberInt(1942),
    pageCount: NumberInt(212),
    coverImage: "/images/books/sisyphus.jpg",
    synopsis: "Luận đề triết học đặt câu hỏi liệu cuộc sống có đáng sống hay không, với biểu tượng chàng Sisyphus hạnh phúc khi lăn đá lên núi.",
    themes: ["The Absurd", "Meaning of Life", "Rebellion"],
    targetAudience: "Philosophical Readers",
    rating: 4.7,
    isFeatured: false
  },
  {
    _id: "bk-25",
    title: "Homage to Catalonia",
    authorId: "auth-01",
    isbn: "978-0156421171",
    language: "English",
    genre: "Non-Fiction",
    readingLevel: "Intermediate",
    period: "Modern",
    publicationYear: NumberInt(1938),
    pageCount: NumberInt(232),
    coverImage: "/images/books/catalonia.jpg",
    synopsis: "Ký ức chân thực của George Orwell khi trực tiếp cầm súng chiến đấu trong cuộc Nội chiến Tây Ban Nha và đối mặt với phản bội.",
    themes: ["War Reality", "Political Betrayal", "Solidarity"],
    targetAudience: "History & Literature",
    rating: 4.58,
    isFeatured: false
  },
  {
    _id: "bk-26",
    title: "Men Without Women",
    authorId: "auth-03",
    isbn: "978-0525434184",
    language: "Japanese",
    genre: "Fiction",
    readingLevel: "Intermediate",
    period: "Contemporary",
    publicationYear: NumberInt(2014),
    pageCount: NumberInt(240),
    coverImage: "/images/books/men-without-women.jpg",
    synopsis: "Tuyển tập 7 truyện ngắn tinh tế về những người đàn ông cô đơn phải học cách chấp nhận sự trống vắng sau khi chia xa người yêu.",
    themes: ["Loss", "Grief", "Urban Loneliness"],
    targetAudience: "Adults",
    rating: 4.45,
    isFeatured: false
  }
];
db.books.insertMany(booksData);
print(`✓ Đã nạp ${db.books.countDocuments()} bản ghi sách (books).`);

// 5.3. Nạp Collections
const collectionsData = [
  {
    _id: "col-01",
    title: "Timeless Classics",
    description: "Những kiệt tác văn chương định hình tư tưởng nhân loại qua nhiều thế hệ từ Orwell, Dostoevsky tới Kafka.",
    badge: "Top Recommended",
    bookIds: ["bk-01", "bk-07", "bk-13", "bk-23", "bk-02"]
  },
  {
    _id: "col-02",
    title: "Fast & Engaging Reads",
    description: "Các tác phẩm ngắn gọn dưới 150 trang, mạch truyện lôi cuốn phù hợp đọc xong trong 1-2 buổi thưởng trà.",
    badge: "Quick Read",
    bookIds: ["bk-03", "bk-11", "bk-21", "bk-22", "bk-07"]
  },
  {
    _id: "col-03",
    title: "Modern Literary Gems",
    description: "Sắc màu văn chương hiện thực huyền ảo và tiểu thuyết đương đại từ Murakami, García Márquez và Albert Camus.",
    badge: "Modern",
    bookIds: ["bk-05", "bk-06", "bk-09", "bk-15", "bk-26"]
  },
  {
    _id: "col-04",
    title: "Polyglot Starter Kit",
    description: "Tuyển tập sách phân chia theo độ khó ngôn ngữ từ Beginner tới Advanced dành riêng cho người luyện đọc ngoại ngữ.",
    badge: "Multi-language",
    bookIds: ["bk-02", "bk-03", "bk-10", "bk-05", "bk-17"]
  }
];
db.collections.insertMany(collectionsData);
print(`✓ Đã nạp ${db.collections.countDocuments()} bộ sưu tập (collections).`);

// 5.4. Nạp Gallery Items
const galleryData = [
  {
    _id: "gal-01",
    bookId: "bk-01",
    imageUrl: "/images/gallery/1984-concept.jpg",
    caption: "Poster nghệ thuật đồ họa London 1984 dưới con mắt giám sát của Big Brother",
    credit: "Vintage Arts Archive",
    aspect: "portrait"
  },
  {
    _id: "gal-02",
    bookId: "bk-03",
    imageUrl: "/images/gallery/little-prince-stars.jpg",
    caption: "Hoàng tử bé và bông hồng trên tiểu tinh cầu B-612 giữa vũ trụ bao la",
    credit: "Estate of Saint-Exupéry",
    aspect: "landscape"
  },
  {
    _id: "gal-03",
    bookId: "bk-05",
    imageUrl: "/images/gallery/norwegian-wood-mood.jpg",
    caption: "Không gian Tokyo thập niên 60 trong giai điệu u hoài của bài hát Norwegian Wood",
    credit: "Literary Film Stills Collection",
    aspect: "landscape"
  },
  {
    _id: "gal-04",
    bookId: "bk-07",
    imageUrl: "/images/gallery/metamorphosis-sketch.jpg",
    caption: "Bản phác thảo phong cách Expressionism căn phòng của Gregor Samsa",
    credit: "Prague Literary Museum Archive",
    aspect: "portrait"
  },
  {
    _id: "gal-05",
    bookId: "bk-09",
    imageUrl: "/images/gallery/macondo-dream.jpg",
    caption: "Ngôi làng Macondo huyền ảo với những cơn mưa hoa vàng và bướm vàng",
    credit: "Latin American Cultural Foundation",
    aspect: "square"
  },
  {
    _id: "gal-06",
    bookId: "bk-11",
    imageUrl: "/images/gallery/chi-pheo-art.jpg",
    caption: "Minh họa làng Vũ Đại và lò gạch cũ trong tác phẩm Chí Phèo",
    credit: "Hội Mỹ thuật Việt Nam Heritage",
    aspect: "portrait"
  }
];
db.gallery_items.insertMany(galleryData);
print(`✓ Đã nạp ${db.gallery_items.countDocuments()} bản ghi thư viện ảnh (gallery_items).`);

// 5.5. Nạp Reading Progress & Favorites mẫu
db.reading_progress.insertMany([
  {
    bookId: "bk-01",
    status: "Reading",
    currentPage: NumberInt(142),
    totalPages: NumberInt(328),
    percentage: 43,
    notes: "Đang đọc dở phần 2 khi Winston gặp gỡ Julia trong khu rừng ngoại ô.",
    lastUpdated: new Date()
  },
  {
    bookId: "bk-03",
    status: "Completed",
    currentPage: NumberInt(96),
    totalPages: NumberInt(96),
    percentage: 100,
    notes: "Cuốn sách tuyệt vời về tình bạn với chú cáo.",
    lastUpdated: new Date()
  }
]);
print(`✓ Đã nạp ${db.reading_progress.countDocuments()} bản ghi tiến độ đọc (reading_progress).`);

db.favorites.insertMany([
  { bookId: "bk-01", addedAt: new Date() },
  { bookId: "bk-03", addedAt: new Date() },
  { bookId: "bk-05", addedAt: new Date() },
  { bookId: "bk-11", addedAt: new Date() }
]);
print(`✓ Đã nạp ${db.favorites.countDocuments()} bản ghi mục yêu thích (favorites).`);

print('\n======================================================');
print('🎉 CHÚC MỪNG: KHỞI TẠO DATABASE MONGODB BOOKBRIDGE THÀNH CÔNG!');
print('Database Name : bookbridge_db');
print(`Tổng số Sách  : ${db.books.countDocuments()}`);
print(`Tổng Tác giả  : ${db.authors.countDocuments()}`);
print(`Bộ sưu tập    : ${db.collections.countDocuments()}`);
print(`Gallery Items : ${db.gallery_items.countDocuments()}`);
print('======================================================\n');
