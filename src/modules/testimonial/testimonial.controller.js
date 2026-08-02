const Testimonial = require('./testimonial.model');

const getTestimonials = async (req, res) => {
  const items = await Testimonial.find();
  res.status(200).json(items);
};

const getTestimonialById = async (req, res) => {
  const item = await Testimonial.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Testimonial not found'); }
  res.status(200).json(item);
};

const createTestimonial = async (req, res) => {
  const item = await Testimonial.create(req.body);
  res.status(201).json(item);
};

const updateTestimonial = async (req, res) => {
  const item = await Testimonial.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('Testimonial not found'); }
  res.status(200).json(item);
};

const deleteTestimonial = async (req, res) => {
  const item = await Testimonial.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Testimonial not found'); }
  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
};

module.exports = { getTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
