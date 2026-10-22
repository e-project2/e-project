import React, { useState } from 'react';

export function ImageWithFallback({
  src,
  alt = 'Book Cover',
  title = '',
  author = '',
  className = '',
  aspectRatio = '2/3',
  ...props
}) {
  const [hasError, setHasError] = useState(false);

  const resolveSrc = (url) => {
    if (!url) return '';
    if (url.startsWith('/images/') && url.endsWith('.jpg')) {
      return url.replace(/\.jpg$/, '.svg');
    }
    return url;
  };

  const effectiveSrc = resolveSrc(src);

  if (hasError || !effectiveSrc) {
    return (
      <div
        className={`relative flex flex-col justify-between p-4 overflow-hidden select-none bg-gradient-to-br from-slate-800 via-slate-900 to-indigo-950 text-white ${className}`}
        style={{ aspectRatio }}
      >
        {/* Subtle decorative border and pattern */}
        <div className="absolute inset-2 border border-amber-500/30 rounded pointer-events-none" />
        <div className="absolute -right-10 -bottom-10 w-28 h-28 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />

        <div className="relative z-10">
          <span className="text-[10px] uppercase tracking-widest text-amber-400/90 font-semibold block mb-1">
            BookBridge Archive
          </span>
          <h4 className="font-serif text-sm font-bold line-clamp-3 leading-snug text-slate-100">
            {title || alt}
          </h4>
        </div>

        <div className="relative z-10 pt-2 border-t border-slate-700/50">
          <p className="text-xs text-slate-300 font-medium truncate">
            {author || 'World Literature'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={effectiveSrc}
      alt={alt}
      onError={() => setHasError(true)}
      className={className}
      loading="lazy"
      {...props}
    />
  );
}

export default ImageWithFallback;
