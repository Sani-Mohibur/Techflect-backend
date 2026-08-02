import Contact from './contact.model.js';
import sendEmail from '../../utils/emailService.js';

const createContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  const contact = await Contact.create({
    name,
    email,
    subject,
    message
  });

  try {
    await sendEmail({
      email: process.env.EMAIL_USER, // send to admin
      subject: `New Contact Submission: ${subject || 'No Subject'}`,
      message: `You have received a new contact submission.\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `<h3>New Contact Submission</h3>
             <p><strong>Name:</strong> ${name}</p>
             <p><strong>Email:</strong> ${email}</p>
             <p><strong>Subject:</strong> ${subject}</p>
             <p><strong>Message:</strong><br/>${message}</p>`
    });
  } catch (error) {
    console.error('Error sending email:', error);
    // Even if email fails, we still saved it to the DB.
  }

  res.status(201).json(contact);
};

const getContacts = async (req, res) => {
  const contacts = await Contact.find().sort({ createdAt: -1 });
  res.status(200).json(contacts);
};

const getContactById = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  res.status(200).json(contact);
};

const deleteContact = async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error('Contact not found');
  }
  await contact.deleteOne();
  res.status(200).json({ id: req.params.id });
};

export { createContact,
  getContacts,
  getContactById,
  deleteContact
 };
