const express = require('express');
const router = express.Router();
const { createContact, getContacts, getContactById, deleteContact } = require('../controllers/contactController');
const { protect } = require('../middleware/authMiddleware');

router.route('/')
  .post(createContact)
  .get(protect, getContacts);

router.route('/:id')
  .get(protect, getContactById)
  .delete(protect, deleteContact);

module.exports = router;
