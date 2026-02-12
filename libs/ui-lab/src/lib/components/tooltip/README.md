# Tooltip

A simple directive-based tooltip for displaying text hints on hover or focus.

## Usage

### Basic Usage

```html
<button scTooltipTrigger="Save changes">Save</button>
```

### With Position

```html
<button scTooltipTrigger="Save changes" tooltipPosition="right">Save</button>
```

Available positions: `top` (default), `right`, `bottom`, `left`

### With Custom Delay

```html
<button scTooltipTrigger="Save changes" [tooltipDelay]="500">Save</button>
```

### With Hide Delay

```html
<button scTooltipTrigger="Save changes" [tooltipHideDelay]="200">Save</button>
```

### Disabled State

```html
<button scTooltipTrigger="Save changes" [tooltipDisabled]="isDisabled">Save</button>
```

### Custom Styling

```html
<button scTooltipTrigger="Save changes" tooltipClass="my-custom-tooltip">Save</button>
```

## API Reference

### Inputs

| Input              | Alias       | Type                                     | Default | Description                                     |
| ------------------ | ----------- | ---------------------------------------- | ------- | ----------------------------------------------- |
| `scTooltipTrigger` | -           | `string`                                 | -       | The tooltip text content (required)             |
| `tooltipPosition`  | `position`  | `'top' \| 'right' \| 'bottom' \| 'left'` | `'top'` | Position of the tooltip relative to the trigger |
| `tooltipDelay`     | `showDelay` | `number`                                 | `200`   | Delay before showing the tooltip (ms)           |
| `tooltipHideDelay` | `hideDelay` | `number`                                 | `0`     | Delay before hiding the tooltip (ms)            |
| `tooltipDisabled`  | `disabled`  | `boolean`                                | `false` | Whether the tooltip is disabled                 |
| `tooltipClass`     | `class`     | `string`                                 | `''`    | Custom CSS class for the tooltip                |

## Accessibility

- The tooltip has `role="tooltip"` for screen readers
- The tooltip uses `aria-live="polite"` and `aria-atomic="true"` for dynamic content announcements
- The trigger element has `aria-describedby` pointing to the tooltip when visible
- Supports keyboard navigation (shows on focus, hides on blur)
- Pressing `Escape` dismisses the tooltip
- Unique IDs are generated using Angular CDK's `_IdGenerator` for proper ARIA references

## Behavior

- **Singleton**: Only one tooltip is visible at a time globally (managed by `ScTooltipManager`)
- **Smart Positioning**: Automatically flips to the opposite side if there's not enough space using CDK Overlay
- **Hover Support**: Shows on mouseenter, hides on mouseleave
- **Focus Support**: Shows on focus, hides on blur
- **Escape to Close**: Pressing Escape dismisses the tooltip
- **Smooth Animations**: Fade in/out with zoom effects - see [ANIMATIONS.md](./ANIMATIONS.md) for details

## When to Use

Use **Tooltip** for:

- Simple text hints
- Icon button labels
- Abbreviation explanations
- Quick help text

Use **Hovercard** instead for:

- Rich content with HTML
- Images or avatars
- Interactive elements (buttons, links)
- Complex formatted content

## Architecture

The tooltip consists of three main parts:

- **`ScTooltipTrigger`** (directive) - Attaches to trigger elements, handles user interactions (used via `[scTooltipTrigger]` attribute)
- **`ScTooltipManager`** (service) - Manages overlay lifecycle, ensures singleton behavior
- **`ScTooltip`** (component) - The visual tooltip component with content and styling

See [ANIMATIONS.md](./ANIMATIONS.md) for details on how animations work.
