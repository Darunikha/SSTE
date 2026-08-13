const express = require('express');
const { getServices, getExpertise, getStats, getTeam, getFaqs, getCatalog } = require('../controllers/dataController');

const router = express.Router();

router.get('/services', getServices);
router.get('/expertise', getExpertise);
router.get('/stats', getStats);
router.get('/team', getTeam);
router.get('/faqs', getFaqs);
router.get('/catalog', getCatalog);

module.exports = router;
