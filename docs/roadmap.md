# Roadmap

Every component brought to the same bar: shadcn's look, tested, mobile first, right to left, in light and dark. One component at a time, each row ticked when it meets the definition of done.

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

The most used components first: their look is the library's look.

| Component                                                              | shadcn                 | Styles | E2E | Mobile | RTL | Dark | Docs |
| ---------------------------------------------------------------------- | ---------------------- | :----: | :-: | :----: | :-: | :--: | :--: |
| [Accordion](../apps/showcase/src/app/pages/docs/accordion)             | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Alert](../apps/showcase/src/app/pages/docs/alert)                     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Alert Dialog](../apps/showcase/src/app/pages/docs/alert-dialog)       | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Aspect Ratio](../apps/showcase/src/app/pages/docs/aspect-ratio)       | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Avatar](../apps/showcase/src/app/pages/docs/avatar)                   | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Badge](../apps/showcase/src/app/pages/docs/badge)                     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Breadcrumb](../apps/showcase/src/app/pages/docs/breadcrumb)           | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Button](../apps/showcase/src/app/pages/docs/button)                   | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Button Group](../apps/showcase/src/app/pages/docs/button-group)       | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Calendar](../apps/showcase/src/app/pages/docs/calendar)               | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Card](../apps/showcase/src/app/pages/docs/card)                       | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Checkbox](../apps/showcase/src/app/pages/docs/checkbox)               | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Collapsible](../apps/showcase/src/app/pages/docs/collapsible)         | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Combobox](../apps/showcase/src/app/pages/docs/combobox)               | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Command](../apps/showcase/src/app/pages/docs/command)                 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Context Menu](../apps/showcase/src/app/pages/docs/context-menu)       | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Dialog](../apps/showcase/src/app/pages/docs/dialog)                   | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Drawer](../apps/showcase/src/app/pages/docs/drawer)                   | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Empty](../apps/showcase/src/app/pages/docs/empty)                     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Field](../apps/showcase/src/app/pages/docs/field)                     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Hover Card](../apps/showcase/src/app/pages/docs/hover-card)           | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Input](../apps/showcase/src/app/pages/docs/input)                     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Input Group](../apps/showcase/src/app/pages/docs/input-group)         | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Item](../apps/showcase/src/app/pages/docs/item)                       | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Kbd](../apps/showcase/src/app/pages/docs/kbd)                         | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Label](../apps/showcase/src/app/pages/docs/label)                     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Menu](../apps/showcase/src/app/pages/docs/menu)                       | dropdown-menu, menubar |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Native Select](../apps/showcase/src/app/pages/docs/native-select)     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Navigation Menu](../apps/showcase/src/app/pages/docs/navigation-menu) | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [OTP Field](../apps/showcase/src/app/pages/docs/otp-field)             | input-otp              |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Pagination](../apps/showcase/src/app/pages/docs/pagination)           | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Popover](../apps/showcase/src/app/pages/docs/popover)                 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Progress](../apps/showcase/src/app/pages/docs/progress)               | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Radio Group](../apps/showcase/src/app/pages/docs/radio-group)         | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Resizable](../apps/showcase/src/app/pages/docs/resizable)             | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Scroll Area](../apps/showcase/src/app/pages/docs/scroll-area)         | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Select](../apps/showcase/src/app/pages/docs/select)                   | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Separator](../apps/showcase/src/app/pages/docs/separator)             | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Sheet](../apps/showcase/src/app/pages/docs/sheet)                     | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Sidebar](../apps/showcase/src/app/pages/docs/sidebar)                 | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Skeleton](../apps/showcase/src/app/pages/docs/skeleton)               | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Slider](../apps/showcase/src/app/pages/docs/slider)                   | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Spinner](../apps/showcase/src/app/pages/docs/spinner)                 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Switch](../apps/showcase/src/app/pages/docs/switch)                   | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Table](../apps/showcase/src/app/pages/docs/table)                     | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Tabs](../apps/showcase/src/app/pages/docs/tabs)                       | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Textarea](../apps/showcase/src/app/pages/docs/textarea)               | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Toast](../apps/showcase/src/app/pages/docs/toast)                     | yes                    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Toggle](../apps/showcase/src/app/pages/docs/toggle)                   | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Toggle Group](../apps/showcase/src/app/pages/docs/toggle-group)       | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Tooltip](../apps/showcase/src/app/pages/docs/tooltip)                 | yes                    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |

