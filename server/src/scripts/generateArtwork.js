import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PUBLIC_IMAGES_DIR = path.resolve(__dirname, '../../../client/public/images');
const BOOKS_DIR = path.join(PUBLIC_IMAGES_DIR, 'books');
const AUTHORS_DIR = path.join(PUBLIC_IMAGES_DIR, 'authors');
const GALLERY_DIR = path.join(PUBLIC_IMAGES_DIR, 'gallery');

[BOOKS_DIR, AUTHORS_DIR, GALLERY_DIR].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// Book styles mapping with tailored color themes and motifs
const bookThemes = {
  '1984': {
    slug: '1984',
    title: '1984',
    author: 'George Orwell',
    lang: 'English',
    year: '1949',
    genre: 'Dystopian',
    bg1: '#111827',
    bg2: '#374151',
    bg3: '#991b1b',
    accent: '#ef4444',
    iconText: '👁',
    subText: 'WAR IS PEACE • FREEDOM IS SLAVERY'
  },
  'animal-farm': {
    slug: 'animal-farm',
    title: 'Animal Farm',
    author: 'George Orwell',
    lang: 'English',
    year: '1945',
    genre: 'Classic Satire',
    bg1: '#3b0764',
    bg2: '#701a75',
    bg3: '#b45309',
    accent: '#f59e0b',
    iconText: '🌾',
    subText: 'ALL ANIMALS ARE EQUAL'
  },
  'little-prince': {
    slug: 'little-prince',
    title: 'Le Petit Prince',
    author: 'Antoine de Saint-Exupéry',
    lang: 'French',
    year: '1943',
    genre: 'Philosophy',
    bg1: '#0f172a',
    bg2: '#1e1b4b',
    bg3: '#312e81',
    accent: '#fbbf24',
    iconText: '⭐',
    subText: "ON NE VOIT BIEN QU'AVEC LE CŒUR"
  },
  'night-flight': {
    slug: 'night-flight',
    title: 'Vol de Nuit',
    author: 'Antoine de Saint-Exupéry',
    lang: 'French',
    year: '1931',
    genre: 'Fiction',
    bg1: '#030712',
    bg2: '#0c4a6e',
    bg3: '#1e293b',
    accent: '#38bdf8',
    iconText: '✈',
    subText: 'NIGHT FLIGHT ACROSS THE ANDES'
  },
  'norwegian-wood': {
    slug: 'norwegian-wood',
    title: 'Norwegian Wood',
    author: 'Haruki Murakami',
    lang: 'Japanese',
    year: '1987',
    genre: 'Fiction',
    bg1: '#1c1917',
    bg2: '#7f1d1d',
    bg3: '#450a0a',
    accent: '#f87171',
    iconText: '🌲',
    subText: 'MEMORIES OF TOKYO & LOST YOUTH'
  },
  'kafka-shore': {
    slug: 'kafka-shore',
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    lang: 'Japanese',
    year: '2002',
    genre: 'Magical Realism',
    bg1: '#090d16',
    bg2: '#1e293b',
    bg3: '#047857',
    accent: '#34d399',
    iconText: '🌊',
    subText: 'THE LABYRINTH OF PROPHECY'
  },
  'metamorphosis': {
    slug: 'metamorphosis',
    title: 'Die Verwandlung',
    author: 'Franz Kafka',
    lang: 'German',
    year: '1915',
    genre: 'Existentialist',
    bg1: '#18181b',
    bg2: '#3f3f46',
    bg3: '#854d0e',
    accent: '#fbbf24',
    iconText: '🪲',
    subText: 'THE METAMORPHOSIS OF GREGOR'
  },
  'the-trial': {
    slug: 'the-trial',
    title: 'Der Process',
    author: 'Franz Kafka',
    lang: 'German',
    year: '1925',
    genre: 'Philosophy',
    bg1: '#0f172a',
    bg2: '#334155',
    bg3: '#475569',
    accent: '#cbd5e1',
    iconText: '⚖',
    subText: 'THE UNKNOWABLE LAW & GUILT'
  },
  'hundred-years': {
    slug: 'hundred-years',
    title: 'Cien Años de Soledad',
    author: 'Gabriel García Márquez',
    lang: 'Spanish',
    year: '1967',
    genre: 'Magical Realism',
    bg1: '#064e3b',
    bg2: '#065f46',
    bg3: '#b45309',
    accent: '#f59e0b',
    iconText: '🦋',
    subText: 'THE CHRONICLE OF MACONDO'
  },
  'coronel': {
    slug: 'coronel',
    title: 'El Coronel No Tiene...',
    author: 'Gabriel García Márquez',
    lang: 'Spanish',
    year: '1961',
    genre: 'Classic',
    bg1: '#292524',
    bg2: '#78350f',
    bg3: '#92400e',
    accent: '#fde68a',
    iconText: '✉',
    subText: 'WAITING FOR THE PENSION'
  },
  'chi-pheo': {
    slug: 'chi-pheo',
    title: 'Chí Phèo',
    author: 'Nam Cao',
    lang: 'Vietnamese',
    year: '1941',
    genre: 'Realism',
    bg1: '#311005',
    bg2: '#7c2d12',
    bg3: '#9a3412',
    accent: '#fb923c',
    iconText: '🍶',
    subText: 'AI CHO TAO LƯƠNG THIỆN?'
  },
  'song-mon': {
    slug: 'song-mon',
    title: 'Sống Mòn',
    author: 'Nam Cao',
    lang: 'Vietnamese',
    year: '1944',
    genre: 'Fiction',
    bg1: '#1c1917',
    bg2: '#44403c',
    bg3: '#57534e',
    accent: '#facc15',
    iconText: '🕯',
    subText: 'BI KỊCH CỦA TRÍ THỨC NGHÈO'
  },
  'crime-punishment': {
    slug: 'crime-punishment',
    title: 'Crime and Punishment',
    author: 'Fyodor Dostoevsky',
    lang: 'Russian',
    year: '1866',
    genre: 'Classic',
    bg1: '#1e1b4b',
    bg2: '#581c87',
    bg3: '#831843',
    accent: '#f43f5e',
    iconText: '🪓',
    subText: 'RASKOLNIKOV IN PETERSBURG'
  },
  'notes-underground': {
    slug: 'notes-underground',
    title: 'Notes from Underground',
    author: 'Fyodor Dostoevsky',
    lang: 'Russian',
    year: '1864',
    genre: 'Philosophy',
    bg1: '#09090b',
    bg2: '#27272a',
    bg3: '#52525b',
    accent: '#e4e4e7',
    iconText: '📜',
    subText: 'I AM A SICK MAN... A SPITEFUL MAN'
  },
  'the-stranger': {
    slug: 'the-stranger',
    title: "L'Étranger",
    author: 'Albert Camus',
    lang: 'French',
    year: '1942',
    genre: 'Philosophy',
    bg1: '#422006',
    bg2: '#854d0e',
    bg3: '#ca8a04',
    accent: '#fef08a',
    iconText: '☀️',
    subText: 'THE BLINDING ALGERIAN SUN'
  },
  'the-plague': {
    slug: 'the-plague',
    title: 'La Peste',
    author: 'Albert Camus',
    lang: 'French',
    year: '1947',
    genre: 'Fiction',
    bg1: '#14532d',
    bg2: '#166534',
    bg3: '#15803d',
    accent: '#86efac',
    iconText: '🐀',
    subText: 'SOLIDARITY IN ORAN'
  },
  'brave-new-world': {
    slug: 'brave-new-world',
    title: 'Brave New World',
    author: 'Aldous Huxley',
    lang: 'English',
    year: '1932',
    genre: 'Science Fiction',
    bg1: '#022c22',
    bg2: '#115e59',
    bg3: '#0e7490',
    accent: '#22d3ee',
    iconText: '🧬',
    subText: 'COMMUNITY, IDENTITY, STABILITY'
  },
  'wind-sand-stars': {
    slug: 'wind-sand-stars',
    title: 'Terre des Hommes',
    author: 'Antoine de Saint-Exupéry',
    lang: 'French',
    year: '1939',
    genre: 'Non-Fiction',
    bg1: '#451a03',
    bg2: '#78350f',
    bg3: '#92400e',
    accent: '#fde047',
    iconText: '🏜',
    subText: 'THE EARTH OF HUMANKIND'
  },
  '1q84': {
    slug: '1q84',
    title: '1Q84 (Book 1 & 2)',
    author: 'Haruki Murakami',
    lang: 'Japanese',
    year: '2009',
    genre: 'Science Fiction',
    bg1: '#09090b',
    bg2: '#18181b',
    bg3: '#3f3f46',
    accent: '#38bdf8',
    iconText: '🌕',
    subText: 'THE WORLD WITH TWO MOONS'
  },
  'the-castle': {
    slug: 'the-castle',
    title: 'Das Schloss',
    author: 'Franz Kafka',
    lang: 'German',
    year: '1926',
    genre: 'Classic',
    bg1: '#111827',
    bg2: '#1f2937',
    bg3: '#374151',
    accent: '#9ca3af',
    iconText: '🏰',
    subText: 'THE INACCESSIBLE FORTRESS'
  },
  'cronica': {
    slug: 'cronica',
    title: 'Crónica de una Muerte',
    author: 'Gabriel García Márquez',
    lang: 'Spanish',
    year: '1981',
    genre: 'Mystery',
    bg1: '#450a0a',
    bg2: '#7f1d1d',
    bg3: '#991b1b',
    accent: '#fca5a5',
    iconText: '⚔',
    subText: 'A DEATH FORETOLD'
  },
  'doi-mat': {
    slug: 'doi-mat',
    title: 'Đôi Mắt',
    author: 'Nam Cao',
    lang: 'Vietnamese',
    year: '1948',
    genre: 'Classic',
    bg1: '#1e3a8a',
    bg2: '#1d4ed8',
    bg3: '#2563eb',
    accent: '#bfdbfe',
    iconText: '👓',
    subText: 'GÓC NHÌN NGƯỜI NGHỆ SĨ'
  },
  'brothers-karamazov': {
    slug: 'brothers-karamazov',
    title: 'The Brothers Karamazov',
    author: 'Fyodor Dostoevsky',
    lang: 'Russian',
    year: '1880',
    genre: 'Classic',
    bg1: '#2e1065',
    bg2: '#4c1d95',
    bg3: '#6b21a8',
    accent: '#c084fc',
    iconText: '☦',
    subText: 'FAITH, DOUBT & FREE WILL'
  },
  'sisyphus': {
    slug: 'sisyphus',
    title: 'Le Mythe de Sisyphe',
    author: 'Albert Camus',
    lang: 'French',
    year: '1942',
    genre: 'Philosophy',
    bg1: '#365314',
    bg2: '#4d7c0f',
    bg3: '#65a30d',
    accent: '#bef264',
    iconText: '🪨',
    subText: 'ONE MUST IMAGINE SISYPHUS HAPPY'
  },
  'catalonia': {
    slug: 'catalonia',
    title: 'Homage to Catalonia',
    author: 'George Orwell',
    lang: 'English',
    year: '1938',
    genre: 'Non-Fiction',
    bg1: '#581c87',
    bg2: '#7e22ce',
    bg3: '#9333ea',
    accent: '#e9d5ff',
    iconText: '🚩',
    subText: 'BARCELONA CIVIL WAR MEMOIR'
  },
  'men-without-women': {
    slug: 'men-without-women',
    title: 'Men Without Women',
    author: 'Haruki Murakami',
    lang: 'Japanese',
    year: '2014',
    genre: 'Fiction',
    bg1: '#0f172a',
    bg2: '#334155',
    bg3: '#475569',
    accent: '#94a3b8',
    iconText: '🎷',
    subText: 'DRIVE MY CAR & OTHER STORIES'
  }
};

