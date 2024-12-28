import { CONFIG } from 'src/config-global';

export const tokenManager = {
  getAccessToken() {
    return localStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);
  },

  setAccessToken(accessToken) {
    localStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, accessToken);
  },

  clearToken() {
    localStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
  },
};
