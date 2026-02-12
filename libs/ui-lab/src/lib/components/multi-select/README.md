# Multi-Select

Select multiple options from a dropdown with chips, search, and select-all functionality.

## Components

- `ScMultiSelect` - Multi-selection dropdown with chips

## Usage

### Basic Usage

```html
<sc-multi-select [(value)]="selectedValues" [options]="options" placeholder="Select options..." />
```

### With Select All

```html
<sc-multi-select [options]="options" [showSelectAll]="true" placeholder="Select..." />
```

### Count Display (No Chips)

```html
<sc-multi-select [options]="options" [showChips]="false" placeholder="Select..." />
```

## API

### ScMultiSelect

| Input               | Type                  | Default               | Description            |
| ------------------- | --------------------- | --------------------- | ---------------------- |
| `class`             | `string`              | `''`                  | Additional CSS classes |
| `placeholder`       | `string`              | `'Select options...'` | Placeholder text       |
| `disabled`          | `boolean`             | `false`               | Disable the select     |
| `options`           | `MultiSelectOption[]` | `[]`                  | Available options      |
| `searchable`        | `boolean`             | `true`                | Enable search input    |
| `showChips`         | `boolean`             | `true`                | Show chips vs count    |
| `showSelectAll`     | `boolean`             | `false`               | Show select all option |
| `showClearAll`      | `boolean`             | `true`                | Show clear all button  |
| `maxDisplayedChips` | `number`              | `3`                   | Max chips before "+N"  |

| Output         | Type                | Description                  |
| -------------- | ------------------- | ---------------------------- |
| `value`        | `string[]`          | Two-way binding for values   |
| `valueChange`  | `string[]`          | Emits when selection changes |
| `optionSelect` | `MultiSelectOption` | Emits when option selected   |
| `optionRemove` | `MultiSelectOption` | Emits when option removed    |

| Method                 | Returns               | Description          |
| ---------------------- | --------------------- | -------------------- |
| `focus()`              | `void`                | Focus the trigger    |
| `getSelectedOptions()` | `MultiSelectOption[]` | Get selected options |

## MultiSelectOption Interface

```typescript
interface MultiSelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}
```

## Features

- **Chip Display**: Selected items shown as removable chips
- **Count Display**: Alternative compact display showing "N selected"
- **Searchable**: Filter options by typing
- **Select All**: Quickly select/deselect all visible options
- **Clear All**: Remove all selections at once
- **Disabled Options**: Individual options can be disabled
- **Keyboard Navigation**: Escape to close dropdown

## Examples

### Basic Multi-Select

```typescript
@Component({
  template: `
    <sc-multi-select [(value)]="selectedFruits" [options]="fruits" placeholder="Select fruits..." />
  `,
})
export class FruitPicker {
  selectedFruits = signal<string[]>([]);
  fruits: MultiSelectOption[] = [
    { value: 'apple', label: 'Apple' },
    { value: 'banana', label: 'Banana' },
    { value: 'cherry', label: 'Cherry' },
  ];
}
```

### With Disabled Options

```typescript
const frameworks: MultiSelectOption[] = [
  { value: 'react', label: 'React' },
  { value: 'angular', label: 'Angular' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte', disabled: true },
];
```

### Form Integration

```html
<form class="space-y-4">
  <div>
    <label>Select your interests</label>
    <sc-multi-select [(value)]="interests" [options]="interestOptions" [showSelectAll]="true" placeholder="Choose interests..." />
  </div>
  <button type="submit">Save</button>
</form>
```

### Without Search

```html
<sc-multi-select [options]="sizes" [searchable]="false" placeholder="Select sizes..." />
```

### Handling Selection Changes

```typescript
@Component({
  template: `
    <sc-multi-select [options]="options" (valueChange)="onSelectionChange($event)" (optionSelect)="onOptionSelected($event)" (optionRemove)="onOptionRemoved($event)" />
  `,
})
export class SelectHandler {
  onSelectionChange(values: string[]) {
    console.log('Selected values:', values);
  }

  onOptionSelected(option: MultiSelectOption) {
    console.log('Added:', option.label);
  }

  onOptionRemoved(option: MultiSelectOption) {
    console.log('Removed:', option.label);
  }
}
```

## Accessibility

- Trigger has `aria-expanded` and `aria-haspopup="listbox"`
- Dropdown has `role="listbox"` and `aria-multiselectable="true"`
- Options have `role="option"` and `aria-selected`
- Chip remove buttons have descriptive `aria-label`
- Keyboard support (Escape to close)
