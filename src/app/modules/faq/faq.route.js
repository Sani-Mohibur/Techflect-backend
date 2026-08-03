import express from 'express';
const router = express.Router();
import { getFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ  } from './faq.controller.js';
import { protect  } from '../../middleware/auth.js';

router.route('/')
  .get(getFAQs)
  .post(protect, createFAQ);

router.route('/:id')
  .get(getFAQById)
  .put(protect, updateFAQ)
  .delete(protect, deleteFAQ);

export default router;