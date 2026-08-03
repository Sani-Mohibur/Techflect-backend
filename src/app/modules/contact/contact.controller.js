import { ContactService } from './contact.service.js';
import catchAsync from '../../utils/catchAsync.js';
import sendResponse from '../../utils/sendResponse.js';
import pick from '../../utils/pick.js';

const createContact = catchAsync(async (req, res) => {
  const contact = await ContactService.createContact(req.body);
  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'Contact created successfully',
    data: contact,
  });
});

const getContacts = catchAsync(async (req, res) => {
  const filters = pick(req.query, ['searchTerm', 'sort', 'limit', 'page', 'fields', 'name', 'email']);
  const contacts = await ContactService.getContacts(filters);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contacts retrieved successfully',
    data: contacts,
  });
});

const getContactById = catchAsync(async (req, res) => {
  const contact = await ContactService.getContactById(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact retrieved successfully',
    data: contact,
  });
});

const deleteContact = catchAsync(async (req, res) => {
  const contact = await ContactService.deleteContact(req.params.id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Contact deleted successfully',
    data: contact,
  });
});

export { 
  createContact,
  getContacts,
  getContactById,
  deleteContact
};
