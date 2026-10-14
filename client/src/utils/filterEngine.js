export function filterBooks(books, filters = {}) {
  const {
    search = '',
    genre = 'All',
    language = 'all',
    readingLevel = 'all',
    period = 'all',
    sortBy = 'title-az'
  } = filters;

  const normalizedSearch = search.trim().toLowerCase();

  const filtered = books.filter((book) => {
    // 1. Text Search (title, author, synopsis, themes, language)
    if (normalizedSearch) {
      const titleMatch = book.title?.toLowerCase().includes(normalizedSearch);
      const authorMatch = book.authorName?.toLowerCase().includes(normalizedSearch);
      const languageMatch = book.language?.toLowerCase().includes(normalizedSearch);
      const synopsisMatch = book.synopsis?.toLowerCase().includes(normalizedSearch);
      const themesMatch = book.themes?.some(t => t.toLowerCase().includes(normalizedSearch));

      if (!titleMatch && !authorMatch && !languageMatch && !synopsisMatch && !themesMatch) {
        return false;
      }
    }

    // 2. Genre Filter
    if (genre && genre !== 'All') {
      if (book.genre?.toLowerCase() !== genre.toLowerCase()) {
        return false;
      }
    }

    // 3. Language Filter
    if (language && language !== 'all') {
      if (book.language?.toLowerCase() !== language.toLowerCase()) {
        return false;
      }
    }

    // 4. Reading Level Filter
    if (readingLevel && readingLevel !== 'all') {
      if (book.readingLevel?.toLowerCase() !== readingLevel.toLowerCase()) {
        return false;
      }
    }

    // 5. Period Filter
    if (period && period !== 'all') {
      const year = Number(book.publicationYear) || 0;
      if (period === 'classic' && year >= 1900) return false;
      if (period === 'modern' && (year < 1900 || year > 1980)) return false;
      if (period === 'contemporary' && year < 1981) return false;
    }

    return true;
  });

  // Sorting
  const sorted = [...filtered].sort((a, b) => {
    switch (sortBy) {
      case 'title-az':
        return a.title.localeCompare(b.title);
      case 'title-za':
        return b.title.localeCompare(a.title);
      case 'year-newest':
        return (b.publicationYear || 0) - (a.publicationYear || 0);
      case 'year-oldest':
        return (a.publicationYear || 0) - (b.publicationYear || 0);
      case 'pages-short':
        return (a.pageCount || 0) - (b.pageCount || 0);
      case 'pages-long':
        return (b.pageCount || 0) - (a.pageCount || 0);
      case 'rating-high':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  return sorted;
}

export default filterBooks;
