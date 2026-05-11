const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB Connected for seeding...');

    const adminExists = await User.findOne({ email: 'admin@example.com' });
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    await User.create({
      name: 'Super Admin',
      email: 'admin@example.com',
      password: 'password123',
      role: 'Admin'
    });

    console.log('Admin user created successfully!');
    console.log('Email: admin@example.com');
    console.log('Password: password123');
    process.exit();
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }
};

seedAdmin();
