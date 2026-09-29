import React from 'react';
import logoLight from '../assets/images/logo-light.svg';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const WHATSAPP = 'https://wa.me/918754022322';

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
          <img className="footer-logo" src={logoLight} alt="STE - Quality First" />
          <span className="brand-name">Sri Sastha Textile Engineering</span>
          <p>Coimbatore, Tamil Nadu, India</p>
          <p><a href="tel:+918754022322">+91 87540 22322</a></p>
          <p><a href="mailto:srisasthatexengg@gmail.com">srisasthatexengg@gmail.com</a></p>
          <span className="footer-support-tag">24/7 Technical Support</span>
          <div className="footer-social">
            <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <svg viewBox="0 0 24 24"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2zm5.2 14.2c-.2.6-1.300 1.200-1.800 1.200-.5.100-1 .2-3.300-.7-2.800-1.100-4.600-4-4.700-4.200-.1-.2-1.100-1.500-1.100-2.800s.7-2 1-2.300c.2-.3.500-.3.700-.3h.5c.2 0 .4 0 .6.500l.9 2.100c.1.200.1.400 0 .5l-.4.600c-.1.200-.3.300-.1.600.2.300.8 1.300 1.700 2.100 1.100 1 2 1.300 2.300 1.400.3.100.4.100.6-.1l.8-1c.2-.3.400-.2.600-.1l2 1c.3.100.5.200.5.300.100.100.100.700-.1 1.200z" /></svg>
            </a>
            <a href="mailto:srisasthatexengg@gmail.com" aria-label="Email">
              <svg viewBox="0 0 24 24"><path d="M3 5h18a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1zm9 7.200L4.500 7H4v.6l8 5.600 8-5.600V7h-.5L12 12.200z" /></svg>
            </a>
            <a href="tel:+918754022322" aria-label="Call">
              <svg viewBox="0 0 24 24"><path d="M6.600 10.800a15 15 0 0 0 6.600 6.600l2.200-2.200a1 1 0 0 1 1-.25 11.400 11.400 0 0 0 3.600.6 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.500a1 1 0 0 1 1 1c0 1.300.2 2.500.6 3.600a1 1 0 0 1-.25 1z" /></svg>
            </a>
          </div>
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
            <li><button onClick={() => goToSection('about')}>About &amp; Team</button></li>
            <li><button onClick={() => goToSection('reviews')}>Reviews</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Resources</h4>
          <ul>
            <li><Link to="/catalog">Spares Catalog</Link></li>
            <li><button onClick={() => goToSection('faq')}>FAQ</button></li>
            <li><button onClick={() => goToSection('contact')}>Request a Quote</button></li>
            <li><button onClick={() => goToSection('contact')}>Contact</button></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li><Link to="/privacy">Privacy Policy</Link></li>
            <li><Link to="/terms">Terms of Service</Link></li>
            <li><Link to="/cookies">Cookie Policy</Link></li>
            <li><Link to="/warranty">Warranty &amp; Returns</Link></li>
          </ul>
        </div>
      </div>

      <div className="container">
        <div className="footer-wordmark" aria-hidden="true">STE</div>
      </div>

      <div className="container footer-bottom">
        <p>&copy; 2026 Sri Sastha Textile Engineering. All rights reserved.</p>
        <p>
          <Link to="/privacy">Privacy</Link>
          <Link to="/terms">Terms</Link>
          <Link to="/cookies">Cookies</Link>
          <Link to="/warranty">Warranty</Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
