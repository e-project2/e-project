import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const slugMap = {
  'bk-01': '1984',
  'bk-02': 'animal-farm',
  'bk-03': 'little-prince',
  'bk-04': 'night-flight',
  'bk-05': 'norwegian-wood',
  'bk-06': 'kafka-shore',
  'bk-07': 'metamorphosis',
  'bk-08': 'the-trial',
  'bk-09': 'hundred-years',
  'bk-10': 'coronel',
  'bk-11': 'chi-pheo',
  'bk-12': 'song-mon',
  'bk-13': 'crime-punishment',
  'bk-14': 'notes-underground',
  'bk-15': 'the-stranger',
  'bk-16': 'the-plague',
  'bk-17': 'brave-new-world',
  'bk-18': 'wind-sand-stars',
  'bk-19': '1q84',
  'bk-20': 'the-castle',
  'bk-21': 'cronica',
  'bk-22': 'doi-mat',
  'bk-23': 'brothers-karamazov',
  'bk-24': 'sisyphus',
  'bk-25': 'catalonia',
  'bk-26': 'men-without-women'
};

const authorSlugMap = {
  'auth-01': 'george-orwell',
  'auth-02': 'antoine-de-saint-exupery',
  'auth-03': 'haruki-murakami',
  'auth-04': 'franz-kafka',
  'auth-05': 'gabriel-garcia-marquez',
  'auth-06': 'nam-cao',
  'auth-07': 'fyodor-dostoevsky',
  'auth-08': 'albert-camus'
};

const gallerySlugMap = {
  'gal-01': '1984-concept',
  'gal-02': 'little-prince-stars',
  'gal-03': 'norwegian-wood-mood',
  'gal-04': 'metamorphosis-sketch',
  'gal-05': 'macondo-dream',
  'gal-06': 'chi-pheo-art'
};

async function run() {
  // 1. Update client/src/data/booksData.js
  const clientBooksPath = path.resolve(__dirname, '../../../client/src/data/booksData.js');
  const { booksData } = await import('../../../client/src/data/booksData.js');
  booksData.forEach(b => {
    const slug = slugMap[b._id || b.id] || 'placeholder';
    b.coverImage = `/images/books/${slug}.svg`;
  });
  fs.writeFileSync(clientBooksPath, `export const booksData = ${JSON.stringify(booksData, null, 2)};\n`, 'utf8');
  console.log('✅ Đã cập nhật client/src/data/booksData.js');

  // 2. Update client/src/data/authorsData.js
  const clientAuthorsPath = path.resolve(__dirname, '../../../client/src/data/authorsData.js');
  const { authorsData } = await import('../../../client/src/data/authorsData.js');
  authorsData.forEach(a => {
    const slug = authorSlugMap[a._id || a.id] || 'placeholder';
    a.avatar = `/images/authors/${slug}.svg`;
  });
  fs.writeFileSync(clientAuthorsPath, `export const authorsData = ${JSON.stringify(authorsData, null, 2)};\n`, 'utf8');
  console.log('✅ Đã cập nhật client/src/data/authorsData.js');

  // 3. Update client/src/data/galleryData.js
  const clientGalleryPath = path.resolve(__dirname, '../../../client/src/data/galleryData.js');
  const { galleryData } = await import('../../../client/src/data/galleryData.js');
  galleryData.forEach(g => {
    const slug = gallerySlugMap[g._id || g.id] || 'placeholder';
    g.imageUrl = `/images/gallery/${slug}.svg`;
  });
  fs.writeFileSync(clientGalleryPath, `export const galleryData = ${JSON.stringify(galleryData, null, 2)};\n`, 'utf8');
  console.log('✅ Đã cập nhật client/src/data/galleryData.js');

  // 4. Update server/database/data/books.json
  const serverBooksPath = path.resolve(__dirname, '../../../server/database/data/books.json');
  if (fs.existsSync(serverBooksPath)) {
    const books = JSON.parse(fs.readFileSync(serverBooksPath, 'utf8'));
    books.forEach(b => {
      const slug = slugMap[b._id || b.id] || 'placeholder';
      b.coverImage = `/images/books/${slug}.svg`;
    });
    fs.writeFileSync(serverBooksPath, JSON.stringify(books, null, 2) + '\n', 'utf8');
    console.log('✅ Đã cập nhật server/database/data/books.json');
  }

  // 5. Update server/database/data/authors.json
  const serverAuthorsPath = path.resolve(__dirname, '../../../server/database/data/authors.json');
  if (fs.existsSync(serverAuthorsPath)) {
    const authors = JSON.parse(fs.readFileSync(serverAuthorsPath, 'utf8'));
    authors.forEach(a => {
      const slug = authorSlugMap[a._id || a.id] || 'placeholder';
      a.avatar = `/images/authors/${slug}.svg`;
    });
    fs.writeFileSync(serverAuthorsPath, JSON.stringify(authors, null, 2) + '\n', 'utf8');
    console.log('✅ Đã cập nhật server/database/data/authors.json');
  }

  // 6. Update server/database/data/gallery.json
  const serverGalleryPath = path.resolve(__dirname, '../../../server/database/data/gallery.json');
  if (fs.existsSync(serverGalleryPath)) {
    const gallery = JSON.parse(fs.readFileSync(serverGalleryPath, 'utf8'));
    gallery.forEach(g => {
      const slug = gallerySlugMap[g._id || g.id] || 'placeholder';
      g.imageUrl = `/images/gallery/${slug}.svg`;
    });
    fs.writeFileSync(serverGalleryPath, JSON.stringify(gallery, null, 2) + '\n', 'utf8');
    console.log('✅ Đã cập nhật server/database/data/gallery.json');
  }
}

run();
