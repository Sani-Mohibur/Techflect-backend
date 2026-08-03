import { ServiceService } from './service.service.js';

const getServices = async (req, res) => {
  const items = await ServiceService.getServices();
  res.status(200).json(items);
};

const getServiceById = async (req, res) => {
  const item = await ServiceService.getServiceById(req.params.id);
  if (!item) { res.status(404); throw new Error('Service not found'); }
  res.status(200).json(item);
};

const createService = async (req, res) => {
  const item = await ServiceService.createService(req.body);
  res.status(201).json(item);
};

const updateService = async (req, res) => {
  const item = await ServiceService.updateService(req.params.id, req.body);
  if (!item) { res.status(404); throw new Error('Service not found'); }
  res.status(200).json(item);
};

const deleteService = async (req, res) => {
  const item = await ServiceService.deleteService(req.params.id);
  if (!item) { res.status(404); throw new Error('Service not found'); }
  res.status(200).json({ id: req.params.id });
};

export { getServices, getServiceById, createService, updateService, deleteService };
