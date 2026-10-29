import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { Icon } from '../common/Icon.jsx';

export function LoginScreen({ onLoginSuccess }) {
  const { login } = useAuth();

  const [identifier, setIdentifier] = useState('admin@bookbridge.com');
  const [password, setPassword] = useState('Admin@123456');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberDesk, setRememberDesk] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleQuickFill = (role) => {
    setError('');
    if (role === 'admin') {
      setIdentifier('admin@bookbridge.com');
      setPassword('Admin@123456');
    } else {
      setIdentifier('reader@bookbridge.com');
      setPassword('Reader@123456');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!identifier || !password) {
      setError('Vui lòng nhập đầy đủ thông tin định danh và mật khẩu.');
      return;
    }

    setError('');
    setLoading(true);

    try {
      const res = await login(identifier.trim(), password);
      setLoading(false);
      if (res && res.success) {
        if (onLoginSuccess) {
          onLoginSuccess(res.user);
        }
      } else {
        setError(res?.message || 'Thông tin đăng nhập không chính xác. Vui lòng thử lại.');
      }
    } catch (err) {
      setLoading(false);
      setError(err?.message || 'Không thể kết nối đến máy chủ xác thực.');
    }
  };

  return (
    <div className="min-h-screen bg-surface dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col justify-between selection:bg-surface-container-high selection:text-primary">
      {/* Top Header Bar */}
      <header className="fixed top-0 inset-x-0 z-50 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-amber-500 text-amber-500 dark:text-slate-950 flex items-center justify-center shadow-sm">
              <Icon name="menu_book" className="text-[22px]" />
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl font-bold tracking-tight text-slate-900 dark:text-slate-50 leading-none">
                BookBridge
              </span>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold tracking-wider uppercase mt-1">
                Archival Desk & Literary Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Yêu Cầu Xác Thực Hệ Thống</span>
            </div>
            <div className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
              Protected Access
            </div>
          </div>
        </div>
      </header>

      {/* Main Sanctuary Presentation & Authentication Grid */}
      <main className="w-full pt-20 pb-12 flex-1 flex flex-col justify-center">
        <div className="relative w-full py-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
          {/* Subtle ambient blur behind panels */}
          <div className="absolute -top-10 left-1/4 w-96 h-96 bg-amber-500/10 dark:bg-amber-500/5 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute bottom-6 right-1/4 w-80 h-80 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {/* Left Editorial Vignette & Archival Showcase (5 Columns) */}
            <aside className="lg:col-span-5 flex flex-col justify-between bg-white dark:bg-slate-900/90 rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200/80 dark:border-slate-800 relative overflow-hidden order-2 lg:order-1">
              {/* Archival watermark seal SVG background */}
              <svg
                className="absolute -right-12 -bottom-12 w-64 h-64 text-slate-200/50 dark:text-slate-800/50 pointer-events-none"
                fill="none"
                viewBox="0 0 200 200"
              >
                <circle cx="100" cy="100" r="85" stroke="currentColor" strokeDasharray="3 3" strokeWidth="1.5" />
                <circle cx="100" cy="100" r="70" stroke="currentColor" strokeWidth="1" />
                <path d="M100 35 L100 165 M35 100 L165 100" stroke="currentColor" strokeWidth="0.75" />
                <circle cx="100" cy="100" r="45" stroke="currentColor" strokeWidth="1.2" />
              </svg>

              <div className="flex flex-col gap-6 relative z-10">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 text-xs font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mr-2" />
                    Vault • Edition 2026
                  </span>
                  <span className="text-xs text-slate-400 dark:text-slate-500 tracking-wider uppercase font-semibold">
                    Archival Desk
                  </span>
                </div>

                {/* Archival Presentation Image */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden shadow-md group">
                  <img
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://images.unsplash.com/photo-1507842229451-7f01be782a22?auto=format&fit=crop&w=800&q=80"
                    alt="Oxford Bodleian Scholarly Archive and reading desk"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent flex flex-col justify-end p-5 text-white">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400">
                      Oxford Bodleian Collection
                    </span>
                    <p className="font-display text-lg font-bold text-white leading-tight mt-0.5">
                      Synoptic Parallel Codex VI
                    </p>
                  </div>
                </div>

                {/* Literary Quote Block */}
                <blockquote className="relative pl-4 py-1 border-l-2 border-amber-500 dark:border-amber-400">
                  <p className="font-display text-base italic text-slate-800 dark:text-slate-200 leading-snug">
                    “A reader lives a thousand lives before he dies. The man who never reads lives only one.”
                  </p>
                  <footer className="mt-2 text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span className="font-semibold text-slate-700 dark:text-slate-300">— George R.R. Martin</span>
                    <span>•</span>
                    <span className="text-amber-600 dark:text-amber-400 font-medium">A Dance with Dragons</span>
                  </footer>
                </blockquote>
              </div>

              {/* Archival Feature Badges & Sync Pulse */}
              <div className="mt-8 pt-4 relative z-10 flex flex-col gap-3">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                    <Icon name="verified_user" className="text-[15px] text-emerald-500" />
                    Zero Behavioral Tracking
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                    <Icon name="sync" className="text-[15px] text-blue-500" />
                    MongoDB Atlas Synced
                  </span>
                  <span className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-slate-50 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 text-xs font-medium border border-slate-200/60 dark:border-slate-700/60 shadow-xs">
                    <Icon name="translate" className="text-[15px] text-purple-500" />
                    Multilingual Canon
                  </span>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50/90 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-800 dark:text-slate-200">
                      <Icon name="history_edu" className="text-[18px]" />
                    </div>
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-900 dark:text-slate-100">
                        Catalog Session Node
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        Hệ thống kho tri thức BookBridge Portal
                      </span>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                </div>
              </div>
            </aside>

            {/* Right Editorial Form Surface (7 Columns) */}
            <section className="lg:col-span-7 flex flex-col justify-center bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-10 shadow-md border border-slate-200/80 dark:border-slate-800 order-1 lg:order-2">
              <div className="max-w-xl mx-auto w-full flex flex-col">
                {/* Header Greeting */}
                <header className="flex flex-col gap-1.5 mb-6">
                  <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400 text-xs uppercase tracking-wider font-bold">
                    <Icon name="menu_book" className="text-[16px]" />
                    <span>Bibliophile Desk Portal</span>
                  </div>
                  <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-50 tracking-tight">
                    Enter the Sanctuary of Letters
                  </h1>
                  <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Vui lòng đăng nhập bằng tài khoản để truy cập kho sách, phòng đọc đa ngữ và các đặc quyền lưu trữ.
                  </p>
                </header>

                {/* Quick Demo Pre-fill Rail */}
                <div className="mb-6 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20 border border-amber-200/80 dark:border-amber-900/40">
                  <div className="flex items-center justify-between mb-2.5">
                    <span className="text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400 flex items-center gap-1.5">
                      <Icon name="key" className="text-[16px]" />
                      Tài Khoản Có Sẵn (Bấm Để Điền Nhanh):
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 font-bold uppercase">
                      One-Click Fill
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => handleQuickFill('admin')}
                      className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all ${
                        identifier === 'admin@bookbridge.com'
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-medium'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-lg">⚡</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">
                          Quản Trị Viên (Admin)
                        </span>
                        <span className="text-[11px] opacity-80 font-mono">
                          admin@bookbridge.com
                        </span>
                      </div>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleQuickFill('reader')}
                      className={`flex items-start gap-2.5 p-3 rounded-lg border text-left transition-all ${
                        identifier === 'reader@bookbridge.com'
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-md font-medium'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 border-slate-200 dark:border-slate-700 hover:border-amber-400'
                      }`}
                    >
                      <span className="text-lg">👤</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-bold leading-tight">
                          Độc Giả (Reader)
                        </span>
                        <span className="text-[11px] opacity-80 font-mono">
                          reader@bookbridge.com
                        </span>
                      </div>
                    </button>
                  </div>
                </div>

                {/* Error Notice */}
                {error && (
                  <div className="mb-5 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 text-rose-600 dark:text-rose-300 text-xs flex items-center gap-2.5 animate-fadeIn">
                    <Icon name="error" className="text-[18px] shrink-0" />
                    <span>{error}</span>
                  </div>
                )}

                {/* Credential Form */}
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  {/* Scholar Identifier / Email */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 flex items-center justify-between">
                      <span>Email hoặc Tên đăng nhập</span>
                      <span className="text-[11px] text-slate-400 lowercase font-normal">
                        admin hoặc reader
                      </span>
                    </label>
                    <div className="relative flex items-center">
                      <Icon
                        name="mail"
                        className="absolute left-3.5 text-slate-400 text-[18px] pointer-events-none"
                      />
                      <input
                        type="text"
                        required
                        value={identifier}
                        onChange={(e) => setIdentifier(e.target.value)}
                        placeholder="admin@bookbridge.com"
                        className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
                      />
                    </div>
                  </div>

                  {/* Password */}
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        Mật khẩu
                      </label>
                      <span className="text-[11px] text-slate-400">
                        Admin@123456 / Reader@123456
                      </span>
                    </div>
                    <div className="relative flex items-center">
                      <Icon
                        name="lock"
                        className="absolute left-3.5 text-slate-400 text-[18px] pointer-events-none"
                      />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••••••"
                        className="w-full pl-10 pr-12 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:border-amber-500 transition-all font-mono"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 p-1 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors focus:outline-none"
                        title={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                      >
                        <Icon name={showPassword ? 'visibility_off' : 'visibility'} className="text-[18px]" />
                      </button>
                    </div>
                  </div>

                  {/* Persistence Checkbox */}
                  <div className="flex items-center justify-between mt-1">
                    <label className="flex items-center gap-2 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={rememberDesk}
                        onChange={(e) => setRememberDesk(e.target.checked)}
                        className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-slate-50 border-slate-300 dark:border-slate-700 cursor-pointer"
                      />
                      <span className="text-xs text-slate-600 dark:text-slate-400">
                        Duy trì phiên đăng nhập trên trình duyệt này
                      </span>
                    </label>
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full mt-2 py-3 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-amber-500 dark:hover:bg-amber-400 text-amber-400 dark:text-slate-950 font-bold text-sm shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                        <span>Đang xác thực thông tin...</span>
                      </>
                    ) : (
                      <>
                        <span>Đăng Nhập Vào Hệ Thống</span>
                        <Icon
                          name="arrow_forward"
                          className="text-[18px] group-hover:translate-x-1 transition-transform"
                        />
                      </>
                    )}
                  </button>
                </form>

                {/* Registration note */}
                <div className="mt-6 pt-4 border-t border-slate-200/80 dark:border-slate-800 text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Cổng lưu trữ sách nội bộ BookBridge • Tài khoản được cấu hình sẵn cho mục đích kiểm thử và quản trị.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* Footer Note */}
      <footer className="py-4 text-center border-t border-slate-200/60 dark:border-slate-800 text-xs text-slate-400">
        BookBridge Archival Desk Portal © 2026 • Literary Modernism & Heritage Preservation
      </footer>
    </div>
  );
}

export default LoginScreen;
