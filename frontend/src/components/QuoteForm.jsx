import React, { useState } from 'react';
import { submitQuoteApi } from '../services/api';
import { useToast } from '../context/ToastContext';

const SERVICE_OPTIONS = ['Spare Parts', 'Electronic Servicing', 'HMI Conversion', 'Automation Support'];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const initialForm = { name: '', email: '', service: SERVICE_OPTIONS[0], message: '' };

const QuoteForm = () => {
  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);
  const { addToast } = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!formData.name.trim()) nextErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      nextErrors.email = 'Please enter your email address.';
    } else if (!EMAIL_PATTERN.test(formData.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.service) nextErrors.service = 'Please select a service type.';
    return nextErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    const nextErrors = validate();
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setLoading(true);
    setStatus(null);

    try {
      const res = await submitQuoteApi(formData);
      if (res.data.success) {
        setStatus({ type: 'success', message: res.data.message || 'Quote request submitted successfully.' });
        addToast('Quote request submitted successfully! We will get back to you soon.', 'success');
        setFormData(initialForm);
      }
    } catch (error) {
      const msg = error.response?.data?.message || 'Failed to submit quote request. Please try again.';
      setStatus({ type: 'error', message: msg });
      addToast(msg, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="quote-form-panel">
      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${errors.name ? 'has-error' : ''}`}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Your full name"
            value={formData.name}
            onChange={handleChange}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="form-error-text" id="name-error">
              {errors.name}
            </span>
          )}
        </div>

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="your@company.com"
            value={formData.email}
            onChange={handleChange}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="form-error-text" id="email-error">
              {errors.email}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="service">Service Type</label>
          <select id="service" name="service" value={formData.service} onChange={handleChange}>
            {SERVICE_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            placeholder="Describe your machinery and requirement"
            value={formData.message}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%', justifyContent: 'center' }}>
          {loading ? 'Submitting...' : 'Request Technical Support'}
        </button>

        {status && (
          <p className={`form-status ${status.type}`} role="status">
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default QuoteForm;
