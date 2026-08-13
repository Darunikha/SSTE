import axios from 'axios';

const API = axios.create({
  baseURL: '/api',
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
