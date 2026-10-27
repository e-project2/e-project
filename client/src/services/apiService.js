import { storageService } from './storageService.js';

const API_BASE = '/api';

async function request(url, options = {}) {
  try {
    const auth = storageService.getAuth();
    const headers = {
      'Content-Type': 'application/json',
      ...(auth?.token ? { Authorization: `Bearer ${auth.token}` } : {}),
      ...(options.headers || {})
    };

    const res = await fetch(`${API_BASE}${url}`, {
      ...options,
      headers
    });

    if (!res.ok) {
      const errorJson = await res.json().catch(() => ({}));
      throw new Error(errorJson.message || `Request failed with status ${res.status}`);
    }

    return await res.json();
  } catch (error) {
    console.warn(`[API Request Error] ${url}: ${error.message}`);
    throw error;
  }
}

export const apiService = {
  // Books API
  async getBooks(params = {}) {
    const query = new URLSearchParams();
    if (params.q) query.append('q', params.q);
    if (params.genre && params.genre !== 'All') query.append('genre', params.genre);
    if (params.language && params.language !== 'all') query.append('language', params.language);
    if (params.readingLevel && params.readingLevel !== 'all') query.append('readingLevel', params.readingLevel);
    if (params.period && params.period !== 'all') query.append('period', params.period);
    query.append('limit', params.limit || '100');
    if (params.page) query.append('page', params.page);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await request(`/books${queryString}`);
    return res.data || res.books || [];
  },

  async getBookById(id) {
    const res = await request(`/books/${id}`);
    return res.data?.book || res.data || null;
  },

  async getFeaturedBooks() {
    const res = await request('/books/featured');
    return res.data || [];
  },

  // Authors API
  async getAuthors() {
    const res = await request('/authors');
    return res.data || res.authors || [];
  },

  async getAuthorById(id) {
    const res = await request(`/authors/${id}`);
    return res.data || null;
  },

  // Collections API
  async getCollections() {
    const res = await request('/collections');
    return res.data || [];
  },

  // Gallery API
  async getGallery() {
    const res = await request('/gallery');
    return res.data || [];
  },

  // Contact API
  async sendContactMessage(payload) {
    return await request('/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    });
  },

  // Auth API
  async login(emailOrUsername, password) {
    return await fetchWithFallback('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ identifier: emailOrUsername, password })
    });
  },

  async register(username, email, password, fullName) {
    return await fetchWithFallback('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password, fullName })
    });
  },

  async getMe() {
    return await fetchWithFallback('/auth/me');
  },

  // Tracker API
  async getUserProgress() {
    return await fetchWithFallback('/tracker', {}, []);
  },

  async getReadingStats() {
    return await fetchWithFallback('/tracker/stats', {}, null);
  },

  async updateTracker(bookId, currentPage, status, notes = '', totalPages = 3) {
    return await fetchWithFallback(`/tracker/${bookId}`, {
      method: 'POST',
      body: JSON.stringify({ currentPage, totalPages, status, notes })
    }, { bookId, currentPage, totalPages, status });
  },

  async deleteProgress(bookId) {
    return await fetchWithFallback(`/tracker/${bookId}`, {
      method: 'DELETE'
    });
  },

  // Favorites API
  async getFavorites() {
    return await fetchWithFallback('/favorites', {}, []);
  },

  async toggleFavorite(bookId) {
    return await fetchWithFallback(`/favorites/${bookId}`, {
      method: 'POST'
    }, { bookId, isFavorited: true });
  },

  async removeFavorite(bookId) {
    return await fetchWithFallback(`/favorites/${bookId}`, {
      method: 'DELETE'
    }, { bookId, isFavorited: false });
  },

  // Admin APIs
  async getAdminStats() {
    return await fetchWithFallback('/admin/stats');
  },

  async createBook(bookPayload) {
    return await fetchWithFallback('/admin/books', {
      method: 'POST',
      body: JSON.stringify(bookPayload)
    });
  },

  async updateBook(id, bookPayload) {
    return await fetchWithFallback(`/admin/books/${id}`, {
      method: 'PUT',
      body: JSON.stringify(bookPayload)
    });
  },

  async deleteBook(id) {
    return await fetchWithFallback(`/admin/books/${id}`, {
      method: 'DELETE'
    });
  }
};

export default apiService;
