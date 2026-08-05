import React, { useState } from 'react';
import { subscribeNewsletterApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      const res = await subscribeNewsletterApi({ email });
      if (res.data.success) {
        addToast(res.data.message || 'Subscribed successfully!', 'success');
        setEmail('');
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Subscription failed. Please try again.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="newsletter-section">
      <div className="newsletter-content">
        <h3>Subscribe to Our Updates</h3>
        <p>Get the latest industry insights, maintenance tips, and service announcements delivered to your inbox.</p>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
