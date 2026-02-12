# Carousel

A carousel component built with Embla Carousel, featuring smooth animations, touch/swipe gestures, and plugin support.

## Usage

```html
<div sc-carousel class="w-full max-w-xs">
  <div sc-carousel-viewport>
    <div sc-carousel-track>
      <div sc-carousel-item>Slide 1</div>
      <div sc-carousel-item>Slide 2</div>
      <div sc-carousel-item>Slide 3</div>
    </div>
  </div>
  <button sc-carousel-previous>
    <svg si-chevron-left-icon></svg>
    <span class="sr-only">Previous slide</span>
  </button>
  <button sc-carousel-next>
    <svg si-chevron-right-icon></svg>
    <span class="sr-only">Next slide</span>
  </button>
</div>
```

## Architecture

The carousel uses a three-layer structure inspired by Embla Carousel's architecture:

1. **ScCarousel** - The outer container that manages state, API, and keyboard navigation
2. **ScCarouselViewport** - The overflow container (`overflow-hidden`) that Embla binds to
3. **ScCarouselTrack** - The flex container that slides within the viewport
4. **ScCarouselItem** - Individual slides on the track

```
┌─ ScCarousel (relative positioning, manages state)
│  ├─ ScCarouselViewport (overflow-hidden, viewport for Embla)
│  │  └─ ScCarouselTrack (flex container, the sliding track)
│  │     ├─ ScCarouselItem (slide 1)
│  │     ├─ ScCarouselItem (slide 2)
│  │     └─ ScCarouselItem (slide 3)
│  ├─ ScCarouselPrevious (navigation button)
│  └─ ScCarouselNext (navigation button)
```

## Components

### ScCarousel

Main carousel container that manages state and keyboard navigation.

**Selector:** `div[sc-carousel]`

**Inputs:**

| Input         | Type                         | Default        | Description                    |
| ------------- | ---------------------------- | -------------- | ------------------------------ |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction               |
| `options`     | `ScCarouselOptions`          | `{}`           | Embla carousel options         |
| `plugins`     | `ScCarouselPlugin[]`         | `[]`           | Embla plugins (e.g., autoplay) |
| `class`       | `string`                     | `''`           | Additional CSS classes         |

### ScCarouselViewport

The overflow container (viewport) that Embla binds to. This provides the visible window for the carousel.

**Selector:** `div[sc-carousel-viewport]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCarouselTrack

The flex container (track) that moves within the viewport and holds carousel items. This is the element that slides left/right or up/down.

**Selector:** `div[sc-carousel-track]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCarouselItem

Individual carousel slide.

**Selector:** `div[sc-carousel-item]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCarouselPrevious

Previous slide navigation button. Content must be provided by the user (icon + screen reader text).

**Selector:** `button[sc-carousel-previous]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

**Example:**

```html
<button sc-carousel-previous>
  <svg si-chevron-left-icon></svg>
  <span class="sr-only">Previous slide</span>
</button>
```

### ScCarouselNext

Next slide navigation button. Content must be provided by the user (icon + screen reader text).

**Selector:** `button[sc-carousel-next]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

**Example:**

```html
<button sc-carousel-next>
  <svg si-chevron-right-icon></svg>
  <span class="sr-only">Next slide</span>
</button>
```

## Examples

### Default

```html
<div sc-carousel class="w-full max-w-xs">
  <div sc-carousel-viewport>
    <div sc-carousel-track>
      @for (i of [1, 2, 3, 4, 5]; track i) {
      <div sc-carousel-item>
        <div class="p-1">
          <div class="flex aspect-square items-center justify-center rounded-lg border">{{ i }}</div>
        </div>
      </div>
      }
    </div>
  </div>
  <button sc-carousel-previous>
    <svg si-chevron-left-icon></svg>
    <span class="sr-only">Previous slide</span>
  </button>
  <button sc-carousel-next>
    <svg si-chevron-right-icon></svg>
    <span class="sr-only">Next slide</span>
  </button>
</div>
```

### With Loop

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <div sc-carousel [options]="{ loop: true }" class="w-full max-w-xs">
      <div sc-carousel-viewport>
        <div sc-carousel-track>
          @for (i of [1, 2, 3, 4, 5]; track i) {
            <div sc-carousel-item>{{ i }}</div>
          }
        </div>
      </div>
      <button sc-carousel-previous>
        <svg si-chevron-left-icon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button sc-carousel-next>
        <svg si-chevron-right-icon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  `,
})
export class MyComponent {}
```

### With Autoplay

```typescript
import { Component } from '@angular/core';
import Autoplay from 'embla-carousel-autoplay';

