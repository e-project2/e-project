import React from 'react';
import { GENRES, PERIODS } from '../../constants/genres.js';
import { LANGUAGES } from '../../constants/languages.js';
import { READING_LEVELS } from '../../constants/readingLevels.js';
import { Icon } from '../common/Icon.jsx';

export function FilterSidebar({ filters, onUpdateFilters, onResetFilters }) {
  const hasActiveFilters =
    filters.search ||
    filters.genre !== 'All' ||
    filters.language !== 'all' ||
    filters.readingLevel !== 'all' ||
    filters.period !== 'all';

  return (
    <aside className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-sm space-y-6">
      {/* Sidebar Header & Clear All */}
      <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
        <h3 className="font-display text-lg font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
          <Icon name="tune" className="text-amber-500" />
          <span>Smart Filter</span>
        </h3>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="text-xs font-semibold text-rose-500 hover:text-rose-600 dark:text-rose-400 flex items-center gap-1 transition-colors"
          >
            <Icon name="refresh" className="text-[14px]" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      {/* 1. Keyword Search */}
      <div className="space-y-1.5">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Search Directory
        </label>
        <div className="relative flex items-center">
          <Icon name="search" className="absolute left-3 text-slate-400 text-[18px]" />
          <input
            type="text"
            value={filters.search}
            onChange={(e) => onUpdateFilters({ search: e.target.value })}
            placeholder="Title, author, or keyword..."
            className="w-full pl-9 pr-8 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50 border border-slate-200 dark:border-slate-700 transition-all"
          />
          {filters.search && (
            <button
              onClick={() => onUpdateFilters({ search: '' })}
              className="absolute right-2.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <Icon name="close" className="text-[16px]" />
            </button>
          )}
        </div>
      </div>

      {/* 2. Language Filter */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Language Dialect
        </label>
        <div className="flex flex-wrap gap-1.5">
          {LANGUAGES.map((lang) => {
            const isSelected = filters.language === lang.name || (lang.code === 'all' && filters.language === 'all');
            return (
              <button
                key={lang.code}
                onClick={() => onUpdateFilters({ language: lang.code === 'all' ? 'all' : lang.name })}
                className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{lang.flag} {lang.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Genre Category */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Genre Category
        </label>
        <div className="space-y-1 max-h-44 overflow-y-auto pr-1">
          {GENRES.map((genre) => {
            const isChecked = filters.genre === genre;
            return (
              <label
                key={genre}
                className="flex items-center gap-2.5 p-1.5 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer text-xs font-medium text-slate-700 dark:text-slate-300 transition-colors"
              >
                <input
                  type="radio"
                  name="genre-filter"
                  checked={isChecked}
                  onChange={() => onUpdateFilters({ genre })}
                  className="w-4 h-4 text-amber-600 focus:ring-amber-500 accent-amber-600"
                />
                <span>{genre}</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* 4. Reading Level */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Reading Level
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {READING_LEVELS.map((lvl) => {
            const isSelected = filters.readingLevel === lvl.id;
            return (
              <button
                key={lvl.id}
                onClick={() => onUpdateFilters({ readingLevel: lvl.id })}
                className={`py-1.5 px-2 rounded-lg text-xs font-semibold text-center transition-all ${
                  isSelected
                    ? 'bg-slate-900 text-white dark:bg-amber-500 dark:text-slate-950 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {lvl.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* 5. Publication Period */}
      <div className="space-y-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-400">
          Publication Period
        </label>
        <select
          value={filters.period}
          onChange={(e) => onUpdateFilters({ period: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        >
          {PERIODS.map((p) => (
            <option key={p.id} value={p.id}>
              {p.label}
            </option>
          ))}
        </select>
      </div>
    </aside>
  );
}

export default FilterSidebar;
