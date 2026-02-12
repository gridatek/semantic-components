# Dock

A macOS-style icon dock with magnification effect on hover, perfect for application launchers or navigation.

## Composable Architecture

The dock component follows a composable architecture pattern, where functionality is split across multiple components that work together through dependency injection.

### Components

- **ScDock**: Root directive that manages dock state (hover effects, magnification)
- **ScDockItems**: Wrapper component for dock items
- **ScDockItem**: Individual dock item button
- **ScDockBadge**: Optional badge indicator for items

### State Management

The `ScDock` directive provides state through an `InjectionToken`:

- Manages hover state for magnification effects
- Handles item registration and indexing
- Computes transformations for magnification
- Emits click events

Child components inject `SC_DOCK` to access parent state and methods.

## Installation

```typescript
import { ScDock, ScDockItems, ScDockItem, ScDockBadge } from '@/ui/dock';
import type { DockItem, DockPosition, DockSize } from '@/ui/dock';
```

## Usage

### Basic Usage

```html
<nav sc-dock (itemClick)="onItemClick($event)">
  <div sc-dock-items>
    @for (item of items; track item.id) {
    <button sc-dock-item [item]="item"></button>
    }
  </div>
</nav>
```

```typescript
items: DockItem[] = [
  { id: 'home', label: 'Home', icon: '<svg>...</svg>' },
  { id: 'mail', label: 'Mail', icon: '<svg>...</svg>' },
  { id: 'settings', label: 'Settings', icon: '<svg>...</svg>' },
];

onItemClick(item: DockItem): void {
  console.log('Clicked:', item.label);
}
```

### With Badges

```html
<nav sc-dock>
  <div sc-dock-items>
    @for (item of items; track item.id) {
    <button sc-dock-item [item]="item">
      @if (item.badge !== undefined) {
      <span sc-dock-badge>{{ item.badge }}</span>
      }
    </button>
    }
  </div>
</nav>
```

```typescript
items: DockItem[] = [
  { id: 'mail', label: 'Mail', icon: '...', badge: 5 },
  { id: 'notifications', label: 'Notifications', icon: '...', badge: '!' },
];
```

### Without Magnification

```html
<nav sc-dock [magnification]="false">
  <div sc-dock-items>
    @for (item of items; track item.id) {
    <button sc-dock-item [item]="item"></button>
    }
  </div>
</nav>
```

### Custom Magnification Scale

```html
<nav sc-dock [magnificationScale]="2">
  <div sc-dock-items>
    @for (item of items; track item.id) {
    <button sc-dock-item [item]="item"></button>
    }
  </div>
</nav>
```

### Size Variants

```html
<nav sc-dock size="sm">
  <div sc-dock-items>
    @for (item of items; track item.id) {
    <button sc-dock-item [item]="item"></button>
    }
  </div>
</nav>
```

## API Reference

### ScDock (Directive)

**Selector**: `[sc-dock]`

#### Inputs

| Input                | Type                            | Default              | Description             |
| -------------------- | ------------------------------- | -------------------- | ----------------------- |
| `position`           | `'bottom' \| 'left' \| 'right'` | `'bottom'`           | Dock position           |
| `size`               | `'sm' \| 'md' \| 'lg'`          | `'md'`               | Icon size               |
| `magnification`      | `boolean`                       | `true`               | Enable magnification    |
| `magnificationScale` | `number`                        | `1.5`                | Max magnification scale |
| `ariaLabel`          | `string`                        | `'Application dock'` | Accessible label        |

#### Outputs

| Output      | Type       | Description                  |
| ----------- | ---------- | ---------------------------- |
| `itemClick` | `DockItem` | Emitted when item is clicked |

### ScDockItems (Component)

**Selector**: `div[sc-dock-items]`

Container for dock items. Automatically styled based on parent dock configuration.

#### Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScDockItem (Component)

**Selector**: `button[sc-dock-item]`

Individual dock item button.

#### Inputs

| Input   | Type       | Default | Description            |
| ------- | ---------- | ------- | ---------------------- |
| `item`  | `DockItem` | -       | Required. Item data    |
| `class` | `string`   | `''`    | Additional CSS classes |

### ScDockBadge (Component)

**Selector**: `span[sc-dock-badge]`

Badge indicator for dock items.

#### Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Type Definitions

```typescript
interface DockItem {
  id: string;
  label: string;
  icon: string;
  href?: string;
  badge?: number | string;
  disabled?: boolean;
}

type DockPosition = 'bottom' | 'left' | 'right';
type DockSize = 'sm' | 'md' | 'lg';
```

## Features

- macOS-style magnification effect on hover
- Smooth scale transitions
- Badge support for notifications
- Multiple size variants
- Disabled state support
- Glassmorphism styling
- Keyboard accessible
- Touch-friendly
- Customizable magnification scale
