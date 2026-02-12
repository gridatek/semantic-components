# Chart

SVG-based chart components for data visualization.

## Usage

```html
<div sc-chart-container>
  <div sc-bar-chart [data]="data" [height]="300"></div>
  <div sc-chart-legend [items]="legend"></div>
</div>
```

## Components

### ScChartContainer

Root container that provides chart context and configuration.

**Selector:** `[sc-chart-container]`

**Inputs:**

| Input    | Type          | Default | Description              |
| -------- | ------------- | ------- | ------------------------ |
| `config` | `ChartConfig` | `{}`    | Color and label mappings |
| `class`  | `string`      | `''`    | Additional CSS classes   |

### ScBarChart

Bar chart visualization.

**Selector:** `[sc-bar-chart]`

**Inputs:**

| Input       | Type               | Default | Description            |
| ----------- | ------------------ | ------- | ---------------------- |
| `data`      | `ChartDataPoint[]` | `[]`    | Chart data             |
| `height`    | `number`           | `300`   | Chart height in pixels |
| `barRadius` | `number`           | `4`     | Bar corner radius      |
| `barGap`    | `number`           | `8`     | Gap between bars       |
| `class`     | `string`           | `''`    | Additional CSS classes |

### ScLineChart

Line chart visualization with optional area fill.

**Selector:** `[sc-line-chart]`

**Inputs:**

| Input        | Type               | Default | Description            |
| ------------ | ------------------ | ------- | ---------------------- |
| `data`       | `ChartDataPoint[]` | `[]`    | Chart data             |
| `height`     | `number`           | `300`   | Chart height in pixels |
| `showArea`   | `boolean`          | `false` | Show area fill         |
| `showPoints` | `boolean`          | `true`  | Show data points       |
| `color`      | `string`           | `''`    | Line color             |
| `labelStep`  | `number`           | `1`     | X-axis label interval  |
| `class`      | `string`           | `''`    | Additional CSS classes |

### ScPieChart

Pie chart visualization.

**Selector:** `[sc-pie-chart]`

**Inputs:**

| Input         | Type               | Default | Description            |
| ------------- | ------------------ | ------- | ---------------------- |
| `data`        | `ChartDataPoint[]` | `[]`    | Chart data             |
| `size`        | `number`           | `300`   | Chart size in pixels   |
| `innerRadius` | `number`           | `0`     | Inner radius (0 = pie) |
| `showLabels`  | `boolean`          | `true`  | Show percentage labels |
| `class`       | `string`           | `''`    | Additional CSS classes |

### ScDonutChart

Donut chart (pie chart with hole).

**Selector:** `[sc-donut-chart]`

**Inputs:**

| Input         | Type               | Default | Description            |
| ------------- | ------------------ | ------- | ---------------------- |
| `data`        | `ChartDataPoint[]` | `[]`    | Chart data             |
| `size`        | `number`           | `300`   | Chart size in pixels   |
| `innerRadius` | `number`           | `60`    | Inner radius           |
| `showLabels`  | `boolean`          | `false` | Show percentage labels |
| `class`       | `string`           | `''`    | Additional CSS classes |

### ScChartLegend

Chart legend component.

**Selector:** `[sc-chart-legend]`

**Inputs:**

| Input   | Type                                  | Default | Description            |
| ------- | ------------------------------------- | ------- | ---------------------- |
| `items` | `{ label: string; color?: string }[]` | `[]`    | Legend items           |
| `class` | `string`                              | `''`    | Additional CSS classes |

### ScChartTooltip

Reusable tooltip component.

**Selector:** `[sc-chart-tooltip]`

**Methods:**

| Method       | Description  |
| ------------ | ------------ |
| `show(x, y)` | Show tooltip |
| `hide()`     | Hide tooltip |

## Types

```typescript
interface ChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

interface ChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}
```

## Examples

### Bar Chart

```html
<div sc-chart-container>
  <div sc-bar-chart [data]="salesData" [height]="250"></div>
</div>
```

```typescript
salesData = [
  { label: 'Jan', value: 120 },
  { label: 'Feb', value: 180 },
  { label: 'Mar', value: 150 },
];
```

### Line Chart

```html
<div sc-chart-container>
  <div sc-line-chart [data]="data" [height]="250"></div>
</div>
```

### Area Chart

```html
<div sc-chart-container>
  <div sc-line-chart [data]="data" [height]="250" [showArea]="true"></div>
</div>
```

### Pie Chart

```html
<div sc-chart-container>
  <div sc-pie-chart [data]="data" [size]="280"></div>
  <div sc-chart-legend [items]="legend"></div>
</div>
```

### Donut Chart

```html
<div sc-chart-container>
  <div sc-donut-chart [data]="data" [size]="280" [innerRadius]="70"></div>
</div>
```

### With Custom Colors

```typescript
data = [
  { label: 'Sales', value: 120, color: 'hsl(var(--chart-1))' },
  { label: 'Revenue', value: 180, color: 'hsl(var(--chart-2))' },
];
```

## Chart Colors

The component uses CSS variables for colors:

- `--chart-1` through `--chart-5`

These integrate with the shadcn theming system.

## Features

- **SVG-Based**: Pure SVG rendering, no external dependencies
- **Responsive**: Charts scale to container width
- **Tooltips**: Built-in hover tooltips
- **Legends**: Optional legend component
- **Grid Lines**: Automatic grid lines with labels
- **Theming**: Uses CSS variables for colors
- **Interactive**: Hover states on data points

## Accessibility

- SVG elements include appropriate ARIA attributes
- High contrast colors for readability
- Interactive elements have hover states
