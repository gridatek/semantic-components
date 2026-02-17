# Stat Card

A composable set of directives for displaying statistics and metrics with optional trends, icons, and descriptions.

## Components

- `ScStatCard` - Main container with border, background, and padding
- `ScStatCardLabel` - Label/title text styling
- `ScStatCardValue` - Large value/metric display styling
- `ScStatCardIcon` - Icon container styling
- `ScStatCardChange` - Trend/change indicator styling with color variants
- `ScStatCardDescription` - Additional description text styling

## Installation

```typescript
import { ScStatCard, ScStatCardLabel, ScStatCardValue, ScStatCardIcon, ScStatCardChange, ScStatCardDescription } from '@semantic-components/ui-lab';
```

## Usage

### Basic Stat Card

```html
<div scStatCard>
  <div class="space-y-1">
    <p scStatCardLabel>Total Revenue</p>
    <p scStatCardValue>$45,231.89</p>
  </div>
  <p scStatCardDescription>Revenue for the current period</p>
</div>
```

### With Icon

```html
<div scStatCard>
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <p scStatCardLabel>Active Users</p>
      <p scStatCardValue>2,350</p>
    </div>
    <div scStatCardIcon>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    </div>
  </div>
</div>
```

### With Trend Indicator

```html
<div scStatCard>
  <div class="space-y-1">
    <p scStatCardLabel>Sales</p>
    <p scStatCardValue>12,234</p>
  </div>

  <div class="mt-3 flex items-center gap-2">
    <span scStatCardChange trend="up">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m18 15-6-6-6 6" />
      </svg>
      <span>+20.1%</span>
    </span>
    <span class="text-xs text-muted-foreground">from last month</span>
  </div>
</div>
```

### Complete Example

```html
<div scStatCard variant="default" size="md">
  <div class="flex items-start justify-between">
    <div class="space-y-1">
      <p scStatCardLabel size="md">Total Revenue</p>
      <p scStatCardValue size="md">$45,231.89</p>
    </div>
    <div scStatCardIcon size="md">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    </div>
  </div>

  <div class="mt-3 flex items-center gap-2">
    <span scStatCardChange trend="up">
      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <path d="m18 15-6-6-6 6" />
      </svg>
      <span>+20.1%</span>
    </span>
    <span class="text-xs text-muted-foreground">from last month</span>
  </div>

  <p scStatCardDescription class="mt-2">Your revenue increased significantly this month</p>
</div>
```

## Variants

### Default (with border)

```html
<div scStatCard variant="default">
  <!-- content -->
</div>
```

### Outline (thick border)

```html
<div scStatCard variant="outline">
  <!-- content -->
</div>
```

### Filled (colored background)

```html
<div scStatCard variant="filled">
  <!-- content -->
</div>
```

## Sizes

### Small

```html
<div scStatCard size="sm">
  <p scStatCardLabel size="sm">Label</p>
  <p scStatCardValue size="sm">1,234</p>
</div>
```

### Medium (default)

```html
<div scStatCard size="md">
  <p scStatCardLabel size="md">Label</p>
  <p scStatCardValue size="md">5,678</p>
</div>
```

### Large

```html
<div scStatCard size="lg">
  <p scStatCardLabel size="lg">Label</p>
  <p scStatCardValue size="lg">9,012</p>
</div>
```

## Trend Colors

The `sc-stat-card-change` directive automatically applies colors based on the `trend` input:

- `trend="up"` - Green text (positive)
- `trend="down"` - Red text (negative)
- `trend="neutral"` - Muted text (neutral)

```html
<span scStatCardChange trend="up">
  <svg><!-- up arrow --></svg>
  <span>+12.5%</span>
</span>

<span scStatCardChange trend="down">
  <svg><!-- down arrow --></svg>
  <span>-5.2%</span>
</span>

<span scStatCardChange trend="neutral">
  <span>No change</span>
</span>
```

## API Reference

### ScStatCard Inputs

| Input     | Type                                 | Default     | Description            |
| --------- | ------------------------------------ | ----------- | ---------------------- |
| `variant` | `'default' \| 'outline' \| 'filled'` | `'default'` | Card style variant     |
| `size`    | `'sm' \| 'md' \| 'lg'`               | `'md'`      | Card padding size      |
| `class`   | `string`                             | `''`        | Additional CSS classes |

