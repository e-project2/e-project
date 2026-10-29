import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useBooks } from '../context/BookContext.jsx';
import { Icon } from './common/Icon.jsx';

/**
 * BookLightboxModal
 * 
 * High-fidelity split-view Lightbox Modal based on Stitch Book Finder Web Design (8).
 * Left column: Book Cover Artwork Plate with prev/next navigation, zoom & archival preservation details.
 * Right column: Literary Information Panel with curatorial synopsis, metadata & CTAs.
 * Supports keyboard Left/Right arrows and on-screen arrow buttons to navigate books.
 */
export function BookLightboxModal({
  book,
  bookList,
  isOpen,
  onClose,
  onSelect,
  onSelectAuthor,
  onRead
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { books: contextBooks = [] } = useBooks();

  // Effective list of books for prev/next navigation
  const effectiveBooks = (bookList && bookList.length > 0)
    ? bookList
    : (contextBooks && contextBooks.length > 0)
      ? contextBooks
      : (book ? [book] : []);

  const totalBooks = effectiveBooks.length;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Sync current index when modal opens or initial book changes
  useEffect(() => {
    if (isOpen && book) {
      const idx = effectiveBooks.findIndex(
        b => String(b._id || b.id) === String(book._id || book.id)
      );
      setCurrentIndex(idx >= 0 ? idx : 0);
      setIsZoomed(false);
      setImageError(false);
    }
  }, [isOpen, book, effectiveBooks]);

  const activeBook = effectiveBooks[currentIndex] || book || {};
  const bookId = activeBook._id || activeBook.id;
  const isBookmarked = isFavorite(bookId);

  // Destructure active book metadata with fallbacks
  const {
    title = 'Untitled Book',
    subtitle,
    author,
    authorName,
    authorId,
    coverImage,
    genre = 'Classical Literature',
    rating = 4.8,
    publicationYear,
    language = 'Universal',
    readingLevel = 'Intermediate',
    pageCount,
    synopsis = 'A monumental work preserved in the BookBridge digital literature archive.',
    isbn,
    period = 'Classic',
    publisher,
    isFeatured
  } = activeBook;

  const displayAuthor = author || authorName || 'Unknown Author';

  // Get author initials for avatar
  const initials = displayAuthor
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0])
    .join('')
    .toUpperCase() || 'BB';

  const indexCode = isbn || (bookId ? `LIT-${String(bookId).toUpperCase()}` : 'LIT-ARCHIVE-SPECIMEN');

  // Navigation handlers
  const handlePrev = useCallback(() => {
    if (totalBooks <= 1) return;
    setCurrentIndex(prev => (prev - 1 + totalBooks) % totalBooks);
    setIsZoomed(false);
    setImageError(false);
  }, [totalBooks]);

  const handleNext = useCallback(() => {
    if (totalBooks <= 1) return;
    setCurrentIndex(prev => (prev + 1) % totalBooks);
    setIsZoomed(false);
    setImageError(false);
  }, [totalBooks]);

  // Lock body scroll and register keyboard navigation: Escape, ArrowLeft, ArrowRight
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        handleNext();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose, handlePrev, handleNext]);

  const handleToggleZoom = useCallback(() => {
    setIsZoomed(prev => !prev);
  }, []);

  const handleInspectFullDetails = useCallback(() => {
    onClose();
    if (onSelect) {
      onSelect(activeBook);
    }
  }, [onClose, onSelect, activeBook]);

  const handleAuthorClick = useCallback((e) => {
    e.stopPropagation();
    if (onSelectAuthor && (authorId || displayAuthor)) {
      onClose();
      onSelectAuthor(authorId || displayAuthor);
    }
  }, [onClose, onSelectAuthor, authorId, displayAuthor]);

  const handleBookmarkToggle = useCallback((e) => {
    e.stopPropagation();
    toggleFavorite(bookId);
  }, [toggleFavorite, bookId]);

  const handleReadClick = useCallback(() => {
    onClose();
    if (onRead) {
      onRead(activeBook);
    }
  }, [onClose, onRead, activeBook]);

  if (!isOpen || !activeBook) return null;

  const resolvedImage = coverImage && coverImage.startsWith('/images/') && coverImage.endsWith('.jpg')
    ? coverImage.replace(/\.jpg$/, '.svg')
    : coverImage;

  return createPortal(
    <div
      aria-label={`High-resolution inspection for ${title}`}
      aria-modal="true"
      role="dialog"
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 lg:p-8 bg-slate-950/80 backdrop-blur-md transition-opacity duration-300 animate-in fade-in"
    >
      {/* Central Modal Container (Split View) */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-5xl max-h-[92vh] flex flex-col bg-white dark:bg-slate-900 rounded-2xl shadow-[0_25px_60px_-15px_rgba(15,23,42,0.4)] border border-slate-200 dark:border-slate-800 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        {/* Universal Top Floating Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close Lightbox"
          title="Close Lightbox (Esc)"
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-white/90 dark:bg-slate-800/90 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 shadow-md border border-slate-200 dark:border-slate-700 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
        >
          <Icon name="close" className="text-[20px]" />
        </button>

        {/* Two-Column Split Layout Body */}
        <div className="grid grid-cols-1 lg:grid-cols-12 w-full overflow-hidden max-h-[92vh]">
          {/* ================= Left Column: Book Cover Artwork Plate ================= */}
          <div className="lg:col-span-5 xl:col-span-5 bg-gradient-to-b from-[#0e1726] to-[#091426] p-6 lg:p-8 flex flex-col justify-between items-center relative overflow-hidden select-none min-h-[380px] lg:min-h-full">
            {/* Ambient Art Glow Behind Plate */}
            <div className="absolute inset-0 bg-radial-gradient from-amber-500/10 via-transparent to-transparent pointer-events-none" />

            {/* Left Column Header: Archival Index & Zoom Control */}
            <div className="w-full flex items-center justify-between relative z-10 mb-4">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-amber-300 text-xs font-mono tracking-wide">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  {totalBooks > 1
                    ? `Plate ${String(currentIndex + 1).padStart(2, '0')} of ${String(totalBooks).padStart(2, '0')}`
                    : 'Archival Specimen'}
                </span>
                <span className="hidden sm:inline-block text-xs text-slate-400 font-mono">
                  300 DPI Preserved
                </span>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-white/10 backdrop-blur-md border border-white/15 rounded-lg p-1">
                <button
                  type="button"
                  onClick={() => setIsZoomed(false)}
                  title="Reset Zoom (100%)"
                  className="p-1 rounded text-slate-300 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
                >
                  <Icon name="fit_screen" className="text-[16px]" />
                </button>
                <button
                  type="button"
                  onClick={handleToggleZoom}
                  title="Toggle Zoom Scale"
                  className="flex items-center gap-1 px-2 py-0.5 rounded text-xs text-slate-200 font-mono hover:text-white transition-colors cursor-pointer"
                >
                  <Icon name={isZoomed ? 'zoom_out' : 'zoom_in'} className="text-[15px]" />
                  <span>{isZoomed ? '150%' : '100%'}</span>
                </button>
              </div>
            </div>

            {/* Center: Museum Matte Book Cover Plate with Navigation Arrows */}
            <div className="relative w-full flex-grow flex items-center justify-center my-auto py-3">
              {/* Previous Arrow Button */}
              {totalBooks > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  aria-label="Previous Book"
                  title="Cuốn trước đó (Phím mũi tên trái ←)"
                  className="absolute left-1 sm:left-2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Icon name="arrow_back" className="text-[22px]" />
                </button>
              )}

              {/* Cover Plate Container */}
              <div
                className={`relative z-10 max-h-[46vh] lg:max-h-[56vh] aspect-[2/3] p-2.5 sm:p-3 rounded-xl bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-md border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.6)] group transition-all duration-300 ${
                  isZoomed ? 'overflow-auto max-h-[60vh]' : 'overflow-hidden'
                }`}
              >
                <div className="relative w-full h-full overflow-hidden rounded-lg bg-slate-950 flex items-center justify-center">
                  {resolvedImage && !imageError ? (
                    <img
                      key={bookId}
                      src={resolvedImage}
                      alt={title}
                      onError={() => setImageError(true)}
                      onClick={handleToggleZoom}
                      className={`w-full h-full object-cover transform origin-center transition-transform duration-300 rounded-lg ${
                        isZoomed
                          ? 'scale-150 cursor-zoom-out'
                          : 'cursor-zoom-in group-hover:scale-105'
                      }`}
                    />
                  ) : (
                    <div
                      onClick={handleToggleZoom}
                      className="w-full h-full flex flex-col justify-between p-6 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white cursor-pointer select-none"
                    >
                      <div className="border border-amber-500/30 rounded p-4 flex flex-col justify-between h-full">
                        <div>
                          <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold block mb-2">
                            BookBridge Archival Master
                          </span>
                          <h4 className="font-display text-lg font-bold leading-snug text-slate-100">
                            {title}
                          </h4>
                        </div>
                        <div className="pt-3 border-t border-slate-700/60">
                          <p className="text-xs text-slate-300 font-medium">
                            {displayAuthor}
                          </p>
                          {publicationYear && (
                            <p className="text-[11px] text-amber-400/80 font-mono mt-0.5">
                              Est. {publicationYear}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Next Arrow Button */}
              {totalBooks > 1 && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  aria-label="Next Book"
                  title="Cuốn tiếp theo (Phím mũi tên phải →)"
                  className="absolute right-1 sm:right-2 z-20 w-11 h-11 rounded-full bg-black/50 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center backdrop-blur-md border border-white/20 shadow-xl transition-all duration-200 hover:scale-110 active:scale-95 cursor-pointer"
                >
                  <Icon name="arrow_forward" className="text-[22px]" />
                </button>
              )}
            </div>

            {/* Left Column Footer: Index code & Navigation Shortcut */}
            <div className="w-full flex items-center justify-between text-xs text-slate-400 pt-3 border-t border-white/10 relative z-10">
              <span className="font-mono text-[11px] truncate max-w-[180px]" title={indexCode}>
                {indexCode}
              </span>
              <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <span className="hidden sm:inline">Navigate:</span>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px]">←</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px]">→</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 border border-white/20 text-[10px]">ESC</kbd>
              </div>
            </div>
          </div>

          {/* ================= Right Column: Detailed Literary Information Panel ================= */}
          <div className="lg:col-span-7 xl:col-span-7 bg-white dark:bg-slate-900 flex flex-col justify-between overflow-y-auto max-h-[50vh] lg:max-h-[92vh] border-t lg:border-t-0 lg:border-l border-slate-200 dark:border-slate-800">
            <div className="p-6 lg:p-8 space-y-5">
              {/* 1. Archival Folio Header with badge */}
              <div className="flex items-center justify-between gap-3 pr-10">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-700/40 text-xs font-semibold shadow-xs">
                  <Icon name="auto_stories" className="text-[15px] text-amber-500" />
                  <span className="font-bold tracking-wider uppercase text-[11px]">
                    Archival Edition • {period || 'Universal Classic'} {publicationYear ? `• ${publicationYear}` : ''}
                  </span>
                </div>
                {isFeatured && (
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-amber-500 text-slate-950">
                    Staff Pick
                  </span>
                )}
              </div>

              {/* 2. Book Title & Subtitle */}
              <div className="space-y-1">
                <h2 className="font-display text-2xl lg:text-3xl font-bold text-slate-900 dark:text-slate-100 tracking-tight leading-snug">
                  {title}
                </h2>
                {subtitle && (
                  <p className="font-display text-sm italic text-amber-600 dark:text-amber-400 font-normal">
                    {subtitle}
                  </p>
                )}
              </div>

              {/* 3. Author Attribution with Avatar */}
              <div className="flex items-center justify-between py-2.5 border-y border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-slate-800 text-amber-900 dark:text-amber-300 flex items-center justify-center font-bold text-sm shadow-inner border border-amber-300/40 dark:border-amber-700/40">
                    {initials}
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase tracking-wider font-semibold">
                      Author / Contributor
                    </p>
                    <button
                      type="button"
                      onClick={handleAuthorClick}
                      className={`text-sm font-semibold text-slate-900 dark:text-slate-100 flex items-center gap-1 transition-colors ${
                        onSelectAuthor ? 'hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer' : ''
                      }`}
                    >
                      <span>{displayAuthor}</span>
                      {onSelectAuthor && (
                        <Icon name="open_in_new" className="text-[14px] text-slate-400" />
                      )}
                    </button>
                  </div>
                </div>

                {publicationYear && (
                  <span className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                    {publicationYear}
                  </span>
                )}
              </div>

              {/* 4. Badges: Genre, Language, Reading Level, Rating */}
              <div className="flex flex-wrap items-center gap-2">
                {genre && (
                  <span className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300 text-xs font-medium flex items-center gap-1.5 border border-indigo-200/50 dark:border-indigo-800/40">
                    <Icon name="psychology" className="text-[14px]" />
                    <span>{genre}</span>
                  </span>
                )}
                {language && (
                  <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-medium flex items-center gap-1.5">
                    <Icon name="translate" className="text-[14px]" />
                    <span>{language}</span>
                  </span>
                )}
                {readingLevel && (
                  <span className="px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-300 text-xs font-medium flex items-center gap-1.5 border border-emerald-200/50 dark:border-emerald-800/40">
                    <Icon name="school" className="text-[14px]" />
                    <span>{readingLevel}</span>
                  </span>
                )}
                {rating && (
                  <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-300 text-xs font-medium flex items-center gap-1.5 border border-amber-200/50 dark:border-amber-700/40">
                    <Icon name="star" className="text-[14px] text-amber-500" style={{ fontVariationSettings: "'FILL' 1" }} />
                    <span>{rating}</span>
                  </span>
                )}
              </div>

              {/* 5. Curatorial Synopsis & Art Commentary */}
              <div className="space-y-2 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-xl border border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2 text-slate-800 dark:text-slate-200 font-semibold text-xs tracking-wider uppercase">
                  <Icon name="palette" className="text-[16px] text-amber-500" />
                  <span>Curatorial Synopsis &amp; Art Commentary</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-4">
                  {synopsis}
                </p>
              </div>

              {/* 6. Metadata Specification Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                {pageCount && (
                  <div className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">
                      Volume / Pages
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-200">
                      {pageCount} Pages
                    </span>
                  </div>
                )}
                {indexCode && (
                  <div className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50">
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">
                      Catalog Code
                    </span>
                    <span className="font-mono text-slate-700 dark:text-slate-200 truncate block">
                      {indexCode}
                    </span>
                  </div>
                )}
                {publisher && (
                  <div className="p-2.5 rounded-lg bg-slate-100/70 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-700/50 col-span-2 sm:col-span-1">
                    <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">
                      Publisher
                    </span>
                    <span className="font-medium text-slate-700 dark:text-slate-200 truncate block">
                      {publisher}
                    </span>
                  </div>
                )}
              </div>

              {/* 7. Asset Provenance & Licensing */}
              <div className="p-3 rounded-lg bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800/40 text-xs flex items-start gap-2.5">
                <Icon name="verified_user" className="text-[18px] text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-0.5">
                  <span className="font-semibold text-slate-900 dark:text-slate-100 block">
                    Asset Provenance &amp; Licensing
                  </span>
                  <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                    Preservation digitization via Open Library Archive • Public Domain Worldwide • Approved for Non-commercial Scholarship.
                  </p>
                </div>
              </div>
            </div>

            {/* 8. Interactive Action Buttons (Fixed at bottom) */}
            <div className="p-5 lg:p-6 bg-slate-50 dark:bg-slate-900/90 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3">
              {/* Primary Action Button: Inspect Full Book Details */}
              <button
                type="button"
                onClick={handleInspectFullDetails}
                className="w-full sm:flex-1 py-3 px-5 rounded-full bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-white dark:text-slate-950 font-bold text-xs uppercase tracking-wider transition-colors shadow-md flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>Xem chi tiết sách</span>
                <Icon name="arrow_forward" className="text-[16px] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary Action: Save to My Library */}
              <button
                type="button"
                onClick={handleBookmarkToggle}
                className={`w-full sm:w-auto py-3 px-4 rounded-full border text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer ${
                  isBookmarked
                    ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-300 dark:border-rose-800 text-rose-600 dark:text-rose-400'
                    : 'bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700'
                }`}
                title={isBookmarked ? 'Bỏ lưu khỏi thư viện' : 'Lưu vào thư viện cá nhân'}
              >
                <Icon
                  name={isBookmarked ? 'favorite' : 'bookmark_add'}
                  className={`text-[18px] ${isBookmarked ? 'text-rose-500' : 'text-amber-500'}`}
                />
                <span>{isBookmarked ? 'Đã lưu' : 'Lưu thư viện'}</span>
              </button>

              {/* Read Book CTA (Optional if onRead available) */}
              {onRead && (
                <button
                  type="button"
                  onClick={handleReadClick}
                  className="w-full sm:w-auto py-3 px-4 rounded-full bg-amber-500/10 hover:bg-amber-500/20 text-amber-700 dark:text-amber-300 border border-amber-500/30 text-xs font-semibold transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  title="Đọc trực tiếp sách này"
                >
                  <Icon name="auto_stories" className="text-[18px]" />
                  <span>Đọc sách</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}

export default BookLightboxModal;
