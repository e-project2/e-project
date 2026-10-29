import React from 'react';

export function Footer({ onNavigate }) {
  const handleNav = (route) => {
    if (onNavigate) {
      onNavigate(route);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="w-full bg-surface-container-low dark:bg-slate-900 border-t border-border-subtle dark:border-slate-800 shadow-[0_-1px_8px_rgba(0,0,0,0.02)]">
      <div className="max-w-[1440px] mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10">
          {/* Logo & Slogan (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleNav('home')}>
              <img
                alt="BookBridge Logo"
                className="h-7 w-auto object-contain"
                src="/favicon.svg"
              />
              <span className="font-headline-sm text-headline-sm tracking-tight text-primary dark:text-slate-100">
                BookBridge
              </span>
            </div>
            <p className="font-headline-sm text-headline-sm italic text-on-tertiary-container font-normal leading-snug">
              “Bridge Worlds, Discover Voices Through Books”
            </p>
            <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 max-w-sm">
              A scholarly digital reading platform curated for reflective readers, archival researchers, and bibliophiles.
            </p>
          </div>

          {/* Explore */}
          <div className="space-y-3">
            <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary dark:text-slate-200 font-bold">
              Explore
            </h4>
            <ul className="space-y-2">
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('directory')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Book Directory
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('collections')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Themed Shelves
                </button>
              </li>
            </ul>
          </div>

          {/* Collections */}
          <div className="space-y-3">
            <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary dark:text-slate-200 font-bold">
              Collections
            </h4>
            <ul className="space-y-2">
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('collections')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Literary Modernism
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('collections')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Curated Anthologies
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('collections')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Global Dissertations
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('my-library')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Personal Archival Shelf
                </button>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-3">
            <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary dark:text-slate-200 font-bold">
              Resources
            </h4>
            <ul className="space-y-2">
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Editorial Standards
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('about')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Archival Citations
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Scholarly Inquiry
                </button>
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('contact')}
                  className="text-on-surface-variant dark:text-slate-400 hover:text-primary dark:hover:text-slate-100 transition-colors text-left"
                >
                  Community Reader Notes
                </button>
              </li>
            </ul>
          </div>

          {/* Legal / Provenance */}
          <div className="space-y-3">
            <h4 className="font-label-md text-label-md uppercase tracking-wider text-primary dark:text-slate-200 font-bold">
              Provenance
            </h4>
            <ul className="space-y-2">
              <li className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
                Aptech eProject Standard
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
                Public Domain Archive
              </li>
              <li className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400">
                WCAG 2.1 AA Compliant
              </li>
              <li className="font-body-sm text-body-sm">
                <button
                  type="button"
                  onClick={() => handleNav('admin')}
                  className="text-on-tertiary-container hover:underline font-semibold text-left"
                >
                  Admin Desk →
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-12 pt-8 border-t border-border-subtle/60 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-body-sm text-body-sm text-on-surface-variant dark:text-slate-400 text-center md:text-left">
            BookBridge Academic eProject Demo © 2026. Interactive local storage reading tracker.
          </p>
          <div className="flex items-center gap-6">
            <span className="font-label-sm text-label-sm text-on-surface-variant dark:text-slate-400">
              v1.4 Archive Build
            </span>
            <span className="inline-flex items-center gap-1 font-label-sm text-label-sm text-on-tertiary-container">
              <span className="material-symbols-outlined text-[14px]">bookmarks</span>
              Local Persistence Active
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
