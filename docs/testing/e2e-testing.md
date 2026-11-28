# E2E Testing Guide

## Setup

- **Framework:** Playwright (via `@nx/playwright`)
- **Test suite:** `apps/showcase-e2e/`
- **The showcase's settings** (`apps/showcase/public/config.json`) aren't in git. The tests need every page listed, hidden ones too: after cloning, run `node scripts/showcase-config.mjs test`. Without the file, hidden pages don't show and their tests fail. Every workflow writes it the same way before building (`test`; `deploy.yml`: `prod` and `dev`).

## Running Tests

```bash
# Run all e2e tests
npx nx run showcase-e2e:e2e

# One kind of test (a Playwright project)
npx nx run showcase-e2e:e2e -- --project=demos

# Single test file
npx nx run showcase-e2e:e2e -- --grep "Button"

# As a CI job: its group's projects (see CI groups)
npx playwright test -c apps/showcase-e2e/playwright.config.ts --project=styles-nova --project=styles-vega
```

## Kinds of tests: folders and projects

**Playwright is the only test tool** (the user, 2026-11-12): Vitest and its unit tests are gone (see _Still to do_). `apps/showcase-e2e` stays one Nx project — `nx affected` decides when it runs — and its `src` has a folder per kind of test, each a **Playwright project** in `playwright.config.ts` (not a separate Nx project):

| Folder    | Project(s)                    | What it checks                                                                                                                                                                         |
| --------- | ----------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `demos/`  | `demos`                       | behaviour: keys, clicks, state, output — in nova, desktop Chrome                                                                                                                       |
| `pages/`  | `pages`                       | each docs page: its sections, API reference, axe; the console (`console-clean.spec.ts`), the table of contents, SSR hydration                                                          |
| `styles/` | `styles-nova` … `styles-rhea` | in that style: each component's classes (`<name>.spec.ts`), every visible docs page's axe, light and dark (`pages.spec.ts`)                                                            |
| `mobile/` | `mobile`                      | on a phone: every page and every demo at 360 px — the screen, a demo's width in its frame, its overlays (`reflow.spec.ts`); and the `@mobile` tests of `demos/` and `pages/` (Pixel 7) |

The apps have their own e2e projects: `apps/styles/custom-e2e` (the custom app) and `apps/dashboard-e2e` (the dashboard, the library's test app: its saved choices under its own names, the digits' order, a language followed by other tabs, its formatting only through the library). CI runs both in the `mobile` group's job, when affected.

With `ALL_BROWSERS` (the nightly) there are also `demos-firefox`, `pages-firefox`, `demos-webkit`, `pages-webkit` and the iPhone `mobile-webkit`. Running and fixing them: [firefox-and-webkit.md](firefox-and-webkit.md).

### Why (the reorganisation of 2026-11-12)

- **CI ran out of time.** The showcase's suite (over 3,000 tests) outgrew one job: the CSR job reached test 1,357 of 3,166 in its 30 minutes, the SSR job its 45. Most of the time was the styles: 65 specs × 8 styles, each loading a demo page **and** the docs page, with two full-page axe runs.
- **A style at a time.** The style is read when the app starts (its cookie), so changing it means a new page load. Each spec looped over the 8 styles; now the **project** is the style (`metadata.style`, which `test.ts` sets as the cookie before the page opens), and a styles spec runs once per project. The docs pages' axe moved to one `styles/pages.spec.ts` — one load per page per style, every visible page.
- **A failure that says what failed.** CI runs a job per group of projects, named after it (`csr-e2e (pages)`, `ssr (styles-maia-lyra)`…), not an anonymous shard.

### Where a new test goes

| You test…                                                    | Put it in                                                                                                                                                                    |
| ------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| what a demo does (keys, clicks, a value, an output)          | `demos/<name>/<demo>.spec.ts` (or `<name>-demos.spec.ts`)                                                                                                                    |
| a docs page (its sections, API reference, a page-wide check) | `pages/<name>-page.spec.ts`                                                                                                                                                  |
| a style's look (its classes)                                 | `styles/<name>.spec.ts` — **never loop over the styles**: read the one running with `currentStyle()` / `styleName()`, and check with `expectClasses()` (`styles/style.ts`)   |
| a phone (small screen, touch, on-screen keyboard)            | a test tagged `@mobile` in the component's demos or page spec (for now — see _Still to do_); fitting the screen is already checked for every route (`mobile/reflow.spec.ts`) |
| a page's look in pixels                                      | `styles/`, tagged `@visual` (coming)                                                                                                                                         |

