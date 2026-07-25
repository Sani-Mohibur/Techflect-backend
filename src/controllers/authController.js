const Admin = require('../models/Admin');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const loginAdmin = async (req, res) => {
  const { email, password } = req.body;

  const admin = await Admin.findOne({ email });

  if (admin && (await bcrypt.compare(password, admin.password))) {
    res.json({
      _id: admin.id,
      email: admin.email,
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

module.exports = {
  loginAdmin,
  getMe,
};
