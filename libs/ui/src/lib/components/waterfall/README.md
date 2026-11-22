# Waterfall

Spans — a page's requests, a trace, a build — as bars on a shared time axis; a span that started others opens on them. A tree grid. After ui-sdk's Waterfall, on its own parts (no TanStack).

## Architecture

```
div[scWaterfall] ([items], range, [(value)], [(expanded)], format, barLabel)   role treegrid
│  rows() · toggle() · expandAll() · collapseAll() · reveal() · focus() · percentAt() · formatTime()
├── div[scWaterfallHeaderRow]
│   ├── [scWaterfallColumnHeader]                — a column's name
│   └── [scWaterfallColumnHeader] aria-label="Timeline"
│       └── [scWaterfallAxis] (maxTicks)         — round times, or your [scWaterfallTick]s
│           └── [scWaterfallMark] [time]         — a moment across the rows; your text
└── @for (row of waterfall.rows())
    └── div[scWaterfallRow] [row]                — role row: level, place, open, selected
        ├── [scWaterfallRowHeader]               — the indicator and the label, indented
        │   └── button[scWaterfallIndicator]     — your chevron; the pointer's (aria-hidden)
        ├── [scWaterfallCell]                    — another column
        └── [scWaterfallBar]                     — the span on the axis, read as its times
```

## Usage

```html
<div scWaterfall #waterfall="scWaterfall" aria-label="Network requests" [items]="requests">
  <div scWaterfallHeaderRow>
    <div scWaterfallColumnHeader class="w-48">Name</div>
    <div scWaterfallColumnHeader aria-label="Timeline" class="flex-1">
      <div scWaterfallAxis><span scWaterfallMark [time]="620">DOMContentLoaded</span></div>
    </div>
  </div>
  @for (row of waterfall.rows(); track row.item.value) {
  <div scWaterfallRow [row]="row">
    <div scWaterfallRowHeader>
      <button scWaterfallIndicator><svg siChevronRightIcon></svg></button>
      {{ row.item.label }}
    </div>
    <div scWaterfallBar></div>
  </div>
  }
</div>
```

## Spans and time

- A span: `{ value, label, start, duration, children? }`, in ms on a shared clock.
- `rows()`: the rows shown — those whose parents are open (spans start closed). `[(expanded)]`: the open ones; `[(value)]`: the selected one.
- A bar is a share of `range` (by default the first start to the last end): `--sc-waterfall-start`, `--sc-waterfall-size`, from the start of the line (the right, right to left); out of the range, held to its edge. Change `range` to zoom: bars and ticks follow.
- Times: `format` — number format options for ms (`120 ms` by default) or a function — in the app's language (`LOCALE_ID`). A bar's label: its times as a range (`120–460 ms`, `Intl.NumberFormat#formatRange`), or `barLabel(item, { start, duration, range })`.
- Marks: a line through every bar at their time; `data-outside` (and hidden) when the range doesn't hold them. Ticks: round times (1, 2 or 5 × a power of ten), at most `maxTicks`; a tick's label is moved back by its place, so the first and last stay inside the axis.

## Keyboard

One Tab stop (the last focused row, the selected, or the first). ↓ ↑ rows; → opens, or goes to the first child; ← closes, or goes to the parent (mirrored right to left); Home / End; Page Up / Down ten rows; Enter / Space select; letters find a label.

## Look

Rows: a border, hover and selected as the style's table rows; cells and column headers the style's table cells; the bar's corners and colour the style's `waterfall` key.

## Not here

Cells in the keyboard path (rows only), windowed rendering (`rows()` renders the rows shown — closed spans keep large traces light), a controller object, tooltips.
