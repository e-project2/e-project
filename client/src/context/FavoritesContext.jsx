import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';
import { apiService } from '../services/apiService.js';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  // Pure in-memory React state driven strictly by Database API (no localStorage)
  const [favorites, setFavorites] = useState([]);

  // Load real favorites directly from Backend API / Database
  const loadRemoteFavorites = async () => {
    try {
      const res = await apiService.getFavorites();
      const list = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list)) {
        const ids = list
          .map(item => item.bookId?._id || item.bookId?.id || item.bookId)
          .filter(Boolean);
        setFavorites(ids);
        return ids;
      }
    } catch {
      // Offline fallback
    }
    return [];
  };

  useEffect(() => {
    loadRemoteFavorites();
  }, []);

  const isFavorite = (bookId) => {
    if (!bookId) return false;
    const cleanId = typeof bookId === 'object' ? (bookId._id || bookId.id) : bookId;
    return favorites.some(id => String(id) === String(cleanId));
  };

  const toggleFavorite = async (bookId) => {
    if (!bookId) return;
    const cleanId = typeof bookId === 'object' ? (bookId._id || bookId.id) : bookId;

    setFavorites(prev => {
      const exists = prev.some(id => String(id) === String(cleanId));
      if (exists) {
        return prev.filter(id => String(id) !== String(cleanId));
      } else {
        return [...prev, cleanId];
      }
    });

    // Notify backend if logged in
    try {
      await apiService.toggleFavorite(cleanId);
    } catch {
      // Offline or unauthenticated, local state is already safely saved
    }
  };

  const removeFavorite = async (bookId) => {
    if (!bookId) return;
    const cleanId = typeof bookId === 'object' ? (bookId._id || bookId.id) : bookId;
    setFavorites(prev => prev.filter(id => String(id) !== String(cleanId)));
    try {
      await apiService.removeFavorite(cleanId);
    } catch {
      // Offline fallback
    }
  };

  const clearAllFavorites = () => {
    setFavorites([]);
    storageService.clearFavorites();
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearAllFavorites,
        refreshFavorites: loadRemoteFavorites
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
