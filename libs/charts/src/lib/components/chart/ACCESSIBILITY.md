# Chart Accessibility

This document describes the accessibility features built into the chart components and how to use them effectively.

## WCAG AA Compliance

All chart components are designed to meet WCAG 2.1 AA standards.

### Screen Reader Support

Every chart SVG is marked with `role="img"` and an `aria-label` that identifies the chart type. You can customize this label with the `ariaLabel` input:

```html
<div scBarChart [data]="data" [ariaLabel]="'Monthly sales in units'"></div>
<div scLineChart [data]="data" [ariaLabel]="'Revenue trend over 12 months'"></div>
<div scPieChart [data]="data" [ariaLabel]="'Market share by product category'"></div>
<div scDonutChart [data]="data" [ariaLabel]="'Budget allocation breakdown'"></div>
```

Each data element (bar, point, or slice) carries `role="graphics-symbol"` and an `aria-label` that includes the data label and value. For example, a bar reads as `"January: 120"` and a pie slice as `"Chrome: 65 (43%)"`.

Decorative elements (grid lines, axis labels, area fills, line paths) are marked `aria-hidden="true"` so screen readers skip them and focus only on meaningful data.

### Keyboard Navigation

All interactive data elements (bars, points, slices) are keyboard-focusable with `tabindex="0"`:

| Key                        | Action                                                 |
| -------------------------- | ------------------------------------------------------ |
| `Tab`                      | Move focus to the first data element in the chart      |
| `Shift+Tab`                | Move focus to the previous focusable element           |
| `ArrowRight` / `ArrowDown` | Move focus to the next data element (wraps around)     |
| `ArrowLeft` / `ArrowUp`    | Move focus to the previous data element (wraps around) |

When a data element receives focus, the tooltip appears with the same content as the mouse hover tooltip.

### Tooltips

Tooltips use `role="tooltip"` and `aria-live="polite"` so that content changes are announced by screen readers without interrupting the current reading flow. The tooltip element is always present in the DOM (hidden with CSS when inactive) to ensure `aria-live` works reliably.

### Chart Legend

The legend uses `role="list"` with `aria-label="Chart legend"`, and each item is a `role="listitem"`. Color swatches are marked `aria-hidden="true"` since the label text conveys the information.

### Focus Indicators

All interactive elements have visible `focus-visible` styles that match their hover styles (opacity change), ensuring keyboard users can see which element is currently focused.

## Inputs Reference

| Component      | Input       | Type     | Default         | Description                        |
| -------------- | ----------- | -------- | --------------- | ---------------------------------- |
| `ScBarChart`   | `ariaLabel` | `string` | `'Bar chart'`   | Accessible label for the chart SVG |
| `ScLineChart`  | `ariaLabel` | `string` | `'Line chart'`  | Accessible label for the chart SVG |
| `ScPieChart`   | `ariaLabel` | `string` | `'Pie chart'`   | Accessible label for the chart SVG |
| `ScDonutChart` | `ariaLabel` | `string` | `'Donut chart'` | Accessible label for the chart SVG |

## Best Practices

1. **Always provide a descriptive `ariaLabel`** that explains what the chart shows, not just its type. `"Monthly revenue for 2025"` is better than `"Bar chart"`.
2. **Use the legend component** alongside pie and donut charts to provide a text-based alternative to color coding.
3. **Keep data set sizes reasonable** — too many focusable elements (e.g., 100+ bars) can make keyboard navigation tedious.
