import axios from 'axios';
import { environment } from '@/config/environment';

const axiosInstance = axios.create({
  baseURL: environment.apiBaseUrl,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Request interceptor for future auth token injection
axiosInstance.interceptors.request.use(
  (config) => {
    // Future: const token = getAuthToken();
    // if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor for future error handling
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    // Future: handle 401, 403, 500 errors globally
    return Promise.reject(error);
  }
);

export default axiosInstance;
