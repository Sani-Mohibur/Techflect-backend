import dotenv from 'dotenv';
dotenv.config();
import bcrypt from 'bcryptjs';
import User from '../src/app/modules/auth/user.model.js';
import connectDB from '../src/app/config/db.js';

const seedAdmin = async () => {
  try {
    await connectDB();

    const existingAdmin = await User.findOne({ email: process.env.EMAIL_USER });
    if (existingAdmin) {
      console.log('Admin already exists');
      process.exit();
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      email: process.env.EMAIL_USER,
      password: hashedPassword,
      role: 'admin'
    });

    console.log(`Admin user seeded successfully with email: ${process.env.EMAIL_USER} and password: admin123`);
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
