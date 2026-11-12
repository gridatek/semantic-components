import { workspaceRoot } from '@nx/devkit';
import { nxE2EPreset } from '@nx/playwright/preset';
import { defineConfig, devices } from '@playwright/test';

// For CI, you may want to set BASE_URL to the deployed application.
const baseURL = process.env['BASE_URL'] || 'http://localhost:4200';

/** The presets, a presets-… project each. */
const PRESET_NAMES = [
  'nova',
  'vega',
  'maia',
  'lyra',
  'mira',
  'luma',
  'sera',
  'rhea',
] as const;

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// require('dotenv').config();

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const preset = nxE2EPreset(__filename, { testDir: './src' });

export default defineConfig({
  ...preset,
  // On CI, four workers and the progress in the log. The preset's CI default
  // is one worker: the showcase's suite then outgrew the csr job's 30 minutes,
  // and the html report alone printed nothing while it ran.
  workers: process.env['CI'] ? 4 : undefined,
  reporter: process.env['CI']
    ? [...(Array.isArray(preset.reporter) ? preset.reporter : []), ['line']]
    : preset.reporter,
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
  // Projects by kind of test, each its folder (src/demos, src/pages,
  // src/presets): --project=demos runs one kind, and a CI job a group.
  //   demos, pages — behaviour and each docs page, in nova, desktop Chrome;
  //   presets-nova … presets-rhea — src/presets in that preset (its cookie,
  //     from metadata.preset in test.ts): classes, axe;
  //   mobile — the @mobile tests of demos and pages, on a phone.
  // ALL_BROWSERS (nightly) adds demos and pages in Firefox and WebKit, and an
  // iPhone.
  projects: [
    ...(['demos', 'pages'] as const).flatMap((kind) =>
      (process.env['ALL_BROWSERS']
        ? ([
            ['', devices['Desktop Chrome']],
            ['-firefox', devices['Desktop Firefox']],
            ['-webkit', devices['Desktop Safari']],
          ] as const)
        : ([['', devices['Desktop Chrome']]] as const)
      ).map(([suffix, device]) => ({
        name: kind + suffix,
        testDir: './src/' + kind,
        use: { ...device },
        grepInvert: /@mobile/,
      })),
    ),
    ...PRESET_NAMES.map((preset) => ({
      name: 'presets-' + preset,
      testDir: './src/presets',
      use: { ...devices['Desktop Chrome'] },
      metadata: { preset },
    })),
    ...(process.env['ALL_BROWSERS']
      ? ([
          ['mobile', devices['Pixel 7']],
          ['mobile-webkit', devices['iPhone 14']],
        ] as const)
      : ([['mobile', devices['Pixel 7']]] as const)
    ).map(([name, device]) => ({
      name,
      testDir: './src',
      testMatch: /(demos|pages)[/\\].*\.spec\.ts$/,
      use: { ...device },
      grep: /@mobile/,
    })),
  ],
});
