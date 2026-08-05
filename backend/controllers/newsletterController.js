const Newsletter = require('../models/Newsletter');

let mockSubscribers = [
  {
    _id: 'sub_1',
    email: 'client@textilefactory.com',
    createdAt: new Date().toISOString(),
  },
];

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter
// @access  Public
const subscribeNewsletter = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes('@')) {
      return res.status(400).json({ success: false, message: 'Please provide a valid email address' });
    }

    try {
      const existing = await Newsletter.findOne({ email });
      if (existing) {
        return res.status(400).json({ success: false, message: 'This email is already subscribed to our newsletter' });
      }

      const subscriber = await Newsletter.create({ email });
      return res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to Sri Sastha Textile Engineering updates!',
        data: subscriber,
      });
    } catch (dbErr) {
      if (mockSubscribers.some((s) => s.email === email)) {
        return res.status(400).json({ success: false, message: 'This email is already subscribed!' });
      }

      const sub = { _id: 'sub_' + Date.now(), email, createdAt: new Date().toISOString() };
      mockSubscribers.unshift(sub);

      return res.status(201).json({
        success: true,
        message: 'Thank you for subscribing to Sri Sastha Textile Engineering updates!',
        data: sub,
      });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all newsletter subscribers
// @route   GET /api/newsletter
// @access  Private (Admin)
const getSubscribers = async (req, res) => {
  try {
    let subscribers;
    try {
      subscribers = await Newsletter.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      subscribers = mockSubscribers;
    }

    res.json({
      success: true,
      count: subscribers.length,
      data: subscribers,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { subscribeNewsletter, getSubscribers };
