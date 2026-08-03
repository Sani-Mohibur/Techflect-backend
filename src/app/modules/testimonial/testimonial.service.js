import Testimonial from './testimonial.model.js';

const getTestimonials = async () => {
  return await Testimonial.find();
};

const getTestimonialById = async (id) => {
  return await Testimonial.findById(id);
};

const createTestimonial = async (payload) => {
  return await Testimonial.create(payload);
};

const updateTestimonial = async (id, payload) => {
  return await Testimonial.findByIdAndUpdate(id, payload, { new: true });
};

const deleteTestimonial = async (id) => {
  const item = await Testimonial.findById(id);
  if (item) {
    await item.deleteOne();
  }
  return item;
};

export const TestimonialService = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
