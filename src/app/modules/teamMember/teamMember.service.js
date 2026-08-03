import TeamMember from './teamMember.model.js';

const getTeamMembers = async () => {
  return await TeamMember.find();
};

const getTeamMemberById = async (id) => {
  return await TeamMember.findById(id);
};

const createTeamMember = async (payload) => {
  return await TeamMember.create(payload);
};

const updateTeamMember = async (id, payload) => {
  return await TeamMember.findByIdAndUpdate(id, payload, { new: true });
};

const deleteTeamMember = async (id) => {
  const item = await TeamMember.findById(id);
  if (item) {
    await item.deleteOne();
  }
  return item;
};

export const TeamMemberService = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};
