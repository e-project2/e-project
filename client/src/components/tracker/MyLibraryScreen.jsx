import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { ImageWithFallback } from '../common/ImageWithFallback.jsx';
import { ReadingProgressModal } from './ReadingProgressModal.jsx';
import { Icon } from '../common/Icon.jsx';

export function MyLibraryScreen({ onNavigate, onSelectBook }) {
  const { books } = useBooks();
  const { favorites, removeFavorite } = useFavorites();
  const { tracker, stats, setStatusOnly, clearProgress, removeFromTracker } = useReadingTracker();

  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'READING' | 'COMPLETED' | 'TO_READ'
  const [modalBook, setModalBook] = useState(null);

  // Combine books that are either in favorites OR tracked
  const libraryBookIds = Array.from(new Set([...favorites, ...Object.keys(tracker)]));

  const libraryBooks = libraryBookIds
    .map(id => books.find(b => b._id === id || b.id === id))
    .filter(Boolean);

  const filteredLibrary = libraryBooks.filter((book) => {
    const bookId = book._id || book.id;
    const progress = tracker[bookId];
    const status = progress?.status || (favorites.includes(bookId) ? 'To Read' : 'To Read');

    if (activeTab === 'ALL') return true;
    if (activeTab === 'READING') return status === 'Reading';
    if (activeTab === 'COMPLETED') return status === 'Completed';
    if (activeTab === 'TO_READ') return status === 'To Read';
    return true;
  });

  const handleRemove = (bookId) => {
    removeFavorite(bookId);
    removeFromTracker(bookId);
  };

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-blue-50/50 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="bookmark_heart" className="text-[16px]" />
            <span>Personal Reading Sanctuary</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            My Library & Reading Tracker
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Manage your personal literary collection and monitor reading velocity with local privacy preservation. No external accounts required.
          </p>
        </div>
      </div>

      <div className="bb-container py-8 space-y-8">
        {/* Statistics Bar (4 Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Icon name="collections_bookmark" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Total Saved
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {libraryBooks.length}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Icon name="auto_stories" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Currently Reading
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.readingCount}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <Icon name="task_alt" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Completed
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.completedCount}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-50 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center">
              <Icon name="schedule" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                To Read
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.toReadCount}
              </span>
            </div>
          </div>
        </div>

        {/* Tab Bar Switcher */}
        <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 max-w-md">
          {[
            { id: 'ALL', label: 'All Saved' },
            { id: 'READING', label: 'Reading' },
            { id: 'COMPLETED', label: 'Completed' },
            { id: 'TO_READ', label: 'To Read' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all text-center ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Library Content */}
        {filteredLibrary.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Icon name="menu_book" className="text-[32px]" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              Your Reading List is Empty
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              You haven't added any books to this category yet. Start exploring the directory and bookmark titles you love!
            </p>
            <button
              onClick={() => onNavigate('directory')}
              className="btn btn-primary text-xs py-2.5 px-6 shadow-sm"
            >
              <Icon name="explore" />
              <span>Discover Books Now</span>
            </button>
          </div>
        ) : (
          /* List of Library Cards */
          <div className="space-y-4">
            {filteredLibrary.map((book) => {
              const bookId = book._id || book.id;
              const progress = tracker[bookId] || {
                status: 'To Read',
                currentPage: 0,
                totalPages: book.pageCount,
                percentage: 0
              };

              return (
                <div
                  key={bookId}
                  className="bb-card p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all"
                >
                  {/* Left: Book Media & Info */}
                  <div
                    onClick={() => onSelectBook(book)}
                    className="flex items-center gap-4 cursor-pointer flex-1 min-w-0"
                  >
                    <div className="w-16 h-24 sm:w-20 sm:h-28 rounded-xl overflow-hidden shadow-md shrink-0 bg-slate-950">
                      <ImageWithFallback
                        src={book.coverImage}
                        alt={book.title}
                        title={book.title}
                        author={book.authorName}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                        {book.genre} • {book.language}
                      </span>
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 truncate">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">
                        By {book.authorName} • {book.pageCount} pages total
                      </p>
                    </div>
                  </div>

                  {/* Center: Reading Status & Progress */}
                  <div className="w-full md:w-72 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        {['To Read', 'Reading', 'Completed'].map((st) => (
                          <button
                            key={st}
                            onClick={() => setStatusOnly(bookId, st, book.pageCount)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                              progress.status === st
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {progress.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{progress.currentPage} / {book.pageCount} pages read</span>
                      <button
                        onClick={() => clearProgress(bookId)}
                        className="hover:text-rose-500 transition-colors"
                        title="Reset reading progress to 0"
                      >
                        Reset
                      </button>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center">
                    <button
                      onClick={() => setModalBook(book)}
                      className="btn btn-primary text-xs py-2 px-3.5"
                    >
                      <Icon name="edit" className="text-[14px]" />
                      <span>Log Pages</span>
                    </button>
                    <button
                      onClick={() => handleRemove(bookId)}
                      className="btn-icon w-9 h-9 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Remove from library"
                    >
                      <Icon name="delete" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reading Progress Modal */}
      {modalBook && (
        <ReadingProgressModal
          book={modalBook}
          onClose={() => setModalBook(null)}
        />
      )}
    </div>
  );
}

export default MyLibraryScreen;
