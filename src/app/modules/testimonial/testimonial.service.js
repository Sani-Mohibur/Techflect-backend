import Testimonial from './testimonial.model.js';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const getTestimonials = async (query) => {
  const testimonialQuery = new QueryBuilder(Testimonial.find(), query)
    .search(['name', 'designation', 'message'])
    .filter()
    .sort()
    .paginate()
    .fields();
  return await testimonialQuery.modelQuery;
};

const getTestimonialById = async (id) => {
  const item = await Testimonial.findById(id);
  if (!item) {
    throw new AppError(404, 'Testimonial not found');
  }
  return item;
};

const createTestimonial = async (payload) => {
  return await Testimonial.create(payload);
};

const updateTestimonial = async (id, payload) => {
  const item = await Testimonial.findByIdAndUpdate(id, payload, { new: true });
  if (!item) {
    throw new AppError(404, 'Testimonial not found');
  }
  return item;
};

const deleteTestimonial = async (id) => {
  const item = await Testimonial.findById(id);
  if (!item) {
    throw new AppError(404, 'Testimonial not found');
  }
  await item.deleteOne();
  return item;
};

export const TestimonialService = {
  getTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial
};
