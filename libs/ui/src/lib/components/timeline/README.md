# Timeline

An ordered list of events, the line drawn between their markers; progress by status; times written from Temporal values; down one side, both, or across.

## Architecture

```
ol[scTimeline] (orientation: vertical | horizontal · align: start | end | alternate)
└── li[scTimelineItem] (status: done | current | upcoming)
    ├── [scTimelineOpposite]  — optional: across the line
    ├── [scTimelineMarker]    — the dot, or your icon in it; the line to the next
    └── [scTimelineContent]   — yours: [scTimelineTitle], [scTimelineDescription], time[scTimelineTime]
```

## Usage

```html
<ol scTimeline aria-label="Order 4815">
  @for (step of steps; track step.title) {
  <li scTimelineItem [status]="step.status">
    <div scTimelineMarker><svg siCheckIcon></svg></div>
    <div scTimelineContent>
      <p scTimelineTitle>{{ step.title }}</p>
      <time scTimelineTime [value]="step.at"></time>
    </div>
  </li>
  }
</ol>
```

## Layout

- `vertical`, `align`: `start` (content after the line), `end` (before it), `alternate` (in turn, the line in the middle). The items share one grid (subgrid): the line is straight, whatever the opposite's width.
- `horizontal`: a row — the opposite above each marker, the content below; it scrolls sideways when narrow, and takes focus to be scrolled from the keyboard (name it).
- Logical sides: right-to-left follows.

## Status

`done` (the default): a filled marker, a solid line after it. `current`: a ring — and `aria-current="step"`. `upcoming`: an outlined marker, a dashed line. The marker's `variant="destructive"` for a failure. Markers are decorative: say a status in words where it matters (`<span class="sr-only">— delivered</span>`).

## Time

`time[scTimelineTime]`, `[value]`: a `Temporal.PlainDate` (written as a date), `PlainDateTime`, `ZonedDateTime` or `Instant` (with its time) — in the app's language, its `datetime` set. `[options]`: `Intl.DateTimeFormat` options (`{ year: 'numeric', month: 'long' }`).

## Not here

Revealing items on scroll, zoomable time scales, loading more.
