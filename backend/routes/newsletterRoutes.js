const express = require('express');
const { subscribeNewsletter, getSubscribers } = require('../controllers/newsletterController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', subscribeNewsletter);
router.get('/', protect, getSubscribers);

module.exports = router;
