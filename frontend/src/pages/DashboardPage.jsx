import React, { useState, useEffect } from 'react';
import { getQuotesApi, updateQuoteStatusApi, deleteQuoteApi, getSubscribersApi } from '../services/api';
import { useToast } from '../context/ToastContext';
import Loader from '../components/Loader';

const DashboardPage = () => {
  const [quotes, setQuotes] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [activeTab, setActiveTab] = useState('quotes');
  const [loading, setLoading] = useState(true);
  const { addToast } = useToast();

  const loadData = async () => {
    setLoading(true);
    try {
      const [resQuotes, resSubscribers] = await Promise.all([getQuotesApi(), getSubscribersApi()]);
      if (resQuotes.data?.data) setQuotes(resQuotes.data.data);
      if (resSubscribers.data?.data) setSubscribers(resSubscribers.data.data);
    } catch (error) {
      addToast('Failed to load dashboard data', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateQuoteStatusApi(id, status);
      addToast(`Status updated to ${status}`, 'success');
      loadData();
    } catch (error) {
      addToast('Failed to update status', 'error');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this quote request?')) return;
    try {
      await deleteQuoteApi(id);
      addToast('Quote request deleted', 'success');
      loadData();
    } catch (error) {
      addToast('Failed to delete quote', 'error');
    }
  };

  if (loading) return <Loader fullScreen message="Loading Dashboard..." />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <div>
          <h2 style={{ color: 'var(--primary)', fontSize: '2rem' }}>Admin Control Center</h2>
          <p style={{ color: 'var(--muted)' }}>Manage customer quote inquiries and newsletter subscribers</p>
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            className={`btn ${activeTab === 'quotes' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: activeTab === 'quotes' ? 'var(--primary)' : 'var(--primary)', borderColor: 'var(--primary)' }}
            onClick={() => setActiveTab('quotes')}
          >
            Quote Requests ({quotes.length})
          </button>
          <button
            className={`btn ${activeTab === 'subscribers' ? 'btn-primary' : 'btn-secondary'}`}
            style={{ color: activeTab === 'subscribers' ? 'var(--primary)' : 'var(--primary)', borderColor: 'var(--primary)' }}
            onClick={() => setActiveTab('subscribers')}
          >
            Subscribers ({subscribers.length})
          </button>
        </div>
      </div>

      {activeTab === 'quotes' ? (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Client Name</th>
                <th>Email</th>
                <th>Requested Service</th>
                <th>Message</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {quotes.length === 0 ? (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                    No quote requests submitted yet.
                  </td>
                </tr>
              ) : (
                quotes.map((q) => (
                  <tr key={q._id}>
                    <td>{new Date(q.createdAt).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 600 }}>{q.name}</td>
                    <td>{q.email}</td>
                    <td>
                      <span
                        style={{
                          background: 'var(--light)',
                          color: 'var(--primary)',
                          padding: '4px 10px',
                          borderRadius: '12px',
                          fontSize: '0.85rem',
                          fontWeight: 600,
                        }}
                      >
                        {q.service}
                      </span>
                    </td>
                    <td style={{ maxWidth: '250px' }}>{q.message || '—'}</td>
                    <td>
                      <select
                        value={q.status}
                        onChange={(e) => handleStatusChange(q._id, e.target.value)}
                        style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid #e0d4f7' }}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td>
                      <button
                        onClick={() => handleDelete(q._id)}
                        style={{
                          background: '#fee2e2',
                          color: '#ef4444',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          fontWeight: 600,
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Subscription Date</th>
                <th>Email Address</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.length === 0 ? (
                <tr>
                  <td colSpan="3" style={{ textAlign: 'center', color: 'var(--muted)' }}>
                    No subscribers yet.
                  </td>
                </tr>
              ) : (
                subscribers.map((sub) => (
                  <tr key={sub._id}>
                    <td>{new Date(sub.createdAt).toLocaleDateString()}</td>
                    <td style={{ fontWeight: 600 }}>{sub.email}</td>
                    <td>
                      <span style={{ color: '#10b981', fontWeight: 600 }}>Active Subscriber</span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DashboardPage;
