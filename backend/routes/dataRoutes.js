const express = require('express');
const { getServices, getExpertise, getStats, getTeam, getFaqs } = require('../controllers/dataController');

const router = express.Router();

router.get('/services', getServices);
router.get('/expertise', getExpertise);
router.get('/stats', getStats);
router.get('/team', getTeam);
router.get('/faqs', getFaqs);

module.exports = router;
