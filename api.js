import axios from 'axios';

const api = axios.create({
  // baseURL: 'http://localhost:8000',
  baseURL: 'https://elite-prep-server-2.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const userService = {
  register: (userData) => api.post('/register', userData),
  login: (userData) => api.post('/login', userData),
  updateOnboarding: (data) => api.post('/onboarding', data),
  addPerformanceTrend: (data) => api.post('/performance-trends', data),
  generate: (prompt) => api.post('/generate', { prompt }),
  getPerformanceAverages: (email) => api.get(`/performance-averages/${email}`),
};

export default api;