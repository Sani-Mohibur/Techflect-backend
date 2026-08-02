const Service = require('./service.model');

const getServices = async (req, res) => {
  const items = await Service.find();
  res.status(200).json(items);
};

const getServiceById = async (req, res) => {
  const item = await Service.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Service not found'); }
  res.status(200).json(item);
};

const createService = async (req, res) => {
  const item = await Service.create(req.body);
  res.status(201).json(item);
};

const updateService = async (req, res) => {
  const item = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('Service not found'); }
  res.status(200).json(item);
};

const deleteService = async (req, res) => {
  const item = await Service.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('Service not found'); }
  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
};

module.exports = { getServices, getServiceById, createService, updateService, deleteService };
