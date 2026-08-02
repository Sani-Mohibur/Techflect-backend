const FAQ = require('./faq.model');

const getFAQs = async (req, res) => {
  const items = await FAQ.find();
  res.status(200).json(items);
};

const getFAQById = async (req, res) => {
  const item = await FAQ.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('FAQ not found'); }
  res.status(200).json(item);
};

const createFAQ = async (req, res) => {
  const item = await FAQ.create(req.body);
  res.status(201).json(item);
};

const updateFAQ = async (req, res) => {
  const item = await FAQ.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('FAQ not found'); }
  res.status(200).json(item);
};

const deleteFAQ = async (req, res) => {
  const item = await FAQ.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('FAQ not found'); }
  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
};

module.exports = { getFAQs, getFAQById, createFAQ, updateFAQ, deleteFAQ };
