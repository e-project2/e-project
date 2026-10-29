import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiService } from '../../services/apiService.js';
import { GENRES } from '../../constants/genres.js';
import { LANGUAGES } from '../../constants/languages.js';
import { READING_LEVELS } from '../../constants/readingLevels.js';
import { Icon } from '../common/Icon.jsx';

export function AdminBookEditorScreen({ book, onNavigate, onPreviewBook }) {
  const { authors, updateBookInState } = useBooks();
  const { isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    authorId: '',
    authorName: '',
    language: 'English',
    genre: 'Classic',
    readingLevel: 'Intermediate',
    publicationYear: 2026,
    publisher: 'Archival Press',
    pageCount: 200,
    readingDuration: '3.5 hrs',
    coverImage: '',
    synopsis: '',
    isbn: '',
    targetAudience: 'General Audience',
    rating: 4.8,
    isFeatured: false,
    themes: []
  });

  const [tagInput, setTagInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (book) {
      const bThemes = Array.isArray(book.themes)
        ? book.themes
        : (book.themes ? book.themes.split(',').map(t => t.trim()) : ['Classic', 'Literary Heritage']);

      setFormData({
        title: book.title || '',
        subtitle: book.subtitle || book.originalTitle || '',
        authorId: (typeof book.authorId === 'object' ? book.authorId?._id : book.authorId) || (authors[0]?._id || 'auth-01'),
        authorName: book.authorName || (typeof book.authorId === 'object' ? book.authorId?.name : (authors[0]?.name || '')),
        language: book.language || 'English',
        genre: book.genre || 'Classic',
        readingLevel: book.readingLevel || 'Intermediate',
        publicationYear: book.publicationYear || 2020,
        publisher: book.publisher || 'Editions Gallimard / Archival Press',
        pageCount: book.pageCount || 200,
        readingDuration: book.readingDuration || '2.5 hrs',
        coverImage: book.coverImage || 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80',
        synopsis: book.synopsis || '',
        isbn: book.isbn || `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
        targetAudience: book.targetAudience || 'General Audience',
        rating: book.rating || 4.8,
        isFeatured: !!book.isFeatured,
        themes: bThemes
      });
    }
  }, [book, authors]);

  const handleAuthorChange = (e) => {
    const selectedId = e.target.value;
    const authorObj = authors.find(a => (a._id === selectedId || a.id === selectedId));
    setFormData(prev => ({
      ...prev,
      authorId: selectedId,
      authorName: authorObj ? authorObj.name : prev.authorName
    }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = tagInput.trim().replace(/^,+|,+$/g, '');
      if (val && !formData.themes.includes(val)) {
        setFormData(prev => ({ ...prev, themes: [...prev.themes, val] }));
      }
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      themes: prev.themes.filter(t => t !== tagToRemove)
    }));
  };

  const handleReset = () => {
    if (!book) return;
    const bThemes = Array.isArray(book.themes)
      ? book.themes
      : (book.themes ? book.themes.split(',').map(t => t.trim()) : ['Classic']);
    setFormData({
      title: book.title || '',
      subtitle: book.subtitle || '',
      authorId: (typeof book.authorId === 'object' ? book.authorId?._id : book.authorId) || '',
      authorName: book.authorName || '',
      language: book.language || 'English',
      genre: book.genre || 'Classic',
      readingLevel: book.readingLevel || 'Intermediate',
      publicationYear: book.publicationYear || 2020,
      publisher: book.publisher || 'Archival Press',
      pageCount: book.pageCount || 200,
      readingDuration: book.readingDuration || '2.5 hrs',
      coverImage: book.coverImage || '',
      synopsis: book.synopsis || '',
      isbn: book.isbn || '',
      targetAudience: book.targetAudience || 'General Audience',
      rating: book.rating || 4.8,
      isFeatured: !!book.isFeatured,
      themes: bThemes
    });
    setToastMessage('Đã hoàn tác các thay đổi.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveToDatabase = async (e) => {
    if (e) e.preventDefault();
    if (!formData.title.trim()) {
      setErrorMessage('Tiêu đề tác phẩm không được để trống.');
      return;
    }

    setSaving(true);
    setErrorMessage('');

    const bookId = book?._id || book?.id;
    const payload = {
      ...formData,
      pageCount: Number(formData.pageCount) || 100,
      publicationYear: Number(formData.publicationYear) || 2026,
      rating: Number(formData.rating) || 4.5
    };

    try {
      // 1. Gửi request PUT lên Database
      let apiResult = null;
      if (bookId) {
        apiResult = await apiService.updateBook(bookId, payload);
      } else {
        apiResult = await apiService.createBook(payload);
      }

      // 2. Cập nhật vào BookContext để đồng bộ tức thì trên toàn giao diện
      const updatedEntity = (apiResult && (apiResult.data || apiResult.book)) || {
        _id: bookId,
        id: bookId,
        ...payload
      };
      updateBookInState(updatedEntity);

      setSaving(false);
      setToastMessage(`Đã cập nhật bản ghi sách "${payload.title}" thành công vào Database!`);
      setTimeout(() => setToastMessage(''), 4500);
    } catch (err) {
      setSaving(false);
      console.warn('Lỗi khi đẩy dữ liệu sách về API:', err);
      // Vẫn cập nhật local state để trải nghiệm mượt mà nếu offline
      updateBookInState({ _id: bookId, id: bookId, ...payload });
      setToastMessage(`Đã lưu cục bộ (Lưu ý: Không thể kết nối DB: ${err.message})`);
      setTimeout(() => setToastMessage(''), 4500);
    }
  };

  if (!isAdmin) {
    return (
      <div className="max-w-4xl mx-auto py-20 px-6 text-center">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mb-4">
          <Icon name="lock" className="text-3xl" />
        </div>
        <h2 className="text-2xl font-bold font-display text-slate-900 dark:text-slate-100">
          Khu Vực Hạn Chế Quản Trị Viên
        </h2>
        <p className="text-sm text-slate-500 mt-2 mb-6">
          Chỉ có tài khoản với quyền Admin mới được phép mở màn hình Record Editor này.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="btn btn-primary px-6 py-2.5 rounded-xl text-sm font-semibold"
        >
          Trở về Trang Chủ
        </button>
      </div>
    );
  }

  const bookIdentifier = book?._id || book?.id || 'BK-NEW';

  return (
    <div className="w-full bg-slate-50/70 dark:bg-slate-950 min-h-screen pb-24 text-slate-900 dark:text-slate-100">
      {/* Top Archival Status Banner & Breadcrumb Header */}
      <section className="w-full bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 shadow-xs py-5 sticky top-16 z-30">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2 text-slate-400 text-xs font-semibold">
              <button
                onClick={() => onNavigate('admin')}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <Icon name="admin_panel_settings" className="text-[14px]" />
                <span>Admin Console</span>
              </button>
              <Icon name="chevron_right" className="text-[14px]" />
              <button
                onClick={() => onNavigate('directory')}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                Manage Books
              </button>
              <Icon name="chevron_right" className="text-[14px]" />
              <span className="text-slate-900 dark:text-slate-100 font-bold">
                Edit Record #{bookIdentifier.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                {formData.title || 'Biên Tập Bản Thảo Sách'}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                MongoDB Atlas Synchronized
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-slate-400 text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <Icon name="schedule" className="text-[14px]" />
                Shelf Mark: {bookIdentifier}
              </span>
            </div>
          </div>

          {/* Action Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onPreviewBook && book && (
              <button
                type="button"
                onClick={() => onPreviewBook(book)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-xs"
              >
                <Icon name="visibility" className="text-[16px]" />
                Preview Public Page
              </button>
            )}

            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 text-xs font-semibold transition-all"
            >
              <Icon name="undo" className="text-[16px]" />
              Discard Changes
            </button>

            <button
              type="button"
              disabled={saving}
              onClick={handleSaveToDatabase}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 active:scale-95 text-slate-950 font-bold text-xs shadow-md transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {saving ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Đang Đẩy Về Database...</span>
                </>
              ) : (
                <>
                  <Icon name="cloud_sync" className="text-[18px]" />
                  <span>Save & Sync to Database</span>
                </>
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 bg-slate-900 dark:bg-white text-white dark:text-slate-900 px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 dark:border-slate-200 animate-slideUp">
          <Icon name="check_circle" className="text-emerald-400 dark:text-emerald-600 text-[22px]" />
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-tight">Database Synchronized</span>
            <span className="text-xs text-slate-300 dark:text-slate-600 mt-0.5">{toastMessage}</span>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 mt-4">
          <div className="p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <Icon name="error" className="text-[18px]" />
            <span>{errorMessage}</span>
          </div>
        </div>
      )}

      {/* Main Administrative Editorial Grid (2 Columns: Left Col 4, Right Col 8) */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <form onSubmit={handleSaveToDatabase} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT RAIL: ASSET MANAGEMENT & IDENTIFIERS (Col 1-4) ================= */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* 1. Book Cover Asset Manager Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="auto_stories" className="text-amber-500 text-[20px]" />
                  <h2 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
                    Cover Folio Master
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold tracking-wider uppercase">
                  RATIO 2:3 • 300 DPI
                </span>
              </div>

              {/* Cover Preview Image Container */}
              <div className="relative group rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800 shadow-inner flex justify-center items-center aspect-[2/3] w-full border border-slate-200 dark:border-slate-700">
                {formData.coverImage ? (
                  <img
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-105"
                    src={formData.coverImage}
                    alt={formData.title}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&w=600&q=80';
                    }}
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center p-6 text-slate-400">
                    <Icon name="image" className="text-4xl mb-2" />
                    <span className="text-xs">Chưa có ảnh bìa</span>
                  </div>
                )}
              </div>

              {/* Cover Image URL Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Cover Image URL
                </label>
                <div className="relative flex items-center">
                  <Icon name="link" className="absolute left-3 text-slate-400 text-[18px]" />
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData(prev => ({ ...prev, coverImage: e.target.value }))}
                    placeholder="https://images.unsplash.com/photo-..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Provenance Metadata Stamp */}
              <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-3 border border-slate-200/60 dark:border-slate-700/60 flex flex-col gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center justify-between">
                  <span>Repository Target</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">BookBridge MongoDB /books</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>ISBD Archival ID</span>
                  <span className="font-mono text-[11px] text-amber-600 dark:text-amber-400 font-bold">{bookIdentifier}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Provenance Level</span>
                  <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Verified Canonical</span>
                </div>
              </div>
            </div>

            {/* 2. Archival Identifiers & Metrics Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Icon name="fingerprint" className="text-amber-500 text-[20px]" />
                <h2 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
                  Archival Identifiers
                </h2>
              </div>

              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center justify-between mb-1">
                    <span>Database ID</span>
                    <span className="text-emerald-500 text-[10px] font-semibold flex items-center gap-0.5">
                      <Icon name="lock" className="text-[12px]" /> Read-only
                    </span>
                  </label>
                  <input
                    type="text"
                    disabled
                    value={bookIdentifier}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 font-mono border border-slate-200 dark:border-slate-700 cursor-not-allowed"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Standard ISBN-13
                  </label>
                  <input
                    type="text"
                    value={formData.isbn}
                    onChange={(e) => setFormData(prev => ({ ...prev, isbn: e.target.value }))}
                    placeholder="978-0141187761"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div>
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block mb-1">
                    Audience & Reader Level
                  </label>
                  <input
                    type="text"
                    value={formData.targetAudience}
                    onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
                    placeholder="General Readers / Scholars"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                  <label className="flex items-center justify-between cursor-pointer select-none">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Ghim nổi bật trang chủ (Featured)
                    </span>
                    <input
                      type="checkbox"
                      checked={formData.isFeatured}
                      onChange={(e) => setFormData(prev => ({ ...prev, isFeatured: e.target.checked }))}
                      className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-50 border-slate-300 dark:border-slate-700 cursor-pointer"
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: DEEP BIBLIOGRAPHIC & EDITORIAL FORM (Col 5-12) ================= */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            
            {/* Section 01: Bibliographic Foundation */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-amber-500 text-amber-500 dark:text-slate-950 text-xs font-bold flex items-center justify-center font-mono">
                    01
                  </span>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100">
                    Bibliographic Foundation
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">ISBD Standard Metadata</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Canonical Title */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Canonical Work Title</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="e.g. Le Petit Prince"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-display text-base font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Parallel Subtitle */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Parallel Script & Multilingual Subtitle
                  </label>
                  <input
                    type="text"
                    value={formData.subtitle}
                    onChange={(e) => setFormData(prev => ({ ...prev, subtitle: e.target.value }))}
                    placeholder="The Little Prince / Hoàng Tử Bé / El Principito"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <span className="text-[11px] text-slate-400">
                    Tên sách theo các ngôn ngữ song ngữ để tối ưu hóa công cụ tìm kiếm và đối chiếu văn học.
                  </span>
                </div>

                {/* Primary Author Select */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                      <span>Primary Author / Folio Attributor</span>
                      <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-xs text-amber-600 dark:text-amber-400 font-semibold">
                      ID: {formData.authorId || 'N/A'}
                    </span>
                  </div>
                  <select
                    value={formData.authorId}
                    onChange={handleAuthorChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {authors.map((auth) => (
                      <option key={auth._id || auth.id} value={auth._id || auth.id}>
                        {auth.name} ({auth.nationality || 'World'}) [{auth.period || auth.lifespan || 'Classic'}]
                      </option>
                    ))}
                  </select>
                </div>

                {/* Original Composition Language */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Original Language
                  </label>
                  <select
                    value={formData.language}
                    onChange={(e) => setFormData(prev => ({ ...prev, language: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {LANGUAGES.map(lang => (
                      <option key={lang.id} value={lang.name}>
                        {lang.native} ({lang.name})
                      </option>
                    ))}
                    <option value="French">Français (French)</option>
                    <option value="Latin">Latin (Classical)</option>
                    <option value="German">Deutsch (German)</option>
                  </select>
                </div>

                {/* First Publication Year */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    First Publication Year
                  </label>
                  <input
                    type="number"
                    value={formData.publicationYear}
                    onChange={(e) => setFormData(prev => ({ ...prev, publicationYear: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* First Edition Publisher */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Publisher / Imprint
                  </label>
                  <input
                    type="text"
                    value={formData.publisher}
                    onChange={(e) => setFormData(prev => ({ ...prev, publisher: e.target.value }))}
                    placeholder="Reynal & Hitchcock / Gallimard"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Folio Page Count & Reading Duration */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Page Count
                    </label>
                    <input
                      type="number"
                      value={formData.pageCount}
                      onChange={(e) => setFormData(prev => ({ ...prev, pageCount: e.target.value }))}
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Est. Duration
                    </label>
                    <input
                      type="text"
                      value={formData.readingDuration}
                      onChange={(e) => setFormData(prev => ({ ...prev, readingDuration: e.target.value }))}
                      placeholder="2.5 hrs"
                      className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 02: Curatorial & Thematic Descriptors */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-amber-500 text-amber-500 dark:text-slate-950 text-xs font-bold flex items-center justify-center font-mono">
                    02
                  </span>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100">
                    Curatorial Classification & Synopsis
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">Taxonomy Engine</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Primary Literary Genre */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Primary Literary Genre
                  </label>
                  <select
                    value={formData.genre}
                    onChange={(e) => setFormData(prev => ({ ...prev, genre: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {GENRES.filter(g => g !== 'All').map(genre => (
                      <option key={genre} value={genre}>{genre}</option>
                    ))}
                    <option value="Philosophical Allegory">Philosophical Allegory</option>
                    <option value="Magical Realism">Magical Realism</option>
                  </select>
                </div>

                {/* Reading Level */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Reading Level
                  </label>
                  <select
                    value={formData.readingLevel}
                    onChange={(e) => setFormData(prev => ({ ...prev, readingLevel: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    {READING_LEVELS.filter(r => r.id !== 'all').map(lvl => (
                      <option key={lvl.id} value={lvl.label}>{lvl.label}</option>
                    ))}
                  </select>
                </div>

                {/* Thematic Descriptors / Tag Cloud */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Curatorial Thematic Descriptors (Tags)</span>
                    <span className="text-slate-400 font-normal">
                      {formData.themes.length} thẻ được gắn
                    </span>
                  </label>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                    {formData.themes.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-slate-400 hover:text-rose-500 transition-colors focus:outline-none"
                        >
                          <Icon name="close" className="text-[14px]" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={handleAddTag}
                      placeholder="+ Nhập tag rồi Enter..."
                      className="bg-transparent text-xs px-2 py-1 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none min-w-[140px]"
                    />
                  </div>
                </div>

                {/* Curatorial Synopsis */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Tóm Tắt Tác Phẩm & Bình Luận Học Thuật (Curatorial Synopsis)
                  </label>
                  <textarea
                    rows={6}
                    value={formData.synopsis}
                    onChange={(e) => setFormData(prev => ({ ...prev, synopsis: e.target.value }))}
                    placeholder="Mô tả nội dung, giá trị tư tưởng và bối cảnh sáng tác..."
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Bottom Sticky CTA */}
              <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={handleReset}
                  className="px-5 py-2.5 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 text-xs font-bold transition-all"
                >
                  Hủy thay đổi
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 text-amber-400 dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-amber-400 text-xs font-bold shadow-md transition-all flex items-center gap-2"
                >
                  {saving ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-current border-t-transparent rounded-full animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <Icon name="save" className="text-[16px]" />
                      <span>Lưu Thay Đổi Vào Database</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
}

export default AdminBookEditorScreen;
