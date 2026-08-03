import express from 'express';
const router = express.Router();
import { getTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial  } from './testimonial.controller.js';
import { protect  } from '../../middleware/authMiddleware.js';

router.route('/')
  .get(getTestimonials)
  .post(protect, createTestimonial);

router.route('/:id')
  .get(getTestimonialById)
  .put(protect, updateTestimonial)
  .delete(protect, deleteTestimonial);

export default router;