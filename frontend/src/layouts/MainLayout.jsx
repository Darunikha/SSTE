import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NewsletterForm from '../components/NewsletterForm';

const MainLayout = ({ children, showNewsletter = true }) => {
  return (
    <>
      <Navbar />
      <main style={{ flex: 1 }}>{children}</main>
      {showNewsletter && <NewsletterForm />}
      <Footer />
    </>
  );
};

export default MainLayout;
