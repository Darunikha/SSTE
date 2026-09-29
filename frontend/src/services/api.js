import axios from 'axios';

const rawBase = (import.meta.env.VITE_API_URL || '').trim().replace(/\/+$/, '');
const API_BASE = rawBase ? (rawBase.endsWith('/api') ? rawBase : `${rawBase}/api`) : '/api';

const API = axios.create({
  // Local dev uses the Vite proxy ('/api'). On Vercel set VITE_API_URL to the backend origin,
  // e.g. https://sri-sastha-api.onrender.com  (with or without a trailing /api).
  baseURL: API_BASE,
  timeout: 30000, // free-tier backends can take a while to wake up
  headers: {
    'Content-Type': 'application/json',
  },
});

// Quote APIs
export const submitQuoteApi = (quoteData) => API.post('/quotes', quoteData);

// Newsletter APIs
export const subscribeNewsletterApi = (data) => API.post('/newsletter', data);

// Public Data APIs
export const getServicesApi = () => API.get('/services');
export const getExpertiseApi = () => API.get('/expertise');
export const getStatsApi = () => API.get('/stats');
export const getTeamApi = () => API.get('/team');
export const getFaqsApi = () => API.get('/faqs');
export const getCatalogApi = () => API.get('/catalog');

export default API;