function generateBookSvg(info) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750" width="500" height="750">
  <defs>
    <linearGradient id="bg-${info.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="${info.bg1}"/>
      <stop offset="50%" stop-color="${info.bg2}"/>
      <stop offset="100%" stop-color="${info.bg3}"/>
    </linearGradient>
    <radialGradient id="glow-${info.slug}" cx="50%" cy="35%" r="45%">
      <stop offset="0%" stop-color="${info.accent}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="${info.bg1}" stop-opacity="0"/>
    </radialGradient>
    <filter id="shadow-${info.slug}" x="-10%" y="-10%" width="120%" height="120%">
      <feDropShadow dx="0" dy="8" stdDeviation="12" flood-color="#000000" flood-opacity="0.6"/>
    </filter>
  </defs>

  <!-- Background Base -->
  <rect width="500" height="750" fill="url(#bg-${info.slug})"/>
  <rect width="500" height="750" fill="url(#glow-${info.slug})"/>

  <!-- Ornate Archival Borders -->
  <rect x="24" y="24" width="452" height="702" rx="16" fill="none" stroke="${info.accent}" stroke-width="2.5" stroke-opacity="0.6"/>
  <rect x="34" y="34" width="432" height="682" rx="12" fill="none" stroke="#ffffff" stroke-width="1" stroke-opacity="0.15"/>
  <circle cx="24" cy="24" r="5" fill="${info.accent}" fill-opacity="0.8"/>
  <circle cx="476" cy="24" r="5" fill="${info.accent}" fill-opacity="0.8"/>
  <circle cx="24" cy="726" r="5" fill="${info.accent}" fill-opacity="0.8"/>
  <circle cx="476" cy="726" r="5" fill="${info.accent}" fill-opacity="0.8"/>

  <!-- Header Header Ribbon -->
  <text x="250" y="85" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="11" font-weight="700" fill="${info.accent}" text-anchor="middle" letter-spacing="4">
    BOOKBRIDGE WORLD ARCHIVE
  </text>
  <text x="250" y="112" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="600" fill="#cbd5e1" text-anchor="middle">
    ${info.lang.toUpperCase()} • ${info.genre.toUpperCase()}
  </text>
  <line x1="160" y1="130" x2="340" y2="130" stroke="${info.accent}" stroke-width="1.5" stroke-opacity="0.4"/>

  <!-- Center Artwork Motif -->
  <circle cx="250" cy="270" r="80" fill="#000000" fill-opacity="0.3" stroke="${info.accent}" stroke-width="2" stroke-dasharray="6 4" filter="url(#shadow-${info.slug})"/>
  <text x="250" y="295" font-size="64" text-anchor="middle" filter="url(#shadow-${info.slug})">
    ${info.iconText}
  </text>

  <!-- Title & Author Block -->
  <g transform="translate(250, 430)">
    <rect x="-190" y="-15" width="380" height="110" rx="12" fill="#000000" fill-opacity="0.35" stroke="#ffffff" stroke-width="1" stroke-opacity="0.1"/>
    <text x="0" y="38" font-family="'Playfair Display', Georgia, serif" font-size="28" font-weight="bold" fill="#ffffff" text-anchor="middle" filter="url(#shadow-${info.slug})">
      ${info.title.length > 22 ? info.title.substring(0, 22) + '...' : info.title}
    </text>
    <text x="0" y="74" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="15" font-weight="600" fill="${info.accent}" text-anchor="middle">
      By ${info.author}
    </text>
  </g>

  <!-- Quote & Subtext -->
  <text x="250" y="585" font-family="'Playfair Display', Georgia, serif" font-size="12" font-style="italic" fill="#e2e8f0" fill-opacity="0.8" text-anchor="middle">
    "${info.subText}"
  </text>

  <!-- Footer Seal & Meta -->
  <line x1="60" y1="640" x2="440" y2="640" stroke="#ffffff" stroke-width="1" stroke-opacity="0.2"/>
  <text x="70" y="675" font-family="monospace" font-size="12" fill="#94a3b8">
    EDITION: ${info.year}
  </text>
  <text x="430" y="675" font-family="monospace" font-size="12" fill="${info.accent}" text-anchor="end" font-weight="bold">
    AUTHENTIC CLASSIC
  </text>
