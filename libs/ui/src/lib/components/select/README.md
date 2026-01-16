# Select

A select component built on top of `@angular/aria/combobox` and `@angular/aria/listbox` with shadcn/ui styling.

## Components

| Directive               | Selector                  | Description                           |
| ----------------------- | ------------------------- | ------------------------------------- |
| `ScSelect`              | `[scSelect]`              | Root container, wraps `Combobox`      |
| `ScSelectTrigger`       | `[scSelectTrigger]`       | Trigger button, wraps `ComboboxInput` |
| `ScSelectValue`         | `[scSelectValue]`         | Displays the selected value           |
| `ScSelectIcon`          | `[scSelectIcon]`          | Chevron icon with rotation animation  |
| `ScSelectContent`       | `[scSelectContent]`       | Dropdown content, wraps `Listbox`     |
| `ScSelectItem`          | `[scSelectItem]`          | Option item, wraps `Option`           |
| `ScSelectItemIndicator` | `[scSelectItemIndicator]` | Check icon for selected state         |

## Usage

```html
<div scSelect>
  <div #origin scSelectTrigger>
    <span scSelectValue>{{ displayValue() }}</span>
    <svg scSelectIcon si-chevron-down-icon></svg>
  </div>
  <ng-template ngComboboxPopupContainer>
    <ng-template
      [cdkConnectedOverlay]="{ origin, usePopover: 'inline', matchWidth: true }"
      [cdkConnectedOverlayOpen]="true"
    >
      <div scSelectContent>
        @for (option of options; track option.value) {
        <div [value]="option.value" [label]="option.label" scSelectItem>
          <span class="flex-1">{{ option.label }}</span>
          <span scSelectItemIndicator>
            <svg class="size-4" si-check-icon></svg>
          </span>
        </div>
        }
      </div>
    </ng-template>
  </ng-template>
</div>
```

## Required Imports

```typescript
import { ComboboxPopupContainer } from '@angular/aria/combobox';
import { Listbox, Option } from '@angular/aria/listbox';
import { OverlayModule } from '@angular/cdk/overlay';

import {
  ScSelect,
  ScSelectContent,
  ScSelectIcon,
  ScSelectItem,
  ScSelectItemIndicator,
  ScSelectTrigger,
  ScSelectValue,
} from '@semantic-components/ui';
```

## Accessing Selected Values

Use `viewChild` to access the `Listbox` and get selected values:

```typescript
import { Listbox } from '@angular/aria/listbox';

listbox = viewChild<Listbox<string>>(Listbox);

displayValue = computed(() => {
  const values = this.listbox()?.values() || [];
  return values.length ? values[0] : 'Select an option';
});
```
