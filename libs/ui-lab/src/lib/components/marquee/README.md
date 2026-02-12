# Marquee

Scrolling content with smooth infinite animations, multiple directions, and customizable speed.

## Components

- `ScMarquee` - Main marquee container with duplicate content support
- `ScMarqueeItem` - Individual item in the marquee
- `ScMarqueeClone` - Clone container for seamless looping
- `ScMarqueeFade` - Wrapper that adds gradient fade effects
- `ScAutoMarquee` - Self-contained auto-looping marquee
- `ScMarqueeText` - Simple text-only marquee

## Usage

### Text Marquee

```html
<sc-marquee-text text="Breaking news: This is scrolling text!" [duration]="15" />
```

### Content Marquee

```html
<sc-marquee [duration]="30" [gap]="24">
  @for (item of items; track item) {
  <div sc-marquee-item>{{ item }}</div>
  }
  <ng-container sc-marquee-clone>
    @for (item of items; track item) {
    <div sc-marquee-item>{{ item }}</div>
    }
  </ng-container>
</sc-marquee>
```

### Vertical Marquee

```html
<sc-marquee direction="vertical" [duration]="20">
  <!-- items -->
</sc-marquee>
```

### Reversed Direction

```html
<sc-marquee [reverse]="true">
  <!-- items -->
</sc-marquee>
```

## API

### ScMarquee

| Input          | Type                         | Default        | Description              |
| -------------- | ---------------------------- | -------------- | ------------------------ |
| `class`        | `string`                     | `''`           | Additional CSS classes   |
| `direction`    | `'horizontal' \| 'vertical'` | `'horizontal'` | Scroll direction         |
| `duration`     | `number`                     | `40`           | Animation duration (sec) |
| `gap`          | `number`                     | `16`           | Gap between items (px)   |
| `pauseOnHover` | `boolean`                    | `true`         | Pause animation on hover |
| `reverse`      | `boolean`                    | `false`        | Reverse scroll direction |

### ScMarqueeText

| Input          | Type      | Default | Description                   |
| -------------- | --------- | ------- | ----------------------------- |
| `class`        | `string`  | `''`    | Additional CSS classes        |
| `text`         | `string`  | -       | **Required.** Text to display |
| `separator`    | `string`  | `'•'`   | Separator between repetitions |
| `duration`     | `number`  | `20`    | Animation duration (sec)      |
| `pauseOnHover` | `boolean` | `true`  | Pause animation on hover      |
| `reverse`      | `boolean` | `false` | Reverse scroll direction      |

### ScMarqueeItem

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScMarqueeClone

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScMarqueeFade

| Input       | Type                         | Default        | Description            |
| ----------- | ---------------------------- | -------------- | ---------------------- |
| `class`     | `string`                     | `''`           | Additional CSS classes |
| `direction` | `'horizontal' \| 'vertical'` | `'horizontal'` | Fade direction         |
| `fadeSize`  | `string`                     | `'5rem'`       | Size of fade gradient  |

## Examples

### Logo Carousel

```html
<sc-marquee [duration]="30" [gap]="48">
  @for (logo of logos; track logo) {
  <div sc-marquee-item class="w-32 h-16 flex items-center justify-center border rounded">{{ logo }}</div>
  }
  <ng-container sc-marquee-clone>
    @for (logo of logos; track logo) {
    <div sc-marquee-item class="w-32 h-16 flex items-center justify-center border rounded">{{ logo }}</div>
    }
  </ng-container>
</sc-marquee>
```

### Testimonials

```html
<sc-marquee [duration]="40" [gap]="24">
  @for (testimonial of testimonials; track testimonial.name) {
  <div sc-marquee-item class="w-80 p-4 border rounded">
    <p>"{{ testimonial.quote }}"</p>
    <p class="font-medium">{{ testimonial.name }}</p>
  </div>
  }
  <ng-container sc-marquee-clone>
    <!-- duplicate content -->
  </ng-container>
</sc-marquee>
```

### Vertical Notifications

```html
<div class="h-48 overflow-hidden">
  <sc-marquee direction="vertical" [duration]="20">
    @for (notification of notifications; track notification.id) {
    <div sc-marquee-item class="p-3 border rounded">{{ notification.icon }} {{ notification.title }}</div>
    }
    <ng-container sc-marquee-clone>
      <!-- duplicate content -->
    </ng-container>
  </sc-marquee>
</div>
```

### Stacked Marquees

```html
<div class="space-y-2">
  <sc-marquee [duration]="30"><!-- row 1 --></sc-marquee>
  <sc-marquee [duration]="25" [reverse]="true"><!-- row 2 --></sc-marquee>
  <sc-marquee [duration]="35"><!-- row 3 --></sc-marquee>
</div>
```

### Speed Variations

```html
<!-- Fast -->
<sc-marquee-text text="Fast" [duration]="10" />

<!-- Normal -->
<sc-marquee-text text="Normal" [duration]="20" />

<!-- Slow -->
<sc-marquee-text text="Slow" [duration]="40" />
```

## How It Works

The marquee creates seamless infinite scrolling by:

1. Displaying the original content
2. Displaying a clone of the content (via `sc-marquee-clone`)
3. Animating both together with CSS animations
4. When the first set scrolls out, the second set takes its place seamlessly

For `sc-marquee-text`, the text is automatically duplicated multiple times internally.

## Accessibility

- Clone content is marked with `aria-hidden="true"` to prevent duplicate screen reader announcements
- Pause on hover allows users to read content
- Animations respect `prefers-reduced-motion` media query (can be added via CSS)