</svg>`;
}

// Generate all 26 book covers
Object.values(bookThemes).forEach(book => {
  const svg = generateBookSvg(book);
  const svgPath = path.join(BOOKS_DIR, `${book.slug}.svg`);
  const jpgPath = path.join(BOOKS_DIR, `${book.slug}.jpg`);
  
  fs.writeFileSync(svgPath, svg, 'utf-8');
  fs.writeFileSync(jpgPath, svg, 'utf-8'); // Both extensions supported!
});
console.log(`✅ Đã tạo thành công 26 ảnh bìa sách vector SVG/JPG tại ${BOOKS_DIR}`);

// Author Avatars
const authors = [
  { slug: 'george-orwell', name: 'George Orwell', country: 'United Kingdom', years: '1903 - 1950', color: '#ef4444', icon: '🇬🇧' },
  { slug: 'antoine-de-saint-exupery', name: 'Antoine de Saint-Exupéry', country: 'France', years: '1900 - 1944', color: '#fbbf24', icon: '🇫🇷' },
  { slug: 'haruki-murakami', name: 'Haruki Murakami', country: 'Japan', years: '1949 - Present', color: '#f87171', icon: '🇯🇵' },
  { slug: 'franz-kafka', name: 'Franz Kafka', country: 'Czech Republic', years: '1883 - 1924', color: '#94a3b8', icon: '🇨🇿' },
  { slug: 'gabriel-garcia-marquez', name: 'Gabriel García Márquez', country: 'Colombia', years: '1927 - 2014', color: '#f59e0b', icon: '🇨🇴' },
  { slug: 'nam-cao', name: 'Nam Cao', country: 'Vietnam', years: '1915 - 1951', color: '#fb923c', icon: '🇻🇳' },
  { slug: 'fyodor-dostoevsky', name: 'Fyodor Dostoevsky', country: 'Russia', years: '1821 - 1881', color: '#c084fc', icon: '🇷🇺' },
  { slug: 'albert-camus', name: 'Albert Camus', country: 'France', years: '1913 - 1960', color: '#bef264', icon: '🇫🇷' }
];

function generateAuthorSvg(author) {
  const initials = author.name.split(' ').map(n => n[0]).join('');
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="400" height="400">
  <defs>
    <linearGradient id="abg-${author.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>
  <rect width="400" height="400" rx="32" fill="url(#abg-${author.slug})"/>
  <circle cx="200" cy="160" r="90" fill="#000000" fill-opacity="0.4" stroke="${author.color}" stroke-width="3"/>
  <circle cx="200" cy="160" r="80" fill="${author.color}" fill-opacity="0.15"/>
  <text x="200" y="185" font-family="'Playfair Display', Georgia, serif" font-size="54" font-weight="bold" fill="#ffffff" text-anchor="middle">
    ${initials}
  </text>
  <text x="200" y="290" font-family="'Playfair Display', Georgia, serif" font-size="20" font-weight="bold" fill="#ffffff" text-anchor="middle">
    ${author.name}
  </text>
  <text x="200" y="325" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="13" font-weight="600" fill="${author.color}" text-anchor="middle">
    ${author.icon} ${author.country} • ${author.years}
  </text>
</svg>`;
}

