# Carousel New

A slideshow with motion and swipe, built on [Embla](https://www.embla-carousel.com) (`embla-carousel`, an optional peer used only by the `@semantic-components/ui/carousel` entry point). shadcn's Carousel for its parts and look; [UI SDK's Carousel](https://ui-sdk.dev/docs/react/components/carousel) for pages, indicators, autoplay and accessibility. Being built to replace the Carousel; the Lightbox becomes a recipe on it.

## Usage

```html
<div scCarouselNew #carousel="scCarouselNew" aria-roledescription="carousel" aria-label="Numbers" class="w-full max-w-xs">
  <div scCarouselNewViewport>
    <div scCarouselNewTrack>
      @for (n of slides; track n) {
      <div scCarouselNewItem #slide="scCarouselNewItem" aria-roledescription="slide" [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()">…</div>
      }
    </div>
  </div>
  <button scCarouselNewPrevious>
    <svg siChevronLeftIcon></svg>
    <span class="sr-only">Previous slide</span>
  </button>
  <button scCarouselNewNext>
    <svg siChevronRightIcon></svg>
    <span class="sr-only">Next slide</span>
  </button>
  <div scCarouselNewIndicators aria-label="Choose a slide">
    @for (page of carousel.pages(); track page) {
    <button scCarouselNewIndicator [page]="page"><span class="sr-only">Slide {{ page + 1 }}</span></button>
    }
  </div>
</div>
```

## Parts

| Part                      | Selector                          | What it does                                                                                                                                                                                                                                                                                                                           |
| ------------------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScCarouselNew`           | `div[scCarouselNew]`              | The region. `orientation`, `align` (`start`), `slidesPerPage` (1, a number or `'auto'`), `loop`, `dragFree`, `skipSnaps`, `drag` (on), `plugins`; `[(page)]` from 0; `[(playing)]`, `interval` (5000). exportAs: `pageCount()`, `pages()`, `pageOf(slide)`, `canPrevious()`, `canNext()`, `previous()`, `next()`, `paused()`, `api()`. |
| `ScCarouselNewViewport`   | `div[scCarouselNewViewport]`      | Embla's viewport (`overflow-hidden`).                                                                                                                                                                                                                                                                                                  |
| `ScCarouselNewTrack`      | `div[scCarouselNewTrack]`         | The row of slides (a column, vertical): `-ms-4` / `-mt-4` to match the slides' gap. `aria-live` polite while not rotating, off while rotating.                                                                                                                                                                                         |
| `ScCarouselNewItem`       | `div[scCarouselNewItem]`          | A slide (`role="group"`): `basis-full`, its gap as `ps-4` / `pt-4`; `inert` less than half in view. exportAs: `index()`, `count()`, `active()`, `inView()`. `data-active`, `data-in-view`.                                                                                                                                             |
| `ScCarouselNewPrevious`   | `button[scCarouselNewPrevious]`   | The style's button (`outline`, `icon-sm`) plus the style's `carousel` corners, outside the start (above, vertical). `aria-disabled` when it can't move, still focusable. The icon is the consumer's, turned 180° right to left.                                                                                                        |
| `ScCarouselNewNext`       | `button[scCarouselNewNext]`       | The same, outside the end (below, vertical).                                                                                                                                                                                                                                                                                           |
| `ScCarouselNewIndicators` | `div[scCarouselNewIndicators]`    | A tablist (the consumer names it), inside the carousel: one tab stop; ← → (mirrored), Home, End move between indicators and show their pages.                                                                                                                                                                                          |
| `ScCarouselNewIndicator`  | `button[scCarouselNewIndicator]`  | A page's tab (`page`): `aria-selected`, roving `tabindex`, `aria-controls` its page's slides. A 24px target (WCAG 2.5.8) that draws its mark with `::after`, wider when selected, in the style's `carousel.dot` corners.                                                                                                               |
| `ScCarouselNewPlayToggle` | `button[scCarouselNewPlayToggle]` | Starts and stops the rotation: the style's button (`outline`, `icon-sm`), placed by the consumer. The consumer writes its icon and a name that follows `playing()` (Pause, Play), no `aria-pressed`. `data-playing`.                                                                                                                   |

## Behaviour

- **Embla starts in the browser** (after the first render), and again when an option or `plugins` change. Its `direction` is the root's computed direction. Before it measures (on the server), every slide counts as in view and a page is `slidesPerPage` slides.
- **Pages**: Embla's scroll snaps (`slidesToScroll` from `slidesPerPage`, `containScroll` trimming the end: the last slides that can't start a page join the last). `slideRegistry` gives each page's slides.
- **Keys**, with focus inside (not in a text field): ← and → (mirrored right to left), ↑ and ↓ when vertical, Home, End. Focus in a slide that leaves moves to the incoming slide (given `tabindex="-1"`).
- **Autoplay**: a timer per page, set again by each change; at the end it goes back to the first. Paused (`data-paused`) while hovered by a mouse, with a pointer down, in a hidden tab, or out of view (IntersectionObserver). Stopped by `previous()`, `next()`, an indicator, Home, End, a swipe that changes page, or keyboard focus coming in (`:focus-visible`). Under reduced motion it doesn't start by itself, and moves jump instead of gliding.
- **`--sc-carousel-progress`**: Embla's scroll progress (0 to 1), written on the root at every `scroll` event, outside change detection. `--sc-carousel-interval`: `interval` in ms.

## Accessibility

- The consumer writes every word: the region's `aria-label` and `aria-roledescription`, each slide's `aria-roledescription` and `aria-label` ("2 of 5"), the indicators' list name and each one's name, the buttons' names (an `sr-only` span).
- Slides less than half in view are `inert`: Tab and screen readers reach what shows.
- Previous and Next are `aria-disabled` at either end (never when `loop`), so focus stays on them.

## Style

`carousel` (`ScCarouselStyles`): `button`, the Previous, Next and play toggle's corners — `rounded-full` in nova, vega, maia, mira and luma; `rounded-2xl` in rhea; none in lyra and sera (the style's button keeps its own); `dot`, the indicators' corners — the same, square (`rounded-none`) in lyra and sera.
