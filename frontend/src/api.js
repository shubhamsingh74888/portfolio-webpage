import axios from 'axios';

// /api works in production (Nginx proxies it to backend)
// http://localhost:5000/api works in local dev
const API_BASE_URL = import.meta.env.VITE_API_URL?.trim() || '/api';

const baseURL = API_BASE_URL.endsWith('/') ? API_BASE_URL : `${API_BASE_URL}/`;

const api = axios.create({
  baseURL,
  timeout: 12000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add JWT token automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Global 401 → redirect to login
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      if (!window.location.pathname.includes('/login')) {
        localStorage.removeItem('authToken');
        window.location.replace('/admin/login');
      }
    }
    return Promise.reject(error);
  }
);

export default api;
