import Service from './service.model.js';

const getServices = async () => {
  return await Service.find();
};

const getServiceById = async (id) => {
  return await Service.findById(id);
};

const createService = async (payload) => {
  return await Service.create(payload);
};

const updateService = async (id, payload) => {
  return await Service.findByIdAndUpdate(id, payload, { new: true });
};

const deleteService = async (id) => {
  const item = await Service.findById(id);
  if (item) {
    await item.deleteOne();
  }
  return item;
};

export const ServiceService = {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
};
