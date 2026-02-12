# Transfer List

A dual-list component for moving items between source and target lists with selection and search support.

## Installation

```typescript
import { ScTransferList } from '@/ui/transfer-list';
import type { TransferListItem, TransferListState } from '@/ui/transfer-list';
```

## Usage

### Basic Usage

```html
<sc-transfer-list [(sourceItems)]="sourceItems" [(targetItems)]="targetItems" (change)="onChange($event)" />
```

```typescript
sourceItems = signal<TransferListItem[]>([
  { id: '1', label: 'Item 1', description: 'Description' },
  { id: '2', label: 'Item 2' },
  { id: '3', label: 'Item 3' },
]);

targetItems = signal<TransferListItem[]>([]);
```

### With Custom Titles

```html
<sc-transfer-list [(sourceItems)]="available" [(targetItems)]="selected" sourceTitle="Available Options" targetTitle="Selected Options" />
```

### Without Search

```html
<sc-transfer-list [(sourceItems)]="source" [(targetItems)]="target" [searchable]="false" />
```

### With Disabled Items

```typescript
sourceItems = signal<TransferListItem[]>([
  { id: '1', label: 'Movable Item' },
  { id: '2', label: 'Locked Item', disabled: true },
]);
```

## API Reference

### Inputs

| Input         | Type                 | Default       | Description                 |
| ------------- | -------------------- | ------------- | --------------------------- |
| `sourceItems` | `TransferListItem[]` | `[]`          | Source list items (two-way) |
| `targetItems` | `TransferListItem[]` | `[]`          | Target list items (two-way) |
| `sourceTitle` | `string`             | `'Available'` | Source list title           |
| `targetTitle` | `string`             | `'Selected'`  | Target list title           |
| `searchable`  | `boolean`            | `true`        | Enable search in lists      |
| `height`      | `string`             | `'300px'`     | List max height             |
| `class`       | `string`             | `''`          | Additional CSS classes      |

### Outputs

| Output   | Type                                                         | Description               |
| -------- | ------------------------------------------------------------ | ------------------------- |
| `change` | `{ source: TransferListItem[]; target: TransferListItem[] }` | Emitted when lists change |

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

- Two-way binding for both lists
- Move selected items between lists
- Move all items at once
- Select/deselect all in each list
- Search filtering in both lists
- Disabled items support
- Item descriptions
- Checkbox selection
- Indeterminate checkbox state
- Keyboard accessible