authors.forEach(auth => {
  const svg = generateAuthorSvg(auth);
  fs.writeFileSync(path.join(AUTHORS_DIR, `${auth.slug}.svg`), svg, 'utf-8');
  fs.writeFileSync(path.join(AUTHORS_DIR, `${auth.slug}.jpg`), svg, 'utf-8');
});
console.log(`✅ Đã tạo thành công 8 avatar tác giả vector SVG/JPG tại ${AUTHORS_DIR}`);

// Gallery Items
const galleryItems = [
  { slug: '1984-concept', title: 'Ministry of Truth & The Watcher', color: '#ef4444', icon: '👁' },
  { slug: 'little-prince-stars', title: 'Asteroid B-612 and The Rose', color: '#fbbf24', icon: '🌹' },
  { slug: 'norwegian-wood-mood', title: 'Subway Twilight & Melancholy', color: '#f87171', icon: '🍂' },
  { slug: 'metamorphosis-sketch', title: 'The Room and The Window View', color: '#cbd5e1', icon: '🪟' },
  { slug: 'macondo-dream', title: 'The Yellow Butterflies of Macondo', color: '#f59e0b', icon: '🦋' },
  { slug: 'chi-pheo-art', title: 'Moonlight at Vu Dai Village', color: '#fb923c', icon: '🌕' }
];

