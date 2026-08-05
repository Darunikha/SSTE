import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import logoSvg from '../assets/images/logo.svg';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavClick = (sectionId) => {
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav>
      <div className="nav-container">
        <Link to="/" className="logo">
          <img src={logoSvg} alt="Sri Sastha Textile Engineering" title="Sri Sastha Textile Engineering" />
        </Link>
        <ul className="nav-links">
          <li>
            <button onClick={() => handleNavClick('services')}>Services</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('expertise')}>Expertise</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('team')}>Team</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('faq')}>FAQ</button>
          </li>
          <li>
            <button onClick={() => handleNavClick('contact')}>Contact</button>
          </li>
          {isAuthenticated ? (
            <>
              <li>
                <Link to="/dashboard" className="nav-admin-btn">
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={logout} style={{ color: '#ef4444' }}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className="nav-admin-btn">
                Admin Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
