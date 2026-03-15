# Autocomplete Components

A combobox-style autocomplete input with filtering, keyboard navigation, and overlay popup.

## Features

- Full keyboard navigation support
- ARIA-compliant accessibility via `@angular/aria/combobox` and `@angular/aria/listbox`
- Automatic scroll-to-active on keyboard navigation
- Scroll-to-top on close
- Overlay positioning with CDK
- Customizable styling via `class` input

## Components

| Component                     | Selector                            | Type      | Responsibility                                                  |
| ----------------------------- | ----------------------------------- | --------- | --------------------------------------------------------------- |
| `ScAutocomplete`              | `div[scAutocomplete]`               | Component | Root container, wraps `Combobox`, owns overlay and scroll logic |
| `ScAutocompleteGroup`         | `div[scAutocompleteGroup]`          | Component | Input group container, provides overlay origin                  |
| `ScAutocompleteInput`         | `input[scAutocompleteInput]`        | Directive | Text input, wraps `ComboboxInput` from `@angular/aria`          |
| `ScAutocompleteIcon`          | `svg[scAutocompleteIcon]`           | Directive | Search icon styling (sets `aria-hidden="true"` automatically)   |
| `ScAutocompletePortal`        | `ng-template[scAutocompletePortal]` | Directive | Marks lazy content template for the overlay                     |
| `ScAutocompletePopup`         | `div[scAutocompletePopup]`          | Directive | Popup container with styling                                    |
| `ScAutocompleteList`          | `div[scAutocompleteList]`           | Directive | Listbox container, wraps `Listbox` from `@angular/aria`         |
| `ScAutocompleteItem`          | `div[scAutocompleteItem]`           | Component | Option item, wraps `Option` from `@angular/aria`                |
| `ScAutocompleteItemLabel`     | `span[scAutocompleteItemLabel]`     | Directive | Label text inside an item (applies `flex-1`)                    |
| `ScAutocompleteItemIndicator` | `svg[scAutocompleteItemIndicator]`  | Directive | Check icon for selected state (sets `aria-hidden="true"`)       |
| `ScAutocompleteEmpty`         | `div[scAutocompleteEmpty]`          | Directive | Empty state message when no results match                       |

## Basic Usage

### Template

