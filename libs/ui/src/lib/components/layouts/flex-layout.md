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
- `'2'` - 8px gap
- `'3'` - 12px gap
- `'4'` - 16px gap
- `'6'` - 24px gap
- `'8'` - 32px gap

### spacing

Legacy space-x-\* classes (use gap instead)

- Same values as gap but uses space-x-\* classes

### wrap

Controls item wrapping

- `'nowrap'` - No wrapping **[default]**
- `'wrap'` - Allow wrapping
- `'wrap-reverse'` - Wrap in reverse

### responsive

Predefined responsive patterns

- `'mobile'` - Stack on mobile, row on desktop
- `'desktop'` - Always horizontal
- `'stack-mobile'` - Stack until large screens
- `'stack-tablet'` - Stack until medium screens

## Common Examples

### Input with Button

```html
<div sc-flex-layout spacing="2">
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
<div sc-flex-layout responsive="mobile" justify="between">
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

## Tips

1. **Use `gap` instead of `spacing`** - Modern approach, works in all directions
2. **Start simple** - Most layouts only need `direction` and `gap`
3. **Combine patterns** - Use nested ScFlexLayout for complex layouts
4. **Mobile-first** - Use `responsive` props for mobile-friendly layouts
