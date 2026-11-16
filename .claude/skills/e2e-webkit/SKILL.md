---
name: e2e-webkit
description: Run, reproduce and fix the showcase's e2e tests in WebKit (and Firefox) — the Nightly E2E's browsers. Use when a nightly-e2e.yml job fails, when a test passes in Chromium but not in WebKit/Firefox, or when asked to run the tests in Safari/WebKit locally (Fedora: in podman).
---

# E2E in WebKit

CI runs Chromium (`ci.yml`); **Firefox and WebKit run only in `nightly-e2e.yml`** (`ALL_BROWSERS=1`: the `demos-firefox`, `pages-firefox`, `demos-webkit`, `pages-webkit` and iPhone `mobile-webkit` projects), CSR and SSR, two shards each, 4 workers, 2 retries. See [docs/e2e-testing.md](../../../docs/e2e-testing.md) for the suite itself.

## 1. Read the failure on CI

```sh
gh run list --workflow nightly-e2e.yml --limit 5
gh run view <run> --json jobs -q '.jobs[] | "\(.databaseId) \(.conclusion) \(.name)"'
gh run view <run> --job <job-id> --log-failed > job.log
# failed and flaky tests, then each one's error:
sed -E 's/^[^\t]*\t[^\t]*\t[^ ]+ //' job.log | awk '/^ +[0-9]+ (failed|flaky)$/{p=1} p&&/›/'
```

Check which commit the run tested (`headSha`) against what is already fixed.

Tell apart:

- **A real failure** — an assertion with a value (`Received: 1`, a class, a colour).
- **Load** — `Test timeout of 30000ms exceeded`, `Target page, context or browser has been closed`, `element(s) not found` on a heavy page. CI's runner has 4 cores; Firefox and WebKit are 2–3× slower than Chromium there.

## 2. Run WebKit locally

