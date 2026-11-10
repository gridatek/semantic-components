# Toggle

A button that stays pressed: `aria-pressed` follows `pressed`. In the look of the app's preset — its `toggle` key, shadcn's `toggleVariants` in each style (a cva, as the `button` key). Parts that look like a toggle (the editor's buttons, the toolbar's toggle, the toggle group's items) read the same key: `private readonly toggleStyles = injectPreset().toggle;` then `this.toggleStyles({ variant, size })`.

## Usage

```html
<button scToggle variant="outline" size="sm" [(pressed)]="bookmarked">
  <svg siBookmarkIcon class="group-aria-pressed/toggle:fill-foreground"></svg>
  Bookmark
</button>
```

## Part

| Part       | Selector           | What it does                                                                                                             |
| ---------- | ------------------ | ------------------------------------------------------------------------------------------------------------------------ |
| `ScToggle` | `button[scToggle]` | `pressed` (two-way); `variant` (`default`, `outline`); `size` (`sm`, `default`, `lg`); `disabled`; `data-state` on / off |

## Accessibility

- A native button with `aria-pressed`: announced as a toggle button, pressed or not; Tab, Space, Enter.
- Its name stays the same as it toggles: its text, or an icon with `sr-only` text — never a name that follows the state as well (see the Button's stateful names).
- Disabled: out of the Tab order.
