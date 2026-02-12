# Kanban Board

A drag-and-drop task board component for project management and workflow visualization.

## Installation

Import the components from the kanban-board module:

```typescript
import { ScKanbanBoard, ScKanbanColumn, ScKanbanCard } from '@/ui/kanban-board';
```

## Usage

### Basic Usage

```html
<sc-kanban-board [(columns)]="columns" [(cards)]="cards" (cardMoved)="onCardMoved($event)" (cardAdded)="onCardAdded($event)" />
```

```typescript
import { signal } from '@angular/core';
import type { KanbanColumn, KanbanCard } from '@/ui/kanban-board';

columns = signal<KanbanColumn[]>([
  { id: 'todo', title: 'To Do', order: 0 },
  { id: 'in-progress', title: 'In Progress', order: 1 },
  { id: 'done', title: 'Done', order: 2 },
]);

cards = signal<KanbanCard[]>([
  { id: '1', title: 'Task 1', columnId: 'todo', order: 0 },
  { id: '2', title: 'Task 2', columnId: 'in-progress', order: 0 },
]);
```

### With Column Colors and WIP Limits

```typescript
columns = signal<KanbanColumn[]>([
  { id: 'backlog', title: 'Backlog', order: 0, color: '#6b7280' },
  { id: 'todo', title: 'To Do', order: 1, color: '#3b82f6' },
  { id: 'in-progress', title: 'In Progress', order: 2, color: '#f59e0b', limit: 3 },
  { id: 'done', title: 'Done', order: 3, color: '#22c55e' },
]);
```

### Cards with Full Details

```typescript
cards = signal<KanbanCard[]>([
  {
    id: '1',
    title: 'Implement authentication',
    description: 'Add login, registration, and password reset',
    columnId: 'in-progress',
    order: 0,
    labels: [
      { id: 'l1', text: 'Feature', color: '#8b5cf6' },
      { id: 'l2', text: 'Security', color: '#ef4444' },
    ],
    assignee: {
      id: 'u1',
      name: 'Alice Johnson',
      initials: 'AJ',
    },
    priority: 'high',
    dueDate: new Date('2024-12-31'),
  },
]);
```

### Read-Only Board

```html
<sc-kanban-board [(columns)]="columns" [(cards)]="cards" [showAddCard]="false" [showDeleteCard]="false" [showAddColumn]="false" />
```

### Disabled Board

```html
<sc-kanban-board [(columns)]="columns" [(cards)]="cards" [disabled]="true" />
```

## API Reference

### ScKanbanBoard

The main container component that manages columns and cards.

#### Inputs

| Input            | Type             | Default | Description                                       |
| ---------------- | ---------------- | ------- | ------------------------------------------------- |
| `columns`        | `KanbanColumn[]` | `[]`    | Array of columns (two-way binding with `model()`) |
| `cards`          | `KanbanCard[]`   | `[]`    | Array of cards (two-way binding with `model()`)   |
| `disabled`       | `boolean`        | `false` | Disable all drag and drop interactions            |
| `showAddCard`    | `boolean`        | `true`  | Show add card buttons in columns                  |
| `showDeleteCard` | `boolean`        | `true`  | Show delete button on cards                       |
| `showAddColumn`  | `boolean`        | `true`  | Show add column button                            |
| `class`          | `string`         | `''`    | Additional CSS classes                            |

#### Outputs

| Output            | Type                                       | Description                                 |
| ----------------- | ------------------------------------------ | ------------------------------------------- |
| `cardMoved`       | `KanbanDragEvent`                          | Emitted when a card is moved                |
| `cardAdded`       | `KanbanCardAddEvent`                       | Emitted when a card is added                |
| `cardDeleted`     | `KanbanCardDeleteEvent`                    | Emitted when a card is deleted              |
| `cardClick`       | `KanbanCard`                               | Emitted when a card is clicked              |
| `columnAdded`     | `string`                                   | Emitted when a column is added (title)      |
| `columnCollapsed` | `{ columnId: string; collapsed: boolean }` | Emitted when a column is collapsed/expanded |

### ScKanbanColumn

Individual column component (used internally by ScKanbanBoard).

### ScKanbanCard

Individual card component (used internally by ScKanbanColumn).

## Type Definitions

### KanbanColumn

```typescript
interface KanbanColumn {
  id: string;
  title: string;
  order: number;
  color?: string; // Header accent color (hex)
  limit?: number; // WIP limit - shows warning when exceeded
  collapsed?: boolean; // Collapsed state
}
```

### KanbanCard

```typescript
interface KanbanCard {
  id: string;
  title: string;
  description?: string;
  columnId: string;
  order: number;
  labels?: KanbanLabel[];
  assignee?: KanbanAssignee;
  dueDate?: Date;
  priority?: 'low' | 'medium' | 'high' | 'urgent';
  metadata?: Record<string, unknown>;
}
```

### KanbanLabel

```typescript
interface KanbanLabel {
  id: string;
  text: string;
  color: string; // Hex color for label
}
```

### KanbanAssignee

```typescript
interface KanbanAssignee {
  id: string;
  name: string;
  avatar?: string; // URL to avatar image
  initials?: string; // Fallback if no avatar
}
```

### KanbanDragEvent

```typescript
interface KanbanDragEvent {
  card: KanbanCard;
  sourceColumnId: string;
  targetColumnId: string;
  sourceIndex: number;
  targetIndex: number;
}
```

### KanbanCardAddEvent

```typescript
interface KanbanCardAddEvent {
  columnId: string;
  title: string;
}
```

### KanbanCardDeleteEvent

```typescript
interface KanbanCardDeleteEvent {
  card: KanbanCard;
  columnId: string;
}
```

## Features

- **Drag and Drop**: Move cards between columns and reorder within columns using native HTML5 drag and drop
- **Visual Feedback**: Drop zones highlight during drag, cards show insertion indicators
- **Column Management**: Add new columns, collapse/expand columns
- **Card Management**: Add and delete cards with inline forms
- **Labels**: Color-coded labels for categorization
- **Priority Indicators**: Visual priority markers (low, medium, high, urgent)
- **Due Dates**: Date display with overdue highlighting (red for past, orange for soon)
- **Assignees**: Avatar or initials display with tooltip
- **WIP Limits**: Column card limits with warning when exceeded
- **Keyboard Accessible**: Cards are focusable and can be activated with Enter/Space
- **Two-Way Binding**: Use `[(columns)]` and `[(cards)]` for automatic state sync

## Accessibility

- Cards have `role="listitem"` and are keyboard focusable
- Columns have `role="list"` with descriptive labels
- Collapse/expand buttons have proper ARIA attributes
- Delete and add buttons have descriptive `aria-label` attributes
- Focus indicators are visible for keyboard navigation

## Styling

The component uses Tailwind CSS classes and supports theming through CSS variables:

- `--background` / `--foreground`: Base colors
- `--card`: Card background
- `--muted` / `--muted-foreground`: Secondary colors
- `--primary` / `--primary-foreground`: Accent colors
- `--destructive`: Delete action color
- `--ring`: Focus ring color

Custom styling can be applied via the `class` input on the board component.
