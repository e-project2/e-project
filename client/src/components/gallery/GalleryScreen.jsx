import React, { useState } from 'react';
import { useBooks } from '../../context/BookContext.jsx';
import { GalleryLightboxModal } from './GalleryLightboxModal.jsx';
import { Icon } from '../common/Icon.jsx';

export function GalleryScreen({ onSelectBook }) {
  const { gallery, books } = useBooks();
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const categories = [
    { id: 'all', label: 'All Artworks' },
    { id: 'classic', label: 'Classic Typography' },
    { id: 'illustrated', label: 'Illustrated Masterpieces' },
    { id: 'modernist', label: 'Modernist Design' },
    { id: 'vintage', label: 'Vintage & Archival' }
  ];

  const filteredGallery = gallery.filter((item) => {
    if (activeCategory === 'all') return true;
    return item.category?.toLowerCase() === activeCategory.toLowerCase();
  });

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handleInspectBook = (bookId) => {
    const bk = books.find(b => b._id === bookId || b.id === bookId);
    if (bk && onSelectBook) {
      onSelectBook(bk);
    }
  };

  return (
    <div className="w-full pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-slate-100/70 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="photo_library" className="text-[16px]" />
            <span>Artistic Archives • Visual Cover Curation</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            Interactive Book Gallery & Lightbox
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Experience the visual identity, historical typography, and cover illustrations of world literary treasures. Click any edition to inspect high-resolution artwork in full-screen Lightbox mode with preservation metadata.
          </p>
        </div>
      </div>

      <div className="bb-container py-8 space-y-8">
        {/* Filter Pills Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="text-xs text-slate-400 font-semibold">
            {filteredGallery.length} Curated Artworks
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredGallery.map((item, index) => (
            <div
              key={item._id || item.id || index}
              className="bb-card group relative flex flex-col rounded-2xl bg-white dark:bg-slate-900 overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300"
            >
              {/* Image Container with hover overlay */}
              <div
                onClick={() => handleOpenLightbox(index)}
                className="relative aspect-[4/3] w-full overflow-hidden bg-slate-950 cursor-pointer"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                  <span className="inline-flex items-center gap-1 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1">
                    <Icon name="zoom_in" className="text-[18px]" />
                    <span>Open Full Lightbox</span>
                  </span>
                  <h4 className="font-display font-bold text-base text-white">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-300">
                    {item.author} • {item.year}
                  </p>
                </div>
              </div>

              {/* Caption & Metadata */}
              <div className="p-4 flex flex-col justify-between flex-grow space-y-3">
                <div>
                  <div className="flex items-center justify-between text-xs text-amber-600 dark:text-amber-400 font-bold uppercase tracking-wider mb-1">
                    <span>{item.category || 'Archival Print'}</span>
                    <span className="text-slate-400 font-normal">{item.aspect}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-slate-900 dark:text-slate-100 line-clamp-1">
                    {item.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {item.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    onClick={() => handleOpenLightbox(index)}
                    className="text-xs font-bold text-amber-600 dark:text-amber-400 hover:underline flex items-center gap-1"
                  >
                    <Icon name="fullscreen" className="text-[16px]" />
                    <span>Inspect Full View</span>
                  </button>

                  {item.bookId && (
                    <button
                      onClick={() => handleInspectBook(item.bookId)}
                      className="text-xs px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 transition-colors"
                    >
                      Book Record
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxIndex !== null && (
        <GalleryLightboxModal
          items={filteredGallery}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onNavigate={(newIdx) => setLightboxIndex(newIdx)}
        />
      )}
    </div>
  );
}

export default GalleryScreen;
