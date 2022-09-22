import axios from 'axios';

export function getApiClient(_ctx?: any) {
  const api = axios.create({
    baseURL: 'http://localhost:3000',
  });

  api.interceptors.request.use((config: any) => {
    return config;
  });

  return api;
}

export const api = getApiClient();