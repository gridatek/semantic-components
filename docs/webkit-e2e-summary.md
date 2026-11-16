# WebKit e2e: what failed, why, and the fixes (2026-11-16)

The **Nightly E2E** (`nightly-e2e.yml`) runs the showcase's e2e suite in Firefox and WebKit, CSR and SSR. Its WebKit jobs failed every night; Firefox passed. This is what was found and changed. How to run and fix these tests is in the skill [`.claude/skills/e2e-webkit/SKILL.md`](../.claude/skills/e2e-webkit/SKILL.md).

## Result

Run locally in WebKit (Playwright 1.64.1's Ubuntu image, in podman) against the **production build**, as CI does:

| Project                     | CSR                | SSR                                                              |
| --------------------------- | ------------------ | ---------------------------------------------------------------- |
| `demos-webkit`              | all pass (6 parts) | all pass (6 parts)                                               |
| `pages-webkit`              | all pass (4 parts) | all pass¹ (4 parts, `ssr.spec.ts` included: every page hydrates) |
| `mobile-webkit` (iPhone 14) | all pass           | 86 / 86                                                          |

¹ Three failed only because typography was removed while the run went on ("Test not found", "Cannot find module").

Changed specs were repeated (`--repeat-each` 3–10) in WebKit and Chromium, and Firefox when touched. **Still to confirm on CI**: the last nightly (run 43809275505) tested `b8f05a6e3`, before most of these fixes — start one with `gh workflow run nightly-e2e.yml`.

## What was wrong

Nearly everything has one cause: **WebKit under load is slow, and its clock lags.** A test that reads too early, or acts before the page is ready, passes in Chromium and fails in WebKit. Few were bugs in the app.

### In the test helpers (every spec benefits)

| File                   | Failure                                                                                                          | Fix                                                                                                                                                                                                  |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `src/axe.ts`           | axe `color-contrast` in dark mode: the light theme's text (`#0a0a0a`) on the dark background                     | It waited only for the animations it saw first; WebKit starts some theme transitions late and runs them slowly. Now it asks again until none runs, and `finish()`es what's left at its 3 s deadline. |
| `src/mobile.ts`        | `TypeError: Importing a module script failed` (accordion, badge, code-block…); overflow checks that never failed | `expectNoHorizontalScroll` measured before the demo rendered (an empty page fits), and the next `goto` cancelled its chunk. It now waits for the routed component.                                   |
| `playwright.config.ts` | Docs pages' axe tests over 30 s in Firefox and WebKit on CI's 4 cores (10–30 s on a 12-core machine)             | The `-firefox` and `-webkit` projects: 60 s.                                                                                                                                                         |

### In the specs

| Spec                                                       | Failure                                                         | Fix                                                                                                                                                                                                                                             |
| ---------------------------------------------------------- | --------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `pages/presets.spec.ts`                                    | The page not shown in time; tests frozen past 90 s              | The largest page. Waits of 30 s, `test.slow()` in Firefox and WebKit (in a `beforeEach`: at the describe level it doesn't triple the timeout), and `describe.configure({ mode: 'default' })`: one at a time — four copies at once froze WebKit. |
| `demos/spinner`, `demos/message`, `demos/scheduler`        | `[]`, `0`, `""`                                                 | `evaluateAll` / `textContent` don't wait, and the built app renders after `load`: wait for the content first.                                                                                                                                   |
| `demos/bar-chart` (stacked)                                | `Cannot read properties of undefined`; geometry read mid-growth | A throw ends a poll: guarded. The bars' geometry polled (a `requestAnimationFrame` animation, not a CSS one).                                                                                                                                   |
| `demos/area-chart`, `bar-chart`, `line-chart` (`framesOf`) | 1 frame seen                                                    | The 900 ms window now starts at the first change (up to 3 s waited).                                                                                                                                                                            |
| `demos/message-scroller`                                   | Home did nothing (1 in ~16)                                     | WebKit drops a scroll key during a running smooth scroll: pressed again (`toPass`).                                                                                                                                                             |
| `demos/editor/bubble-menu-editor-demo`                     | No toolbar after the double-click                               | Under load the selection is lost (the editor's late focus): double-click again. Waits for the menu's plugin; for the focus before typing (that one also fixed a Chromium flake).                                                                |
| `demos/navbar` (Hides on Scroll, SSR)                      | Didn't come back on scrolling up                                | WebKit's wheel scroll down was still running: wait until `scrollY` settles.                                                                                                                                                                     |

### In the app

| File                               | Failure                                                        | Fix                                                                                                                                                                                                                                                                                                                                            |
| ---------------------------------- | -------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `app.ts`, `routes/demos-routes.ts` | 1 px sideways scroll on the iPhone (input-group's button demo) | Not WebKit: the iPhone 14 is 390 px wide (the Pixel 7: 412). Standalone demo pages had no side margin, and shadcn's addon margin (`me-[-0.3rem]`) reaches 3.8 px past its group. `/demos/…` pages now have a gutter (`px-4`), except the 26 full-page ones (navbar, sidebar, layouts — framed at the docs), marked `data: { fullPage: true }`. |

## How to reproduce (Fedora)

WebKit doesn't run on Fedora (it needs Ubuntu 24.04's libraries): run Playwright's image in podman, against the build CI tests — not the dev server, which gives false failures (Vite's many modules, HMR imports).

```sh
npx nx build showcase && npx nx run showcase:serve-static     # CSR, :4200
# SSR: npx nx build showcase --configuration=ssr && PORT=4200 node dist/apps/showcase/server/server.mjs, and -e SSR=1
podman run --rm --network host --ipc host --userns keep-id --security-opt label=disable \
  -v $PWD:$PWD -w $PWD/apps/showcase-e2e -e ALL_BROWSERS=1 -e HOME=/tmp \
  mcr.microsoft.com/playwright:v1.64.1-noble \
  npx playwright test src/demos/foo/ --project=demos-webkit --workers=2 --retries=0 --reporter=line
```

On a 16 GB machine: one server at a time, no build while browsers run, 2 workers, the suite in parts.

## Left open

- **Firefox, locally only**: message-scroller's "Animating new messages" ends 2 px short of the end in the container (passes on CI) — likely the image's fonts. Not chased.
- `.claude/settings.local.json` is tracked in git; it's usually a personal, ignored file.
