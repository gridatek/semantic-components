# Spotlight

One element lit, the page dimmed, your content beside it in a native dialog — modal, or interactive: the element still usable through the cutout.

## Architecture

```
[scSpotlight] #spot (for · open — two-way · side · padding · interactive · dimClass · cardClass)   show() · close()
├── your content: [scSpotlightTitle], [scSpotlightDescription], your buttons
└── button[scSpotlightClose]
```

## Usage

```html
<button #export>Export</button>
<button (click)="spot.show()">What's new</button>

<div scSpotlight #spot="scSpotlight" [for]="export">
  <button scSpotlightClose><svg siXIcon></svg><span class="sr-only">Close</span></button>
  <h2 scSpotlightTitle>Export, now as PDF</h2>
  <p scSpotlightDescription>Your reports, ready to send.</p>
  <button (click)="spot.close()">Got it</button>
</div>
```

## Modal, or interactive

- Modal (default): a native modal dialog — the page inert, Escape or a click on the dim closes, focus goes back.
- `interactive`: the element stays usable through the cutout — click it, type in it; the rest is blocked by the dim, whose click closes. A non-modal dialog: focus goes to the card and can go to the element; Escape closes wherever focus is.

## Placement

The card goes on `side` (`top`, `bottom`, `start`, `end` — logical), flips when there is no room, then shifts to stay on screen; `data-side` says where. The element is scrolled into view (smoothly; at once for reduced motion); everything follows scrolling, resizing and the element changing size. It appears in place, then moves smoothly. Without `for`, the card is centred.

Shared with Tour Guide: `spotlightPlacement()` (`@semantic-components/ui-lab`).

## Look

`dimClass`: the dim and the cutout (`rounded-full`, a deeper `shadow-[0_0_0_200vmax_rgb(0_0_0/0.75)]`). `cardClass`: the card.

## Accessibility

- The dialog is named by `scSpotlightTitle`, described by `scSpotlightDescription`.
- Name the close button.

## Not here

Several elements at once, beacons. A sequence of spotlights is a tour (Tour Guide).
