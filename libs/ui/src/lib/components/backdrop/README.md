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

It fades in when shown and out when it goes (`animate.enter` / `animate.leave`): Angular removes it once it has faded out. Show it with `@if`, or as part of an overlay (the dialog, alert dialog, drawer and sheet render it in theirs; the lightbox, a native `<dialog>`, has its own `::backdrop`).

Its shade and blur come from the preset (`backdrop`, shadcn's overlay — the same in every overlay of a style): `bg-black/10` with a light blur in nova, vega and lyra, `/80` in maia and mira, `/30` with more blur in luma and rhea, `/20` in sera.

## Examples

### Custom Styling

```html
<div scBackdrop class="bg-black/50"></div>
```

## Accessibility

- The backdrop is non-interactive (`pointer-events-none`) — it does not trap focus or intercept clicks
- Under `prefers-reduced-motion: reduce` it still fades (the library stylesheet drops movement, not fades)
- Consumers should manage focus trapping and keyboard dismissal on the parent dialog or drawer
