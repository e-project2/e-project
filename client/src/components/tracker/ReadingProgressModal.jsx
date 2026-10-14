import React, { useState } from 'react';
import { useReadingTracker } from '../../context/ReadingTrackerContext.jsx';
import { Icon } from '../common/Icon.jsx';

export function ReadingProgressModal({ book, onClose }) {
  const { getBookProgress, updateProgress } = useReadingTracker();

  if (!book) return null;

  const bookId = book._id || book.id;
  const existing = getBookProgress(bookId);

  const [page, setPage] = useState(existing?.currentPage || 0);
  const [status, setStatus] = useState(existing?.status || 'Reading');
  const [notes, setNotes] = useState(existing?.notes || '');
  const [errorMessage, setErrorMessage] = useState('');
  const [saving, setSaving] = useState(false);

  const totalPages = book.pageCount || 100;
  const previewPercentage = Math.min(100, Math.round((Math.max(0, parseInt(page, 10) || 0) / totalPages) * 100));

  const handleSave = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setSaving(true);

    const res = await updateProgress(bookId, page, totalPages, status, notes);

    setSaving(false);
    if (!res.success) {
      setErrorMessage(res.message);
    } else {
      onClose();
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Update reading progress for ${book.title}`}
    >
      <div
        className="modal-content p-6 sm:p-8 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Icon name="bookmark_add" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100">
                Update Reading Progress
              </h3>
              <p className="text-xs text-slate-400 truncate max-w-[220px]">
                {book.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="btn-icon w-8 h-8 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSave} className="py-5 space-y-4">
          {/* Status Select */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Reading Status
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['To Read', 'Reading', 'Completed'].map((st) => (
                <button
                  type="button"
                  key={st}
                  onClick={() => {
                    setStatus(st);
                    if (st === 'Completed') setPage(totalPages);
                    if (st === 'To Read') setPage(0);
                  }}
                  className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                    status === st
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Current Page Input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <label className="font-bold uppercase tracking-wider text-slate-400">
                Current Page (Max: {totalPages})
              </label>
              <span className="font-bold text-amber-600 dark:text-amber-400">
                {previewPercentage}% completed
              </span>
            </div>
            <div className="relative flex items-center">
              <Icon name="auto_stories" className="absolute left-3 text-slate-400 text-[18px]" />
              <input
                type="number"
                min="0"
                max={totalPages}
                value={page}
                onChange={(e) => {
                  const val = e.target.value;
                  setPage(val);
                  const pNum = parseInt(val, 10);
                  if (pNum >= totalPages) setStatus('Completed');
                  else if (pNum > 0) setStatus('Reading');
                  else setStatus('To Read');
                }}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/50"
              />
            </div>
          </div>

          {/* Live Progress Bar Preview */}
          <div className="space-y-1">
            <div className="progress-bar-track">
              <div
                className="progress-bar-fill"
                style={{ width: `${previewPercentage}%` }}
              />
            </div>
          </div>

          {/* Reader Notes */}
          <div className="space-y-1.5">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Personal Reading Notes (Optional)
            </label>
            <textarea
              rows="3"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Reflections, chapter thoughts, or memorable quotes..."
              className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>

          {/* Error Message */}
          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
              <Icon name="error" className="text-[16px]" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="btn btn-outline text-xs py-2 px-4"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="btn btn-primary text-xs py-2 px-5"
            >
              {saving ? 'Saving...' : 'Save Progress'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReadingProgressModal;
