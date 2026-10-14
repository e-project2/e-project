import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Icon } from '../common/Icon.jsx';

export function AuthModal() {
  const { authModalOpen, setAuthModalOpen, authMode, setAuthMode, login, register } = useAuth();

  const [emailOrUsername, setEmailOrUsername] = useState('reader@bookbridge.com');
  const [password, setPassword] = useState('Reader@123456');
  const [fullName, setFullName] = useState('');
  const [registerUsername, setRegisterUsername] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  if (!authModalOpen) return null;

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await login(emailOrUsername, password);
    setLoading(false);

    if (res.success) {
      setAuthModalOpen(false);
    } else {
      setError(res.message || 'Login failed. Please check credentials.');
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const res = await register(registerUsername, registerEmail, registerPassword, fullName);
    setLoading(false);

    if (res.success) {
      setAuthModalOpen(false);
    } else {
      setError(res.message || 'Registration failed.');
    }
  };

  const handleFillDemo = (type) => {
    if (type === 'admin') {
      setEmailOrUsername('admin@bookbridge.com');
      setPassword('Admin@123456');
    } else {
      setEmailOrUsername('reader@bookbridge.com');
      setPassword('Reader@123456');
    }
  };

  return (
    <div
      className="modal-overlay"
      onClick={() => setAuthModalOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Authentication Desk"
    >
      <div
        className="modal-content p-6 sm:p-8 max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-slate-900 text-amber-500 flex items-center justify-center font-bold">
              <Icon name="vpn_key" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-slate-100">
                {authMode === 'login' ? 'Archival Desk Sign In' : 'Create Reader Account'}
              </h3>
              <p className="text-xs text-slate-400">
                {authMode === 'login' ? 'Access your library & admin privileges' : 'Join BookBridge community'}
              </p>
            </div>
          </div>
          <button
            onClick={() => setAuthModalOpen(false)}
            className="btn-icon w-8 h-8 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Quick Demo Pre-fill Pills */}
        {authMode === 'login' && (
          <div className="my-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40 space-y-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
              💡 Quick Demo Accounts (Click to Fill):
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => handleFillDemo('reader')}
                className="px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-[11px] font-semibold text-slate-800 dark:text-slate-200 shadow-xs hover:border-amber-500 border border-transparent transition-all"
              >
                👤 Reader Demo
              </button>
              <button
                type="button"
                onClick={() => handleFillDemo('admin')}
                className="px-2.5 py-1 rounded-lg bg-amber-500 text-slate-950 text-[11px] font-bold shadow-xs hover:bg-amber-400 transition-all"
              >
                ⚡ Admin Demo
              </button>
            </div>
          </div>
        )}

        {/* Error Alert */}
        {error && (
          <div className="my-3 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2">
            <Icon name="error" className="text-[16px]" />
            <span>{error}</span>
          </div>
        )}

        {/* Sign In Form */}
        {authMode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4 pt-1">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email or Username
              </label>
              <div className="relative flex items-center">
                <Icon name="mail" className="absolute left-3 text-slate-400 text-[18px]" />
                <input
                  type="text"
                  required
                  value={emailOrUsername}
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  placeholder="admin@bookbridge.com or username"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <div className="relative flex items-center">
                <Icon name="lock" className="absolute left-3 text-slate-400 text-[18px]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 rounded-xl text-sm font-bold shadow-md mt-2"
            >
              {loading ? 'Authenticating...' : 'Sign In to Portal'}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('register')}
                  className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Create one here
                </button>
              </p>
            </div>
          </form>
        ) : (
          /* Sign Up Form */
          <form onSubmit={handleRegisterSubmit} className="space-y-3 pt-1">
            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                placeholder="Hoàng Minh"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Username
              </label>
              <input
                type="text"
                required
                value={registerUsername}
                onChange={(e) => setRegisterUsername(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                placeholder="hoang_minh"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <input
                type="email"
                required
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                placeholder="reader@example.com"
              />
            </div>

            <div className="space-y-1">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
                Password
              </label>
              <input
                type="password"
                required
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-900 dark:text-slate-100"
                placeholder="At least 6 characters"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn btn-primary py-3 rounded-xl text-sm font-bold shadow-md mt-2"
            >
              {loading ? 'Creating Account...' : 'Register Account'}
            </button>

            <div className="text-center pt-2">
              <p className="text-xs text-slate-500">
                Already have an account?{' '}
                <button
                  type="button"
                  onClick={() => setAuthMode('login')}
                  className="font-bold text-amber-600 dark:text-amber-400 hover:underline"
                >
                  Sign In
                </button>
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
