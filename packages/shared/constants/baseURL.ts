const DEV_BASE_URL = '/';

export const BASE_URL = import.meta.env.PROD
  ? import.meta.env.VITE_BASE_URL
  : DEV_BASE_URL;
