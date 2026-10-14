import express from 'express';
import mongoose from 'mongoose';

import authRoutes from './authRoutes.js';
import bookRoutes from './bookRoutes.js';
import authorRoutes from './authorRoutes.js';
import collectionRoutes from './collectionRoutes.js';
import galleryRoutes from './galleryRoutes.js';
import trackerRoutes from './trackerRoutes.js';
import favoriteRoutes from './favoriteRoutes.js';
import reviewRoutes from './reviewRoutes.js';
import contactRoutes from './contactRoutes.js';
import adminRoutes from './adminRoutes.js';

const router = express.Router();

// Health Check Endpoint (Kiểm tra tình trạng máy chủ & kết nối MongoDB)
router.get('/health', (req, res) => {
  const dbStatus = mongoose.connection.readyState;
  const dbStates = {
    0: 'Disconnected',
    1: 'Connected',
    2: 'Connecting',
    3: 'Disconnecting'
  };

  return res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStates[dbStatus] || 'Unknown',
      name: mongoose.connection.name || 'none'
    },
    version: '1.0.0',
    service: 'BookBridge API Backend'
  });
});

// Gắn kết tất cả các Module Routes
router.use('/auth', authRoutes);
router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);
router.use('/collections', collectionRoutes);
router.use('/gallery', galleryRoutes);
router.use('/tracker', trackerRoutes);
router.use('/favorites', favoriteRoutes);
router.use('/reviews', reviewRoutes);
router.use('/contact', contactRoutes);
router.use('/admin', adminRoutes);

export default router;
