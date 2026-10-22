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
import { AboutMission } from './components/AboutMission.jsx';
import { BookCard } from './components/BookCard.jsx';
import { ContactScreen } from './components/contact/ContactScreen.jsx';
import { AdminScreen } from './components/admin/AdminScreen.jsx';

import { BookDetailModal } from './components/details/BookDetailModal.jsx';
import { AuthorProfileModal } from './components/authors/AuthorProfileModal.jsx';
import { AuthModal } from './components/auth/AuthModal.jsx';

function MainLayout() {
  const [activeRoute, setActiveRoute] = useState('home');
  const {
    books,
    selectedBook,
    setSelectedBook,
    selectedAuthor,
    setSelectedAuthor,
    getBookById,
    getAuthorById
  } = useBooks();

  const showcaseBooks = (books && books.length > 0 ? books.slice(0, 4) : []).map((b, idx) => ({
    ...b,
    price: b.price || [18.99, 14.50, 22.00, 16.75][idx] || 19.99
  }));

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
        {/* Breadcrumb banner if not on home or about page (AboutMission has its own Stitch breadcrumb) */}
        {breadcrumbs && activeRoute !== 'home' && activeRoute !== 'about' && (
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
          <div className="space-y-4">
            {/* Live Interactive BookCard Showcase */}
            <section className="bg-slate-50/90 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 py-10">
              <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
                  <div>
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider mb-2">
                      <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
                      Live Component • BookCard.jsx
                    </div>
                    <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                      Thẻ Sách BookCard (Stitch Design)
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                      Hiển thị dữ liệu động (title, author, price, coverImage) cùng hiệu ứng hover đẹp mắt.
                    </p>
                  </div>
                  <div className="text-xs text-slate-400 flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm">
                      Rê chuột lên thẻ để trải nghiệm hover effect
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {showcaseBooks.map((book) => (
                    <BookCard
                      key={book._id || book.id}
                      book={book}
                      onSelect={handleSelectBook}
                      onBookmark={(b, saved) => console.log('Bookmark toggled:', b.title, saved)}
                    />
                  ))}
                </div>
              </div>
            </section>

            <AboutMission
              onNavigate={handleNavigate}
              showHeader={false}
              showFooter={false}
            />
          </div>
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
