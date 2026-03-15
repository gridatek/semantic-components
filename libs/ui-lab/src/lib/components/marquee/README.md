# Marquee

Scrolling content with smooth infinite animations, multiple directions, and customizable speed.

## Components

- `ScMarquee` - Directive for the marquee container
- `ScMarqueeContent` - Directive for content groups (original + cloned)
- `ScMarqueeItem` - Individual item in the marquee
- `ScMarqueeFade` - Directive that adds gradient fade via CSS `mask-image`
- `ScMarqueeText` - Component for text-only marquee with auto-duplicated content

## Usage

### Text Marquee

```html
<div scMarqueeText text="Breaking news: This is scrolling text!" [duration]="15"></div>
```

### Content Marquee

```html
<div scMarquee [duration]="30" [gap]="24">
  <div scMarqueeContent>
    @for (item of items; track item) {
    <div scMarqueeItem>{{ item }}</div>
    }
  </div>
  <div scMarqueeContent aria-hidden="true">
    @for (item of items; track item) {
    <div scMarqueeItem>{{ item }}</div>
    }
  </div>
</div>
```

### Vertical Marquee

```html
<div scMarquee direction="vertical" [duration]="20">
  <div scMarqueeContent><!-- items --></div>
  <div scMarqueeContent aria-hidden="true"><!-- items --></div>
</div>
```

### Reversed Direction

```html
<div scMarquee [reverse]="true">
  <div scMarqueeContent><!-- items --></div>
  <div scMarqueeContent aria-hidden="true"><!-- items --></div>
</div>
```

### With Fade Effect

```html
<div scMarqueeFade>
  <div scMarquee [duration]="30">
    <div scMarqueeContent><!-- items --></div>
    <div scMarqueeContent aria-hidden="true"><!-- items --></div>
  </div>
</div>
```

## API

### ScMarquee

Selector: `[scMarquee]`

| Input          | Type                         | Default        | Description              |
| -------------- | ---------------------------- | -------------- | ------------------------ |
| `class`        | `string`                     | `''`           | Additional CSS classes   |
| `direction`    | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction         |
| `duration`     | `number`                     | `40`           | Animation duration (sec) |
| `gap`          | `number`                     | `16`           | Gap between items (px)   |
| `pauseOnHover` | `boolean`                    | `true`         | Pause animation on hover |
| `reverse`      | `boolean`                    | `false`        | Reverse scroll direction |

### ScMarqueeContent

Selector: `[scMarqueeContent]`

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScMarqueeText

Selector: `div[scMarqueeText]`

| Input          | Type      | Default | Description                   |
| -------------- | --------- | ------- | ----------------------------- |
| `class`        | `string`  | `''`    | Additional CSS classes        |
| `text`         | `string`  | -       | **Required.** Text to display |
| `separator`    | `string`  | `'•'`   | Separator between repetitions |
| `duration`     | `number`  | `20`    | Animation duration (sec)      |
| `pauseOnHover` | `boolean` | `true`  | Pause animation on hover      |
| `reverse`      | `boolean` | `false` | Reverse scroll direction      |

### ScMarqueeItem

Selector: `[scMarqueeItem]`

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScMarqueeFade

Selector: `[scMarqueeFade]`

| Input       | Type                         | Default        | Description            |
| ----------- | ---------------------------- | -------------- | ---------------------- |
| `class`     | `string`                     | `''`           | Additional CSS classes |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Fade direction         |
| `fadeSize`  | `string`                     | `'5rem'`       | Size of fade gradient  |

## Examples

### Logo Carousel

```html
<div scMarquee [duration]="30" [gap]="48">
  <div scMarqueeContent>
    @for (logo of logos; track logo) {
    <div scMarqueeItem class="flex h-16 w-32 items-center justify-center rounded border">{{ logo }}</div>
    }
  </div>
  <div scMarqueeContent aria-hidden="true">
    @for (logo of logos; track logo) {
    <div scMarqueeItem class="flex h-16 w-32 items-center justify-center rounded border">{{ logo }}</div>
    }
  </div>
</div>
```

### Testimonials

```html
<div scMarquee [duration]="40" [gap]="24">
  <div scMarqueeContent>
    @for (testimonial of testimonials; track testimonial.name) {
    <div scMarqueeItem class="w-80 rounded border p-4">
      <p>"{{ testimonial.quote }}"</p>
      <p class="font-medium">{{ testimonial.name }}</p>
    </div>
    }
  </div>
  <div scMarqueeContent aria-hidden="true">
    <!-- duplicate content -->
  </div>
</div>
```

### Vertical Notifications

```html
<div class="h-48 overflow-hidden">
  <div scMarquee direction="vertical" [duration]="20">
    <div scMarqueeContent>
      @for (notification of notifications; track notification.id) {
      <div scMarqueeItem class="rounded border p-3">{{ notification.icon }} {{ notification.title }}</div>
      }
    </div>
    <div scMarqueeContent aria-hidden="true">
      <!-- duplicate content -->
    </div>
  </div>
</div>
```

### Stacked Marquees

```html
<div class="space-y-2">
  <div scMarquee [duration]="30">
    <div scMarqueeContent><!-- row 1 --></div>
    <div scMarqueeContent aria-hidden="true"><!-- row 1 --></div>
  </div>
  <div scMarquee [duration]="25" [reverse]="true">
    <div scMarqueeContent><!-- row 2 --></div>
    <div scMarqueeContent aria-hidden="true"><!-- row 2 --></div>
  </div>
  <div scMarquee [duration]="35">
    <div scMarqueeContent><!-- row 3 --></div>
    <div scMarqueeContent aria-hidden="true"><!-- row 3 --></div>
  </div>
</div>
```

### Speed Variations

```html
<div scMarqueeText text="Fast" [duration]="10"></div>
<div scMarqueeText text="Normal" [duration]="20"></div>
<div scMarqueeText text="Slow" [duration]="40"></div>
```

## How It Works

The marquee creates seamless infinite scrolling by:

1. Using two `scMarqueeContent` divs with identical content
2. Animating both together with CSS keyframe animations
3. When the first set scrolls out, the second set takes its place seamlessly
4. The second `scMarqueeContent` should have `aria-hidden="true"` to prevent duplicate screen reader announcements

For `scMarqueeText`, the text is automatically duplicated multiple times internally.

## Accessibility

- Clone content is marked with `aria-hidden="true"` to prevent duplicate screen reader announcements
- Pause on hover allows users to read content
- Animations respect `prefers-reduced-motion` media query (can be added via CSS)
