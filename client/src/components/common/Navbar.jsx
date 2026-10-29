import React, { useState, useRef, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import { useFavorites } from '../../context/FavoritesContext.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { Icon } from './Icon.jsx';

export function Navbar({ activeRoute, onNavigate }) {
  const { theme, toggleTheme } = useTheme();
  const { favoritesCount } = useFavorites();
  const { currentUser, setAuthModalOpen, setAuthMode, logout, isAdmin } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const accountMenuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target)) {
        setAccountMenuOpen(false);
      }
    }
    if (accountMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [accountMenuOpen]);

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

            {/* Single Account Icon with Dropdown Menu */}
            <div className="relative" ref={accountMenuRef}>
              <button
                type="button"
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                aria-label="Account Menu"
                aria-expanded={accountMenuOpen}
                className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-xs border cursor-pointer ${
                  accountMenuOpen
                    ? 'bg-primary text-on-primary border-primary ring-2 ring-amber-500/30'
                    : 'bg-surface-container hover:bg-surface-container-high text-primary border-slate-200/80 dark:border-slate-700/80'
                }`}
                title={isAdmin ? 'Tài khoản Quản trị viên' : 'Tài khoản Độc giả'}
              >
                <span className="material-symbols-outlined text-[24px]">account_circle</span>
                {isAdmin && (
                  <span
                    className="absolute top-0 right-0 w-3 h-3 rounded-full bg-amber-500 border-2 border-white dark:border-slate-900"
                    title="Quản trị viên (Admin)"
                  />
                )}
              </button>

              {/* Account Dropdown Popover */}
              {accountMenuOpen && (
                <div className="absolute right-0 mt-2.5 w-60 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200/80 dark:border-slate-800 py-2.5 z-50 text-slate-800 dark:text-slate-100 animate-slideUp">
                  {/* User Profile Brief */}
                  <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-slate-900 dark:bg-amber-500 text-amber-500 dark:text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                      {currentUser?.user?.username?.[0]?.toUpperCase() || (isAdmin ? 'A' : 'U')}
                    </div>
                    <div className="flex flex-col min-w-0">
                      <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                        {currentUser?.user?.fullName || currentUser?.user?.username || (isAdmin ? 'Admin' : 'Reader Demo')}
                      </span>
                      <span className="text-[10px] text-slate-400 truncate">
                        {currentUser?.user?.email || (isAdmin ? 'admin@bookbridge.com' : 'reader@bookbridge.com')}
                      </span>
                      <span
                        className={`inline-block mt-0.5 text-[9px] font-bold uppercase tracking-wider ${
                          isAdmin ? 'text-amber-600 dark:text-amber-400' : 'text-slate-500 dark:text-slate-400'
                        }`}
                      >
                        {isAdmin ? '⚡ Quản trị viên (Admin)' : '👤 Độc giả (User)'}
                      </span>
                    </div>
                  </div>

                  {/* Dropdown Menu Items */}
                  <div className="p-1.5 space-y-1">
                    {/* With Admin: Show Admin Desk Button */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={() => {
                          setAccountMenuOpen(false);
                          handleNavClick('admin');
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-slate-700 dark:text-slate-200 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-left cursor-pointer"
                      >
                        <Icon name="admin_panel_settings" className="text-[18px] text-amber-500" />
                        <span>Vào trang quản trị</span>
                      </button>
                    )}

                    {/* Both User and Admin: Logout Button */}
                    <button
                      type="button"
                      onClick={() => {
                        setAccountMenuOpen(false);
                        logout();
                      }}
                      className="w-full flex items-center gap-2.5 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors text-left cursor-pointer"
                    >
                      <Icon name="logout" className="text-[18px]" />
                      <span>Đăng xuất</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
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
              {/* Mobile Account Section */}
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60 space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-slate-900 dark:bg-amber-500 text-amber-500 dark:text-slate-950 flex items-center justify-center font-bold text-xs shrink-0">
                    {currentUser?.user?.username?.[0]?.toUpperCase() || (isAdmin ? 'A' : 'U')}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="font-bold text-xs text-slate-900 dark:text-slate-100 truncate">
                      {currentUser?.user?.fullName || currentUser?.user?.username || (isAdmin ? 'Admin' : 'Reader Demo')}
                    </span>
                    <span className="text-[10px] text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider">
                      {isAdmin ? 'Quản trị viên (Admin)' : 'Độc giả (User)'}
                    </span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1">
                  {isAdmin && (
                    <button
                      type="button"
                      onClick={() => handleNavClick('admin')}
                      className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-slate-800 dark:text-slate-200 hover:bg-amber-500/10 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                    >
                      <Icon name="admin_panel_settings" className="text-[18px] text-amber-500" />
                      <span>Vào trang quản trị</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      logout();
                    }}
                    className="w-full flex items-center gap-2 px-3 py-2 text-xs font-semibold rounded-xl text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                  >
                    <Icon name="logout" className="text-[18px]" />
                    <span>Đăng xuất</span>
                  </button>
                </div>
              </div>

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
