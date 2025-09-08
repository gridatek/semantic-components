# Combobox Component

## Component Features

### Core Features

- ✅ **Single Selection** - Standard dropdown selection
- ✅ **Multi-Selection** - Select multiple items with chip display
- ✅ **Async Loading** - Load items dynamically with loading indicator
- ✅ **Grouped Items** - Organize items into groups
- ✅ **CDK Integration** - Uses Angular CDK's ActiveDescendantKeyManager for proper keyboard navigation
- ✅ **CDK Overlay** - Proper dropdown positioning with CDK Overlay
- ✅ **Keyboard Navigation** - Full keyboard support with proper ARIA attributes
- ✅ **Typeahead** - Type to quickly find items
- ✅ **Search/Filter** - Type to filter items
- ✅ **Form Integration** - Works with Template-driven and Reactive Forms
- ✅ **Accessibility** - Full ARIA support with CDK a11y features

### Input Properties

| Property           | Type                       | Default             | Description                          |
| ------------------ | -------------------------- | ------------------- | ------------------------------------ |
| `label`            | string                     | ''                  | Label displayed above the combobox   |
| `placeholder`      | string                     | 'Type to search...' | Placeholder text for input           |
| `items`            | (string \| ComboboxItem)[] | []                  | Items to display in dropdown         |
| `multiple`         | boolean                    | false               | Enable multi-selection mode          |
| `async`            | boolean                    | false               | Enable async loading mode            |
| `grouped`          | boolean                    | false               | Enable grouped items display         |
| `showStatus`       | boolean                    | true                | Show selection status below combobox |
| `showToggleButton` | boolean                    | true                | Show dropdown toggle button          |
| `asyncSearchFn`    | Function                   | undefined           | Custom async search function         |

### Output Events

| Event             | Type         | Description                     |
| ----------------- | ------------ | ------------------------------- |
| `selectionChange` | EventEmitter | Emits when selection changes    |
| `searchChange`    | EventEmitter | Emits when search query changes |

## Usage Examples

### Basic Usage

```typescript
import { Component } from '@angular/core';

import { ComboboxComponent } from './combobox.component';

@Component({
  selector: 'app-example',
  standalone: true,
  imports: [ComboboxComponent, FormsModule],
  template: `
    <app-combobox [(ngModel)]="selectedItem" [items]="items" label="Select an item"></app-combobox>
  `,
})
export class ExampleComponent {
  items = ['Option 1', 'Option 2', 'Option 3'];
  selectedItem = '';
}
```

### With Complex Items

```typescript
// Using ComboboxItem interface
items: ComboboxItem[] = [
  { label: 'Display Name', value: 'internal_value', subtitle: 'Optional subtitle' },
  { label: 'Another Item', value: 'another_value', group: 'Group Name' }
];
```

### Multi-Select Mode

```typescript
<app-combobox
  [items]="technologies"
  [multiple]="true"
  [(ngModel)]="selectedTechs"
></app-combobox>
```

### Async Search

```typescript
<app-combobox
  [async]="true"
  [asyncSearchFn]="searchFunction"
  [(ngModel)]="selectedValue"
></app-combobox>

// In component:
searchFunction = async (query: string): Promise<ComboboxItem[]> => {
  const response = await fetch(`/api/search?q=${query}`);
  return response.json();
};
```

### Reactive Forms

```typescript
form = new FormGroup({
  country: new FormControl(''),
  skills: new FormControl([])
});

// Template:
<form [formGroup]="form">
  <app-combobox
    [items]="countries"
    formControlName="country"
  ></app-combobox>

  <app-combobox
    [items]="skills"
    [multiple]="true"
    formControlName="skills"
  ></app-combobox>
</form>
```

## Keyboard Shortcuts

| Key            | Action                                |
| -------------- | ------------------------------------- |
| `↓` Arrow Down | Open dropdown / Navigate to next item |
| `↑` Arrow Up   | Navigate to previous item             |
| `Enter`        | Select current item                   |
| `Escape`       | Close dropdown                        |
| `Tab`          | Move focus away and close dropdown    |

## Styling Customization

The component uses Tailwind CSS classes. To customize the appearance, you can:

1. **Override CSS variables** in your global styles
2. **Extend the component** and modify the template
3. **Use Tailwind's configuration** to customize the design system

### Custom Styles Example

```css
/* In your global styles or component styles */
:host ::ng-deep .combobox-panel {
  /* Custom dropdown panel styles */
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
}

:host ::ng-deep .combobox-option:hover {
  /* Custom hover state */
  background-color: #f0f9ff;
}
```

## Performance Considerations

- **Virtual Scrolling**: For large lists (1000+ items), consider implementing virtual scrolling
- **Debouncing**: Async search is debounced by 500ms by default
- **Change Detection**: Component uses OnPush strategy for better performance

## Accessibility

The component implements:

- ARIA roles (`combobox`, `listbox`, `option`)
- ARIA states (`aria-expanded`, `aria-selected`, `aria-multiselectable`)
- Keyboard navigation
- Focus management
- Screen reader support
