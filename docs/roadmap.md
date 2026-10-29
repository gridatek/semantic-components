# Roadmap

Every component brought to the same bar: shadcn's look, tested, mobile first, right to left, in light and dark, rendered on the server. One component at a time, from the building blocks up — atomic design: a component comes after the ones it is built on (its imports, **Built on**), as design-system roadmaps do (foundations, then buttons and inputs, then form controls, then overlays and complex widgets). In a phase: ui, then code / charts / editor, each from the smallest (**Size**: lines of its own TypeScript). Each row ticked when it meets the definition of done.

Inventory (147 components): 61 with a shadcn counterpart · 96 with e2e demo tests · 147 with a page axe test · 9 with an RTL demo.

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

- [x] **SSR checks**: both apps (showcase, blocks) are static by default, client-only; SSR is the `ssr` build configuration (`main.ssr.ts` hydrates, `main.server.ts`, `server.ts`, `outputMode: "server"`, dev mode so hydration warnings show), locally `nx serve <app> -c ssr`. The CI job `ssr`, beside `main`, not required (it may fail while components are fixed): builds both with `-c ssr`, runs their Node servers (`serve-ssr`, picked by `SSR=1` in each `playwright.config.ts`), runs every e2e test again in Chromium plus `ssr.spec.ts` (every page and demo route, 813 in the showcase and 14 in blocks, hydrates: Angular's hydration ran, no `NG05xx`, no browser error), then fails on any server error in `dist/ssr-*.log`. A component's SSR column is ticked when it passes there. First run, by hand: the sidebar provider fixed (it broke every docs page); Second CI run: 138 failures; all fixed since — every page of the 16 components renders on the server and hydrates without an error (checked locally on `serve -c ssr`; CI to confirm). The fixes: browser-only work after the first render (the media players take their element then; the editor view renders then), observers and media queries only where they exist, frames cancelled only when asked for, the injected document instead of the global one, and the bubble menu taken out of the page only when the editor places it. The showcase's GitHub star count no longer throws when GitHub rate-limits (403).
- [ ] **File names without an extra dot**: hyphens only (`button-styles.ts`, never `button.styles.ts`). Rename the files that have one — about 75 in apps and libs: `*.page.ts` (showcase and blocks pages), `*.service.ts`, `*.types.ts` (`toast.types.ts`, `resizable.types.ts`), `main.ssr.ts`, the demo media (`sintel-trailer.en.vtt`…) — and their imports. Kept: what tools look for by name (`*.spec.ts`, `tsconfig.*.json`, `*.config.*`) and Angular's SSR files (`main.server.ts`, `app.config.server.ts`, `app.routes.server.ts`).

## Phase 1 — Atoms (73)

Components built on no other: the building blocks — what the rest reuse, so what they set (look, RTL, mobile, tests) the rest inherit.

|   # | Component                                                                          | Library | Built on | Size | shadcn | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | ---------------------------------------------------------------------------------- | ------- | -------- | ---: | ------ | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Area Chart](../apps/showcase/src/app/pages/docs/area-chart)                       | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Auth Layout](../apps/showcase/src/app/pages/docs/auth-layout)                     | ui      | —        |    0 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Bar Chart](../apps/showcase/src/app/pages/docs/bar-chart)                         | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Chart](../apps/showcase/src/app/pages/docs/chart)                                 | ui      | —        |    0 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Funnel Chart](../apps/showcase/src/app/pages/docs/funnel-chart)                   | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Line Chart](../apps/showcase/src/app/pages/docs/line-chart)                       | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Pie Chart](../apps/showcase/src/app/pages/docs/pie-chart)                         | ui      | —        |    0 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   8 | [Radar Chart](../apps/showcase/src/app/pages/docs/radar-chart)                     | ui      | —        |    0 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Radial Chart](../apps/showcase/src/app/pages/docs/radial-chart)                   | ui      | —        |    0 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Sankey Chart](../apps/showcase/src/app/pages/docs/sankey-chart)                   | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Scatter Chart](../apps/showcase/src/app/pages/docs/scatter-chart)                 | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  12 | [Sidebar Layout](../apps/showcase/src/app/pages/docs/sidebar-layout)               | ui      | —        |    0 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [Sunburst Chart](../apps/showcase/src/app/pages/docs/sunburst-chart)               | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [Tree Table](../apps/showcase/src/app/pages/docs/tree-table)                       | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [x] | [ ]  | [ ] | [ ]  |
|  15 | [Treemap Chart](../apps/showcase/src/app/pages/docs/treemap-chart)                 | ui      | —        |    0 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Skeleton](../apps/showcase/src/app/pages/docs/skeleton)                           | ui      | —        |   19 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  17 | [Aspect Ratio](../apps/showcase/src/app/pages/docs/aspect-ratio)                   | ui      | —        |   21 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  18 | [Spinner](../apps/showcase/src/app/pages/docs/spinner)                             | ui      | —        |   24 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  19 | [Button Pattern](../apps/showcase/src/app/pages/docs/button-pattern)               | ui      | —        |   28 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  20 | [Backdrop](../apps/showcase/src/app/pages/docs/backdrop)                           | ui      | —        |   30 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  21 | [Copy to Clipboard](../apps/showcase/src/app/pages/docs/copy-to-clipboard)         | ui      | —        |   31 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  22 | [Separator](../apps/showcase/src/app/pages/docs/separator)                         | ui      | —        |   31 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  23 | [Stacked Layout](../apps/showcase/src/app/pages/docs/stacked-layout)               | ui      | —        |   37 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  24 | [Kbd](../apps/showcase/src/app/pages/docs/kbd)                                     | ui      | —        |   42 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  25 | [Badge](../apps/showcase/src/app/pages/docs/badge)                                 | ui      | —        |   48 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  26 | [Focus Trap](../apps/showcase/src/app/pages/docs/focus-trap)                       | ui      | —        |   48 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  27 | [Typography](../apps/showcase/src/app/pages/docs/typography)                       | ui      | —        |   48 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  28 | [Button](../apps/showcase/src/app/pages/docs/button)                               | ui      | —        |   50 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  29 | [Select On Focus](../apps/showcase/src/app/pages/docs/select-on-focus)             | ui      | —        |   52 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  30 | [Toggle](../apps/showcase/src/app/pages/docs/toggle)                               | ui      | —        |   61 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  31 | [Hotkey](../apps/showcase/src/app/pages/docs/hotkey)                               | ui      | —        |   87 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  32 | [Marker](../apps/showcase/src/app/pages/docs/marker)                               | ui      | —        |   89 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  33 | [Button Group](../apps/showcase/src/app/pages/docs/button-group)                   | ui      | —        |  101 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  34 | [Alert](../apps/showcase/src/app/pages/docs/alert)                                 | ui      | —        |  102 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  35 | [Intersection Observer](../apps/showcase/src/app/pages/docs/intersection-observer) | ui      | —        |  109 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  36 | [Breadcrumb](../apps/showcase/src/app/pages/docs/breadcrumb)                       | ui      | —        |  131 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  37 | [Message](../apps/showcase/src/app/pages/docs/message)                             | ui      | —        |  137 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  38 | [Empty](../apps/showcase/src/app/pages/docs/empty)                                 | ui      | —        |  138 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  39 | [Collapsible](../apps/showcase/src/app/pages/docs/collapsible)                     | ui      | —        |  140 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  40 | [Card](../apps/showcase/src/app/pages/docs/card)                                   | ui      | —        |  147 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  41 | [Bubble](../apps/showcase/src/app/pages/docs/bubble)                               | ui      | —        |  148 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  42 | [Avatar](../apps/showcase/src/app/pages/docs/avatar)                               | ui      | —        |  166 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  43 | [Accordion](../apps/showcase/src/app/pages/docs/accordion)                         | ui      | —        |  167 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  44 | [Theme](../apps/showcase/src/app/pages/docs/theme)                                 | ui      | —        |  179 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  45 | [Table](../apps/showcase/src/app/pages/docs/table)                                 | ui      | —        |  182 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  46 | [Animated Counter](../apps/showcase/src/app/pages/docs/animated-counter)           | ui      | —        |  186 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  47 | [Tabs](../apps/showcase/src/app/pages/docs/tabs)                                   | ui      | —        |  188 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  48 | [Stat Card](../apps/showcase/src/app/pages/docs/stat-card)                         | ui      | —        |  204 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  49 | [Range Slider](../apps/showcase/src/app/pages/docs/range-slider)                   | ui      | —        |  232 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  50 | [Trace](../apps/showcase/src/app/pages/docs/trace)                                 | ui      | —        |  232 | yes    |  [ ]   | [x] |  [ ]   | [x] | [ ]  | [ ] | [ ]  |
|  51 | [Attachment](../apps/showcase/src/app/pages/docs/attachment)                       | ui      | —        |  235 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  52 | [Kanban Board](../apps/showcase/src/app/pages/docs/kanban-board)                   | ui      | —        |  237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  53 | [Sortable List](../apps/showcase/src/app/pages/docs/sortable-list)                 | ui      | —        |  237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  54 | [Masonry Grid](../apps/showcase/src/app/pages/docs/masonry-grid)                   | ui      | —        |  241 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  55 | [Confetti](../apps/showcase/src/app/pages/docs/confetti)                           | ui      | —        |  247 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  56 | [Item](../apps/showcase/src/app/pages/docs/item)                                   | ui      | —        |  252 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  57 | [Hover Card](../apps/showcase/src/app/pages/docs/hover-card)                       | ui      | —        |  256 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  58 | [Resizable](../apps/showcase/src/app/pages/docs/resizable)                         | ui      | —        |  267 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  59 | [Scroll Area](../apps/showcase/src/app/pages/docs/scroll-area)                     | ui      | —        |  273 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  60 | [Compare](../apps/showcase/src/app/pages/docs/compare)                             | ui      | —        |  310 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  61 | [Dock](../apps/showcase/src/app/pages/docs/dock)                                   | ui      | —        |  317 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  62 | [Timeline](../apps/showcase/src/app/pages/docs/timeline)                           | ui      | —        |  332 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  63 | [Navigation Menu](../apps/showcase/src/app/pages/docs/navigation-menu)             | ui      | —        |  354 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  64 | [Tree](../apps/showcase/src/app/pages/docs/tree)                                   | ui      | —        |  358 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  65 | [Progress](../apps/showcase/src/app/pages/docs/progress)                           | ui      | —        |  370 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  66 | [Rating](../apps/showcase/src/app/pages/docs/rating)                               | ui      | —        |  383 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  67 | [Field](../apps/showcase/src/app/pages/docs/field)                                 | ui      | —        |  394 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  68 | [Tooltip](../apps/showcase/src/app/pages/docs/tooltip)                             | ui      | —        |  401 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  69 | [Command](../apps/showcase/src/app/pages/docs/command)                             | ui      | —        |  413 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  70 | [Virtual List](../apps/showcase/src/app/pages/docs/virtual-list)                   | ui      | —        |  473 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  71 | [Query Param State](../apps/showcase/src/app/pages/docs/query-param-state)         | ui      | —        |  611 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  72 | [Select](../apps/showcase/src/app/pages/docs/select)                               | ui      | —        |  617 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  73 | [Emoji Picker](../apps/showcase/src/app/pages/docs/emoji-picker)                   | ui      | —        | 1683 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Phase 2 — Molecules (58)

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
|  14 | [Checkbox](../apps/showcase/src/app/pages/docs/checkbox)                       | ui      | field                        |  263 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Popover](../apps/showcase/src/app/pages/docs/popover)                         | ui      | button, focus-trap           |  272 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Infinite Scroll](../apps/showcase/src/app/pages/docs/infinite-scroll)         | ui      | button                       |  274 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  17 | [Native Dialog](../apps/showcase/src/app/pages/docs/native-dialog)             | ui      | button                       |  280 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  18 | [Marquee](../apps/showcase/src/app/pages/docs/marquee)                         | ui      | button                       |  297 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  19 | [Drawer](../apps/showcase/src/app/pages/docs/drawer)                           | ui      | backdrop, focus-trap         |  304 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  20 | [Carousel](../apps/showcase/src/app/pages/docs/carousel)                       | ui      | button                       |  307 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  21 | [Dialog](../apps/showcase/src/app/pages/docs/dialog)                           | ui      | backdrop, button, focus-trap |  314 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  22 | [Sheet](../apps/showcase/src/app/pages/docs/sheet)                             | ui      | backdrop, button, focus-trap |  324 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  23 | [Org Chart](../apps/showcase/src/app/pages/docs/org-chart)                     | ui      | tree                         |  332 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  24 | [Code Editor](../apps/showcase/src/app/pages/docs/code-editor)                 | ui      | field                        |  379 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  25 | [OTP Field](../apps/showcase/src/app/pages/docs/otp-field)                     | ui      | field                        |  379 | input-otp              |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  26 | [Alert Dialog](../apps/showcase/src/app/pages/docs/alert-dialog)               | ui      | backdrop, button, focus-trap |  383 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  27 | [Spotlight](../apps/showcase/src/app/pages/docs/spotlight)                     | ui      | button                       |  404 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  28 | [Navbar](../apps/showcase/src/app/pages/docs/navbar)                           | ui      | button                       |  411 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  29 | [Menu](../apps/showcase/src/app/pages/docs/menu)                               | ui      | context-menu                 |  426 | dropdown-menu, menubar |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  30 | [Time Input](../apps/showcase/src/app/pages/docs/time-input)                   | ui      | field                        |  434 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  31 | [Countdown](../apps/showcase/src/app/pages/docs/countdown)                     | ui      | button                       |  447 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  32 | [Code Block](../apps/showcase/src/app/pages/docs/code-block)                   | ui      | button                       |  461 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  33 | [Tags Input](../apps/showcase/src/app/pages/docs/tags-input)                   | ui      | badge, button, field         |  462 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  34 | [Speed Dial](../apps/showcase/src/app/pages/docs/speed-dial)                   | ui      | button                       |  471 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  35 | [Multiselect](../apps/showcase/src/app/pages/docs/multiselect)                 | ui      | select                       |  484 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  36 | [Tour Guide](../apps/showcase/src/app/pages/docs/tour-guide)                   | ui      | button                       |  489 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  37 | [Autocomplete](../apps/showcase/src/app/pages/docs/autocomplete)               | ui      | button                       |  491 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  38 | [JSON Viewer](../apps/showcase/src/app/pages/docs/json-viewer)                 | ui      | tree                         |  494 | —                      |  [ ]   | [x] |  [ ]   | [x] | [ ]  | [ ] | [ ]  |
|  39 | [File Upload](../apps/showcase/src/app/pages/docs/file-upload)                 | ui      | button                       |  515 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  40 | [Mention Input](../apps/showcase/src/app/pages/docs/mention-input)             | ui      | field                        |  535 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  41 | [Stepper](../apps/showcase/src/app/pages/docs/stepper)                         | ui      | button                       |  561 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  42 | [Barcode Scanner](../apps/showcase/src/app/pages/docs/barcode-scanner)         | ui      | button                       |  595 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  43 | [Time Clock](../apps/showcase/src/app/pages/docs/time-clock)                   | ui      | button                       |  608 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  44 | [Transfer List](../apps/showcase/src/app/pages/docs/transfer-list)             | ui      | button                       |  659 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  45 | [Pagination](../apps/showcase/src/app/pages/docs/pagination)                   | ui      | button, field                |  682 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  46 | [Combobox](../apps/showcase/src/app/pages/docs/combobox)                       | ui      | button, select               |  719 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  47 | [Color Picker](../apps/showcase/src/app/pages/docs/color-picker)               | ui      | button                       |  789 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  48 | [Lightbox](../apps/showcase/src/app/pages/docs/lightbox)                       | ui      | button                       |  853 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  49 | [Notification Center](../apps/showcase/src/app/pages/docs/notification-center) | ui      | badge, button                |  884 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  50 | [Signature Pad](../apps/showcase/src/app/pages/docs/signature-pad)             | ui      | button, field                |  909 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  51 | [Toast](../apps/showcase/src/app/pages/docs/toast)                             | ui      | button                       | 1009 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  52 | [Questionnaire](../apps/showcase/src/app/pages/docs/questionnaire)             | ui      | button                       | 1086 | yes                    |  [ ]   | [x] |  [ ]   | [x] | [ ]  | [ ] | [ ]  |
|  53 | [Scheduler](../apps/showcase/src/app/pages/docs/scheduler)                     | ui      | button                       | 1172 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  54 | [Calendar](../apps/showcase/src/app/pages/docs/calendar)                       | ui      | button                       | 1223 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  55 | [Message Scroller](../apps/showcase/src/app/pages/docs/message-scroller)       | ui      | button                       | 1253 | yes                    |  [ ]   | [x] |  [ ]   | [x] | [ ]  | [ ] | [ ]  |
|  56 | [Image Cropper](../apps/showcase/src/app/pages/docs/image-cropper)             | ui      | button                       | 1396 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  57 | [Image Annotator](../apps/showcase/src/app/pages/docs/image-annotator)         | ui      | button                       | 1560 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  58 | [Editor](../apps/showcase/src/app/pages/docs/editor)                           | ui      | field, toggle                | 1673 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Phase 3 — Organisms (16)

