import React, { useEffect, useCallback } from 'react';
import { Icon } from '../common/Icon.jsx';

export function GalleryLightboxModal({
  items = [],
  currentIndex = 0,
  onClose,
  onNavigate
}) {
  const currentItem = items[currentIndex];

  const handlePrev = useCallback(() => {
    const nextIdx = (currentIndex - 1 + items.length) % items.length;
    onNavigate(nextIdx);
  }, [currentIndex, items.length, onNavigate]);

  const handleNext = useCallback(() => {
    const nextIdx = (currentIndex + 1) % items.length;
    onNavigate(nextIdx);
  }, [currentIndex, items.length, onNavigate]);

  // Keyboard navigation: ArrowLeft, ArrowRight, Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handlePrev, handleNext, onClose]);

  if (!currentItem) return null;

  return (
    <div
      className="modal-overlay !p-2 sm:!p-6 !bg-slate-950/95"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Gallery Lightbox Fullscreen Preview"
    >
      <div
        className="relative max-w-5xl w-full max-h-[95vh] flex flex-col items-center justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Controls Bar */}
        <div className="w-full flex items-center justify-between px-4 py-2 text-white/90">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-white/10 text-xs font-semibold backdrop-blur">
              {currentIndex + 1} / {items.length}
            </span>
            <span className="text-xs text-white/60 hidden sm:inline">
              Use Left / Right arrow keys to navigate
            </span>
          </div>
          <button
            onClick={onClose}
            className="btn-icon w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur transition-all"
            title="Close Lightbox (Esc)"
          >
            <Icon name="close" />
          </button>
        </div>

        {/* Center Media Showcase with Navigation Arrows */}
        <div className="relative w-full flex items-center justify-center my-auto py-2">
          {/* Previous Arrow */}
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-4 z-20 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center backdrop-blur shadow-2xl transition-all"
            aria-label="Previous image"
            title="Previous (ArrowLeft)"
          >
            <Icon name="chevron_left" className="text-[28px]" />
          </button>

          {/* Image Display */}
          <div className="max-h-[62vh] max-w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10 bg-slate-900 flex items-center justify-center">
            <img
              src={currentItem.imageUrl}
              alt={currentItem.caption || currentItem.title}
              className="max-h-[62vh] max-w-full object-contain"
            />
          </div>

          {/* Next Arrow */}
          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-4 z-20 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-500 hover:text-slate-950 text-white flex items-center justify-center backdrop-blur shadow-2xl transition-all"
            aria-label="Next image"
            title="Next (ArrowRight)"
          >
            <Icon name="chevron_right" className="text-[28px]" />
          </button>
        </div>

        {/* Bottom Metadata & Credits Rail */}
        <div className="w-full bg-slate-900/90 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/10 text-white space-y-2 mt-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="font-display text-lg sm:text-xl font-bold text-amber-400">
                {currentItem.title}
              </h3>
              <p className="text-xs text-slate-300">
                {currentItem.author} • {currentItem.year || 'Preservation Vault'}
              </p>
            </div>
            <span className="self-start sm:self-auto text-[11px] uppercase tracking-wider px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30">
              {currentItem.category || 'Curated Art'}
            </span>
          </div>

          <p className="text-xs text-slate-200 leading-relaxed">
            {currentItem.caption}
          </p>

          <div className="pt-2 border-t border-white/10 text-[11px] text-slate-400 flex items-center gap-2">
            <Icon name="verified_user" className="text-[14px] text-emerald-400" />
            <span>
              <strong>Credit & Provenance:</strong> {currentItem.credit || 'BookBridge Public Domain Archival Vault'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GalleryLightboxModal;
