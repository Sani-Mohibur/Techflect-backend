import User from './user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import QueryBuilder from '../../builder/QueryBuilder.js';
import AppError from '../../errors/AppError.js';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const loginAdmin = async (email, password) => {
  const user = await User.findOne({ email });

  if (user && (await bcrypt.compare(password, user.password))) {
    if (user.isBlocked) {
      throw new AppError(403, 'Not authorized, user is blocked');
    }
    return {
      _id: user.id,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
      token: generateToken(user.id),
    };
  } else {
    throw new AppError(401, 'Invalid email or password');
  }
};

const getUsers = async (query) => {
  const userQuery = new QueryBuilder(User.find().select('-password'), query)
    .search(['email'])
    .filter()
    .sort()
    .paginate()
    .fields();
  return await userQuery.modelQuery;
};

const createUser = async (payload) => {
  const { email, password, role } = payload;
  const userExists = await User.findOne({ email });
  if (userExists) {
    throw new AppError(400, 'User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    email,
    password: hashedPassword,
    role: role || 'moderator',
  });

  if (user) {
    return {
      _id: user.id,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    };
  } else {
    throw new AppError(400, 'Invalid user data');
  }
};

const updateUser = async (id, payload) => {
  const user = await User.findById(id);

  if (user) {
    user.email = payload.email || user.email;
    if (payload.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(payload.password, salt);
    }
    if (payload.role) {
      user.role = payload.role;
    }

    const updatedUser = await user.save();
    return {
      _id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      isBlocked: updatedUser.isBlocked,
    };
  } else {
    throw new AppError(404, 'User not found');
  }
};

const deleteUser = async (id) => {
  const user = await User.findById(id);

  if (user) {
    await User.deleteOne({ _id: user._id });
    return { message: 'User removed' };
  } else {
    throw new AppError(404, 'User not found');
  }
};

const toggleBlockUser = async (id) => {
  const user = await User.findById(id);

  if (user) {
    user.isBlocked = !user.isBlocked;
    const updatedUser = await user.save();
    return {
      _id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      isBlocked: updatedUser.isBlocked,
    };
  } else {
    throw new AppError(404, 'User not found');
  }
};

export const AuthService = {
  loginAdmin,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  toggleBlockUser,
};
