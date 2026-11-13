# E2E Testing Guide

## Setup

- **Framework:** Playwright (via `@nx/playwright`)
- **Test suites:** `apps/showcase-e2e/` and `apps/blocks-e2e/`

## Running Tests

```bash
# Run all e2e tests
npx nx run showcase-e2e:e2e
npx nx run blocks-e2e:e2e

# One kind of test (a Playwright project)
npx nx run showcase-e2e:e2e -- --project=demos

# Single test file
npx nx run showcase-e2e:e2e -- --grep "Button"

# As a CI job: its group's projects (see CI groups)
npx playwright test -c apps/showcase-e2e/playwright.config.ts --project=presets-nova --project=presets-vega
```

## Kinds of tests: folders and projects

**Playwright is the only test tool** (the user, 2026-11-12): Vitest and its unit tests are gone (see _Still to do_). `apps/showcase-e2e` stays one Nx project — `nx affected` decides when it runs — and its `src` has a folder per kind of test, each a **Playwright project** in `playwright.config.ts` (not a separate Nx project):

| Folder        | Project(s)                      | What it checks                                                                                                                |
| ------------- | ------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `demos/`      | `demos`                         | behaviour: keys, clicks, state, output — in nova, desktop Chrome                                                              |
| `pages/`      | `pages`                         | each docs page: its sections, API reference, axe; the console (`console-clean.spec.ts`), the table of contents, SSR hydration |
| `presets/`    | `presets-nova` … `presets-rhea` | in that preset: each component's classes (`<name>.spec.ts`), every visible docs page's axe, light and dark (`pages.spec.ts`)  |
| — (`@mobile`) | `mobile`                        | the `@mobile` tests of `demos/` and `pages/`, on a phone (Pixel 7)                                                            |

With `ALL_BROWSERS` (the nightly) there are also `demos-firefox`, `pages-firefox`, `demos-webkit`, `pages-webkit` and the iPhone `mobile-webkit`.

### Why (the reorganisation of 2026-11-12)

- **CI ran out of time.** The showcase's suite (over 3,000 tests) outgrew one job: the CSR job reached test 1,357 of 3,166 in its 30 minutes, the SSR job its 45. Most of the time was the presets: 65 specs × 8 presets, each loading a demo page **and** the docs page, with two full-page axe runs.
- **A preset at a time.** The preset is read when the app starts (its cookie), so changing it means a new page load. Each spec looped over the 8 presets; now the **project** is the preset (`metadata.preset`, which `test.ts` sets as the cookie before the page opens), and a presets spec runs once per project. The docs pages' axe moved to one `presets/pages.spec.ts` — one load per page per preset, every visible page.
- **A failure that says what failed.** CI runs a job per group of projects, named after it (`csr-e2e (pages)`, `ssr (presets-maia-lyra)`…), not an anonymous shard.

### Where a new test goes

| You test…                                                    | Put it in                                                                                                                                                                       |
| ------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| what a demo does (keys, clicks, a value, an output)          | `demos/<name>/<demo>.spec.ts` (or `<name>-demos.spec.ts`)                                                                                                                       |
| a docs page (its sections, API reference, a page-wide check) | `pages/<name>-page.spec.ts`                                                                                                                                                     |
| a preset's look (its classes)                                | `presets/<name>.spec.ts` — **never loop over the presets**: read the one running with `presetStyles()` / `presetName()`, and check with `expectClasses()` (`presets/preset.ts`) |
| a phone (small screen, touch, on-screen keyboard)            | a test tagged `@mobile` in the component's demos or page spec (for now — see _Still to do_)                                                                                     |
| a page's look in pixels                                      | `presets/`, tagged `@visual` (coming)                                                                                                                                           |

Specs outside `presets/` run in nova (`test.ts` sets it); the showcase itself opens in lyra. A spec may still set its own `sc-preset` cookie: it replaces the project's.

Locally, run only what you need, by project:

```sh
cd apps/showcase-e2e
npx playwright test src/demos/foo/ src/pages/foo-page.spec.ts --project=demos --project=pages --reporter=line --retries=0 --workers=1
npx playwright test src/presets/foo.spec.ts --project=presets-nova --project=presets-lyra --reporter=line --retries=0 --workers=1
```

### CI groups