### ScStatCardLabel Inputs

| Input   | Type                   | Default | Description            |
| ------- | ---------------------- | ------- | ---------------------- |
| `size`  | `'sm' \| 'md' \| 'lg'` | `'md'`  | Label text size        |
| `class` | `string`               | `''`    | Additional CSS classes |

### ScStatCardValue Inputs

| Input   | Type                   | Default | Description            |
| ------- | ---------------------- | ------- | ---------------------- |
| `size`  | `'sm' \| 'md' \| 'lg'` | `'md'`  | Value text size        |
| `class` | `string`               | `''`    | Additional CSS classes |

### ScStatCardIcon Inputs

| Input   | Type                   | Default | Description            |
| ------- | ---------------------- | ------- | ---------------------- |
| `size`  | `'sm' \| 'md' \| 'lg'` | `'md'`  | Icon container size    |
| `class` | `string`               | `''`    | Additional CSS classes |

### ScStatCardChange Inputs

| Input   | Type                          | Default     | Description            |
| ------- | ----------------------------- | ----------- | ---------------------- |
| `trend` | `'up' \| 'down' \| 'neutral'` | `'neutral'` | Trend direction/color  |
| `class` | `string`                      | `''`        | Additional CSS classes |

### ScStatCardDescription Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Type Definitions

```typescript
type StatCardTrend = 'up' | 'down' | 'neutral';
type StatCardVariant = 'default' | 'outline' | 'filled';
type StatCardSize = 'sm' | 'md' | 'lg';
```

## Styling Reference

| Component               | Default Styling                                                              |
| ----------------------- | ---------------------------------------------------------------------------- |
| `ScStatCard`            | `rounded-lg transition-colors` + variant/size classes                        |
| `ScStatCardLabel`       | `font-medium text-muted-foreground` + size-specific font size                |
| `ScStatCardValue`       | `font-bold tracking-tight` + size-specific font size                         |
| `ScStatCardIcon`        | `rounded-md bg-muted p-2 inline-flex items-center justify-center` + SVG size |
| `ScStatCardChange`      | `inline-flex items-center gap-1 text-xs font-medium` + trend color           |
| `ScStatCardDescription` | `text-xs text-muted-foreground`                                              |

## Features

- Fully composable - use only what you need
- Content projection for maximum flexibility
- Multiple style variants (default, outline, filled)
- Multiple size options (sm, md, lg)
- Automatic trend-based coloring
- Support for custom icons from any library
- Responsive design
- Custom class support on all directives

## Accessibility

- Uses semantic HTML structure
- All directives accept standard HTML attributes
- Ensure proper heading hierarchy for labels
- Use appropriate ARIA labels for trend indicators
- Icons should have descriptive text for screen readers

## Example Layouts

### Grid of Stats

```html
<div class="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
  <div scStatCard>
    <p scStatCardLabel>Total Revenue</p>
    <p scStatCardValue>$45,231.89</p>
  </div>

  <div scStatCard>
    <p scStatCardLabel>Active Users</p>
    <p scStatCardValue>2,350</p>
  </div>

  <div scStatCard>
    <p scStatCardLabel>Sales</p>
    <p scStatCardValue>12,234</p>
  </div>

  <div scStatCard>
    <p scStatCardLabel>Conversions</p>
    <p scStatCardValue>573</p>
  </div>
</div>
```

### Custom Layout

Since all components use content projection, you can create any layout you need:

```html
<div scStatCard>
  <!-- Custom header with icon on left -->
  <div class="flex items-center gap-3 mb-4">
    <div scStatCardIcon>
      <svg><!-- icon --></svg>
    </div>
    <p scStatCardLabel>Revenue</p>
  </div>

  <!-- Centered value -->
  <p scStatCardValue class="text-center">$45,231.89</p>

  <!-- Bottom trend -->
  <div class="mt-4 flex justify-center">
    <span scStatCardChange trend="up">
      <span>↑ 20.1%</span>
    </span>
  </div>
</div>
```
