import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor to attach Authorization Bearer Token
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('srisastha_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Authentication APIs
export const loginApi = (credentials) => API.post('/auth/login', credentials);
export const registerApi = (userData) => API.post('/auth/register', userData);
export const getMeApi = () => API.get('/auth/me');

// Quote APIs
export const submitQuoteApi = (quoteData) => API.post('/quotes', quoteData);
export const getQuotesApi = () => API.get('/quotes');
export const updateQuoteStatusApi = (id, status) => API.put(`/quotes/${id}`, { status });
export const deleteQuoteApi = (id) => API.delete(`/quotes/${id}`);

// Newsletter APIs
export const subscribeNewsletterApi = (data) => API.post('/newsletter', data);
export const getSubscribersApi = () => API.get('/newsletter');

// Public Data APIs
export const getServicesApi = () => API.get('/services');
export const getExpertiseApi = () => API.get('/expertise');
export const getStatsApi = () => API.get('/stats');
export const getTeamApi = () => API.get('/team');
export const getFaqsApi = () => API.get('/faqs');

export default API;
