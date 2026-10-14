import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';
import { apiService } from '../services/apiService.js';

const FavoritesContext = createContext();

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(() => {
    return storageService.getFavorites();
  });

  // Keep localStorage synced whenever favorites change
  useEffect(() => {
    storageService.setFavorites(favorites);
  }, [favorites]);

  const isFavorite = (bookId) => {
    if (!bookId) return false;
    return favorites.includes(bookId);
  };

  const toggleFavorite = async (bookId) => {
    if (!bookId) return;

    setFavorites(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });

    // Optionally notify backend if logged in
    try {
      await apiService.toggleFavorite(bookId);
    } catch {
      // Offline or unauthenticated, local state is already safely saved
    }
  };

  const removeFavorite = (bookId) => {
    setFavorites(prev => prev.filter(id => id !== bookId));
  };

  const clearAllFavorites = () => {
    setFavorites([]);
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        favoritesCount: favorites.length,
        isFavorite,
        toggleFavorite,
        removeFavorite,
        clearAllFavorites
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
