# E2E suite review (2026-11-16)

A review of `apps/showcase-e2e` at commit `54dbbae3e`: what is done well, what is wrong or risky, and what to do about it, in order of value.

**For the reviewer (Opus):** every count below comes from a `grep` or a short script over `apps/showcase-e2e/src`; the command or pattern is given so each claim can be rechecked. Findings marked **(verify)** are inferred from reading the code and were not reproduced as failures. Nothing in this review has been changed in the code.

## The suite in numbers

|                      | Files | Tests (approx.)                           | Lines  |
| -------------------- | ----- | ----------------------------------------- | ------ |
| `src/demos`          | 161   | 1,129                                     | 20,882 |
| `src/pages`          | 165   | 348 (+ ~1,300 generated in `ssr.spec.ts`) | 3,952  |
| `src/styles`         | 65    | 65 × 8 styles                             | 2,213  |
| helpers (`src/*.ts`) | 7     |                                           | 500    |

Playwright lists 3,422 tests for two projects alone; the nightly runs the suite in three engines, CSR and SSR.

## What is done well

1. **Tests check behaviour a user sees, by role.** 2,004 `getByRole` calls in 251 files against 700 `page.locator(`. Titles say the behaviour ("Sticky, Hides on Scroll: away going down, back going up"), not the implementation.
2. **Almost no hard waits.** 6 `waitForTimeout` in 391 files, and 4 of them carry a comment saying time itself is what is tested (a tooltip's grace period, a chart that must _not_ draw). 375 `expect.poll` in 145 files instead.
3. **No leftovers.** 0 `test.only`, 0 `fixme`. All 10 `test.skip` are conditional with a stated reason (clipboard read is Chromium-only, no Web Audio in the build, SSR job only).
4. **A clear structure.** One folder per kind of test, each a Playwright project (`demos`, `pages`, `presets-<name>`, `mobile`), documented in `docs/e2e-testing.md` with a "where a new test goes" table. The style is the project, not a loop in the spec.
5. **Shared helpers that encode real knowledge**, each with a comment saying why: `press` (paced keys for `@angular/aria`), `focus` (retries until focusable), `expectNoA11yViolations` (settles fonts and animations first), `expectTargetSize` (WCAG 2.5.8), `expectRtl` / `expectInlineOrder`, `expectHydrated`.
6. **Wide coverage per component**, beyond the happy path: axe in light and dark on every docs page, console errors (129 specs use `collectErrors`), RTL, phone width and target size (84 specs tagged `@mobile`), hydration of every route (`ssr.spec.ts` reads the routes files), all eight styles.
7. **Layout is measured the stable way.** 153 `toHaveCSS` and `getComputedStyle` reads, `openStill()` to switch transitions off, and a rule in CLAUDE.md to measure layout, not `getBoundingClientRect()`, on animated elements.
8. **The lint is set up for Playwright** (`eslint-plugin-playwright`, `expect-expect` taught the custom `expect…` helpers) and passes with 0 errors.
9. **CI is shaped around the suite**: named job groups instead of anonymous shards, the built app instead of the dev server, a nightly for Firefox and WebKit.

## What is wrong or risky

### 1. Reads that don't wait, right after `goto` — the main source of flakes

`evaluateAll`, `page.evaluate`, `count()`, `textContent()` and `boundingBox()` read the page **as it is now**; they are not retried like `expect(locator)`. The built app renders after `load`, so under load they read `[]`, `""` or a half-laid-out box. Five of the WebKit failures fixed on 2026-11-16 were exactly this (spinner, message, scheduler, bar-chart, navbar).

A script that looks for such a read between a `goto` and the first awaited `expect`/action finds **82 places in 51 files**, 81 of them in `demos/`. Examples:

- `demos/bar-chart/bar-chart-demos.spec.ts:266` — `evaluateAll` straight after `goto`
- `demos/avatar/avatar-demos.spec.ts:79` — three `box()` reads in a loop
- `demos/input-group/input-group-demos.spec.ts:54,63,78,161` — `box()` comparisons
- `demos/kbd/kbd-demos.spec.ts:31,42,51`

Not all 82 are equally risky **(verify)**: a single-element `locator.evaluate` or `boundingBox` waits for the element to be attached, so it fails only when read before styles, fonts or an entrance animation settle. The dangerous ones are `evaluateAll`, `count()` and `page.evaluate` (35 `evaluateAll` in 24 files, 28 `textContent()/count()/getAttribute()` style reads in 18 files), which wait for nothing.

**Fix:** assert first, then read (`await expect(items).toHaveCount(4)` before `evaluateAll`), or wrap the read in `expect.poll`. A lint rule would stop new ones — see recommendation 2.

### 2. The same boilerplate in over 100 files

| Repeated                                                                             | Where                                                                  | Should be                                          |
| ------------------------------------------------------------------------------------ | ---------------------------------------------------------------------- | -------------------------------------------------- |
| `let errors` + `beforeEach(collectErrors)` + `afterEach(expect(errors).toEqual([]))` | 103 files, 147 assertions                                              | an automatic fixture in `test.ts`                  |
| `async function expectClasses` copied locally                                        | 8 preset specs; only 1 imports the shared one from `presets/preset.ts` | the shared one                                     |
| `function framesOf`                                                                  | 3 chart specs, byte-identical                                          | a helper (`looks.ts`)                              |
| local `settled()`                                                                    | 5 specs                                                                | a helper                                           |
| the `sc-preset` cookie set by hand, with `baseURL ?? 'http://localhost:4200'`        | 11 specs, 13 hard-coded URLs                                           | `test.use({ preset: 'nova' })` as a fixture option |

The cost is real: the `framesOf` fix on 2026-11-16 had to be applied three times. Because the console check is opt-in, **33 of 161 demo specs have none**, and nobody decided that.

### 3. Timeouts are tuned by hand, test by test

35 explicit `timeout:` values in 25 files, 8 `test.slow()`, one `describe.configure`. Each was added after a failure on CI. The cause is general — Firefox and WebKit are 2–3× slower on a 4-core runner — and is now partly handled in one place (60 s for the `-firefox`/`-webkit` projects). The `expect` timeout is still the default 5 s for every engine, which is what most of the per-test `timeout: 10_000` work around **(verify)**.

### 4. Flaky tests are invisible

The nightly keeps 2 retries, so a test that fails once and passes on retry is reported as "flaky" and the job stays green. The runs of 2026-11-15 had 5 to 7 flaky tests each that nobody saw until the hard failures were investigated. A flaky test is a failing test with a delay.

### 5. Duplicate work (verify)

- Each docs page spec loads its page 3 or 4 times: axe light and axe dark are separate tests with separate loads (185 axe tests in `pages/`). `styles/pages.spec.ts` does both in one load.
- A visible page's axe in nova runs in the `pages` project **and** in `styles-nova` (`styles/pages.spec.ts`). The `pages` project also covers hidden pages and the other engines, so only the Chromium nova run of visible pages is a true duplicate.

With over 3,000 tests and CI jobs near their 30 minutes (per `docs/e2e-testing.md`), this is the cheapest time to win back.

### 6. Tests retried where the app may be at fault (verify)

Three fixes of 2026-11-16 retry the user's action with `toPass` because WebKit under load dropped it: a scroll key during a smooth scroll (message-scroller), a double-click's selection (editor bubble menu), a click's focus (editor). The tests now pass, but each hides a question about the component: does a real Safari user on a slow device lose that key or selection too? Not investigated.

### 7. Smaller points

- **60 lint warnings left standing**: 50 `no-non-null-assertion` (`(await x.boundingBox())!.x` — the `box()` helper exists for this), 4 `no-conditional-in-test`, 2 `no-wait-for-timeout` without a reason comment (`carousel-demos.spec.ts:145`, `sidebar-demos.spec.ts:189`).
- **487 `.first()` / `.nth()` / `.last()`** in 152 files and 472 `data-slot` selectors: fine for parts with no role, but worth a look where a role and name would do **(verify, sample only)**.
- **Long loops in one test**: 50 `for (const … of …)` loops, many of them `goto` per demo inside one `@mobile` test. One failure hides the rest, and the test's time grows with the list.
- **`networkidle`** in `axe.ts` and `console-clean.spec.ts` (the lint rule is switched off for it). Bounded to 10 s and caught, so it costs time, not correctness.
- **No visual tests** (`toHaveScreenshot`: 0). The docs list them as "coming"; class checks per style cover the look only indirectly.
- **`page.goto` is monkey-patched** in `test.ts` for SSR. It works, but a second `goto`-like path (`openStill`, `expectHydrated`) has to remember it. A `gotoReady` fixture would be explicit.

## Recommendations, in order of value

1. **Make the console check a fixture** in `test.ts` (automatic, with an opt-out for the few specs that expect an error). Removes the block from 103 files and covers the 33 specs without it.
2. **Stop unwaited reads**: fix the `evaluateAll` / `count()` / `page.evaluate` cases first (about 60), and add a lint rule (`no-restricted-syntax` on `evaluateAll`/`count` not inside `expect.poll`, or a small custom rule).
3. **Raise `expect.timeout` for Firefox and WebKit** in the config (for example 10 s), then delete the per-test `timeout:` values that only exist for that.
4. **Report flaky tests**: fail the nightly, or post the list, when the "flaky" count is not 0.
5. **Move the copies into helpers**: `framesOf`, `settled`, `expectClasses`, and a `preset` fixture option for the cookie.
6. **One load per page for axe** (light then dark in one test), and drop the nova duplicate between `pages` and `styles-nova` if it is confirmed.
7. **Clear the 60 lint warnings**, then turn warnings into errors for the e2e project so they stay at 0.
8. **Look at the three retried interactions in a real Safari** before treating them as test-only problems.

## How this was measured

```sh
cd apps/showcase-e2e
grep -rE '<pattern>' src --include=*.ts | wc -l          # each count above
npx eslint apps/showcase-e2e/src                          # 0 errors, 60 warnings (from the repo root)
ALL_BROWSERS=1 npx playwright test --list --project=pages --project=pages-webkit   # 3,422 tests
```

The "82 unwaited reads" script: for each `page.goto(` / `openStill(`, scan the next 14 lines; stop at the first `await expect`, `.poll(`, `.waitFor(`, an `expect…` helper or an action (`click`, `hover`, `fill`, `press`, `check`); report if a read (`evaluateAll(`, `.evaluate(`, `boundingBox()`, `box(`, `textContent()`, `count()`, `getAttribute(`, `corners(`, `computed(`) comes first. It is a heuristic: it misses reads later in a test and counts some safe single-element reads.
