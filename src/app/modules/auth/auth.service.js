import Admin from './admin.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const loginAdmin = async (email, password) => {
  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    if (admin.isBlocked) {
      return { error: 'Not authorized, user is blocked', status: 403 };
    }
    return {
      _id: admin.id,
      email: admin.email,
      role: admin.role,
      isBlocked: admin.isBlocked,
      token: generateToken(admin.id),
    };
  } else {
    return { error: 'Invalid email or password', status: 401 };
  }
};

const getUsers = async () => {
  return await Admin.find({}).select('-password');
};

const createUser = async (payload) => {
  const { email, password, role } = payload;
  const userExists = await Admin.findOne({ email });
  if (userExists) {
    return { error: 'User already exists', status: 400 };
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Admin.create({
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
    return { error: 'Invalid user data', status: 400 };
  }
};

const updateUser = async (id, payload) => {
  const user = await Admin.findById(id);

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
    return { error: 'User not found', status: 404 };
  }
};

const deleteUser = async (id) => {
  const user = await Admin.findById(id);

  if (user) {
    await Admin.deleteOne({ _id: user._id });
    return { message: 'User removed' };
  } else {
    return { error: 'User not found', status: 404 };
  }
};

const toggleBlockUser = async (id) => {
  const user = await Admin.findById(id);

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
    return { error: 'User not found', status: 404 };
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
