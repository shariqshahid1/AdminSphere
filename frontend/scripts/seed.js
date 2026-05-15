const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

// Load env from .env.local in frontend
dotenv.config({ path: path.join(__dirname, '../.env.local') });

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Manager'], default: 'Manager' },
  createdAt: { type: Date, default: Date.now }
});

// Avoid re-defining the model if it exists
const User = mongoose.models.User || mongoose.model('User', UserSchema);

const seedAdmin = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI not found in .env.local');
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('MongoDB Connected for seeding...');

    const adminEmail = 'admin@example.com';
    const adminExists = await User.findOne({ email: adminEmail });
    
    if (adminExists) {
      console.log('Admin already exists!');
      process.exit();
    }

    // We don't have the bcrypt middleware here, but for a seed script 
    // it's better to hash it manually or just let the model handle it if we imported it.
    // To keep it simple and standalone:
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    await User.create({
      name: 'Super Admin',
      email: adminEmail,
      password: hashedPassword,
      role: 'Admin'
    });

    console.log('Admin user created successfully!');
    console.log(`Email: ${adminEmail}`);
    console.log('Password: password123');
    process.exit();
  } catch (err) {
    console.error('Error seeding database:', err.message);
    process.exit(1);
  }
};

seedAdmin();
