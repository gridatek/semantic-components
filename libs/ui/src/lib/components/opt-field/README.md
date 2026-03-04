# OPT Field Component

A one-time password (OTP) input component for Angular applications, built with a composable directive architecture. Each digit gets its own input slot with automatic focus management, paste support, and keyboard navigation.

## Architecture

The component consists of seven directives:

1. **ScOptField** - Parent directive managing value state, paste handling, and `FormValueControl<string>` integration
2. **ScOptFieldSlotGroup** - Container for grouping slots (enables separator patterns like `123-456`)
3. **ScOptFieldSlot** - Individual input slot component with caret animation and filled state
4. **ScOptFieldSlotInput** - Hidden native input handling raw keyboard/focus events
5. **ScOptFieldSlotChar** - Displays the entered character
6. **ScOptFieldSlotCaret** - Animated blinking caret shown on active empty slots
7. **ScOptFieldSeparator** - Visual separator between slot groups

## Basic Usage

```html
<div scOptField [(value)]="otp">
  <div scOptFieldSlotGroup>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
  </div>
</div>
```

## Features

- **Two-way binding** - Use `[(value)]` for reactive value updates
- **Signal forms** - Implements `FormValueControl<string>` for `@angular/forms/signals` integration
- **Paste support** - Paste a full OTP code and it fills all slots automatically
- **Sequential input** - Focus is redirected to the first empty slot to enforce left-to-right entry
- **Keyboard navigation** - Arrow keys, Backspace with smart slot movement
- **Disabled state** - Disable all inputs with a single `[disabled]` binding
- **Slot groups with separators** - Split slots into groups with visual separators

## API

### ScOptField

| Input      | Type      | Default        | Description                              |
| ---------- | --------- | -------------- | ---------------------------------------- |
| `value`    | `string`  | `''`           | Current OTP value (use with `[(value)]`) |
| `disabled` | `boolean` | `false`        | Disable all input slots                  |
| `id`       | `string`  | auto-generated | Unique identifier                        |

### ScOptFieldSlotGroup

Container directive for grouping slots. No inputs required.

### ScOptFieldSlot

Individual slot component. The slot count determines the OTP length automatically.

| Data attribute | Values            | Description                  |
| -------------- | ----------------- | ---------------------------- |
| `data-active`  | present or absent | Whether the slot has focus   |
| `data-filled`  | present or absent | Whether the slot has a value |

### ScOptFieldSeparator

Visual separator placed between slot groups. Add any content (icon, dash, dot) as a child.

## Examples

### With Dash Separator

```html
<div scOptField [(value)]="otp">
  <div scOptFieldSlotGroup>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
  </div>
  <div scOptFieldSeparator>
    <svg><!-- dash icon --></svg>
  </div>
  <div scOptFieldSlotGroup>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
  </div>
</div>
```

### With Dot Separator

```html
<div scOptField [(value)]="otp">
  <div scOptFieldSlotGroup>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
  </div>
  <div scOptFieldSeparator>
    <span class="text-muted-foreground text-xl">.</span>
  </div>
  <div scOptFieldSlotGroup>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
  </div>
</div>
```

### Disabled

```html
<div scOptField [(value)]="otp" [disabled]="true">
  <div scOptFieldSlotGroup>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
    <div scOptFieldSlot></div>
  </div>
</div>
```

## Keyboard Shortcuts

- **Digit/Character**: Enter value in current slot and advance to next
- **Backspace**: Clear current slot, or move to previous slot if already empty
- **Arrow Left**: Move focus to previous slot
- **Arrow Right**: Move focus to next slot

## Accessibility

- Each input has an `aria-label` describing its position (e.g., "Digit 1 of 6")
- The parent container has `role="group"`
- Uses `inputmode="numeric"` and `autocomplete="one-time-code"` for mobile optimization
- Disabled state applies `opacity-50` and prevents all interaction
