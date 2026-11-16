# E2E suite review (2026-11-16)

A review of `apps/showcase-e2e`: what is done well, what is wrong or risky, and what to do about it, in order of value. First written at commit `54dbbae3e`, then checked and corrected at `ee3130826` (the first all-green Nightly E2E, run 43884598710). Nothing in this review has been changed in the code.

Every count comes from a `grep` or a short script over `apps/showcase-e2e/src` (see _How this was measured_). Where the first version was wrong, the correction says so.

## The suite in numbers

|                      | Files | Tests (approx.)                           | Lines  |
| -------------------- | ----- | ----------------------------------------- | ------ |
| `src/demos`          | 161   | 1,129                                     | 20,882 |
| `src/pages`          | 165   | 348 (+ ~1,300 generated in `ssr.spec.ts`) | 3,952  |
| `src/presets`        | 65    | 65 × 8 presets                            | 2,213  |
| helpers (`src/*.ts`) | 7     |                                           | 500    |

Playwright lists 3,422 tests for two projects alone; the nightly runs the suite in Firefox and WebKit, CSR and SSR, and CI runs it in Chromium.

## What is done well

1. **Tests check behaviour a user sees, by role.** 2,004 `getByRole` calls in 251 files against 700 `page.locator(`. Titles say the behaviour ("Sticky, Hides on Scroll: away going down, back going up"), not the implementation.
2. **Almost no hard waits.** 6 `waitForTimeout` in 391 files, and 4 of them carry a comment saying time itself is what is tested (a tooltip's grace period, a chart that must _not_ draw). 375 `expect.poll` in 145 files instead.
3. **No leftovers.** 0 `test.only`, 0 `fixme`. All 10 `test.skip` are conditional with a stated reason (clipboard read is Chromium-only, no Web Audio in the build, SSR job only).
4. **A clear structure.** One folder per kind of test, each a Playwright project (`demos`, `pages`, `presets-<name>`, `mobile`), documented in `docs/e2e-testing.md` with a "where a new test goes" table. The preset is the project, not a loop in the spec.
5. **Shared helpers that encode real knowledge**, each with a comment saying why: `press` (paced keys for `@angular/aria`), `focus` (retries until focusable), `expectNoA11yViolations` (settles fonts and animations first), `expectTargetSize` (WCAG 2.5.8), `expectRtl` / `expectInlineOrder`, `expectHydrated`.
6. **Wide coverage per component**, beyond the happy path: axe in light and dark on every docs page, console errors (129 specs use `collectErrors`), RTL, phone width and target size (84 specs tagged `@mobile`), hydration of every route (`ssr.spec.ts` reads the routes files), all eight presets.
7. **Layout is measured the stable way.** 153 `toHaveCSS` and `getComputedStyle` reads, `openStill()` to switch transitions off, and a rule in CLAUDE.md to measure layout, not `getBoundingClientRect()`, on animated elements.
8. **The lint is set up for Playwright** (`eslint-plugin-playwright`, `expect-expect` taught the custom `expect…` helpers) and passes with 0 errors.
9. **CI is shaped around the suite**: named job groups instead of anonymous shards, the built app instead of the dev server, a nightly for Firefox and WebKit.

## What is wrong or risky

### 1. Flaky tests are invisible

The nightly keeps 2 retries, so a test that fails once and passes on retry is reported as "flaky" and the job stays green. The runs of 2026-11-15 had 5 to 7 flaky tests each that nobody saw until the hard failures were investigated. A flaky test is a failing test with a delay.

It is cheap to fix: Playwright (1.64, the version here) has a `failOnFlakyTests` option — one line in the config for the nightly. Listing them in the job summary first is a gentler start.

### 2. The same boilerplate in over 100 files — and a gap in what it checks

| Repeated                                                                             | Where                                                                  | Should be                                          |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------- |
| `let errors` + `beforeEach(collectErrors)` + `afterEach(expect(errors).toEqual([]))` | 103 files, 147 assertions                                              | an automatic fixture in `test.ts`                  |
| `async function expectClasses` copied locally                                        | 8 preset specs; only 1 imports the shared one from `presets/preset.ts` | the shared one                                     |
| `function framesOf`                                                                  | 3 chart specs, byte-identical                                          | a helper (`looks.ts`)                              |
| local `settled()`                                                                    | 5 specs                                                                | a helper                                           |
| the `sc-preset` cookie set by hand, with `baseURL ?? 'http://localhost:4200'`        | 11 specs, 13 hard-coded URLs                                           | `test.use({ preset: 'nova' })` as a fixture option |

The cost is real: the `framesOf` fix on 2026-11-16 had to be applied three times. Because the console check is opt-in, **33 of 161 demo specs have none**, and nobody decided that.

**The gap (missing from the first version):** `collectErrors` records console **errors** only. Warnings are checked only on docs pages (`console-clean.spec.ts`), and on demo routes only when they arrive as errors during SSR hydration (`expectHydrated`). This is how removing `priority` from the item demos broke the nightly on 2026-11-16: Angular's `NG02955` on the demo route was caught only by `ssr.spec.ts` in Firefox. The fixture should decide a policy for Angular's `NG0…` warnings too.

### 3. A few reads that don't wait, right after `goto`

`evaluateAll`, `page.evaluate` and `count()` read the page **as it is now** and wait for nothing. The built app renders after `load`, so right after `goto` they can read `[]` or `0`. Four of the WebKit failures fixed on 2026-11-16 were this kind (spinner, message, scheduler — `textContent()` on an element still empty — and bar-chart).

**Corrected:** the first version counted 82 such reads and asked to fix "about 60". That was about ten times too many. Of the 82 reads found between a `goto` and the first `expect` or action, 73 are single-element reads (`box()`, `boundingBox()`, `locator.evaluate`), which **do** wait for their element. Only 9 wait for nothing:

| Read                                                                                                                                                                                              | Verdict                                                                                 |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| `demos/timeline/timeline-demos.spec.ts:65` — `evaluateAll` on the markers, then `expect(new Set(xs).size).toBe(1)`                                                                                | **Risky**: not drawn yet → `[]` → size 0 → fails                                        |
| `demos/line-chart/line-chart-demos.spec.ts:151` — samples the line for 800 ms from `goto`                                                                                                         | **Risky**: the same late start `framesOf` had (fixed there, not here)                   |
| `demos/tags-input/tags-input-demos.spec.ts:116`, `demos/timeline/timeline-demos.spec.ts:90`, `demos/virtual-list/virtual-list-demos.spec.ts:131` — set `dir="rtl"` on `<html>` right after `goto` | **To check**: may race with the app's own start-up                                      |
| `demos/bar-chart/bar-chart-demos.spec.ts:266`, `demos/command/command-demos.spec.ts:162`, `demos/link/link-demos.spec.ts:84`, `demos/resizable/resizable-demos.spec.ts:112`                       | Safe: inside a poll, `navigator.userAgent`, a flag on `window`, clearing `localStorage` |

**Fix:** the two risky ones (assert first — `await expect(markers).toHaveCount(n)` — or `expect.poll`), check the three RTL ones, and a lint rule (`no-restricted-syntax`) against `evaluateAll` / `count()` outside an `expect.poll` so new ones don't come.

### 4. Timeouts are tuned by hand, test by test

34 explicit `timeout:` values in 25 files, 8 `test.slow()`, one `describe.configure`. The cause is general — Firefox and WebKit are 2–3× slower on a 4-core runner — and is now partly handled in one place (60 s for the `-firefox`/`-webkit` projects). The `expect` timeout is still the default 5 s for every engine.

A per-project `expect: { timeout }` is supported. **Corrected:** the gain is smaller than the first version implied — of the 34, only 9 are the `10_000` kind it would replace; 8 are deliberately short (100–500 ms, 2–6 s: checks that something does _not_ happen in time), and the others (15–30 s) are genuinely slow operations (a reload, a PDF).

### 5. Duplicate work

- Each docs page spec loads its page 3 or 4 times: axe light and axe dark are separate tests with separate loads (185 axe tests in `pages/`). `presets/pages.spec.ts` does both in one load.
- A visible page's axe in nova runs in the `pages` project **and** in `presets-nova` — in Chromium, in `ci.yml` only (the nightly doesn't run the presets projects).

