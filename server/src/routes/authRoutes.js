import express from 'express';
import {
  register,
  login,
  refreshToken,
  getMe,
  updateProfile,
  changePassword
} from '../controllers/authController.js';
import { verifyToken } from '../middleware/auth.js';
import { authLimiter } from '../middleware/security.js';
import { validateRegister, validateLogin } from '../middleware/validation.js';

const router = express.Router();

// Public routes (Bảo vệ bằng authLimiter chống brute-force)
router.post('/register', authLimiter, validateRegister, register);
router.post('/login', authLimiter, validateLogin, login);
router.post('/refresh-token', refreshToken);

// Protected routes (Yêu cầu đăng nhập - verifyToken)
router.get('/me', verifyToken, getMe);
router.put('/profile', verifyToken, updateProfile);
router.put('/change-password', verifyToken, changePassword);

export default router;
