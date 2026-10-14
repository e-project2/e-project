import React from 'react';
import { Icon } from './Icon.jsx';

export function Breadcrumbs({ items = [], onBack }) {
  return (
    <nav className="flex items-center gap-2 py-4 text-xs font-medium text-slate-500 dark:text-slate-400 select-none">
      {onBack && (
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1 mr-2 px-2.5 py-1 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
        >
          <Icon name="arrow_back" className="text-[14px]" />
          <span>Back</span>
        </button>
      )}

      {items.map((item, idx) => {
        const isLast = idx === items.length - 1;
        return (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="text-slate-300 dark:text-slate-600">/</span>}
            {isLast || !item.onClick ? (
              <span className={isLast ? 'text-slate-900 dark:text-slate-100 font-semibold truncate max-w-[200px]' : ''}>
                {item.label}
              </span>
            ) : (
              <button
                onClick={item.onClick}
                className="hover:text-amber-600 transition-colors"
              >
                {item.label}
              </button>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
}

export default Breadcrumbs;
