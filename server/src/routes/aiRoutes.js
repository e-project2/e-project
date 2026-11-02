import express from 'express';
import { handleAiChat, handleAiStatus } from '../controllers/aiController.js';

const router = express.Router();

// GET /api/ai/status - Kiểm tra trạng thái kết nối với Gemini API
router.get('/status', handleAiStatus);

// POST /api/ai/chat - Trò chuyện và nhận đề xuất sách từ Gemini AI
router.post('/chat', handleAiChat);

export default router;
