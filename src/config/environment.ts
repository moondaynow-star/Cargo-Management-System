export const environment = {
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',
  appName: import.meta.env.VITE_APP_NAME || 'Cargo Management System',
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};
