import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { BookCard } from '../directory/BookCard.jsx';
import { ImageWithFallback } from '../common/ImageWithFallback.jsx';
import { Icon } from '../common/Icon.jsx';
import { LANGUAGES } from '../../constants/languages.js';

export function HomeScreen({ onNavigate, onSelectBook, onSelectAuthor }) {
  const { books, collections, updateFilters } = useBooks();
  const [searchInput, setSearchInput] = useState('');
  const [selectedLangPill, setSelectedLangPill] = useState('all');

  const featuredBooks = books.filter(b => b.isFeatured).slice(0, 4);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({
      search: searchInput,
      language: selectedLangPill === 'all' ? 'all' : selectedLangPill
    });
    onNavigate('directory');
  };

  const handlePillClick = (langName) => {
    setSelectedLangPill(langName);
  };

  return (
    <div className="w-full space-y-16 pb-20">
      {/* Hero Canvas */}
      <section className="relative w-full overflow-hidden bg-gradient-to-b from-blue-50/70 via-slate-50/50 to-transparent dark:from-slate-900/80 dark:via-slate-950 dark:to-transparent pt-10 pb-20 border-b border-slate-200/60 dark:border-slate-800">
        <div className="bb-container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Rail (7 cols) */}
            <div className="lg:col-span-7 space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm text-xs">
                <Icon name="auto_stories" className="text-amber-500 text-[18px]" />
                <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Multilingual Scholarly Archive
                </span>
                <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
                <span className="text-slate-500 dark:text-slate-400 font-medium">
                  Public Open Access
                </span>
              </div>

              {/* Title & Editorial Description */}
              <div className="space-y-4">
                <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-100 leading-[1.15]">
                  Bridge Worlds,<br />
                  <span className="italic font-normal text-amber-600 dark:text-amber-400">
                    Discover Voices
                  </span><br />
                  Through Books.
                </h1>
                <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
                  Immerse yourself in polyglot masterworks and world literature. Read seamlessly across French, Vietnamese, Japanese, German, and English with archival cultural notes, dual-language commentaries, and a lightweight reading companion built right into your browser.
                </p>
              </div>

              {/* Catalog Search Block */}
              <div className="bg-white dark:bg-slate-900 rounded-2xl p-3 shadow-xl border border-slate-200/80 dark:border-slate-800 space-y-3">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                >
                  <div className="flex items-center gap-3 px-4 flex-1">
                    <Icon name="search" className="text-slate-400 text-[22px]" />
                    <input
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                      placeholder="Search by title, author, keyword, or language (e.g. Vietnamese, French)..."
                      className="w-full bg-transparent text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none py-2 font-medium"
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary py-3 px-6 rounded-xl flex items-center justify-center gap-2"
                  >
                    <span>Explore Now</span>
                    <Icon name="arrow_forward" className="text-[18px]" />
                  </button>
                </form>

                {/* Dialect Filter Pills */}
                <div className="pt-2 px-2 flex flex-wrap items-center gap-1.5 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mr-1">
                    Dialect:
                  </span>
                  {LANGUAGES.slice(0, 6).map((l) => {
                    const isSelected = selectedLangPill === (l.code === 'all' ? 'all' : l.name);
                    return (
                      <button
                        key={l.code}
                        type="button"
                        onClick={() => handlePillClick(l.code === 'all' ? 'all' : l.name)}
                        className={`px-3 py-0.5 rounded-full text-xs font-semibold transition-all ${
                          isSelected
                            ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                        }`}
                      >
                        {l.flag} {l.nativeName}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* CTA Buttons & Live Counter */}
              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  onClick={() => onNavigate('directory')}
                  className="btn btn-primary py-3.5 px-7 rounded-full shadow-md flex items-center gap-2"
                >
                  <Icon name="local_library" />
                  <span>Browse All Books</span>
                </button>
                <button
                  onClick={() => onNavigate('my-library')}
                  className="btn btn-secondary py-3.5 px-7 rounded-full flex items-center gap-2"
                >
                  <Icon name="bookmark_add" />
                  <span>Start Reading List</span>
                </button>
                <div className="hidden sm:flex items-center gap-2 ml-auto text-xs text-slate-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{books.length} Verified Editions Catalogued</span>
                </div>
              </div>
            </div>

            {/* Right Showcase Visual Canvas (5 cols - Floating Trio of Masterpieces) */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[460px]">
              <div className="relative w-full max-w-[380px] h-[480px]">
                {/* 1984 Card */}
                <div
                  onClick={() => {
                    const bk = books.find(b => b.title === '1984');
                    if (bk) onSelectBook(bk);
                  }}
                  className="absolute left-0 bottom-4 w-52 rounded-2xl bg-white dark:bg-slate-900 p-3 shadow-xl -rotate-6 transition-all duration-300 hover:rotate-0 hover:z-30 hover:scale-105 cursor-pointer border border-slate-200/80 dark:border-slate-800"
                >
                  <div className="aspect-[2/3] w-full rounded-xl overflow-hidden mb-2 bg-slate-950">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80"
                      alt="1984"
                      title="1984"
                      author="George Orwell"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">1984</p>
                  <p className="text-[11px] text-slate-400">George Orwell</p>
                </div>

                {/* Tale of Kieu Card */}
                <div
                  onClick={() => {
                    const bk = books.find(b => b.title === 'Chí Phèo') || books[10];
                    if (bk) onSelectBook(bk);
                  }}
                  className="absolute right-0 top-2 w-52 rounded-2xl bg-white dark:bg-slate-900 p-3 shadow-xl rotate-6 transition-all duration-300 hover:rotate-0 hover:z-30 hover:scale-105 cursor-pointer border border-slate-200/80 dark:border-slate-800"
                >
                  <div className="aspect-[2/3] w-full rounded-xl overflow-hidden mb-2 bg-slate-950">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1532012164546-f432f2e3edd4?auto=format&fit=crop&w=600&q=80"
                      alt="Chí Phèo"
                      title="Chí Phèo"
                      author="Nam Cao"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">Chí Phèo</p>
                  <p className="text-[11px] text-slate-400">Nam Cao (Việt Nam)</p>
                </div>

                {/* Central Hero: Le Petit Prince */}
                <div
                  onClick={() => {
                    const bk = books.find(b => b.title.includes('Prince')) || books[2];
                    if (bk) onSelectBook(bk);
                  }}
                  className="absolute left-10 top-16 w-56 rounded-2xl bg-white dark:bg-slate-900 p-3.5 shadow-2xl z-20 -rotate-1 transition-all duration-300 hover:scale-105 cursor-pointer border border-slate-200/80 dark:border-slate-800"
                >
                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden mb-3 bg-slate-900">
                    <ImageWithFallback
                      src="https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=600&q=80"
                      alt="Le Petit Prince"
                      title="Le Petit Prince"
                      author="Antoine de Saint-Exupéry"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-slate-950/80 text-amber-400 text-[10px] font-bold backdrop-blur flex items-center gap-1">
                      <span>★ Bilingual Gem</span>
                    </div>
                  </div>
                  <p className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                    Le Petit Prince
                  </p>
                  <p className="text-xs text-slate-400">Antoine de Saint-Exupéry</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars (Architectural 3-Card Grid) */}
      <section className="bb-container py-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              The Archival Standard
            </span>
            <h2 className="font-display text-3xl font-bold text-slate-900 dark:text-slate-100">
              Engineered for Scholarly Immersion
            </h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
            Designed strictly without intrusive paywalls or distracting telemetry, granting pure focus to the beauty of international letters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1 */}
          <div
            onClick={() => onNavigate('explorer')}
            className="bb-card p-8 cursor-pointer flex flex-col justify-between group bg-white dark:bg-slate-900"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-blue-50 dark:bg-blue-950/50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Icon name="language" className="text-[28px]" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                Multi-Language Discovery
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Explore classic and contemporary literature across 7+ languages with parallel cultural notes and bilingual reading tags.
              </p>
            </div>
            <div className="pt-6 mt-4 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Explore Languages</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </div>
          </div>

          {/* Pillar 2 */}
          <div
            onClick={() => onNavigate('collections')}
            className="bb-card p-8 cursor-pointer flex flex-col justify-between group bg-white dark:bg-slate-900"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 flex items-center justify-center text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                <Icon name="collections_bookmark" className="text-[28px]" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                Curated Collections
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Expertly structured themed selections: Timeless Classics, Fast & Engaging Reads, Modern Literary Gems, and Polyglot Starter Kits.
              </p>
            </div>
            <div className="pt-6 mt-4 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>View Collections</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </div>
          </div>

          {/* Pillar 3 */}
          <div
            onClick={() => onNavigate('my-library')}
            className="bb-card p-8 cursor-pointer flex flex-col justify-between group bg-white dark:bg-slate-900"
          >
            <div className="space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <Icon name="sync_saved_locally" className="text-[28px]" />
              </div>
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                Zero-Friction Reading Tracker
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Save bookmarks and log current pages safely in your browser LocalStorage with zero sign-up friction and offline durability.
              </p>
            </div>
            <div className="pt-6 mt-4 flex items-center gap-2 text-xs font-bold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
              <span>Open My Library</span>
              <Icon name="arrow_forward" className="text-[16px]" />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Showcase */}
      <section className="bb-container py-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Curator's Highlights
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Featured Literary Masterpieces
            </h2>
          </div>
          <button
            onClick={() => onNavigate('directory')}
            className="btn btn-outline text-xs py-2 px-4"
          >
            <span>See All ({books.length})</span>
            <Icon name="arrow_forward" className="text-[14px]" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard
              key={book._id || book.id}
              book={book}
              onSelectBook={onSelectBook}
              onSelectAuthor={onSelectAuthor}
            />
          ))}
        </div>
      </section>

      {/* Curated Collections Teaser */}
      <section className="bb-container py-6">
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200 dark:border-slate-800">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
              Thematic Journeys
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              Explore Curated Anthologies
            </h2>
          </div>
          <button
            onClick={() => onNavigate('collections')}
            className="btn btn-secondary text-xs py-2 px-4"
          >
            <span>Browse All Collections</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col._id || col.id}
              onClick={() => onNavigate('collections')}
              className="bb-card p-6 cursor-pointer flex flex-col justify-between h-56 bg-gradient-to-br from-slate-900 to-slate-950 text-white group"
            >
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950 inline-block mb-3">
                  {col.badge}
                </span>
                <h3 className="font-display text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                  {col.title}
                </h3>
                <p className="text-xs text-slate-400 line-clamp-3 mt-2">
                  {col.description}
                </p>
              </div>
              <div className="flex items-center justify-between text-xs text-amber-400 pt-4 border-t border-slate-800">
                <span>{col.bookIds?.length || 5} Editions</span>
                <Icon name="arrow_forward" className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
