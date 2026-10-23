# Roadmap

Every component brought to the same bar: shadcn's look, tested, mobile first, right to left, in light and dark. One component at a time — in each phase from the simplest to the most complex (**Size**: lines of its own TypeScript) — each row ticked when it meets the definition of done.

Inventory (129 components): 58 with a shadcn counterpart · 75 with e2e demo tests · 129 with a page axe test · 0 with an RTL demo.

## Definition of done

A component is done when every column of its row is ticked:

| Column     | Done when                                                                                                                                                                                                                                                                                                                                                             |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Styles** | Its classes match shadcn's, from the generated reference app (`shadcn-reference/src/components/ui`, nova, RTL) — class for class, deliberate divergences noted in [shadcn-style-reference.md](shadcn-style-reference.md). No shadcn counterpart: shadcn's tokens and patterns (sizes, radius, focus ring, `data-slot`), checked by eye against its closest component. |
| **E2E**    | Every demo has a test: its behaviour by pointer and keyboard, its form integration where it has one — in Chromium, Firefox and WebKit, twice without a flake. The page's axe test passes.                                                                                                                                                                             |
| **Mobile** | Mobile first: the component and its demos work at 360 px wide — no horizontal page scroll, touch targets of 24 px at least (WCAG 2.5.8), touch and the on-screen keyboard; checked in a phone viewport, and in the e2e tests where behaviour differs (touch, small screens).                                                                                          |
| **RTL**    | A demo in right-to-left, with Arabic text written in the demo (no translation layer): `dir="rtl"`, logical properties only, icons that point mirrored, arrow keys reversed where they move along the line; an e2e test of the layout and the keys.                                                                                                                    |
| **Dark**   | Correct in dark mode: contrast (axe run in dark too), borders, tints, focus rings.                                                                                                                                                                                                                                                                                    |
| **Docs**   | Its README documents every part, input and output; its docs page shows each feature in a demo; the MCP manifest regenerated.                                                                                                                                                                                                                                          |

Across all components, also:

- **Accessibility** — WCAG AA: axe green, keyboard complete (a WAI-ARIA pattern followed where one exists), names and descriptions from the consumer, focus visible and never trapped.
- **No default strings** — every word is the consumer's (translation is theirs); `Intl` for dates, numbers, lists and units.
- **Forms** — inputs are a `[formField]` (`FormValueControl`), with `invalid` / `touched` / `disabled`.
- **Reduced motion** — animations keep their fades, lose their movement.
- **Rewrite where needed** — a component that misses the bar by much is rebuilt by [component-rewrite-process.md](component-rewrite-process.md) rather than patched.

## Phase 0 — Groundwork (shared, before the components)

- [ ] **Phone viewport in the e2e config**: a mobile project (a small Chromium and WebKit device) for tests marked mobile; a helper asserting no horizontal page scroll and the minimum target size.
- [ ] **RTL demo pattern**: a container convention (`<div dir="rtl" lang="ar">`), Arabic sample texts for demos, and an e2e helper (the layout mirrored: start/end edges, arrow keys).
- [ ] **Dark-mode axe**: the page axe tests run a second time with `.dark`.
- [ ] **Style diff helper**: a script listing a shadcn component's classes next to ours, part by part, for the Styles column (by hand still decides — see [project notes on the parity method](shadcn-style-reference.md)).
- [ ] **Inventory refresh**: a script regenerating this table's facts (counterpart, e2e, RTL) so the roadmap stays true.

## Phase 1 — ui, with a shadcn counterpart (51)

Their look is the library's look; the simple ones first set the patterns (RTL, mobile, tests) the complex ones reuse.

