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

    // Send emails in the background so a slow/blocked SMTP server never delays the response
    (async () => {
      // 1. Send Admin Notification Email
      try {
        await sendEmail({
          to: process.env.NOTIFICATION_EMAIL || 'sales@sasthatextile.com',
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
        console.error('Failed to send admin notification email:', emailErr.message);
      }

      // 2. Send Client Confirmation Email (Receipt to user who submitted)
      if (email) {
        try {
          await sendEmail({
            to: email,
            subject: `Thank you for contacting Sri Sastha Textile Engineering`,
            html: `
              <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; line-height: 1.6;">
                <h2 style="color: #0284c7; border-bottom: 2px solid #0284c7; padding-bottom: 10px;">Quote Request Confirmation</h2>
                <p>Dear ${name},</p>
                <p>Thank you for reaching out to <strong>Sri Sastha Textile Engineering</strong>. We have received your request regarding <strong>${service}</strong>.</p>
                <p>Our engineering team will review your requirements and get back to you within 24 hours.</p>
                <br/>
                <div style="background-color: #f3f4f6; padding: 15px; border-radius: 8px;">
                  <h4 style="margin-top: 0; color: #374151;">Summary of your submission:</h4>
                  <p style="margin: 4px 0;"><strong>Service:</strong> ${service}</p>
                  <p style="margin: 4px 0;"><strong>Message:</strong> ${message || 'N/A'}</p>
                </div>
                <br/>
                <p>Best regards,<br/><strong>Sri Sastha Textile Engineering Team</strong><br/><a href="mailto:sales@sasthatextile.com">sales@sasthatextile.com</a></p>
              </div>
            `,
          });
        } catch (emailErr) {
          console.error('Failed to send client confirmation email:', emailErr.message);
        }
      }
    })();

    res.status(201).json({
      success: true,
      message: 'Quote request submitted successfully! Our team will contact you within 24 hours.',
      data: quote,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { createQuote };
