import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { Icon } from './Icon.jsx';

export function Navbar({ activeRoute, onNavigate }) {
  const { theme, toggleTheme } = useTheme();
  const { favoritesCount } = useFavorites();
  const { currentUser, setAuthModalOpen, setAuthMode, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: 'home' },
    { id: 'directory', label: 'Directory', icon: 'auto_stories' },
    { id: 'collections', label: 'Collections', icon: 'collections_bookmark' },
    { id: 'gallery', label: 'Gallery', icon: 'photo_library' },
    {
      id: 'my-library',
      label: 'My Library',
      icon: 'bookmarks',
      badge: favoritesCount > 0 ? `${favoritesCount} saved` : null
    },
    { id: 'about', label: 'About', icon: 'info' },
    { id: 'contact', label: 'Contact', icon: 'mail' }
  ];

  const handleNavClick = (routeId) => {
    onNavigate(routeId);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(0,0,0,0.04)]">
        <div className="h-20 max-w-[1440px] mx-auto px-6 lg:px-12 flex items-center justify-between gap-gutter">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-4 shrink-0 cursor-pointer select-none group"
          >
            <img
              alt="BookBridge Logo"
              className="h-8 w-auto object-contain transition-transform group-hover:scale-105"
              src="/favicon.svg"
            />
            <span className="font-headline-md text-headline-md tracking-tight text-primary font-bold">
              BookBridge
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive =
                activeRoute === item.id ||
                (item.id === 'directory' && (activeRoute === 'book-detail' || activeRoute === 'author-detail'));
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`px-3 py-1.5 font-label-md text-label-md transition-colors ${isActive
                      ? 'text-primary font-bold bg-surface-container rounded-full'
                      : 'text-on-surface-variant hover:text-on-surface'
                    }`}
                >
                  <span className="flex items-center gap-1.5">
                    <span>{item.label}</span>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full bg-surface-container-high text-on-tertiary-container font-label-sm text-label-sm font-semibold">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Quick Search Button */}
            <button
              onClick={() => handleNavClick('directory')}
              aria-label="Search Catalog"
              className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
              type="button"
              title="Search catalog"
            >
              <span className="material-symbols-outlined text-[20px]">search</span>
            </button>

            {/* Auth / Admin Account */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isAdmin) handleNavClick('admin');
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm font-semibold hover:bg-surface-container-high transition-colors"
                  title={isAdmin ? 'Admin Dashboard' : 'User Account'}
                >
                  <span className="w-6 h-6 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-[11px]">
                    {currentUser.user?.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                  <span className="hidden sm:inline font-medium">
                    {currentUser.user?.username}
                  </span>
                  {isAdmin && (
                    <span className="px-1.5 py-0.2 rounded bg-on-tertiary-container text-surface text-[9px] uppercase font-bold">
                      Admin
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:text-status-danger hover:bg-surface-container transition-colors"
                  title="Logout"
                >
                  <Icon name="logout" className="text-[18px]" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setAuthMode('login');
                  setAuthModalOpen(true);
                }}
                className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center hover:scale-105 transition-transform"
                title="Sign In / Register"
              >
                <span className="material-symbols-outlined text-[18px]">person</span>
              </button>
            )}
            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all"
            >
              <Icon name={mobileMenuOpen ? 'close' : 'menu'} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="xl:hidden fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-sm">
          <div className="fixed top-20 right-0 bottom-0 w-72 bg-white dark:bg-slate-900 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto border-l border-slate-200 dark:border-slate-800">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block px-3 mb-2">
                Menu Navigation
              </span>
              {navItems.map((item) => {
                const isActive = activeRoute === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${isActive
                        ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name={item.icon} className="text-[20px]" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-amber-500 text-white">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            <div className="pt-6 border-t border-slate-200 dark:border-slate-800 space-y-3">
              <div className="flex items-center justify-between px-3">
                <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                  Dark Mode
                </span>
                <button
                  onClick={toggleTheme}
                  className="btn-icon w-8 h-8 bg-slate-100 dark:bg-slate-800"
                >
                  <Icon name={theme === 'light' ? 'dark_mode' : 'light_mode'} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
