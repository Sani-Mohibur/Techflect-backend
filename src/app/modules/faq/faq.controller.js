import { FAQService } from './faq.service.js';

const getFAQs = async (req, res) => {
  const items = await FAQService.getFAQs();
  res.status(200).json(items);
};

const getFAQById = async (req, res) => {
  const item = await FAQService.getFAQById(req.params.id);
  if (!item) { res.status(404); throw new Error('FAQ not found'); }
  res.status(200).json(item);
};

const createFAQ = async (req, res) => {
  const item = await FAQService.createFAQ(req.body);
  res.status(201).json(item);
};

const updateFAQ = async (req, res) => {
  const item = await FAQService.updateFAQ(req.params.id, req.body);
  if (!item) { res.status(404); throw new Error('FAQ not found'); }
  res.status(200).json(item);
};

const deleteFAQ = async (req, res) => {
  const item = await FAQService.deleteFAQ(req.params.id);
  if (!item) { res.status(404); throw new Error('FAQ not found'); }
  res.status(200).json({ id: req.params.id });
};

export { getFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ };
