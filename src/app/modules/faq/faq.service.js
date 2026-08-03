import FAQ from './faq.model.js';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const getFAQs = async (query) => {
  const faqQuery = new QueryBuilder(FAQ.find(), query)
    .search(['question', 'answer'])
    .filter()
    .sort()
    .paginate()
    .fields();
  return await faqQuery.modelQuery;
};

const getFAQById = async (id) => {
  const item = await FAQ.findById(id);
  if (!item) {
    throw new AppError(404, 'FAQ not found');
  }
  return item;
};

const createFAQ = async (payload) => {
  return await FAQ.create(payload);
};

const updateFAQ = async (id, payload) => {
  const item = await FAQ.findByIdAndUpdate(id, payload, { new: true });
  if (!item) {
    throw new AppError(404, 'FAQ not found');
  }
  return item;
};

const deleteFAQ = async (id) => {
  const item = await FAQ.findById(id);
  if (!item) {
    throw new AppError(404, 'FAQ not found');
  }
  await item.deleteOne();
  return item;
};

export const FAQService = {
  getFAQs,
  getFAQById,
  createFAQ,
  updateFAQ,
  deleteFAQ
};
