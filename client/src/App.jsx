import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider, useAuth } from './context/AuthContext.jsx';
import { BookProvider, useBooks } from './context/BookContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ReadingTrackerProvider } from './context/ReadingTrackerContext.jsx';

import { Navbar } from './components/common/Navbar.jsx';
import { Footer } from './components/common/Footer.jsx';
import { Breadcrumbs } from './components/common/Breadcrumbs.jsx';

import { HomeScreen } from './components/home/HomeScreen.jsx';
import { DirectoryScreen } from './components/directory/DirectoryScreen.jsx';
import { CollectionsScreen } from './components/collections/CollectionsScreen.jsx';
import { MyLibraryScreen } from './components/tracker/MyLibraryScreen.jsx';
import { AboutMission } from './components/AboutMission.jsx';
import { ContactScreen } from './components/contact/ContactScreen.jsx';
import { AdminScreen } from './components/admin/AdminScreen.jsx';

import { BookDetailScreen } from './components/details/BookDetailScreen.jsx';
import { AuthorDetailScreen } from './components/authors/AuthorDetailScreen.jsx';
import { LoginScreen } from './components/auth/LoginScreen.jsx';
import { AdminBookEditorScreen } from './components/admin/AdminBookEditorScreen.jsx';
import { AdminAuthorEditorScreen } from './components/admin/AdminAuthorEditorScreen.jsx';
import { BookReaderModal } from './components/reader/BookReaderModal.jsx';