Built on molecules: pickers, menus in context, the sidebar, the data table, the editors and players.

|   # | Component                                                                  | Library | Built on                                                                |  Size | shadcn | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | -------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------- | ----: | ------ | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Menu Bar](../apps/showcase/src/app/pages/docs/menu-bar)                   | ui      | menu                                                                    |   143 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Context Menu](../apps/showcase/src/app/pages/docs/context-menu)           | ui      | menu                                                                    |   224 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Time Picker](../apps/showcase/src/app/pages/docs/time-picker)             | ui      | button, input-group, popover, time-input                                |   295 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Date Picker](../apps/showcase/src/app/pages/docs/date-picker)             | ui      | button, input-group, popover, select                                    |   473 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Date Range Picker](../apps/showcase/src/app/pages/docs/date-range-picker) | ui      | button, input-group, popover, select                                    |   473 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Phone Input](../apps/showcase/src/app/pages/docs/phone-input)             | ui      | combobox, field, input, input-group                                     |   512 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Password Field](../apps/showcase/src/app/pages/docs/password-field)       | ui      | button, field, input, input-group                                       |   566 | —      |  [ ]   | [x] |  [ ]   | [x] | [ ]  | [ ] | [ ]  |
|   8 | [Diff Viewer](../apps/showcase/src/app/pages/docs/diff-viewer)             | ui      | code-block                                                              |   636 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Date Input](../apps/showcase/src/app/pages/docs/date-input)               | ui      | date-picker, field, input                                               |   671 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Sidebar](../apps/showcase/src/app/pages/docs/sidebar)                     | ui      | button, sheet, skeleton                                                 |   888 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Gantt](../apps/showcase/src/app/pages/docs/gantt)                         | ui      | data-table                                                              |   899 | —      |  [ ]   | [x] |  [ ]   | [x] | [ ]  | [ ] | [ ]  |
|  12 | [Data Table](../apps/showcase/src/app/pages/docs/data-table)               | ui      | button, checkbox, pagination                                            |   957 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [Number Field](../apps/showcase/src/app/pages/docs/number-field)           | ui      | button, button-group, field, input                                      |  1076 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [Audio Player](../apps/showcase/src/app/pages/docs/audio-player)           | ui      | button, slider                                                          |  1122 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Video Player](../apps/showcase/src/app/pages/docs/video-player)           | ui      | button, slider                                                          |  1382 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [PDF Viewer](../apps/showcase/src/app/pages/docs/pdf-viewer)               | ui      | button, checkbox, dialog, input, progress, slider, switch, toggle-group | 12126 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Later

- Visibility and status (Experimental → Developer Preview) stay separate decisions, per component.
- Open issues and larger items: [todo.md](todo.md).
