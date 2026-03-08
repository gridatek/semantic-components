# Backdrop

An animated overlay that fades in/out behind dialogs, drawers, and other layered content.

## Usage

```html
<div scBackdrop [open]="isOpen()" (animationComplete)="onClosed()"></div>
```

## Components

### ScBackdrop

Animated backdrop overlay with fade-in/fade-out transitions and backdrop blur.

**Selector:** `div[scBackdrop]`

**Inputs:**

| Input   | Type      | Required | Description                                                   |
| ------- | --------- | -------- | ------------------------------------------------------------- |
| `open`  | `boolean` | Yes      | Controls animation state — `true` fades in, `false` fades out |
| `class` | `string`  | No       | Additional CSS classes                                        |

**Outputs:**

| Output              | Type   | Description                         |
| ------------------- | ------ | ----------------------------------- |
| `animationComplete` | `void` | Emits when the close animation ends |

**Data Attributes:**

| Attribute     | Description                       |
| ------------- | --------------------------------- |
| `data-idle`   | Present before first open         |
| `data-open`   | Present during fade-in animation  |
| `data-closed` | Present during fade-out animation |

## Examples

### With a Dialog

```html
<div scBackdrop [open]="dialogOpen()" (animationComplete)="onBackdropClosed()"></div>

<div class="dialog" [class.hidden]="!dialogOpen()">
  <p>Dialog content</p>
  <button (click)="closeDialog()">Close</button>
</div>
```

### Custom Styling

```html
<div scBackdrop [open]="isOpen()" class="bg-black/50"></div>
```

## Accessibility

- The backdrop is non-interactive (`pointer-events-none`) — it does not trap focus or intercept clicks
- Uses CSS animations with `prefers-reduced-motion` support via Tailwind's `animate-in`/`animate-out` utilities
- Consumers should manage focus trapping and keyboard dismissal on the parent dialog or drawer