@Component({
  template: `
    <div sc-carousel [plugins]="plugins" class="w-full max-w-xs">
      <div sc-carousel-viewport>
        <div sc-carousel-track>
          @for (i of items; track i) {
            <div sc-carousel-item>{{ i }}</div>
          }
        </div>
      </div>
      <button sc-carousel-previous>
        <svg si-chevron-left-icon></svg>
        <span class="sr-only">Previous slide</span>
      </button>
      <button sc-carousel-next>
        <svg si-chevron-right-icon></svg>
        <span class="sr-only">Next slide</span>
      </button>
    </div>
  `,
})
export class MyComponent {
  plugins = [Autoplay({ delay: 2000, stopOnInteraction: true })];
  items = [1, 2, 3, 4, 5];
}
```

### Partial Items (Multiple Visible)

```html
<div sc-carousel [options]="{ align: 'start' }" class="w-full max-w-lg">
  <div sc-carousel-viewport>
    <div sc-carousel-track>
      @for (i of items; track i) {
      <div sc-carousel-item class="basis-1/3">
        <!-- Shows 3 items at a time -->
      </div>
      }
    </div>
  </div>
</div>
```

### Vertical Orientation

```html
<div sc-carousel orientation="vertical" [options]="{ align: 'start' }" class="w-full max-w-xs">
  <div sc-carousel-viewport>
    <div sc-carousel-track class="-mt-1 h-[270px]">
      @for (i of items; track i) {
      <div sc-carousel-item class="basis-1/2 pt-1">
        <div class="p-1">
          <div class="flex items-center justify-center rounded-lg border bg-card p-6">
            <span class="text-3xl font-semibold">{{ i }}</span>
          </div>
        </div>
      </div>
      }
    </div>
  </div>
  <button sc-carousel-previous>
    <svg si-chevron-left-icon></svg>
    <span class="sr-only">Previous slide</span>
  </button>
  <button sc-carousel-next>
    <svg si-chevron-right-icon></svg>
    <span class="sr-only">Next slide</span>
  </button>
</div>
```

## Features

- **Embla Carousel**: Powered by Embla for smooth, physics-based animations
- **Touch/Swipe**: Native touch and mouse drag support
- **Horizontal/Vertical**: Supports both orientations
- **Keyboard Navigation**: Arrow keys for navigation
- **Plugin System**: Extend with plugins (autoplay, auto-scroll, etc.)
- **Flexible Options**: Loop, alignment, slide spacing, and more
- **Responsive**: Flexible sizing with basis classes
- **Navigation Buttons**: Prev/next with auto-disable at boundaries
- **Accessible**: ARIA roles and roledescription

## Keyboard Navigation

- `ArrowLeft`: Navigate to previous slide
- `ArrowRight`: Navigate to next slide

## Accessibility

- `role="region"` with `aria-roledescription="carousel"` on container
- `role="group"` with `aria-roledescription="slide"` on items
- Screen reader text on navigation buttons
- Disabled state for navigation at boundaries

## Carousel Options

The `options` input accepts all [Embla Carousel options](https://www.embla-carousel.com/api/options/):

- `align`: `'start' | 'center' | 'end'` - Slide alignment
- `loop`: `boolean` - Enable infinite loop
- `skipSnaps`: `boolean` - Skip slides that can't be scrolled to
- `dragFree`: `boolean` - Enable free scroll without snap points
- `slidesToScroll`: `number | 'auto'` - Number of slides to scroll
- `containScroll`: `'trimSnaps' | 'keepSnaps'` - Contain scroll behavior
- And many more...

## Plugins

The carousel supports all Embla plugins via the `plugins` input:

### Autoplay

```bash
npm install embla-carousel-autoplay
```

```typescript
import Autoplay from 'embla-carousel-autoplay';

export class MyComponent {
  plugins = [
    Autoplay({
      delay: 3000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
    }),
  ];
}
```

### Other Available Plugins

- **embla-carousel-auto-scroll**: Automatic scrolling
- **embla-carousel-class-names**: Dynamic class names on slides
- **embla-carousel-fade**: Fade transition effect

See [Embla Carousel Plugins](https://www.embla-carousel.com/plugins/) for more.