```html
<div scAutocomplete filterMode="auto-select" class="w-52">
  <div scAutocompleteGroup>
    <svg siSearchIcon scAutocompleteIcon></svg>
    <input scAutocompleteInput aria-label="Select a country" placeholder="Select a country" [(ngModel)]="query" />
  </div>
  <ng-template scAutocompletePortal>
    <div scAutocompletePopup>
      @if (countries().length === 0) {
      <div scAutocompleteEmpty>No results found</div>
      }
      <div scAutocompleteList>
        @for (country of countries(); track country) {
        <div scAutocompleteItem [value]="country" [label]="country">
          <span scAutocompleteItemLabel>{{ country }}</span>
          <svg siCheckIcon scAutocompleteItemIndicator></svg>
        </div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

### Component

```typescript
import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ScAutocomplete, ScAutocompleteEmpty, ScAutocompleteGroup, ScAutocompleteIcon, ScAutocompleteInput, ScAutocompleteItem, ScAutocompleteItemIndicator, ScAutocompleteItemLabel, ScAutocompleteList, ScAutocompletePopup, ScAutocompletePortal } from '@semantic-components/ui';
import { SiCheckIcon, SiSearchIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-example',
  imports: [FormsModule, ScAutocomplete, ScAutocompleteEmpty, ScAutocompleteGroup, ScAutocompleteIcon, ScAutocompleteInput, ScAutocompleteItem, ScAutocompleteItemIndicator, ScAutocompleteItemLabel, ScAutocompleteList, ScAutocompletePopup, ScAutocompletePortal, SiSearchIcon, SiCheckIcon],
  template: `
    <div scAutocomplete filterMode="auto-select" class="w-52">
      <div scAutocompleteGroup>
        <svg siSearchIcon scAutocompleteIcon></svg>
        <input scAutocompleteInput aria-label="Select a country" placeholder="Select a country" [(ngModel)]="query" />
      </div>
      <ng-template scAutocompletePortal>
        <div scAutocompletePopup>
          @if (items().length === 0) {
            <div scAutocompleteEmpty>No results found</div>
          }
          <div scAutocompleteList>
            @for (item of items(); track item) {
              <div scAutocompleteItem [value]="item" [label]="item">
                <span scAutocompleteItemLabel>{{ item }}</span>
                <svg siCheckIcon scAutocompleteItemIndicator></svg>
              </div>
            }
          </div>
        </div>
      </ng-template>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Example {
  query = signal('');
  allItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Elderberry'];
  items = computed(() => this.allItems.filter((item) => item.toLowerCase().startsWith(this.query().toLowerCase())));
}
```

## Keyboard Navigation

| Key         | Action                        |
| ----------- | ----------------------------- |
| `ArrowDown` | Move focus to next option     |
| `ArrowUp`   | Move focus to previous option |
| `Enter`     | Select focused option         |
| `Home`      | Move focus to first option    |
| `End`       | Move focus to last option     |
| `Escape`    | Close dropdown                |
| `Tab`       | Close dropdown and move focus |

When navigating with keyboard, the dropdown automatically scrolls to keep the active option visible.

## Accessibility

- Uses `@angular/aria/combobox` and `@angular/aria/listbox` for proper ARIA roles
- `aria-label` on the input for screen reader support
- `ScAutocompleteIcon` and `ScAutocompleteItemIndicator` set `aria-hidden="true"` automatically
- Visual focus indicators for keyboard navigation
- Selected state indicated via `aria-selected`

### Required Accessibility Attributes

```html
<input scAutocompleteInput aria-label="Search items" placeholder="Search..." />
```

## API Reference

### ScAutocomplete

| Property     | Type     | Description                                    |
| ------------ | -------- | ---------------------------------------------- |
| `class`      | `string` | Additional CSS classes                         |
| `filterMode` | `string` | Combobox filter mode (forwarded to `Combobox`) |

### ScAutocompleteInput

| Property | Type     | Description                                                    |
| -------- | -------- | -------------------------------------------------------------- |
| `class`  | `string` | Additional CSS classes (base includes input styles and `ps-9`) |

### ScAutocompleteItem

| Property | Type     | Description                        |
| -------- | -------- | ---------------------------------- |
| `value`  | `any`    | The value of the option            |
| `label`  | `string` | The label displayed for the option |
| `class`  | `string` | Additional CSS classes             |

### All Components

All components and directives accept a `class` input for custom styling:

```html
<div scAutocomplete class="w-64" filterMode="auto-select">
  <div scAutocompleteGroup class="border-2">...</div>
</div>
```

## Architecture

```
ScAutocomplete (root, wraps Combobox, owns overlay + scroll logic)
├── ScAutocompleteGroup (input group, overlay origin)
│   ├── ScAutocompleteIcon (search icon, aria-hidden)
│   └── ScAutocompleteInput (wraps ComboboxInput)
└── ScAutocompletePortal (ng-template marking lazy overlay content)
    └── ScAutocompletePopup (popup container with styling)
        ├── ScAutocompleteEmpty (empty state message)
        └── ScAutocompleteList (wraps Listbox)
            └── ScAutocompleteItem (wraps Option)
                ├── ScAutocompleteItemLabel (label text, flex-1)
                └── ScAutocompleteItemIndicator (check icon, aria-hidden)
```

## Dependencies

- `@angular/aria/combobox` - Combobox behavior
- `@angular/aria/listbox` - Listbox and option behavior
- `@angular/cdk/overlay` - Overlay positioning
- `@semantic-icons/lucide-icons` - Icon library (used with `ScAutocompleteIcon` and `ScAutocompleteItemIndicator`)
