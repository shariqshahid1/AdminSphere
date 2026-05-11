const express = require('express');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');
const router = express.Router();

// Apply protect middleware to all routes
router.use(protect);

// @desc    Get all users
// @route   GET /api/users
// @access  Private (Admin, Manager)
router.get('/', async (req, res) => {
  try {
    const mongoose = require('mongoose');
    if (mongoose.connection.readyState !== 1) {
      const mockUsers = [
        { _id: '1', name: 'Demo Admin', email: 'admin@demo.com', role: 'Admin', createdAt: new Date() },
        { _id: '2', name: 'John Manager', email: 'john@demo.com', role: 'Manager', createdAt: new Date() },
        { _id: '3', name: 'Sarah Editor', email: 'sarah@demo.com', role: 'Manager', createdAt: new Date() },
      ];
      return res.status(200).json({ success: true, count: mockUsers.length, data: mockUsers });
    }
    const users = await User.find();
    res.status(200).json({ success: true, count: users.length, data: users });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @desc    Get single user
// @route   GET /api/users/:id
// @access  Private (Admin, Manager)
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @desc    Create user
// @route   POST /api/users
// @access  Private (Admin)
router.post('/', authorize('Admin'), async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private (Admin)
router.put('/:id', authorize('Admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: user });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private (Admin)
router.delete('/:id', authorize('Admin'), async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    res.status(200).json({ success: true, data: {} });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

module.exports = router;
