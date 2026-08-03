import Contact from './contact.model.js';
import sendEmail from '../../utils/emailService.js';

const createContact = async (payload) => {
  const { name, email, subject, message } = payload;
  
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
  }

  return contact;
};

const getContacts = async () => {
  return await Contact.find().sort({ createdAt: -1 });
};

const getContactById = async (id) => {
  return await Contact.findById(id);
};

const deleteContact = async (id) => {
  const contact = await Contact.findById(id);
  if (contact) {
    await contact.deleteOne();
  }
  return contact;
};

export const ContactService = {
  createContact,
  getContacts,
  getContactById,
  deleteContact
};
