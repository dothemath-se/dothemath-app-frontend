import { Config } from '../getConfig';

export const getConfig = (): Config => ({
  VITE_API_URL: 'MOCK VALUE FOR JEST',
  VITE_RECAPTCHA_SITEKEY: 'MOCK VALUE FOR JEST',
});
