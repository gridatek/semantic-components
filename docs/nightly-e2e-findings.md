# Nightly E2E — findings

The first nightly run with both jobs (`static`, `ssr`) in every browser:
[run 40059292144](https://github.com/gridatek/semantic-components/actions/runs/40059292144),
on commit `b586c9f91` — before the last fixes of the pull requests' CI (audio
player loop, PDF race, cover `priority`).

| Job      | Tests                       |  Failed | Flaky | Time |
| -------- | --------------------------- | ------: | ----: | ---: |
| `static` | 4647 showcase (+ 69 blocks) |       2 |     2 | 19 m |
| `ssr`    | 4647 showcase (+ 69 blocks) | 17 (+1) |     — | 47 m |

`static` skips 2444 tests: the SSR page checks (`ssr.spec.ts`), which need
`SSR=1`. `ssr` is close to its 60-minute limit.

## The failures, by cause

| #   | Cause                                                                                                                                | Where                                                  | State                                                                                                                                                                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1   | The audio demo's cover isn't marked `priority` (NG02955, dev mode)                                                                   | SSR, all 3 browsers                                    | **Fixed** after this commit (`priority` on the cover)                                                                                                                                                  |
| 2   | Firefox logs the cookies refused to an image from `github.com` (`shadcn.png`, the avatar demos) as console errors                    | SSR Firefox: avatar, menu (avatar), blocks gallery — 9 | **Fixed**: the SSR checks count only errors from our pages (`m.location().url` of our origin)                                                                                                          |
| 3   | Compare, right to left: the init script waited for `<html>` to appear; in Firefox it is there already when the script runs           | Firefox, both jobs                                     | **Fixed**: `dir` set at once if `<html>` exists, else when it appears. Passes in Chromium, Firefox, WebKit                                                                                             |
| 4   | Page axe tests timed out in `waitForLoadState('networkidle')`                                                                        | Firefox: calendar, UI, editor, lightbox pages          | **Fixed** in `axe.ts`: network idle capped at 10 s, then the page's `h1`, the fonts, and finite animations finished (3 s cap). All 140 page tests pass in Chromium; the 5 pages pass in all 3 browsers |
| 5   | Color contrast measured mid-fade (intersection observer page)                                                                        | WebKit, static                                         | **Fixed** by the same `axe.ts` change (waits for animations)                                                                                                                                           |
| 6   | **NG0950** — `Input "field" is required but no value is available yet` (input types demo: its `date` and `time` inputs — two errors) | SSR WebKit, rare                                       | **Angular's bug** — see below. Not reproduced locally (25 loads)                                                                                                                                       |
| 7   | Masonry grid: the first row's items not laid side by side                                                                            | SSR WebKit                                             | **Reproduced** locally (3 / 3) — to investigate                                                                                                                                                        |
| 8   | Tree: the Tab order and the focus ring                                                                                               | SSR WebKit                                             | **Reproduced** locally — to investigate                                                                                                                                                                |
| 9   | Editor: the floating toolbar not found once                                                                                          | SSR Chromium                                           | Passes locally (3 / 3, SSR, Chromium and WebKit) — a flake so far                                                                                                                                      |

Flaky in `static` (passed on retry): one test in Firefox, one in WebKit.

## #6 — NG0950, in Angular's Signal Forms

For `date`, `time`, `datetime-local`, `month` and `week` inputs, `FormField`
watches validity with a CSS animation: it injects a style that runs a tiny
`ng-valid` / `ng-invalid` animation on `:valid` / `:invalid`, and listens to
`animationstart` (`watchValidity`, in `@angular/forms` `signals.mjs`). That
listener is attached when the control is created — before `[formField]` has
its value — and its callback reads the field (`parent.state()` → `field()`).

On the static app the input is created and bound in one pass. When hydration
takes over an input already in the page (as the server sent it), the
animation can start before the input is set: NG0950, once per input.

Known upstream, by a sibling of the same cause:

- [angular#69632](https://github.com/angular/angular/issues/69632) (open) —
  `<input type="date">` with `[formField]` starts dirty: the validity
  animation fires on render.
- [angular#70594](https://github.com/angular/angular/pull/70594) (open) — its
  fix: the `animationstart` callback returns early when the DOM still holds
  what was written (a render, not an edit), so it no longer reads the field
  there — which should end our NG0950 too.
- [angular#65678](https://github.com/angular/angular/issues/65678) (closed) —
  the same NG0950 from the `<select>` observer firing too early.

Nothing to change on our side; update Angular once #70594 is released.

## Next

- #7 and #8: find why WebKit lays out the masonry grid and wires the tree's
  focus differently when the page is hydrated.
- Watch #9 in the next nightly runs.
- The `ssr` job's time (47 of 60 minutes).
