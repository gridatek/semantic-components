# Search Input

A search input with autocomplete suggestions, debounced search, and keyboard navigation.

## Installation

```typescript
import { ScSearchInput } from '@/ui/search-input';
import type { SearchSuggestion, SearchInputOptions } from '@/ui/search-input';
```

## Usage

### Basic Usage

```html
<sc-search-input [suggestions]="suggestions" (search)="onSearch($event)" (suggestionSelect)="onSelect($event)" />
```

```typescript
suggestions: SearchSuggestion[] = [
  { id: '1', label: 'Apple', description: 'A fruit' },
  { id: '2', label: 'Banana', description: 'A yellow fruit' },
];

onSearch(query: string): void {
  console.log('Search:', query);
}

onSelect(suggestion: SearchSuggestion): void {
  console.log('Selected:', suggestion);
}
```

### With Loading State

```html
<sc-search-input [suggestions]="results" [loading]="isLoading" (search)="onAsyncSearch($event)" />
```

### With Categories

```typescript
suggestions: SearchSuggestion[] = [
  { id: '1', label: 'MacBook Pro', description: 'Laptop', category: 'Electronics' },
  { id: '2', label: 'Nike Air Max', description: 'Shoes', category: 'Footwear' },
];
```

## API Reference

### Inputs

| Input            | Type                 | Default       | Description              |
| ---------------- | -------------------- | ------------- | ------------------------ |
| `suggestions`    | `SearchSuggestion[]` | `[]`          | Autocomplete suggestions |
| `placeholder`    | `string`             | `'Search...'` | Input placeholder        |
| `debounceMs`     | `number`             | `300`         | Debounce delay in ms     |
| `minChars`       | `number`             | `1`           | Min chars to trigger     |
| `maxSuggestions` | `number`             | `10`          | Max suggestions to show  |
| `loading`        | `boolean`            | `false`       | Show loading spinner     |
| `class`          | `string`             | `''`          | Additional CSS classes   |

### Outputs

| Output             | Type               | Description                   |
| ------------------ | ------------------ | ----------------------------- |
| `search`           | `string`           | Emitted on debounced search   |
| `suggestionSelect` | `SearchSuggestion` | Emitted when item is selected |
| `queryChange`      | `string`           | Emitted on every input change |

### Methods

| Method    | Description        |
| --------- | ------------------ |
| `clear()` | Clear search input |
| `focus()` | Focus the input    |

## Type Definitions

```typescript
interface SearchSuggestion {
  id: string;
  label: string;
  description?: string;
  icon?: string;
  category?: string;
}
```

## Features

- Debounced search to reduce API calls
- Keyboard navigation (Arrow keys, Enter, Escape)
- Loading state with spinner
- Clear button
- Category support for grouped suggestions
- Click outside to close
- Accessible with ARIA attributes