|   # | Component                                                              | Size | shadcn                 | Styles | E2E | Mobile | RTL | Dark | Docs |
| --: | ---------------------------------------------------------------------- | ---: | ---------------------- | :----: | :-: | :----: | :-: | :--: | :--: |
|   1 | [Skeleton](../apps/showcase/src/app/pages/docs/skeleton)               |   19 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   2 | [Aspect Ratio](../apps/showcase/src/app/pages/docs/aspect-ratio)       |   21 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   3 | [Spinner](../apps/showcase/src/app/pages/docs/spinner)                 |   24 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   4 | [Separator](../apps/showcase/src/app/pages/docs/separator)             |   31 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   5 | [Kbd](../apps/showcase/src/app/pages/docs/kbd)                         |   42 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   6 | [Badge](../apps/showcase/src/app/pages/docs/badge)                     |   48 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   7 | [Input](../apps/showcase/src/app/pages/docs/input)                     |   60 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   8 | [Toggle](../apps/showcase/src/app/pages/docs/toggle)                   |   61 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   9 | [Textarea](../apps/showcase/src/app/pages/docs/textarea)               |   62 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  10 | [Label](../apps/showcase/src/app/pages/docs/label)                     |   63 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  11 | [Button](../apps/showcase/src/app/pages/docs/button)                   |   71 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  12 | [Slider](../apps/showcase/src/app/pages/docs/slider)                   |   80 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  13 | [Progress](../apps/showcase/src/app/pages/docs/progress)               |   88 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  14 | [Button Group](../apps/showcase/src/app/pages/docs/button-group)       |  101 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  15 | [Alert](../apps/showcase/src/app/pages/docs/alert)                     |  102 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  16 | [Native Select](../apps/showcase/src/app/pages/docs/native-select)     |  118 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  17 | [Toggle Group](../apps/showcase/src/app/pages/docs/toggle-group)       |  119 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  18 | [Breadcrumb](../apps/showcase/src/app/pages/docs/breadcrumb)           |  131 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  19 | [Empty](../apps/showcase/src/app/pages/docs/empty)                     |  138 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  20 | [Collapsible](../apps/showcase/src/app/pages/docs/collapsible)         |  140 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  21 | [Input Group](../apps/showcase/src/app/pages/docs/input-group)         |  145 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  22 | [Card](../apps/showcase/src/app/pages/docs/card)                       |  147 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  23 | [Avatar](../apps/showcase/src/app/pages/docs/avatar)                   |  166 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  24 | [Accordion](../apps/showcase/src/app/pages/docs/accordion)             |  167 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  25 | [Radio Group](../apps/showcase/src/app/pages/docs/radio-group)         |  167 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  26 | [Table](../apps/showcase/src/app/pages/docs/table)                     |  182 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  27 | [Tabs](../apps/showcase/src/app/pages/docs/tabs)                       |  188 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  28 | [Context Menu](../apps/showcase/src/app/pages/docs/context-menu)       |  224 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  29 | [Switch](../apps/showcase/src/app/pages/docs/switch)                   |  227 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  30 | [Item](../apps/showcase/src/app/pages/docs/item)                       |  252 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  31 | [Hover Card](../apps/showcase/src/app/pages/docs/hover-card)           |  256 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  32 | [Checkbox](../apps/showcase/src/app/pages/docs/checkbox)               |  263 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  33 | [Resizable](../apps/showcase/src/app/pages/docs/resizable)             |  267 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  34 | [Popover](../apps/showcase/src/app/pages/docs/popover)                 |  269 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  35 | [Scroll Area](../apps/showcase/src/app/pages/docs/scroll-area)         |  271 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  36 | [Drawer](../apps/showcase/src/app/pages/docs/drawer)                   |  304 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  37 | [Dialog](../apps/showcase/src/app/pages/docs/dialog)                   |  311 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  38 | [Sheet](../apps/showcase/src/app/pages/docs/sheet)                     |  321 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  39 | [Navigation Menu](../apps/showcase/src/app/pages/docs/navigation-menu) |  354 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  40 | [Alert Dialog](../apps/showcase/src/app/pages/docs/alert-dialog)       |  377 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  41 | [OTP Field](../apps/showcase/src/app/pages/docs/otp-field)             |  379 | input-otp              |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  42 | [Field](../apps/showcase/src/app/pages/docs/field)                     |  394 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  43 | [Tooltip](../apps/showcase/src/app/pages/docs/tooltip)                 |  401 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  44 | [Command](../apps/showcase/src/app/pages/docs/command)                 |  412 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  45 | [Menu](../apps/showcase/src/app/pages/docs/menu)                       |  426 | dropdown-menu, menubar |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  46 | [Select](../apps/showcase/src/app/pages/docs/select)                   |  617 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  47 | [Pagination](../apps/showcase/src/app/pages/docs/pagination)           |  667 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  48 | [Combobox](../apps/showcase/src/app/pages/docs/combobox)               |  713 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  49 | [Sidebar](../apps/showcase/src/app/pages/docs/sidebar)                 |  897 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  50 | [Toast](../apps/showcase/src/app/pages/docs/toast)                     | 1003 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  51 | [Calendar](../apps/showcase/src/app/pages/docs/calendar)               | 1204 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |

## Phase 2 — ui, our own (24)

