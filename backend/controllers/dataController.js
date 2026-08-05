const Service = require('../models/Service');
const Stat = require('../models/Stat');
const TeamMember = require('../models/TeamMember');
const FAQ = require('../models/FAQ');
const { initialServices, initialExpertise, initialStats, initialTeam, initialFaqs } = require('../utils/seedData');

// @desc    Get all core services
// @route   GET /api/services
// @access  Public
const getServices = async (req, res) => {
  try {
    let services;
    try {
      services = await Service.find({ category: 'core' });
      if (!services || services.length === 0) services = initialServices;
    } catch (dbErr) {
      services = initialServices;
    }

    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get expertise list
// @route   GET /api/expertise
// @access  Public
const getExpertise = async (req, res) => {
  try {
    let items;
    try {
      items = await Service.find({ category: 'expertise' });
      if (!items || items.length === 0) items = initialExpertise;
    } catch (dbErr) {
      items = initialExpertise;
    }

    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get stats
// @route   GET /api/stats
// @access  Public
const getStats = async (req, res) => {
  try {
    let stats;
    try {
      stats = await Stat.find();
      if (!stats || stats.length === 0) stats = initialStats;
    } catch (dbErr) {
      stats = initialStats;
    }

    res.json({ success: true, data: stats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get team members
// @route   GET /api/team
// @access  Public
const getTeam = async (req, res) => {
  try {
    let team;
    try {
      team = await TeamMember.find();
      if (!team || team.length === 0) team = initialTeam;
    } catch (dbErr) {
      team = initialTeam;
    }

    res.json({ success: true, data: team });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get FAQs
// @route   GET /api/faqs
// @access  Public
const getFaqs = async (req, res) => {
  try {
    let faqs;
    try {
      faqs = await FAQ.find().sort({ order: 1 });
      if (!faqs || faqs.length === 0) faqs = initialFaqs;
    } catch (dbErr) {
      faqs = initialFaqs;
    }

    res.json({ success: true, data: faqs });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getServices, getExpertise, getStats, getTeam, getFaqs };
