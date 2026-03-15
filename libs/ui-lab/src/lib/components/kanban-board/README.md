# Kanban Board

Directive-based drag-and-drop task board. Directives provide behavior and styling — consumers own the templates.

## Directives

- `ScKanbanBoard` — root directive (`[scKanbanBoard]`) managing columns and cards state
- `ScKanbanColumn` — column directive (`[scKanbanColumn]`) with drag-and-drop zones
- `ScKanbanCard` — card directive (`[scKanbanCard]`) with drag behavior and keyboard support

## Usage

### Basic Usage

```html
<div scKanbanBoard #board="scKanbanBoard" [(columns)]="columns" [(cards)]="cards">
  @for (column of board.sortedColumns(); track column.id) {
  <div scKanbanColumn #col="scKanbanColumn" [column]="column">
    <h3>{{ column.title }} ({{ col.columnCards().length }})</h3>

    <div role="list">
      @for (card of col.columnCards(); track card.id) {
      <div scKanbanCard [card]="card">
        <h4>{{ card.title }}</h4>
      </div>
      }
    </div>
  </div>
  }
</div>
```

### With Full Card Details

```html
<div scKanbanCard #c="scKanbanCard" [card]="card">
  @if (card.labels?.length) {
  <div class="flex gap-1">
    @for (label of card.labels; track label.id) {
    <span [style.color]="label.color">{{ label.text }}</span>
    }
  </div>
  }

  <h4>{{ card.title }}</h4>

  @if (card.priority) {
  <span [class]="c.priorityClass()">{{ c.priorityIcon() }}</span>
  } @if (card.dueDate) {
  <span [class]="c.dueDateClass()">{{ c.formatDate(card.dueDate) }}</span>
  }
</div>
```

### Column Collapse

```html
<div scKanbanColumn #col="scKanbanColumn" [column]="column">
  <button (click)="col.toggleCollapse()" [attr.aria-expanded]="!col.collapsed()">Toggle</button>

  @if (!col.collapsed()) {
  <!-- cards -->
  }
</div>
```

### Adding/Deleting Cards

```html
<!-- Consumer manages add-card UI state -->
<button (click)="board.addCard(column.id, 'New Card')">Add</button>
<button (click)="board.deleteCard(column.id, card)">Delete</button>
```

### Adding Columns

```html
<button (click)="board.addColumn('New Column')">Add Column</button>
```

### Disabled Board

```html
<div scKanbanBoard [(columns)]="columns" [(cards)]="cards" [disabled]="true">
  <!-- dragging is blocked -->
</div>
```

## API Reference

### ScKanbanBoard (`[scKanbanBoard]`)

#### Inputs

| Input      | Type             | Default | Description                                       |
| ---------- | ---------------- | ------- | ------------------------------------------------- |
| `columns`  | `KanbanColumn[]` | `[]`    | Array of columns (two-way binding with `model()`) |
| `cards`    | `KanbanCard[]`   | `[]`    | Array of cards (two-way binding with `model()`)   |
| `disabled` | `boolean`        | `false` | Disable all drag and drop interactions            |
| `class`    | `string`         | `''`    | Additional CSS classes                            |

#### Outputs

| Output            | Type                                       | Description                                 |
| ----------------- | ------------------------------------------ | ------------------------------------------- |
| `cardMoved`       | `KanbanDragEvent`                          | Emitted when a card is moved                |
| `cardAdded`       | `KanbanCardAddEvent`                       | Emitted when a card is added                |
| `cardDeleted`     | `KanbanCardDeleteEvent`                    | Emitted when a card is deleted              |
| `cardClick`       | `KanbanCard`                               | Emitted when a card is clicked              |
| `columnAdded`     | `string`                                   | Emitted when a column is added (title)      |
| `columnCollapsed` | `{ columnId: string; collapsed: boolean }` | Emitted when a column is collapsed/expanded |

#### Public API

