import React, { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { AuthProvider } from './context/AuthContext.jsx';
import { BookProvider, useBooks } from './context/BookContext.jsx';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { ReadingTrackerProvider } from './context/ReadingTrackerContext.jsx';

import { Navbar } from './components/common/Navbar.jsx';
import { Footer } from './components/common/Footer.jsx';
import { Breadcrumbs } from './components/common/Breadcrumbs.jsx';

import { HomeScreen } from './components/home/HomeScreen.jsx';
import { DirectoryScreen } from './components/directory/DirectoryScreen.jsx';
import { ExplorerScreen } from './components/explorer/ExplorerScreen.jsx';
import { CollectionsScreen } from './components/collections/CollectionsScreen.jsx';
import { GalleryScreen } from './components/gallery/GalleryScreen.jsx';
import { MyLibraryScreen } from './components/tracker/MyLibraryScreen.jsx';
import { AboutScreen } from './components/about/AboutScreen.jsx';
import { ContactScreen } from './components/contact/ContactScreen.jsx';
import { AdminScreen } from './components/admin/AdminScreen.jsx';

import { BookDetailModal } from './components/details/BookDetailModal.jsx';
import { AuthorProfileModal } from './components/authors/AuthorProfileModal.jsx';
import { AuthModal } from './components/auth/AuthModal.jsx';

function MainLayout() {
  const [activeRoute, setActiveRoute] = useState('home');
  const {
    selectedBook,
    setSelectedBook,
    selectedAuthor,
    setSelectedAuthor,
    getBookById,
    getAuthorById
  } = useBooks();

  const handleNavigate = (routeId) => {
    setActiveRoute(routeId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectBook = (book) => {
    setSelectedBook(book);
  };

  const handleSelectAuthor = (authorId) => {
    const author = getAuthorById(authorId);
    if (author) {
      setSelectedAuthor(author);
    }
  };

  const getBreadcrumbs = () => {
    const base = [{ label: 'Home', onClick: () => handleNavigate('home') }];

    switch (activeRoute) {
      case 'directory':
        return [...base, { label: 'Books Directory' }];
      case 'explorer':
        return [...base, { label: 'Language & Genre Explorer' }];
      case 'collections':
        return [...base, { label: 'Featured Collections' }];
      case 'gallery':
        return [...base, { label: 'Interactive Gallery' }];
      case 'my-library':
        return [...base, { label: 'My Library & Reading Tracker' }];
      case 'about':
        return [...base, { label: 'About BookBridge' }];
      case 'contact':
        return [...base, { label: 'Contact Us' }];
      case 'admin':
        return [...base, { label: 'Admin Desk' }];
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
        {/* Breadcrumb banner if not on home page */}
        {breadcrumbs && activeRoute !== 'home' && (
          <div className="bb-container">
            <Breadcrumbs items={breadcrumbs} onBack={() => handleNavigate('home')} />
          </div>
        )}

        {/* Dynamic Route View */}
        {activeRoute === 'home' && (
          <HomeScreen
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
            onSelectAuthor={handleSelectAuthor}
          />
        )}

        {activeRoute === 'directory' && (
          <DirectoryScreen
            onSelectBook={handleSelectBook}
            onSelectAuthor={handleSelectAuthor}
          />
        )}

        {activeRoute === 'explorer' && (
          <ExplorerScreen
            onSelectBook={handleSelectBook}
            onSelectAuthor={handleSelectAuthor}
          />
        )}

        {activeRoute === 'collections' && (
          <CollectionsScreen
            onSelectBook={handleSelectBook}
            onSelectAuthor={handleSelectAuthor}
          />
        )}

        {activeRoute === 'gallery' && (
          <GalleryScreen onSelectBook={handleSelectBook} />
        )}

        {activeRoute === 'my-library' && (
          <MyLibraryScreen
            onNavigate={handleNavigate}
            onSelectBook={handleSelectBook}
          />
        )}

        {activeRoute === 'about' && (
          <AboutScreen onNavigate={handleNavigate} />
        )}

        {activeRoute === 'contact' && <ContactScreen />}

        {activeRoute === 'admin' && (
          <AdminScreen onNavigate={handleNavigate} />
        )}
      </main>

      {/* Global Modals */}
      {selectedBook && (
        <BookDetailModal
          book={selectedBook}
          onClose={() => setSelectedBook(null)}
          onSelectAuthor={handleSelectAuthor}
          onSelectRelatedBook={(b) => setSelectedBook(b)}
        />
      )}

      {selectedAuthor && (
        <AuthorProfileModal
          author={selectedAuthor}
          onClose={() => setSelectedAuthor(null)}
          onSelectBook={handleSelectBook}
        />
      )}

      <AuthModal />

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
