const express = require('express');
const { subscribeNewsletter } = require('../controllers/newsletterController');

const router = express.Router();

router.post('/', subscribeNewsletter);

module.exports = router;
