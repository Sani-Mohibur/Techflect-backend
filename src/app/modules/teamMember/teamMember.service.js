import TeamMember from './teamMember.model.js';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const getTeamMembers = async (query) => {
  const teamMemberQuery = new QueryBuilder(TeamMember.find(), query)
    .search(['name', 'jobTitle'])
    .filter()
    .sort()
    .paginate()
    .fields();
  return await teamMemberQuery.modelQuery;
};

const getTeamMemberById = async (id) => {
  const item = await TeamMember.findById(id);
  if (!item) {
    throw new AppError(404, 'TeamMember not found');
  }
  return item;
};

const createTeamMember = async (payload) => {
  return await TeamMember.create(payload);
};

const updateTeamMember = async (id, payload) => {
  const item = await TeamMember.findByIdAndUpdate(id, payload, { new: true });
  if (!item) {
    throw new AppError(404, 'TeamMember not found');
  }
  return item;
};

const deleteTeamMember = async (id) => {
  const item = await TeamMember.findById(id);
  if (!item) {
    throw new AppError(404, 'TeamMember not found');
  }
  await item.deleteOne();
  return item;
};

export const TeamMemberService = {
  getTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember
};
