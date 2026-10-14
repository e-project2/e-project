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
    { id: 'explorer', label: 'Explorer', icon: 'explore' },
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
      <header className="sticky-glass-header flex items-center">
        <div className="bb-container flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-3 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-900 to-blue-950 flex items-center justify-center text-amber-500 shadow-sm group-hover:scale-105 transition-transform">
              <Icon name="auto_stories" className="text-[22px]" />
            </div>
            <div>
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
                BookBridge
              </span>
              <span className="block text-[10px] tracking-wider uppercase text-amber-600 font-semibold -mt-1">
                Literary Platform
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center gap-1.5" aria-label="Main Navigation">
            {navItems.map((item) => {
              const isActive = activeRoute === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3.5 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1.5 ${
                    isActive
                      ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800'
                  }`}
                >
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-amber-500 text-white dark:bg-slate-900 dark:text-amber-400">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Tools */}
          <div className="flex items-center gap-2.5">
            {/* Quick Search Button */}
            <button
              onClick={() => handleNavClick('directory')}
              aria-label="Search Catalog"
              className="btn-icon bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="Search catalog"
            >
              <Icon name="search" />
            </button>

            {/* Dark/Light Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Theme"
              className="btn-icon bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title={`Switch to ${theme === 'light' ? 'Dark' : 'Light'} Mode`}
            >
              <Icon name={theme === 'light' ? 'dark_mode' : 'light_mode'} />
            </button>

            {/* Auth / Admin Account */}
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isAdmin) handleNavClick('admin');
                  }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-semibold hover:bg-slate-200 transition-colors"
                  title={isAdmin ? 'Admin Dashboard' : 'User Account'}
                >
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-[11px]">
                    {currentUser.user?.username?.[0]?.toUpperCase() || 'U'}
                  </span>
                  <span className="hidden sm:inline font-medium">
                    {currentUser.user?.username}
                  </span>
                  {isAdmin && (
                    <span className="px-1.5 py-0.2 rounded bg-amber-600 text-white text-[9px] uppercase font-bold">
                      Admin
                    </span>
                  )}
                </button>
                <button
                  onClick={logout}
                  className="btn-icon w-8 h-8 text-slate-400 hover:text-rose-500 transition-colors"
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
                className="btn btn-primary text-xs py-2 px-4"
              >
                <Icon name="person" className="text-[16px]" />
                <span className="hidden sm:inline">Sign In</span>
              </button>
            )}

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle Navigation Menu"
              className="xl:hidden btn-icon bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200"
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
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                      isActive
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
