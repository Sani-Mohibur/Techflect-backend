import express from 'express';
const router = express.Router();
import { getCaseStudys, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy  } from './caseStudy.controller.js';
import { protect  } from '../../middleware/authMiddleware.js';

router.route('/')
  .get(getCaseStudys)
  .post(protect, createCaseStudy);

router.route('/:id')
  .get(getCaseStudyById)
  .put(protect, updateCaseStudy)
  .delete(protect, deleteCaseStudy);

export default router;