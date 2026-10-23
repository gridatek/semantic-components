# E2E Testing Guide

## Setup

- **Framework:** Playwright (via `@nx/playwright`)
- **Test suites:** `apps/showcase-e2e/` and `apps/blocks-e2e/`

## Running Tests

```bash
# Run all e2e tests
npx nx run showcase-e2e:e2e
npx nx run blocks-e2e:e2e

# Single browser
npx nx run showcase-e2e:e2e -- --project=chromium

# Single test file
npx nx run showcase-e2e:e2e -- --grep "Button"

# CI mode (parallel)
npx nx run showcase-e2e:e2e-ci
```

## Server-side rendering (SSR)

Both apps are static by default; SSR is the `ssr` build configuration. The CI job `ssr` runs the e2e tests again against the app rendered on the server, then hydrated — plus `ssr.spec.ts` (every page hydrates) and a check of the server's log. It isn't a required check.

| Command                         | What runs                                                     | For                                   |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| `npx nx serve showcase`         | the dev server, static                                        | daily work                            |
| `npx nx serve showcase -c ssr`  | the dev server, with SSR (rebuilds as you edit)               | looking at SSR locally                |
| `npx nx run showcase:serve-ssr` | the built app on its Node server (`dist/…/server/server.mjs`) | CI's `ssr` job — what production runs |

`serve-ssr` needs a build first (`npx nx build showcase -c ssr`); with `SSR=1`, the Playwright config starts it instead of `serve-static`. Its log goes to `dist/ssr-showcase.log` (`dist/ssr-blocks.log`). The same for `blocks`.

**Import `test` from `src/test.ts`,** not from `@playwright/test` (it re-exports the rest). In the SSR job its `page.goto` and `page.reload` wait until the page has hydrated — until `<html data-hydrated>`, which the `ssr` build's browser entry (`main.ssr.ts`) sets once the app is hydrated and stable (`ApplicationRef.whenStable()`; Angular has no "hydrated" event, only a dev-mode console message): a page drawn by the server is visible before Angular listens, and a fill or click in between is lost — or replayed. Without SSR, Playwright's own. Anything that must be in place before the app starts (`dir="rtl"`…) goes in `page.addInitScript`, not an `evaluate` after `goto`.

**Allowed hosts:** the built server answers only the hosts listed in the `ssr` configuration's `security.allowedHosts` (Angular's protection against server-side request forgery) — `localhost`, for the tests. Any other host gets `400 Bad Request` with "URL with hostname … is not allowed", and every test fails. The dev server skips this check, so it only shows up on the built server. A deployment adds its own domain to the list.

## Debugging Failures

1. **Run with UI mode:** `npx nx run showcase-e2e:e2e -- --ui`
2. **View report:** `npx playwright show-report dist/.playwright/apps/showcase-e2e/playwright-report`
3. **Traces** are collected on first retry automatically.

## Fixing Common Issues

- **Timeout:** The dev server may be slow to start. Check that `showcase` or `blocks` app serves correctly on its own first (`npx nx run showcase:serve`).
- **Selector not found:** Inspect the page manually; component selectors use `[sc-*]` attributes (e.g., `button[scButton]`).
- **Flaky tests:** Use `await expect(...).toHaveText()` (auto-retrying) instead of raw `innerText()` checks.
- **Wrong base URL:** Override with `BASE_URL` env var if ports differ.

## Writing Tests

Tests live in `apps/showcase-e2e/src/demos/<component>/`. Follow existing patterns:

```ts
import { expect, test } from '@playwright/test';

test.describe('My Component Demo', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/demos/my-component/my-demo');
  });

  test('should render correctly', async ({ page }) => {
    await expect(page.locator('[scMyComponent]')).toBeVisible();
  });
});
```

Prefer `getByRole()` and aria queries for accessibility-friendly selectors.
