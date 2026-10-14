import { booksData } from '../data/booksData.js';
import { authorsData } from '../data/authorsData.js';
import { collectionsData } from '../data/collectionsData.js';
import { galleryData } from '../data/galleryData.js';
import { storageService } from './storageService.js';

const API_BASE = '/api';

async function fetchWithFallback(url, options = {}, fallbackData = null) {
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
    console.warn(`[API Fallback] ${url} error: ${error.message}. Returning local mock data.`);
    if (fallbackData !== null) {
      return { success: true, fromFallback: true, data: fallbackData };
    }
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
    if (params.limit) query.append('limit', params.limit);
    if (params.page) query.append('page', params.page);

    const queryString = query.toString() ? `?${query.toString()}` : '';
    const res = await fetchWithFallback(`/books${queryString}`, {}, booksData);
    return res.data || res.books || booksData;
  },

  async getBookById(id) {
    const fallback = booksData.find(b => b._id === id || b.id === id);
    const res = await fetchWithFallback(`/books/${id}`, {}, fallback);
    return res.data?.book || res.data || fallback;
  },

  async getFeaturedBooks() {
    const fallback = booksData.filter(b => b.isFeatured);
    const res = await fetchWithFallback('/books/featured', {}, fallback);
    return res.data || fallback;
  },

  // Authors API
  async getAuthors() {
    const res = await fetchWithFallback('/authors', {}, authorsData);
    return res.data || res.authors || authorsData;
  },

  async getAuthorById(id) {
    const author = authorsData.find(a => a._id === id || a.id === id);
    const books = booksData.filter(b => b.authorId === id);
    const fallback = { ...author, books };
    const res = await fetchWithFallback(`/authors/${id}`, {}, fallback);
    return res.data || fallback;
  },

  // Collections API
  async getCollections() {
    const res = await fetchWithFallback('/collections', {}, collectionsData);
    return res.data || collectionsData;
  },

  // Gallery API
  async getGallery() {
    const res = await fetchWithFallback('/gallery', {}, galleryData);
    return res.data || galleryData;
  },

  // Contact API
  async sendContactMessage(payload) {
    return await fetchWithFallback('/contact', {
      method: 'POST',
      body: JSON.stringify(payload)
    }, { message: 'Message sent successfully (Offline mock response)' });
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
  async updateTracker(bookId, currentPage, status, notes = '') {
    return await fetchWithFallback(`/tracker/${bookId}`, {
      method: 'POST',
      body: JSON.stringify({ currentPage, status, notes })
    }, { bookId, currentPage, status });
  },

  // Favorites API
  async toggleFavorite(bookId) {
    return await fetchWithFallback(`/favorites/${bookId}`, {
      method: 'POST'
    }, { bookId, isFavorited: true });
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
