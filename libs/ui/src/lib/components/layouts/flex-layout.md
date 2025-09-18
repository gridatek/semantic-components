# ScFlexLayout

A semantic flexbox layout component that provides type-safe props for common flexbox patterns.

## Usage

```html
<div sc-flex-layout [direction]="'row'" [gap]="'2'">
  <input sc-input />
  <button sc-button>Submit</button>
</div>
```

## Props

### direction

Controls flex-direction (how items are arranged)

- `'row'` - Horizontal layout (→) **[default]**
- `'row-reverse'` - Horizontal reversed (←)
- `'col'` - Vertical layout (↓)
- `'col-reverse'` - Vertical reversed (↑)

### align

Controls items alignment (cross-axis)

- `'center'` - Center aligned **[default]**
- `'start'` - Top/left aligned
- `'end'` - Bottom/right aligned
- `'baseline'` - Baseline aligned
- `'stretch'` - Stretch to fill

### justify

Controls content justification (main-axis)

- `'start'` - Items at start
- `'end'` - Items at end
- `'center'` - Items centered
- `'between'` - Space between items
- `'around'` - Space around items
- `'evenly'` - Even space distribution

### gap

Modern spacing between items

- `'0'` - No gap
- `'1'` - 4px gap
- `'2'` - 8px gap **[default]**
- `'3'` - 12px gap
- `'4'` - 16px gap
- `'5'` - 20px gap
- `'6'` - 24px gap
- `'8'` - 32px gap
- `'10'` - 40px gap
- `'12'` - 48px gap
- `'16'` - 64px gap

### wrap

Controls item wrapping

- `'nowrap'` - No wrapping **[default]**
- `'wrap'` - Allow wrapping
- `'wrap-reverse'` - Wrap in reverse

### Responsive Direction

Control flex direction at different breakpoints

#### smDirection

Direction from small screens and up

- `'row'` - Horizontal layout
- `'row-reverse'` - Horizontal reversed
- `'col'` - Vertical layout
- `'col-reverse'` - Vertical reversed

#### mdDirection

Direction from medium screens and up

- `'row'` - Horizontal layout
- `'row-reverse'` - Horizontal reversed
- `'col'` - Vertical layout
- `'col-reverse'` - Vertical reversed

#### lgDirection

Direction from large screens and up

- `'row'` - Horizontal layout
- `'row-reverse'` - Horizontal reversed
- `'col'` - Vertical layout
- `'col-reverse'` - Vertical reversed

#### xlDirection

Direction from extra large screens and up

- `'row'` - Horizontal layout
- `'row-reverse'` - Horizontal reversed
- `'col'` - Vertical layout
- `'col-reverse'` - Vertical reversed

### Flex Sizing

#### basis

Control the initial main size of flex items

- `'auto'` - Size based on content
- `'0'` - Start from zero size
- `'1'` - Take up equal space (flex-basis: 0 + flex-grow: 1)
- `'full'` - Take full width/height

#### grow

Allow flex items to grow (boolean)

- `true` - Item can grow to fill available space
- `false` - Item maintains its size **[default]**

#### shrink

Control how flex items shrink (boolean)

- `true` - Item can shrink when space is limited **[default]**
- `false` - Item maintains its minimum size

## Common Examples

### Input with Button

```html
<div sc-flex-layout gap="2">
  <input sc-input placeholder="Email" />
  <button sc-button>Subscribe</button>
</div>
```

### Card Content (Vertical)

```html
<div sc-flex-layout direction="col" gap="4" align="center">
  <img src="avatar.jpg" />
  <h3>John Doe</h3>
  <p>Developer</p>
</div>
```

### Navigation (Responsive)

```html
<div sc-flex-layout direction="col" mdDirection="row" justify="between">
  <img src="logo.png" />
  <nav>Menu items</nav>
</div>
```

### Header with Actions

```html
<div sc-flex-layout justify="between" align="center">
  <h1>Page Title</h1>
  <div sc-flex-layout gap="2">
    <button sc-button variant="outline">Cancel</button>
    <button sc-button>Save</button>
  </div>
</div>
```

### Centered Modal Content

```html
<div sc-flex-layout direction="col" align="center" justify="center" gap="6">
  <h2>Confirm Action</h2>
  <p>Are you sure you want to continue?</p>
  <div sc-flex-layout gap="3">
    <button sc-button variant="outline">Cancel</button>
    <button sc-button>Confirm</button>
  </div>
</div>
```

### Form Row

```html
<div sc-flex-layout gap="4" align="center">
  <label sc-label>Name:</label>
  <input sc-input />
  <button sc-button size="sm">Clear</button>
</div>
```

## Custom Classes

You can still add custom Tailwind classes via the `class` attribute:

```html
<div class="w-full max-w-md p-4 bg-card rounded-lg" sc-flex-layout gap="2">
  <!-- Content -->
</div>
```

### Flex Sizing Examples

```html
<!-- Growing item to fill space -->
<div sc-flex-layout direction="row" gap="4">
  <div>Fixed size</div>
  <div sc-flex-layout grow>This grows to fill space</div>
  <div>Fixed size</div>
</div>

<!-- Preventing shrinkage -->
<div sc-flex-layout direction="row" gap="4">
  <div>Shrinks normally</div>
  <div sc-flex-layout shrink="false">Won't shrink</div>
</div>

<!-- Combined with basis -->
<div sc-flex-layout direction="row" gap="4">
  <div sc-flex-layout basis="auto">Auto size</div>
  <div sc-flex-layout basis="0" grow>Equal flex</div>
  <div sc-flex-layout basis="full">Full width</div>
</div>
```

### Responsive Examples

```html
<!-- Mobile first: stack on mobile, row on medium+ -->
<div sc-flex-layout direction="col" mdDirection="row" gap="4">
  <div>Card 1</div>
  <div>Card 2</div>
</div>

<!-- Complex responsive behavior -->
<div sc-flex-layout direction="col" smDirection="row" lgDirection="col-reverse" gap="4">
  <div>Responsive item</div>
  <div>Another item</div>
</div>
```

## Tips

1. **Use `gap` for spacing** - Modern approach, works in all directions
2. **Start simple** - Most layouts only need `direction` and `gap`
3. **Combine patterns** - Use nested ScFlexLayout for complex layouts
4. **Mobile-first** - Use responsive direction props for mobile-friendly layouts
5. **Flex sizing** - Use `grow`, `shrink`, and `basis` for precise control over item sizing
