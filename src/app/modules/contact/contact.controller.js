import { ContactService } from './contact.service.js';

const createContact = async (req, res) => {
  const contact = await ContactService.createContact(req.body);
  res.status(201).json(contact);
};

const getContacts = async (req, res) => {
  const contacts = await ContactService.getContacts();
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await ContactService.getContactById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const contact = await ContactService.deleteContact(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json({ id: req.params.id });
};

export { 
  createContact,
  getContacts,
  getContactById,
  deleteContact
};
