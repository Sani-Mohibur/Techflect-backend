import { TeamMemberService } from './teamMember.service.js';

const getTeamMembers = async (req, res) => {
  const items = await TeamMemberService.getTeamMembers();
  res.status(200).json(items);
};

const getTeamMemberById = async (req, res) => {
  const item = await TeamMemberService.getTeamMemberById(req.params.id);
  if (!item) { res.status(404); throw new Error('TeamMember not found'); }
  res.status(200).json(item);
};

const createTeamMember = async (req, res) => {
  const item = await TeamMemberService.createTeamMember(req.body);
  res.status(201).json(item);
};

const updateTeamMember = async (req, res) => {
  const item = await TeamMemberService.updateTeamMember(req.params.id, req.body);
  if (!item) { res.status(404); throw new Error('TeamMember not found'); }
  res.status(200).json(item);
};

const deleteTeamMember = async (req, res) => {
  const item = await TeamMemberService.deleteTeamMember(req.params.id);
  if (!item) { res.status(404); throw new Error('TeamMember not found'); }
  res.status(200).json({ id: req.params.id });
};

export { getTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember };
