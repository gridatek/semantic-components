# Tooltip

A directive-based tooltip for displaying text hints on hover or focus. For rich content with HTML, images, or interactive elements, use Hovercard instead.

## Usage

```html
<button [scTooltipTrigger]="'Add to library'">Hover me</button>
```

### Position

```html
<button [scTooltipTrigger]="'Top'" tooltipPosition="top">Top</button>
<button [scTooltipTrigger]="'Right'" tooltipPosition="right">Right</button>
<button [scTooltipTrigger]="'Bottom'" tooltipPosition="bottom">Bottom</button>
<button [scTooltipTrigger]="'Left'" tooltipPosition="left">Left</button>
```

### Delay

```html
<button [scTooltipTrigger]="'Delayed'" [tooltipDelay]="500">Show after 500ms</button>
<button [scTooltipTrigger]="'Slow hide'" [tooltipHideDelay]="300">Hide after 300ms</button>
```

### Disabled

```html
<button [scTooltipTrigger]="'Hidden'" [tooltipDisabled]="true">No tooltip</button>
```

## API

### ScTooltipTrigger (Directive)

Selector: `[scTooltipTrigger]`

| Input              | Type                                     | Default | Description                          |
| ------------------ | ---------------------------------------- | ------- | ------------------------------------ |
| `scTooltipTrigger` | `string` (required)                      | -       | The tooltip text content             |
| `tooltipPosition`  | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Position relative to trigger element |
| `tooltipDelay`     | `number`                                 | `200`   | Show delay in milliseconds           |
| `tooltipHideDelay` | `number`                                 | `0`     | Hide delay in milliseconds           |
| `tooltipDisabled`  | `boolean`                                | `false` | Whether the tooltip is disabled      |

## Accessibility

- Sets `aria-describedby` on the trigger element when tooltip is visible
- Tooltip has `role="tooltip"` and `aria-live="polite"`
- Dismissible via Escape key
- Triggered on both hover and focus
