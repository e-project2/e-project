import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';
import { apiService } from '../services/apiService.js';
import { validateReadingProgress } from '../utils/validators.js';

const ReadingTrackerContext = createContext();

export function ReadingTrackerProvider({ children }) {
  const [tracker, setTracker] = useState(() => {
    return storageService.getReadingTracker();
  });

  // Sync with localStorage
  useEffect(() => {
    storageService.setReadingTracker(tracker);
  }, [tracker]);

  const getBookProgress = (bookId) => {
    return tracker[bookId] || null;
  };

  const updateProgress = async (bookId, page, totalPages, customStatus = null, notes = '') => {
    const total = parseInt(totalPages, 10) || 100;
    const validated = validateReadingProgress(page, total);

    if (!validated.isValid) {
      return { success: false, message: validated.message };
    }

    const currentPage = validated.page;
    const percentage = validated.percentage;

    let status = customStatus;
    if (!status) {
      if (currentPage >= total) {
        status = 'Completed';
      } else if (currentPage > 0) {
        status = 'Reading';
      } else {
        status = 'To Read';
      }
    }

    const updatedRecord = {
      status,
      currentPage,
      totalPages: total,
      percentage,
      notes: notes || tracker[bookId]?.notes || '',
      lastUpdated: new Date().toISOString()
    };

    setTracker(prev => ({
      ...prev,
      [bookId]: updatedRecord
    }));

    // Send to backend if online
    try {
      await apiService.updateTracker(bookId, currentPage, status, notes);
    } catch {
      // Local state is already securely saved
    }

    return { success: true, record: updatedRecord };
  };

  const setStatusOnly = (bookId, status, totalPages = 100) => {
    const existing = tracker[bookId] || {
      currentPage: 0,
      totalPages,
      percentage: 0
    };

    let currentPage = existing.currentPage;
    let percentage = existing.percentage;

    if (status === 'Completed') {
      currentPage = existing.totalPages;
      percentage = 100;
    } else if (status === 'To Read') {
      currentPage = 0;
      percentage = 0;
    }

    const updatedRecord = {
      ...existing,
      status,
      currentPage,
      percentage,
      lastUpdated: new Date().toISOString()
    };

    setTracker(prev => ({
      ...prev,
      [bookId]: updatedRecord
    }));

    try {
      apiService.updateTracker(bookId, currentPage, status);
    } catch {
      // fallback
    }
  };

  const clearProgress = (bookId) => {
    if (!tracker[bookId]) return;
    setTracker(prev => ({
      ...prev,
      [bookId]: {
        ...prev[bookId],
        currentPage: 0,
        percentage: 0,
        status: 'To Read',
        lastUpdated: new Date().toISOString()
      }
    }));
  };

  const removeFromTracker = (bookId) => {
    setTracker(prev => {
      const copy = { ...prev };
      delete copy[bookId];
      return copy;
    });
  };

  // Quick stats calculation
  const trackerEntries = Object.entries(tracker);
  const totalTracked = trackerEntries.length;
  const readingCount = trackerEntries.filter(([_, item]) => item.status === 'Reading').length;
  const completedCount = trackerEntries.filter(([_, item]) => item.status === 'Completed').length;
  const toReadCount = trackerEntries.filter(([_, item]) => item.status === 'To Read').length;

  return (
    <ReadingTrackerContext.Provider
      value={{
        tracker,
        stats: {
          totalTracked,
          readingCount,
          completedCount,
          toReadCount
        },
        getBookProgress,
        updateProgress,
        setStatusOnly,
        clearProgress,
        removeFromTracker
      }}
    >
      {children}
    </ReadingTrackerContext.Provider>
  );
}

export function useReadingTracker() {
  const context = useContext(ReadingTrackerContext);
  if (!context) {
    throw new Error('useReadingTracker must be used within a ReadingTrackerProvider');
  }
  return context;
}