## Phase 2 — ui, our own (24)

| Component                                                                  | shadcn | Styles | E2E | Mobile | RTL | Dark | Docs |
| -------------------------------------------------------------------------- | ------ | :----: | :-: | :----: | :-: | :--: | :--: |
| [Autocomplete](../apps/showcase/src/app/pages/docs/autocomplete)           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Backdrop](../apps/showcase/src/app/pages/docs/backdrop)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Copy to Clipboard](../apps/showcase/src/app/pages/docs/copy-to-clipboard) | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Date Input](../apps/showcase/src/app/pages/docs/date-input)               | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Date Picker](../apps/showcase/src/app/pages/docs/date-picker)             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Date Range Picker](../apps/showcase/src/app/pages/docs/date-range-picker) | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [File Upload](../apps/showcase/src/app/pages/docs/file-upload)             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Focus Trap](../apps/showcase/src/app/pages/docs/focus-trap)               | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Hotkey](../apps/showcase/src/app/pages/docs/hotkey)                       | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Input Button](../apps/showcase/src/app/pages/docs/input-button)           | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Link](../apps/showcase/src/app/pages/docs/link)                           | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Menu Bar](../apps/showcase/src/app/pages/docs/menu-bar)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Multiselect](../apps/showcase/src/app/pages/docs/multiselect)             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Number Field](../apps/showcase/src/app/pages/docs/number-field)           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Password](../apps/showcase/src/app/pages/docs/password)                   | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Range Slider](../apps/showcase/src/app/pages/docs/range-slider)           | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Rating](../apps/showcase/src/app/pages/docs/rating)                       | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Select On Focus](../apps/showcase/src/app/pages/docs/select-on-focus)     | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Theme](../apps/showcase/src/app/pages/docs/theme)                         | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Time Input](../apps/showcase/src/app/pages/docs/time-input)               | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Time Picker](../apps/showcase/src/app/pages/docs/time-picker)             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Toolbar](../apps/showcase/src/app/pages/docs/toolbar)                     | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Tree](../apps/showcase/src/app/pages/docs/tree)                           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Typography](../apps/showcase/src/app/pages/docs/typography)               | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |

## Phase 3 — ui-lab (49)

