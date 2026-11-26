# Timeline

Dated events in order — an activity feed, a changelog, an order's steps: a list for screen readers, one tab stop, the arrow keys between events. After ui-sdk's Timeline; its parts style themselves.

## Usage

```html
<div scTimeline aria-label="Activity">
  <div scTimelineItem>
    <span scTimelineMarker></span>
    <span scTimelineConnector></span>
    <h3 scTimelineTitle>Deployed to production</h3>
    <time scTimelineTime datetime="2026-11-20T14:32">Today, 2:32 PM</time>
    <p scTimelineDescription>Version 2.4.1 is live in every region.</p>
  </div>
</div>
```

## Anatomy

```
[scTimeline]                    list (feed); name it — exportAs: focus(value?)
└── [scTimelineItem]            listitem (article); named by its title, described by its time and description
    ├── [scTimelineMarker]      the dot, or your icon in it; hidden
    ├── [scTimelineConnector]   the line to the next event; hidden; none after the last
    ├── [scTimelineOpposite]    across the line: a date, a year (above the content, across)
    ├── [scTimelineTitle]       on your heading
    ├── time[scTimelineTime]    your <time>: [value] a Temporal date or moment, written in the locale; or your words + datetime
    └── [scTimelineDescription]
```

Every part inside an event is optional; put links, buttons or a collapsible in it too.

## Inputs

| On       | Input         | Type                                                | Default      |                                                 |
| -------- | ------------- | --------------------------------------------------- | ------------ | ----------------------------------------------- |
| timeline | `alignment`   | `'start' \| 'end' \| 'alternate'`                   | `'start'`    | Vertical: after the line, before it, or in turn |
| timeline | `orientation` | `'vertical' \| 'horizontal'`                        | `'vertical'` | Which way the events run (and which arrows)     |
| timeline | `loop`        | `boolean`                                           | `true`       | The arrows wrap from last to first              |
| timeline | `feed`        | `boolean`                                           | `false`      | A feed of articles that loads more              |
| timeline | `busy`        | `boolean`                                           | `false`      | Loading more (`aria-busy`), in a feed           |
| item     | `status`      | `'complete' \| 'current' \| 'upcoming' \| 'failed'` | none         | Where it is in a process                        |
| item     | `value`       | `string`                                            | generated    | Names the event for `focus(value)`              |

## Look

The style draws it — its `timeline` key (ours: shadcn has no timeline): titles and descriptions as the style's Item text, the markers' corners and the current one's ring as its badges and focus rings, the gap between events, the line's colour, the item's corners and focus ring. Square markers in lyra and sera, uppercase titles in sera, more room in maia and luma, less in mira and rhea.

Vertical, the events are the rows of one grid (subgrid) — the opposite, the line, the content — so the line stays straight whatever the opposite's width; `alternate` puts the line in the middle and the content on either side in turn. Across, a row with the marker above each event, scrolled sideways when narrow (an event focused scrolls into view). The marker is filled (complete, or no status), ringed (current), muted (upcoming) or in the destructive colour (failed); the line after a complete event is the primary colour.

- `--sc-timeline-line` (the style's) is the title line's height, which the markers line up with.
- `--sc-timeline-marker` on the timeline sizes the markers (0.75rem; larger for an icon: `[--sc-timeline-marker:1.25rem]`).
- `--sc-timeline-count` (the timeline) and `--sc-timeline-index` (each item): for a grid of your own, or staggered animations.
- On each item: `data-complete`, `data-current`, `data-upcoming`, `data-orientation`, `data-first`, `data-last` — style its insides by state with `in-data-current:` and the like.

## Keyboard and screen readers

- One tab stop: Tab enters on the current event, else the first, then on the one focused last; it goes on to the links and buttons inside an event. A horizontal timeline that scrolls is not a tab stop of its own (`tabindex="-1"`: Firefox would make it one); an event focused scrolls into view. The events are put in the page's order when read, not as each registers (a `@for` stamps them before they are in the page).
- ↑ ↓ (vertical) or ← → (horizontal, mirrored right to left) between events, on the event itself; Home and End; `loop` off stops at the ends.
- A feed: role `feed`, its events `article`s with `aria-posinset` / `aria-setsize`, `aria-busy` while loading; Page Up and Page Down between articles from anywhere in one.
- The current event is `aria-current="step"`. A status shown only by the marker is seen, not read: say it in the title or description too.
