import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { ImageWithFallback } from '../common/ImageWithFallback.jsx';
import { ReadingProgressModal } from './ReadingProgressModal.jsx';
import { Icon } from '../common/Icon.jsx';

export function MyLibraryScreen({ onNavigate, onSelectBook, onOpenReader }) {
  const { books } = useBooks();
  const { favorites, isFavorite, toggleFavorite, removeFavorite, refreshFavorites, clearAllFavorites } = useFavorites();
  const {
    tracker,
    stats,
    setStatusOnly,
    clearProgress,
    removeFromTracker,
    clearAllTracker,
    refreshTracker
  } = useReadingTracker();

  const [activeTab, setActiveTab] = useState('ALL'); // 'ALL' | 'FAVORITES' | 'READING' | 'COMPLETED' | 'TO_READ'
  const [searchQuery, setSearchQuery] = useState('');
  const [modalBook, setModalBook] = useState(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // Combine book IDs that are favorited OR tracked
  const libraryBookIds = Array.from(new Set([...favorites, ...Object.keys(tracker)]));

  // Resolve books robustly from live books state from backend
  const libraryBooks = libraryBookIds
    .map(id => {
      const match = (books || []).find(b => b._id === id || b.id === id || String(b._id) === String(id) || String(b.id) === String(id));
      return match || null;
    })
    .filter(Boolean);

  // Filter books by active tab and search query
  const filteredLibrary = libraryBooks.filter((book) => {
    const bookId = book._id || book.id;
    const progress = tracker[bookId];
    const isFav = isFavorite(bookId);
    const status = progress?.status || (isFav ? 'To Read' : 'To Read');

    // Tab filtering
    if (activeTab === 'FAVORITES') {
      if (!isFav) return false;
    } else if (activeTab === 'READING') {
      if (status !== 'Reading') return false;
    } else if (activeTab === 'COMPLETED') {
      if (status !== 'Completed') return false;
    } else if (activeTab === 'TO_READ') {
      if (status !== 'To Read') return false;
    }

    // Search query filtering (by title, author, genre)
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      const matchTitle = (book.title || '').toLowerCase().includes(q);
      const matchAuthor = (book.authorName || book.author || '').toLowerCase().includes(q);
      const matchGenre = (book.genre || '').toLowerCase().includes(q);
      if (!matchTitle && !matchAuthor && !matchGenre) return false;
    }

    return true;
  });

  const handleSyncWithServer = async () => {
    try {
      setIsSyncing(true);
      await Promise.allSettled([
        refreshFavorites ? refreshFavorites() : Promise.resolve(),
        refreshTracker ? refreshTracker() : Promise.resolve()
      ]);
      showToast('Đã đồng bộ dữ liệu mới nhất từ máy chủ thành công!');
    } catch {
      showToast('Đồng bộ hoàn tất ở chế độ bộ nhớ cục bộ.');
    } finally {
      setIsSyncing(false);
    }
  };

  const handleClearAll = () => {
    if (window.confirm('Bạn có chắc muốn dọn sạch toàn bộ danh sách yêu thích và tiến độ đọc lưu tạm?')) {
      if (clearAllFavorites) clearAllFavorites();
      if (clearAllTracker) clearAllTracker();
      showToast('Đã dọn dẹp sạch toàn bộ dữ liệu lưu tạm.');
    }
  };

  const handleRemoveItem = (bookId) => {
    removeFavorite(bookId);
    removeFromTracker(bookId);
    showToast('Đã gỡ sách khỏi thư viện cá nhân.');
  };

  return (
    <div className="w-full pb-20">
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-700 animate-slide-up text-sm font-medium">
          <Icon name="check_circle" className="text-emerald-400 text-lg" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header */}
      <div className="w-full bg-gradient-to-b from-blue-50/50 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Icon name="bookmark_heart" className="text-[16px]" />
              <span>Personal Reading Sanctuary</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              My Library & Reading Tracker
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
              Theo dõi sách yêu thích và nhật ký đọc từng trang theo thời gian thực. Toàn bộ dữ liệu đồng bộ tự động với API máy chủ.
            </p>
          </div>

          {/* Action Toolbar */}
          <div className="flex items-center gap-2 self-start md:self-auto flex-wrap">
            <button
              onClick={handleSyncWithServer}
              disabled={isSyncing}
              className="btn btn-outline text-xs py-2 px-3.5 flex items-center gap-1.5 cursor-pointer shadow-xs bg-white dark:bg-slate-900"
              title="Đồng bộ lại dữ liệu mới nhất từ API máy chủ"
            >
              <Icon name="sync" className={`text-[15px] ${isSyncing ? 'animate-spin text-amber-500' : ''}`} />
              <span>{isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ từ máy chủ'}</span>
            </button>
            <button
              onClick={handleClearAll}
              className="btn btn-secondary text-xs py-2 px-3 flex items-center gap-1.5 text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30"
              title="Xóa dữ liệu cũ trong bộ nhớ tạm"
            >
              <Icon name="delete_sweep" className="text-[16px]" />
              <span>Dọn dẹp thư viện</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bb-container py-8 space-y-8">
        {/* Statistics Bar (4 Cards) */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center">
              <Icon name="collections_bookmark" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Tổng đã lưu
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {libraryBooks.length}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 dark:bg-rose-950/50 text-rose-500 flex items-center justify-center">
              <Icon name="favorite" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Sách yêu thích
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {favorites.length}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 flex items-center justify-center">
              <Icon name="auto_stories" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Đang đọc
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.readingCount}
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center">
              <Icon name="task_alt" className="text-[24px]" />
            </div>
            <div>
              <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Đã hoàn thành
              </span>
              <span className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stats.completedCount}
              </span>
            </div>
          </div>
        </div>

        {/* Filter Controls: Tabs + Search Bar */}
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Tab Bar Switcher */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800/80 overflow-x-auto">
            {[
              { id: 'ALL', label: 'Tất cả', count: libraryBooks.length },
              { id: 'FAVORITES', label: 'Yêu thích ❤️', count: favorites.length },
              { id: 'READING', label: 'Đang đọc', count: stats.readingCount },
              { id: 'COMPLETED', label: 'Đã xong', count: stats.completedCount },
              { id: 'TO_READ', label: 'Dự định đọc', count: stats.toReadCount }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-2 px-3 sm:px-4 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  activeTab === tab.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-amber-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count > 0 && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold ${
                    activeTab === tab.id
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[260px] md:w-72">
            <Icon name="search" className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-[18px]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Tìm kiếm sách trong thư viện..."
              className="w-full pl-10 pr-8 py-2 rounded-xl text-xs bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 shadow-xs"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <Icon name="close" className="text-[14px]" />
              </button>
            )}
          </div>
        </div>

        {/* Library Content */}
        {filteredLibrary.length === 0 ? (
          /* Empty State */
          <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 max-w-lg mx-auto shadow-sm">
            <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto">
              <Icon name="menu_book" className="text-[32px]" />
            </div>
            <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
              {searchQuery
                ? 'Không tìm thấy sách phù hợp'
                : activeTab === 'FAVORITES'
                ? 'Chưa có cuốn sách nào được thả tim'
                : 'Thư viện của bạn đang trống'}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed">
              {searchQuery
                ? `Không có sách nào khớp với từ khóa "${searchQuery}". Hãy thử tìm kiếm tên tác phẩm hoặc tác giả khác.`
                : activeTab === 'FAVORITES'
                ? 'Bấm biểu tượng trái tim ở bất kỳ cuốn sách nào trên hệ thống để lưu vào danh sách yêu thích của bạn!'
                : 'Khám phá ngay danh mục sách kinh điển để thêm vào danh sách đọc hoặc đánh dấu yêu thích.'}
            </p>
            <div className="flex items-center justify-center gap-3 pt-2">
              {searchQuery ? (
                <button
                  onClick={() => setSearchQuery('')}
                  className="btn btn-secondary text-xs py-2 px-4 shadow-sm"
                >
                  Xóa từ khóa tìm kiếm
                </button>
              ) : (
                <button
                  onClick={() => onNavigate('directory')}
                  className="btn btn-primary text-xs py-2.5 px-6 shadow-sm flex items-center gap-2"
                >
                  <Icon name="explore" />
                  <span>Khám phá danh mục sách ngay</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* List of Library Cards */
          <div className="space-y-4">
            {filteredLibrary.map((book) => {
              const bookId = book._id || book.id;
              const isFav = isFavorite(bookId);
              const progress = tracker[bookId] || {
                status: 'To Read',
                currentPage: 0,
                totalPages: 3,
                percentage: 0
              };

              return (
                <div
                  key={bookId}
                  className="bb-card p-4 sm:p-6 bg-white dark:bg-slate-900 rounded-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:shadow-md transition-all border border-slate-200/80 dark:border-slate-800"
                >
                  {/* Left: Book Media & Info */}
                  <div
                    onClick={() => onSelectBook && onSelectBook(book)}
                    className="flex items-center gap-4 cursor-pointer flex-1 min-w-0 group"
                  >
                    <div className="relative w-16 h-24 sm:w-20 sm:h-28 rounded-xl overflow-hidden shadow-md shrink-0 bg-slate-950">
                      <ImageWithFallback
                        src={book.coverImage}
                        alt={book.title}
                        title={book.title}
                        author={book.authorName}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <div className="space-y-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600">
                          {book.genre} • {book.language}
                        </span>
                        {isFav && (
                          <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-600 dark:bg-rose-950/40 dark:text-rose-400">
                            <Icon name="favorite" className="text-[11px]" />
                            <span>Đã thả tim</span>
                          </span>
                        )}
                      </div>
                      <h3 className="font-display font-bold text-base sm:text-lg text-slate-900 dark:text-slate-100 truncate group-hover:text-amber-500 transition-colors">
                        {book.title}
                      </h3>
                      <p className="text-xs text-slate-400 truncate">
                        Tác giả: {book.authorName || book.author || 'Tác giả kinh điển'} • 3 trang đọc trực tuyến
                      </p>
                    </div>
                  </div>

                  {/* Center: Reading Status & Progress */}
                  <div className="w-full md:w-72 space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-1.5">
                        {[
                          { key: 'To Read', label: 'Dự định' },
                          { key: 'Reading', label: 'Đang đọc' },
                          { key: 'Completed', label: 'Đã xong' }
                        ].map((st) => (
                          <button
                            key={st.key}
                            onClick={() => setStatusOnly(bookId, st.key, 3)}
                            className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold transition-all cursor-pointer ${
                              progress.status === st.key
                                ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
                            }`}
                          >
                            {st.label}
                          </button>
                        ))}
                      </div>
                      <span className="font-bold text-slate-700 dark:text-slate-300">
                        {progress.percentage}%
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="progress-bar-track">
                      <div
                        className="progress-bar-fill"
                        style={{ width: `${progress.percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span>{Math.min(progress.currentPage, 3)} / 3 trang đã đọc</span>
                      {progress.currentPage > 0 && (
                        <button
                          onClick={() => clearProgress(bookId)}
                          className="hover:text-rose-500 transition-colors cursor-pointer"
                          title="Đặt lại tiến độ về 0 trang"
                        >
                          Đặt lại 0
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 self-end md:self-center flex-wrap justify-end">
                    {/* Read Online Button */}
                    {onOpenReader && (
                      <button
                        onClick={() => onOpenReader(book)}
                        className="btn py-2 px-3.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-sm active:scale-95 transition-all cursor-pointer"
                        title="Đọc trực tiếp sách này trên web"
                      >
                        <Icon name="auto_stories" className="text-[14px]" />
                        <span>{progress.currentPage > 0 ? (progress.currentPage >= 3 ? 'Đọc lại (3/3 trang)' : `Đọc tiếp (Trang ${progress.currentPage})`) : 'Đọc trực tuyến'}</span>
                      </button>
                    )}

                    {/* Manual Page Tracker Modal */}
                    <button
                      onClick={() => setModalBook(book)}
                      className="btn btn-secondary text-xs py-2 px-3 cursor-pointer"
                      title="Chỉnh sửa nhật ký thủ công"
                    >
                      <Icon name="edit" className="text-[14px]" />
                      <span>Ghi số trang</span>
                    </button>

                    {/* Toggle Favorite Heart */}
                    <button
                      onClick={() => toggleFavorite(bookId)}
                      className={`btn-icon w-9 h-9 transition-colors cursor-pointer ${
                        isFav
                          ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100'
                          : 'text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                      title={isFav ? 'Bỏ yêu thích' : 'Thêm vào yêu thích'}
                    >
                      <Icon name={isFav ? 'favorite' : 'bookmark_add'} className="text-[18px]" />
                    </button>

                    {/* Remove entirely from Library */}
                    <button
                      onClick={() => handleRemoveItem(bookId)}
                      className="btn-icon w-9 h-9 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Xóa hẳn khỏi thư viện cá nhân"
                    >
                      <Icon name="delete" className="text-[18px]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reading Progress Modal */}
      {modalBook && (
        <ReadingProgressModal
          book={modalBook}
          onClose={() => setModalBook(null)}
        />
      )}
    </div>
  );
}

export default MyLibraryScreen;
