interface Config {
  VITE_RECAPTCHA_SITEKEY: string;
}

export const getConfig = (): Config => ({
  VITE_RECAPTCHA_SITEKEY: 'abcd',
});