| Workflow             | Jobs                                                                                                                                                                                                                       |
| -------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ci.yml` — `csr`     | lint, translations, build (affected)                                                                                                                                                                                       |
| `ci.yml` — `csr-e2e` | 8 jobs: `demos-1`, `demos-2` (`--shard`), `pages`, `presets-nova-vega`, `presets-maia-lyra`, `presets-mira-luma`, `presets-sera-rhea`, `mobile` (+ the blocks' suite) — each only when the change affects the e2e projects |
| `ci.yml` — `ssr`     | the same 8 groups against the server-rendered build (not required)                                                                                                                                                         |
| `nightly-e2e.yml`    | Firefox and WebKit (CI runs Chromium), two shards each, client-side and server-rendered                                                                                                                                    |

A group is a `matrix.include` entry in `ci.yml`: its name and its `--project` flags. Branch protection's required checks name these jobs.

### Limits, and the way forward

This layout is a step, not the end: the suite will grow (visual tests, more components, more presets checks), and it will need reworking again. What we know:

- **Groups are balanced by hand.** Two presets per job, demos in two shards: fine at ~500–800 tests a job. When a group nears its 30 minutes, split it (`--shard=1/3`…) or move a project to its own job. Playwright's `--shard` balances by tests that run (skipped ones don't count), not by time.
- **Every test opens its own page.** A page load is the main cost (the app starts, then axe). Ideas, in order of gain:
  1. **One load, several checks**: the presets' class checks could read the examples already on the docs page that `presets/pages.spec.ts` loads, instead of opening each demo page — half the loads. Needs scoped locators (an example's container), and the demos that must be opened (a menu, a popover) handled apart.
  2. **Axe on what changes**: light and dark on every page in 8 presets is 16 axe runs a page; contrast is what changes between presets — a contrast-only run in 7 presets, the full run in one.
  3. **Shared pages per worker**: Playwright can keep one page per worker (a worker-scoped fixture) and navigate within the app instead of reloading — only for specs that don't depend on a fresh start (the preset is read at start: one worker per preset project).
- **Only the tests a change touches.** `nx affected` sees one project: a change to the Button runs every e2e test. Mapping changed files to specs (a component's folder → its demos, page and preset specs) would run a fraction on pull requests, the whole suite on `main` and nightly.
- **Reports across jobs.** Each job uploads its own report on failure. Playwright's `blob` reporter and `merge-reports` would give one HTML report for a run.
- **Visual tests multiply.** Pages × presets × light/dark is thousands of images: start with a few pages and presets, references made on Linux (CI or Playwright's Docker image), their own CI job.

### Still to do

- **`mobile/`**: move the 87 `@mobile` tests out of the demos and page specs into `src/mobile` (55 of them sit inside `describe` blocks, with their `beforeEach`); then the `mobile` project is a folder like the others, not a tag.
- **Visual tests**: `@visual`, in `presets/` — see above.
- **The unit tests to port**: Vitest went on 2026-11-12 (`vitest`, `jsdom`, the showcase's `test` target and `tsconfig.spec.json`, CI's _Unit tests_ step) with its 64 tests, not yet in Playwright: `checkbox-group-form`, `field-errors`, `field-label`, `form-control-invalid`, `radio-form`, `text-control-form-state` (forms: a field's errors, its label, invalid states), `toaster`, `qr-code`, `intersection-observer`, `query-param-state` and `query-param-state-demo` — `apps/showcase/src/app/<name>.spec.ts` in git history (before the commit that removes them). Port what still matters as behaviour tests in `demos/`.
- **Measure**: the first CI runs give each group's time — the base for the next split.

## Server-side rendering (SSR)

Both apps are static by default; SSR is the `ssr` build configuration. The CI job `ssr` runs the e2e tests again against the app rendered on the server, then hydrated — plus `ssr.spec.ts` (every page hydrates) and a check of the server's log. It isn't a required check.

| Command                         | What runs                                                     | For                                   |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| `npx nx serve showcase`         | the dev server, static                                        | daily work                            |
| `npx nx serve showcase -c ssr`  | the dev server, with SSR (rebuilds as you edit)               | looking at SSR locally                |
| `npx nx run showcase:serve-ssr` | the built app on its Node server (`dist/…/server/server.mjs`) | CI's `ssr` job — what production runs |

The nightly workflow (`nightly-e2e.yml`) runs both ways — jobs `csr` and `ssr` — in the browsers CI doesn't (`ALL_BROWSERS`): Firefox and WebKit (`demos-firefox`, `pages-firefox`, `demos-webkit`, `pages-webkit`, the iPhone `mobile-webkit`), two shards each; the pull requests' CI runs Chromium, every project.

`serve-ssr` needs a build first (`npx nx build showcase -c ssr`); with `SSR=1`, the Playwright config starts it instead of `serve-static`. Its log goes to `dist/ssr-showcase.log` (`dist/ssr-blocks.log`). The same for `blocks`.

**One spec locally, under SSR:** build, start the server on a free port, and point the tests at it (`BASE_URL` set, the config starts no server of its own). Restart the server after each rebuild.

```sh
npx nx build showcase --configuration=ssr
PORT=4400 node dist/apps/showcase/server/server.mjs   # in another terminal
SSR=1 BASE_URL=http://localhost:4400 npx playwright test -c apps/showcase-e2e/playwright.config.ts src/demos/spinner --project=demos --workers=1 --retries=0
```

What fails only here is mostly code that runs on the server without a browser (`matchMedia`, `window`), or a page drawn differently on the server than in the browser (a preset or theme read from browser-only state, where hydration keeps the server's classes).

**Import `test` from `src/test.ts`,** not from `@playwright/test` (it re-exports the rest). In the SSR job its `page.goto` and `page.reload` wait until the page has hydrated — until `<html data-hydrated>`, which the `ssr` build's browser entry (`main-ssr.ts`) sets once the app is hydrated and stable (`ApplicationRef.whenStable()`; Angular has no "hydrated" event, only a dev-mode console message): a page drawn by the server is visible before Angular listens, and a fill or click in between is lost — or replayed. Without SSR, Playwright's own. Anything that must be in place before the app starts (`dir="rtl"`…) goes in `page.addInitScript`, not an `evaluate` after `goto`.

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

Tests live in the folder of their kind (see _Where a new test goes_): a demo's behaviour in `apps/showcase-e2e/src/demos/<component>/`. Import `test` and `expect` from `src/test.ts` (it sets the project's preset, and waits for hydration under SSR), not from `@playwright/test`:

```ts
import { expect, test } from '../../test';

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
