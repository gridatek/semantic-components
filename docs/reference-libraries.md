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
