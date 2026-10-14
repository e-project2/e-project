import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { BookCard } from '../directory/BookCard.jsx';
import { LANGUAGES } from '../../constants/languages.js';
import { GENRES } from '../../constants/genres.js';
import { Icon } from '../common/Icon.jsx';

export function ExplorerScreen({ onSelectBook, onSelectAuthor }) {
  const { books } = useBooks();
  const [selectedLanguage, setSelectedLanguage] = useState('Vietnamese');
  const [selectedGenre, setSelectedGenre] = useState('All');

  // Filter books by language & genre
  const filteredBooks = books.filter((book) => {
    const langMatch =
      selectedLanguage === 'all'
        ? true
        : book.language?.toLowerCase() === selectedLanguage.toLowerCase();
    const genreMatch =
      selectedGenre === 'All'
        ? true
        : book.genre?.toLowerCase() === selectedGenre.toLowerCase();
    return langMatch && genreMatch;
  });

  const getLanguageCount = (langName) => {
    if (langName === 'All') return books.length;
    return books.filter(b => b.language?.toLowerCase() === langName.toLowerCase()).length;
  };

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-indigo-50/50 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="explore" className="text-[16px]" />
            <span>Polyglot Archive Explorer</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Language & Genre Explorer
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Traverse international letters through the lens of linguistic dialects and genre movements. Discover parallel translations and cultural commentaries.
          </p>
        </div>
      </div>

      <div className="bb-container py-8 space-y-10">
        {/* Visual Language Selector (Cards) */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Select Dialect Tradition
            </h3>
            <span className="text-xs text-amber-600 font-semibold">
              Active: {selectedLanguage}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
            {LANGUAGES.map((lang) => {
              const count = getLanguageCount(lang.name);
              const isSelected =
                (lang.code === 'all' && selectedLanguage === 'all') ||
                selectedLanguage.toLowerCase() === lang.name.toLowerCase();

              return (
                <button
                  key={lang.code}
                  onClick={() => setSelectedLanguage(lang.code === 'all' ? 'all' : lang.name)}
                  className={`p-3.5 rounded-2xl flex flex-col items-center justify-center text-center transition-all ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-lg scale-105 border-2 border-amber-400'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <span className="text-2xl mb-1">{lang.flag}</span>
                  <span className="text-xs font-bold truncate max-w-full">
                    {lang.nativeName}
                  </span>
                  <span className="text-[10px] opacity-75 mt-0.5">
                    {count} {count === 1 ? 'edition' : 'editions'}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Genre Filter Chip Bar */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
            Genre Filter
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto pb-2">
            {GENRES.map((genre) => {
              const isSelected = selectedGenre === genre;
              return (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                    isSelected
                      ? 'bg-amber-500 text-slate-950 shadow-sm font-bold'
                      : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {genre}
                </button>
              );
            })}
          </div>
        </div>

        {/* Explorer Results Header & Grid */}
        <div className="space-y-6 pt-4 border-t border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
              Exploring Books in {selectedLanguage === 'all' ? 'All Languages' : selectedLanguage}
              {selectedGenre !== 'All' && ` • ${selectedGenre}`}
            </h2>
            <span className="text-xs text-slate-400 font-semibold">
              {filteredBooks.length} titles found
            </span>
          </div>

          {filteredBooks.length === 0 ? (
            <div className="py-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
              <Icon name="search_off" className="text-[36px] text-slate-400" />
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                No editions found for {selectedLanguage} in "{selectedGenre}".
              </p>
              <button
                onClick={() => {
                  setSelectedLanguage('all');
                  setSelectedGenre('All');
                }}
                className="btn btn-primary text-xs py-2 px-4"
              >
                Reset Explorer
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <BookCard
                  key={book._id || book.id}
                  book={book}
                  onSelectBook={onSelectBook}
                  onSelectAuthor={onSelectAuthor}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExplorerScreen;