function generateGallerySvg(item) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 450" width="600" height="450">
  <defs>
    <linearGradient id="gbg-${item.slug}" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="60%" stop-color="#182234"/>
      <stop offset="100%" stop-color="#02162e"/>
    </linearGradient>
  </defs>
  <rect width="600" height="450" fill="url(#gbg-${item.slug})"/>
  <rect x="20" y="20" width="560" height="410" rx="16" fill="none" stroke="${item.color}" stroke-width="2" stroke-opacity="0.4"/>
  <circle cx="300" cy="180" r="70" fill="${item.color}" fill-opacity="0.1" stroke="${item.color}" stroke-width="2"/>
  <text x="300" y="205" font-size="64" text-anchor="middle">${item.icon}</text>
  <text x="300" y="320" font-family="'Playfair Display', Georgia, serif" font-size="22" font-weight="bold" fill="#ffffff" text-anchor="middle">
    ${item.title}
  </text>
  <text x="300" y="355" font-family="'Plus Jakarta Sans', system-ui, sans-serif" font-size="12" font-weight="700" fill="${item.color}" text-anchor="middle" letter-spacing="3">
    BOOKBRIDGE EXHIBIT PIECE
  </text>
</svg>`;
}

galleryItems.forEach(item => {
  const svg = generateGallerySvg(item);
  fs.writeFileSync(path.join(GALLERY_DIR, `${item.slug}.svg`), svg, 'utf-8');
  fs.writeFileSync(path.join(GALLERY_DIR, `${item.slug}.jpg`), svg, 'utf-8');
});
console.log(`✅ Đã tạo thành công 6 tác phẩm triển lãm SVG/JPG tại ${GALLERY_DIR}`);
