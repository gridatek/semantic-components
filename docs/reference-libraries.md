# Reference libraries

For a component shadcn/ui doesn't have — or whose behaviour shadcn leaves to
another library, as its charts do to Recharts — the libraries we follow: what
they do, what we took, and what is still open. We follow their behaviour and
layout — never their CSS; the look stays ours (shadcn's tokens).

Check them before deciding how a component behaves — don't guess.

## Charts

shadcn's charts are [Recharts](https://recharts.org) with shadcn's config,
tooltip and legend around it. Ours (`ui/charts`) take Recharts' API — composable
parts, their option names, their chart types — and shadcn's look, but the
drawing is our own: d3 for the maths (scales, shapes, stacks, the treemap and
sankey layouts), Angular templates and signals for the SVG. Recharts' code isn't
used; it's React.

| Library                                          | What to read                                                                                                                                                                                                                               |
| ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [Recharts](https://recharts.org)                 | The [API docs](https://recharts.org/en-US/api), part by part; the [source](https://github.com/recharts/recharts/tree/main/src) (`cartesian/`, `polar/`, `chart/`, `component/`); its [issues](https://github.com/recharts/recharts/issues) |
| [shadcn/ui charts](https://ui.shadcn.com/charts) | The examples (our checklist), the [chart docs](https://ui.shadcn.com/docs/components/chart): config, tooltip, legend; the styles in `registry/styles/style-nova.css`                                                                       |

**Check Recharts first when:**

- **Fixing a chart bug.** Recharts has met most of them — edge cases in stacks,
  negative values, empty data, a single row, labels that collide, a pointer
  between two points. Read how its part handles it (source, issues) before
  writing our own fix.
- **Writing or changing a part's README.** Its API docs say what each option
  does and its default; ours should cover the same ground, in our words.
- **Adding an option or a type.** Use its name and its default unless we have
  a reason not to (see below), so its examples port.

**Taken:**

- **The parts**: a plot holding a grid, axes, a cursor, series and labels
  (`LabelList`), with a tooltip and a legend.
- **The names**: `layout` (`vertical`), `stackOffset` (`expand`), `stack`
  (Recharts' `stackId`), `startAngle` / `endAngle`, `innerRadius`,
  `outerRadius`, `padAngle`, `cornerRadius`, label positions.
- **The types**: shadcn's six (area, bar, line, pie, radial, radar), then
  Recharts' scatter, funnel, treemap, sunburst and sankey.

**Ours, on purpose:**

- **Directives on the consumer's elements** (`<g scChartBar>`,
  `<svg scChartPlot>`), not components that render their own tags.
- **The axes are named by what they show**: `scChartCategoryAxis` and
  `scChartValueAxis`, not `XAxis` and `YAxis` — laid out `vertical`, the
  categories run down the side.
- **The keyboard and screen readers by default**: the plot is one tab stop,
  ←/→, Home and End move through the rows, the tooltip is a live region
  (Recharts: an opt-in `accessibilityLayer`).
- **A scatter's axes span its values**, not from 0 (Recharts' number axis
  default).
- **Less API**: no callback per event where state or Signal Forms cover it.

**Open — to follow it later:**

- **Animations.** Recharts animates its series as they appear and when the
  data changes (`isAnimationActive`, `animationBegin`, `animationDuration`,
  `animationEasing`); ours don't animate yet. Read how each series animates
  (bars grow from their base, lines draw along, slices sweep) and its
  defaults; honour `prefers-reduced-motion`.
- **What it has that we don't**: its other options per part (`Brush`,
  `ReferenceLine`, `ReferenceArea`, `ErrorBar`, axis `domain`, …), checked
  against shadcn's examples first.

## Link

A link styled as a button (`a[scLink]`). shadcn has no Link component — its Button page styles an `<a>` with `buttonVariants` — so it is checked against these (2026-10-30):

| Library                                                                                                | What to read                                                                                                                                                                                    |
| ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Base UI Button](https://base-ui.com/react/components/button)                                          | No link component: a Button must not render a link; a link that looks like a button is an `<a>` styled with CSS                                                                                 |
| [Angular Material](https://github.com/angular/components/blob/main/src/material/button/button-base.ts) | `a[mat-button]`: no `href` input, no default, no check or warning for a missing one; disabled: `aria-disabled`, `tabindex="-1"`, clicks stopped (`preventDefault` + `stopImmediatePropagation`) |
| [React Aria Link](https://react-aria.adobe.com/Link)                                                   | `isDisabled` blocks navigation and keeps the link announced; a link without `href` becomes `role="link"`                                                                                        |

**Taken:**

- **The address is the consumer's** (`href` or `routerLink`), as Angular Material: no `href` input, no default `'#'`, nothing written by the link; without one, the `<a>` is not a link — documented, not warned about (the user's choice).
- **Disabled** as Angular Material, plus middle-click, and in the capture phase so a `routerLink` never hears the click; the `href` kept, as React Aria.

## Input

A native text field (`input[scInput]`). A shadcn component: Base UI and shadcn's reference app (2026-10-30).

| Library                                                     | What to read                                                                                                                                           |
| ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Base UI Input (`@base-ui/react/docs`)                       | A native input that works with Field; must have an accessible name (a label or Field); state attributes (`data-invalid`, `data-dirty`, `data-filled`…) |
| shadcn Input (`shadcn-reference/presets/*/input.tsx`, docs) | Eight looks; examples: Field, Field Group, Disabled, Invalid, File, Inline, Grid, Required, Badge, Input Group, Button Group, Form, RTL                |

**Taken:**

- **The name rule**, as Base UI: a label or `aria-label`, and a dev warning without one (`ɵwarnIfUnnamed`).
- **Each preset's look**, from its own `input.tsx`; the parts that look like an input share it.
- **Not Base UI's state attributes**: Signal Forms holds that state (`touched`, `dirty`, `invalid`), and `aria-invalid` / `disabled` are what the styles read.

## Input Group

An input or a textarea with addons in one box (`div[scInputGroup]`). A shadcn component: Base UI has none; shadcn's reference app (2026-10-30).

| Library                                                                 | What to read                                                                                                                                                                                                                              |
| ----------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Input Group (`shadcn-reference/presets/*/input-group.tsx`, docs) | Six parts (group, addon, button, text, input, textarea); a click on an addon focuses the input; addons after the input for focus order, `align` to place them; a custom control joins with `data-slot="input-group-control"`; eight looks |

**Taken:**

- **The parts and behaviour**, with a button part of our own selector (`button[scInputGroupButton]`) on the preset's button.
- **Not the input and textarea parts**: the group shapes `scInput` / `scTextarea` itself, so there is one input, not two.

## Select

A choice among a short list (`div[scSelect]`). A shadcn component: Base UI's Select (local docs) and shadcn's reference app (2026-10-30).

| Library                                                                          | What to read                                                                                                                                                                                                                                                                                                |
| -------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Base UI Select (`@base-ui/react/docs/react/components/select.md`)                | Parts (Label, Trigger, Value, Icon, Popup, List, Item, ItemText, ItemIndicator, Group, GroupLabel, Separator, ScrollUp/DownArrow); `alignItemWithTrigger` (over the trigger; off by touch, without room); placeholder on the Value; `items` for labels; a name is required; prefer Combobox for large lists |
| shadcn Select on Radix (`shadcn-reference/presets-radix/*/select.tsx`), its docs | Eight looks (Radix's, the user's choice: not the Base UI ones); Radix's `position` (`item-aligned`, `popper`); examples: Align Item With Trigger, Groups, Scrollable, Disabled, Invalid, RTL                                                                                                                |

**Taken:**

- **The parts, the label and the scroll buttons**, as Base UI's; **the list below the trigger, as wide as it** (Radix's `popper`: the user wants the trigger in sight).
- **Not**: the list over the trigger (Base UI's `alignItemWithTrigger`, Radix's `item-aligned` — removed, 2026-11-03: "no more maintenance"), several values (our Multiselect), object values (a string, as Signal Forms binds it), Backdrop and Arrow (shadcn uses neither).

## Pagination

Pages of results (`nav[scPagination]`). A shadcn component, but Base UI and Radix have none, so compared on the web too, at the user's request (2026-11-03).

| Library                                                            | What to read                                                                                                                                                                                            |
| ------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Pagination (`shadcn-reference/presets/*/pagination.tsx`)    | Parts (Content, Item, Link, Previous, Next, Ellipsis): plain `a`s with your `href`, `aria-current="page"`, ellipsis `aria-hidden`; text hidden on phones; eight looks                                   |
| [Ark UI Pagination](https://ark-ui.com/docs/components/pagination) | `count`, `pageSize`, `page` (controlled or not), `siblingCount`, `boundaryCount`, `type: 'link'` with `getPageUrl`; context `previousPage`, `nextPage` (null at the ends), `pageRange`, `slice(data)`   |
| [Mantine Pagination](https://mantine.dev/core/pagination/)         | `siblings`, `boundaries`, `withEdges` (first, last); `getItemProps` / `getControlProps` for links; a responsive "Page X of Y" label                                                                     |
| [MUI Pagination](https://mui.com/material-ui/react-pagination/)    | `siblingCount`, `boundaryCount` (1 and 1: `1 … 5 6 7 … 11`, as many items wherever the page is); first/last buttons; router links through `renderItem`; `TablePagination` for rows per page and a range |

**Taken:**

- **shadcn's parts and look**; First, Last and a Status as Ark's and Mantine's.
- **`siblings`, `boundaries`** (all three; Mantine's names, Ark's and MUI's `siblingCount`, `boundaryCount` — renamed by the user, 2026-11-04), with MUI's algorithm: the count of items stays the same as the page moves.
- **`previousPage()`, `nextPage()`, `range()`** (Ark's context and `pageRange`): links' hrefs, "Showing 11–20 of 100".
- **Two-way `[(currentPage)]`, `[(pageSize)]`** (Ark's controlled `page`), as `model()`; `change` stays, the one event for loading a page.
- **Kept in range**: at least one page, the current page never past the last one (MUI and Ark).
- **Links follow their `href`** (shadcn, Ark's link type, Mantine, MUI — and Bootstrap's `?page=` links); a button is `type="button"` unless given a type.
- **Not**: `slice(data)` (`range()` covers it), Mantine's `startValue`, `withPages`, responsive layout; default labels (MUI's "pagination navigation": the text is the consumer's); a page-size part (a Select).

## Table

The native table elements, styled (`table[scTable]`). A shadcn component; Base UI has no table, so shadcn's reference app only (2026-11-04).

| Library                                               | What to read                                                                                                                                                        |
| ----------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Table (`shadcn-reference/presets/*/table.tsx`) | Parts on the native elements; the table wraps itself in a scrolling container; rows highlighted on hover, `has-aria-expanded`, `data-state="selected"`; eight looks |

**Taken:**

- **The parts and each preset's look** (the table's text size, header cell, cell, caption — the rest is the same in every style); the row's `has-aria-expanded` highlight.
- **A frame on the container** (`bordered`, the user's idea, 2026-11-04): shadcn's Table has none, its examples hard-code `rounded-md border`, which suits no style but vega and mira. It takes the preset's card frame (radius, ring, shadow; not its `overflow-hidden`, the container scrolls).
- **The container as a part of its own** (`scTableContainer`): a directive on `table` can't wrap it. Named and focusable when it scrolls (axe's `scrollable-region-focusable`).
- **Not**: the Actions example (a row's menu) and anything a Data Table does — sorting, selection, pages are on its page (the user, 2026-11-04).

## Card

A box of related content (`div[scCard]`). A shadcn component; Base UI has no card, so shadcn's reference app and its docs' examples (2026-11-04).

| Library                                                                                         | What to read                                                                                                                   |
| ----------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| shadcn Card (`shadcn-reference/presets/*/card.tsx`)                                             | Parts (Header, Title, Description, Action, Content, Footer); `size`; `--card-spacing`; eight looks (every part but the action) |
| shadcn's examples (`apps/v4/examples/base/card-*.tsx`, `content/docs/components/base/card.mdx`) | Demo (login), Small, Spacing, Edge to Edge, Image, RTL                                                                         |

**Taken:**

- **The parts, `size` and `--card-spacing`**, each preset's look; the examples, our way (Signal Forms, a local image, the Toggle Group).
- **`ScCardContent`**, shadcn's name (was `ScCardBody`; the user, 2026-11-04 — the library's Body/Content naming is still open).
- **Not**: the old Form, Notification and Stats demos (the user: replaced by better ones; stats are the Stat Card's).

## Badge

A short label (`span[scBadge]`). A shadcn component; Base UI has no badge, so shadcn's reference app and its docs' examples (2026-11-04).

| Library                                                                                           | What to read                                                                                   |
| ------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| shadcn Badge (`shadcn-reference/presets/*/badge.tsx`)                                             | Six variants in a cva; `data-icon` padding; `render` for a link; eight looks (sera: bare text) |
| shadcn's examples (`apps/v4/examples/base/badge-*.tsx`, `content/docs/components/base/badge.mdx`) | Variants, With Icon, With Spinner, Link, Custom Colors, RTL                                    |

**Taken:**

- **Each preset's cva** (`injectPreset().badge({ variant })`, as the button's); `badgeVariants` left the public API.
- **The examples**, our way: our Spinner (named, a status), the link on `a[scBadge]` with a `routerLink`.
- **The Tags Input's tags follow the preset; the Notification Center's count doesn't** (the user, 2026-11-04): a counter keeps a filled pill — sera's badges are bare text.

## Control Group

An input or a select joined with its buttons (`div[scControlGroup]`): shadcn's Button Group, renamed for what it is for (the user, 2026-10-30: it is only useful when inputs or selects mix with buttons; buttons alone are on the Button page). A shadcn component, so no web research: Base UI and shadcn's reference app (2026-10-30).

| Library                                                                   | What to read                                                                                                                             |
| ------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| shadcn Button Group (`shadcn-reference/presets/*/button-group.tsx`, docs) | `div role="group"`, named by `aria-label`; Tab to each button; text (`render` as a label) and a separator (its Separator); eight looks   |
| Base UI (`@base-ui/react/docs`)                                           | No button group. Its Toolbar is the other model — one tab stop, arrow keys between items — and its Toggle Group, for buttons that toggle |

**Taken:**

- **shadcn's model**: a plain group, Tab to each button — not Base UI's Toolbar (arrow keys), which is a component of its own. The page says when to use a Toggle Group or a Toolbar instead, as shadcn's "ButtonGroup vs ToggleGroup".
- **Each preset's look**, from its own `button-group.tsx`; the text on a `label` too, for shadcn's `render={<Label />}`.

## Tree Table

Tree rows in the Data Table (`ui/data-table`), the user's choice over a
component of its own: TanStack's expanding feature builds the tree, our parts
show it.

| Library                                                                             | What to read                                                                                         |
| ----------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| [WAI-ARIA treegrid](https://www.w3.org/WAI/ARIA/apg/patterns/treegrid/)             | The keyboard and the row attributes (`aria-level`, `aria-posinset`, `aria-setsize`, `aria-expanded`) |
| [TanStack Table: expanding](https://tanstack.com/table/latest/docs/guide/expanding) | `getSubRows`, `filterFromLeafRows`, `paginateExpandedRows`; its examples' checkbox states            |
| AG Grid, MUI X Data Grid ("tree data")                                              | The same idea as ours: a mode of the grid, the first column grouping                                 |

**Taken:**

- **The name "Tree Table"** (the user's choice); parts keep the Data
  Table's prefix (`scDataTableTreeGrid`, `scDataTableExpand`…).
- **The full treegrid keyboard** (the user's choice): rows are one tab stop;
  ↑/↓, → open or go in, ← close or go up (mirrored in RTL), Home/End, Enter,
  Space selects.
- **A parent half-ticked** while only some of its children are selected,
  selected itself or not — as TanStack's examples.

**Open — to follow them later:**

- **Children loaded on opening**: a row's children fetched when it opens.
- **Cell focus** inside a row (the treegrid pattern's cell navigation): rows
  only, for now.

## Gantt

Researched 2026-10-29 (weekly npm downloads, Gantt-specific libraries;
Mermaid and Highcharts draw Gantts among many charts and are left aside).

| Library                                                           | Weekly | What to read                                                                                                                                      |
| ----------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Frappe Gantt](https://github.com/frappe/gantt)                   | 277k   | Task `{ id, name, start, end, progress, dependencies }`; view modes Day/Week/Month/Year; drag, resize and progress with `snap_at`; `readonly*`    |
| [SVAR Gantt](https://docs.svar.dev/react/gantt/overview)          | 126k   | Task, summary and milestone; four link types; the task grid beside the chart (tree, sorting); zoom by scales; weekends and holidays; hotkeys      |
| [gantt-task-react](https://github.com/MaTeMaTuK/gantt-task-react) | 67k    | `task` / `milestone` / `project` (collapsible); `onDateChange` / `onProgressChange` that can refuse the change; RTL                               |
| dhtmlx-gantt                                                      | 52k    | The classic feature set (the free edition is GPL)                                                                                                 |
| [Kibo UI Gantt](https://www.kibo-ui.com/components/gantt)         | —      | shadcn-style parts: provider, sidebar, timeline, feature rows, markers, today; `range` daily/monthly/quarterly + `zoom`; no keyboard for its bars |
| @worktile/gantt                                                   | 8k     | The Angular one: day to year views, groups, children, links, drag                                                                                 |

None documents an accessible Gantt: no ARIA pattern exists for one, and
none gives the bars a keyboard (Kibo's drag is mouse only).

**Taken** (built 2026-10-29, `@semantic-components/ui/gantt`):

- **A timeline column for the Data Table**, its own entry (the user's
  choice): the task list is the tree grid, as SVAR's grid beside the chart.
- **Frappe's task** (`start`, `end`, `progress`, `dependencies`) and
  snapping a day at a time; **SVAR's** task, summary and milestone;
  **gantt-task-react's** changes the app may refuse (here: proposals,
  `dateChange` / `progressChange`).
- **Kibo's** parts and markers; its `range` became `scale` (day, week, month).
- **Ours**: Alt+arrows on a row, dates read out and announced.

**Open — to follow them later:** link types other than finish-to-start,
moving the followers, drawing links or tasks by drag.

| Library                                      | What to read                                                                                                                                                                                                                                                                                                                                                   |
| -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Vidstack](https://vidstack.io)              | The default layout ([docs](https://vidstack.io/docs/player/components/layouts/default-layout/), [source](https://github.com/vidstack/player/blob/main/packages/vidstack/src/elements/define/layouts/default/video-layout.ts)); when the controls show and hide ([source](https://github.com/vidstack/player/blob/main/packages/vidstack/src/core/controls.ts)) |
| [Media Chrome](https://www.media-chrome.org) | [Responsive controls](https://www.media-chrome.org/docs/en/responsive-controls); [autohide](https://www.media-chrome.org/docs/en/components/media-controller)                                                                                                                                                                                                  |

**Taken:**

- **A small layout below 576px of the player's width** (Vidstack's breakpoint; Tailwind's `@xl` container size): captions at the top (`scVideoPlayerTop`), play in the middle (`scVideoPlayerCenter`), time, title and fullscreen at the bottom (`scVideoPlayerBar`), the seek bar at the bottom edge. Out of it: the skips, mute, the volume slider, the speeds, picture-in-picture. The parts do it themselves (`@container/video`), not the template.
- **Before the first play** (Vidstack's start duration): the poster, play and the length only (`scVideoPlayerStartDuration`); the controls from the first play on.
- **The controls hide only while playing,** after a rest; paused, they stay (both).
- **On a touch screen, a tap on the playing video shows or hides the controls** — it doesn't pause (Vidstack, and the phones' own players).
- **Ended: Replay** in place of Play.

**Open — to follow them later:**

- **A settings menu** (Vidstack's, top bar of the small layout): the speeds — and captions, quality — in a menu, so a small player keeps them.
- **Volume as a pop-up** on the mute button (Vidstack), instead of a slider in the bar.
- **The hide delay: 2 s** (both); ours is 2.5 s.
- **Keep the controls while the pointer rests on them** (Media Chrome: not hidden while hovered); ours hide unless one has focus.
- **Hide when the pointer leaves the player** — an option in Vidstack (`hideOnMouseLeave`, off by default).
- **A medium layout** (Media Chrome, 420–590px): the center controls and the bar together.
