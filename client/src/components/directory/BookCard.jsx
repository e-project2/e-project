import React from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { ImageWithFallback } from '../common/ImageWithFallback.jsx';
import { Icon } from '../common/Icon.jsx';
import { getLanguageBadgeStyle, getReadingLevelBadgeStyle } from '../../utils/formatters.js';

export function BookCard({ book, onSelectBook, onSelectAuthor }) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getBookProgress } = useReadingTracker();

  const bookId = book._id || book.id;
  const favorited = isFavorite(bookId);
  const progress = getBookProgress(bookId);
  const langStyle = getLanguageBadgeStyle(book.language);
  const levelStyle = getReadingLevelBadgeStyle(book.readingLevel);

  return (
    <div className="bb-card group flex flex-col justify-between h-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
      {/* Top Cover Media */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-slate-950">
        <ImageWithFallback
          src={book.coverImage}
          alt={book.title}
          title={book.title}
          author={book.authorName}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Floating Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-wrap gap-1.5 z-10 pointer-events-none">
          <span className={`badge ${langStyle.bg} shadow-sm backdrop-blur-md`}>
            {langStyle.tag}
          </span>
          {book.isFeatured && (
            <span className="badge bg-amber-500 text-white shadow-sm font-bold">
              Staff Pick
            </span>
          )}
        </div>

        {/* Bookmark Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(bookId);
          }}
          aria-label={favorited ? 'Remove from bookmarks' : 'Add to bookmarks'}
          className={`absolute top-2.5 right-2.5 w-9 h-9 rounded-full flex items-center justify-center backdrop-blur-md transition-all z-10 ${
            favorited
              ? 'bg-rose-500 text-white shadow-md scale-105'
              : 'bg-slate-900/60 text-white/90 hover:bg-slate-900 hover:text-white'
          }`}
          title={favorited ? 'Bookmarked in library' : 'Save to bookmarks'}
        >
          <Icon name={favorited ? 'favorite' : 'bookmark_add'} className="text-[18px]" />
        </button>

        {/* In-library reading progress banner */}
        {progress && (
          <div className="absolute bottom-0 inset-x-0 bg-slate-950/85 backdrop-blur-sm px-3 py-1.5 flex items-center justify-between text-[11px] text-white">
            <span className="font-semibold text-amber-400">
              {progress.status}
            </span>
            <span>
              {progress.currentPage}/{progress.totalPages} p. ({progress.percentage}%)
            </span>
          </div>
        )}
      </div>

      {/* Book Metadata & Body */}
      <div className="p-4 flex flex-col justify-between flex-grow">
        <div>
          {/* Genre & Level Tags */}
          <div className="flex items-center justify-between gap-1 mb-1.5 text-xs">
            <span className="text-amber-600 dark:text-amber-400 font-semibold tracking-wide uppercase text-[10px]">
              {book.genre || 'Classic'}
            </span>
            <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${levelStyle.bg}`}>
              {levelStyle.label}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onSelectBook(book)}
            className="font-display font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-1 hover:text-amber-600 dark:hover:text-amber-400 cursor-pointer transition-colors"
            title={book.title}
          >
            {book.title}
          </h3>

          {/* Clickable Author */}
          <p
            onClick={() => onSelectAuthor && onSelectAuthor(book.authorId)}
            className="text-xs text-slate-500 dark:text-slate-400 font-medium hover:text-slate-800 dark:hover:text-slate-200 cursor-pointer truncate transition-colors mt-0.5"
            title={`View author ${book.authorName}`}
          >
            {book.authorName || 'Author Profile'}
          </p>

          {/* Publication Year & Pages */}
          <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-2">
            <span>{book.publicationYear}</span>
            <span>•</span>
            <span>{book.pageCount} pages</span>
            {book.rating && (
              <>
                <span>•</span>
                <span className="flex items-center gap-0.5 text-amber-500 font-bold">
                  ★ {book.rating}
                </span>
              </>
            )}
          </div>
        </div>

        {/* View Details Action */}
        <div className="pt-4 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <button
            onClick={() => onSelectBook(book)}
            className="w-full py-2 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-900 hover:text-white dark:hover:bg-amber-500 dark:hover:text-slate-950 text-slate-800 dark:text-slate-200 font-semibold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm"
          >
            <span>View Details</span>
            <Icon name="arrow_forward" className="text-[14px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
