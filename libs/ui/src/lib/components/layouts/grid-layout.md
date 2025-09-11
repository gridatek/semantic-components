# ScGridLayout

A flexible CSS Grid layout component built with Class Variance Authority (CVA) for type-safe, responsive grid layouts.

## Basic Usage

```html
<!-- Simple 2-column grid -->
<div sc-grid-layout cols="2" gap="4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>
```

## Props

| Prop      | Type                                                                | Default     | Description                             |
| --------- | ------------------------------------------------------------------- | ----------- | --------------------------------------- |
| `cols`    | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '12'`                    | `'1'`       | Number of columns in the grid           |
| `gap`     | `'0' \| '1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '7' \| '8'`       | `'6'`       | Gap between grid items                  |
| `align`   | `'start' \| 'center' \| 'end' \| 'stretch'`                         | `'stretch'` | Vertical alignment of grid items        |
| `justify` | `'start' \| 'center' \| 'end' \| 'between' \| 'around' \| 'evenly'` | `'start'`   | Horizontal distribution of grid items   |
| `smCols`  | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '12'`                    | `undefined` | Columns at small breakpoint (sm:)       |
| `mdCols`  | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '12'`                    | `undefined` | Columns at medium breakpoint (md:)      |
| `lgCols`  | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '12'`                    | `undefined` | Columns at large breakpoint (lg:)       |
| `xlCols`  | `'1' \| '2' \| '3' \| '4' \| '5' \| '6' \| '12'`                    | `undefined` | Columns at extra-large breakpoint (xl:) |

## Examples

### Responsive Grid

```html
<!-- Responsive: 1 column on mobile, 2 on tablet, 3 on desktop -->
<div sc-grid-layout cols="1" mdCols="2" lgCols="3" gap="4">
  <div>Card 1</div>
  <div>Card 2</div>
  <div>Card 3</div>
  <div>Card 4</div>
  <div>Card 5</div>
  <div>Card 6</div>
</div>
```

### Card Grid with Alignment

```html
<!-- Centered items with custom gap -->
<div sc-grid-layout cols="3" gap="6" align="center" justify="center">
  <div class="bg-card p-4 rounded-lg">Feature 1</div>
  <div class="bg-card p-4 rounded-lg">Feature 2</div>
  <div class="bg-card p-4 rounded-lg">Feature 3</div>
</div>
```

### Dashboard Layout

```html
<!-- 12-column grid system for complex layouts -->
<div sc-grid-layout cols="12" gap="4">
  <div class="col-span-8">Main Content</div>
  <div class="col-span-4">Sidebar</div>
  <div class="col-span-6">Chart 1</div>
  <div class="col-span-6">Chart 2</div>
  <div class="col-span-4">Metric 1</div>
  <div class="col-span-4">Metric 2</div>
  <div class="col-span-4">Metric 3</div>
</div>
```

### Image Gallery

```html
<!-- Responsive image gallery -->
<div sc-grid-layout cols="2" smCols="3" mdCols="4" lgCols="6" gap="2">
  <img class="w-full h-32 object-cover rounded" src="image1.jpg" />
  <img class="w-full h-32 object-cover rounded" src="image2.jpg" />
  <img class="w-full h-32 object-cover rounded" src="image3.jpg" />
  <!-- More images... -->
</div>
```

### Form Layout

```html
<!-- Form with grid layout -->
<form sc-grid-layout cols="1" mdCols="2" gap="4">
  <div class="md:col-span-2">
    <label>Full Name</label>
    <input class="w-full" type="text" />
  </div>
  <div>
    <label>Email</label>
    <input class="w-full" type="email" />
  </div>
  <div>
    <label>Phone</label>
    <input class="w-full" type="tel" />
  </div>
  <div class="md:col-span-2">
    <label>Message</label>
    <textarea class="w-full" rows="4"></textarea>
  </div>
</form>
```

## Best Practices

### Responsive Design

- Start with mobile-first approach (use `cols` for mobile)
- Add breakpoint-specific columns as needed
- Use consistent gap values across breakpoints

### Grid vs Flex

- **Use ScGridLayout for**: 2D layouts, card grids, form layouts, dashboard layouts
- **Use ScFlexLayout for**: 1D layouts, navigation bars, button groups, content alignment

### Column Spanning

- Use Tailwind's `col-span-*` classes for items that should span multiple columns
- Available spans: `col-span-1` through `col-span-12`

### Performance

- Grid classes are pre-generated and cached
- All variants are type-safe and optimized
- Use appropriate breakpoints to avoid unnecessary complexity

## Integration with Other Components

```html
<!-- With ScCard -->
<div sc-grid-layout cols="1" mdCols="2" lgCols="3" gap="6">
  <div sc-card>
    <div sc-card-content>Card content</div>
  </div>
  <div sc-card>
    <div sc-card-content>Card content</div>
  </div>
</div>

<!-- With ScFlexLayout for nested layouts -->
<div sc-grid-layout cols="2" gap="4">
  <div sc-flex-layout direction="col" gap="2">
    <h3>Section 1</h3>
    <p>Content</p>
  </div>
  <div sc-flex-layout direction="col" gap="2">
    <h3>Section 2</h3>
    <p>Content</p>
  </div>
</div>
```