| Property/Method                       | Returns          | Description                    |
| ------------------------------------- | ---------------- | ------------------------------ |
| `sortedColumns()`                     | `KanbanColumn[]` | Columns sorted by order        |
| `getCardsForColumn(columnId)`         | `KanbanCard[]`   | Cards for a column, sorted     |
| `moveCard(event)`                     | `void`           | Move a card (called by column) |
| `addCard(columnId, title)`            | `void`           | Add a new card                 |
| `deleteCard(columnId, card)`          | `void`           | Delete a card                  |
| `addColumn(title)`                    | `void`           | Add a new column               |
| `collapseColumn(columnId, collapsed)` | `void`           | Collapse/expand a column       |

### ScKanbanColumn (`[scKanbanColumn]`)

#### Inputs

| Input    | Type           | Default | Description            |
| -------- | -------------- | ------- | ---------------------- |
| `column` | `KanbanColumn` | -       | **Required.** Column   |
| `class`  | `string`       | `''`    | Additional CSS classes |

#### Public API

| Property/Method    | Returns          | Description                          |
| ------------------ | ---------------- | ------------------------------------ |
| `board`            | `ScKanbanBoard`  | Reference to parent board            |
| `columnCards()`    | `KanbanCard[]`   | Cards in this column                 |
| `collapsed()`      | `boolean`        | Whether column is collapsed          |
| `isDragOver()`     | `boolean`        | Whether a card is being dragged over |
| `dropIndex()`      | `number \| null` | Current drop position index          |
| `isOverLimit()`    | `boolean`        | Whether WIP limit is exceeded        |
| `toggleCollapse()` | `void`           | Toggle collapsed state               |

### ScKanbanCard (`[scKanbanCard]`)

#### Inputs

| Input   | Type         | Default | Description            |
| ------- | ------------ | ------- | ---------------------- |
| `card`  | `KanbanCard` | -       | **Required.** Card     |
| `class` | `string`     | `''`    | Additional CSS classes |

#### Outputs

| Output      | Type         | Description                |
| ----------- | ------------ | -------------------------- |
| `cardClick` | `KanbanCard` | Emitted on Enter/Space key |

#### Public API

| Property/Method    | Returns         | Description                    |
| ------------------ | --------------- | ------------------------------ |
| `board`            | `ScKanbanBoard` | Reference to parent board      |
| `priorityClass()`  | `string`        | CSS class for priority display |
| `dueDateClass()`   | `string`        | CSS class for due date display |
| `priorityIcon()`   | `string`        | Text icon for priority         |
| `formatDate(date)` | `string`        | Format date as "Mon DD"        |

## Type Definitions

### KanbanColumn

```typescript
interface KanbanColumn {
  id: string;
  title: string;
  order: number;
  color?: string;
  limit?: number;
  collapsed?: boolean;
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
  color: string;
}
```

### KanbanAssignee

```typescript
interface KanbanAssignee {
  id: string;
  name: string;
  avatar?: string;
  initials?: string;
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

## Features

- **Drag and Drop**: Native HTML5 drag and drop between columns
- **Visual Feedback**: Drop zones highlight, insertion indicators shown
- **Column Management**: Add columns, collapse/expand via `toggleCollapse()`
- **Card Management**: Add/delete cards via board methods
- **Priority & Due Dates**: Computed CSS classes via card directive
- **WIP Limits**: `isOverLimit()` computed on column directive
- **Keyboard Accessible**: Cards focusable, activated with Enter/Space
- **Two-Way Binding**: `[(columns)]` and `[(cards)]` for state sync
- **Consumer-Owned Templates**: Full control over rendering

## Accessibility

- Board has `role="region"` with `aria-label="Kanban board"`
- Cards have `role="listitem"`, are keyboard focusable (`tabindex="0"`)
- Collapse buttons should use `aria-expanded` (consumer binds via `col.collapsed()`)
- All interactive elements should have descriptive `aria-label` attributes
