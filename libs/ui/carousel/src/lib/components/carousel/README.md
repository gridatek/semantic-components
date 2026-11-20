# Carousel

A slideshow with motion and swipe, built on [Embla](https://www.embla-carousel.com) (`embla-carousel`, an optional peer used only by the `@semantic-components/ui/carousel` entry point). shadcn's Carousel: its parts, look and examples.

## Usage

```html
<div scCarousel aria-roledescription="carousel" aria-label="Numbers" class="w-full max-w-xs">
  <div scCarouselViewport>
    <div scCarouselTrack>
      @for (n of slides; track n) {
      <div scCarouselItem #slide="scCarouselItem" aria-roledescription="slide" [attr.aria-label]="slide.index() + 1 + ' of ' + slide.count()">…</div>
      }
    </div>
  </div>
  <button scCarouselPrevious>
    <svg siChevronLeftIcon></svg>
    <span class="sr-only">Previous slide</span>
  </button>
  <button scCarouselNext>
    <svg siChevronRightIcon></svg>
    <span class="sr-only">Next slide</span>
  </button>
</div>
```

Dots, optional — one per position, inside the carousel (`#carousel="scCarousel"`):

```html
<div role="group" aria-label="Choose a slide" class="flex justify-center pt-2">
  @for (i of carousel.positions(); track i) {
  <button scCarouselDot [index]="i"><span class="sr-only">Slide {{ i + 1 }}</span></button>
  }
</div>
```

## Parts

| Part                 | Selector                     | What it does                                                                                                                                                                                                                                                                                                                                                                                                                         |
| -------------------- | ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `ScCarousel`         | `div[scCarousel]`            | The region (`role="region"`). `orientation`, `options`, `plugins`, `[(activeIndex)]`. exportAs `scCarousel`: `api()`, `count()` (positions), `positions()` (`0 … count − 1`, for the dots), `canScrollPrev()`, `canScrollNext()`, `scrollPrev()`, `scrollNext()`, `slides()`.                                                                                                                                                        |
| `ScCarouselViewport` | `div[scCarouselViewport]`    | Embla's viewport (`overflow-hidden`).                                                                                                                                                                                                                                                                                                                                                                                                |
| `ScCarouselTrack`    | `div[scCarouselTrack]`       | The row of slides (a column, vertical): `-ms-4` / `-mt-4` to match the slides' gap.                                                                                                                                                                                                                                                                                                                                                  |
| `ScCarouselItem`     | `div[scCarouselItem]`        | A slide (`role="group"`): `basis-full`, its gap as `ps-4` / `pt-4`. exportAs `scCarouselItem`: `index()` and `count()`, right from the first render (the slides register with the root, in page order).                                                                                                                                                                                                                              |
| `ScCarouselPrevious` | `button[scCarouselPrevious]` | The style's button (`variant` outline, `size` icon-sm) plus the style's `carousel` corners, outside the start (above, vertical); disabled when it can't move. The icon is the consumer's, turned 180° right to left (horizontal).                                                                                                                                                                                                    |
| `ScCarouselNext`     | `button[scCarouselNext]`     | The same, outside the end (below, vertical).                                                                                                                                                                                                                                                                                                                                                                                         |
| `ScCarouselDot`      | `button[scCarouselDot]`      | A position's dot (`index`): a click sets `activeIndex`; the current one has `aria-current` and is wider (not only darker). A 24px target (WCAG 2.5.8) that draws its mark with `::after`, in the style's `carousel.dot` corners; high-contrast colours in forced colours, no movement with reduced motion. The name is the consumer's (`sr-only`); the dots go in the consumer's group (`role="group"`, named), inside the carousel. |

## Behaviour

- **Embla starts in the browser** (after the first render), and again when `options`, `plugins` or `orientation` change. Its `direction` is the root's computed direction unless `options` give one, so a right-to-left page needs nothing more.
- **Keys**, with focus inside: ← and → (mirrored right to left), ↑ and ↓ when vertical. No modifiers.
- **`[(activeIndex)]`** is the scroll snap shown, both ways. `count()` is the number of snaps (fewer than the slides when several are in view).
- **Plugins** (autoplay…) go in `plugins`; each is a package of its own (`embla-carousel-autoplay`), installed where it is used. With autoplay, give a pause button (WCAG 2.2.2); the plugin emits `autoplay:play` / `autoplay:stop` before its `isPlaying()` changes, so follow the events.

## Accessibility

- The consumer writes every word: the region's `aria-label` and `aria-roledescription`, each slide's `aria-roledescription` and `aria-label` ("2 of 5"), the buttons' names (an `sr-only` span).
- The buttons are disabled at either end (not when `loop`).
- The dots: a named group of buttons, each named by the consumer ("Slide 2"); the current one `aria-current`. Each is a tab stop, as plain buttons (no roving focus): the arrows' keys move the slides, not between dots.

## Style

`carousel` (`ScCarouselStyles`): `button`, the Previous and Next buttons' corners — `rounded-full` in nova, vega, maia, mira and luma; `rounded-2xl` in rhea; none in lyra and sera (the style's button keeps its own); `dot`, the dots' corners — the same, square (`rounded-none`) in lyra and sera.
