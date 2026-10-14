import express from 'express';
import { submitContact } from '../controllers/contactController.js';
import { contactLimiter } from '../middleware/security.js';
import { validateContact } from '../middleware/validation.js';

const router = express.Router();

// Gửi liên hệ công khai (Được bảo vệ bằng contactLimiter chống spam và validation)
router.post('/', contactLimiter, validateContact, submitContact);

export default router;
