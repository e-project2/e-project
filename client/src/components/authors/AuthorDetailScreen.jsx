import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { Icon } from '../common/Icon.jsx';
import { BookCard } from '../BookCard.jsx';

export function AuthorDetailScreen({ author, onNavigate, onSelectBook, onEditAdmin }) {
  const { getBooksByAuthor, books } = useBooks();
  const { isAdmin } = useAuth();
  const [following, setFollowing] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);

  if (!author) return null;

  const authorId = author._id || author.id;
  const authoredBooks = getBooksByAuthor(authorId);
  const catalogCount = authoredBooks.length || author.stats?.worksCataloged || 1;

  // Defaults if author doesn't have custom archival attributes
  const recordId = author.archivalRecordId || `ARC-${authorId.toUpperCase()}`;
  const period = author.period || '1900 - 1944';
  const startYear = period.split('-')[0]?.trim() || '1900';
  const birthPlace = author.birthPlace || (author.nationality ? `${author.nationality}` : 'Historical Archive');
  const deathInfo = author.deathPlace ? ` · ${author.deathPlace}` : '';
  const focusArea = author.focusArea || `${author.nationality || 'World'} Literature Focus`;
  const collectionBadge = author.collectionBadge || 'Public Domain Collection';
  const archiveBadge = author.archiveBadge || `${period} HISTORICAL ARCHIVE`;

  const tags = author.tags && author.tags.length > 0
    ? author.tags
    : (author.notableThemes || ['Classical Literature', 'Philosophical Heritage']);

  const stats = author.stats || {
    worksCataloged: catalogCount,
    activeReaders: '12.8k',
    scholarlyRating: '4.9',
    globalTranslations: '100+'
  };

  const legacy = author.literaryLegacy || {
    category: 'LITERARY LEGACY',
    title: `The Literary Heritage of ${author.name}`,
    narrative: [
      author.bio,
      `Celebrated internationally for pioneering contributions to ${author.specialization || 'world literature'}, ${author.name}'s legacy endures across generations of scholars and readers.`
    ],
    quote: {
      text: author.quotes || 'What is essential is invisible to the eye. It is only with the heart that one can see rightly.',
      source: `— ${author.name.toUpperCase()}`
    },
    commentary: {
      title: 'Curatorial Commentary: Literary Significance',
      text: `An enduring voice whose thematic resonance transcends national frontiers, offering universal reflections on the human condition.`
    }
  };

  const milestones = author.milestones || [
    {
      year: startYear,
      location: author.nationality || 'Origins',
      title: 'Early Formative Period',
      description: `Formative youth and entry into literary and philosophical creation.`
    },
    {
      year: 'Major Work',
      location: 'Primary Canon',
      title: author.specialization || 'Masterwork Era',
      description: `Widespread critical acclaim and publication of seminal texts.`
    },
    {
      year: period.split('-')[1]?.trim() || 'Legacy',
      location: 'Global Preservation',
      title: 'Archival Enshrinement',
      description: `Transition into permanent world heritage, public domain, and global educational canon.`
    }
  ];

  const archivalDoc = author.archivalDocument || {
    image: '/images/authors/sahara-1935.jpg',
    tag: 'Archival Document: Historical Record',
    caption: `Archival photographic document recording ${author.name}'s era and cultural impact.`
  };

  const handleCopyCitation = () => {
    const citation = `BookBridge Archival Record: ${author.name} (${period}). Catalog ID: ${recordId}. BookBridge Digital Repository.`;
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors">
      {/* Top Breadcrumb & Archival Record Bar */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pt-6 pb-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          {/* Breadcrumb Left */}
          <nav className="flex items-center gap-2 flex-wrap font-medium">
            <button
              onClick={() => onNavigate && onNavigate('home')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Home
            </button>
            <span>&gt;</span>
            <button
              onClick={() => onNavigate && onNavigate('directory')}
              className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              Authors
            </button>
            <span>&gt;</span>
            <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[240px]">
              {author.name}
            </span>
          </nav>

          {/* Record Identifier Right */}
          <div className="flex items-center gap-4 flex-wrap">
            <button
              onClick={() => onNavigate && onNavigate('directory')}
              className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-semibold transition-colors"
            >
              <Icon name="arrow_back" className="text-[14px]" />
              <span>Back to Book Directory</span>
            </button>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 font-mono text-[11px]">
              <Icon name="verified" className="text-amber-600 dark:text-amber-400 text-[13px]" />
              <span>Verified Archival Entry # {recordId}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-16 space-y-10">
        {/* ================= HERO AUTHOR CARD ================= */}
        <section className="relative bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-10 shadow-sm overflow-hidden">
          {/* Giant Faint Outline Watermark */}
          <div
            aria-hidden="true"
            className="absolute right-4 bottom-[-20px] font-display text-[120px] sm:text-[180px] lg:text-[210px] font-extrabold text-slate-100/90 dark:text-slate-800/30 select-none pointer-events-none leading-none tracking-tighter"
          >
            {startYear}
          </div>

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12">
            {/* Left: Avatar & Archival Badges */}
            <div className="flex flex-col items-center shrink-0 space-y-3">
              <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full p-1.5 bg-gradient-to-tr from-amber-500/30 via-slate-200 dark:via-slate-700 to-amber-500/30 shadow-xl">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-800 border-2 border-white dark:border-slate-800">
                  <img
                    src={author.avatar}
                    alt={author.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Badges under avatar */}
              <div className="flex flex-col items-center space-y-1 text-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/60 text-sky-700 dark:text-sky-300 text-[11px] font-semibold border border-sky-100 dark:border-sky-900/60">
                  <span className="w-1.5 h-1.5 rounded-full bg-sky-500 animate-pulse" />
                  {collectionBadge}
                </span>
                <span className="text-[10px] uppercase font-bold tracking-widest text-slate-400 dark:text-slate-500">
                  {archiveBadge}
                </span>
              </div>
            </div>

            {/* Right: Info, Tags, Stats, Actions */}
            <div className="flex-1 text-center lg:text-left space-y-5">
              {/* Top Badges */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 text-xs">
                <span className="px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 font-semibold border border-amber-200/60 dark:border-amber-900/50 flex items-center gap-1">
                  <Icon name="history_edu" className="text-[14px]" />
                  Archival Record
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                  {focusArea}
                </span>
              </div>

              {/* Author Full Name */}
              <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
                {author.name}
              </h1>

              {/* Birth - Death & Location Line */}
              <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 font-normal">
                <span className="font-semibold text-slate-700 dark:text-slate-200">{period}</span>
                <span> · {birthPlace}</span>
                {deathInfo && <span>{deathInfo}</span>}
              </p>

              {/* Tag Pills */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 pt-1">
                {tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-xs font-medium bg-slate-100/90 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 max-w-2xl">
                <div className="text-center sm:text-left">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stats.worksCataloged}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                    Works Cataloged
                  </div>
                </div>
                <div className="text-center sm:text-left border-l border-slate-200 dark:border-slate-700/60 pl-3">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stats.activeReaders}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                    Active Readers
                  </div>
                </div>
                <div className="text-center sm:text-left border-l border-slate-200 dark:border-slate-700/60 pl-3">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center justify-center sm:justify-start gap-1">
                    <span>{stats.scholarlyRating}</span>
                    <Icon name="star" className="text-amber-500 text-[16px]" />
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                    Scholarly Rating
                  </div>
                </div>
                <div className="text-center sm:text-left border-l border-slate-200 dark:border-slate-700/60 pl-3">
                  <div className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {stats.globalTranslations}
                  </div>
                  <div className="text-[11px] text-slate-400 dark:text-slate-400 font-medium">
                    Global Translations
                  </div>
                </div>
              </div>

              {/* CTA Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setFollowing(!following)}
                  className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-sm transition-all cursor-pointer ${
                    following
                      ? 'bg-slate-800 text-white dark:bg-slate-700'
                      : 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-600/20'
                  }`}
                >
                  <Icon name={following ? 'notifications_active' : 'person_add'} className="text-[18px]" />
                  <span>{following ? 'Following Author' : 'Follow Author / Add Scholar Alerts'}</span>
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('directory')}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-amber-500 dark:hover:border-amber-500 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Icon name="menu_book" className="text-[18px] text-amber-600 dark:text-amber-400" />
                  <span>Original {author.nationality} Editions</span>
                </button>

                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                  title="Copy Citation"
                >
                  <Icon name={copiedCitation ? 'done' : 'format_quote'} className="text-[16px]" />
                  <span>{copiedCitation ? 'Citation Copied!' : 'Cite Source'}</span>
                </button>

                {isAdmin && (
                  <button
                    type="button"
                    onClick={() => onEditAdmin && onEditAdmin(author)}
                    className="px-4 py-2.5 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30 border border-amber-500/40 font-bold text-xs flex items-center gap-2 shadow-xs transition-all cursor-pointer"
                  >
                    <Icon name="edit" className="text-[16px]" />
                    <span>Chỉnh Sửa Hồ Sơ (Admin Dossier Editor)</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================= MAIN TWO-COLUMN SECTION ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* ================= LEFT COLUMN: LITERARY LEGACY (~65%) ================= */}
          <div className="lg:col-span-8 space-y-8">
            <div className="space-y-4">
              <span className="text-xs font-bold uppercase tracking-widest text-amber-600 dark:text-amber-400 block">
                {legacy.category}
              </span>
              <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 dark:text-slate-100 leading-tight">
                {legacy.title}
              </h2>
            </div>

            {/* Narrative text */}
            <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
              {legacy.narrative && legacy.narrative.map((paragraph, idx) => (
                <p key={idx}>{paragraph}</p>
              ))}
            </div>

            {/* Callout Quote Box */}
            {legacy.quote && (
              <div className="relative p-6 sm:p-8 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border-l-4 border-amber-500 border-t border-r border-b border-amber-200/50 dark:border-amber-900/30 shadow-sm space-y-3">
                <Icon name="format_quote" className="text-3xl text-amber-500/70" />
                <p className="font-display text-lg sm:text-xl font-bold italic text-slate-900 dark:text-slate-100 leading-snug">
                  "{legacy.quote.text}"
                </p>
                <div className="text-xs font-bold tracking-wider uppercase text-amber-700 dark:text-amber-400">
                  {legacy.quote.source}
                </div>
              </div>
            )}

            {/* Curatorial Commentary Box */}
            {legacy.commentary && (
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  <Icon name="auto_stories" className="text-[18px]" />
                  <span>{legacy.commentary.title}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                  {legacy.commentary.text}
                </p>
              </div>
            )}

            {/* Cataloged Works by Author */}
            <div className="pt-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                <h3 className="font-display text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Icon name="library_books" className="text-amber-600 dark:text-amber-400" />
                  <span>Cataloged Works in BookBridge</span>
                </h3>
                <span className="text-xs font-semibold text-slate-400">
                  {authoredBooks.length} available edition{authoredBooks.length > 1 ? 's' : ''}
                </span>
              </div>

              {authoredBooks.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {authoredBooks.map((bk) => (
                    <BookCard
                      key={bk._id || bk.id}
                      book={bk}
                      onSelect={() => onSelectBook && onSelectBook(bk)}
                      onSelectBook={() => onSelectBook && onSelectBook(bk)}
                    />
                  ))}
                </div>
              ) : (
                <div className="p-8 text-center rounded-2xl bg-slate-50 dark:bg-slate-900/50 border border-dashed border-slate-200 dark:border-slate-800">
                  <p className="text-sm text-slate-500">
                    Additional volumes for {author.name} are currently being transcribed into our archival repository.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: TIMELINE & ARCHIVAL DOCS (~35%) ================= */}
          <div className="lg:col-span-4 space-y-8">
            {/* Archival Milestones Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 sm:p-7 shadow-sm space-y-6">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
                <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                  Archival Milestones
                </h3>
                <span className="text-xs font-mono font-bold text-amber-600 dark:text-amber-400">
                  {period}
                </span>
              </div>

              {/* Timeline Items */}
              <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 dark:before:bg-slate-800">
                {milestones.map((item, idx) => (
                  <div key={idx} className="relative space-y-1">
                    {/* Node Dot */}
                    <div className="absolute -left-[27px] top-1.5 w-3 h-3 rounded-full bg-amber-500 ring-4 ring-white dark:ring-slate-900" />

                    <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400 font-semibold">
                      {item.year} · {item.location}
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 leading-snug">
                      {item.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Archival Document Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] bg-slate-950 relative border border-slate-200 dark:border-slate-800">
                <img
                  src={archivalDoc.image}
                  alt={archivalDoc.tag}
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2 right-2">
                  <span className="px-2.5 py-1 rounded bg-slate-900/80 text-slate-200 font-mono text-[10px] uppercase font-bold backdrop-blur-md">
                    {archivalDoc.tag}
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed italic px-1">
                {archivalDoc.caption}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetailScreen;
