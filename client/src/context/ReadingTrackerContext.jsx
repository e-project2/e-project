import React, { createContext, useContext, useState, useEffect } from 'react';
import { storageService } from '../services/storageService.js';
import { apiService } from '../services/apiService.js';
import { validateReadingProgress } from '../utils/validators.js';

const ReadingTrackerContext = createContext();

export function ReadingTrackerProvider({ children }) {
  // Pure in-memory React state driven strictly by Database API (no localStorage)
  const [tracker, setTracker] = useState({});

  // Sync with remote Backend API / Database
  const loadRemoteProgress = async () => {
    try {
      const res = await apiService.getUserProgress();
      const list = res?.data || (Array.isArray(res) ? res : []);
      if (Array.isArray(list)) {
        const mapped = {};
        list.forEach(item => {
          const bId = item.bookId?._id || item.bookId?.id || item.bookId;
          if (bId) {
            const total = 3; // Chuẩn hóa 3 trang thực tế cho mọi sách trên web
            const curPage = item.status === 'Completed' ? 3 : Math.min(Number(item.currentPage) || 0, 3);
            const pct = Math.min(100, Math.round((curPage / total) * 100));

            mapped[bId] = {
              status: item.status,
              currentPage: curPage,
              totalPages: total,
              percentage: pct,
              notes: item.notes || '',
              lastUpdated: item.lastUpdated || item.updatedAt
            };
          }
        });
        setTracker(mapped);
        return mapped;
      }
    } catch {
      // Offline fallback
    }
    return {};
  };

  useEffect(() => {
    loadRemoteProgress();
  }, []);

  const clearAllTracker = async () => {
    setTracker({});
    return {};
  };

  const resetTracker = () => {
    return clearAllTracker();
  };

  const getBookProgress = (bookId) => {
    if (!bookId) return null;
    const cleanId = typeof bookId === 'object' ? (bookId._id || bookId.id) : bookId;
    return tracker[cleanId] || null;
  };

  const updateProgress = async (bookId, page, totalPages = 3, customStatus = null, notes = '') => {
    const total = 3; // Luôn lấy số trang thực tế là 3
    const parsedPage = parseInt(page, 10) || 0;
    const currentPage = Math.min(Math.max(0, parsedPage), total);
    const percentage = Math.min(100, Math.round((currentPage / total) * 100));

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

    // Send directly to database via API
    try {
      await apiService.updateTracker(bookId, currentPage, status, notes, total);
    } catch {
      // Saved in memory
    }

    return { success: true, record: updatedRecord };
  };

  const setStatusOnly = (bookId, status, totalPages = 3) => {
    const total = 3;
    const existing = tracker[bookId] || {
      currentPage: 0,
      totalPages: total,
      percentage: 0
    };

    let currentPage = Math.min(existing.currentPage || 0, total);
    let percentage = Math.min(100, Math.round((currentPage / total) * 100));

    if (status === 'Completed') {
      currentPage = 3; // Đúng 3 trang khi hoàn thành
      percentage = 100;
    } else if (status === 'To Read') {
      currentPage = 0;
      percentage = 0;
    } else if (status === 'Reading') {
      currentPage = Math.max(1, Math.min(currentPage || 1, 2));
      percentage = Math.round((currentPage / total) * 100);
    }

    const updatedRecord = {
      ...existing,
      status,
      currentPage,
      totalPages: total,
      percentage,
      lastUpdated: new Date().toISOString()
    };

    setTracker(prev => ({
      ...prev,
      [bookId]: updatedRecord
    }));

    try {
      apiService.updateTracker(bookId, currentPage, status, existing.notes || '', total);
    } catch {
      // fallback
    }
  };

  const clearProgress = (bookId) => {
    const updatedRecord = {
      ...(tracker[bookId] || {}),
      currentPage: 0,
      totalPages: 3,
      percentage: 0,
      status: 'To Read',
      lastUpdated: new Date().toISOString()
    };

    setTracker(prev => ({
      ...prev,
      [bookId]: updatedRecord
    }));

    try {
      apiService.updateTracker(bookId, 0, 'To Read', '', 3);
    } catch {
      // fallback
    }
  };

  const removeFromTracker = (bookId) => {
    setTracker(prev => {
      const copy = { ...prev };
      delete copy[bookId];
      return copy;
    });

    try {
      if (apiService.deleteProgress) {
        apiService.deleteProgress(bookId);
      }
    } catch {
      // fallback
    }
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
        removeFromTracker,
        clearAllTracker,
        refreshTracker: loadRemoteProgress,
        resetTracker
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
