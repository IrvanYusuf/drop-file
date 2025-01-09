import { CONFIG } from 'src/config-global';

export const tokenManager = {
  getAccessToken() {
    return sessionStorage.getItem(CONFIG.ACCESS_TOKEN_KEY);
  },

  setAccessToken(accessToken) {
    sessionStorage.setItem(CONFIG.ACCESS_TOKEN_KEY, accessToken);
  },

  clearToken() {
    sessionStorage.removeItem(CONFIG.ACCESS_TOKEN_KEY);
  },
};
