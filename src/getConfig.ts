export interface Config {
  VITE_API_URL: string;
  VITE_RECAPTCHA_SITEKEY: string;
}

export const getConfig = (): Config => ({
  VITE_API_URL: import.meta.env.VITE_API_URL as string,
  VITE_RECAPTCHA_SITEKEY: import.meta.env.VITE_RECAPTCHA_SITEKEY as string,
});