Merging light and dark into one test saves loads but loses the clear "dark mode failed" test name: worth it only if CI time gets tight (`docs/e2e-testing.md`: jobs near their 30 minutes).

### 6. Interactions retried where the app may be at fault

Two fixes of 2026-11-16 retry the user's action with `toPass` because WebKit under load dropped it: a scroll key during a smooth scroll (message-scroller: Home, End) and a double-click's selection (editor bubble menu). The tests pass, but each hides a question about the component: does a real Safari user on a slow device lose that key or selection too? Not investigated. **Corrected:** the first version listed a third, the editor's focus — that fix waits (`toBeFocused()`), it doesn't retry.

### 7. Smaller points

- **60 lint warnings left standing**: 50 `no-non-null-assertion` (`(await x.boundingBox())!.x` — the `box()` helper exists for this), 4 `no-conditional-in-test`, 2 `no-wait-for-timeout` without a reason comment (`carousel-demos.spec.ts:145`, `sidebar-demos.spec.ts:189`).
- **487 `.first()` / `.nth()` / `.last()`** in 152 files and 472 `data-slot` selectors: fine for parts with no role, but worth a look where a role and name would do (sample only).
- **Long loops in one test**: 50 `for (const … of …)` loops, many of them a `goto` per demo inside one `@mobile` test. One failure hides the rest, and the failure doesn't say which demo. Splitting them costs a page load each; wrapping each item in `test.step(name)` names the failing demo for free.
- **`networkidle`** in `axe.ts` and `console-clean.spec.ts` (the lint rule is switched off for it). Bounded to 10 s and caught, so it costs time, not correctness.
- **No visual tests** (`toHaveScreenshot`: 0). The docs list them as "coming"; class checks per preset cover the look only indirectly.
- _Dropped from the first version:_ "`page.goto` is monkey-patched in `test.ts`, so `openStill` and `expectHydrated` must remember it". They call `page.goto`, so they get the patch by themselves.

