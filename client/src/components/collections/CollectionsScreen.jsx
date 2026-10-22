import React from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { BookCard } from '../BookCard.jsx';
import { Icon } from '../common/Icon.jsx';

export function CollectionsScreen({ onSelectBook, onSelectAuthor, onOpenReader }) {
  const { collections, books } = useBooks();

  const getBooksForCollection = (bookIds = []) => {
    return bookIds
      .map(id => books.find(b => b._id === id || b.id === id))
      .filter(Boolean);
  };

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-amber-50/50 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="collections_bookmark" className="text-[16px]" />
            <span>Editorial Anthologies</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Featured Reading Collections
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Curated reading journeys assembled by archival editors. Whether you seek profound existential philosophy or rapid weekend masterworks, these paths guide your exploration.
          </p>
        </div>
      </div>

      {/* Collections Sections */}
      <div className="bb-container py-10 space-y-16">
        {collections.map((col, index) => {
          const colBooks = getBooksForCollection(col.bookIds);
          return (
            <section
              key={col._id || col.id || index}
              className="space-y-6 pb-12 border-b border-slate-200 dark:border-slate-800 last:border-b-0"
            >
              {/* Collection Header */}
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div className="space-y-2 max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                      {col.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-semibold">
                      Collection #{index + 1}
                    </span>
                  </div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-3">
                    <Icon name={col.icon || 'auto_stories'} className="text-amber-500 text-[28px]" />
                    <span>{col.title}</span>
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {col.description}
                  </p>
                </div>

                <div className="text-xs text-slate-400 font-semibold">
                  {colBooks.length} Selected Editions
                </div>
              </div>

              {/* Collection Books Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {colBooks.map((book) => (
                  <BookCard
                    key={book._id || book.id}
                    book={book}
                    onSelect={onSelectBook}
                    onSelectBook={onSelectBook}
                    onRead={onOpenReader}
                    onSelectAuthor={onSelectAuthor}
                  />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </div>
  );
}

export default CollectionsScreen;
