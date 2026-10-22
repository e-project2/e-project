import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { BookCard } from '../BookCard.jsx';

export function HomeScreen({ onNavigate, onSelectBook, onSelectAuthor, onOpenReader }) {
  const { books, updateFilters } = useBooks();
  const { readingList, activeBook, currentProgress } = useReadingTracker();
  const [searchInput, setSearchInput] = useState('');
  const [selectedLang, setSelectedLang] = useState('all');

  const featuredBooks = books && books.length > 0 ? books.slice(0, 4) : [];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateFilters({
      search: searchInput,
      language: selectedLang === 'all' ? 'all' : selectedLang
    });
    if (onNavigate) onNavigate('directory');
  };

  const handlePillClick = (lang) => {
    setSelectedLang(lang);
    if (lang === 'all') {
      setSearchInput('');
    } else {
      setSearchInput(lang);
    }
  };

  const handleOpenBookByTitle = (titleKeyword) => {
    const found = books.find(b => b.title.toLowerCase().includes(titleKeyword.toLowerCase())) || books[0];
    if (found && onSelectBook) {
      onSelectBook(found);
    }
  };

  return (
    <div className="flex flex-col w-full bg-surface text-on-surface">
      {/* Top Ambient Backing Glow & Hero Canvas */}
      <section className="relative w-full overflow-hidden bg-surface-container-low/60 pb-20 pt-8">
        <div className="pointer-events-none absolute -left-40 top-0 h-96 w-96 rounded-full bg-surface-container-highest/60 blur-3xl"></div>
        <div className="pointer-events-none absolute right-0 top-12 h-[30rem] w-[30rem] rounded-full bg-surface-container/50 blur-3xl"></div>

        <div className="max-w-[1440px] mx-auto px-6 lg:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Hero Editorial Text Rail (7 Cols) */}
            <div className="lg:col-span-7 space-y-8">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-high/80 backdrop-blur shadow-sm">
                <span className="material-symbols-outlined text-[16px] text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                  auto_stories
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container">
                  Multilingual Scholarly Archive
                </span>
                <span className="h-1 w-1 rounded-full bg-outline-variant"></span>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  Public Open Access
                </span>
              </div>

              <div className="space-y-4">
                <h1 className="font-display-hero text-display-hero tracking-tight text-primary">
                  Bridge Worlds,<br />
                  <span className="italic font-normal text-on-tertiary-container">Discover Voices</span><br />
                  Through Books.
                </h1>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-xl">
                  Immerse yourself in polyglot masterworks and world literature. Read seamlessly across French, Vietnamese, Japanese, and English with archival cultural notes, dual-language commentaries, and a lightweight reading companion built right into your browser.
                </p>
              </div>

              {/* Interactive Catalog Search Block */}
              <div className="bg-surface-card rounded-2xl p-2.5 shadow-xl shadow-primary/5 space-y-3">
                <form
                  onSubmit={handleSearchSubmit}
                  className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
                  id="hero-search-form"
                >
                  <div className="flex items-center gap-3 px-4 flex-1">
                    <span className="material-symbols-outlined text-on-surface-variant text-[22px]">search</span>
                    <input
                      className="w-full bg-transparent font-body-md text-body-md text-primary placeholder:text-on-surface-variant/70 focus:outline-none py-2"
                      id="catalog-search-input"
                      placeholder="Search by title, author, keyword, or language (e.g. Vietnamese, French)..."
                      type="text"
                      value={searchInput}
                      onChange={(e) => setSearchInput(e.target.value)}
                    />
                  </div>
                  <button
                    className="px-8 py-3.5 rounded-xl bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                    type="submit"
                  >
                    <span>Explore Now</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </form>

                {/* Language Pills Filter */}
                <div className="pt-2 px-3 pb-1 flex flex-wrap items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider mr-1">
                    Filter Dialect:
                  </span>
                  {[
                    { label: 'All', value: 'all' },
                    { label: 'Tiếng Việt', value: 'Vietnamese' },
                    { label: 'English', value: 'English' },
                    { label: 'Français', value: 'French' },
                    { label: '日本語', value: 'Japanese' },
                    { label: 'Español', value: 'Spanish' }
                  ].map((p) => {
                    const isSelected = selectedLang === p.value;
                    return (
                      <button
                        key={p.value}
                        type="button"
                        onClick={() => handlePillClick(p.value)}
                        className={`lang-pill px-3 py-1 rounded-full font-label-sm text-label-sm transition-all ${
                          isSelected
                            ? 'bg-primary text-on-primary shadow-sm font-semibold'
                            : 'bg-surface-container text-on-surface hover:bg-surface-container-high'
                        }`}
                      >
                        {p.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hero Action CTAs & Live Counter */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  type="button"
                  onClick={() => onNavigate('directory')}
                  className="px-7 py-3.5 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">local_library</span>
                  <span>Browse All Books</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate('my-library')}
                  className="px-7 py-3.5 rounded-full bg-surface-container text-primary font-label-md text-label-md hover:bg-surface-container-high transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[20px]">bookmark_add</span>
                  <span>Start Reading List</span>
                </button>
                <div className="hidden sm:flex items-center gap-2 ml-auto text-on-surface-variant font-label-sm text-label-sm pl-4">
                  <span className="h-2 w-2 rounded-full bg-status-success animate-pulse"></span>
                  <span>{books.length > 0 ? `${books.length} Verified Editions Stored` : '1,248 Verified Editions Stored'}</span>
                </div>
              </div>
            </div>

            {/* Hero Showcase Visual Canvas (5 Cols Asymmetric Floating Book Stack) */}
            <div className="lg:col-span-5 relative flex items-center justify-center lg:justify-end min-h-[460px]">
              {/* Background Book Halo Aura */}
              <div className="absolute h-80 w-80 rounded-full bg-secondary-fixed/50 blur-2xl -z-10"></div>

              {/* Floating Trio of Distinct Masterpieces */}
              <div className="relative w-full max-w-[380px] h-[480px]">
                {/* Card Back Left: 1984 */}
                <div
                  onClick={() => handleOpenBookByTitle('1984')}
                  className="absolute left-0 bottom-4 w-52 rounded-2xl bg-surface-card p-3 shadow-xl -rotate-6 transition-transform duration-300 hover:rotate-0 hover:z-30 cursor-pointer"
                >
                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-primary mb-2.5">
                    <img
                      className="w-full h-full object-cover"
                      alt="1984 George Orwell"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXH4SAwCdCytQHlNx7czi8ardYBv2mzr92pR1dJ_x67gYoMoyozPs3Q8cdcupRX1kezJ7-LMh5vVLdhuw6FBQGuxd8invrTQcMff5YA1150V3aCFXreKf1XawMe88mnnPJ397YobhmvbIq8MRXo7qJ7sYI5-sqmCqYUzlHzLrUBmT-FJ5zt87LTn0Reh_8l0lBkQIjMYyYo4lEgrS2S2V6VEZ7RhNh4axm4XGXGQ"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-primary/90 text-on-primary font-label-sm text-label-sm backdrop-blur">
                      Dystopian
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-primary truncate">1984</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">George Orwell</p>
                </div>

                {/* Card Back Right: Tale of Kieu */}
                <div
                  onClick={() => handleOpenBookByTitle('Kiều')}
                  className="absolute right-0 top-2 w-52 rounded-2xl bg-surface-card p-3 shadow-xl rotate-6 transition-transform duration-300 hover:rotate-0 hover:z-30 cursor-pointer"
                >
                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-primary mb-2.5">
                    <img
                      className="w-full h-full object-cover"
                      alt="Truyện Kiều Nguyễn Du"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuB5Tiwe5DiFEfxHvD8o2_T0TFfFzccOuFkDrmkjl7m5SpQKYHcyiMKB6bwry5c3Rby_IBaR_fvHzYRE-VQyJo9JaTqnVfnQAODW-JvQYnNO0L6ktqge8R3RWmgjqxLJPqKzqwxDwAw7zCw9dqfl101CT8gl1wkyVMFXB9g58Kkh2nUW3B5yVKPYJElliVqNbmUt1fvJQffO4Ek9uoxYMp3MLjsLW6KwI88K4wq5uQ"
                    />
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-on-tertiary-container text-surface font-label-sm text-label-sm backdrop-blur">
                      Tiếng Việt
                    </span>
                  </div>
                  <p className="font-title-md text-title-md text-primary truncate">Truyện Kiều</p>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">Nguyễn Du</p>
                </div>

                {/* Front Central Hero: The Little Prince */}
                <div
                  onClick={() => handleOpenBookByTitle('Prince')}
                  className="absolute left-10 top-16 w-56 rounded-2xl bg-surface-card p-3.5 shadow-2xl z-20 -rotate-1 transition-transform duration-300 hover:scale-105 cursor-pointer"
                >
                  <div className="relative aspect-[2/3] w-full rounded-xl overflow-hidden bg-surface-container mb-3">
                    <img
                      className="w-full h-full object-cover"
                      alt="Le Petit Prince"
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuAZu-XEQrnftqkfRLIZJaQnkQmZZbH8qcY_ZLlrntrpp0CvB9Q9qURA8RL_upd8DOaznIU4SfD4fMsVWke9cU9GkhUbX0mBqxl2m1T1cnP91d5S8rmXedUGQ_izsBVG38vdohPsw8JSx2PrFMD9DxcgV6r6LF0NHaA2lpc3iUAopzXuXhES8aFfMv3WJLnJQSmCsQB57X5BguMcA-vdOVxopAKZtXa53SJ01ciOtA"
                    />
                    <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface/90 text-on-surface font-label-sm text-label-sm shadow-sm backdrop-blur">
                      <span className="material-symbols-outlined text-[13px] text-on-tertiary-container" style={{ fontVariationSettings: "'FILL' 1" }}>
                        star
                      </span>
                      <span>Bilingual Icon</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-title-md text-title-md text-primary leading-tight">Le Petit Prince</p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Saint-Exupéry</p>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-tertiary-container">
                      <span className="material-symbols-outlined text-[18px]">translate</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars: Architectural 3-Card Grid */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div className="space-y-2 max-w-xl">
            <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container">
              The Archival Standard
            </span>
            <h2 className="font-headline-lg text-headline-lg text-primary">
              Engineered for Scholarly Immersion
            </h2>
          </div>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-md">
            Designed strictly without intrusive paywalls or distracting telemetry, granting pure focus to the beauty of international letters.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Pillar 1: Multilingual Discovery */}
          <div
            onClick={() => onNavigate('explorer')}
            className="rounded-2xl bg-surface-card p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[28px]">language</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-sm text-headline-sm text-primary">Multi-Language Discovery</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Explore classic and contemporary literature across 5+ languages. Parallel reading views accompanied by nuanced contextual linguistic glosses.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 flex items-center gap-2 text-on-tertiary-container font-label-md text-label-md">
              <span>Read across cultures</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Pillar 2: Curated Collections */}
          <div
            onClick={() => onNavigate('collections')}
            className="rounded-2xl bg-surface-card p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[28px]">collections_bookmark</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-sm text-headline-sm text-primary">Curated Literary Collections</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Hand-picked thematic corridors ranging from existentialist continental philosophy to concise, single-sitting weekend translations.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 flex items-center gap-2 text-on-tertiary-container font-label-md text-label-md">
              <span>Explore hand-picked shelves</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>

          {/* Pillar 3: Zero-Friction Tracker */}
          <div
            onClick={() => onNavigate('my-library')}
            className="rounded-2xl bg-surface-card p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group cursor-pointer"
          >
            <div className="space-y-5">
              <div className="w-14 h-14 rounded-2xl bg-surface-container-high flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                <span className="material-symbols-outlined text-[28px]">sync_saved_locally</span>
              </div>
              <div className="space-y-2">
                <h3 className="font-headline-sm text-headline-sm text-primary">Zero-Friction Reading Tracker</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Seamlessly record reading milestones, chapters, and margin notes with instant browser storage persistence. Absolute zero account creation required.
                </p>
              </div>
            </div>
            <div className="pt-6 mt-6 flex items-center gap-2 text-on-tertiary-container font-label-md text-label-md">
              <span>Inspect local shelf</span>
              <span className="material-symbols-outlined text-[16px] group-hover:translate-x-1 transition-transform">
                arrow_forward
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Showcase (4 Key Works Grid with Micro-Interactions) */}
      <section className="w-full bg-surface-container-low/40 py-20">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="h-2 w-2 rounded-full bg-on-tertiary-container"></span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container">
                  Curator's Spotlight
                </span>
              </div>
              <h2 className="font-headline-lg text-headline-lg text-primary">
                Featured Masterpieces
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigate('directory')}
              className="inline-flex items-center gap-2 font-label-md text-label-md text-primary hover:text-secondary transition-colors cursor-pointer"
            >
              <span>View all curated catalog titles</span>
              <span className="material-symbols-outlined text-[18px]">trending_flat</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredBooks.map((book) => (
              <BookCard
                key={book._id || book.id}
                book={book}
                onSelect={onSelectBook}
                onSelectAuthor={onSelectAuthor}
                onRead={onOpenReader}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Curated Reading Collections Teaser (4 Visual Rich Themed Cards) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 py-20 w-full">
        <div className="space-y-3 mb-12">
          <span className="font-label-sm text-label-sm uppercase tracking-wider text-on-tertiary-container">
            Themed Pathways
          </span>
          <h2 className="font-headline-lg text-headline-lg text-primary">
            Curated Reading Collections
          </h2>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl">
            Immerse yourself along deliberate scholarly lineages, compiled by comparative literature academics and community archivists.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Collection 1: Timeless Classics */}
          <div
            onClick={() => onNavigate('collections')}
            className="group relative rounded-2xl overflow-hidden bg-primary min-h-[320px] p-6 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCtqh2mIErlpE67fxx5ZE19fPx2qOr3k9G7sNS9ZrdRBI6mnDkh32K3CcWD8WAin5zq5UOoaEpW0bFue-YtIyQPg11aT4y4mUtkvB3DHof-2PJ20VHQB4FaVV3jNlzx3UBAxhAUxZBq_XQBkCFJv1o7QZ0rOxgROCHqVdNZnsL0j1Z10zPzKfJDmFuU5uolNy_ZnB23dZFkWqQIvnX8DVNJw7QW0jVCSU96DFR59g')"
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-surface-container-high/40 text-on-secondary-container font-label-sm text-label-sm backdrop-blur">
                42 Titles Available
              </span>
            </div>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">menu_book</span>
                <span>Worldwide Canon</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-primary group-hover:translate-x-1 transition-transform">
                Timeless Classics
              </h3>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Global literary giants that constructed civilization’s philosophical vernacular.
              </p>
            </div>
          </div>

          {/* Collection 2: Bite-sized Reads */}
          <div
            onClick={() => onNavigate('collections')}
            className="group relative rounded-2xl overflow-hidden bg-primary min-h-[320px] p-6 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCWJ8ys0BRXJOkDtKNIoF1SgRfXXkDN9VuIuZoXzOhmrh0bdBTJeW87NGHKb-BFn4tnGmFZNtcoilARaQkSB8ZzaIlQiL4T5KwmYL2jjmLJ81gdoSyLAm0Y6fUCg9VfK9knqi6CFKi5QYUD2sfOGbczuPoNJ_2VuDMq0W6Hv630oJ9hFqTFOl-6ZkhpnBbXUpxOqPBwNk2bRydBRz5W2t-ItQ4Qdj1wgbosXKPjPQ')"
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-surface-container-high/40 text-on-secondary-container font-label-sm text-label-sm backdrop-blur">
                &lt; 200 Pages
              </span>
            </div>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">hourglass_top</span>
                <span>Single Afternoon</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-primary group-hover:translate-x-1 transition-transform">
                Bite-sized Reads
              </h3>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Deep, transformative literature engineered for busy readers and weekend respites.
              </p>
            </div>
          </div>

          {/* Collection 3: Contemporary Voices */}
          <div
            onClick={() => onNavigate('collections')}
            className="group relative rounded-2xl overflow-hidden bg-primary min-h-[320px] p-6 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAxSKIsbtOJ1FEuxz93F3JPQPgEw7HNhpnhw0bwb3UnluMPM9xaJ61b3P3MDbRqQs2stFGxJu5GTpuWLJpP2GMqNAz7XnO7LiBvkgAEPMNZr9Dc3vhzL7peCjsC6k3vvlTApgGkXZ2DEEfWB_rOX_0Ejr28-dPKy3YpODWGrk1vVJfMNpI0QwvNpTDHaB9REeokv9EpnzOkCCnyC-YxofVfMJqAk_wYdMRWfc29oA')"
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-surface-container-high/40 text-on-secondary-container font-label-sm text-label-sm backdrop-blur">
                28 Modern Works
              </span>
            </div>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">public</span>
                <span>21st Century</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-primary group-hover:translate-x-1 transition-transform">
                Contemporary Voices
              </h3>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Modern reflections exploring migration, digital solitude, and cultural hybridity.
              </p>
            </div>
          </div>

          {/* Collection 4: Beginner Friendly */}
          <div
            onClick={() => onNavigate('collections')}
            className="group relative rounded-2xl overflow-hidden bg-primary min-h-[320px] p-6 flex flex-col justify-between shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
          >
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40 group-hover:scale-105 group-hover:opacity-50 transition-all duration-700"
              style={{
                backgroundImage:
                  "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCRqdmiyBcAlcQ51Qu3xFhJhKrpIVAGU39NPAxbQW2YMWP7Q4cVxlMdO2Oj3UpYKZXlnRhL2szdnV957ZkmaacDWKF7oWyy-W_ysrQsxJIBrGctpBfR-_NTwJFganeRiRduaAlWDyidATJR1iHuwqyrPxMMtXEKgZ-3lI_O1CxyxYHhNmGa6hY1o5ubWTOlqpQDWwAc5cWlpTNMAnMKKUtF015fCQzTvOWJqBx6ig')"
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/60 to-transparent"></div>
            <div className="relative z-10">
              <span className="px-3 py-1 rounded-full bg-surface-container-high/40 text-on-secondary-container font-label-sm text-label-sm backdrop-blur">
                Accessible Prose
              </span>
            </div>
            <div className="relative z-10 space-y-2">
              <div className="flex items-center gap-2 text-on-tertiary-container font-label-sm text-label-sm uppercase tracking-wider">
                <span className="material-symbols-outlined text-[16px]">park</span>
                <span>Gateway Books</span>
              </div>
              <h3 className="font-headline-md text-headline-md text-on-primary group-hover:translate-x-1 transition-transform">
                Beginner Friendly
              </h3>
              <p className="font-body-sm text-body-sm text-on-primary-container">
                Gentle narrative on-ramps to reawaken the habit of unhurried, reflective reading.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reading Progress Micro-Dashboard (Local Persistence Live Demo) */}
      <section className="max-w-[1440px] mx-auto px-6 lg:px-12 pb-16 w-full">
        <div className="rounded-3xl bg-surface-container p-8 lg:p-12 shadow-sm relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-surface-variant/40 blur-2xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-card text-on-tertiary-container font-label-sm text-label-sm shadow-sm">
                <span className="material-symbols-outlined text-[14px]">save</span>
                <span>Zero Sign-Up Required • Saved to Your Browser</span>
              </div>
              <h3 className="font-headline-lg text-headline-lg text-primary">
                Your Private Local Reading Desk
              </h3>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl">
                Track reading sessions right where you are. Books you save or read automatically sync with browser storage, safeguarding your privacy without requiring accounts or cloud synchronization.
              </p>
              <div className="pt-2 flex flex-wrap gap-4 items-center">
                <button
                  type="button"
                  onClick={() => onNavigate('my-library')}
                  className="px-6 py-3 rounded-full bg-primary text-on-primary font-label-md text-label-md hover:bg-primary-container transition-all shadow-md cursor-pointer"
                >
                  Open Reading Dashboard
                </button>
                <span className="font-body-sm text-body-sm text-on-surface-variant" id="reading-status-notice">
                  {readingList?.length ? `${readingList.length} active volume${readingList.length > 1 ? 's' : ''} cataloged in your browser` : '3 active volumes cataloged in your browser'}
                </span>
              </div>
            </div>

            <div className="lg:col-span-5 bg-surface-card rounded-2xl p-6 shadow-md space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-surface-container">
                <span className="font-label-md text-label-md text-primary font-bold">Currently In Progress</span>
                <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm">
                  Active Session
                </span>
              </div>

              {/* Active Reading Mini Card */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-title-md text-title-md text-primary">
                      {activeBook ? activeBook.title : 'Le Petit Prince'}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant">
                      {activeBook ? `Page ${currentProgress?.currentPage || 48} of ${activeBook.pageCount || 96}` : 'Page 48 of 96 • Chapter VII'}
                    </p>
                  </div>
                  <span className="font-label-md text-label-md text-on-tertiary-container font-bold">
                    {activeBook && activeBook.pageCount ? `${Math.round(((currentProgress?.currentPage || 48) / activeBook.pageCount) * 100)}%` : '50%'}
                  </span>
                </div>

                {/* Progress Bar */}
                <div className="w-full h-2 rounded-full bg-surface-container overflow-hidden">
                  <div
                    className="h-full bg-on-tertiary-container rounded-full transition-all duration-500"
                    style={{
                      width: activeBook && activeBook.pageCount
                        ? `${Math.min(100, Math.round(((currentProgress?.currentPage || 48) / activeBook.pageCount) * 100))}%`
                        : '50%'
                    }}
                  ></div>
                </div>
              </div>

              <div className="pt-3 flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[16px] text-status-success">check_circle</span>
                  <span>18 min read today</span>
                </span>
                <button
                  type="button"
                  onClick={() => onNavigate('my-library')}
                  className="text-primary hover:text-secondary font-label-sm text-label-sm font-semibold cursor-pointer"
                >
                  Resume Reader →
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Literary Quote of the Day Banner */}
      <section className="w-full bg-tertiary-container text-on-tertiary-container relative overflow-hidden py-16 px-6 lg:px-12 my-6">
        <div className="pointer-events-none absolute left-10 -top-12 text-surface-container-highest/10 font-headline-lg text-[140px] leading-none select-none">
          “
        </div>
        <div className="max-w-[1000px] mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-tertiary text-on-tertiary font-label-sm text-label-sm uppercase tracking-wider">
            <span className="material-symbols-outlined text-[14px]">format_quote</span>
            <span>Literary Thought of the Day</span>
          </div>
          <blockquote className="font-headline-lg text-headline-lg italic font-normal text-surface leading-snug">
            “On ne voit bien qu’avec le cœur. L’essentiel est invisible pour les yeux.”
          </blockquote>
          <div className="space-y-1">
            <p className="font-title-md text-title-md text-on-tertiary font-bold tracking-wide">
              Antoine de Saint-Exupéry
            </p>
            <p className="font-body-sm text-body-sm text-surface-container-highest/80">
              <em>Le Petit Prince (The Little Prince)</em> • Chapter XXI, Published 1943
            </p>
          </div>
          <div className="pt-2">
            <span className="font-label-sm text-label-sm text-surface-container-highest/60 italic">
              “One sees clearly only with the heart. What is essential is invisible to the eye.”
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomeScreen;
