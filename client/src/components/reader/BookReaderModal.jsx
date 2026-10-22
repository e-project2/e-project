import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { getBookReadingContent } from '../../utils/readerContent.js';
import { Icon } from '../common/Icon.jsx';

export function BookReaderModal({ book, onClose }) {
  const { getBookProgress, updateProgress } = useReadingTracker();

  if (!book) return null;

  const bookId = book._id || book.id;
  const existingProgress = getBookProgress(bookId);

  // Load book reading structure (chapters, pages, totalPages)
  const { chapters, pages, totalPages } = useMemo(() => {
    return getBookReadingContent(book);
  }, [book]);

  // Initial page: restore last read page or default to 1
  const initialPage = useMemo(() => {
    if (existingProgress && existingProgress.currentPage > 0) {
      return Math.min(existingProgress.currentPage, totalPages || 1);
    }
    return 1;
  }, [existingProgress, totalPages]);

  const [currentPageNum, setCurrentPageNum] = useState(initialPage);
  const [readerTheme, setReaderTheme] = useState('sepia'); // 'sepia' | 'dark' | 'light'
  const [fontSizeLevel, setFontSizeLevel] = useState(2); // 1: sm (15px), 2: base (17px), 3: lg (19px), 4: xl (22px)
  const [showToc, setShowToc] = useState(false);
  const [showNotesModal, setShowNotesModal] = useState(false);
  const [readerNotes, setReaderNotes] = useState(existingProgress?.notes || '');
  const [saveStatusMsg, setSaveStatusMsg] = useState('');
  const [isFlipping, setIsFlipping] = useState(false);

  // Active page object
  const activePage = pages[currentPageNum - 1] || pages[0] || {
    pageNumber: 1,
    chapterTitle: 'Chương 1',
    content: 'Đang tải nội dung sách...'
  };

  // Font size styling
  const fontSizeClasses = [
    'text-[15px] leading-relaxed',
    'text-[17px] leading-loose',
    'text-[19px] leading-loose',
    'text-[22px] leading-loose'
  ];

  // Theme styling
  const themeClasses = {
    sepia: 'bg-[#f7efe1] text-[#3d2e1e] border-[#e6d8c3]',
    light: 'bg-white text-slate-800 border-slate-200',
    dark: 'bg-[#12161f] text-slate-200 border-slate-850'
  };

  const themePaperClasses = {
    sepia: 'bg-[#fffaf0] text-[#2c1d11] shadow-[#e2d5bf]/50 border-[#ebdcc4]',
    light: 'bg-white text-slate-900 shadow-slate-200 border-slate-100',
    dark: 'bg-[#181f2c] text-slate-100 shadow-black/60 border-slate-800'
  };

  // Auto-save progress to tracker and backend API
  const syncProgressToTracker = useCallback(
    async (pageToSave, notesToSave = readerNotes) => {
      const effectiveTotalPages = totalPages || book.pageCount || 10;
      const isCompleted = pageToSave >= effectiveTotalPages;
      const newStatus = isCompleted ? 'Completed' : 'Reading';

      try {
        const res = await updateProgress(
          bookId,
          pageToSave,
          effectiveTotalPages,
          newStatus,
          notesToSave
        );

        if (res.success) {
          const pct = Math.min(100, Math.round((pageToSave / effectiveTotalPages) * 100));
          setSaveStatusMsg(`Đã ghi nhận nhật ký: Trang ${pageToSave}/${effectiveTotalPages} (${pct}%)`);
          setTimeout(() => setSaveStatusMsg(''), 3000);
        }
      } catch (err) {
        console.error('Error auto-syncing reading tracker:', err);
      }
    },
    [bookId, totalPages, book.pageCount, updateProgress, readerNotes]
  );

  // Page navigation handlers
  const handleNextPage = useCallback(() => {
    if (currentPageNum < totalPages) {
      setIsFlipping(true);
      const nextPage = currentPageNum + 1;
      setCurrentPageNum(nextPage);
      syncProgressToTracker(nextPage);
      setTimeout(() => setIsFlipping(false), 200);
    }
  }, [currentPageNum, totalPages, syncProgressToTracker]);

  const handlePrevPage = useCallback(() => {
    if (currentPageNum > 1) {
      setIsFlipping(true);
      const prevPage = currentPageNum - 1;
      setCurrentPageNum(prevPage);
      syncProgressToTracker(prevPage);
      setTimeout(() => setIsFlipping(false), 200);
    }
  }, [currentPageNum, syncProgressToTracker]);

  const handleJumpToPage = (pageNum) => {
    const valid = Math.max(1, Math.min(totalPages, pageNum));
    setCurrentPageNum(valid);
    syncProgressToTracker(valid);
    setShowToc(false);
  };

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || (e.key === ' ' && !e.target.matches('textarea, input'))) {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleNextPage, handlePrevPage, onClose]);

  // Initial sync when opening reader if not started
  useEffect(() => {
    if (!existingProgress || existingProgress.currentPage === 0) {
      syncProgressToTracker(1);
    }
  }, []);

  const currentPercent = Math.min(100, Math.round((currentPageNum / totalPages) * 100));

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md animate-fadeIn select-none"
      role="dialog"
      aria-modal="true"
      aria-label={`Online Reader - ${book.title}`}
    >
      <div
        className={`w-full max-w-5xl h-[94vh] rounded-3xl flex flex-col overflow-hidden shadow-2xl border transition-colors duration-300 ${themeClasses[readerTheme]}`}
      >
        {/* ================= 1. TOP HEADER TOOLBAR ================= */}
        <header className="px-4 sm:px-6 py-3 border-b flex items-center justify-between gap-3 shrink-0 backdrop-blur-sm bg-black/5 dark:bg-black/20">
          {/* Left: Book Meta & Table of Contents Toggle */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <button
              onClick={() => setShowToc(!showToc)}
              className={`py-1.5 px-3 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all ${
                showToc
                  ? 'bg-amber-500 text-slate-950 border-amber-600 shadow-sm'
                  : 'bg-black/5 hover:bg-black/10 border-transparent'
              }`}
              title="Danh mục chương sách (Mục lục)"
            >
              <Icon name="format_list_bulleted" className="text-[16px]" />
              <span className="hidden sm:inline">Mục lục</span>
            </button>

            <div className="min-w-0">
              <h2 className="font-display font-bold text-sm sm:text-base truncate max-w-[200px] sm:max-w-md">
                {book.title}
              </h2>
              <p className="text-[11px] opacity-70 truncate">
                {book.authorName || book.author} • {activePage.chapterTitle}
              </p>
            </div>
          </div>

          {/* Right: Controls (Theme, Font size, Notes, Close) */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {/* Theme switcher */}
            <div className="flex items-center p-1 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5">
              <button
                onClick={() => setReaderTheme('sepia')}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  readerTheme === 'sepia' ? 'bg-[#e5d4bb] text-[#3d2e1e] shadow-xs' : 'opacity-60 hover:opacity-100'
                }`}
                title="Chế độ trang sách Sepia ấm"
              >
                📜
              </button>
              <button
                onClick={() => setReaderTheme('light')}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  readerTheme === 'light' ? 'bg-white text-slate-900 shadow-xs' : 'opacity-60 hover:opacity-100'
                }`}
                title="Chế độ trang sách sáng"
              >
                ☀️
              </button>
              <button
                onClick={() => setReaderTheme('dark')}
                className={`w-7 h-7 rounded-lg text-xs font-bold flex items-center justify-center transition-all ${
                  readerTheme === 'dark' ? 'bg-slate-800 text-amber-400 shadow-xs' : 'opacity-60 hover:opacity-100'
                }`}
                title="Chế độ đọc ban đêm OLED"
              >
                🌙
              </button>
            </div>

            {/* Font size +/- */}
            <div className="hidden sm:flex items-center p-1 rounded-xl bg-black/5 dark:bg-black/30 border border-black/5 text-xs">
              <button
                onClick={() => setFontSizeLevel(prev => Math.max(0, prev - 1))}
                className="w-7 h-7 rounded-lg font-bold flex items-center justify-center hover:bg-black/10 transition-colors"
                title="Giảm cỡ chữ"
                disabled={fontSizeLevel === 0}
              >
                A-
              </button>
              <span className="px-1 text-[11px] opacity-60 font-semibold">{fontSizeLevel + 1}</span>
              <button
                onClick={() => setFontSizeLevel(prev => Math.min(3, prev + 1))}
                className="w-7 h-7 rounded-lg font-bold flex items-center justify-center hover:bg-black/10 transition-colors"
                title="Tăng cỡ chữ"
                disabled={fontSizeLevel === 3}
              >
                A+
              </button>
            </div>

            {/* Quick note button */}
            <button
              onClick={() => setShowNotesModal(true)}
              className="btn-icon w-8 h-8 rounded-xl bg-black/5 hover:bg-black/10 text-xs"
              title="Ghi chép cảm nghĩ nhật ký đọc sách"
            >
              <Icon name="edit_note" className="text-[18px]" />
            </button>

            {/* Close button */}
            <button
              onClick={onClose}
              className="btn-icon w-8 h-8 rounded-xl bg-black/5 hover:bg-rose-500 hover:text-white transition-colors"
              title="Đóng (Esc)"
            >
              <Icon name="close" className="text-[18px]" />
            </button>
          </div>
        </header>

        {/* ================= 2. MAIN READING CANVAS ================= */}
        <div className="relative flex-1 flex overflow-hidden">
          {/* Table of Contents Drawer */}
          {showToc && (
            <div className="absolute inset-y-0 left-0 w-72 sm:w-80 bg-white dark:bg-slate-900 shadow-2xl border-r border-slate-200 dark:border-slate-800 z-30 p-5 flex flex-col animate-slideRight">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-2">
                  <Icon name="menu_book" className="text-amber-500 text-[18px]" />
                  Danh Sách Chương
                </span>
                <button
                  onClick={() => setShowToc(false)}
                  className="btn-icon w-7 h-7 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
                >
                  <Icon name="close" className="text-[16px]" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto py-3 space-y-2">
                {chapters.map((ch, idx) => {
                  const firstPageOfChapter = ch.pages && ch.pages[0] ? ch.pages[0].pageNumber : 1;
                  const isCurrentChapter = activePage.chapterNumber === ch.chapterNumber;

                  return (
                    <button
                      key={idx}
                      onClick={() => handleJumpToPage(firstPageOfChapter)}
                      className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 text-xs ${
                        isCurrentChapter
                          ? 'bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold border border-amber-500/30'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="block text-[10px] uppercase tracking-wider text-slate-400">
                          Chương {ch.chapterNumber}
                        </span>
                        <p className="line-clamp-2 mt-0.5">{ch.title}</p>
                      </div>
                      <span className="shrink-0 px-2 py-0.5 rounded-full bg-slate-200/60 dark:bg-slate-800 text-[10px] font-mono">
                        Trang {firstPageOfChapter}
                      </span>
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Tổng số: {totalPages} trang</span>
                <span className="text-amber-600 dark:text-amber-400 font-bold">
                  {currentPercent}% đã đọc
                </span>
              </div>
            </div>
          )}

          {/* Previous Page Button (Left Edge) */}
          <button
            onClick={handlePrevPage}
            disabled={currentPageNum <= 1}
            className={`absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full border shadow-lg flex items-center justify-center transition-all z-20 ${
              currentPageNum <= 1
                ? 'opacity-0 pointer-events-none'
                : 'bg-white/80 dark:bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 backdrop-blur-md opacity-75 hover:opacity-100 hover:scale-105 active:scale-95'
            }`}
            title="Trang trước (Phím Mũi tên Trái ←)"
          >
            <Icon name="chevron_left" className="text-[24px]" />
          </button>

          {/* Reading Page Paper Body */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-12 md:px-20 py-8 flex justify-center">
            <article
              className={`w-full max-w-3xl my-auto p-6 sm:p-12 md:p-16 rounded-2xl border shadow-xl transition-all duration-300 font-serif ${themePaperClasses[readerTheme]} ${
                isFlipping ? 'opacity-40 scale-[0.99]' : 'opacity-100 scale-100'
              }`}
            >
              {/* Header inside page */}
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-current/15 text-[11px] uppercase tracking-widest opacity-60">
                <span className="truncate max-w-[200px] sm:max-w-xs">{book.title}</span>
                <span>{activePage.chapterTitle}</span>
              </div>

              {/* Page Content with Drop-Cap styling on first letter */}
              <div className={`space-y-4 leading-relaxed tracking-normal ${fontSizeClasses[fontSizeLevel]}`}>
                {activePage.content.split('\n\n').map((paragraph, pIdx) => {
                  const trimmed = paragraph.trim();
                  if (!trimmed) return null;

                  return (
                    <p
                      key={pIdx}
                      className="text-justify indent-6 sm:indent-8 first-letter:float-left first-letter:text-3xl first-letter:sm:text-4xl first-letter:font-bold first-letter:mr-2.5 first-letter:leading-none"
                    >
                      {trimmed}
                    </p>
                  );
                })}
              </div>

              {/* Footer inside page */}
              <div className="pt-8 mt-8 border-t border-current/15 flex items-center justify-between text-xs opacity-60 font-mono">
                <span>{book.authorName || book.author}</span>
                <span className="font-bold">— Trang {currentPageNum} / {totalPages} —</span>
                <span>{currentPercent}%</span>
              </div>
            </article>
          </div>

          {/* Next Page Button (Right Edge) */}
          <button
            onClick={handleNextPage}
            disabled={currentPageNum >= totalPages}
            className={`absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-10 sm:w-12 h-10 sm:h-12 rounded-full border shadow-lg flex items-center justify-center transition-all z-20 ${
              currentPageNum >= totalPages
                ? 'opacity-0 pointer-events-none'
                : 'bg-white/80 dark:bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 backdrop-blur-md opacity-75 hover:opacity-100 hover:scale-105 active:scale-95'
            }`}
            title="Trang sau (Phím Mũi tên Phải → hoặc Phím Cách)"
          >
            <Icon name="chevron_right" className="text-[24px]" />
          </button>
        </div>

        {/* ================= 3. BOTTOM FOOTER & LIVE TRACKER STATUS ================= */}
        <footer className="px-4 sm:px-6 py-3 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0 backdrop-blur-sm bg-black/5 dark:bg-black/20 text-xs">
          {/* Left: Live Notification Badge */}
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="font-semibold text-emerald-700 dark:text-emerald-400">
              {saveStatusMsg || `Nhật ký tự động đồng bộ: Trang ${currentPageNum}/${totalPages}`}
            </span>
            {currentPageNum >= totalPages && (
              <span className="px-2 py-0.5 rounded-full bg-emerald-500 text-white font-bold text-[10px]">
                ĐÃ HOÀN THÀNH
              </span>
            )}
          </div>

          {/* Center: Live Slider Page Bar */}
          <div className="flex items-center gap-3 w-full sm:w-80">
            <button
              onClick={handlePrevPage}
              disabled={currentPageNum <= 1}
              className="p-1 rounded hover:bg-black/10 disabled:opacity-30"
              title="Trang trước"
            >
              <Icon name="skip_previous" className="text-[18px]" />
            </button>

            <div className="flex-1 flex items-center gap-2">
              <input
                type="range"
                min="1"
                max={totalPages}
                value={currentPageNum}
                onChange={(e) => handleJumpToPage(Number(e.target.value))}
                className="w-full accent-amber-500 cursor-pointer h-1.5 rounded-lg bg-black/15"
              />
              <span className="font-mono font-bold text-xs shrink-0 min-w-[50px] text-right">
                {currentPageNum}/{totalPages}
              </span>
            </div>

            <button
              onClick={handleNextPage}
              disabled={currentPageNum >= totalPages}
              className="p-1 rounded hover:bg-black/10 disabled:opacity-30"
              title="Trang sau"
            >
              <Icon name="skip_next" className="text-[18px]" />
            </button>
          </div>

          {/* Right: Quick Note Status */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowNotesModal(true)}
              className="hover:underline flex items-center gap-1 font-semibold text-amber-600 dark:text-amber-400"
            >
              <Icon name="history_edu" className="text-[15px]" />
              <span>{readerNotes ? 'Xem ghi chép' : 'Thêm cảm nghĩ'}</span>
            </button>
          </div>
        </footer>
      </div>

      {/* ================= 4. PERSONAL READING NOTES MODAL ================= */}
      {showNotesModal && (
        <div
          className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn"
          onClick={() => setShowNotesModal(false)}
        >
          <div
            className="w-full max-w-md p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-amber-500/15 text-amber-600 flex items-center justify-center">
                  <Icon name="edit_note" className="text-[20px]" />
                </div>
                <div>
                  <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100">
                    Nhật Ký Cảm Nghĩ Đọc Sách
                  </h3>
                  <p className="text-[11px] text-slate-400">Trang hiện tại: {currentPageNum}/{totalPages}</p>
                </div>
              </div>
              <button
                onClick={() => setShowNotesModal(false)}
                className="btn-icon w-7 h-7 text-slate-400 hover:text-slate-700"
              >
                <Icon name="close" className="text-[16px]" />
              </button>
            </div>

            <textarea
              rows="5"
              value={readerNotes}
              onChange={(e) => setReaderNotes(e.target.value)}
              placeholder="Ghi lại những câu nói tâm đắc, trích dẫn đáng nhớ hoặc suy ngẫm của bạn khi đọc trang sách này..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs leading-relaxed focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                Hủy
              </button>
              <button
                onClick={() => {
                  syncProgressToTracker(currentPageNum, readerNotes);
                  setShowNotesModal(false);
                }}
                className="px-4 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs shadow-md"
              >
                Lưu Nhật Ký
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BookReaderModal;
