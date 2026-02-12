# Combobox

Autocomplete input and command palette with a list of suggestions. Built on `@angular/aria` primitives using a composable, nested combobox pattern.

## Architecture

Uses a **nested combobox** pattern:

1. **Outer combobox** (`ScCombobox`, readonly) — acts as trigger, opens/closes dialog
2. **ComboboxDialog** (inside `ScComboboxPortal`) — native `<dialog>` popup
3. **Inner combobox** (inside `ScComboboxPortal`, `filterMode="manual"`, `alwaysExpanded`) — handles search + keyboard navigation
4. **Listbox + Option** (`ScComboboxList` + `ScComboboxItem`) — the actual options list

The search input is **built into** `ScComboboxPortal`'s template (not projected). This is required because the search `ComboboxInput` must be in the inner `Combobox`'s DI context.

## Components

| Component                 | Selector                          | Aria Primitive                                                                   | Purpose                                 |
| ------------------------- | --------------------------------- | -------------------------------------------------------------------------------- | --------------------------------------- |
| `ScCombobox`              | `div[sc-combobox]`                | `Combobox` (hostDirective, readonly)                                             | Root container                          |
| `ScComboboxTrigger`       | `div[sc-combobox-trigger]`        | —                                                                                | Styling wrapper for trigger             |
| `ScComboboxInput`         | `input[sc-combobox-input]`        | `ComboboxInput` (hostDirective)                                                  | Invisible input (opens dropdown)        |
| `ScComboboxIcon`          | `svg[sc-combobox-icon]`           | —                                                                                | Chevron icon with rotation on expand    |
| `ScComboboxPortal`        | `div[sc-combobox-portal]`         | `ComboboxPopupContainer` + `ComboboxDialog` + inner `Combobox` + `ComboboxInput` | Dialog popup with built-in search input |
| `ScComboboxList`          | `div[sc-combobox-list]`           | `Listbox` (hostDirective)                                                        | Scrollable options list                 |
| `ScComboboxItem`          | `div[sc-combobox-item]`           | `Option` (hostDirective)                                                         | Individual option                       |
| `ScComboboxItemIndicator` | `svg[sc-combobox-item-indicator]` | —                                                                                | Checkmark (visible when selected)       |
| `ScComboboxEmpty`         | `div[sc-combobox-empty]`          | —                                                                                | Empty state message                     |

### ScComboboxPortal

**Inputs:**

| Input               | Type     | Default       | Description              |
| ------------------- | -------- | ------------- | ------------------------ |
| `searchPlaceholder` | `string` | `'Search...'` | Search input placeholder |
| `class`             | `string` | `''`          | Additional CSS classes   |

**Two-way Bindings:**

| Binding       | Type     | Description                |
| ------------- | -------- | -------------------------- |
| `searchValue` | `string` | Current search/filter text |

### ScComboboxList

Exposes from `Listbox` hostDirective:

| Input/Output | Type       | Description               |
| ------------ | ---------- | ------------------------- |
| `[(values)]` | `string[]` | Selected values           |
| `[multi]`    | `boolean`  | Enable multiple selection |

### ScComboboxItem

Exposes from `Option` hostDirective:

| Input        | Type      | Description                |
| ------------ | --------- | -------------------------- |
| `[value]`    | `string`  | Option value (required)    |
| `[label]`    | `string`  | Option label for typeahead |
| `[disabled]` | `boolean` | Disable this option        |

## Usage

### Single Select

```html
<div sc-combobox class="w-[200px]">
  <div sc-combobox-trigger>
    <span class="pointer-events-none absolute left-3 truncate">{{ displayValue() }}</span>
    <input sc-combobox-input />
    <svg sc-combobox-icon xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m7 15 5 5 5-5" />
      <path d="m7 9 5-5 5 5" />
    </svg>
  </div>
  <div sc-combobox-portal searchPlaceholder="Search..." [(searchValue)]="search">
    @if (filteredOptions().length === 0) {
    <div sc-combobox-empty>No results found.</div>
    }
    <div sc-combobox-list [(values)]="selectedValues">
      @for (option of filteredOptions(); track option.value) {
      <div sc-combobox-item [value]="option.value" [label]="option.label">
        <span>{{ option.label }}</span>
        <svg sc-combobox-item-indicator xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 6 9 17l-5-5" />
        </svg>
      </div>
      }
    </div>
  </div>
</div>
```

```typescript
readonly search = signal('');
readonly selectedValues = signal<string[]>([]);

readonly options = [
  { value: 'next', label: 'Next.js' },
  { value: 'angular', label: 'Angular' },
];

readonly filteredOptions = computed(() => {
  const query = this.search().toLowerCase();
  if (!query) return this.options;
  return this.options.filter((o) => o.label.toLowerCase().includes(query));
});

readonly displayValue = computed(() => {
  const vals = this.selectedValues();
  if (vals.length === 0) return 'Select...';
  const option = this.options.find((o) => o.value === vals[0]);
  return option?.label ?? 'Select...';
});

constructor() {
  // Auto-close on single select + clear search
  afterRenderEffect(() => {
    if (this.selectedValues().length > 0) this.search.set('');
  });
}
```

### Multiple Selection

```html
<div sc-combobox-list [multi]="true" [(values)]="selectedValues">
  <!-- same item template -->
</div>
```

### Disabled Options

```html
<div sc-combobox-item [value]="option.value" [label]="option.label" [disabled]="true">
  <!-- content -->
</div>
```

## Consumer Responsibilities

The composable API puts the consumer in control of:

- **Display text** — compute from `selectedValues()` and your options array
- **Filtering** — filter your options array using `searchValue` model
- **Selected values** — manage via `[(values)]` on `ScComboboxList` (always `string[]`)
- **Auto-close** — for single-select, use `afterRenderEffect` to close after selection

## Features

- Search/filter with built-in search input inside the dialog
- Single and multiple selection via Listbox `multi` input
- Disabled options via Option `disabled` input
- Checkmark indicator for selected options
- Full keyboard navigation via `@angular/aria` primitives
- Dialog positioning anchored below the trigger

## Accessibility

- `@angular/aria` `Combobox`, `ComboboxInput`, `ComboboxDialog`, `Listbox`, and `Option` directives handle all ARIA attributes
- Keyboard navigation (arrow keys, enter, escape) managed by aria primitives
- Focus management between trigger and dialog
- `aria-selected` on options, `aria-expanded` on trigger
- Native `<dialog>` element for proper focus trapping
