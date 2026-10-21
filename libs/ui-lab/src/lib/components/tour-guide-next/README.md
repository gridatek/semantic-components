# Tour Guide Next

The tour guide, rebuilt: your steps as markup on their targets, one at a time in a native modal dialog — a spotlight on the target, the card beside it, flipping to stay on screen; scrolled into view, named and described, with the keys.

## Architecture

```
[scTourGuideNext] #tour (open, step — two-way · (finished))  start() · next() · previous() · close() · count() · first() · last()
├── <ng-template scTourGuideNextStep [for]="target" side="bottom" [padding]="8"> — a step, your markup
│   ├── [scTourGuideNextTitle]       — names the step
│   └── [scTourGuideNextDescription] — describes it
└── your footer, once: buttons [scTourGuideNextNext], [scTourGuideNextPrevious], [scTourGuideNextClose]; your progress
```

## Usage

```html
<input #search type="search" aria-label="Search" />
<button (click)="tour.start()">Take the tour</button>

<div scTourGuideNext #tour="scTourGuideNext" (finished)="seen()">
  <ng-template scTourGuideNextStep>
    <h2 scTourGuideNextTitle>Welcome</h2>
    <p scTourGuideNextDescription>A minute to see around.</p>
  </ng-template>
  <ng-template scTourGuideNextStep [for]="search">
    <h2 scTourGuideNextTitle>Search everything</h2>
    <p scTourGuideNextDescription>Projects, people and files.</p>
  </ng-template>

  <button scTourGuideNextClose><svg siXIcon></svg><span class="sr-only">Close tour</span></button>
  <span>{{ tour.step() + 1 }} of {{ tour.count() }}</span>
  <button scTourGuideNextPrevious>Back</button>
  <button scTourGuideNextNext>{{ tour.last() ? 'Done' : 'Next' }}</button>
</div>
```

Put only the steps and the footer in the tour; the targets are anywhere (template references).

## Steps

- `[for]`: the target element; none, the card is centred and all is dimmed (a welcome, a farewell).
- `side`: `top`, `bottom` (default), `start`, `end` — logical; if there is no room, the opposite, then the others; then shifted to stay on screen. `data-side` on the card says which.
- `padding`: the room around the target in the spotlight.
- Each step: its target scrolled into view (smoothly; at once for reduced motion), the spotlight and the card placed — again when the page scrolls, resizes or the target changes size — and focus on the card.

## The dialog

A native `dialog`, opened modal: the page behind is inert. Named by the step's title, described by its text. ← → step (reversed right to left), Escape closes; focus goes back to what had it when the tour started.

## Ending

- `next()` at the last step ends the tour, `(finished)`.
- `close()`, Escape, the close button: ended, not finished.
- What to remember (seen, not seen) is yours.

## Not here

Hint beacons, advancing when the target is clicked (the page is inert), tours across routes.
