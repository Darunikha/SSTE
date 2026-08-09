import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoSvg from '../assets/images/logo.svg';

const NAV_ITEMS = [
  { id: 'services', label: 'Services' },
  { id: 'expertise', label: 'Expertise' },
  { id: 'industries', label: 'Industries' },
  { id: 'about', label: 'About' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const goToSection = (sectionId) => {
    setMenuOpen(false);
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
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <div className="container nav-shell">
        <Link to="/" className="brand" onClick={() => setMenuOpen(false)}>
          <img className="brand-mark" src={logoSvg} alt="Sri Sastha Textile Engineering" />
          <span className="brand-name">
            Sri Sastha
            <small>Textile Engineering</small>
          </span>
        </Link>

        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.id}>
                <button className="nav-link" onClick={() => goToSection(item.id)}>
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="nav-actions">
          <button className="btn btn-primary btn-compact" onClick={() => goToSection('contact')}>
            Request a Quote
          </button>
          <button
            className="nav-toggle"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mobile-nav" data-state={menuOpen ? 'open' : 'closed'}>
        <ul>
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button onClick={() => goToSection(item.id)}>{item.label}</button>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary" onClick={() => goToSection('contact')}>
          Request a Quote
        </button>
      </div>
    </header>
  );
};

export default Navbar;
