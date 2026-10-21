# Marquee

Your content written once and repeated to fill, at a speed in pixels a second, in four directions; it waits under the pointer and with focus, pauses on a button, and stands still for reduced motion.

## Architecture

```
[scMarquee] (direction: left | right | up | down · speed — px/s · gap — px · paused — two-way · fade)
├── <ng-template scMarqueeContent> — your content, written once
└── button[scMarqueePause]          — pause / play, beside the content
```

## Usage

```html
<section aria-label="Our users">
  <div scMarquee #logos="scMarquee" fade [gap]="48">
    <ng-template scMarqueeContent>
      @for (brand of brands; track brand) {
      <a [href]="brand.url">{{ brand.name }}</a>
      }
    </ng-template>
    <button scMarqueePause>
      @if (logos.paused()) {
      <svg siPlayIcon></svg><span class="sr-only">Play</span>
      } @else {
      <svg siPauseIcon></svg><span class="sr-only">Pause</span>
      }
    </button>
  </div>
</section>
```

A vertical marquee needs a height (`class="h-80"`).

## How it moves

- The template is repeated as often as it takes to fill what shows, and once more — the loop is seamless. The copies are `inert` and `aria-hidden`: screen readers and Tab meet your content once.
- `speed` is in pixels a second: the duration follows the content's size, so short and long content move at the same pace.
- It moves with the Web Animations API — no stylesheet — and pauses where it is.

## When it waits

- Under the pointer, and with focus in the content (Tab into a link): it waits, and goes on after.
- `paused` (two-way), with `scMarqueePause`: the way to stop it (WCAG 2.2.2). Focus on the button does not hold it.
- `prefers-reduced-motion`: it does not move — one copy, a row (or column) to scroll; `data-still` on it.

## Accessibility

- Name the region it is in (`section aria-label`); write the pause button's name from `paused()`.
- Links and buttons in the content stay usable: it waits for them.

## Not here

Dragging it by hand, a count of loops.
