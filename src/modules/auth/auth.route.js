import express from 'express';
const router = express.Router();
import { loginAdmin, getMe  } from './auth.controller.js';
import { protect  } from '../../middleware/authMiddleware.js';

router.post('/login', loginAdmin);
router.get('/me', protect, getMe);

export default router;