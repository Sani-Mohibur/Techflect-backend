import Admin from './admin.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    if (admin.isBlocked) {
      res.status(403);
      throw new Error('Not authorized, user is blocked');
    }
    res.json({
      _id: admin.id,
      email: admin.email,
      role: admin.role,
      isBlocked: admin.isBlocked,
      token: generateToken(admin.id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid email or password');
  }
};

const getMe = async (req, res) => {
  res.status(200).json(req.admin);
};

const getUsers = async (req, res) => {
  const users = await Admin.find({}).select('-password');
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { email, password, role } = req.body;

  const userExists = await Admin.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error('User already exists');
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await Admin.create({
    email,
    password: hashedPassword,
    role: role || 'moderator',
  });

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
      role: user.role,
      isBlocked: user.isBlocked,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

const updateUser = async (req, res) => {
  const user = await Admin.findById(req.params.id);

  if (user) {
    user.email = req.body.email || user.email;
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }
    // Only update role if it's explicitly provided
    if (req.body.role) {
      user.role = req.body.role;
    }

    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      isBlocked: updatedUser.isBlocked,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const deleteUser = async (req, res) => {
  const user = await Admin.findById(req.params.id);

  if (user) {
    await Admin.deleteOne({ _id: user._id });
    res.status(200).json({ message: 'User removed' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
};

const toggleBlockUser = async (req, res) => {
  const user = await Admin.findById(req.params.id);

  if (user) {
    user.isBlocked = !user.isBlocked;
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser.id,
      email: updatedUser.email,
      role: updatedUser.role,
      isBlocked: updatedUser.isBlocked,
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
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
