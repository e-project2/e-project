import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiService } from '../services/apiService.js';

const BookContext = createContext();

export function BookProvider({ children }) {
  const [books, setBooks] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [collections, setCollections] = useState([]);
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(false);

  // Selected modals / active items
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

  // Fetch live collections and catalogue from MongoDB backend on mount
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
        console.error('Error connecting to BookBridge MongoDB backend:', err.message);
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

  const updateBookInState = (updatedBook) => {
    const id = updatedBook._id || updatedBook.id;
    setBooks(prev => prev.map(b => (b._id === id || b.id === id ? { ...b, ...updatedBook, id } : b)));
    setSelectedBook(prev => (prev && (prev._id === id || prev.id === id) ? { ...prev, ...updatedBook, id } : prev));
  };

  const updateAuthorInState = (updatedAuthor) => {
    const id = updatedAuthor._id || updatedAuthor.id;
    setAuthors(prev => prev.map(a => (a._id === id || a.id === id ? { ...a, ...updatedAuthor, id } : a)));
    setSelectedAuthor(prev => (prev && (prev._id === id || prev.id === id) ? { ...prev, ...updatedAuthor, id } : prev));
    // Also sync authorName into books
    if (updatedAuthor.name) {
      setBooks(prev => prev.map(b => (b.authorId === id ? { ...b, authorName: updatedAuthor.name } : b)));
    }
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
        setBooks,
        setAuthors,
        updateBookInState,
        updateAuthorInState
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