## Recommendations, in order of value

1. **Report flaky tests**: `failOnFlakyTests` for the nightly, or a list in the job summary first.
2. **Make the console check a fixture** in `test.ts`: automatic, with an opt-out for the few specs that expect an error, and a policy for Angular's `NG0…` warnings. Removes the block from 103 files and covers the 33 specs without it.
3. **Fix the two risky reads** (`timeline:65`, `line-chart:151`), check the three RTL ones, and add a lint rule against `evaluateAll` / `count()` outside `expect.poll`.
4. **Raise `expect.timeout` for Firefox and WebKit** in the config (for example 10 s), then delete the 9 per-test `10_000` values that only exist for that.
5. **Move the copies into helpers**: `framesOf`, `settled`, `expectClasses`, and a `preset` fixture option for the cookie.
6. **Clear the 60 lint warnings**, then turn warnings into errors for the e2e project so they stay at 0.
7. **One load per page for axe** (light then dark in one test), and drop the nova duplicate between `pages` and `presets-nova` — only if CI time demands it.
8. **Try the two retried interactions in a real Safari** before treating them as test-only problems.

## How this was measured

```sh
cd apps/showcase-e2e
grep -rE '<pattern>' src --include=*.ts | wc -l          # each count above
npx eslint apps/showcase-e2e/src                          # 0 errors, 60 warnings (from the repo root)
ALL_BROWSERS=1 npx playwright test --list --project=pages --project=pages-webkit   # 3,422 tests
grep -rhoE "timeout: [0-9_]+" src --include=*.spec.ts | sort | uniq -c             # the 34 timeouts
grep -c failOnFlakyTests ../../node_modules/playwright/types/test.d.ts             # the option exists
```

The reads after `goto` (finding 3): for each `page.goto(` / `openStill(`, scan the next 14 lines; stop at the first `await expect`, `.poll(`, `.waitFor(`, an `expect…` helper or an action (`click`, `hover`, `fill`, `press`, `check`); record the first read (`evaluateAll(`, `page.evaluate(`, `count()`, `.evaluate(`, `boundingBox()`, `box(`, `textContent()`, `getAttribute(`, `computed(`). By kind: 38 `box(`, 20 `.evaluate(`, 12 `boundingBox()`, 7 `page.evaluate(`, 2 `evaluateAll(`, 2 `getAttribute(`, 1 `computed(`. The 9 that wait for nothing were then read one by one. It is a heuristic: it misses reads later in a test.
