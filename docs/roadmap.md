# Roadmap

Every component brought to the same bar: shadcn's look, tested, mobile first, right to left, in light and dark, rendered on the server. One component at a time, from the building blocks up — atomic design: a component comes after the ones it is built on (its imports, **Built on**), as design-system roadmaps do (foundations, then buttons and inputs, then form controls, then overlays and complex widgets). In a phase: ui, then code / charts / editor, each from the smallest (**Size**: lines of its own TypeScript). Each row ticked when it meets the definition of done.

Inventory (131 components): 58 with a shadcn counterpart · 76 with e2e demo tests · 131 with a page axe test · 0 with an RTL demo.

## Why this order

Design systems are built from the bottom up — **atomic design**: atoms first (buttons, links, labels, inputs), then molecules that combine them (a search field: label, input, button), then organisms (headers, forms). A change to an atom flows into everything built on it, so the atoms are settled first ([UX Collective](https://bootcamp.uxdesign.cc/building-design-systems-with-atomic-design-fd21e86f34c5), [designsystems.surf](https://designsystems.surf/guides/atomic-design), [atomic design principles](https://mohammadshehadeh.com/react/atomic-design-principles)).

Design-system roadmaps follow the same line: foundations (color, type, spacing), then buttons, links and inputs — the core interactions — then form controls (checkbox, radio, select, switch), then overlays and complex widgets (dialogs, toasts, date pickers) ([Netguru](https://www.netguru.com/blog/design-system-roadmap), [okoone](https://www.okoone.com/spark/product-design-research/how-to-build-a-design-system-roadmap-that-teams-actually-use/), [zeroheight](https://zeroheight.com/help/guides/how-to-prioritize-your-components/), [Design Systems Collective](https://www.designsystemscollective.com/how-to-actually-create-a-design-system-step-by-step-ae0ce26af79e)). Our foundations — the theme, from shadcn — are in place.

Here the levels are not judged but **computed from the code**: a component's level is one more than the highest level among the components it imports (**Built on**). Atoms import none; Link and Input Button are molecules because they reuse the button's styles, Input and Label because they use the field. Within a phase, the smallest first.

## Definition of done

A component is done when every column of its row is ticked:

| Column     | Done when                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Styles** | Its classes match shadcn's, from the generated reference app (`shadcn-reference/presets/nova/src/components/ui`, RTL; the other styles beside it in `presets/`) — class for class, deliberate divergences noted in [shadcn-style-reference.md](shadcn-style-reference.md). No shadcn counterpart: shadcn's tokens and patterns (sizes, radius, focus ring, `data-slot`), checked by eye against its closest component. Its demos write no CSS the component should own: icons bare (no `size-*` it already gives, no `aria-hidden`), no button classes copied. |
| **E2E**    | Every demo has a test: its behaviour by pointer and keyboard, its form integration where it has one — in Chromium, Firefox and WebKit, twice without a flake. The page's axe test passes.                                                                                                                                                                                                                                                                                                                                                                      |
| **Mobile** | Mobile first: the component and its demos work at 360 px wide — no horizontal page scroll, touch targets of 24 px at least (WCAG 2.5.8), touch and the on-screen keyboard; checked in a phone viewport, and in the e2e tests where behaviour differs (touch, small screens).                                                                                                                                                                                                                                                                                   |
| **RTL**    | A demo in right-to-left, with Arabic text written in the demo (no translation layer): `dir="rtl"`, logical properties only, icons that point mirrored, arrow keys reversed where they move along the line; an e2e test of the layout and the keys.                                                                                                                                                                                                                                                                                                             |
| **Dark**   | Correct in dark mode: contrast (axe run in dark too), borders, tints, focus rings.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| **SSR**    | Works rendered on the server: no browser global (`window`, `document`, `localStorage`, `matchMedia`, observers) touched outside `afterNextRender` / `isPlatformBrowser` / an injected `DOCUMENT`; its demos render on the server without an error, their HTML has the parts, and they hydrate without a mismatch (no `NG05xx` in the console).                                                                                                                                                                                                                 |
| **Docs**   | Its README documents every part, input and output; its docs page shows each feature in a demo; the MCP manifest regenerated.                                                                                                                                                                                                                                                                                                                                                                                                                                   |

Across all components, also:

- **Accessibility** — WCAG AA: axe green, keyboard complete (a WAI-ARIA pattern followed where one exists), names and descriptions from the consumer, focus visible and never trapped.
- **Attribute selectors only** — every part in the libs is an attribute on the consumer's element (`div[scCard]`, `button[scCodeBlockCopy]`), never a custom element (`<sc-…>`); also for parts the library creates itself (a toast stack, a tooltip), on a `div` host.
- **Directive first** — a part is a `@Directive` unless it has a reason to be a `@Component` (a template of its own, encapsulation, a CDK base class); a component whose template is only `<ng-content />` becomes a directive.
- **Icons bare** — the consumer writes `<svg siCopyIcon></svg>` and nothing else: a part that holds icons sizes them (`[&_svg:not([class*='size-'])]:size-4`, `shrink-0`), so no `size-*` in the template unless the design wants another size, and never `aria-hidden` (semantic-icons sets it). A button look is `scButton`, never its classes copied.
- **No default strings** — every word is the consumer's (translation is theirs); `Intl` for dates, numbers, lists and units.
- **Forms** — inputs are a `[formField]` (`FormValueControl`), with `invalid` / `touched` / `disabled`.
- **Reduced motion** — animations keep their fades, lose their movement.
- **Rewrite where needed** — a component that misses the bar by much is rebuilt by [component-rewrite-process.md](component-rewrite-process.md) rather than patched.

## Phase 0 — Groundwork (shared, before the components)

- [x] **Phone viewport in the e2e config**: tests tagged `@mobile` run in phone projects only (`mobile-chromium`, Pixel 7; with `ALL_BROWSERS`, `mobile-webkit`, iPhone 14), the rest on desktop only. Helpers in `apps/showcase-e2e/src/mobile.ts`: `expectNoHorizontalScroll(page)`, `expectTargetSize(scope, 24)` (a control in its label measured by the label; inline links exempt).
- [x] **RTL demo pattern**: [rtl-demos.md](rtl-demos.md) — the demo (`rtl-<component>-demo`, `<div dir="rtl" lang="ar">`, Arabic written in it), what it checks, sample texts. Helpers in `apps/showcase-e2e/src/rtl.ts`: `expectRtl`, `expectInlineOrder` (fails on a layout that didn't mirror), `inlineKey(direction, 'next' | 'previous')`.
- [x] **Dark-mode axe**: `expectNoA11yViolations(page, { dark: true })` — the browser's color scheme dark, the `.dark` class awaited. A component's page test adds it when its Dark column is ticked.
- [x] **Style diff helper**: `node scripts/shadcn-diff.mjs <shadcn name> [our name]` — per part (`data-slot`) and per variant, the classes only shadcn has and only we have, from `shadcn-reference`. An aid: reading both still decides ([shadcn-style-reference.md](shadcn-style-reference.md)).
- [x] **Inventory refresh**: `node scripts/roadmap.mjs`, then prettier — rewrites the inventory line and the phase tables (level, size, library, built on, shadcn, e2e, RTL); the ticks already set are kept.
- [x] **Attribute selectors everywhere**: the custom-element selectors left — `sc-accordion-body`, `sc-collapsible-body`, `sc-toast-stack`, `sc-tooltip` (ui), `sc-language-select`, `sc-stacked-layout`, `sc-sidebar-layout`, `sc-auth-layout`, `sc-pdf-viewer-canvas` (ui-lab) — made attributes (`div[scAccordionBody]`…; they render templates, so they stay components); Angular ESLint's `component-selector` / `directive-selector` (`type: 'attribute'`, prefix `sc`, camelCase) are errors in every lib, so none comes back.

- [x] **Icons bare**: `aria-hidden` removed from every semantic-icons `<svg>`, and the sizes the parts already give; the parts that didn't size their icons now do (command input group, file-upload dropzone, navbar brand, code-block header, infinite-scroll status, PDF loading); collapsible and hover-card triggers in the demos are `scButton` instead of a copied class list.

- [x] **SSR checks**: both apps (showcase, blocks) are static by default, client-only; SSR is the `ssr` build configuration (`main.ssr.ts` hydrates, `main.server.ts`, `server.ts`, `outputMode: "server"`, dev mode so hydration warnings show), locally `nx serve <app> -c ssr`. The CI job `ssr`, beside `main`, not required (it may fail while components are fixed): builds both with `-c ssr`, runs their Node servers (`serve-ssr`, picked by `SSR=1` in each `playwright.config.ts`), runs every e2e test again in Chromium plus `ssr.spec.ts` (every page and demo route, 813 in the showcase and 14 in blocks, hydrates: Angular's hydration ran, no `NG05xx`, no browser error), then fails on any server error in `dist/ssr-*.log`. A component's SSR column is ticked when it passes there. First run, by hand: the sidebar provider fixed (it broke every docs page); 15 docs pages still throw on the server (the color picker fixed since) — masonry-grid, scroll-area, signature-pad, spotlight, tour-guide, virtual-list, org-chart (`ResizeObserver` / `MutationObserver`), dock, marquee (`matchMedia`), kanban-board, sortable-list (`cancelAnimationFrame`), audio-player, video-player (media calls), editor, pdf-viewer (DOM calls).
- [ ] **File names without an extra dot**: hyphens only (`button-styles.ts`, never `button.styles.ts`). Rename the files that have one — about 75 in apps and libs: `*.page.ts` (showcase and blocks pages), `*.service.ts`, `*.types.ts` (`toast.types.ts`, `resizable.types.ts`), `main.ssr.ts`, the demo media (`sintel-trailer.en.vtt`…) — and their imports. Kept: what tools look for by name (`*.spec.ts`, `tsconfig.*.json`, `*.config.*`) and Angular's SSR files (`main.server.ts`, `app.config.server.ts`, `app.routes.server.ts`).

## Phase 1 — Atoms (60)

Components built on no other: the building blocks — what the rest reuse, so what they set (look, RTL, mobile, tests) the rest inherit.

|   # | Component                                                                          | Library | Built on | Size | shadcn | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | ---------------------------------------------------------------------------------- | ------- | -------- | ---: | ------ | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Auth Layout](../apps/showcase/src/app/pages/docs/auth-layout)                     | ui      | —        |    0 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Sidebar Layout](../apps/showcase/src/app/pages/docs/sidebar-layout)               | ui      | —        |    0 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Skeleton](../apps/showcase/src/app/pages/docs/skeleton)                           | ui      | —        |   19 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Aspect Ratio](../apps/showcase/src/app/pages/docs/aspect-ratio)                   | ui      | —        |   21 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Spinner](../apps/showcase/src/app/pages/docs/spinner)                             | ui      | —        |   24 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Button Pattern](../apps/showcase/src/app/pages/docs/button-pattern)               | ui      | —        |   28 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Backdrop](../apps/showcase/src/app/pages/docs/backdrop)                           | ui      | —        |   30 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   8 | [Copy to Clipboard](../apps/showcase/src/app/pages/docs/copy-to-clipboard)         | ui      | —        |   31 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Separator](../apps/showcase/src/app/pages/docs/separator)                         | ui      | —        |   31 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Stacked Layout](../apps/showcase/src/app/pages/docs/stacked-layout)               | ui      | —        |   36 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Kbd](../apps/showcase/src/app/pages/docs/kbd)                                     | ui      | —        |   42 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  12 | [Badge](../apps/showcase/src/app/pages/docs/badge)                                 | ui      | —        |   48 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [Focus Trap](../apps/showcase/src/app/pages/docs/focus-trap)                       | ui      | —        |   48 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [Typography](../apps/showcase/src/app/pages/docs/typography)                       | ui      | —        |   48 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Button](../apps/showcase/src/app/pages/docs/button)                               | ui      | —        |   50 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Select On Focus](../apps/showcase/src/app/pages/docs/select-on-focus)             | ui      | —        |   52 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  17 | [Toggle](../apps/showcase/src/app/pages/docs/toggle)                               | ui      | —        |   61 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  18 | [Hotkey](../apps/showcase/src/app/pages/docs/hotkey)                               | ui      | —        |   87 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  19 | [Progress](../apps/showcase/src/app/pages/docs/progress)                           | ui      | —        |   88 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  20 | [Marker](../apps/showcase/src/app/pages/docs/marker)                               | ui      | —        |   89 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  21 | [Button Group](../apps/showcase/src/app/pages/docs/button-group)                   | ui      | —        |  101 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  22 | [Alert](../apps/showcase/src/app/pages/docs/alert)                                 | ui      | —        |  102 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  23 | [Intersection Observer](../apps/showcase/src/app/pages/docs/intersection-observer) | ui      | —        |  109 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  24 | [Breadcrumb](../apps/showcase/src/app/pages/docs/breadcrumb)                       | ui      | —        |  131 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  25 | [Message](../apps/showcase/src/app/pages/docs/message)                             | ui      | —        |  137 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  26 | [Empty](../apps/showcase/src/app/pages/docs/empty)                                 | ui      | —        |  138 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  27 | [Collapsible](../apps/showcase/src/app/pages/docs/collapsible)                     | ui      | —        |  140 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  28 | [Card](../apps/showcase/src/app/pages/docs/card)                                   | ui      | —        |  147 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  29 | [Bubble](../apps/showcase/src/app/pages/docs/bubble)                               | ui      | —        |  148 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  30 | [Avatar](../apps/showcase/src/app/pages/docs/avatar)                               | ui      | —        |  166 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  31 | [Accordion](../apps/showcase/src/app/pages/docs/accordion)                         | ui      | —        |  167 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  32 | [Table](../apps/showcase/src/app/pages/docs/table)                                 | ui      | —        |  182 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  33 | [Theme](../apps/showcase/src/app/pages/docs/theme)                                 | ui      | —        |  183 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  34 | [Animated Counter](../apps/showcase/src/app/pages/docs/animated-counter)           | ui      | —        |  186 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  35 | [Tabs](../apps/showcase/src/app/pages/docs/tabs)                                   | ui      | —        |  188 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  36 | [Stat Card](../apps/showcase/src/app/pages/docs/stat-card)                         | ui      | —        |  204 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  37 | [Range Slider](../apps/showcase/src/app/pages/docs/range-slider)                   | ui      | —        |  232 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  38 | [Masonry Grid](../apps/showcase/src/app/pages/docs/masonry-grid)                   | ui      | —        |  234 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  39 | [Attachment](../apps/showcase/src/app/pages/docs/attachment)                       | ui      | —        |  235 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  40 | [Kanban Board](../apps/showcase/src/app/pages/docs/kanban-board)                   | ui      | —        |  237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  41 | [Sortable List](../apps/showcase/src/app/pages/docs/sortable-list)                 | ui      | —        |  237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  42 | [Confetti](../apps/showcase/src/app/pages/docs/confetti)                           | ui      | —        |  247 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  43 | [Item](../apps/showcase/src/app/pages/docs/item)                                   | ui      | —        |  252 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  44 | [Hover Card](../apps/showcase/src/app/pages/docs/hover-card)                       | ui      | —        |  256 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  45 | [Resizable](../apps/showcase/src/app/pages/docs/resizable)                         | ui      | —        |  267 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  46 | [Scroll Area](../apps/showcase/src/app/pages/docs/scroll-area)                     | ui      | —        |  271 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  47 | [Compare](../apps/showcase/src/app/pages/docs/compare)                             | ui      | —        |  310 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  48 | [Dock](../apps/showcase/src/app/pages/docs/dock)                                   | ui      | —        |  316 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  49 | [Timeline](../apps/showcase/src/app/pages/docs/timeline)                           | ui      | —        |  332 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  50 | [Navigation Menu](../apps/showcase/src/app/pages/docs/navigation-menu)             | ui      | —        |  354 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  51 | [Tree](../apps/showcase/src/app/pages/docs/tree)                                   | ui      | —        |  357 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  52 | [Rating](../apps/showcase/src/app/pages/docs/rating)                               | ui      | —        |  383 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  53 | [Field](../apps/showcase/src/app/pages/docs/field)                                 | ui      | —        |  394 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  54 | [Tooltip](../apps/showcase/src/app/pages/docs/tooltip)                             | ui      | —        |  401 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  55 | [Command](../apps/showcase/src/app/pages/docs/command)                             | ui      | —        |  413 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  56 | [Virtual List](../apps/showcase/src/app/pages/docs/virtual-list)                   | ui      | —        |  451 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  57 | [Query Param State](../apps/showcase/src/app/pages/docs/query-param-state)         | ui      | —        |  611 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  58 | [Select](../apps/showcase/src/app/pages/docs/select)                               | ui      | —        |  617 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  59 | [Emoji Picker](../apps/showcase/src/app/pages/docs/emoji-picker)                   | ui      | —        | 1679 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  60 | [Charts](../apps/showcase/src/app/pages/docs/charts)                               | charts  | —        |  888 | chart  |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Phase 2 — Molecules (55)

Built on atoms (**Built on**): fields and form controls, overlays, menus, the calendar.

|   # | Component                                                                      | Library | Built on                     | Size | shadcn                 | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | ------------------------------------------------------------------------------ | ------- | ---------------------------- | ---: | ---------------------- | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Input Button](../apps/showcase/src/app/pages/docs/input-button)               | ui      | button                       |   27 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Link](../apps/showcase/src/app/pages/docs/link)                               | ui      | button                       |   35 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Input](../apps/showcase/src/app/pages/docs/input)                             | ui      | field                        |   60 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Textarea](../apps/showcase/src/app/pages/docs/textarea)                       | ui      | field                        |   62 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Label](../apps/showcase/src/app/pages/docs/label)                             | ui      | field                        |   63 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Slider](../apps/showcase/src/app/pages/docs/slider)                           | ui      | field                        |   80 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Native Select](../apps/showcase/src/app/pages/docs/native-select)             | ui      | field                        |  118 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   8 | [Toggle Group](../apps/showcase/src/app/pages/docs/toggle-group)               | ui      | toggle                       |  119 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Input Group](../apps/showcase/src/app/pages/docs/input-group)                 | ui      | button                       |  145 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Radio Group](../apps/showcase/src/app/pages/docs/radio-group)                 | ui      | field                        |  167 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Toolbar](../apps/showcase/src/app/pages/docs/toolbar)                         | ui      | toggle                       |  209 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  12 | [Switch](../apps/showcase/src/app/pages/docs/switch)                           | ui      | field                        |  227 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [QR Code](../apps/showcase/src/app/pages/docs/qr-code)                         | ui      | button                       |  253 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [Infinite Scroll](../apps/showcase/src/app/pages/docs/infinite-scroll)         | ui      | button                       |  260 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Checkbox](../apps/showcase/src/app/pages/docs/checkbox)                       | ui      | field                        |  263 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Popover](../apps/showcase/src/app/pages/docs/popover)                         | ui      | button, focus-trap           |  272 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  17 | [Native Dialog](../apps/showcase/src/app/pages/docs/native-dialog)             | ui      | button                       |  280 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  18 | [Marquee](../apps/showcase/src/app/pages/docs/marquee)                         | ui      | button                       |  292 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  19 | [Drawer](../apps/showcase/src/app/pages/docs/drawer)                           | ui      | backdrop, focus-trap         |  304 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  20 | [Carousel](../apps/showcase/src/app/pages/docs/carousel)                       | ui      | button                       |  307 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  21 | [Dialog](../apps/showcase/src/app/pages/docs/dialog)                           | ui      | backdrop, button, focus-trap |  314 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  22 | [Sheet](../apps/showcase/src/app/pages/docs/sheet)                             | ui      | backdrop, button, focus-trap |  324 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  23 | [Org Chart](../apps/showcase/src/app/pages/docs/org-chart)                     | ui      | tree                         |  326 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  24 | [Navbar](../apps/showcase/src/app/pages/docs/navbar)                           | ui      | button, focus-trap           |  374 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  25 | [OTP Field](../apps/showcase/src/app/pages/docs/otp-field)                     | ui      | field                        |  379 | input-otp              |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  26 | [Alert Dialog](../apps/showcase/src/app/pages/docs/alert-dialog)               | ui      | backdrop, button, focus-trap |  383 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  27 | [Spotlight](../apps/showcase/src/app/pages/docs/spotlight)                     | ui      | button                       |  399 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  28 | [Menu](../apps/showcase/src/app/pages/docs/menu)                               | ui      | context-menu                 |  426 | dropdown-menu, menubar |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  29 | [Time Input](../apps/showcase/src/app/pages/docs/time-input)                   | ui      | field                        |  432 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  30 | [Language Switcher](../apps/showcase/src/app/pages/docs/language-switcher)     | ui      | button                       |  436 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  31 | [Countdown](../apps/showcase/src/app/pages/docs/countdown)                     | ui      | button                       |  447 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  32 | [Tags Input](../apps/showcase/src/app/pages/docs/tags-input)                   | ui      | badge, button, field         |  462 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  33 | [Speed Dial](../apps/showcase/src/app/pages/docs/speed-dial)                   | ui      | button                       |  468 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  34 | [Multiselect](../apps/showcase/src/app/pages/docs/multiselect)                 | ui      | select                       |  484 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  35 | [Tour Guide](../apps/showcase/src/app/pages/docs/tour-guide)                   | ui      | button                       |  484 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  36 | [Autocomplete](../apps/showcase/src/app/pages/docs/autocomplete)               | ui      | button                       |  488 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  37 | [File Upload](../apps/showcase/src/app/pages/docs/file-upload)                 | ui      | button                       |  515 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  38 | [Mention Input](../apps/showcase/src/app/pages/docs/mention-input)             | ui      | field                        |  535 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  39 | [Stepper](../apps/showcase/src/app/pages/docs/stepper)                         | ui      | button                       |  561 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  40 | [Barcode Scanner](../apps/showcase/src/app/pages/docs/barcode-scanner)         | ui      | button                       |  595 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  41 | [Time Clock](../apps/showcase/src/app/pages/docs/time-clock)                   | ui      | button                       |  608 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  42 | [Transfer List](../apps/showcase/src/app/pages/docs/transfer-list)             | ui      | button                       |  659 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  43 | [Pagination](../apps/showcase/src/app/pages/docs/pagination)                   | ui      | button, field                |  682 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  44 | [Combobox](../apps/showcase/src/app/pages/docs/combobox)                       | ui      | button, select               |  716 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  45 | [Color Picker](../apps/showcase/src/app/pages/docs/color-picker)               | ui      | button                       |  787 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  46 | [Lightbox](../apps/showcase/src/app/pages/docs/lightbox)                       | ui      | button                       |  853 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  47 | [Notification Center](../apps/showcase/src/app/pages/docs/notification-center) | ui      | badge, button                |  884 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  48 | [Signature Pad](../apps/showcase/src/app/pages/docs/signature-pad)             | ui      | button, field                |  907 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  49 | [Toast](../apps/showcase/src/app/pages/docs/toast)                             | ui      | button                       | 1009 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  50 | [Scheduler](../apps/showcase/src/app/pages/docs/scheduler)                     | ui      | button                       | 1172 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  51 | [Calendar](../apps/showcase/src/app/pages/docs/calendar)                       | ui      | button                       | 1219 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  52 | [Image Cropper](../apps/showcase/src/app/pages/docs/image-cropper)             | ui      | button                       | 1396 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  53 | [Image Annotator](../apps/showcase/src/app/pages/docs/image-annotator)         | ui      | button                       | 1541 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  54 | [Code Block](../apps/showcase/src/app/pages/docs/code-block)                   | code    | button                       |  457 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  55 | [Editor](../apps/showcase/src/app/pages/docs/editor)                           | editor  | field, toggle                | 1665 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Phase 3 — Organisms (16)

Built on molecules: pickers, menus in context, the sidebar, the data table, the editors and players.

|   # | Component                                                                  | Library | Built on                                                                |  Size | shadcn | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | -------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------- | ----: | ------ | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Menu Bar](../apps/showcase/src/app/pages/docs/menu-bar)                   | ui      | menu                                                                    |   143 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Password](../apps/showcase/src/app/pages/docs/password)                   | ui      | button, field, input                                                    |   160 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Context Menu](../apps/showcase/src/app/pages/docs/context-menu)           | ui      | menu                                                                    |   224 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Time Picker](../apps/showcase/src/app/pages/docs/time-picker)             | ui      | button, input-group, popover, time-input                                |   295 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Date Picker](../apps/showcase/src/app/pages/docs/date-picker)             | ui      | button, input-group, popover, select                                    |   473 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Date Range Picker](../apps/showcase/src/app/pages/docs/date-range-picker) | ui      | button, input-group, popover, select                                    |   473 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Phone Input](../apps/showcase/src/app/pages/docs/phone-input)             | ui      | combobox, field, input, input-group                                     |   512 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   8 | [Data Table](../apps/showcase/src/app/pages/docs/data-table)               | ui      | checkbox, pagination                                                    |   553 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Date Input](../apps/showcase/src/app/pages/docs/date-input)               | ui      | date-picker, field, input                                               |   671 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Sidebar](../apps/showcase/src/app/pages/docs/sidebar)                     | ui      | button, sheet, skeleton                                                 |   893 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Number Field](../apps/showcase/src/app/pages/docs/number-field)           | ui      | button, button-group, field, input                                      |  1076 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  12 | [Audio Player](../apps/showcase/src/app/pages/docs/audio-player)           | ui      | button, slider                                                          |  1089 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [Video Player](../apps/showcase/src/app/pages/docs/video-player)           | ui      | button, slider                                                          |  1117 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [PDF Viewer](../apps/showcase/src/app/pages/docs/pdf-viewer)               | ui      | button, checkbox, dialog, input, progress, slider, switch, toggle-group | 12103 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Code Editor](../apps/showcase/src/app/pages/docs/code-editor)             | code    | code-block, field                                                       |   390 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Diff Viewer](../apps/showcase/src/app/pages/docs/diff-viewer)             | code    | code-block                                                              |   629 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Later

- shadcn components we lack: `message-scroller`, `questionnaire`, `trace` (its AI pieces) — each a rewrite-process proposal when wanted.
- Visibility and status (Experimental → Developer Preview) stay separate decisions, per component.
