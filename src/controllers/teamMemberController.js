const TeamMember = require('../models/TeamMember');

const getTeamMembers = async (req, res) => {
  const items = await TeamMember.find();
  res.status(200).json(items);
};

const getTeamMemberById = async (req, res) => {
  const item = await TeamMember.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('TeamMember not found'); }
  res.status(200).json(item);
};

const createTeamMember = async (req, res) => {
  const item = await TeamMember.create(req.body);
  res.status(201).json(item);
};

const updateTeamMember = async (req, res) => {
  const item = await TeamMember.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!item) { res.status(404); throw new Error('TeamMember not found'); }
  res.status(200).json(item);
};

const deleteTeamMember = async (req, res) => {
  const item = await TeamMember.findById(req.params.id);
  if (!item) { res.status(404); throw new Error('TeamMember not found'); }
  await item.deleteOne();
  res.status(200).json({ id: req.params.id });
};

module.exports = { getTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember };
