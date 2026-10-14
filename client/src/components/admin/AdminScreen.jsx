import React, { useState, useEffect } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiService } from '../../services/apiService.js';
import { GENRES } from '../../constants/genres.js';
import { LANGUAGES } from '../../constants/languages.js';
import { READING_LEVELS } from '../../constants/readingLevels.js';
import { Icon } from '../common/Icon.jsx';

export function AdminScreen({ onNavigate }) {
  const { books, setBooks, authors } = useBooks();
  const { currentUser, isAdmin } = useAuth();

  const [activeTab, setActiveTab] = useState('books'); // 'books' | 'authors' | 'system'
  const [stats, setStats] = useState(null);
  const [editingBook, setEditingBook] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [bookFormData, setBookFormData] = useState({
    title: '',
    authorId: 'auth-01',
    authorName: 'George Orwell',
    isbn: '',
    language: 'English',
    genre: 'Classic',
    readingLevel: 'Intermediate',
    publicationYear: 2026,
    pageCount: 200,
    coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
    synopsis: '',
    targetAudience: 'General Audience',
    rating: 4.8,
    isFeatured: false
  });
  const [statusMessage, setStatusMessage] = useState('');

  // Fetch admin stats from backend
  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await apiService.getAdminStats();
        if (res && res.data) setStats(res.data);
      } catch {
        // fallback
      }
    }
    fetchStats();
  }, []);

  const handleCreateNew = () => {
    setEditingBook(null);
    setBookFormData({
      title: '',
      authorId: authors[0]?._id || 'auth-01',
      authorName: authors[0]?.name || 'George Orwell',
      isbn: `978-${Math.floor(1000000000 + Math.random() * 9000000000)}`,
      language: 'English',
      genre: 'Classic',
      readingLevel: 'Intermediate',
      publicationYear: 2026,
      pageCount: 200,
      coverImage: 'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?auto=format&fit=crop&w=600&q=80',
      synopsis: 'Bản thảo văn học mới được tiếp nhận vào kho lưu trữ.',
      targetAudience: 'General Audience',
      rating: 4.8,
      isFeatured: false
    });
    setIsCreating(true);
  };

  const handleEdit = (book) => {
    setEditingBook(book);
    setBookFormData({
      title: book.title,
      authorId: book.authorId,
      authorName: book.authorName,
      isbn: book.isbn || '',
      language: book.language || 'English',
      genre: book.genre || 'Classic',
      readingLevel: book.readingLevel || 'Intermediate',
      publicationYear: book.publicationYear || 2020,
      pageCount: book.pageCount || 200,
      coverImage: book.coverImage || '',
      synopsis: book.synopsis || '',
      targetAudience: book.targetAudience || 'General Audience',
      rating: book.rating || 4.5,
      isFeatured: !!book.isFeatured
    });
    setIsCreating(true);
  };

  const handleDelete = async (bookId) => {
    if (!window.confirm('Are you sure you want to delete this book record?')) return;

    try {
      await apiService.deleteBook(bookId);
    } catch {
      // client delete
    }

    setBooks(prev => prev.filter(b => (b._id !== bookId && b.id !== bookId)));
    setStatusMessage('Book record deleted successfully!');
    setTimeout(() => setStatusMessage(''), 3000);
  };

  const handleSaveBook = async (e) => {
    e.preventDefault();

    const selectedAuthor = authors.find(a => (a._id === bookFormData.authorId || a.id === bookFormData.authorId));
    const payload = {
      ...bookFormData,
      authorName: selectedAuthor ? selectedAuthor.name : bookFormData.authorName
    };

    if (editingBook) {
      const bookId = editingBook._id || editingBook.id;
      try {
        await apiService.updateBook(bookId, payload);
      } catch {
        // fallback
      }
      setBooks(prev => prev.map(b => (b._id === bookId || b.id === bookId ? { ...b, ...payload } : b)));
      setStatusMessage('Book updated successfully!');
    } else {
      const newId = `bk-${Date.now().toString().slice(-4)}`;
      const newBook = { _id: newId, id: newId, ...payload };
      try {
        await apiService.createBook(newBook);
      } catch {
        // fallback
      }
      setBooks(prev => [newBook, ...prev]);
      setStatusMessage('New book created successfully!');
    }

    setIsCreating(false);
    setEditingBook(null);
    setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-amber-500/10 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500 text-slate-950 text-xs font-bold uppercase tracking-wider">
              <Icon name="admin_panel_settings" className="text-[16px]" />
              <span>Archival Desk Administration</span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
              Admin Record & Dossier Editor
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
              Create, update, and manage catalog editions, author biographies, and inspect server audit metrics.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCreateNew}
              className="btn btn-primary py-2.5 px-4 text-xs font-bold"
            >
              <Icon name="add" />
              <span>Create New Book</span>
            </button>
          </div>
        </div>
      </div>

      <div className="bb-container py-8 space-y-8">
        {/* Status Alert */}
        {statusMessage && (
          <div className="p-3.5 rounded-2xl bg-emerald-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md">
            <Icon name="check_circle" className="text-[18px]" />
            <span>{statusMessage}</span>
          </div>
        )}

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3">
          <button
            onClick={() => { setActiveTab('books'); setIsCreating(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'books'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            Books Inventory ({books.length})
          </button>
          <button
            onClick={() => { setActiveTab('authors'); setIsCreating(false); }}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'authors'
                ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100'
            }`}
          >
            Author Dossiers ({authors.length})
          </button>
        </div>

        {/* Editor Form Modal / Drawer */}
        {isCreating && (
          <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-display text-xl font-bold text-slate-900 dark:text-slate-100">
                {editingBook ? `Edit Book Record: ${editingBook.title}` : 'Create New Book Record'}
              </h3>
              <button
                onClick={() => setIsCreating(false)}
                className="btn-icon w-8 h-8 text-slate-400 hover:text-slate-700"
              >
                <Icon name="close" />
              </button>
            </div>

            <form onSubmit={handleSaveBook} className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Book Title *</label>
                <input
                  type="text"
                  required
                  value={bookFormData.title}
                  onChange={(e) => setBookFormData({ ...bookFormData, title: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Author *</label>
                <select
                  value={bookFormData.authorId}
                  onChange={(e) => {
                    const auth = authors.find(a => (a._id === e.target.value || a.id === e.target.value));
                    setBookFormData({
                      ...bookFormData,
                      authorId: e.target.value,
                      authorName: auth ? auth.name : bookFormData.authorName
                    });
                  }}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {authors.map((a) => (
                    <option key={a._id || a.id} value={a._id || a.id}>
                      {a.name} ({a.nationality})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Language *</label>
                <select
                  value={bookFormData.language}
                  onChange={(e) => setBookFormData({ ...bookFormData, language: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {LANGUAGES.filter(l => l.code !== 'all').map((l) => (
                    <option key={l.code} value={l.name}>
                      {l.name} ({l.nativeName})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Genre *</label>
                <select
                  value={bookFormData.genre}
                  onChange={(e) => setBookFormData({ ...bookFormData, genre: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {GENRES.filter(g => g !== 'All').map((g) => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Reading Level</label>
                <select
                  value={bookFormData.readingLevel}
                  onChange={(e) => setBookFormData({ ...bookFormData, readingLevel: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                >
                  {READING_LEVELS.filter(r => r.id !== 'all').map((r) => (
                    <option key={r.id} value={r.id}>{r.label}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Publication Year</label>
                <input
                  type="number"
                  value={bookFormData.publicationYear}
                  onChange={(e) => setBookFormData({ ...bookFormData, publicationYear: parseInt(e.target.value, 10) })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Total Pages</label>
                <input
                  type="number"
                  value={bookFormData.pageCount}
                  onChange={(e) => setBookFormData({ ...bookFormData, pageCount: parseInt(e.target.value, 10) })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Cover Image URL</label>
                <input
                  type="text"
                  value={bookFormData.coverImage}
                  onChange={(e) => setBookFormData({ ...bookFormData, coverImage: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-400 uppercase">Synopsis *</label>
                <textarea
                  rows="3"
                  required
                  value={bookFormData.synopsis}
                  onChange={(e) => setBookFormData({ ...bookFormData, synopsis: e.target.value })}
                  className="w-full p-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                />
              </div>

              <div className="md:col-span-2 flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="btn btn-outline text-xs py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary text-xs py-2 px-6"
                >
                  {editingBook ? 'Update Record' : 'Save New Record'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Books Inventory Table */}
        {activeTab === 'books' && (
          <div className="bb-card bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/80 text-slate-400 uppercase text-[10px] tracking-wider border-b border-slate-100 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Title & Cover</th>
                    <th className="py-3 px-4">Author</th>
                    <th className="py-3 px-4">Language</th>
                    <th className="py-3 px-4">Genre</th>
                    <th className="py-3 px-4">Pages</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {books.map((b) => (
                    <tr key={b._id || b.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                      <td className="py-3 px-4 flex items-center gap-3">
                        <img
                          src={b.coverImage}
                          alt={b.title}
                          className="w-8 h-12 object-cover rounded shadow-xs"
                        />
                        <span className="font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                          {b.title}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300">
                        {b.authorName}
                      </td>
                      <td className="py-3 px-4 font-semibold text-amber-600">
                        {b.language}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {b.genre}
                      </td>
                      <td className="py-3 px-4 text-slate-400">
                        {b.pageCount} p.
                      </td>
                      <td className="py-3 px-4 text-right space-x-2">
                        <button
                          onClick={() => handleEdit(b)}
                          className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-800 dark:text-slate-200 font-semibold"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(b._id || b.id)}
                          className="px-2.5 py-1 rounded-lg bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-950/40 dark:text-rose-300 font-semibold"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Authors Inventory Table */}
        {activeTab === 'authors' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {authors.map((auth) => (
              <div
                key={auth._id || auth.id}
                className="bb-card p-5 bg-white dark:bg-slate-900 rounded-2xl flex items-center gap-4"
              >
                <img
                  src={auth.avatar}
                  alt={auth.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 border border-slate-200"
                />
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-bold uppercase text-amber-500">
                    {auth.nationality}
                  </span>
                  <h4 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 truncate">
                    {auth.name}
                  </h4>
                  <p className="text-xs text-slate-400 truncate">
                    {auth.specialization}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminScreen;
