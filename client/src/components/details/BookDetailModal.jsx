import React, { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { useBooks } from '../../context/BookContext.jsx';
import { ImageWithFallback } from '../common/ImageWithFallback.jsx';
import { Icon } from '../common/Icon.jsx';
import { getLanguageBadgeStyle, getReadingLevelBadgeStyle } from '../../utils/formatters.js';

export function BookDetailModal({ book, onClose, onSelectAuthor, onSelectRelatedBook, onOpenReader }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getBookProgress, setStatusOnly, updateProgress } = useReadingTracker();
  const { getRelatedBooks } = useBooks();

  if (!book) return null;

  const bookId = book._id || book.id;
  const favorited = isFavorite(bookId);
  const progress = getBookProgress(bookId);
  const relatedBooks = getRelatedBooks(book, 4);

  const [inputPage, setInputPage] = useState(progress?.currentPage || 0);
  const [showProgressInput, setShowProgressInput] = useState(false);
  const [progressMsg, setProgressMsg] = useState('');

  const langStyle = getLanguageBadgeStyle(book.language);
  const levelStyle = getReadingLevelBadgeStyle(book.readingLevel);

  const handleSaveProgress = async () => {
    const res = await updateProgress(bookId, inputPage, 3);
    if (!res.success) {
      setProgressMsg(res.message);
    } else {
      setProgressMsg('Updated reading progress successfully!');
      setTimeout(() => setProgressMsg(''), 2500);
      setShowProgressInput(false);
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Book Details for ${book.title}`}
    >
      <div
        className="modal-content p-6 sm:p-8 max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Bar with Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="uppercase tracking-widest font-bold text-amber-500">
              Archival Catalog Record
            </span>
            <span>•</span>
            <span>ID: {bookId}</span>
          </div>
          <button
            onClick={onClose}
            className="btn-icon w-9 h-9 text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800 transition-colors"
            title="Close (Esc)"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Two-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 py-6">
          {/* Left Column (5 cols): Media & Action */}
          <div className="md:col-span-5 space-y-5">
            <div className="relative aspect-[2/3] w-full max-w-[280px] mx-auto rounded-2xl overflow-hidden shadow-2xl bg-slate-950">
              <ImageWithFallback
                src={book.coverImage}
                alt={book.title}
                title={book.title}
                author={book.authorName}
                className="w-full h-full object-cover"
              />
              <button
                onClick={() => toggleFavorite(bookId)}
                className={`absolute top-3 right-3 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md shadow-md transition-all ${
                  favorited
                    ? 'bg-rose-500 text-white'
                    : 'bg-slate-900/70 text-white hover:bg-slate-900'
                }`}
                title={favorited ? 'Remove Bookmark' : 'Add to Bookmarks'}
              >
                <Icon name={favorited ? 'favorite' : 'bookmark_add'} />
              </button>
            </div>

            {/* Primary Online Reader CTA Button */}
            <button
              type="button"
              onClick={() => {
                if (onOpenReader) {
                  onOpenReader(book);
                }
              }}
              className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 cursor-pointer"
            >
              <Icon name="auto_stories" className="text-[18px]" />
              <span>{progress?.currentPage > 0 ? `Tiếp tục đọc (Trang ${progress.currentPage})` : 'Đọc Trực Tuyến & Ghi Nhật Ký'}</span>
            </button>

            {/* Reading Tracker Action */}
            <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700/60 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold uppercase tracking-wider text-slate-400">
                  Reading Status
                </span>
                <span className="font-semibold text-amber-600 dark:text-amber-400">
                  {progress?.status || 'Not in library'}
                </span>
              </div>

              {/* Status Switcher Buttons */}
              <div className="grid grid-cols-3 gap-1.5">
                {['To Read', 'Reading', 'Completed'].map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusOnly(bookId, st, book.pageCount)}
                    className={`py-1.5 px-2 rounded-lg text-xs font-semibold transition-all ${
                      progress?.status === st
                        ? 'bg-amber-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>

              {/* Progress Bar & Update Button */}
              {progress && (
                <div className="pt-2 space-y-2 border-t border-slate-200 dark:border-slate-700">
                  <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                    <span>Pages Read</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {Math.min(progress.currentPage, 3)} / 3 ({progress.percentage}%)
                    </span>
                  </div>
                  <div className="progress-bar-track">
                    <div
                      className="progress-bar-fill"
                      style={{ width: `${progress.percentage}%` }}
                    />
                  </div>

                  {showProgressInput ? (
                    <div className="pt-2 space-y-2">
                      <div className="flex items-center gap-2">
                        <input
                          type="number"
                          min="0"
                          max={3}
                          value={inputPage}
                          onChange={(e) => setInputPage(e.target.value)}
                          className="w-24 px-2 py-1 text-xs rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"
                        />
                        <button
                          onClick={handleSaveProgress}
                          className="px-3 py-1 bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 rounded text-xs font-semibold"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setShowProgressInput(false)}
                          className="text-xs text-slate-400 hover:text-slate-600"
                        >
                          Cancel
                        </button>
                      </div>
                      {progressMsg && (
                        <p className="text-[11px] text-amber-500">{progressMsg}</p>
                      )}
                    </div>
                  ) : (
                    <button
                      onClick={() => setShowProgressInput(true)}
                      className="w-full text-center text-xs text-amber-600 dark:text-amber-400 font-semibold hover:underline pt-1"
                    >
                      ✏️ Update Current Page
                    </button>
                  )}
                </div>
              )}
            </div>

            {/* Metadata Table */}
            <div className="bg-slate-50 dark:bg-slate-800/40 p-4 rounded-xl border border-slate-100 dark:border-slate-800 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">ISBN:</span>
                <span className="font-medium">{book.isbn || 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Original Language:</span>
                <span className="font-medium">{book.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Publication Year:</span>
                <span className="font-medium">{book.publicationYear}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Total Pages:</span>
                <span className="font-medium">{book.pageCount} pages</span>
              </div>
            </div>
          </div>

          {/* Right Column (7 cols): Deep Content */}
          <div className="md:col-span-7 space-y-5">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <span className={`badge ${langStyle.bg}`}>
                  {langStyle.tag}
                </span>
                <span className={`badge ${levelStyle.bg}`}>
                  {levelStyle.label}
                </span>
                <span className="badge bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {book.genre}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
                {book.title}
              </h2>

              <button
                onClick={() => {
                  onClose();
                  onSelectAuthor && onSelectAuthor(book.authorId);
                }}
                className="inline-flex items-center gap-1.5 text-base font-semibold text-amber-600 dark:text-amber-400 hover:underline mt-1.5"
              >
                <Icon name="person" className="text-[18px]" />
                <span>By {book.authorName}</span>
              </button>
            </div>

            {/* Synopsis */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Synopsis & Archival Critique
              </h4>
              <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300 font-normal bg-slate-50 dark:bg-slate-800/30 p-4 rounded-xl border border-slate-100 dark:border-slate-800">
                {book.synopsis}
              </p>
            </div>

            {/* Themes */}
            {book.themes && book.themes.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Core Philosophical & Literary Themes
                </h4>
                <div className="flex flex-wrap gap-2">
                  {book.themes.map((theme, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-full text-xs font-medium bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800/40"
                    >
                      #{theme}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Target Audience */}
            {book.targetAudience && (
              <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 pt-2">
                <Icon name="groups" className="text-[16px] text-amber-500" />
                <span>
                  <strong>Suitable Audience:</strong> {book.targetAudience}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Section: Related Books */}
        {relatedBooks.length > 0 && (
          <div className="pt-6 mt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <h4 className="font-display text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Icon name="recommend" className="text-amber-500" />
              <span>Related Scholarly Works</span>
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {relatedBooks.map((relBook) => (
                <div
                  key={relBook._id || relBook.id}
                  onClick={() => onSelectRelatedBook(relBook)}
                  className="bb-card group cursor-pointer p-2.5 bg-slate-50 dark:bg-slate-800/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  <div className="aspect-[2/3] w-full rounded-lg overflow-hidden mb-2 bg-slate-900">
                    <ImageWithFallback
                      src={relBook.coverImage}
                      alt={relBook.title}
                      title={relBook.title}
                      author={relBook.authorName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
                    {relBook.title}
                  </p>
                  <p className="text-[11px] text-slate-400 truncate">
                    {relBook.authorName}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default BookDetailModal;
