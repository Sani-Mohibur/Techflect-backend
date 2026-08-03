import { AuthService } from './auth.service.js';

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;
  const result = await AuthService.loginAdmin(email, password);

  if (result.error) {
    res.status(result.status);
    throw new Error(result.error);
  }

  res.json(result);
};

const getMe = async (req, res) => {
  res.status(200).json(req.admin);
};

const getUsers = async (req, res) => {
  const users = await AuthService.getUsers();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const result = await AuthService.createUser(req.body);
  
  if (result.error) {
    res.status(result.status);
    throw new Error(result.error);
  }

  res.status(201).json(result);
};

const updateUser = async (req, res) => {
  const result = await AuthService.updateUser(req.params.id, req.body);

  if (result.error) {
    res.status(result.status);
    throw new Error(result.error);
  }

  res.status(200).json(result);
};

const deleteUser = async (req, res) => {
  const result = await AuthService.deleteUser(req.params.id);

  if (result.error) {
    res.status(result.status);
    throw new Error(result.error);
  }

  res.status(200).json(result);
};

const toggleBlockUser = async (req, res) => {
  const result = await AuthService.toggleBlockUser(req.params.id);

  if (result.error) {
    res.status(result.status);
    throw new Error(result.error);
  }

  res.status(200).json(result);
};

export { 
  loginAdmin,
  getMe,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleBlockUser,
};
