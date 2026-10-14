/**
 * Storage Service: Safe wrapper around Web Storage API (localStorage)
 * Handles Incognito/Private mode, serialization failures, and quota exceptions.
 */

const STORAGE_KEYS = {
  FAVORITES: 'bookbridge_v1_favorites',
  TRACKER: 'bookbridge_v1_reading_tracker',
  THEME: 'bookbridge_theme',
  AUTH: 'bookbridge_auth_user'
};

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
      // Fallback to memory
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

  // Specialized helpers
  getFavorites() {
    return this.get(STORAGE_KEYS.FAVORITES, ['bk-01', 'bk-03', 'bk-11']);
  },

  setFavorites(favoritesArray) {
    return this.set(STORAGE_KEYS.FAVORITES, Array.from(new Set(favoritesArray)));
  },

  getReadingTracker() {
    return this.get(STORAGE_KEYS.TRACKER, {
      'bk-01': {
        status: 'Reading',
        currentPage: 142,
        totalPages: 328,
        percentage: 43,
        lastUpdated: new Date().toISOString()
      },
      'bk-03': {
        status: 'Completed',
        currentPage: 96,
        totalPages: 96,
        percentage: 100,
        lastUpdated: new Date().toISOString()
      },
      'bk-11': {
        status: 'To Read',
        currentPage: 0,
        totalPages: 85,
        percentage: 0,
        lastUpdated: new Date().toISOString()
      }
    });
  },

  setReadingTracker(trackerObj) {
    return this.set(STORAGE_KEYS.TRACKER, trackerObj);
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
