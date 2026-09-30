import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
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
  const [sent, setSent] = useState(null);
  const panelRef = useRef(null);
  const { addToast } = useToast();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.prefillProduct) {
      const { name, sku } = location.state.prefillProduct;
      setFormData((prev) => ({
        ...prev,
        message: `I would like to request a quote/information for:\n- Item: ${name}\n- SKU: ${sku}\n\nPlease provide details on price, lead time, and shipping.`,
        service: 'Spare Parts',
      }));
    }
  }, [location.state]);

  useEffect(() => {
    if (sent && panelRef.current) {
      panelRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      panelRef.current.focus({ preventScroll: true });
    }
  }, [sent]);

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
        addToast('Quote request submitted successfully! We will get back to you soon.', 'success');
        setSent({ name: formData.name.trim(), email: formData.email.trim(), service: formData.service });
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

  if (sent) {
    return (
      <div className="quote-form-panel">
        <div className="quote-success" ref={panelRef} tabIndex={-1} role="status" aria-live="polite">
          <div className="quote-success-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12.5l4.5 4.5L19 7.5" />
            </svg>
          </div>
          <h3>Thank you, {sent.name}!</h3>
          <p>
            We have received your request for <strong>{sent.service}</strong>. Our team will reply within 24 hours at{' '}
            <strong>{sent.email}</strong>.
          </p>
          <p className="quote-success-note">A confirmation email is on its way. If you don&apos;t see it, check your spam folder.</p>
          <button type="button" className="btn btn-primary" onClick={() => setSent(null)}>
            Send another request
          </button>
        </div>
      </div>
    );
  }

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
          <p className={`form-status ${status.type}`} role="alert">
            {status.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default QuoteForm;
