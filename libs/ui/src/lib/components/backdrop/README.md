# Backdrop

A dimmed, blurred layer that fades in and out behind dialogs, drawers, and other layered content.

## Usage

```html
@if (open()) {
<div scBackdrop></div>
}
```

## Components

### ScBackdrop

**Selector:** `div[scBackdrop]`

**Inputs:**

| Input   | Type     | Required | Description            |
| ------- | -------- | -------- | ---------------------- |
| `class` | `string` | No       | Additional CSS classes |

It fades in when shown and out when it goes (`animate.enter` / `animate.leave`): Angular removes it once it has faded out. Show it with `@if`, or as part of an overlay (the dialog, alert dialog, drawer, sheet and lightbox render it in theirs).

## Examples

### Custom Styling

```html
<div scBackdrop class="bg-black/50"></div>
```

## Accessibility

- The backdrop is non-interactive (`pointer-events-none`) — it does not trap focus or intercept clicks
- Uses CSS animations with `prefers-reduced-motion` support via Tailwind's `animate-in`/`animate-out` utilities
- Consumers should manage focus trapping and keyboard dismissal on the parent dialog or drawer
