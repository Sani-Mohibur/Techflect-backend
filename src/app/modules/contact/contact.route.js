import express from 'express';
const router = express.Router();
import { createContact, getContacts, getContactById, deleteContact  } from './contact.controller.js';
import { protect  } from '../../middleware/auth.js';

router.route('/')
  .post(createContact)
  .get(protect, getContacts);

router.route('/:id')
  .get(protect, getContactById)
  .delete(protect, deleteContact);

export default router;