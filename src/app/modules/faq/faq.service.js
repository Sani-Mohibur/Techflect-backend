import FAQ from './faq.model.js';

const getFAQs = async () => {
  return await FAQ.find();
};

const getFAQById = async (id) => {
  return await FAQ.findById(id);
};

const createFAQ = async (payload) => {
  return await FAQ.create(payload);
};

const updateFAQ = async (id, payload) => {
  return await FAQ.findByIdAndUpdate(id, payload, { new: true });
};

const deleteFAQ = async (id) => {
  const item = await FAQ.findById(id);
  if (item) {
    await item.deleteOne();
  }
  return item;
};

export const FAQService = {
  getFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ
};
