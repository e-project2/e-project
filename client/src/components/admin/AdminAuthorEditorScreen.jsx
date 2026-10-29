import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiService } from '../../services/apiService.js';
import { Icon } from '../common/Icon.jsx';

export function AdminAuthorEditorScreen({ author, onNavigate, onPreviewAuthor }) {
  const { updateAuthorInState, getBooksByAuthor } = useBooks();
  const { isAdmin } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    originalName: '',
    nationality: 'French',
    lifespan: '1900–1944',
    specialization: 'Philosophical Allegory & Aviation Poetics',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
    bio: '',
    notableThemes: [],
    iiifUri: 'https://gallica.bnf.fr/iiif/ark:/12148/btv1b53112285z/manifest.json'
  });

  const [themeInput, setThemeInput] = useState('');
  const [saving, setSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const authorId = author?._id || author?.id || 'AUTH-01';
  const authorWorks = getBooksByAuthor ? getBooksByAuthor(authorId) : [];

  useEffect(() => {
    if (author) {
      const themes = Array.isArray(author.notableThemes)
        ? author.notableThemes
        : (author.notableThemes ? author.notableThemes.split(',').map(t => t.trim()) : ['Classic Literature']);

      setFormData({
        name: author.name || '',
        originalName: author.originalName || author.nativeName || '',
        nationality: author.nationality || 'France',
        lifespan: author.lifespan || author.period || '19th–20th Century',
        specialization: author.specialization || 'Classical World Literature',
        avatar: author.avatar || 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80',
        bio: author.bio || '',
        notableThemes: themes,
        iiifUri: author.iiifUri || 'https://gallica.bnf.fr/iiif/ark:/12148/btv1b53112285z/manifest.json'
      });
    }
  }, [author]);

  const handleAddTheme = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      const val = themeInput.trim().replace(/^,+|,+$/g, '');
      if (val && !formData.notableThemes.includes(val)) {
        setFormData(prev => ({ ...prev, notableThemes: [...prev.notableThemes, val] }));
      }
      setThemeInput('');
    }
  };

  const handleRemoveTheme = (themeToRemove) => {
    setFormData(prev => ({
      ...prev,
      notableThemes: prev.notableThemes.filter(t => t !== themeToRemove)
    }));
  };

  const handleReset = () => {
    if (!author) return;
    const themes = Array.isArray(author.notableThemes)
      ? author.notableThemes
      : (author.notableThemes ? author.notableThemes.split(',').map(t => t.trim()) : ['Classic']);

    setFormData({
      name: author.name || '',
      originalName: author.originalName || '',
      nationality: author.nationality || '',
      lifespan: author.lifespan || author.period || '',
      specialization: author.specialization || '',
      avatar: author.avatar || '',
      bio: author.bio || '',
      notableThemes: themes,
      iiifUri: author.iiifUri || ''
    });
    setToastMessage('Đã hoàn tác dữ liệu tác giả.');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleSaveToDatabase = async (e) => {
    if (e) e.preventDefault();
    if (!formData.name.trim()) {
      setErrorMessage('Tên tác giả không được để trống.');
      return;
    }

    setSaving(true);
    setErrorMessage('');

    const payload = {
      ...formData,
      period: formData.lifespan
    };

    try {
      // 1. Gửi request PUT lên Database
      let apiResult = null;
      if (authorId) {
        apiResult = await apiService.updateAuthor(authorId, payload);
      } else {
        apiResult = await apiService.createAuthor(payload);
      }

      // 2. Cập nhật vào BookContext
      const updatedEntity = (apiResult && (apiResult.data || apiResult.author)) || {
        _id: authorId,
        id: authorId,
        ...payload
      };
      updateAuthorInState(updatedEntity);

      setSaving(false);
      setToastMessage(`Đã cập nhật hồ sơ tác giả "${payload.name}" thành công vào Database!`);
      setTimeout(() => setToastMessage(''), 4500);
    } catch (err) {
      setSaving(false);
      console.warn('Lỗi khi đẩy hồ sơ tác giả về API:', err);
      updateAuthorInState({ _id: authorId, id: authorId, ...payload });
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
          Chỉ có tài khoản với quyền Admin mới được phép chỉnh sửa hồ sơ tác giả (Author Dossier Editor).
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

  return (
    <div className="w-full bg-slate-50/70 dark:bg-slate-950 min-h-screen pb-24 text-slate-900 dark:text-slate-100">
      {/* Top Dossier Status Banner */}
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
                onClick={() => onNavigate('admin')}
                className="hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                Manage Authors
              </button>
              <Icon name="chevron_right" className="text-[14px]" />
              <span className="text-slate-900 dark:text-slate-100 font-bold">
                Edit Dossier #{authorId.toUpperCase()}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-3 pt-0.5">
              <h1 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                {formData.name || 'Hồ Sơ Tác Giả'}
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Icon name="verified" className="text-[15px]" />
                BnF Provenance Certified
              </span>
              <span className="text-xs text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                {authorWorks.length} tác phẩm trong kho lưu trữ
              </span>
            </div>
          </div>

          {/* Action Group */}
          <div className="flex flex-wrap items-center gap-2.5">
            {onPreviewAuthor && author && (
              <button
                type="button"
                onClick={() => onPreviewAuthor(author)}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-all shadow-xs"
              >
                <Icon name="visibility" className="text-[16px]" />
                View Public Page
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
                  <span>Đang Đồng Bộ MongoDB...</span>
                </>
              ) : (
                <>
                  <Icon name="cloud_sync" className="text-[18px]" />
                  <span>Save & Sync Author</span>
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
            <span className="font-bold text-sm leading-tight">Author Dossier Synchronized</span>
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

      {/* Main Administrative Form (2 Columns: Left Col 5, Right Col 7) */}
      <main className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        <form onSubmit={handleSaveToDatabase} className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* ================= LEFT RAIL: ARCHIVAL VISUAL ASSETS (Col 1-5) ================= */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Visual Assets Card */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col gap-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="photo_library" className="text-amber-500 text-[20px]" />
                  <h2 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
                    Archival Visual Assets
                  </h2>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[10px] font-bold tracking-wider uppercase">
                  MASTER FACE
                </span>
              </div>

              {/* Portrait Preview Box */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/80 flex gap-4 items-center">
                <div className="w-24 h-32 rounded-xl overflow-hidden shadow-md flex-shrink-0 bg-slate-200 dark:bg-slate-700 relative group border border-slate-300 dark:border-slate-600">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    src={formData.avatar}
                    alt={formData.name}
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                </div>
                <div className="flex flex-col gap-1.5 flex-1 min-w-0">
                  <p className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                    {formData.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formData.nationality} • {formData.lifespan}
                  </p>
                  <span className="inline-flex items-center gap-1 text-[11px] text-amber-600 dark:text-amber-400 font-semibold mt-1">
                    <Icon name="verified" className="text-[14px]" />
                    Chân dung lưu trữ bảo tồn
                  </span>
                </div>
              </div>

              {/* Avatar URL Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Portrait Image URL
                </label>
                <div className="relative flex items-center">
                  <Icon name="link" className="absolute left-3 text-slate-400 text-[18px]" />
                  <input
                    type="url"
                    value={formData.avatar}
                    onChange={(e) => setFormData(prev => ({ ...prev, avatar: e.target.value }))}
                    placeholder="https://..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* IIIF URI Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  IIIF Manifest Preservation URI
                </label>
                <input
                  type="text"
                  value={formData.iiifUri}
                  onChange={(e) => setFormData(prev => ({ ...prev, iiifUri: e.target.value }))}
                  placeholder="https://gallica.bnf.fr/iiif/..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>
            </div>

            {/* Author Works in Catalog */}
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-sm text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                  <Icon name="menu_book" className="text-amber-500 text-[18px]" />
                  Tác phẩm liên kết ({authorWorks.length})
                </h3>
                <span className="text-[11px] text-slate-400 font-mono">ID: {authorId}</span>
              </div>

              {authorWorks.length === 0 ? (
                <p className="text-xs text-slate-400 py-3 italic">
                  Chưa có tác phẩm nào liên kết với tác giả này.
                </p>
              ) : (
                <div className="flex flex-col gap-2 mt-1">
                  {authorWorks.map((bk) => (
                    <div
                      key={bk._id || bk.id}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs border border-slate-200/60 dark:border-slate-700/60"
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                        <span className="font-bold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
                          {bk.title}
                        </span>
                      </div>
                      <span className="text-slate-400 text-[11px]">
                        {bk.publicationYear || 'N/A'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* ================= RIGHT COLUMN: BIOGRAPHICAL & THEMATIC DOSSIER (Col 6-12) ================= */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 flex flex-col gap-6">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-lg bg-slate-900 dark:bg-amber-500 text-amber-500 dark:text-slate-950 text-xs font-bold flex items-center justify-center font-mono">
                    01
                  </span>
                  <h2 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100">
                    Biographical & Academic Dossier
                  </h2>
                </div>
                <span className="text-xs font-mono text-slate-400">BnF Standard Form</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Author Primary Name */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1">
                    <span>Full Author Canonical Name</span>
                    <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Antoine de Saint-Exupéry"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-display text-base font-bold focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Original Native Script Name */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Native / Original Script Name
                  </label>
                  <input
                    type="text"
                    value={formData.originalName}
                    onChange={(e) => setFormData(prev => ({ ...prev, originalName: e.target.value }))}
                    placeholder="e.g. Antoine Jean-Baptiste Marie Roger"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Nationality */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Nationality / Provenance
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nationality}
                    onChange={(e) => setFormData(prev => ({ ...prev, nationality: e.target.value }))}
                    placeholder="e.g. French, British, Vietnamese"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Lifespan / Historical Era */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Lifespan / Epoch
                  </label>
                  <input
                    type="text"
                    value={formData.lifespan}
                    onChange={(e) => setFormData(prev => ({ ...prev, lifespan: e.target.value }))}
                    placeholder="e.g. 1900–1944"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Specialization / Movement */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Literary Movement & Specialization
                  </label>
                  <input
                    type="text"
                    value={formData.specialization}
                    onChange={(e) => setFormData(prev => ({ ...prev, specialization: e.target.value }))}
                    placeholder="e.g. Modernist Realism / Poetics"
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>

                {/* Notable Curatorial Themes */}
                <div className="md:col-span-2 flex flex-col gap-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center justify-between">
                    <span>Notable Themes & Motifs</span>
                    <span className="text-slate-400 font-normal">
                      {formData.notableThemes.length} chủ đề
                    </span>
                  </label>
                  <div className="flex flex-wrap items-center gap-2 p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
                    {formData.notableThemes.map((theme) => (
                      <span
                        key={theme}
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-800 shadow-xs text-xs font-semibold text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                      >
                        {theme}
                        <button
                          type="button"
                          onClick={() => handleRemoveTheme(theme)}
                          className="text-slate-400 hover:text-rose-500 transition-colors focus:outline-none"
                        >
                          <Icon name="close" className="text-[14px]" />
                        </button>
                      </span>
                    ))}
                    <input
                      type="text"
                      value={themeInput}
                      onChange={(e) => setThemeInput(e.target.value)}
                      onKeyDown={handleAddTheme}
                      placeholder="+ Thêm chủ đề rồi Enter..."
                      className="bg-transparent text-xs px-2 py-1 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none min-w-[150px]"
                    />
                  </div>
                </div>

                {/* Academic Biography */}
                <div className="md:col-span-2 flex flex-col gap-1.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                    Academic Biography & Archival Dossier Text
                  </label>
                  <textarea
                    rows={8}
                    required
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tiểu sử học thuật, các cột mốc văn học, giải thưởng và di sản văn hóa..."
                    className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500 leading-relaxed"
                  />
                </div>
              </div>

              {/* Bottom Sticky Action Rail */}
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
                      <span>Lưu Hồ Sơ Tác Giả Vào Database</span>
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

export default AdminAuthorEditorScreen;