|   # | Component                                                                  | Size | shadcn | Styles | E2E | Mobile | RTL | Dark | Docs |
| --: | -------------------------------------------------------------------------- | ---: | ------ | :----: | :-: | :----: | :-: | :--: | :--: |
|   1 | [Input Button](../apps/showcase/src/app/pages/docs/input-button)           |   25 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   2 | [Backdrop](../apps/showcase/src/app/pages/docs/backdrop)                   |   30 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   3 | [Copy to Clipboard](../apps/showcase/src/app/pages/docs/copy-to-clipboard) |   31 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   4 | [Link](../apps/showcase/src/app/pages/docs/link)                           |   32 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   5 | [Focus Trap](../apps/showcase/src/app/pages/docs/focus-trap)               |   48 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   6 | [Typography](../apps/showcase/src/app/pages/docs/typography)               |   48 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   7 | [Select On Focus](../apps/showcase/src/app/pages/docs/select-on-focus)     |   52 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   8 | [Hotkey](../apps/showcase/src/app/pages/docs/hotkey)                       |   87 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   9 | [Menu Bar](../apps/showcase/src/app/pages/docs/menu-bar)                   |  143 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  10 | [Password](../apps/showcase/src/app/pages/docs/password)                   |  158 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  11 | [Theme](../apps/showcase/src/app/pages/docs/theme)                         |  183 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  12 | [Toolbar](../apps/showcase/src/app/pages/docs/toolbar)                     |  209 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  13 | [Range Slider](../apps/showcase/src/app/pages/docs/range-slider)           |  232 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  14 | [Time Picker](../apps/showcase/src/app/pages/docs/time-picker)             |  292 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  15 | [Tree](../apps/showcase/src/app/pages/docs/tree)                           |  357 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  16 | [Rating](../apps/showcase/src/app/pages/docs/rating)                       |  383 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  17 | [Time Input](../apps/showcase/src/app/pages/docs/time-input)               |  432 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  18 | [Date Picker](../apps/showcase/src/app/pages/docs/date-picker)             |  461 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  19 | [Date Range Picker](../apps/showcase/src/app/pages/docs/date-range-picker) |  461 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  20 | [Multiselect](../apps/showcase/src/app/pages/docs/multiselect)             |  484 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  21 | [Autocomplete](../apps/showcase/src/app/pages/docs/autocomplete)           |  485 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  22 | [File Upload](../apps/showcase/src/app/pages/docs/file-upload)             |  508 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  23 | [Date Input](../apps/showcase/src/app/pages/docs/date-input)               |  671 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  24 | [Number Field](../apps/showcase/src/app/pages/docs/number-field)           | 1072 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |

## Phase 3 — ui-lab (49)

