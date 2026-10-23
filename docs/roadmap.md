# Roadmap

Every component brought to the same bar: shadcn's look, tested, mobile first, right to left, in light and dark, rendered on the server. One component at a time, from the building blocks up — atomic design: a component comes after the ones it is built on (its imports, **Built on**), as design-system roadmaps do (foundations, then buttons and inputs, then form controls, then overlays and complex widgets). In a phase: ui, then ui-lab, then code / charts / editor, each from the smallest (**Size**: lines of its own TypeScript). Each row ticked when it meets the definition of done.

Inventory (129 components): 58 with a shadcn counterpart · 75 with e2e demo tests · 129 with a page axe test · 0 with an RTL demo.

## Why this order

Design systems are built from the bottom up — **atomic design**: atoms first (buttons, links, labels, inputs), then molecules that combine them (a search field: label, input, button), then organisms (headers, forms). A change to an atom flows into everything built on it, so the atoms are settled first ([UX Collective](https://bootcamp.uxdesign.cc/building-design-systems-with-atomic-design-fd21e86f34c5), [designsystems.surf](https://designsystems.surf/guides/atomic-design), [atomic design principles](https://mohammadshehadeh.com/react/atomic-design-principles)).

Design-system roadmaps follow the same line: foundations (color, type, spacing), then buttons, links and inputs — the core interactions — then form controls (checkbox, radio, select, switch), then overlays and complex widgets (dialogs, toasts, date pickers) ([Netguru](https://www.netguru.com/blog/design-system-roadmap), [okoone](https://www.okoone.com/spark/product-design-research/how-to-build-a-design-system-roadmap-that-teams-actually-use/), [zeroheight](https://zeroheight.com/help/guides/how-to-prioritize-your-components/), [Design Systems Collective](https://www.designsystemscollective.com/how-to-actually-create-a-design-system-step-by-step-ae0ce26af79e)). Our foundations — the theme, from shadcn — are in place.

Here the levels are not judged but **computed from the code**: a component's level is one more than the highest level among the components it imports (**Built on**). Atoms import none; Link and Input Button are molecules because they reuse the button's styles, Input and Label because they use the field. Within a phase, the smallest first.

## Definition of done

A component is done when every column of its row is ticked:

| Column     | Done when                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     |
| ---------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Styles** | Its classes match shadcn's, from the generated reference app (`shadcn-reference/src/components/ui`, nova, RTL) — class for class, deliberate divergences noted in [shadcn-style-reference.md](shadcn-style-reference.md). No shadcn counterpart: shadcn's tokens and patterns (sizes, radius, focus ring, `data-slot`), checked by eye against its closest component. Its demos write no CSS the component should own: icons bare (no `size-*` it already gives, no `aria-hidden`), no button classes copied. |
| **E2E**    | Every demo has a test: its behaviour by pointer and keyboard, its form integration where it has one — in Chromium, Firefox and WebKit, twice without a flake. The page's axe test passes.                                                                                                                                                                                                                                                                                                                     |
| **Mobile** | Mobile first: the component and its demos work at 360 px wide — no horizontal page scroll, touch targets of 24 px at least (WCAG 2.5.8), touch and the on-screen keyboard; checked in a phone viewport, and in the e2e tests where behaviour differs (touch, small screens).                                                                                                                                                                                                                                  |
| **RTL**    | A demo in right-to-left, with Arabic text written in the demo (no translation layer): `dir="rtl"`, logical properties only, icons that point mirrored, arrow keys reversed where they move along the line; an e2e test of the layout and the keys.                                                                                                                                                                                                                                                            |
| **Dark**   | Correct in dark mode: contrast (axe run in dark too), borders, tints, focus rings.                                                                                                                                                                                                                                                                                                                                                                                                                            |
| **SSR**    | Works rendered on the server: no browser global (`window`, `document`, `localStorage`, `matchMedia`, observers) touched outside `afterNextRender` / `isPlatformBrowser` / an injected `DOCUMENT`; its demos render on the server without an error, their HTML has the parts, and they hydrate without a mismatch (no `NG05xx` in the console).                                                                                                                                                                |
| **Docs**   | Its README documents every part, input and output; its docs page shows each feature in a demo; the MCP manifest regenerated.                                                                                                                                                                                                                                                                                                                                                                                  |

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

- [ ] **SSR checks**: SSR on in the showcase (`@angular/ssr`, `outputMode: "server"`, as in blocks; the dev server then renders on the server too) and an e2e helper `expectServerRendered(page, url)`: the demo route fetched without JavaScript returns 200 with the demo's `data-slot` parts in its HTML, then loaded in the browser with no hydration error or warning (`NG0500`–`NG0507`) and no console error. The SSR column is ticked by a test using it.

## Phase 1 — Atoms (59)

Components built on no other: the building blocks — what the rest reuse, so what they set (look, RTL, mobile, tests) the rest inherit.

|   # | Component                                                                          | Library | Built on | Size | shadcn | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | ---------------------------------------------------------------------------------- | ------- | -------- | ---: | ------ | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Skeleton](../apps/showcase/src/app/pages/docs/skeleton)                           | ui      | —        |   19 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Aspect Ratio](../apps/showcase/src/app/pages/docs/aspect-ratio)                   | ui      | —        |   21 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Spinner](../apps/showcase/src/app/pages/docs/spinner)                             | ui      | —        |   24 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Backdrop](../apps/showcase/src/app/pages/docs/backdrop)                           | ui      | —        |   30 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Copy to Clipboard](../apps/showcase/src/app/pages/docs/copy-to-clipboard)         | ui      | —        |   31 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Separator](../apps/showcase/src/app/pages/docs/separator)                         | ui      | —        |   31 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Kbd](../apps/showcase/src/app/pages/docs/kbd)                                     | ui      | —        |   42 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   8 | [Badge](../apps/showcase/src/app/pages/docs/badge)                                 | ui      | —        |   48 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Focus Trap](../apps/showcase/src/app/pages/docs/focus-trap)                       | ui      | —        |   48 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Typography](../apps/showcase/src/app/pages/docs/typography)                       | ui      | —        |   48 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Select On Focus](../apps/showcase/src/app/pages/docs/select-on-focus)             | ui      | —        |   52 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  12 | [Toggle](../apps/showcase/src/app/pages/docs/toggle)                               | ui      | —        |   61 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [Button](../apps/showcase/src/app/pages/docs/button)                               | ui      | —        |   71 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [Hotkey](../apps/showcase/src/app/pages/docs/hotkey)                               | ui      | —        |   87 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Progress](../apps/showcase/src/app/pages/docs/progress)                           | ui      | —        |   88 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Button Group](../apps/showcase/src/app/pages/docs/button-group)                   | ui      | —        |  101 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  17 | [Alert](../apps/showcase/src/app/pages/docs/alert)                                 | ui      | —        |  102 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  18 | [Breadcrumb](../apps/showcase/src/app/pages/docs/breadcrumb)                       | ui      | —        |  131 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  19 | [Empty](../apps/showcase/src/app/pages/docs/empty)                                 | ui      | —        |  138 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  20 | [Collapsible](../apps/showcase/src/app/pages/docs/collapsible)                     | ui      | —        |  140 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  21 | [Input Group](../apps/showcase/src/app/pages/docs/input-group)                     | ui      | —        |  145 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  22 | [Card](../apps/showcase/src/app/pages/docs/card)                                   | ui      | —        |  147 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  23 | [Avatar](../apps/showcase/src/app/pages/docs/avatar)                               | ui      | —        |  166 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  24 | [Accordion](../apps/showcase/src/app/pages/docs/accordion)                         | ui      | —        |  167 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  25 | [Table](../apps/showcase/src/app/pages/docs/table)                                 | ui      | —        |  182 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  26 | [Theme](../apps/showcase/src/app/pages/docs/theme)                                 | ui      | —        |  183 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  27 | [Tabs](../apps/showcase/src/app/pages/docs/tabs)                                   | ui      | —        |  188 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  28 | [Range Slider](../apps/showcase/src/app/pages/docs/range-slider)                   | ui      | —        |  232 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  29 | [Item](../apps/showcase/src/app/pages/docs/item)                                   | ui      | —        |  252 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  30 | [Hover Card](../apps/showcase/src/app/pages/docs/hover-card)                       | ui      | —        |  256 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  31 | [Resizable](../apps/showcase/src/app/pages/docs/resizable)                         | ui      | —        |  267 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  32 | [Scroll Area](../apps/showcase/src/app/pages/docs/scroll-area)                     | ui      | —        |  271 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  33 | [Navigation Menu](../apps/showcase/src/app/pages/docs/navigation-menu)             | ui      | —        |  354 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  34 | [Tree](../apps/showcase/src/app/pages/docs/tree)                                   | ui      | —        |  357 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  35 | [Rating](../apps/showcase/src/app/pages/docs/rating)                               | ui      | —        |  383 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  36 | [Field](../apps/showcase/src/app/pages/docs/field)                                 | ui      | —        |  394 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  37 | [Tooltip](../apps/showcase/src/app/pages/docs/tooltip)                             | ui      | —        |  401 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  38 | [Command](../apps/showcase/src/app/pages/docs/command)                             | ui      | —        |  413 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  39 | [Select](../apps/showcase/src/app/pages/docs/select)                               | ui      | —        |  617 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  40 | [Button Pattern](../apps/showcase/src/app/pages/docs/button-pattern)               | ui-lab  | —        |   28 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  41 | [Stacked Layout](../apps/showcase/src/app/pages/docs/stacked-layout)               | ui-lab  | —        |   36 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  42 | [Marker](../apps/showcase/src/app/pages/docs/marker)                               | ui-lab  | —        |   89 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  43 | [Intersection Observer](../apps/showcase/src/app/pages/docs/intersection-observer) | ui-lab  | —        |  109 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  44 | [Message](../apps/showcase/src/app/pages/docs/message)                             | ui-lab  | —        |  137 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  45 | [Bubble](../apps/showcase/src/app/pages/docs/bubble)                               | ui-lab  | —        |  148 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  46 | [Animated Counter](../apps/showcase/src/app/pages/docs/animated-counter)           | ui-lab  | —        |  186 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  47 | [Stat Card](../apps/showcase/src/app/pages/docs/stat-card)                         | ui-lab  | —        |  204 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  48 | [Masonry Grid](../apps/showcase/src/app/pages/docs/masonry-grid)                   | ui-lab  | —        |  234 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  49 | [Attachment](../apps/showcase/src/app/pages/docs/attachment)                       | ui-lab  | —        |  235 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  50 | [Kanban Board](../apps/showcase/src/app/pages/docs/kanban-board)                   | ui-lab  | —        |  237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  51 | [Sortable List](../apps/showcase/src/app/pages/docs/sortable-list)                 | ui-lab  | —        |  237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  52 | [Confetti](../apps/showcase/src/app/pages/docs/confetti)                           | ui-lab  | —        |  247 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  53 | [Compare](../apps/showcase/src/app/pages/docs/compare)                             | ui-lab  | —        |  309 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  54 | [Dock](../apps/showcase/src/app/pages/docs/dock)                                   | ui-lab  | —        |  315 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  55 | [Timeline](../apps/showcase/src/app/pages/docs/timeline)                           | ui-lab  | —        |  332 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  56 | [Virtual List](../apps/showcase/src/app/pages/docs/virtual-list)                   | ui-lab  | —        |  451 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  57 | [Query Param State](../apps/showcase/src/app/pages/docs/query-param-state)         | ui-lab  | —        |  611 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  58 | [Emoji Picker](../apps/showcase/src/app/pages/docs/emoji-picker)                   | ui-lab  | —        | 1679 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  59 | [Charts](../apps/showcase/src/app/pages/docs/charts)                               | charts  | —        |  888 | chart  |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Phase 2 — Molecules (54)

Built on atoms (**Built on**): fields and form controls, overlays, menus, the calendar.

|   # | Component                                                                      | Library | Built on                     | Size | shadcn                 | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | ------------------------------------------------------------------------------ | ------- | ---------------------------- | ---: | ---------------------- | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Input Button](../apps/showcase/src/app/pages/docs/input-button)               | ui      | button                       |   25 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Link](../apps/showcase/src/app/pages/docs/link)                               | ui      | button                       |   32 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Input](../apps/showcase/src/app/pages/docs/input)                             | ui      | field                        |   60 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Textarea](../apps/showcase/src/app/pages/docs/textarea)                       | ui      | field                        |   62 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Label](../apps/showcase/src/app/pages/docs/label)                             | ui      | field                        |   63 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Slider](../apps/showcase/src/app/pages/docs/slider)                           | ui      | field                        |   80 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Native Select](../apps/showcase/src/app/pages/docs/native-select)             | ui      | field                        |  118 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   8 | [Toggle Group](../apps/showcase/src/app/pages/docs/toggle-group)               | ui      | toggle                       |  119 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Radio Group](../apps/showcase/src/app/pages/docs/radio-group)                 | ui      | field                        |  167 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Toolbar](../apps/showcase/src/app/pages/docs/toolbar)                         | ui      | toggle                       |  209 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Switch](../apps/showcase/src/app/pages/docs/switch)                           | ui      | field                        |  227 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  12 | [Checkbox](../apps/showcase/src/app/pages/docs/checkbox)                       | ui      | field                        |  263 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [Popover](../apps/showcase/src/app/pages/docs/popover)                         | ui      | button, focus-trap           |  269 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [Drawer](../apps/showcase/src/app/pages/docs/drawer)                           | ui      | backdrop, focus-trap         |  304 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Dialog](../apps/showcase/src/app/pages/docs/dialog)                           | ui      | backdrop, button, focus-trap |  311 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Sheet](../apps/showcase/src/app/pages/docs/sheet)                             | ui      | backdrop, button, focus-trap |  321 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  17 | [Alert Dialog](../apps/showcase/src/app/pages/docs/alert-dialog)               | ui      | backdrop, button, focus-trap |  377 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  18 | [OTP Field](../apps/showcase/src/app/pages/docs/otp-field)                     | ui      | field                        |  379 | input-otp              |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  19 | [Menu](../apps/showcase/src/app/pages/docs/menu)                               | ui      | context-menu                 |  426 | dropdown-menu, menubar |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  20 | [Time Input](../apps/showcase/src/app/pages/docs/time-input)                   | ui      | field                        |  432 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  21 | [Multiselect](../apps/showcase/src/app/pages/docs/multiselect)                 | ui      | select                       |  484 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  22 | [Autocomplete](../apps/showcase/src/app/pages/docs/autocomplete)               | ui      | button                       |  485 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  23 | [File Upload](../apps/showcase/src/app/pages/docs/file-upload)                 | ui      | button                       |  509 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  24 | [Pagination](../apps/showcase/src/app/pages/docs/pagination)                   | ui      | button, field                |  667 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  25 | [Combobox](../apps/showcase/src/app/pages/docs/combobox)                       | ui      | button, select               |  713 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  26 | [Toast](../apps/showcase/src/app/pages/docs/toast)                             | ui      | button                       | 1003 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  27 | [Calendar](../apps/showcase/src/app/pages/docs/calendar)                       | ui      | button                       | 1204 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  28 | [QR Code](../apps/showcase/src/app/pages/docs/qr-code)                         | ui-lab  | button                       |  251 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  29 | [Infinite Scroll](../apps/showcase/src/app/pages/docs/infinite-scroll)         | ui-lab  | button                       |  260 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  30 | [Native Dialog](../apps/showcase/src/app/pages/docs/native-dialog)             | ui-lab  | button                       |  276 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  31 | [Marquee](../apps/showcase/src/app/pages/docs/marquee)                         | ui-lab  | button                       |  292 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  32 | [Carousel](../apps/showcase/src/app/pages/docs/carousel)                       | ui-lab  | button                       |  303 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  33 | [Org Chart](../apps/showcase/src/app/pages/docs/org-chart)                     | ui-lab  | tree                         |  324 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  34 | [Navbar](../apps/showcase/src/app/pages/docs/navbar)                           | ui-lab  | button, focus-trap           |  373 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  35 | [Spotlight](../apps/showcase/src/app/pages/docs/spotlight)                     | ui-lab  | button                       |  399 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  36 | [Language Switcher](../apps/showcase/src/app/pages/docs/language-switcher)     | ui-lab  | button                       |  436 | —                      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  37 | [Countdown](../apps/showcase/src/app/pages/docs/countdown)                     | ui-lab  | button                       |  447 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  38 | [Tags Input](../apps/showcase/src/app/pages/docs/tags-input)                   | ui-lab  | badge, button, field         |  460 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  39 | [Speed Dial](../apps/showcase/src/app/pages/docs/speed-dial)                   | ui-lab  | button                       |  468 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  40 | [Tour Guide](../apps/showcase/src/app/pages/docs/tour-guide)                   | ui-lab  | button                       |  484 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  41 | [Mention Input](../apps/showcase/src/app/pages/docs/mention-input)             | ui-lab  | field                        |  534 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  42 | [Stepper](../apps/showcase/src/app/pages/docs/stepper)                         | ui-lab  | button                       |  561 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  43 | [Barcode Scanner](../apps/showcase/src/app/pages/docs/barcode-scanner)         | ui-lab  | button                       |  595 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  44 | [Time Clock](../apps/showcase/src/app/pages/docs/time-clock)                   | ui-lab  | button                       |  605 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  45 | [Transfer List](../apps/showcase/src/app/pages/docs/transfer-list)             | ui-lab  | button                       |  654 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  46 | [Color Picker](../apps/showcase/src/app/pages/docs/color-picker)               | ui-lab  | button                       |  782 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  47 | [Lightbox](../apps/showcase/src/app/pages/docs/lightbox)                       | ui-lab  | button                       |  851 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  48 | [Notification Center](../apps/showcase/src/app/pages/docs/notification-center) | ui-lab  | badge, button                |  883 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  49 | [Signature Pad](../apps/showcase/src/app/pages/docs/signature-pad)             | ui-lab  | button, field                |  905 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  50 | [Scheduler](../apps/showcase/src/app/pages/docs/scheduler)                     | ui-lab  | button                       | 1172 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  51 | [Image Cropper](../apps/showcase/src/app/pages/docs/image-cropper)             | ui-lab  | button                       | 1395 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  52 | [Image Annotator](../apps/showcase/src/app/pages/docs/image-annotator)         | ui-lab  | button                       | 1539 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  53 | [Code Block](../apps/showcase/src/app/pages/docs/code-block)                   | code    | button                       |  455 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  54 | [Editor](../apps/showcase/src/app/pages/docs/editor)                           | editor  | field, toggle                | 1665 | —                      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Phase 3 — Organisms (16)

Built on molecules: pickers, menus in context, the sidebar, the data table, the editors and players.

|   # | Component                                                                  | Library | Built on                                                                |  Size | shadcn | Styles | E2E | Mobile | RTL | Dark | SSR | Docs |
| --: | -------------------------------------------------------------------------- | ------- | ----------------------------------------------------------------------- | ----: | ------ | :----: | :-: | :----: | :-: | :--: | :-: | :--: |
|   1 | [Menu Bar](../apps/showcase/src/app/pages/docs/menu-bar)                   | ui      | menu                                                                    |   143 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   2 | [Password](../apps/showcase/src/app/pages/docs/password)                   | ui      | button, field, input                                                    |   158 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   3 | [Context Menu](../apps/showcase/src/app/pages/docs/context-menu)           | ui      | menu                                                                    |   224 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   4 | [Time Picker](../apps/showcase/src/app/pages/docs/time-picker)             | ui      | button, input-group, popover, time-input                                |   292 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   5 | [Date Picker](../apps/showcase/src/app/pages/docs/date-picker)             | ui      | button, input-group, popover, select                                    |   461 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   6 | [Date Range Picker](../apps/showcase/src/app/pages/docs/date-range-picker) | ui      | button, input-group, popover, select                                    |   461 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   7 | [Date Input](../apps/showcase/src/app/pages/docs/date-input)               | ui      | date-picker, field, input                                               |   671 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   8 | [Sidebar](../apps/showcase/src/app/pages/docs/sidebar)                     | ui      | button, sheet, skeleton                                                 |   897 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|   9 | [Number Field](../apps/showcase/src/app/pages/docs/number-field)           | ui      | button, button-group, field, input                                      |  1072 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  10 | [Phone Input](../apps/showcase/src/app/pages/docs/phone-input)             | ui-lab  | combobox, field, input, input-group                                     |   512 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  11 | [Data Table](../apps/showcase/src/app/pages/docs/data-table)               | ui-lab  | checkbox, pagination                                                    |   553 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  12 | [Audio Player](../apps/showcase/src/app/pages/docs/audio-player)           | ui-lab  | button, slider                                                          |  1083 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  13 | [Video Player](../apps/showcase/src/app/pages/docs/video-player)           | ui-lab  | button, slider                                                          |  1112 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  14 | [PDF Viewer](../apps/showcase/src/app/pages/docs/pdf-viewer)               | ui-lab  | button, checkbox, dialog, input, progress, slider, switch, toggle-group | 12019 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  15 | [Code Editor](../apps/showcase/src/app/pages/docs/code-editor)             | code    | code-block, field                                                       |   390 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |
|  16 | [Diff Viewer](../apps/showcase/src/app/pages/docs/diff-viewer)             | code    | code-block                                                              |   629 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ] | [ ]  |

## Later

- shadcn components we lack: `message-scroller`, `questionnaire`, `trace` (its AI pieces) — each a rewrite-process proposal when wanted.
- Visibility and status (Experimental → Developer Preview) stay separate decisions, per component.
