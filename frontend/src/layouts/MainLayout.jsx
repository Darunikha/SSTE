import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsletterForm from '../components/NewsletterForm';
import PageExtras from '../components/PageExtras';

const MainLayout = ({ children, showNewsletter = true }) => {
  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <PageExtras />
      <Navbar />
      <main id="main-content" style={{ flex: 1 }}>
        {children}
      </main>
      {showNewsletter && <NewsletterForm />}
      <Footer />
    </>
  );
};

export default MainLayout;