**Test the build CI tests, not the dev server.** The dev server (Vite: hundreds of modules, Angular's HMR imports `/@ng/component?c=…`) is slower and different: it gives WebKit failures CI doesn't have (`TypeError: Importing a module script failed` under load) and hides races CI has (its build renders faster).

| CI job | Locally                                                                                                                            |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------- |
| `csr`  | `npx nx build showcase`, then `npx nx run showcase:serve-static` (port 4200)                                                       |
| `ssr`  | `npx nx build showcase --configuration=ssr`, then `PORT=4200 node dist/apps/showcase/server/server.mjs`, and `SSR=1` for the tests |

Rebuild after a change to the app; a change to a spec needs no rebuild. Playwright's `webServer` always looks at **:4200** (`reuseExistingServer`): put the server you test there, or it starts its own.

**Fedora (or any non-Ubuntu Linux): WebKit runs in podman.** Playwright's WebKit is built for Ubuntu 24.04 and needs its libraries (libicu74, libjpeg8, libjxl0.8, libmanette…); `playwright install --with-deps` is apt-only. Use Playwright's image, at the version of `@playwright/test` in package.json:

```sh
podman run --rm --network host --ipc host --userns keep-id --security-opt label=disable \
  -v $PWD:$PWD -w $PWD/apps/showcase-e2e -e ALL_BROWSERS=1 -e HOME=/tmp \
  mcr.microsoft.com/playwright:v1.64.1-noble \
  npx playwright test src/demos/foo/ --project=demos-webkit --workers=2 --retries=0 --reporter=line
# SSR: add -e SSR=1
```

- `--network host`: the container reaches the server on the host's :4200. `--userns keep-id` + `label=disable`: files it writes (`dist/.playwright`) are yours, no SELinux relabelling of the repo.
- **Memory** (a 16 GB machine): one app server at a time (stop the dev server first), never a build while browsers run, `--workers=2`. Reproduce CI's load with `--repeat-each=3`, not more workers.
- **In parts**: a folder list per run (`src/demos/a/ src/demos/b/ …`, trailing slash: `src/demos/message` also matches `message-scroller`), never the whole suite at once. A Bash call stops at 10 minutes: run long parts in the background.
- A failure that only comes with `--repeat-each` or beside other specs is load; one that comes alone is a bug.

## 3. What breaks in WebKit, and the fix

Each was found on this suite (2026-11). The common cause: **WebKit under load is slow and lags**, and a test that reads too early or acts too fast passes in Chromium.

| Symptom                                                                               | Cause                                                                                                                        | Fix                                                                                                                                                                          |
| ------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `evaluate` / `evaluateAll` / `textContent()` reads `[]`, `0`, `""` right after `goto` | They don't wait; the built app renders **after** `load`                                                                      | Wait for the content first: `await expect(locator).toHaveCount(n)` / `toBeVisible()` / `toHaveText(/…/)`                                                                     |
| `expect.poll` throws `Cannot read properties of undefined`                            | A throw ends a poll (it isn't retried)                                                                                       | Guard inside: `desktop[i]?.top ?? Infinity` — return a wrong value, not an error                                                                                             |
| axe `color-contrast`: the light theme's text on the dark one's background             | WebKit starts a theme switch's transitions late, and its clock lags (a 150 ms transition lasting seconds)                    | `axe.ts`: re-query `document.getAnimations()` until none runs, `finish()` what's left at the deadline                                                                        |
| A frame-by-frame check (`framesOf`) sees 1 value                                      | The animation started after the sampling window                                                                              | Start the window at the first change                                                                                                                                         |
| A geometry read mid-animation (bars, charts)                                          | `requestAnimationFrame` animations aren't CSS animations: no `settled()` waits for them                                      | `expect.poll` the final geometry                                                                                                                                             |
| A key or a double-click "does nothing" (1 in ~10)                                     | WebKit drops a scroll key during a running smooth scroll; an editor's late focus handling drops the double-click's selection | `await expect(async () => { action; await expect(result).toBe…({ timeout: 2000 }) }).toPass()` — the user would retry too; the check still holds                             |
| Keys typed right after a click into an editor are lost                                | The editor takes the focus late                                                                                              | `await expect(editor).toBeFocused()` before typing                                                                                                                           |
| The selection made before the bubble menu listens                                     | Its plugin registers in an effect, after the editor shows                                                                    | Wait for its sign (the toolbar leaves the demo) before selecting                                                                                                             |
| Scroll up right after a scroll down doesn't count                                     | WebKit's wheel scroll is still running down                                                                                  | Wait until `scrollY` stops changing                                                                                                                                          |
| "Importing a module script failed" in the console                                     | The next `goto` cancels a lazy chunk still loading (WebKit logs it; Chromium doesn't)                                        | Measure only once the route rendered (`app-root > router-outlet + :not(app-command-palette)`), as `expectNoHorizontalScroll` does                                            |
| 1 px sideways scroll on `mobile-webkit` only                                          | The iPhone 14 is 390 px (Pixel 7: 412): less room, not a WebKit bug                                                          | Find the element past the edge (`getBoundingClientRect().right > clientWidth`); the demo pages have a gutter (`px-4`, `app.ts`; full-page demos: `data: { fullPage: true }`) |
| Timeouts on a heavy page (`/presets`), the page frozen                                | Several copies at once: `fullyParallel` is on (Nx's preset)                                                                  | `test.describe.configure({ mode: 'default' })` — one worker, in order, a failure doesn't skip the rest                                                                       |
| A docs page's axe test over 30 s in Firefox/WebKit                                    | Big page, 4 cores                                                                                                            | The `-firefox`/`-webkit` projects have 60 s (`playwright.config.ts`)                                                                                                         |

Playwright traps:

- `test.slow(({ browserName }) => …)` **at the describe level** marks the test slow without tripling its timeout — and then a `test.slow()` in the test does nothing. Use `test.beforeEach(({ browserName }) => test.slow(browserName !== 'chromium'))`.
- `plot.waitFor()` waits for **visible**: an element shown only once scrolled to never is. Wait for `{ state: 'attached' }`, then scroll.

## 4. Before saying it's fixed

- The spec, in WebKit **and** Chromium (and Firefox if touched), `--repeat-each=3` or more, CSR and SSR.
- Lint the changed specs (`npx eslint <files>`).
- Don't weaken the check: wait for the right moment, retry the user's action — not a looser assertion or a bigger tolerance.
- Confirm on CI: `gh workflow run nightly-e2e.yml`, then `gh run watch`.
