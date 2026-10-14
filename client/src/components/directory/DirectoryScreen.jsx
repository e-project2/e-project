import React, { useState, useMemo } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { BookCard } from './BookCard.jsx';
import { FilterSidebar } from './FilterSidebar.jsx';
import { filterBooks } from '../../utils/filterEngine.js';
import { Icon } from '../common/Icon.jsx';

export function DirectoryScreen({ onSelectBook, onSelectAuthor }) {
  const { books, filters, updateFilters, resetFilters } = useBooks();
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'compact'

  // Apply compound filtering and sorting
  const filteredBooks = useMemo(() => {
    return filterBooks(books, filters);
  }, [books, filters]);

  const activeFilterCount =
    (filters.search ? 1 : 0) +
    (filters.genre !== 'All' ? 1 : 0) +
    (filters.language !== 'all' ? 1 : 0) +
    (filters.readingLevel !== 'all' ? 1 : 0) +
    (filters.period !== 'all' ? 1 : 0);

  return (
    <div className="w-full pb-20">
      {/* Directory Page Header */}
      <div className="w-full bg-gradient-to-b from-blue-50/50 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Icon name="auto_stories" className="text-[16px]" />
              <span>Universal Archival Edition</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Books Directory & Smart Search
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Explore our curated catalog of world literature spanning centuries, tongues, and civilizational epics. Use compound filters to find works matching your exact dialect and difficulty level.
            </p>
          </div>

          <div className="flex items-center gap-4 bg-white dark:bg-slate-900 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 self-start md:self-auto">
            <Icon name="library_books" className="text-amber-500 text-[24px]" />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Catalog Status
              </span>
              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                {books.length} Volume Editions
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Directory Body */}
      <div className="bb-container py-8">
        {/* Toolbar: Counter, Sort, Mobile Filter Button */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-slate-200 dark:border-slate-800 mb-8">
          <div className="flex items-center gap-3">
            {/* Mobile Filter Trigger */}
            <button
              onClick={() => setMobileFilterOpen(!mobileFilterOpen)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-800 dark:text-slate-200"
            >
              <Icon name="tune" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="px-1.5 py-0.2 rounded-full bg-amber-500 text-slate-950 text-[10px]">
                  {activeFilterCount}
                </span>
              )}
            </button>

            <p className="text-xs sm:text-sm font-medium text-slate-500 dark:text-slate-400">
              Showing <strong className="text-slate-900 dark:text-slate-100">{filteredBooks.length}</strong> of{' '}
              <strong className="text-slate-900 dark:text-slate-100">{books.length}</strong> books
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Dropdown */}
            <div className="relative flex items-center">
              <Icon name="sort" className="absolute left-3 text-slate-400 text-[18px] pointer-events-none" />
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                className="pl-9 pr-8 py-2 rounded-full bg-white dark:bg-slate-900 text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-sm focus:outline-none cursor-pointer"
              >
                <option value="title-az">Sort: Title (A-Z)</option>
                <option value="title-za">Sort: Title (Z-A)</option>
                <option value="year-newest">Sort: Year (Newest)</option>
                <option value="year-oldest">Sort: Year (Oldest)</option>
                <option value="pages-short">Sort: Page Count (Shortest)</option>
                <option value="pages-long">Sort: Page Count (Longest)</option>
                <option value="rating-high">Sort: Rating (Highest)</option>
              </select>
            </div>

            {/* View Grid/Compact switch */}
            <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200 dark:border-slate-700">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-white dark:bg-slate-900 text-amber-500 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <Icon name="grid_view" className="text-[18px]" />
              </button>
              <button
                onClick={() => setViewMode('compact')}
                className={`p-1.5 rounded-full transition-colors ${
                  viewMode === 'compact'
                    ? 'bg-white dark:bg-slate-900 text-amber-500 shadow-xs'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Compact List View"
              >
                <Icon name="view_agenda" className="text-[18px]" />
              </button>
            </div>
          </div>
        </div>

        {/* Grid & Sidebar Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Desktop Filter Sidebar (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-24">
            <FilterSidebar
              filters={filters}
              onUpdateFilters={updateFilters}
              onResetFilters={resetFilters}
            />
          </div>

          {/* Mobile Filter Drawer */}
          {mobileFilterOpen && (
            <div className="lg:hidden fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm p-4 flex justify-center items-center">
              <div className="max-w-md w-full max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl p-4 shadow-2xl relative">
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="absolute top-4 right-4 btn-icon w-8 h-8"
                >
                  <Icon name="close" />
                </button>
                <FilterSidebar
                  filters={filters}
                  onUpdateFilters={updateFilters}
                  onResetFilters={resetFilters}
                />
                <button
                  onClick={() => setMobileFilterOpen(false)}
                  className="w-full btn btn-primary py-2.5 mt-4"
                >
                  Apply Filters ({filteredBooks.length} results)
                </button>
              </div>
            </div>
          )}

          {/* Main Book Grid (9 cols) */}
          <div className="lg:col-span-9">
            {filteredBooks.length === 0 ? (
              /* Empty State */
              <div className="w-full py-16 px-6 text-center bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl space-y-4 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
                  <Icon name="search_off" className="text-[32px]" />
                </div>
                <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                  No Archival Records Match Your Criteria
                </h3>
                <p className="text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
                  We couldn't find any editions matching your chosen combination of keywords, languages, or reading level.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn btn-primary text-xs py-2.5 px-6 shadow-sm"
                >
                  <Icon name="refresh" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              /* Regular Responsive Grid */
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBooks.map((book) => (
                  <BookCard
                    key={book._id || book.id}
                    book={book}
                    onSelectBook={onSelectBook}
                    onSelectAuthor={onSelectAuthor}
                  />
                ))}
              </div>
            ) : (
              /* Compact Agenda View */
              <div className="space-y-4">
                {filteredBooks.map((book) => (
                  <div
                    key={book._id || book.id}
                    onClick={() => onSelectBook(book)}
                    className="bb-card p-4 flex items-center gap-4 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors"
                  >
                    <div className="w-16 h-24 rounded-lg overflow-hidden shrink-0 bg-slate-950">
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500">
                          {book.language}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          • {book.genre}
                        </span>
                      </div>
                      <h4 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 truncate">
                        {book.title}
                      </h4>
                      <p className="text-xs text-slate-400 truncate">
                        {book.authorName} • {book.publicationYear} • {book.pageCount} pages
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-1">
                        {book.synopsis}
                      </p>
                    </div>
                    <button className="btn btn-outline text-xs py-1.5 px-3 shrink-0">
                      View
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DirectoryScreen;
