import React, { useState } from 'react';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { useBooks } from '../../context/BookContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { Icon } from '../common/Icon.jsx';
import { BookCard } from '../BookCard.jsx';

export function BookDetailScreen({
  book,
  onNavigate,
  onSelectAuthor,
  onSelectRelatedBook,
  onOpenReader,
  onEditAdmin
}) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { getBookProgress, setStatusOnly, updateProgress } = useReadingTracker();
  const { getRelatedBooks, getAuthorById } = useBooks();
  const { isAdmin } = useAuth();

  if (!book) return null;

  const bookId = book._id || book.id;
  const favorited = isFavorite(bookId);
  const progress = getBookProgress(bookId);
  const relatedBooks = getRelatedBooks(book, 4);
  const authorObj = book.authorId ? getAuthorById(book.authorId) : null;

  const [inputPage, setInputPage] = useState(progress?.currentPage || 42);
  const [showProgressInput, setShowProgressInput] = useState(false);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const [copiedCitation, setCopiedCitation] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Fallbacks & defaults matching Image 2
  const title = book.originalTitle || book.title || 'Untitled Book';
  const subtitle = book.subtitle || (book.title && book.title !== title ? `(${book.title})` : '');
  const authorName = book.authorName || (authorObj ? authorObj.name : 'Antoine de Saint-Exupéry');
  const authorAvatar = book.authorAvatar || (authorObj ? authorObj.avatar : '/images/authors/antoine-portrait.jpg');
  const verifiedBadge = book.authorVerifiedBadge || 'Canonical Public Domain Edition';
  const coverImage = book.archivalCover || book.coverImage || '/images/books/le-petit-prince-archival.jpg';
  const coverBadge = book.coverBadge || 'ARCHIVAL COPY';
  const rating = book.rating || 4.88;
  const reviewsCount = book.reviewsCount || 216;
  const refCode = book.refCode || `REF: ${book.publicationYear || 1943}-NYC`;

  const totalPages = book.pageCount || 96;
  const currentPage = progress?.currentPage !== undefined ? progress.currentPage : 42;
  const currentStatus = progress?.status || 'Currently Reading';
  const readingPercent = Math.min(100, Math.round((currentPage / (totalPages || 1)) * 100));

  const tags = book.tags && book.tags.length > 0
    ? book.tags
    : [
      `${book.language || 'French'} Classic`,
      book.genre ? `${book.genre} Literature` : 'Philosophical Allegory',
      'Original Illustrations',
      'World Literature'
    ];

  const synopsisHeading = book.synopsisTitle || 'Synopsis & Narrative Architecture';
  const synopsisParagraphs = book.synopsisParagraphs || [
    book.synopsis || "Stranded in the desolation of the Sahara Desert following a mechanical plane failure, an aviator is awakened at daybreak by an ethereal boy requesting the sketch of a sheep. This miraculous encounter unfolds into an expansive chronicle of the Prince's journey away from his minuscule home, Asteroid B-612.",
    "Before arriving on Earth, the boy visits neighboring planets inhabited by solitary, tragic caricatures of adult vanity: an autocratic king with no subjects, an obsessive conceited man demanding applause, a drunkard drinking to drown his shame, and a ledger-bound businessman claiming stars as capital. Through each vignette, Saint-Exupéry exposes the absurdity of adult materialism.",
    "The emotional nucleus arrives in the terrestrial desert through the encounter with the Fox, who imparts the transcendent philosophy of 'taming' (apprivoiser)—the deliberate cultivation of relational bonds that transform an ordinary flower into a singular, sacred devotion in all the universe."
  ];

  const keyThemes = book.keyThemesList || [
    {
      title: 'Friendship & Cultivated Love',
      description: "The concept of taming defines affection not as an effortless accident, but as an active moral responsibility that demands vulnerability, fidelity, and patience."
    },
    {
      title: 'Innocence vs. Adulthood',
      description: "A relentless critique of grown-up narrowness that fixates on figures, titles, and ownership while ignoring beauty, vitality, and existential clarity."
    },
    {
      title: 'Solitude & Desert Wandering',
      description: "The stark Sahara serves as both literal exile and spiritual hermitage, stripping human existence down to its essential truths and unvarnished poetic clarity."
    },
    {
      title: 'Mortality & Memory',
      description: "The poignant departure of the Little Prince redefines death not as an end, but as a shedding of the earthly vessel to return to one's cherished origin."
    }
  ];

  const pedagogical = book.pedagogicalNotes || {
    level: 'CEFR A2-B1',
    grammarDynamics: 'Primarily written in the Passé Simple for historical narration juxtaposed with conversational Passé Composé and clear Imparfait descriptions.',
    lexicalNuance: "Mastery of terms like apprivoiser (to tame/cultivate), éphémère (fleeting/spiritual brevity), and un point dans l'espace for fragility."
  };

  const archivalMeta = book.archivalMetadata || {
    marcCompliant: true,
    originalLanguage: `${book.language || 'French'} (${book.language === 'French' ? 'Français' : book.language})`,
    firstPublished: `${book.publicationYear || 1943} (Reynal & Hitchcock, NY)`,
    pageCount: `${totalPages} pages`,
    genre: `${book.genre || 'Philosophical Fiction'} / Fable`,
    readingLevel: `${book.readingLevel || 'Beginner'} to Intermediate (A2-B1)`,
    suitableAudience: book.targetAudience || 'All Ages · Philosophers · Youths',
    repositoryIndex: `Book-${bookId} / ISBN: ${book.isbn || '978-0156012195'}`
  };

  const handleUpdateProgress = async (newPage) => {
    const p = Math.max(0, Math.min(totalPages, Number(newPage)));
    setInputPage(p);
    const res = await updateProgress(bookId, p, 3);
    if (res.success) {
      setToastMessage(`Updated to page ${p} (${Math.round((p / totalPages) * 100)}%)`);
      setTimeout(() => setToastMessage(''), 2500);
      setShowProgressInput(false);
    }
  };

  const handleStatusChange = async (newStatus) => {
    setStatusDropdownOpen(false);
    const res = await setStatusOnly(bookId, newStatus);
    if (res.success) {
      setToastMessage(`Status updated to: ${newStatus}`);
      setTimeout(() => setToastMessage(''), 2500);
    }
  };

  const handleCopyCitation = () => {
    const citation = `Saint-Exupéry, A. (${book.publicationYear || 1943}). ${title}. BookBridge Archival Catalog #${refCode}.`;
    navigator.clipboard?.writeText(citation);
    setCopiedCitation(true);
    setTimeout(() => setCopiedCitation(false), 2500);
  };

  return (
    <div className="w-full bg-[#f8f9ff] dark:bg-slate-950 min-h-screen text-slate-800 dark:text-slate-100 transition-colors">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center gap-2 border border-slate-700 animate-fade-in">
          <Icon name="check_circle" className="text-emerald-400 text-[18px]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Breadcrumb & Header Bar */}
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
              Books
            </button>
            <span>&gt;</span>
            <span className="text-slate-900 dark:text-slate-200 font-semibold truncate max-w-[260px]">
              {title}
            </span>
          </nav>

          {/* Back Action Right */}
          <button
            onClick={() => onNavigate && onNavigate('directory')}
            className="inline-flex items-center gap-1.5 text-amber-700 dark:text-amber-400 hover:text-amber-800 dark:hover:text-amber-300 font-semibold transition-colors"
          >
            <Icon name="arrow_back" className="text-[14px]" />
            <span>Back to Books Directory</span>
          </button>
        </div>
      </div>

      {/* Main Two-Column Container */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-10 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* ================= LEFT COLUMN (~35%): MEDIA & ARCHIVAL METADATA ================= */}
          <div className="lg:col-span-4 space-y-6">
            {/* Book Cover Card */}
            <div className="relative rounded-3xl overflow-hidden shadow-2xl bg-slate-950 border border-slate-200/80 dark:border-slate-800 group">
              <div className="relative aspect-[3/4] w-full">
                <img
                  src={coverImage}
                  alt={title}
                  className="w-full h-full object-cover transform group-hover:scale-103 transition-transform duration-500"
                />

                {/* Top Right: ARCHIVAL COPY Badge */}
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-amber-300 font-mono text-[10px] uppercase font-bold tracking-wider border border-amber-500/30 shadow-md">
                    {coverBadge}
                  </span>
                </div>

                {/* Bottom Overlay Bar: Rating & Reference Code */}
                <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs text-white">
                  <div className="flex items-center gap-1.5 font-semibold">
                    <span className="text-amber-400 flex items-center">
                      <Icon name="star" className="text-[16px]" />
                    </span>
                    <span>{rating}</span>
                    <span className="text-slate-400 font-normal">({reviewsCount} reviews)</span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-300 bg-white/10 px-2 py-0.5 rounded backdrop-blur-sm">
                    {refCode}
                  </div>
                </div>
              </div>
            </div>

            {/* Reading Progress Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm space-y-3">
              <div className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
                  <Icon name="bookmark" className="text-amber-500 text-[16px]" />
                  <span>In Your Library</span>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 font-semibold text-[11px] border border-amber-200/60 dark:border-amber-900/60">
                  {currentStatus}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
                  <span>Reading Progress</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    Page {currentPage} of {totalPages} ({readingPercent}%)
                  </span>
                </div>
                <div className="h-2 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-600 transition-all duration-300"
                    style={{ width: `${readingPercent}%` }}
                  />
                </div>
              </div>

              {/* Quick Update Button / Input */}
              <div className="pt-1">
                {showProgressInput ? (
                  <div className="flex items-center gap-2 pt-1">
                    <input
                      type="number"
                      min="0"
                      max={totalPages}
                      value={inputPage}
                      onChange={(e) => setInputPage(e.target.value)}
                      className="w-20 px-2.5 py-1 text-xs rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-none focus:ring-1 focus:ring-amber-500"
                    />
                    <button
                      type="button"
                      onClick={() => handleUpdateProgress(inputPage)}
                      className="px-3 py-1 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowProgressInput(false)}
                      className="px-2 py-1 text-xs text-slate-400 hover:text-slate-600"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setShowProgressInput(true)}
                    className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Icon name="edit" className="text-[13px]" />
                    <span>Update reading progress</span>
                  </button>
                )}
              </div>
            </div>

            {/* Actions Bar: Status dropdown + Favorite + Cite + Read CTA */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                {/* Status Dropdown */}
                <div className="relative flex-1">
                  <button
                    type="button"
                    onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-slate-900 text-white dark:bg-slate-800 hover:bg-slate-800 text-xs font-semibold flex items-center justify-between shadow-sm cursor-pointer"
                  >
                    <div className="flex items-center gap-2 truncate">
                      <Icon name="menu_book" className="text-[16px] text-amber-400" />
                      <span className="truncate">{currentStatus}</span>
                    </div>
                    <Icon name="expand_more" className="text-[18px]" />
                  </button>

                  {statusDropdownOpen && (
                    <div className="absolute top-full left-0 right-0 mt-1.5 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-30 text-xs">
                      {['Currently Reading', 'Want to Read', 'Finished'].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => handleStatusChange(st)}
                          className={`w-full text-left px-3.5 py-2 hover:bg-amber-50 dark:hover:bg-slate-700/60 font-medium ${currentStatus === st ? 'text-amber-600 dark:text-amber-400 font-bold' : 'text-slate-700 dark:text-slate-200'
                            }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Favorite / Bookmark Toggle */}
                <button
                  type="button"
                  onClick={() => toggleFavorite(bookId)}
                  className={`p-2.5 rounded-xl border transition-all cursor-pointer ${favorited
                      ? 'bg-rose-50 border-rose-200 text-rose-600 dark:bg-rose-950/40 dark:border-rose-900 dark:text-rose-400'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                    }`}
                  title={favorited ? 'Remove Bookmark' : 'Add to Bookmarks'}
                >
                  <Icon name={favorited ? 'favorite' : 'bookmark_border'} className="text-[18px]" />
                </button>

                {/* Share / Citation Button */}
                <button
                  type="button"
                  onClick={handleCopyCitation}
                  className="p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
                  title="Copy Citation"
                >
                  <Icon name={copiedCitation ? 'done' : 'share'} className="text-[18px]" />
                </button>
              </div>

              {/* Primary Online Reader CTA */}
              <button
                type="button"
                onClick={() => onOpenReader && onOpenReader(book)}
                className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-slate-950 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 transition-all transform active:scale-98 cursor-pointer"
              >
                <Icon name="auto_stories" className="text-[18px]" />
                <span>Đọc Trực Tuyến &amp; Ghi Nhật Ký</span>
              </button>

              {isAdmin && (
                <button
                  type="button"
                  onClick={() => onEditAdmin && onEditAdmin(book)}
                  className="w-full mt-2.5 py-3 px-4 rounded-xl bg-slate-900 text-amber-400 hover:bg-slate-800 dark:bg-amber-500/20 dark:text-amber-300 dark:hover:bg-amber-500/30 border border-amber-500/40 font-bold text-xs flex items-center justify-center gap-2 shadow-xs transition-all cursor-pointer"
                >
                  <Icon name="edit_document" className="text-[18px]" />
                  <span>Chỉnh Sửa Sách (Admin Record Editor)</span>
                </button>
              )}
            </div>

            {/* Archival Metadata Card */}
            <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="font-display text-base font-bold text-slate-900 dark:text-slate-100">
                  Archival Metadata
                </h3>
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300">
                  MARC-21 COMPLIANT
                </span>
              </div>

              <div className="space-y-3.5 text-xs">
                {/* Original Language */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="translate" className="text-[15px]" />
                    <span>Original Language</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                    {archivalMeta.originalLanguage}
                  </span>
                </div>

                {/* First Published */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="calendar_today" className="text-[15px]" />
                    <span>First Published</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                    {archivalMeta.firstPublished}
                  </span>
                </div>

                {/* Page Count */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="menu_book" className="text-[15px]" />
                    <span>Page Count</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                    {archivalMeta.pageCount}
                  </span>
                </div>

                {/* Genre */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="category" className="text-[15px]" />
                    <span>Genre</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                    {archivalMeta.genre}
                  </span>
                </div>

                {/* Reading Level */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="school" className="text-[15px]" />
                    <span>Reading Level</span>
                  </div>
                  <span className="font-medium text-amber-600 dark:text-amber-400 text-right">
                    {archivalMeta.readingLevel}
                  </span>
                </div>

                {/* Suitable Audience */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="group" className="text-[15px]" />
                    <span>Suitable Audience</span>
                  </div>
                  <span className="font-medium text-slate-800 dark:text-slate-200 text-right">
                    {archivalMeta.suitableAudience}
                  </span>
                </div>

                {/* Repository Index / ISBN */}
                <div className="flex items-start justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Icon name="tag" className="text-[15px]" />
                    <span>Repository Index</span>
                  </div>
                  <span className="font-mono text-[11px] font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded">
                    {archivalMeta.repositoryIndex}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN (~65%): EDITORIAL, SYNOPSIS & THEMES ================= */}
          <div className="lg:col-span-8 space-y-8">
            {/* Tags Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {tags.map((tg, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 border border-sky-100 dark:border-sky-900/50"
                >
                  {tg}
                </span>
              ))}
            </div>

            {/* Title & Subtitle */}
            <div className="space-y-1">
              <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="font-display text-xl sm:text-2xl text-slate-500 dark:text-slate-400 italic">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Author Byline Row */}
            <div className="flex flex-wrap items-center gap-3 py-2 border-y border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm">
              <div
                onClick={() => onSelectAuthor && onSelectAuthor(book.authorId || 'auth-02')}
                className="flex items-center gap-2.5 cursor-pointer group"
                title={`View author dossier for ${authorName}`}
              >
                <div className="w-8 h-8 rounded-full overflow-hidden border border-amber-500/30 bg-slate-800">
                  <img
                    src={authorAvatar}
                    alt={authorName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                  />
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="text-slate-500 dark:text-slate-400">Written by</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 group-hover:underline transition-colors">
                    {authorName}
                  </span>
                </div>
              </div>

              <span className="text-slate-300 dark:text-slate-700">•</span>

              <div className="inline-flex items-center gap-1.5 text-slate-600 dark:text-slate-400 text-xs">
                <Icon name="verified" className="text-amber-500 text-[16px]" />
                <span>{verifiedBadge}</span>
              </div>            </div>

            {/* Section: Synopsis & Narrative Architecture */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Icon name="history_edu" className="text-amber-600 dark:text-amber-400 text-[20px]" />
                <h2 className="font-display text-2xl sm:text-3xl font-bold">
                  {synopsisHeading}
                </h2>
              </div>
              <div className="prose dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-4">
                {synopsisParagraphs.map((par, i) => (
                  <p key={i}>{par}</p>
                ))}
              </div>
            </div>

            {/* Section: Key Themes & Literary Value */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-2 text-slate-900 dark:text-slate-100">
                <Icon name="auto_awesome" className="text-amber-600 dark:text-amber-400 text-[20px]" />
                <h3 className="font-display text-xl sm:text-2xl font-bold">
                  Key Themes &amp; Literary Value
                </h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyThemes.map((th, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-2 hover:border-amber-500/40 transition-colors"
                  >
                    <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
                      <Icon
                        name={['favorite', 'child_care', 'explore', 'hourglass_empty'][idx % 4]}
                        className="text-[18px]"
                      />
                      <h4 className="font-display text-sm font-bold text-slate-900 dark:text-slate-100">
                        {th.title}
                      </h4>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {th.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Section: Pedagogical Notes */}
            {pedagogical && (
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div className="flex items-center gap-2 font-display text-base font-bold text-slate-900 dark:text-slate-100">
                    <Icon name="menu_book" className="text-sky-600 dark:text-sky-400 text-[18px]" />
                    <span>Pedagogical Notes for Francophile Learners</span>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full bg-sky-50 dark:bg-sky-950/50 text-sky-700 dark:text-sky-300 font-mono text-[11px] font-bold border border-sky-200/60 dark:border-sky-900/60">
                    {pedagogical.level}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block text-[10px]">
                      GRAMMAR DYNAMICS
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pedagogical.grammarDynamics}
                    </p>
                  </div>
                  <div className="space-y-1.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800">
                    <span className="font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 block text-[10px]">
                      LEXICAL NUANCE
                    </span>
                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                      {pedagogical.lexicalNuance}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Related Books in Archival Collection */}
            {relatedBooks && relatedBooks.length > 0 && (
              <div className="pt-6 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3">
                  <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                    <Icon name="library_books" className="text-amber-600 dark:text-amber-400" />
                    <span>Related Works in Archival Catalog</span>
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedBooks.slice(0, 3).map((rbk) => (
                    <BookCard
                      key={rbk._id || rbk.id}
                      book={rbk}
                      onSelect={() => onSelectRelatedBook && onSelectRelatedBook(rbk)}
                      onSelectBook={() => onSelectRelatedBook && onSelectRelatedBook(rbk)}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailScreen;
