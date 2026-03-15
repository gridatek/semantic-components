# Transfer List

A composable dual-list component for moving items between source and target lists with selection and search support.

## Installation

```typescript
import { ScTransferList, ScTransferListActions, ScTransferListCount, ScTransferListHeader, ScTransferListItem, ScTransferListItems, ScTransferListSearch, ScTransferListSelectAll, ScTransferListSource, ScTransferListTarget } from '@semantic-components/ui-lab';
import type { TransferListItem, TransferListState } from '@semantic-components/ui-lab';
```

## Usage

### Basic Usage

```html
<div scTransferList [(sourceItems)]="sourceItems" [(targetItems)]="targetItems" (transferChange)="onChange($event)">
  <div scTransferListSource #source="scTransferListSource">
    <div scTransferListHeader>
      <label class="flex items-center gap-2">
        <input type="checkbox" scTransferListSelectAll />
        <span class="font-medium">Available</span>
      </label>
      <span scTransferListCount></span>
    </div>
    <div class="border-b p-2">
      <input scTransferListSearch placeholder="Search..." />
    </div>
    <div scTransferListItems>
      @for (item of source.filteredItems(); track item.id) {
      <label scTransferListItem [item]="item">
        <div class="truncate">{{ item.label }}</div>
        @if (item.description) {
        <div class="text-muted-foreground truncate text-xs">{{ item.description }}</div>
        }
      </label>
      } @empty {
      <div class="text-muted-foreground p-4 text-center text-sm">No items</div>
      }
    </div>
  </div>

  <div scTransferListActions></div>

  <div scTransferListTarget #target="scTransferListTarget">
    <div scTransferListHeader>
      <label class="flex items-center gap-2">
        <input type="checkbox" scTransferListSelectAll />
        <span class="font-medium">Selected</span>
      </label>
      <span scTransferListCount></span>
    </div>
    <div class="border-b p-2">
      <input scTransferListSearch placeholder="Search..." />
    </div>
    <div scTransferListItems>
      @for (item of target.filteredItems(); track item.id) {
      <label scTransferListItem [item]="item">
        <div class="truncate">{{ item.label }}</div>
        @if (item.description) {
        <div class="text-muted-foreground truncate text-xs">{{ item.description }}</div>
        }
      </label>
      } @empty {
      <div class="text-muted-foreground p-4 text-center text-sm">No items</div>
      }
    </div>
  </div>
</div>
```

```typescript
sourceItems = signal<TransferListItem[]>([
  { id: '1', label: 'Item 1', description: 'Description' },
  { id: '2', label: 'Item 2' },
  { id: '3', label: 'Item 3' },
]);

targetItems = signal<TransferListItem[]>([]);
```

### Without Search

Omit the `scTransferListSearch` element from the panel to disable search:

```html
<div scTransferListSource #source="scTransferListSource">
  <div scTransferListHeader>
    <label class="flex items-center gap-2">
      <input type="checkbox" scTransferListSelectAll />
      <span class="font-medium">Options</span>
    </label>
    <span scTransferListCount></span>
  </div>
  <div scTransferListItems>
    @for (item of source.filteredItems(); track item.id) {
    <label scTransferListItem [item]="item">
      <div class="truncate">{{ item.label }}</div>
    </label>
    }
  </div>
</div>
```

### With Disabled Items

```typescript
sourceItems = signal<TransferListItem[]>([
  { id: '1', label: 'Movable Item' },
  { id: '2', label: 'Locked Item', disabled: true },
]);
```

## API Reference

### ScTransferList

Root directive. Provides shared state to all children.

| Input         | Type                 | Default | Description                 |
| ------------- | -------------------- | ------- | --------------------------- |
| `sourceItems` | `TransferListItem[]` | `[]`    | Source list items (two-way) |
| `targetItems` | `TransferListItem[]` | `[]`    | Target list items (two-way) |
| `class`       | `string`             | `''`    | Additional CSS classes      |

| Output           | Type                | Description               |
| ---------------- | ------------------- | ------------------------- |
| `transferChange` | `TransferListState` | Emitted when lists change |

### ScTransferListSource / ScTransferListTarget

Panel container directives. Expose `filteredItems()`, `selectedIds()`, `allSelected()`, `someSelected()`, `selectedCount()`, `totalCount()`, and `searchValue()` via `exportAs`.

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTransferListHeader

Styled header directive for the top of each panel.

### ScTransferListSelectAll

Directive on `input[type="checkbox"]`. Auto-binds `checked`, `indeterminate`, and `change` based on the parent panel's selection state.

### ScTransferListCount

Directive on any element. Renders `selected/total` count text via `textContent`.

### ScTransferListSearch

Directive on `input`. Auto-binds `value` and `input` events for filtering items.

### ScTransferListItems

Scrollable container directive for the item list.

| Input    | Type     | Default | Description            |
| -------- | -------- | ------- | ---------------------- |
| `height` | `string` | `300px` | Max height of list     |
| `class`  | `string` | `''`    | Additional CSS classes |

### ScTransferListItem

Component on `label`. Renders a checkbox and projects content. Handles selection toggle on click.

| Input   | Type               | Description            |
| ------- | ------------------ | ---------------------- |
| `item`  | `TransferListItem` | Required               |
| `class` | `string`           | Additional CSS classes |

### ScTransferListActions

Component rendering the four transfer action buttons (move selected, move all, in both directions).

## Type Definitions

```typescript
interface TransferListItem {
  id: string;
  label: string;
  description?: string;
  disabled?: boolean;
}

interface TransferListState {
  source: TransferListItem[];
  target: TransferListItem[];
}
```

## Features

- Fully composable directive-based architecture
- Two-way binding for both lists
- Move selected items between lists
- Move all items at once
- Select/deselect all in each list
- Search filtering in both lists
- Disabled items support
- Item descriptions with content projection
- Checkbox selection with indeterminate state
- Keyboard accessible
