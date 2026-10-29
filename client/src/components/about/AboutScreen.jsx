import React from 'react';
import { Icon } from '../common/Icon.jsx';

export function AboutScreen({ onNavigate }) {
  return (
    <div className="w-full pb-20">
      {/* Header */}
      <div className="w-full bg-gradient-to-b from-blue-50/50 via-slate-50 to-transparent dark:from-slate-900/60 dark:via-slate-950 dark:to-transparent py-10 border-b border-slate-200 dark:border-slate-800">
        <div className="bb-container space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-amber-600 dark:text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Icon name="history_edu" className="text-[16px]" />
            <span>Platform Provenance & Ethics</span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-slate-900 dark:text-slate-100">
            About BookBridge
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl leading-relaxed">
            Bridging cultures, dialects, and reader communities through open literary heritage, zero-telemetry reading tracking, and modern user experience.
          </p>
        </div>
      </div>

      <div className="bb-container py-10 space-y-12 max-w-5xl">
        {/* Mission Statement */}
        <section className="bb-card p-8 bg-white dark:bg-slate-900 rounded-3xl space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold">
              <Icon name="auto_stories" className="text-[26px]" />
            </div>
            <div>
              <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
                Our Literary Mission & Philosophy
              </h2>
              <span className="text-xs text-slate-400">Public Open Access Literature</span>
            </div>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
            BookBridge was conceptualized to address the modern fragmentation of digital reading. Readers frequently struggle to find multilingual works classified by both cultural context and linguistic reading levels (Beginner to Advanced Academic). BookBridge brings masterworks across Vietnamese, English, French, Japanese, Spanish, German, and Russian into one harmonious portal.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-slate-100 dark:border-slate-800 text-center">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="font-display text-2xl font-bold text-amber-500">26</span>
              <p className="text-xs text-slate-500 mt-1">Curated Master Editions</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="font-display text-2xl font-bold text-blue-500">7+</span>
              <p className="text-xs text-slate-500 mt-1">Linguistic Traditions</p>
            </div>
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800">
              <span className="font-display text-2xl font-bold text-emerald-500">100%</span>
              <p className="text-xs text-slate-500 mt-1">Privacy & Client Durability</p>
            </div>
          </div>
        </section>

        {/* How to Use (3 Steps) */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl font-bold text-slate-900 dark:text-slate-100">
            How to Experience BookBridge
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bb-card p-6 bg-white dark:bg-slate-900 rounded-2xl space-y-3">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                01
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                Filter & Discover
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Use the multi-facet Smart Filter in the Directory to pinpoint works by Language, Genre, Difficulty Level, or Historic Era.
              </p>
            </div>

            <div className="bb-card p-6 bg-white dark:bg-slate-900 rounded-2xl space-y-3">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                02
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                Inspect Art & Authors
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Click any book card to inspect cover typography and curatorial details in the Lightbox, and explore Author Profiles to understand their philosophical heritage.
              </p>
            </div>

            <div className="bb-card p-6 bg-white dark:bg-slate-900 rounded-2xl space-y-3">
              <span className="w-8 h-8 rounded-full bg-slate-900 text-amber-400 flex items-center justify-center font-bold text-xs">
                03
              </span>
              <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100">
                Track Reading Privately
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Bookmark titles and log page progress directly in My Library. Your reading velocity is saved with instant recovery upon browser refresh.
              </p>
            </div>
          </div>
        </section>

        {/* Provenance & Acknowledgements */}
        <section className="bb-card p-8 bg-slate-900 text-white rounded-3xl space-y-4">
          <h2 className="font-display text-2xl font-bold text-amber-400">
            Source & Asset Acknowledgements
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            All text synopses, author biographies, and literary critiques have been carefully drafted to respect international copyright standards and fair educational use under Aptech eProject guidelines.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 text-xs text-slate-400">
            <div>
              <strong className="text-slate-200">Public Domain Archives:</strong>
              <p>Project Gutenberg, Internet Archive, National Library of Vietnam Special Collections.</p>
            </div>
            <div>
              <strong className="text-slate-200">Typography & Imagery:</strong>
              <p>Google Fonts (Playfair Display, Plus Jakarta Sans), Unsplash Open Photography License, Material Symbols.</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default AboutScreen;
