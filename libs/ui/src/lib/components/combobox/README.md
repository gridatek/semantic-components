# Combobox

A set of semantic directives that wrap `@angular/aria/combobox` and `@angular/aria/listbox` primitives with Tailwind CSS and shadcn design tokens.

## Directives

| Directive                    | Selector                                | Wraps                    | Description                                                                  |
| ---------------------------- | --------------------------------------- | ------------------------ | ---------------------------------------------------------------------------- |
| `ScCombobox`                 | `div[scCombobox]`                       | `Combobox`               | Outer combobox container with border styling                                 |
| `ScComboboxSearchPanel`      | `div[scComboboxSearchPanel]`            | `Combobox`               | Inner combobox for search panel (borderless)                                 |
| `ScComboboxInputGroup`       | `div[scComboboxInputGroup]`             | -                        | Trigger button container                                                     |
| `ScComboboxInput`            | `input[scComboboxInput]`                | `ComboboxInput`          | Read-only input displaying selected value                                    |
| `ScComboboxIcon`             | `svg[scComboboxIcon]`                   | -                        | Chevron icon in the trigger                                                  |
| `ScComboboxPopupContainer`   | `ng-template[scComboboxPopupContainer]` | `ComboboxPopupContainer` | Outer popup container template                                               |
| `ScComboboxDialog`           | `dialog[scComboboxDialog]`              | `ComboboxDialog`         | Dialog overlay with auto-positioning, gotoFirst on open, and close-on-select |
| `ScComboboxSearchInputGroup` | `div[scComboboxSearchInputGroup]`       | -                        | Search input group with icon                                                 |
| `ScComboboxSearchInputIcon`  | `svg[scComboboxSearchInputIcon]`        | -                        | Search icon in the input group                                               |
| `ScComboboxSearchInput`      | `input[scComboboxSearchInput]`          | `ComboboxInput`          | Search input with two-way `value` binding                                    |
| `ScComboboxListContainer`    | `ng-template[scComboboxListContainer]`  | `ComboboxPopupContainer` | Inner popup container for the list area                                      |
| `ScComboboxList`             | `div[scComboboxList]`                   | `Listbox`                | Scrollable list with two-way `values` binding and auto-scroll to active item |
| `ScComboboxItem`             | `div[scComboboxItem]`                   | `Option`                 | Selectable item with `value` and `label` inputs                              |
| `ScComboboxItemLabel`        | `span[scComboboxItemLabel]`             | -                        | Label text inside an item                                                    |
| `ScComboboxItemIndicator`    | `svg[scComboboxItemIndicator]`          | -                        | Check icon, visible when item is selected                                    |
| `ScComboboxEmpty`            | `div[scComboboxEmpty]`                  | -                        | Empty state message                                                          |

## Structure

```html
<div scCombobox [readonly]="true">
  <div scComboboxInputGroup>
    <input scComboboxInput [value]="value()" />
    <svg siChevronsUpDownIcon scComboboxIcon></svg>
  </div>
  <ng-template scComboboxPopupContainer>
    <dialog scComboboxDialog>
      <div scComboboxSearchPanel>
        <div scComboboxSearchInputGroup>
          <svg siSearchIcon scComboboxSearchInputIcon></svg>
          <input scComboboxSearchInput [(value)]="searchString" />
        </div>
        <ng-template scComboboxListContainer>
          @if (options().length === 0) {
          <div scComboboxEmpty>No results found</div>
          }
          <div scComboboxList [(values)]="selectedValues">
            @for (option of options(); track option) {
            <div scComboboxItem [value]="option" [label]="option">
              <span scComboboxItemLabel>{{ option }}</span>
              <svg siCheckIcon scComboboxItemIndicator></svg>
            </div>
            }
          </div>
        </ng-template>
      </div>
    </dialog>
  </ng-template>
</div>
```

## Design Tokens

All directives use shadcn design tokens:

- `bg-popover` / `text-popover-foreground` - Popover background and text
- `border-border` - Border color
- `bg-accent` / `text-accent-foreground` - Active item highlight
- `text-muted-foreground` - Placeholder and empty state text
- `text-primary` - Selected item text

## Class Merging

Directives that accept a `class` input use the `cn()` utility for Tailwind class merging, allowing consumers to override default styles:

```html
<div scCombobox class="w-60">...</div>
```
