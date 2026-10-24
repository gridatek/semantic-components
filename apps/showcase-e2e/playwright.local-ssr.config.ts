import config from './playwright.config';

// Local only (not committed): the e2e config against `nx serve showcase -c ssr --port 4300`.
export default {
  ...config,
  webServer: undefined,
  use: { ...config.use, baseURL: 'http://localhost:4300' },
};
