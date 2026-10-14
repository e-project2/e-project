import React from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { ImageWithFallback } from '../common/ImageWithFallback.jsx';
import { Icon } from '../common/Icon.jsx';

export function AuthorProfileModal({ author, onClose, onSelectBook }) {
  const { getBooksByAuthor } = useBooks();

  if (!author) return null;

  const authorId = author._id || author.id;
  const authoredBooks = getBooksByAuthor(authorId);

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={`Author Profile for ${author.name}`}
    >
      <div
        className="modal-content p-6 sm:p-8 max-w-4xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header & Close */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <span className="uppercase tracking-widest font-bold text-amber-500">
              Author Dossier & Bibliography
            </span>
            <span>•</span>
            <span>{author.nationality}</span>
          </div>
          <button
            onClick={onClose}
            className="btn-icon w-9 h-9 text-slate-400 hover:text-slate-800 dark:hover:text-slate-100 bg-slate-100 dark:bg-slate-800"
            title="Close (Esc)"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Hero Section */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 py-6 border-b border-slate-100 dark:border-slate-800">
          <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl overflow-hidden shadow-xl border-2 border-amber-500/40 shrink-0 bg-slate-800">
            <img
              src={author.avatar}
              alt={author.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>

          <div className="space-y-2 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-xs font-semibold">
              <Icon name="history_edu" className="text-[16px]" />
              <span>{author.specialization}</span>
            </div>

            <h2 className="font-display text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100">
              {author.name}
            </h2>

            <p className="text-xs text-slate-400 font-medium">
              Nationality: <strong className="text-slate-700 dark:text-slate-300">{author.nationality}</strong>
              {author.period && <> • Period: <strong className="text-slate-700 dark:text-slate-300">{author.period}</strong></>}
            </p>

            {author.quotes && (
              <blockquote className="text-xs italic text-slate-600 dark:text-slate-400 pt-2 border-l-2 border-amber-500 pl-3">
                "{author.quotes}"
              </blockquote>
            )}
          </div>
        </div>

        {/* Biography & Philosophy */}
        <div className="py-6 space-y-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
              Literary Biography & Historical Impact
            </h4>
            <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-300">
              {author.bio}
            </p>
          </div>

          {author.notableThemes && (
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Notable Literary Pillars & Themes
              </h4>
              <div className="flex flex-wrap gap-2">
                {author.notableThemes.map((th, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700"
                  >
                    ✦ {th}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Authored Books Showcase */}
        <div className="pt-6 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
              <Icon name="menu_book" className="text-amber-500" />
              <span>Authored Works in Archive ({authoredBooks.length})</span>
            </h4>
            <span className="text-xs text-slate-400">Click to view book record</span>
          </div>

          {authoredBooks.length === 0 ? (
            <p className="text-xs text-slate-400">No catalog editions registered yet.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {authoredBooks.map((bk) => (
                <div
                  key={bk._id || bk.id}
                  onClick={() => {
                    onClose();
                    onSelectBook(bk);
                  }}
                  className="bb-card group cursor-pointer p-3 bg-white dark:bg-slate-800/80 rounded-xl hover:shadow-lg transition-all"
                >
                  <div className="aspect-[2/3] w-full rounded-lg overflow-hidden mb-2 bg-slate-900">
                    <ImageWithFallback
                      src={bk.coverImage}
                      alt={bk.title}
                      title={bk.title}
                      author={bk.authorName}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                  <h5 className="text-xs font-bold text-slate-900 dark:text-slate-100 line-clamp-1">
                    {bk.title}
                  </h5>
                  <div className="flex items-center justify-between text-[11px] text-slate-400 mt-1">
                    <span>{bk.language}</span>
                    <span>{bk.publicationYear}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorProfileModal;
