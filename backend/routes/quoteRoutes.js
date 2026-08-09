const express = require('express');
const { createQuote } = require('../controllers/quoteController');

const router = express.Router();

router.post('/', createQuote);

module.exports = router;
