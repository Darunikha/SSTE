const express = require('express');
const { createQuote, getQuotes, updateQuoteStatus, deleteQuote } = require('../controllers/quoteController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', createQuote);
router.get('/', protect, getQuotes);
router.put('/:id', protect, updateQuoteStatus);
router.delete('/:id', protect, deleteQuote);

module.exports = router;
