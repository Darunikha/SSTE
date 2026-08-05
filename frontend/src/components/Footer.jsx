import React from 'react';

const Footer = () => {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-section">
          <h4>About Sri Sastha</h4>
          <p>
            Located in Coimbatore, Tamil Nadu, we've been delivering precision engineering solutions to textile manufacturers for decades. We're committed to quality, reliability, and customer success.
          </p>
        </div>
        <div className="footer-section">
          <h4>Services</h4>
          <ul>
            <li><a href="#services">Spare Parts</a></li>
            <li><a href="#services">Electronic Servicing</a></li>
            <li><a href="#services">HMI Conversions</a></li>
            <li><a href="#services">Automation Solutions</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#expertise">Our Expertise</a></li>
            <li><a href="#team">Meet Our Team</a></li>
            <li><a href="#faq">FAQ</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Contact Info</h4>
          <p>📍 Coimbatore, Tamil Nadu, India</p>
          <p>📞 +91 87540 22322</p>
          <p>📧 srisasthatexengg@gmail.com</p>
          <p>🕒 24/7 Technical Support Available</p>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          &copy; 2026 Sri Sastha Textile Engineering. All rights reserved. |{' '}
          <a href="#" style={{ color: 'inherit' }}>Privacy Policy</a> |{' '}
          <a href="#" style={{ color: 'inherit' }}>Terms of Service</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
