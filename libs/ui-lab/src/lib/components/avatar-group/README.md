# Avatar Group

Display a group of avatars with stacked/overlapping layout and overflow indicator.

## Installation

```typescript
import { ScAvatarGroup } from '@/ui/avatar-group';
import type { AvatarGroupItem, AvatarGroupSize } from '@/ui/avatar-group';
```

## Usage

### Basic Usage

```html
<sc-avatar-group [avatars]="users" [max]="4" (avatarClick)="onAvatarClick($event)" (overflowClick)="onOverflowClick($event)" />
```

```typescript
users: AvatarGroupItem[] = [
  { id: '1', src: 'https://example.com/avatar1.jpg', name: 'Alice' },
  { id: '2', src: 'https://example.com/avatar2.jpg', name: 'Bob' },
  { id: '3', name: 'Carol', fallback: 'CA' },
];
```

### Size Variants

```html
<sc-avatar-group [avatars]="users" size="sm" />
<sc-avatar-group [avatars]="users" size="md" />
<sc-avatar-group [avatars]="users" size="lg" />
<sc-avatar-group [avatars]="users" size="xl" />
```

### Spacing Options

```html
<sc-avatar-group [avatars]="users" spacing="tight" />
<sc-avatar-group [avatars]="users" spacing="normal" />
<sc-avatar-group [avatars]="users" spacing="loose" />
```

### Max Display Count

```html
<sc-avatar-group [avatars]="users" [max]="3" />
```

## API Reference

### Inputs

| Input       | Type                             | Default          | Description             |
| ----------- | -------------------------------- | ---------------- | ----------------------- |
| `avatars`   | `AvatarGroupItem[]`              | `[]`             | Array of avatar items   |
| `max`       | `number`                         | `4`              | Maximum visible avatars |
| `size`      | `'sm' \| 'md' \| 'lg' \| 'xl'`   | `'md'`           | Avatar size             |
| `spacing`   | `'tight' \| 'normal' \| 'loose'` | `'normal'`       | Overlap amount          |
| `ariaLabel` | `string`                         | `'Avatar group'` | Accessible label        |

### Outputs

| Output          | Type                                         | Description                      |
| --------------- | -------------------------------------------- | -------------------------------- |
| `avatarClick`   | `{ avatar: AvatarGroupItem; index: number }` | Emitted when avatar is clicked   |
| `overflowClick` | `AvatarGroupItem[]`                          | Emitted when overflow is clicked |

## Type Definitions

```typescript
interface AvatarGroupItem {
  id: string;
  src?: string;
  alt?: string;
  fallback?: string;
  name?: string;
}

type AvatarGroupSize = 'sm' | 'md' | 'lg' | 'xl';
```

## Features

- Stacked/overlapping avatar display
- Configurable maximum visible count
- Overflow indicator with count
- Multiple size variants
- Adjustable spacing/overlap
- Fallback initials when no image
- Click events for avatars and overflow
- Hover effects with z-index handling
- Keyboard accessible
