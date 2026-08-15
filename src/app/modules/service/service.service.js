import Service from './service.model.js';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const getServices = async (query) => {
  const serviceQuery = new QueryBuilder(Service.find(), query)
    .search(['title', 'description'])
    .filter()
    .sort()
    .paginate()
    .fields();
  return await serviceQuery.modelQuery;
};

const getServiceById = async (id) => {
  const item = await Service.findById(id);
  if (!item) {
    throw new AppError(404, 'Service not found');
  }
  return item;
};

const createService = async (payload) => {
  return await Service.create(payload);
};

const updateService = async (id, payload) => {
  const item = await Service.findByIdAndUpdate(id, payload, { new: true });
  if (!item) {
    throw new AppError(404, 'Service not found');
  }
  return item;
};

const deleteService = async (id) => {
  const item = await Service.findById(id);
  if (!item) {
    throw new AppError(404, 'Service not found');
  }
  if (item.isMock) {
    throw new AppError(403, 'Mock data cannot be deleted');
  }
  await item.deleteOne();
  return item;
};

export const ServiceService = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
