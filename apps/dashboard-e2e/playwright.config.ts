import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

const baseURL = process.env['BASE_URL'] || 'http://localhost:4203';

const preset = nxE2EPreset(__filename, { testDir: './src' });

/**
 * The dashboard: the library's test app — what it shows is what the library
 * writes (its formatters, its saved choices, its languages).
 */
export default defineConfig({
  ...preset,
  use: {
    baseURL,
    trace: 'on-first-retry',
  },
  webServer: {
    // On CI, the built app on a file server (the build step has made it);
    // locally, the dev server.
    command: process.env['CI']
      ? 'npx nx run dashboard:serve-static'
      : 'npx nx run dashboard:serve',
    url: 'http://localhost:4203',
    reuseExistingServer: true,
    cwd: workspaceRoot,
  },
  projects: process.env['ALL_BROWSERS']
    ? [
        { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
        { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
        { name: 'webkit', use: { ...devices['Desktop Safari'] } },
      ]
    : [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],
});