|   # | Component                                                                          |  Size | shadcn | Styles | E2E | Mobile | RTL | Dark | Docs |
| --: | ---------------------------------------------------------------------------------- | ----: | ------ | :----: | :-: | :----: | :-: | :--: | :--: |
|   1 | [Button Pattern](../apps/showcase/src/app/pages/docs/button-pattern)               |    28 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   2 | [Stacked Layout](../apps/showcase/src/app/pages/docs/stacked-layout)               |    36 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   3 | [Marker](../apps/showcase/src/app/pages/docs/marker)                               |    89 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   4 | [Intersection Observer](../apps/showcase/src/app/pages/docs/intersection-observer) |   109 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   5 | [Message](../apps/showcase/src/app/pages/docs/message)                             |   137 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   6 | [Bubble](../apps/showcase/src/app/pages/docs/bubble)                               |   148 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   7 | [Animated Counter](../apps/showcase/src/app/pages/docs/animated-counter)           |   186 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   8 | [Stat Card](../apps/showcase/src/app/pages/docs/stat-card)                         |   204 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   9 | [Masonry Grid](../apps/showcase/src/app/pages/docs/masonry-grid)                   |   234 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  10 | [Attachment](../apps/showcase/src/app/pages/docs/attachment)                       |   235 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  11 | [Kanban Board](../apps/showcase/src/app/pages/docs/kanban-board)                   |   237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  12 | [Sortable List](../apps/showcase/src/app/pages/docs/sortable-list)                 |   237 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  13 | [Confetti](../apps/showcase/src/app/pages/docs/confetti)                           |   239 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  14 | [QR Code](../apps/showcase/src/app/pages/docs/qr-code)                             |   251 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  15 | [Infinite Scroll](../apps/showcase/src/app/pages/docs/infinite-scroll)             |   259 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  16 | [Native Dialog](../apps/showcase/src/app/pages/docs/native-dialog)                 |   276 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  17 | [Marquee](../apps/showcase/src/app/pages/docs/marquee)                             |   292 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  18 | [Carousel](../apps/showcase/src/app/pages/docs/carousel)                           |   303 | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  19 | [Compare](../apps/showcase/src/app/pages/docs/compare)                             |   309 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  20 | [Dock](../apps/showcase/src/app/pages/docs/dock)                                   |   315 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  21 | [Org Chart](../apps/showcase/src/app/pages/docs/org-chart)                         |   324 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  22 | [Timeline](../apps/showcase/src/app/pages/docs/timeline)                           |   332 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  23 | [Navbar](../apps/showcase/src/app/pages/docs/navbar)                               |   372 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  24 | [Spotlight](../apps/showcase/src/app/pages/docs/spotlight)                         |   399 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  25 | [Language Switcher](../apps/showcase/src/app/pages/docs/language-switcher)         |   436 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  26 | [Countdown](../apps/showcase/src/app/pages/docs/countdown)                         |   447 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  27 | [Virtual List](../apps/showcase/src/app/pages/docs/virtual-list)                   |   451 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  28 | [Tags Input](../apps/showcase/src/app/pages/docs/tags-input)                       |   460 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  29 | [Speed Dial](../apps/showcase/src/app/pages/docs/speed-dial)                       |   468 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  30 | [Tour Guide](../apps/showcase/src/app/pages/docs/tour-guide)                       |   484 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  31 | [Phone Input](../apps/showcase/src/app/pages/docs/phone-input)                     |   512 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  32 | [Mention Input](../apps/showcase/src/app/pages/docs/mention-input)                 |   534 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  33 | [Data Table](../apps/showcase/src/app/pages/docs/data-table)                       |   553 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  34 | [Stepper](../apps/showcase/src/app/pages/docs/stepper)                             |   561 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  35 | [Barcode Scanner](../apps/showcase/src/app/pages/docs/barcode-scanner)             |   595 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  36 | [Time Clock](../apps/showcase/src/app/pages/docs/time-clock)                       |   605 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  37 | [Query Param State](../apps/showcase/src/app/pages/docs/query-param-state)         |   611 | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|  38 | [Transfer List](../apps/showcase/src/app/pages/docs/transfer-list)                 |   654 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  39 | [Color Picker](../apps/showcase/src/app/pages/docs/color-picker)                   |   782 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  40 | [Lightbox](../apps/showcase/src/app/pages/docs/lightbox)                           |   851 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  41 | [Notification Center](../apps/showcase/src/app/pages/docs/notification-center)     |   883 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  42 | [Signature Pad](../apps/showcase/src/app/pages/docs/signature-pad)                 |   905 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  43 | [Audio Player](../apps/showcase/src/app/pages/docs/audio-player)                   |  1083 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  44 | [Video Player](../apps/showcase/src/app/pages/docs/video-player)                   |  1112 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  45 | [Scheduler](../apps/showcase/src/app/pages/docs/scheduler)                         |  1172 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  46 | [Image Cropper](../apps/showcase/src/app/pages/docs/image-cropper)                 |  1395 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  47 | [Image Annotator](../apps/showcase/src/app/pages/docs/image-annotator)             |  1539 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  48 | [Emoji Picker](../apps/showcase/src/app/pages/docs/emoji-picker)                   |  1679 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|  49 | [PDF Viewer](../apps/showcase/src/app/pages/docs/pdf-viewer)                       | 12018 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |

## Phase 4 — code, charts, editor (5)

|   # | Component                                                      | Size | shadcn | Styles | E2E | Mobile | RTL | Dark | Docs |
| --: | -------------------------------------------------------------- | ---: | ------ | :----: | :-: | :----: | :-: | :--: | :--: |
|   1 | [Code Editor](../apps/showcase/src/app/pages/docs/code-editor) |  390 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   2 | [Code Block](../apps/showcase/src/app/pages/docs/code-block)   |  454 | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   3 | [Diff Viewer](../apps/showcase/src/app/pages/docs/diff-viewer) |  629 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
|   4 | [Charts](../apps/showcase/src/app/pages/docs/charts)           |  884 | chart  |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
|   5 | [Editor](../apps/showcase/src/app/pages/docs/editor)           | 1665 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |

## Later

- shadcn components we lack: `message-scroller`, `questionnaire`, `trace` (its AI pieces) — each a rewrite-process proposal when wanted.
- Visibility and status (Experimental → Developer Preview) stay separate decisions, per component.
