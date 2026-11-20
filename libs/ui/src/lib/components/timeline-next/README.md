# Timeline Next

Dated events in order — an activity feed, a changelog, an order's steps: a list for screen readers, one tab stop, the arrow keys between events. After ui-sdk's Timeline; its parts style themselves.

## Usage

```html
<div scTimelineNext aria-label="Activity">
  <div scTimelineNextItem>
    <span scTimelineNextMarker></span>
    <span scTimelineNextConnector></span>
    <h3 scTimelineNextTitle>Deployed to production</h3>
    <time scTimelineNextTime datetime="2026-11-20T14:32">Today, 2:32 PM</time>
    <p scTimelineNextDescription>Version 2.4.1 is live in every region.</p>
  </div>
</div>
```

## Anatomy

```
[scTimelineNext]                    list (feed); name it — exportAs: focus(value?)
└── [scTimelineNextItem]            listitem (article); named by its title, described by its time and description
    ├── [scTimelineNextMarker]      the dot, or your icon in it; hidden
    ├── [scTimelineNextConnector]   the line to the next event; hidden; none after the last
    ├── [scTimelineNextTitle]       on your heading
    ├── time[scTimelineNextTime]    your <time datetime>
    └── [scTimelineNextDescription]
```

Every part inside an event is optional; put links, buttons or a collapsible in it too.

## Inputs

| On       | Input         | Type                                    | Default      |                                             |
| -------- | ------------- | --------------------------------------- | ------------ | ------------------------------------------- |
| timeline | `orientation` | `'vertical' \| 'horizontal'`            | `'vertical'` | Which way the events run (and which arrows) |
| timeline | `loop`        | `boolean`                               | `true`       | The arrows wrap from last to first          |
| timeline | `feed`        | `boolean`                               | `false`      | A feed of articles that loads more          |
| timeline | `busy`        | `boolean`                               | `false`      | Loading more (`aria-busy`), in a feed       |
| item     | `status`      | `'complete' \| 'current' \| 'upcoming'` | none         | Where it is in a process                    |
| item     | `value`       | `string`                                | generated    | Names the event for `focus(value)`          |

## Look

The style draws it — its `timeline` key (ours: shadcn has no timeline): titles and descriptions as the style's Item text, the markers' corners and the current one's ring as its badges and focus rings, the gap between events, the line's colour, the item's corners and focus ring. Square markers in lyra and sera, uppercase titles in sera, more room in maia and luma, less in mira and rhea.

Each event leaves room for its marker (before it, or above it across), the connector running from the marker to the next one. The marker is filled (complete, or no status), ringed (current) or muted (upcoming); the line after a complete event is the primary colour.

- `--sc-timeline-line` (the style's) is the title line's height, which the markers line up with.
- `--sc-timeline-marker` on the timeline sizes the markers (0.75rem; larger for an icon: `[--sc-timeline-marker:1.25rem]`).
- `--sc-timeline-count` (the timeline) and `--sc-timeline-index` (each item): for a grid of your own, or staggered animations.
- On each item: `data-complete`, `data-current`, `data-upcoming`, `data-orientation`, `data-first`, `data-last` — style its insides by state with `in-data-current:` and the like.

## Keyboard and screen readers

- One tab stop: Tab enters on the current event, else the first, then on the one focused last; it goes on to the links and buttons inside an event.
- ↑ ↓ (vertical) or ← → (horizontal, mirrored right to left) between events, on the event itself; Home and End; `loop` off stops at the ends.
- A feed: role `feed`, its events `article`s with `aria-posinset` / `aria-setsize`, `aria-busy` while loading; Page Up and Page Down between articles from anywhere in one.
- The current event is `aria-current="step"`. A status shown only by the marker is seen, not read: say it in the title or description too.
