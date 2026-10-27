import React, { useState } from 'react';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { Icon } from './common/Icon.jsx';

/**
 * BookCard Component
 * 
 * Editorial card component adhering to BookBridge Stitch Design System.
 * 
 * @param {Object} props
 * @param {Object} props.book - Book metadata object
 * @param {string} props.book.title - Title of the book
 * @param {string} [props.book.author] - Author name
 * @param {string} [props.book.authorName] - Alternate author name field
 * @param {string} [props.book.coverImage] - URL of book cover image
 * @param {string} [props.book.genre] - Book literary genre
 * @param {number} [props.book.rating] - Book rating (e.g. 4.8)
 * @param {number|string} [props.book.publicationYear] - Publication year
 * @param {string} [props.book.language] - Language code or name
 * @param {string} [props.book.readingLevel] - Difficulty / reading level
 * @param {boolean} [props.book.isFeatured] - Whether it is a featured / staff pick
 * @param {function} [props.onSelect] - Callback when clicking the card or view details
 * @param {function} [props.onBookmark] - Callback when toggling bookmark
 * @param {function} [props.onAddToCart] - Callback when clicking add to cart / purchase
 */
export function BookCard({
  book = {},
  onSelect,
  onSelectBook,
  onSelectAuthor,
  onBookmark,
  onAddToCart,
  onRead,
  className = ''
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const bookId = book._id || book.id;
  const isBookmarked = isFavorite(bookId);
  const handleSelectCallback = onSelect || onSelectBook;
  const [imageError, setImageError] = useState(false);

  // Destructure book properties with safe fallbacks
  const {
    title = 'Untitled Book',
    author,
    authorName,
    coverImage,
    genre,
    rating = 4.8,
    publicationYear,
    language,
    pageCount,
    isFeatured
  } = book || {};

  const displayAuthor = author || authorName || 'Unknown Author';

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    toggleFavorite(bookId);
    if (onBookmark) {
      onBookmark(book, !isBookmarked);
    }
  };

  const handleCardClick = () => {
    if (handleSelectCallback) {
      handleSelectCallback(book);
    }
  };

  const handleActionClick = (e) => {
    e.stopPropagation();
    if (handleSelectCallback) {
      handleSelectCallback(book);
    } else if (onAddToCart) {
      onAddToCart(book);
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className={`group relative flex flex-col h-full bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-amber-500/40 hover:-translate-y-2 transition-all duration-300 ease-out cursor-pointer select-none ${className}`}
    >
      {/* ================= Media & Cover Container ================= */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        {/* Cover Image or Fallback */}
        {coverImage && !imageError ? (
          <img
            src={coverImage.startsWith('/images/') && coverImage.endsWith('.jpg') ? coverImage.replace(/\.jpg$/, '.svg') : coverImage}
            alt={title}
            onError={() => setImageError(true)}
            loading="lazy"
            className="w-full h-full object-cover transform group-hover:scale-108 group-hover:rotate-0.5 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="relative w-full h-full flex flex-col justify-between p-5 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white">
            <div className="absolute inset-2 border border-amber-500/20 rounded pointer-events-none" />
            <div className="relative z-10">
              <span className="text-[10px] uppercase tracking-widest text-amber-400 font-semibold block mb-1">
                BookBridge Archive
              </span>
              <h4 className="font-display text-sm font-bold line-clamp-3 leading-snug text-slate-100">
                {title}
              </h4>
            </div>
            <div className="relative z-10 pt-2 border-t border-slate-700/50">
              <p className="text-xs text-slate-300 font-medium truncate">
                {displayAuthor}
              </p>
            </div>
          </div>
        )}

        {/* Ambient Dark Gradient for readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-300 pointer-events-none" />

        {/* Floating Badges (Top Left) */}
        <div className="absolute top-3 left-3 flex flex-wrap items-center gap-1.5 z-10 pointer-events-none">
          {language && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-200 backdrop-blur-md shadow-sm">
              {language}
            </span>
          )}
          {isFeatured && (
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide bg-amber-500 text-slate-950 shadow-sm backdrop-blur-md">
              Staff Pick
            </span>
          )}
        </div>

        {/* Wishlist / Bookmark Toggle Button (Top Right) */}
        <button
          type="button"
          onClick={handleBookmarkClick}
          aria-label={isBookmarked ? `Remove ${title} from bookmarks` : `Bookmark ${title}`}
          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-200 shadow-md z-10 transform hover:scale-110 active:scale-90 cursor-pointer ${isBookmarked
            ? 'bg-rose-500 text-white shadow-rose-500/30'
            : 'bg-white/90 dark:bg-slate-900/80 text-slate-700 dark:text-slate-300 hover:text-rose-500 dark:hover:text-rose-400'
            }`}
          title={isBookmarked ? 'Bỏ yêu thích' : 'Thêm vào yêu thích (Thư viện cá nhân)'}
        >
          <Icon
            name={isBookmarked ? 'favorite' : 'bookmark_add'}
            className="text-[18px]"
          />
        </button>

        {/* Quick View & Read Buttons (Revealed on Hover) */}
        <div className="absolute inset-x-3 bottom-3 z-10 flex items-center gap-2 opacity-0 group-hover:opacity-100 translate-y-3 group-hover:translate-y-0 transition-all duration-300 ease-out">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (onRead) onRead(book);
              else if (handleSelectCallback) handleSelectCallback(book);
            }}
            className="flex-1 py-2 px-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs text-center backdrop-blur-md shadow-lg flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            title="Đọc trực tiếp sách này"
          >
            <Icon name="auto_stories" className="text-[15px]" />
            <span>Đọc sách</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              if (handleSelectCallback) handleSelectCallback(book);
            }}
            className="py-2 px-2.5 rounded-xl bg-white/95 dark:bg-slate-900/95 text-slate-800 dark:text-slate-200 font-semibold text-xs text-center backdrop-blur-md shadow-lg border border-white/20 flex items-center justify-center hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            title="Xem chi tiết"
          >
            <Icon name="visibility" className="text-[15px]" />
          </button>
        </div>
      </div>

      {/* ================= Metadata & Content Body ================= */}
      <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow space-y-4">
        <div className="space-y-1.5">
          {/* Genre & Rating Row */}
          <div className="flex items-center justify-between gap-2 text-xs">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 truncate">
              {genre || 'Universal Archive'}
            </span>
            {rating && (
              <span className="flex items-center gap-1 font-bold text-amber-500 text-xs shrink-0">
                <Icon name="star" className="text-[14px]" style={{ fontVariationSettings: "'FILL' 1" }} />
                <span>{rating}</span>
              </span>
            )}
          </div>

          {/* Book Title */}
          <h3
            className="font-display text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 line-clamp-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors duration-200"
            title={title}
          >
            {title}
          </h3>

          {/* Author Name */}
          <p
            onClick={(e) => {
              if (onSelectAuthor && (book.authorId || book.author)) {
                e.stopPropagation();
                onSelectAuthor(book.authorId || book.author);
              }
            }}
            className={`text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium truncate flex items-center gap-1 transition-colors ${onSelectAuthor ? 'hover:text-amber-600 dark:hover:text-amber-400 hover:underline cursor-pointer' : 'group-hover:text-slate-700 dark:group-hover:text-slate-300'
              }`}
            title={onSelectAuthor ? `View author dossier for ${displayAuthor}` : displayAuthor}
          >
            <span>{displayAuthor}</span>
            {onSelectAuthor && (
              <Icon name="person" className="text-[13px] text-amber-500/70" />
            )}
          </p>

          {/* Extra Bibliographic Info */}
          {(publicationYear || pageCount) && (
            <div className="flex items-center gap-2.5 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
              {publicationYear && (
                <span className="flex items-center gap-1">
                  <Icon name="event" className="text-[13px]" />
                  <span>{publicationYear}</span>
                </span>
              )}
              {publicationYear && pageCount && <span>•</span>}
              {pageCount && (
                <span className="flex items-center gap-1">
                  <Icon name="menu_book" className="text-[13px]" />
                  <span>{pageCount} p.</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* ================= Action Footer ================= */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-3">

          {/* Action CTA Button */}
          <button
            type="button"
            onClick={handleActionClick}
            className="py-2 px-3.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all duration-200 shadow-sm active:scale-95"
          >
            <span>Details</span>
            <Icon name="arrow_forward" className="text-[14px] group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </article>
  );
}

export default BookCard;
