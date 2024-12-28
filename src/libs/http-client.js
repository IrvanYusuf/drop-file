import Axios from 'axios';

import { CONFIG } from 'src/config-global';
import { tokenManager } from 'src/utils/token-manager';

const httpClient = Axios.create({
  baseURL: CONFIG.BASE_API_URL,
  headers: { 'Content-Type': 'application/json' },
});

const httpClientDev = Axios.create({
  baseURL: CONFIG.BASE_API_URL_DEV,
  headers: { 'Content-Type': 'application/json' },
});

function authInterceptors(config) {
  const accessToken = tokenManager.getAccessToken();
  if (accessToken && config.headers) {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
}

httpClient.interceptors.request.use(authInterceptors, (error) => Promise.reject(error));
httpClientDev.interceptors.request.use(authInterceptors, (error) => Promise.reject(error));

export { httpClient, httpClientDev };