function MainLayout() {
  const { isAuthenticated, isAdmin } = useAuth();
  const [activeRoute, setActiveRoute] = useState('home');
  const [readingBook, setReadingBook] = useState(null);
  const [adminEditBook, setAdminEditBook] = useState(null);
  const [adminEditAuthor, setAdminEditAuthor] = useState(null);

  const {
    books,
    authors,
    selectedBook,
    setSelectedBook,
    selectedAuthor,
    setSelectedAuthor,
    getBookById,
    getAuthorById
  } = useBooks();


  const handleNavigate = (routeId) => {
    setActiveRoute(routeId);
    if (routeId !== 'book-detail' && routeId !== 'author-detail') {
      if (window.location.hash) {
        try {
          window.history.pushState(null, '', window.location.pathname);
        } catch (e) {}
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBook = (book) => {
    if (!book) return;
    setSelectedBook(book);
    setActiveRoute('book-detail');
    const bId = book._id || book.id;
    if (bId) {
      window.location.hash = `book/${bId}`;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectAuthor = (authorIdOrObj) => {
    let author = authorIdOrObj;
    if (typeof authorIdOrObj === 'string') {
      author = getAuthorById(authorIdOrObj);
    }
    if (author) {
      setSelectedAuthor(author);
      setActiveRoute('author-detail');
      const aId = author._id || author.id;
      if (aId) {
        window.location.hash = `author/${aId}`;
      }
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenAdminBookEditor = (bookToEdit) => {
    setAdminEditBook(bookToEdit);
    setActiveRoute('admin-book-editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenAdminAuthorEditor = (authorToEdit) => {
    setAdminEditAuthor(authorToEdit);
    setActiveRoute('admin-author-editor');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Listen for direct URL hash routing (e.g. #book/bk-03 or #author/auth-02)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      if (!hash) return;
      if (hash.startsWith('book/')) {
        const id = hash.replace('book/', '');
        const found = getBookById(id);
        if (found) {
          setSelectedBook(found);
          setActiveRoute('book-detail');
        }
      } else if (hash.startsWith('author/')) {
        const id = hash.replace('author/', '');
        const found = getAuthorById(id);
        if (found) {
          setSelectedAuthor(found);
          setActiveRoute('author-detail');
        }
      }
    };

    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [books, getBookById, getAuthorById]);

  // Route Guard: Mandatory authentication before accessing Home or any app feature
  if (!isAuthenticated) {
    return (
      <LoginScreen
        onLoginSuccess={() => {
          setActiveRoute('home');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  const getBreadcrumbs = () => {
    const base = [{ label: 'Home', onClick: () => handleNavigate('home') }];

    switch (activeRoute) {
      case 'directory':
        return [...base, { label: 'Books Directory' }];
      case 'collections':
        return [...base, { label: 'Featured Collections' }];
      case 'my-library':
        return [...base, { label: 'My Library & Reading Tracker' }];
      case 'about':
        return [...base, { label: 'About BookBridge' }];
      case 'contact':
        return [...base, { label: 'Contact Us' }];
      case 'admin':
        return [...base, { label: 'Admin Desk' }];
      case 'admin-book-editor':
        return [
          ...base,
          { label: 'Admin Console', onClick: () => handleNavigate('admin') },
          { label: 'Book Record Editor' }
        ];
      case 'admin-author-editor':
        return [
          ...base,
          { label: 'Admin Console', onClick: () => handleNavigate('admin') },
          { label: 'Author Dossier Editor' }
        ];
      default:
        return null;
    }
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen flex flex-col bg-surface dark:bg-slate-950 text-slate-900 dark:text-slate-100 font-body">
      {/* Top Navbar */}
      <Navbar activeRoute={activeRoute} onNavigate={handleNavigate} />

      {/* Main Body */}
      <main className="flex-1 pt-20">
        {/* Breadcrumb banner if not on home, about, book-detail, author-detail, or admin editors */}
        {breadcrumbs &&
          activeRoute !== 'home' &&
          activeRoute !== 'about' &&
          activeRoute !== 'book-detail' &&
          activeRoute !== 'author-detail' &&
          activeRoute !== 'admin-book-editor' &&
          activeRoute !== 'admin-author-editor' && (
            <div className="bb-container">
              <Breadcrumbs items={breadcrumbs} onBack={() => handleNavigate('home')} />
            </div>
          )}

        {/* Dynamic Route Views */}
        {activeRoute === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            onSelectAuthor={handleSelectAuthor}
            onOpenReader={(b) => setReadingBook(b)}
          />
        )}

        {activeRoute === 'directory' && (
          <DirectoryScreen
            onSelectBook={handleSelectBook}
            onSelectAuthor={handleSelectAuthor}
            onOpenReader={(b) => setReadingBook(b)}
          />
        )}

        {activeRoute === 'collections' && (
          <CollectionsScreen
            onSelectBook={handleSelectBook}
            onSelectAuthor={handleSelectAuthor}
            onOpenReader={(b) => setReadingBook(b)}
          />
        )}


        {activeRoute === 'my-library' && (
          <MyLibraryScreen
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            onOpenReader={(b) => setReadingBook(b)}
          />
        )}

        {activeRoute === 'about' && (
          <AboutMission
            onNavigate={handleNavigate}
            showHeader={false}
            showFooter={false}
          />
        )}

        {activeRoute === 'contact' && <ContactScreen />}

        {activeRoute === 'admin' && (
          <AdminScreen
            onNavigate={handleNavigate}
            onEditBook={handleOpenAdminBookEditor}
            onEditAuthor={handleOpenAdminAuthorEditor}
          />
        )}

        {/* Dedicated Standalone Book Detail Page */}
        {activeRoute === 'book-detail' && selectedBook && (
          <BookDetailScreen
            book={selectedBook}
            onNavigate={handleNavigate}
            onSelectAuthor={handleSelectAuthor}
            onSelectRelatedBook={handleSelectBook}
            onOpenReader={(b) => setReadingBook(b)}
            onEditAdmin={handleOpenAdminBookEditor}
          />
        )}

        {/* Dedicated Standalone Author Detail Page */}
        {activeRoute === 'author-detail' && selectedAuthor && (
          <AuthorDetailScreen
            author={selectedAuthor}
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            onEditAdmin={handleOpenAdminAuthorEditor}
          />
        )}

        {/* Dedicated Admin Book Record Editor (Stitch Design) */}
        {activeRoute === 'admin-book-editor' && (
          <AdminBookEditorScreen
            book={adminEditBook || selectedBook || books[0]}
            onNavigate={handleNavigate}
            onPreviewBook={handleSelectBook}
          />
        )}

        {/* Dedicated Admin Author Dossier Editor (Stitch Design) */}
        {activeRoute === 'admin-author-editor' && (
          <AdminAuthorEditorScreen
            author={adminEditAuthor || selectedAuthor || authors[0]}
            onNavigate={handleNavigate}
            onPreviewAuthor={handleSelectAuthor}
          />
        )}
      </main>

      {/* Global Modals - Reader */}
      {readingBook && (
        <BookReaderModal
          book={readingBook}
          onClose={() => setReadingBook(null)}
        />
      )}

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

export function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BookProvider>
          <FavoritesProvider>
            <ReadingTrackerProvider>
              <MainLayout />
            </ReadingTrackerProvider>
          </FavoritesProvider>
        </BookProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