Specs outside `styles/` run in nova (`test.ts` sets it); the showcase itself opens in lyra. A spec may still set its own `sc-style` cookie: it replaces the project's.

Locally, run only what you need, by project:

```sh
cd apps/showcase-e2e
npx playwright test src/demos/foo/ src/pages/foo-page.spec.ts --project=demos --project=pages --reporter=line --retries=0 --workers=1
npx playwright test src/styles/foo.spec.ts --project=styles-nova --project=styles-lyra --reporter=line --retries=0 --workers=1
```

### CI groups

| Workflow             | Jobs                                                                                                                                                                                             |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ci.yml` — `csr`     | lint, translations, build (affected)                                                                                                                                                             |
| `ci.yml` — `csr-e2e` | 8 jobs: `demos-1`, `demos-2` (`--shard`), `pages`, `styles-nova-vega`, `styles-maia-lyra`, `styles-mira-luma`, `styles-sera-rhea`, `mobile` — each only when the change affects the e2e projects |
| `ci.yml` — `ssr`     | the same 8 groups against the server-rendered build (not required)                                                                                                                               |
| `nightly-e2e.yml`    | Firefox and WebKit (CI runs Chromium), three shards each, client-side and server-rendered                                                                                                        |

A group is a `matrix.include` entry in `ci.yml`: its name and its `--project` flags. Branch protection's required checks name these jobs.

### Every route on a phone

`mobile/reflow.spec.ts` opens every page and every demo route (read from `app-routes.ts` and `routes/*-routes.ts`; not the redirects, not the parents of children only) on a phone **360 px wide** — Android's most common width; the Pixel 7's 412 hid what narrower phones cut off (an Honor 400 at its default display size is about 370). A new route is tested without a line to add.

- **Pages: nothing wider than the screen** — WCAG 1.4.10 Reflow: the page never scrolls sideways, nothing is cut off at its edge.
- **Demos: in the width the docs give them.** On a docs page an example sits in a frame inside the page's margin: 24 px + the frame's padding (`p-10`, 40 px) a side, so at 360 px a demo has 232 px. On its route the test sets the shell's gutter (`app-root`'s padding) to those 64 px — the demo as wide as in its frame, the screen still 360 px for its overlays. A demo wider than that is cut by its frame on a phone (a `w-80` trigger, 320 px). A full-page demo (`fullPage: true`) has the whole screen, as on its route.
- **Demos: their overlays on the screen.** Each trigger in the demo (`aria-haspopup`, `role="combobox"`; the first 8) is tapped; what opens (CDK's panes, an open `dialog`, a `:popover-open`) must be whole on the screen, both ways; then Escape (the page loaded again if it stays open). A combobox that opens only as you type opens nothing here.
- **Each element is measured, not the page's width.** The docs' `main` clips what passes its edge (`overflow-x-clip`): `scrollWidth` would say all is well while a table or a demo is cut off. An element fails when it passes the edge and no ancestor of its own scrolls or clips it — the page (`html`, `body`, the docs' `main`) doesn't count; a demo's `position: fixed` boxes (the screen's, not the demo's) are left out of its width.
- **What is wide on purpose passes**: a box that scrolls (a table, a code block, a menu's list) or a part that clips (a carousel's other slides, a marquee, a `clip-path`). And a drawer at a snap point (`data-snap-points`): the rest of it waits past the edge it slides from (its `data-swipe-direction`), as Base UI's `--drawer-snap-point-offset` puts it — that edge only, a drawer too wide still fails.
- **A grid with columns from a breakpoint declares its one column below it** (`grid grid-cols-1 sm:grid-cols-2`). Without it the grid has one implicit `auto` column on a phone, which grows to its content (a command, a table, a long word) instead of the screen: it fits on Windows and passes the edge on Linux's wider text. Read from the classes (`gridsWithoutColumn`), on pages and demos: the browser reports an implicit column's resolved width as it does a declared one's.
- **The failure names the culprits**: the outermost elements past the edge (tag, `data-slot`, classes, where they are and the edges they pass), and for an overlay the trigger's name.
- **Measured at rest**, as in `axe.ts`: network idle (not forever), fonts in, animations finished, then asked again for a few seconds (a masonry placing its items, a chart taking its width, an overlay finding its place).

### Limits, and the way forward

This layout is a step, not the end: the suite will grow (visual tests, more components, more style checks), and it will need reworking again. What we know:

- **Groups are balanced by hand.** Two styles per job, demos in two shards: fine at ~500–800 tests a job. When a group nears its 30 minutes, split it (`--shard=1/3`…) or move a project to its own job. Playwright's `--shard` balances by tests that run (skipped ones don't count), not by time.
- **Every test opens its own page.** A page load is the main cost (the app starts, then axe). Ideas, in order of gain:
  1. **One load, several checks**: the styles' class checks could read the examples already on the docs page that `styles/pages.spec.ts` loads, instead of opening each demo page — half the loads. Needs scoped locators (an example's container), and the demos that must be opened (a menu, a popover) handled apart.
  2. **Axe on what changes**: light and dark on every page in 8 styles is 16 axe runs a page; contrast is what changes between styles — a contrast-only run in 7 styles, the full run in one.
  3. **Shared pages per worker**: Playwright can keep one page per worker (a worker-scoped fixture) and navigate within the app instead of reloading — only for specs that don't depend on a fresh start (the style is read at start: one worker per style project).
- **Only the tests a change touches.** `nx affected` sees one project: a change to the Button runs every e2e test. Mapping changed files to specs (a component's folder → its demos, page and style specs) would run a fraction on pull requests, the whole suite on `main` and nightly.
- **Reports across jobs.** Each job uploads its own report on failure. Playwright's `blob` reporter and `merge-reports` would give one HTML report for a run.
- **Visual tests multiply.** Pages × styles × light/dark is thousands of images: start with a few pages and styles, references made on Linux (CI or Playwright's Docker image), their own CI job.

### Still to do

- **`mobile/`**: the folder exists (`reflow.spec.ts`); move the 87 `@mobile` tests out of the demos and page specs into it (55 of them sit inside `describe` blocks, with their `beforeEach`); then the `mobile` project is a folder like the others, not a tag.
- **More phone checks**: touch targets (axe's `target-size`, WCAG 2.2 2.5.8 — off in axe by default) on every route; a 320 px width (WCAG's reflow width).
- **Visual tests**: `@visual`, in `styles/` — see above.
- **The unit tests to port**: Vitest went on 2026-11-12 (`vitest`, `jsdom`, the showcase's `test` target and `tsconfig.spec.json`, CI's _Unit tests_ step) with its 64 tests, not yet in Playwright: `checkbox-group-form`, `field-errors`, `field-label`, `form-control-invalid`, `radio-form`, `text-control-form-state` (forms: a field's errors, its label, invalid states), `toaster`, `qr-code`, `intersection-observer`, `query-param-state` and `query-param-state-demo` — `apps/showcase/src/app/<name>.spec.ts` in git history (before the commit that removes them). Port what still matters as behaviour tests in `demos/`.
- **Measure**: the first CI runs give each group's time — the base for the next split.

## Server-side rendering (SSR)

Both apps are static by default; SSR is the `ssr` build configuration. The CI job `ssr` runs the e2e tests again against the app rendered on the server, then hydrated — plus `ssr.spec.ts` (every page hydrates) and a check of the server's log. It isn't a required check.

| Command                         | What runs                                                     | For                                   |
| ------------------------------- | ------------------------------------------------------------- | ------------------------------------- |
| `npx nx serve showcase`         | the dev server, static                                        | daily work                            |
| `npx nx serve showcase -c ssr`  | the dev server, with SSR (rebuilds as you edit)               | looking at SSR locally                |
| `npx nx run showcase:serve-ssr` | the built app on its Node server (`dist/…/server/server.mjs`) | CI's `ssr` job — what production runs |

The nightly workflow (`nightly-e2e.yml`) runs both ways — jobs `csr` and `ssr` — in the browsers CI doesn't (`ALL_BROWSERS`): Firefox and WebKit (`demos-firefox`, `pages-firefox`, `demos-webkit`, `pages-webkit`, the iPhone `mobile-webkit`), three shards each (2026-11-26: two ran near the 60-minute limit), all testing one build per mode (a `build` job, its `dist/apps/showcase` an artifact the shards download; on CI the file server runs `serve-static --excludeTaskDependencies`, so it serves that build without making its own); the pull requests' CI runs Chromium, every project.

`serve-ssr` needs a build first (`npx nx build showcase -c ssr`); with `SSR=1`, the Playwright config starts it instead of `serve-static`. Its log goes to `dist/ssr-showcase.log`.

**One spec locally, under SSR:** build, start the server on a free port, and point the tests at it (`BASE_URL` set, the config starts no server of its own). Restart the server after each rebuild.

```sh
npx nx build showcase --configuration=ssr
PORT=4400 node dist/apps/showcase/server/server.mjs   # in another terminal
SSR=1 BASE_URL=http://localhost:4400 npx playwright test -c apps/showcase-e2e/playwright.config.ts src/demos/spinner --project=demos --workers=1 --retries=0
```

What fails only here is mostly code that runs on the server without a browser (`matchMedia`, `window`), or a page drawn differently on the server than in the browser (a style or theme read from browser-only state, where hydration keeps the server's classes).

**A warning skipped under SSR: NG02952 on a fill image.** `console-clean.spec.ts` ignores NgOptimizedImage's "the height of the fill-mode image is zero" when `SSR` is set. The image was already loaded with the server's page, so Angular checks its height as the directive starts — during hydration, after the element's static `class` is written back and before the bindings add the rest (a carousel slide's `basis-full shrink-0`, a masonry item's `aspect-*`). Its box measures 0 for that moment; the page is right once hydrated. An Angular false positive, development mode only: [angular/angular#69636](https://github.com/angular/angular/issues/69636) (the same check, an image loaded before its view is attached). Without SSR the image loads later and the check stays on, so a fill image in a box with no height still fails there. Drop the exception once Angular fixes the check.

**Import `test` from `src/test.ts`,** not from `@playwright/test` (it re-exports the rest). In the SSR job its `page.goto` and `page.reload` wait until the page has hydrated — until `<html data-hydrated>`, which the `ssr` build's browser entry (`main-ssr.ts`) sets once the app is hydrated and stable (`ApplicationRef.whenStable()`; Angular has no "hydrated" event, only a dev-mode console message): a page drawn by the server is visible before Angular listens, and a fill or click in between is lost — or replayed. Without SSR, Playwright's own. Anything that must be in place before the app starts (`dir="rtl"`…) goes in `page.addInitScript`, not an `evaluate` after `goto`.

**Allowed hosts:** the built server answers only the hosts listed in the `ssr` configuration's `security.allowedHosts` (Angular's protection against server-side request forgery) — `localhost`, for the tests. Any other host gets `400 Bad Request` with "URL with hostname … is not allowed", and every test fails. The dev server skips this check, so it only shows up on the built server. A deployment adds its own domain to the list.

## Debugging Failures

1. **Run with UI mode:** `npx nx run showcase-e2e:e2e -- --ui`
2. **View report:** `npx playwright show-report dist/.playwright/apps/showcase-e2e/playwright-report`
3. **Traces** are collected on first retry automatically.

## Fixing Common Issues

- **Timeout:** The dev server may be slow to start. Check that the `showcase` app serves correctly on its own first (`npx nx run showcase:serve`).
- **Selector not found:** Inspect the page manually; component selectors use `[sc-*]` attributes (e.g., `button[scButton]`).
- **Flaky tests:** Use `await expect(...).toHaveText()` (auto-retrying) instead of raw `innerText()` checks.
- **Wrong base URL:** Override with `BASE_URL` env var if ports differ.

## Writing Tests

Tests live in the folder of their kind (see _Where a new test goes_): a demo's behaviour in `apps/showcase-e2e/src/demos/<component>/`. Import `test` and `expect` from `src/test.ts` (it sets the project's style, and waits for hydration under SSR), not from `@playwright/test`:

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

### Accessibility checks

Page-level only: `expectNoA11yViolations(page)` (`src/axe.ts`) runs axe on the settled page, then checks what axe doesn't — **orphaned labels** (WAVE's "Orphaned form label"): a `<label>` tied to no control. axe checks from the control's side (a control with no name), so a label naming nothing passed it. Tied means by `for` or by wrapping (`label.control`), or named by a custom control's `aria-labelledby`; a `for` that ties to nothing (a custom control, an id not there) fails even so. What is inert or disabled is left out, as axe leaves it. `ScField` ties its label itself: `for` and the control's `id` for a native control; for a custom one, which registers itself with the field, the control's `aria-labelledby` — and a `for` at the native element it names (a select's or a combobox's trigger button, a date or time input's first part), none where there is none (a listbox, a segmented control, a token input; a `for` at a segmented control's button would rename it). A rating's slider is a native range input, visually hidden. WAVE knows only `for` and wrapping, so it still lists those last ones as orphaned: the check accepts them. The check alone is in `pages/orphan-labels.spec.ts`.

It also checks **redundant links** (WAVE's "Redundant link"): two shown links in a row to one URL — two tab stops, read twice, for one place. Keep one link, or give a placeholder (`routerLink="."`) a fragment of its own (`fragment="danger-zone"`, `[fragment]="item.name"` in a loop); a link disabled at an end (Previous on the first page) has no `href`. Hidden links count too, as WAVE reads the HTML: one link per width, the other hidden, is two (the header's GitHub link is one link, its star count shown from 768px). Left out: links inert, and inside an editor (`contenteditable`: no tab stops). The check alone is in `pages/redundant-links.spec.ts`.

And **form labels** (WAVE's "Missing form label" and "Multiple form labels"): an input, a select or a textarea with no name — no label, `aria-label` or `aria-labelledby` — hidden ones too (axe skips them; WAVE reads the HTML), and one with more than one label. A hidden native control a part writes is named after what stands for it: a file input's picker by its trigger (`ScFileInput`), a tree item's checkbox by its item (`ScTreeItemCheckbox`), an app's own hidden file input by its button. A title above a control is a `<p>`, not a second label (the Customize page's Cover Art). The check alone is in `pages/form-labels.spec.ts`.

And **very small text** (WAVE's "Very small text"): visible text of 10px or less, `aria-hidden` text too. 11px (`text-[0.6875rem]`) is the floor, in the styles and the apps. Left out: what isn't shown, a drawing's text (SVG), and a PDF page's text layer (pdf.js: the document's words at its zoom). The check alone is in `pages/small-text.spec.ts`.

And **layout tables** (WAVE's "Layout table"): a `<table>` with no header cell. A table holds data, and data has column names: a header row, visually hidden (`<thead class="sr-only">`) if the look shows none (the Customize page's Recent Transactions). A grid with no column names to give is `div`s with ARIA roles (`grid`, `row`, `gridcell`), not a table: the Calendar's months and years views. The check alone is in `pages/layout-tables.spec.ts`.

And **suspicious link text** (WAVE's "Suspicious link text"): a link whose whole text, an `sr-only` part included, says nothing out of context ("Learn more", "click here", "Details"). Name where it goes, the extra words in an `sr-only` span if the look keeps it short ("Learn more <span class="sr-only">about projects</span>"). An example's name is a link too, in the page's contents: "Details" became "Collapsible changes". "Link" alone is flagged too: the site's lists of pages (sidebar, menus, palette, page nav) write the Link component's name with " component" for screen readers (`<span app-page-name>`), and examples are never named just "Link" ("As a link"). The check alone is in `pages/vague-links.spec.ts`.
