# Speed Dial

A floating action button (FAB) that expands to reveal a set of related actions.

## Installation

Import the components from the speed-dial module:

```typescript
import { ScSpeedDial, ScSpeedDialAction } from '@/ui/speed-dial';
import type { ScSpeedDialDirection, SpeedDialAction } from '@/ui/speed-dial';
```

## Usage

### Basic Usage

```html
<sc-speed-dial [actions]="actions" (actionClick)="onActionClick($event)" />
```

```typescript
actions: SpeedDialAction[] = [
  {
    id: 'edit',
    icon: '<svg>...</svg>',
    label: 'Edit',
  },
  {
    id: 'delete',
    icon: '<svg>...</svg>',
    label: 'Delete',
  },
];

onActionClick(event: SpeedDialActionClickEvent): void {
  console.log('Action clicked:', event.action.label);
}
```

### Direction Options

```html
<!-- Expand upward (default) -->
<sc-speed-dial [actions]="actions" direction="up" />

<!-- Expand downward -->
<sc-speed-dial [actions]="actions" direction="down" />

<!-- Expand to the left -->
<sc-speed-dial [actions]="actions" direction="left" />

<!-- Expand to the right -->
<sc-speed-dial [actions]="actions" direction="right" />
```

### Custom Icons

```html
<sc-speed-dial [actions]="actions" [icon]="customIcon" [closeIcon]="customCloseIcon" />
```

### Size Variants

```html
<!-- Small -->
<sc-speed-dial [actions]="actions" size="sm" actionSize="sm" />

<!-- Medium (default) -->
<sc-speed-dial [actions]="actions" size="md" actionSize="md" />

<!-- Large -->
<sc-speed-dial [actions]="actions" size="lg" actionSize="lg" />
```

### Without Labels

```html
<sc-speed-dial [actions]="actions" [showLabels]="false" />
```

### Controlled Open State

```html
<sc-speed-dial [actions]="actions" [(open)]="isOpen" (openChange)="onOpenChange($event)" />
```

### Positioning

The Speed Dial component uses inline positioning by default. For fixed or floating positioning, wrap it in a positioned container:

```html
<!-- Fixed bottom-right position -->
<div class="fixed right-6 bottom-6 z-50">
  <sc-speed-dial [actions]="actions" />
</div>

<!-- Absolute within container -->
<div class="relative h-96">
  <div class="absolute right-4 bottom-4">
    <sc-speed-dial [actions]="actions" />
  </div>
</div>
```

## API Reference

### ScSpeedDial

The main speed dial component with floating action button.

#### Inputs

| Input                 | Type                                  | Default          | Description                   |
| --------------------- | ------------------------------------- | ---------------- | ----------------------------- |
| `actions`             | `SpeedDialAction[]`                   | `[]`             | Array of action items         |
| `direction`           | `'up' \| 'down' \| 'left' \| 'right'` | `'up'`           | Direction to expand actions   |
| `icon`                | `string`                              | Plus icon        | SVG icon for closed state     |
| `closeIcon`           | `string`                              | X icon           | SVG icon for open state       |
| `label`               | `string`                              | `'Open actions'` | Label for the main button     |
| `ariaLabel`           | `string`                              | `'Speed dial'`   | Accessible label              |
| `showLabels`          | `boolean`                             | `true`           | Show action labels            |
| `closeOnActionClick`  | `boolean`                             | `true`           | Close menu after action click |
| `closeOnOutsideClick` | `boolean`                             | `true`           | Close menu on outside click   |
| `size`                | `'sm' \| 'md' \| 'lg'`                | `'md'`           | Size of main FAB button       |
| `actionSize`          | `'sm' \| 'md' \| 'lg'`                | `'md'`           | Size of action buttons        |
| `class`               | `string`                              | `''`             | Additional CSS classes        |

#### Two-way Bindings

| Binding | Type      | Description               |
| ------- | --------- | ------------------------- |
| `open`  | `boolean` | Open/closed state of menu |

#### Outputs

| Output        | Type                        | Description                     |
| ------------- | --------------------------- | ------------------------------- |
| `actionClick` | `SpeedDialActionClickEvent` | Emitted when action is clicked  |
| `openChange`  | `boolean`                   | Emitted when open state changes |

#### Public Methods

| Method     | Description       |
| ---------- | ----------------- |
| `toggle()` | Toggle open state |
| `close()`  | Close the menu    |

### ScSpeedDialAction

Individual action button component (used internally).

#### Inputs

| Input          | Type                   | Default | Description               |
| -------------- | ---------------------- | ------- | ------------------------- |
| `icon`         | `string` (required)    | -       | SVG icon string           |
| `label`        | `string` (required)    | -       | Action label              |
| `disabled`     | `boolean`              | `false` | Disable the action        |
| `ariaLabel`    | `string`               | -       | Custom accessible label   |
| `showLabel`    | `boolean`              | `true`  | Show label next to action |
| `labelVisible` | `boolean`              | `true`  | Label visibility state    |
| `size`         | `'sm' \| 'md' \| 'lg'` | `'md'`  | Button size               |

## Type Definitions

### SpeedDialAction

```typescript
interface SpeedDialAction {
  id: string;
  icon: string;
  label: string;
  disabled?: boolean;
  ariaLabel?: string;
}
```

### SpeedDialActionClickEvent

```typescript
interface SpeedDialActionClickEvent {
  action: SpeedDialAction;
  index: number;
}
```

### SpeedDialDirection

```typescript
type ScSpeedDialDirection = 'up' | 'down' | 'left' | 'right';
```

## Accessibility

Built on `@angular/aria`'s `MenuTrigger`, `Menu` and `MenuItem`:

- The main button has `aria-haspopup="true"`, `aria-expanded` and `aria-controls`.
- The actions are a `role="menu"` of `role="menuitem"`s; give each an `aria-label` (or visible text). The list is `inert` while closed.
- Disabled actions stay focusable (`aria-disabled`) but do nothing.
- Escape closes the menu and returns focus to the main button, as does running an action.

## Keyboard Navigation

| Key               | Action                                         |
| ----------------- | ---------------------------------------------- |
| `Enter` / `Space` | Open the menu (on the button) / run the action |
| `↓` / `↑`         | Next / previous action                         |
| `Home` / `End`    | First / last action                            |
| `Escape`          | Close, focus returns to the main button        |

## Styling

The component uses Tailwind CSS classes and supports theming through CSS variables:

- `--primary` / `--primary-foreground`: Main FAB colors
- `--secondary` / `--secondary-foreground`: Action button colors
- `--popover` / `--popover-foreground`: Label colors
- `--ring`: Focus ring color

### Custom Styling

```html
<sc-speed-dial [actions]="actions" class="[&_button]:bg-blue-500" />
```

## Animation

The Speed Dial features smooth animations:

- Main FAB has shadow transition on hover
- Actions animate with opacity, scale, and position
- Staggered reveal based on action index
- Configurable transition timing

## Features

- Floating action button with expandable menu
- Four expansion directions (up, down, left, right)
- Customizable main button and close icons
- Three size variants for flexibility
- Optional action labels with tooltips
- Support for disabled actions
- Auto-close on action click or outside click
- Escape key to close
- Smooth staggered animations
- Full keyboard and screen reader support
- Responsive and mobile-friendly

## Use Cases

- Quick actions toolbar
- Social sharing buttons
- Add/create menus
- Navigation shortcuts
- Contact options
- Settings quick access
