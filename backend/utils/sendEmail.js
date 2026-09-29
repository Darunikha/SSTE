const nodemailer = require('nodemailer');

/**
 * Send an email notification
 * @param {Object} options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML content of the email
 * @param {string} [options.text] - Plain text content fallback
 */
const sendEmail = async (options) => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    console.warn('⚠️ SMTP credentials (SMTP_USER / SMTP_PASS) are not set in .env. Skipping actual email dispatch.');
    return { success: false, message: 'SMTP credentials missing' };
  }

  // Create transporter
  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: false, // STARTTLS on port 587
    auth: {
      user,
      pass,
    },
  });

  const mailOptions = {
    from: process.env.FROM_EMAIL || '"Sri Sastha Textile Engineering" <srisastha.textile@gmail.com>',
    to: options.to || process.env.NOTIFICATION_EMAIL || user,
    subject: options.subject,
    text: options.text,
    html: options.html,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`✉️ Email notification sent successfully to ${mailOptions.to}: ${info.messageId}`);
  console.log('Sent to:', mailOptions.to);
  return { success: true, messageId: info.messageId };
};

module.exports = sendEmail;
