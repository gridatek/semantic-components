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

| #   | Cause                                                                                                                                | Where                                                  | State                                                                                                                                                                                                                                                                                                                                                                              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | The audio demo's cover isn't marked `priority` (NG02955, dev mode)                                                                   | SSR, all 3 browsers                                    | **Fixed** after this commit (`priority` on the cover)                                                                                                                                                                                                                                                                                                                              |
| 2   | Firefox logs the cookies refused to an image from `github.com` (`shadcn.png`, the avatar demos) as console errors                    | SSR Firefox: avatar, menu (avatar), blocks gallery — 9 | **Fixed**: the SSR checks count only errors from our pages (`m.location().url` of our origin)                                                                                                                                                                                                                                                                                      |
| 3   | Compare, right to left: the init script waited for `<html>` to appear; in Firefox it is there already when the script runs           | Firefox, both jobs                                     | **Fixed**: `dir` set at once if `<html>` exists, else when it appears. Passes in Chromium, Firefox, WebKit                                                                                                                                                                                                                                                                         |
| 4   | Page axe tests timed out in `waitForLoadState('networkidle')`                                                                        | Firefox: calendar, UI, editor, lightbox pages          | **Fixed** in `axe.ts`: network idle capped at 10 s, then the page's `h1`, the fonts, and finite animations finished (3 s cap). All 140 page tests pass in Chromium; the 5 pages pass in all 3 browsers                                                                                                                                                                             |
| 5   | Color contrast measured mid-fade (intersection observer page)                                                                        | WebKit, static                                         | **Fixed** by the same `axe.ts` change (waits for animations)                                                                                                                                                                                                                                                                                                                       |
| 6   | **NG0950** — `Input "field" is required but no value is available yet` (input types demo: its `date` and `time` inputs — two errors) | SSR WebKit, rare                                       | **Angular's bug** — see below. Not reproduced locally (25 loads)                                                                                                                                                                                                                                                                                                                   |
| 7   | Masonry grid: the first row's items not laid side by side                                                                            | SSR WebKit                                             | **Fixed**: the items kept the server's classes. The server can't ask CSS for `grid-lanes`, so it renders our layout (items `absolute`); WebKit has native masonry, so the item's class became empty on hydration, and a class bound away while hydrating stays: absolute items, a grid 0 high. `absolute` is a selector now (`:not([data-native])`), the same on server and client |
| 8   | Tree: the Tab order and the focus ring                                                                                               | SSR WebKit                                             | **Fixed** with the ArrowDown bug below                                                                                                                                                                                                                                                                                                                                             |
| 9   | Editor: the floating toolbar not found once                                                                                          | SSR Chromium                                           | **Fixed**: the first selection placed it wrong — off the page by its scroll (the docs page: out of view), or at the edge. Floating UI measures the toolbar before the plugin makes it `fixed`, `max-content`; the toolbar has those classes from the start now. The test also selected before the typed text was in; its place is tested now, on a scrolled page too               |

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

## Second run — `static`

[Run 40077787027](https://github.com/gridatek/semantic-components/actions/runs/40077787027),
on `ed866729c`: 1 failed, 4 flaky, 2198 passed (18.9 m).

| Test                                             | Browser  | State                                                                                                                                                         |
| ------------------------------------------------ | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Disabled button: reduced opacity (failed 3 / 3)  | WebKit   | **Fixed**: the opacity fades in (`transition-all`), and WebKit reported 1 at its start. The test polls now — and so does the loading button's, the same check |
| Editor: the floating toolbar (#9)                | Chromium | Flaky again — no longer only under SSR                                                                                                                        |
| Tree: one tab stop (#8)                          | WebKit   | Flaky — also in `static`, not only SSR                                                                                                                        |
| Color picker swatches: → moves the focus to Cyan | WebKit   | Flaky — new                                                                                                                                                   |
| Scheduler: previous / next / today               | WebKit   | Flaky — new: "Previous" clicked, the title unchanged                                                                                                          |

## axe 4.14 — label in name

[CI run 40079291160](https://github.com/gridatek/semantic-components/actions/runs/40079291160):
`@axe-core/playwright` 4.14 turns on `label-content-name-mismatch` (WCAG
2.5.3, experimental before): the visible text must be part of the name.

- **Navbar GitHub link** — named "GitHub" by `aria-label`, showing the stars.
  **Fixed**: a `sr-only` "GitHub" inside instead, so the name holds both.
- **Org chart items** — named by their card (`aria-labelledby`), but axe
  counts as their visible text their reports (tree items of their own) and
  the `aria-hidden` avatar initials. The card stays the name — the same in
  every browser. **Skipped** in `axe.ts` for a tree item whose own text,
  without its group and its `aria-hidden` parts, is its label's.

Also, in that run's `ssr` job: editor "superscript and subscript exclude each
other" failed once (Chromium) — another editor flake beside #9.

## Third run — `ssr`

[Run 40083342485](https://github.com/gridatek/semantic-components/actions/runs/40083342485),
on `df3337c83`: `static` green; `ssr` 5 failed, 4628 passed — in **55.9 m**, of
its 60.

| Test                                                               | Browser  | State                                                                                                                                                                                                                       |
| ------------------------------------------------------------------ | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Editor page hydrates: `goto` timed out waiting for `load`          | Firefox  | **Fixed**: the SSR check waits for the HTML (`domcontentloaded`), then hydration — not every image and media file                                                                                                           |
| Audio waveform: duration 0                                         | WebKit   | **Fixed** (lib): loaded before hydration, no event comes, and `sync()` only registered an after-render hook — zoneless, nothing rendered. Now it asks for one (`markForCheck`). Same in the video player                    |
| Video captions: no Captions button (local, 1 in 6; not in the run) | WebKit   | **Fixed** (lib): the player stayed "before the first play" — `started` came from a read after the next render, which found it paused again. Set by the `play` event now. And tracks listed late are read again (`addtrack`) |
| Editor floating toolbar (#9)                                       | Chromium | Flaky, again                                                                                                                                                                                                                |
| Masonry (#7), tree (#8)                                            | WebKit   | Known, to investigate                                                                                                                                                                                                       |

## Tree — ArrowDown skips rows (WebKit) — fixed

Behind #8: logging the focus after each key, WebKit — static, no SSR — moved
**more than one row** for one ArrowDown in 4 of 10 loads (app → app.routes.ts,
src → app.ts, app → main.ts).

The cause: `@angular/aria` orders a tree's items by their place in the
document (`compareDocumentPosition`). Our `ScTreeItemGroup` projected its
items through `<ng-content>` inside the aria group's deferred template, so the
items of a group never opened existed (projected content is always created) but
stayed out of the DOM. Comparing a detached node is implementation-specific:
WebKit put those items at random, and the order of the attached ones around
them went wrong too (`logo.png, src, app…`). The group now projects its items
directly — a closed group already hides them (`invisible`, 0 high) — and keeps
the aria template only to create the aria group. The org chart's group had the
same pattern, fixed the same way. The tree's order matches the page in 20 of 20
loads; tree and org-chart specs pass ×3 in all three engines, static and SSR.

## Next

- Watch #9 in the next nightly runs.
- The `ssr` job's time (47 of 60 minutes): split per browser engine (three jobs side by side).