| Component                                                                          | shadcn | Styles | E2E | Mobile | RTL | Dark | Docs |
| ---------------------------------------------------------------------------------- | ------ | :----: | :-: | :----: | :-: | :--: | :--: |
| [Animated Counter](../apps/showcase/src/app/pages/docs/animated-counter)           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Attachment](../apps/showcase/src/app/pages/docs/attachment)                       | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Audio Player](../apps/showcase/src/app/pages/docs/audio-player)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Barcode Scanner](../apps/showcase/src/app/pages/docs/barcode-scanner)             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Bubble](../apps/showcase/src/app/pages/docs/bubble)                               | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Button Pattern](../apps/showcase/src/app/pages/docs/button-pattern)               | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Carousel](../apps/showcase/src/app/pages/docs/carousel)                           | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Color Picker](../apps/showcase/src/app/pages/docs/color-picker)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Compare](../apps/showcase/src/app/pages/docs/compare)                             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Confetti](../apps/showcase/src/app/pages/docs/confetti)                           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Countdown](../apps/showcase/src/app/pages/docs/countdown)                         | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Data Table](../apps/showcase/src/app/pages/docs/data-table)                       | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Dock](../apps/showcase/src/app/pages/docs/dock)                                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Emoji Picker](../apps/showcase/src/app/pages/docs/emoji-picker)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Image Annotator](../apps/showcase/src/app/pages/docs/image-annotator)             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Image Cropper](../apps/showcase/src/app/pages/docs/image-cropper)                 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Infinite Scroll](../apps/showcase/src/app/pages/docs/infinite-scroll)             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Intersection Observer](../apps/showcase/src/app/pages/docs/intersection-observer) | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Kanban Board](../apps/showcase/src/app/pages/docs/kanban-board)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Language Switcher](../apps/showcase/src/app/pages/docs/language-switcher)         | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Lightbox](../apps/showcase/src/app/pages/docs/lightbox)                           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Marker](../apps/showcase/src/app/pages/docs/marker)                               | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Marquee](../apps/showcase/src/app/pages/docs/marquee)                             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Masonry Grid](../apps/showcase/src/app/pages/docs/masonry-grid)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Mention Input](../apps/showcase/src/app/pages/docs/mention-input)                 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Message](../apps/showcase/src/app/pages/docs/message)                             | yes    |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Native Dialog](../apps/showcase/src/app/pages/docs/native-dialog)                 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Navbar](../apps/showcase/src/app/pages/docs/navbar)                               | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Notification Center](../apps/showcase/src/app/pages/docs/notification-center)     | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Org Chart](../apps/showcase/src/app/pages/docs/org-chart)                         | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [PDF Viewer](../apps/showcase/src/app/pages/docs/pdf-viewer)                       | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Phone Input](../apps/showcase/src/app/pages/docs/phone-input)                     | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [QR Code](../apps/showcase/src/app/pages/docs/qr-code)                             | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Query Param State](../apps/showcase/src/app/pages/docs/query-param-state)         | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Scheduler](../apps/showcase/src/app/pages/docs/scheduler)                         | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Signature Pad](../apps/showcase/src/app/pages/docs/signature-pad)                 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Sortable List](../apps/showcase/src/app/pages/docs/sortable-list)                 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Speed Dial](../apps/showcase/src/app/pages/docs/speed-dial)                       | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Spotlight](../apps/showcase/src/app/pages/docs/spotlight)                         | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Stacked Layout](../apps/showcase/src/app/pages/docs/stacked-layout)               | —      |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Stat Card](../apps/showcase/src/app/pages/docs/stat-card)                         | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Stepper](../apps/showcase/src/app/pages/docs/stepper)                             | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Tags Input](../apps/showcase/src/app/pages/docs/tags-input)                       | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Time Clock](../apps/showcase/src/app/pages/docs/time-clock)                       | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Timeline](../apps/showcase/src/app/pages/docs/timeline)                           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Tour Guide](../apps/showcase/src/app/pages/docs/tour-guide)                       | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Transfer List](../apps/showcase/src/app/pages/docs/transfer-list)                 | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Video Player](../apps/showcase/src/app/pages/docs/video-player)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Virtual List](../apps/showcase/src/app/pages/docs/virtual-list)                   | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |

## Phase 4 — code, charts, editor (5)

| Component                                                      | shadcn | Styles | E2E | Mobile | RTL | Dark | Docs |
| -------------------------------------------------------------- | ------ | :----: | :-: | :----: | :-: | :--: | :--: |
| [Charts](../apps/showcase/src/app/pages/docs/charts)           | chart  |  [ ]   | [ ] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Code Block](../apps/showcase/src/app/pages/docs/code-block)   | yes    |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Code Editor](../apps/showcase/src/app/pages/docs/code-editor) | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Diff Viewer](../apps/showcase/src/app/pages/docs/diff-viewer) | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |
| [Editor](../apps/showcase/src/app/pages/docs/editor)           | —      |  [ ]   | [x] |  [ ]   | [ ] | [ ]  | [ ]  |

## Later

- shadcn components we lack: `message-scroller`, `questionnaire`, `trace` (its AI pieces) — each a rewrite-process proposal when wanted.
- Visibility and status (Experimental → Developer Preview) stay separate decisions, per component.
