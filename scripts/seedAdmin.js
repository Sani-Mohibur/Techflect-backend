require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../src/modules/auth/admin.model');
const connectDB = require('../src/config/db');

const seedAdmin = async () => {
  try {
    await connectDB();
    
    const existingAdmin = await Admin.findOne({ email: process.env.EMAIL_USER });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);
    
    await Admin.create({
      email: process.env.EMAIL_USER,
      password: hashedPassword
    });
    
    console.log(`Admin user seeded successfully with email: ${process.env.EMAIL_USER} and password: admin123`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
