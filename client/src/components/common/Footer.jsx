import React from 'react';
import { Icon } from './Icon.jsx';

export function Footer({ onNavigate }) {
  return (
    <footer className="w-full bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 mt-auto">
      <div className="bb-container">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Info (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500 flex items-center justify-center text-slate-950 font-bold">
                <Icon name="auto_stories" className="text-[20px]" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight text-white">
                BookBridge
              </span>
            </div>
            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              An interactive multilingual book discovery portal and reading organizer. Bridging cultures through literary masterpieces across Vietnamese, English, French, Japanese, and Spanish.
            </p>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fullstack Architecture: React 18 SPA + Express REST API</span>
            </div>
          </div>

          {/* Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Platform Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => onNavigate('directory')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Books Directory & Smart Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('explorer')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Language & Genre Explorer
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('collections')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Curated Reading Collections
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-amber-400 transition-colors"
                >
                  Interactive Book Gallery & Lightbox
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('my-library')}
                  className="hover:text-amber-400 transition-colors"
                >
                  My Library & Reading Tracker
                </button>
              </li>
            </ul>
          </div>

          {/* Academic Mission & Links (4 cols) */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-slate-200">
              Provenance & Project
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Designed according to Aptech eProject standards. Built with client-side fault tolerance, safe serialization, and full WCAG 2.1 AA accessibility guidelines.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <button
                onClick={() => onNavigate('about')}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                About Mission
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-xs px-3 py-1.5 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors"
              >
                Archival Desk & Feedback
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© 2026 BookBridge Portal. All rights reserved. Non-commercial educational demonstration.</p>
          <p>Curated with literary modernism & precision.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
