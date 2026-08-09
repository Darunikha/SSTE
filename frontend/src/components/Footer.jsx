import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const goToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div className="footer-brand">
          <span className="brand-name">Sri Sastha Textile Engineering</span>
          <p>Coimbatore, Tamil Nadu, India</p>
          <p><a href="tel:+918754022322">+91 87540 22322</a></p>
          <p><a href="mailto:srisasthatexengg@gmail.com">srisasthatexengg@gmail.com</a></p>
          <span className="footer-support-tag">24/7 Technical Support</span>
        </div>

        <div className="footer-col">
          <h4>Services</h4>
          <ul>
            <li><button onClick={() => goToSection('services')}>Spare Parts</button></li>
            <li><button onClick={() => goToSection('services')}>Electronic Servicing</button></li>
            <li><button onClick={() => goToSection('services')}>HMI Conversions</button></li>
            <li><button onClick={() => goToSection('services')}>Automation Solutions</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Company</h4>
          <ul>
            <li><button onClick={() => goToSection('expertise')}>Our Expertise</button></li>
            <li><button onClick={() => goToSection('industries')}>Industries</button></li>
            <li><button onClick={() => goToSection('about')}>Meet Our Team</button></li>
            <li><button onClick={() => goToSection('faq')}>FAQ</button></li>
            <li><button onClick={() => goToSection('contact')}>Contact</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>
      </div>
      <div className="container footer-bottom">
        <p>&copy; 2026 Sri Sastha Textile Engineering. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
