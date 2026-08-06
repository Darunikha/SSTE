const Quote = require('../models/Quote');
const sendEmail = require('../utils/sendEmail');

// In-memory array fallback if MongoDB is not active
let mockQuotes = [
  {
    _id: 'q_1',
    name: 'Ramesh Kumar',
    email: 'ramesh@textilemills.com',
    service: 'Spare Parts',
    message: 'Inquiry regarding compact spinning suction components and gears.',
    status: 'Pending',
    createdAt: new Date().toISOString(),
  },
];

// @desc    Submit a quote request
// @route   POST /api/quotes
// @access  Public
const createQuote = async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    if (!name || !email || !service) {
      return res.status(400).json({ success: false, message: 'Please complete all required fields (Name, Email, Service Type)' });
    }

    let quote;
    try {
      quote = await Quote.create({ name, email, service, message });
    } catch (dbErr) {
      quote = {
        _id: 'q_' + Date.now(),
        name,
        email,
        service,
        message,
        status: 'Pending',
        createdAt: new Date().toISOString(),
      };
      mockQuotes.unshift(quote);
    }

    // Attempt to send email notification asynchronously
    try {
      await sendEmail({
        subject: `🚨 New Quote Request from ${name} - Sri Sastha Textile Engineering`,
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
            <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 10px;">New Service Request Received</h2>
            <p>You have received a new inquiry/quote request from your website:</p>
            <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
              <tr>
                <td style="padding: 8px; font-weight: bold; width: 120px;">Client Name:</td>
                <td style="padding: 8px;">${name}</td>
              </tr>
              <tr style="background-color: #f9fafb;">
                <td style="padding: 8px; font-weight: bold;">Client Email:</td>
                <td style="padding: 8px;"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Service Requested:</td>
                <td style="padding: 8px;">${service}</td>
              </tr>
              <tr style="background-color: #f9fafb;">
                <td style="padding: 8px; font-weight: bold;">Message:</td>
                <td style="padding: 8px;">${message || 'N/A'}</td>
              </tr>
              <tr>
                <td style="padding: 8px; font-weight: bold;">Date/Time:</td>
                <td style="padding: 8px;">${new Date().toLocaleString()}</td>
              </tr>
            </table>
            <br/>
            <p style="font-size: 12px; color: #6b7280;">This is an automated notification from Sri Sastha Textile Engineering Web Portal.</p>
          </div>
        `,
      });
    } catch (emailErr) {
      console.error('Failed to send notification email:', emailErr.message);
    }

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully! Our team will contact you within 24 hours.',
      data: quote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all quote requests
// @route   GET /api/quotes
// @access  Private (Admin)
const getQuotes = async (req, res) => {
  try {
    let quotes;
    try {
      quotes = await Quote.find().sort({ createdAt: -1 });
    } catch (dbErr) {
      quotes = mockQuotes;
    }

    res.json({
      success: true,
      count: quotes.length,
      data: quotes,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update quote status
// @route   PUT /api/quotes/:id
// @access  Private (Admin)
const updateQuoteStatus = async (req, res) => {
  try {
    const { status } = req.body;
    try {
      const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
      if (!quote) {
        return res.status(404).json({ success: false, message: 'Quote not found' });
      }
      return res.json({ success: true, data: quote });
    } catch (dbErr) {
      const item = mockQuotes.find((q) => q._id === req.params.id);
      if (item) {
        item.status = status;
        return res.json({ success: true, data: item });
      }
      return res.status(404).json({ success: false, message: 'Quote not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete a quote
// @route   DELETE /api/quotes/:id
// @access  Private (Admin)
const deleteQuote = async (req, res) => {
  try {
    try {
      await Quote.findByIdAndDelete(req.params.id);
    } catch (dbErr) {
      mockQuotes = mockQuotes.filter((q) => q._id !== req.params.id);
    }

    res.json({ success: true, message: 'Quote deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createQuote, getQuotes, updateQuoteStatus, deleteQuote };
