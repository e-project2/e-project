import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';
import { booksData as initialBooks } from '../data/booksData.js';
import { authorsData as initialAuthors } from '../data/authorsData.js';
import { collectionsData as initialCollections } from '../data/collectionsData.js';
import { galleryData as initialGallery } from '../data/galleryData.js';

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState(initialBooks);
  const [authors, setAuthors] = useState(initialAuthors);
  const [collections, setCollections] = useState(initialCollections);
  const [gallery, setGallery] = useState(initialGallery);
  const [loading, setLoading] = useState(false);
  const [backendOnline, setBackendOnline] = useState(false);

  // Selected modals
  const [selectedBook, setSelectedBook] = useState(null);
  const [selectedAuthor, setSelectedAuthor] = useState(null);
  const [selectedGalleryItem, setSelectedGalleryItem] = useState(null);

  // Global search & filter state
  const [filters, setFilters] = useState({
    search: '',
    genre: 'All',
    language: 'all',
    readingLevel: 'all',
    period: 'all',
    sortBy: 'title-az'
  });

  // Attempt fetching from backend on mount
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        const [fetchedBooks, fetchedAuthors, fetchedCollections, fetchedGallery] = await Promise.all([
          apiService.getBooks(),
          apiService.getAuthors(),
          apiService.getCollections(),
          apiService.getGallery()
        ]);

        if (fetchedBooks && fetchedBooks.length > 0) {
          const normalized = fetchedBooks.map(b => ({
            ...b,
            id: b._id || b.id,
            authorId: typeof b.authorId === 'object' ? b.authorId._id : b.authorId,
            authorName: b.authorName || (typeof b.authorId === 'object' ? b.authorId.name : 'World Classic Author')
          }));
          setBooks(normalized);
        }
        if (fetchedAuthors && fetchedAuthors.length > 0) setAuthors(fetchedAuthors);
        if (fetchedCollections && fetchedCollections.length > 0) setCollections(fetchedCollections);
        if (fetchedGallery && fetchedGallery.length > 0) setGallery(fetchedGallery);
        setBackendOnline(true);
      } catch (err) {
        console.info('Backend unreachable, operating smoothly in client standalone mode.', err.message);
        setBackendOnline(false);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  const updateFilters = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      genre: 'All',
      language: 'all',
      readingLevel: 'all',
      period: 'all',
      sortBy: 'title-az'
    });
  };

  const getBookById = (id) => {
    return books.find(b => b._id === id || b.id === id);
  };

  const getAuthorById = (id) => {
    return authors.find(a => a._id === id || a.id === id);
  };

  const getBooksByAuthor = (authorId) => {
    return books.filter(b => b.authorId === authorId);
  };

  const getRelatedBooks = (book, count = 4) => {
    if (!book) return [];
    return books
      .filter(b => (b._id !== book._id && b.id !== book.id) && (b.authorId === book.authorId || b.genre === book.genre || b.language === book.language))
      .slice(0, count);
  };

  return (
    <BookContext.Provider
      value={{
        books,
        authors,
        collections,
        gallery,
        loading,
        backendOnline,
        filters,
        updateFilters,
        resetFilters,
        selectedBook,
        setSelectedBook,
        selectedAuthor,
        setSelectedAuthor,
        selectedGalleryItem,
        setSelectedGalleryItem,
        getBookById,
        getAuthorById,
        getBooksByAuthor,
        getRelatedBooks,
        setBooks
      }}
    >
      {children}
    </BookContext.Provider>
  );
}

export function useBooks() {
  const context = useContext(BookContext);
  if (!context) {
    throw new Error('useBooks must be used within a BookProvider');
  }
  return context;
}
