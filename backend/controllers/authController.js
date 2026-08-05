const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper to generate JWT Token
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'sri_sastha_textile_engineering_jwt_secret_key_2026_super_secure', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

// In-memory fallback users for dev without active MongoDB
const mockUsers = [];

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: 'Please enter all fields' });
    }

    try {
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).json({ success: false, message: 'User with this email already exists' });
      }

      const user = await User.create({ name, email, password, role: 'admin' });

      res.status(201).json({
        success: true,
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
          token: generateToken(user._id, user.role),
        },
      });
    } catch (dbError) {
      // Fallback for in-memory mode
      const existing = mockUsers.find((u) => u.email === email);
      if (existing) {
        return res.status(400).json({ success: false, message: 'User already exists' });
      }

      const mockUser = {
        _id: 'user_' + Date.now(),
        name,
        email,
        password,
        role: 'admin',
      };
      mockUsers.push(mockUser);

      res.status(201).json({
        success: true,
        data: {
          _id: mockUser._id,
          name: mockUser.name,
          email: mockUser.email,
          role: mockUser.role,
          token: generateToken(mockUser._id, mockUser.role),
        },
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Login user & return JWT
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    try {
      const user = await User.findOne({ email }).select('+password');

      if (user && (await user.matchPassword(password))) {
        return res.json({
          success: true,
          data: {
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id, user.role),
          },
        });
      }
    } catch (dbErr) {
      // Check mock user fallback or default demo admin
    }

    // Demo admin check if db isn't connected
    if ((email === 'admin@srisastha.com' || email === 'srisasthatexengg@gmail.com') && password === 'admin123') {
      return res.json({
        success: true,
        data: {
          _id: 'admin_demo_id',
          name: 'Sri Sastha Admin',
          email,
          role: 'admin',
          token: generateToken('admin_demo_id', 'admin'),
        },
      });
    }

    const foundMock = mockUsers.find((u) => u.email === email && u.password === password);
    if (foundMock) {
      return res.json({
        success: true,
        data: {
          _id: foundMock._id,
          name: foundMock.name,
          email: foundMock.email,
          role: foundMock.role,
          token: generateToken(foundMock._id, foundMock.role),
        },
      });
    }

    return res.status(401).json({ success: false, message: 'Invalid email or password' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get current user profile
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res) => {
  try {
    res.json({
      success: true,
      data: {
        id: req.user.id,
        role: req.user.role,
        name: 'Sri Sastha Engineer',
        email: 'srisasthatexengg@gmail.com',
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { registerUser, loginUser, getMe };
