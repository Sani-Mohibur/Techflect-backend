import { TestimonialService } from './testimonial.service.js';

const getTestimonials = async (req, res) => {
  const items = await TestimonialService.getTestimonials();
  res.status(200).json(items);
};

const getTestimonialById = async (req, res) => {
  const item = await TestimonialService.getTestimonialById(req.params.id);
  if (!item) { res.status(404); throw new Error('Testimonial not found'); }
  res.status(200).json(item);
};

const createTestimonial = async (req, res) => {
  const item = await TestimonialService.createTestimonial(req.body);
  res.status(201).json(item);
};

const updateTestimonial = async (req, res) => {
  const item = await TestimonialService.updateTestimonial(req.params.id, req.body);
  if (!item) { res.status(404); throw new Error('Testimonial not found'); }
  res.status(200).json(item);
};

const deleteTestimonial = async (req, res) => {
  const item = await TestimonialService.deleteTestimonial(req.params.id);
  if (!item) { res.status(404); throw new Error('Testimonial not found'); }
  res.status(200).json({ id: req.params.id });
};

export { getTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial };
