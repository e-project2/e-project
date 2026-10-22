/**
 * Storage Service: Safe wrapper around Web Storage API (localStorage)
 * Handles Incognito/Private mode, serialization failures, and quota exceptions.
 */

const STORAGE_KEYS = {
  FAVORITES: 'bookbridge_v2_favorites',
  TRACKER: 'bookbridge_v2_reading_tracker',
  THEME: 'bookbridge_theme',
  AUTH: 'bookbridge_auth_user'
};

// Auto-purge any favorites or reading tracker from localStorage (only Database is source of truth)
if (typeof window !== 'undefined' && window.localStorage) {
  try {
    const keysToRemove = [
      'bookbridge_v1_favorites',
      'bookbridge_v2_favorites',
      'bookbridge_favorites',
      'bookbridge_v1_reading_tracker',
      'bookbridge_v2_reading_tracker',
      'bookbridge_reading_tracker'
    ];
    keysToRemove.forEach(k => window.localStorage.removeItem(k));
  } catch (e) {
    // Ignore storage restrictions
  }
}

// In-memory fallback if localStorage is blocked (Private browsing, cookies disabled)
const memoryStorage = new Map();

function isLocalStorageAvailable() {
  try {
    const testKey = '__bb_storage_test__';
    window.localStorage.setItem(testKey, '1');
    window.localStorage.removeItem(testKey);
    return true;
  } catch (e) {
    console.warn('LocalStorage unavailable or restricted. Falling back to memory storage.', e);
    return false;
  }
}

const hasLocalStorage = typeof window !== 'undefined' && isLocalStorageAvailable();

export const storageService = {
  get(key, defaultValue = null) {
    try {
      if (hasLocalStorage) {
        const item = window.localStorage.getItem(key);
        return item ? JSON.parse(item) : defaultValue;
      }
      return memoryStorage.has(key) ? memoryStorage.get(key) : defaultValue;
    } catch (error) {
      console.error(`Error reading key "${key}" from storage:`, error);
      return defaultValue;
    }
  },

  set(key, value) {
    try {
      const serialized = JSON.stringify(value);
      if (hasLocalStorage) {
        window.localStorage.setItem(key, serialized);
      }
      memoryStorage.set(key, value);
      return true;
    } catch (error) {
      console.error(`Error setting key "${key}" in storage:`, error);
      memoryStorage.set(key, value);
      return false;
    }
  },

  remove(key) {
    try {
      if (hasLocalStorage) {
        window.localStorage.removeItem(key);
      }
      memoryStorage.delete(key);
      return true;
    } catch (error) {
      console.error(`Error removing key "${key}" from storage:`, error);
      return false;
    }
  },

  // Favorites and Reading Tracker are purely Database-driven (no localStorage saving)
  getFavorites() {
    return [];
  },

  setFavorites() {
    return true;
  },

  clearFavorites() {
    return [];
  },

  getReadingTracker() {
    return {};
  },

  setReadingTracker() {
    return true;
  },

  clearReadingTracker() {
    return {};
  },

  getTheme() {
    return this.get(STORAGE_KEYS.THEME, 'light');
  },

  setTheme(theme) {
    return this.set(STORAGE_KEYS.THEME, theme);
  },

  getAuth() {
    return this.get(STORAGE_KEYS.AUTH, null);
  },

  setAuth(user) {
    return this.set(STORAGE_KEYS.AUTH, user);
  },

  clearAuth() {
    return this.remove(STORAGE_KEYS.AUTH);
  }
};

export default storageService;
