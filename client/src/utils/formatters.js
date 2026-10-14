export function formatDate(isoString) {
  if (!isoString) return '';
  try {
    const d = new Date(isoString);
    return d.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch {
    return isoString;
  }
}

export function truncateText(text, maxLength = 120) {
  if (!text) return '';
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function getLanguageBadgeStyle(language) {
  switch (language?.toLowerCase()) {
    case 'vietnamese':
      return { bg: 'bg-emerald-50 text-emerald-700 border-emerald-200', tag: 'Tiếng Việt' };
    case 'english':
      return { bg: 'bg-blue-50 text-blue-700 border-blue-200', tag: 'English' };
    case 'french':
      return { bg: 'bg-indigo-50 text-indigo-700 border-indigo-200', tag: 'Français' };
    case 'japanese':
      return { bg: 'bg-rose-50 text-rose-700 border-rose-200', tag: '日本語' };
    case 'spanish':
      return { bg: 'bg-amber-50 text-amber-700 border-amber-200', tag: 'Español' };
    case 'german':
      return { bg: 'bg-slate-100 text-slate-700 border-slate-300', tag: 'Deutsch' };
    case 'russian':
      return { bg: 'bg-cyan-50 text-cyan-700 border-cyan-200', tag: 'Русский' };
    default:
      return { bg: 'bg-gray-100 text-gray-700 border-gray-200', tag: language || 'Universal' };
  }
}

export function getReadingLevelBadgeStyle(level) {
  switch (level?.toLowerCase()) {
    case 'beginner':
      return { bg: 'bg-green-100 text-green-800', label: 'Beginner' };
    case 'intermediate':
      return { bg: 'bg-sky-100 text-sky-800', label: 'Intermediate' };
    case 'advanced':
      return { bg: 'bg-purple-100 text-purple-800', label: 'Advanced Academic' };
    default:
      return { bg: 'bg-gray-100 text-gray-800', label: level || 'Standard' };
  }
}
