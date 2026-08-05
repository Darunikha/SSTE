import React, { useState } from 'react';
import { submitQuoteApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const QuoteForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Spare Parts',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await submitQuoteApi(formData);
      if (res.data.success) {
        addToast('Quote request submitted successfully! We will get back to you soon.', 'success');
        setFormData({ name: '', email: '', service: 'Spare Parts', message: '' });
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to submit quote request. Please try again.';
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-section" style={{ maxWidth: '600px', margin: '0 auto', background: '#f5f3ff', padding: '0' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '30px' }}>Request A Quote</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Enter your name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="service">Service Type</label>
          <select id="service" name="service" value={formData.service} onChange={handleChange} required>
            <option value="Spare Parts">Spare Parts</option>
            <option value="Electronic Servicing">Electronic Servicing</option>
            <option value="HMI Conversion">HMI Conversion</option>
            <option value="Automation Support">Automation Support</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Describe your requirements"
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="form-submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default QuoteForm;
