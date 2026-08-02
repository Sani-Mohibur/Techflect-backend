const express = require('express');
const router = express.Router();
const { getFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ } = require('./fAQController');
const { protect } = require('../../middleware/authMiddleware');

router.route('/')
  .get(getFAQs)
  .post(protect, createFAQ);

router.route('/:id')
  .get(getFAQById)
  .put(protect, updateFAQ)
  .delete(protect, deleteFAQ);

module.exports = router;
