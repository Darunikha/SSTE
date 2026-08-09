import React, { useState } from 'react';
import { subscribeNewsletterApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const NewsletterForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || loading) return;

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
    <section className="newsletter-band">
      <div className="container newsletter-inner">
        <div>
          <h3>Stay Connected With Sri Sastha</h3>
          <p>Receive occasional updates on textile machinery support, maintenance and engineering solutions.</p>
        </div>
        <form className="newsletter-form" onSubmit={handleSubmit}>
          <label htmlFor="newsletter-email" className="visually-hidden">
            Email address
          </label>
          <input
            type="email"
            id="newsletter-email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Submitting...' : 'Subscribe'}
          </button>
        </form>
      </div>
    </section>
  );
};

export default NewsletterForm;
