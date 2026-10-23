import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...nxE2EPreset(__filename, { testDir: './src' }),
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL,
    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',
  },
  /* Run your local dev server before starting the tests */
  webServer: {
    // SSR (the CI job `ssr`): the `ssr` build on its Node server. Otherwise, on
    // CI, the built app on a file server: the build step has made it, and the
    // dev server's Node crashes under the whole suite (a V8 fast-API bug).
    command: process.env['SSR']
      ? 'npx nx run showcase:serve-ssr'
      : process.env['CI']
        ? 'npx nx run showcase:serve-static'
        : 'npx nx run showcase:serve',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    cwd: workspaceRoot,
  },
  // Desktop browsers run every test but those tagged @mobile; the phones run
  // only those (a small screen, touch, the on-screen keyboard).
  projects: [
    ...(process.env['ALL_BROWSERS']
      ? [
          { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
          { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
          { name: 'webkit', use: { ...devices['Desktop Safari'] } },
        ]
      : [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }]
    ).map((project) => ({ ...project, grepInvert: /@mobile/ })),
    ...(process.env['ALL_BROWSERS']
      ? [
          { name: 'mobile-chromium', use: { ...devices['Pixel 7'] } },
          { name: 'mobile-webkit', use: { ...devices['iPhone 14'] } },
        ]
      : [{ name: 'mobile-chromium', use: { ...devices['Pixel 7'] } }]
    ).map((project) => ({ ...project, grep: /@mobile/ })),
  ],
});
