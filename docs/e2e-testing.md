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
import { test, expect } from '@playwright/test';

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
