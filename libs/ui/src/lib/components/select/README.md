# Select

A choice among a short list of options — a trigger showing the value, the options in a popup below it. In the look of the app's preset, with Signal Forms. For a long list to filter, use a Combobox; for several values, a Multiselect.

## Usage

```html
<div scField>
  <div scSelect [formField]="form.theme" [items]="themes">
    <div scSelectLabel>Theme</div>
    <div scSelectTrigger class="w-full">
      <span scSelectValue placeholder="Select a theme"></span>
      <svg scSelectIcon siChevronDownIcon></svg>
    </div>
    <ng-template scSelectPortal>
      <div scSelectPopup>
        <div scSelectList>
          <div scSelectGroup>
            @for (item of themes; track item.value) {
            <div scSelectItem [value]="item.value">
              <span scSelectItemText>{{ item.label }}</span>
              <span scSelectItemIndicator><svg siCheckIcon></svg></span>
            </div>
            }
          </div>
        </div>
      </div>
    </ng-template>
  </div>
</div>
```

## Anatomy

Base UI's parts, each a directive on your element:

```html
<div scSelect>
  <div scSelectLabel></div>
  <div scSelectTrigger>
    <span scSelectValue></span>
    <svg scSelectIcon></svg>
  </div>
  <ng-template scSelectPortal>
    <div scSelectPopup>
      <div scSelectScrollUpButton><svg></svg></div>
      <div scSelectList>
        <div scSelectGroup>
          <div scSelectGroupLabel></div>
          <div scSelectItem>
            <span scSelectItemText></span>
            <span scSelectItemIndicator><svg></svg></span>
          </div>
        </div>
        <div scSelectSeparator></div>
      </div>
      <div scSelectScrollDownButton><svg></svg></div>
    </div>
  </ng-template>
</div>
```

The root has no box of its own, as Base UI's: its label and trigger are laid out by their container (a field); give the trigger its width. It needs a name: its label, or `aria-label` on the trigger.

## Positioning

The popup opens below the trigger, which stays in sight — above it when there is no room below (Radix's `popper`). With `[alignItemWithTrigger]="true"` on the popup it opens over the trigger instead, the selected item (or the first) where the value is (Radix's `item-aligned`, Base UI's default), except when opened by touch or without room. In right to left it lines up with the trigger's right edge. The list is as wide as the trigger; for another width, a class on the popup (`<div scSelectPopup class="min-w-36">`: at least 144px, wider than a narrow trigger).

## Keyboard

Focus stays on the trigger (APG select-only combobox). Enter, Space or the arrow keys open the list; the arrows, Home and End move through it; Enter or Space selects; Escape closes. A letter, open or closed, goes to the first option starting with it (an option's `label`, or its text).

## API reference

| Part                                                 | Selector                                          | Inputs                                                                                                                                                            |
| ---------------------------------------------------- | ------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScSelect`                                           | `div[scSelect]`                                   | `value` (`[formField]` or `[(value)]`), `items` (`{ value, label }[]`: labels before the list has opened), `disabled`, `readonly`, `required`, `invalid`, `class` |
| `ScSelectLabel`                                      | `div[scSelectLabel]`, `label[scSelectLabel]`      | `id`, `class` — names the trigger and the list; a click focuses the trigger                                                                                       |
| `ScSelectTrigger`                                    | `div[scSelectTrigger]`, `button[scSelectTrigger]` | `size` (`'default'` 32px, `'sm'` 28px), `id`, `class` — in a field, described by its description and errors                                                       |
| `ScSelectValue`                                      | `span[scSelectValue]`                             | `placeholder`, `class` — its content, if any, shows the value your way                                                                                            |
| `ScSelectIcon`                                       | `svg[scSelectIcon]`                               | `class` — flips while the list is open                                                                                                                            |
| `ScSelectPortal`                                     | `ng-template[scSelectPortal]`                     | —                                                                                                                                                                 |
| `ScSelectPopup`                                      | `div[scSelectPopup]`                              | `alignItemWithTrigger` (`false`), `class` — the scroll container                                                                                                  |
| `ScSelectScrollUpButton`, `ScSelectScrollDownButton` | `div[…]`                                          | `class` — shown while there is more; hovering scrolls; `aria-hidden`                                                                                              |
| `ScSelectList`                                       | `div[scSelectList]`                               | `class` — the listbox                                                                                                                                             |
| `ScSelectGroup`, `ScSelectGroupLabel`                | `div[…]`                                          | `class` — a `group` named by its label                                                                                                                            |
| `ScSelectItem`                                       | `div[scSelectItem]`                               | `value`, `label`, `disabled`, `class`                                                                                                                             |
| `ScSelectItemText`, `ScSelectItemIndicator`          | `span[…]`                                         | `class` — the indicator shows on the selected option only                                                                                                         |
| `ScSelectSeparator`                                  | `div[scSelectSeparator]`                          | `class`                                                                                                                                                           |

Every part's classes are the preset's (`injectPreset().select`): shadcn's Select on Radix, in each style. Its parts and behaviour follow Base UI; `alignItemWithTrigger` is Radix's `position="item-aligned"`, off is `"popper"`.

`data-slot`: `select` (root) and `select-trigger`, read by the control group and the input group; `select-value`, read by the trigger.

## Left out

- Several values: the Multiselect.
- Object values: the value is a string, as Signal Forms binds it.
- Base UI's Backdrop and Arrow: shadcn uses neither.

## Known issue

`@angular/aria` forwards keys from the trigger to the list once per render: keys arriving within the same frame are coalesced. Normal typing is unaffected; scripted input or barcode scanners can lose keystrokes.
