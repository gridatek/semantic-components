# Select Next

The Select's rewrite (beside it until the switch): a choice among a short list of options — a trigger showing the value, the options in a popup below it. In the look of the app's preset, with Signal Forms. For a long list to filter, use a Combobox; for several values, a Multiselect.

## Usage

```html
<div scField>
  <div scSelectNext [formField]="form.theme" [items]="themes">
    <div scSelectNextLabel>Theme</div>
    <div scSelectNextTrigger class="w-full">
      <span scSelectNextValue placeholder="Select a theme"></span>
      <svg scSelectNextIcon siChevronDownIcon></svg>
    </div>
    <ng-template scSelectNextPortal>
      <div scSelectNextPopup>
        <div scSelectNextList>
          <div scSelectNextGroup>
            @for (item of themes; track item.value) {
            <div scSelectNextItem [value]="item.value">
              <span scSelectNextItemText>{{ item.label }}</span>
              <span scSelectNextItemIndicator><svg siCheckIcon></svg></span>
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
<div scSelectNext>
  <div scSelectNextLabel></div>
  <div scSelectNextTrigger>
    <span scSelectNextValue></span>
    <svg scSelectNextIcon></svg>
  </div>
  <ng-template scSelectNextPortal>
    <div scSelectNextPopup>
      <div scSelectNextScrollUpButton><svg></svg></div>
      <div scSelectNextList>
        <div scSelectNextGroup>
          <div scSelectNextGroupLabel></div>
          <div scSelectNextItem>
            <span scSelectNextItemText></span>
            <span scSelectNextItemIndicator><svg></svg></span>
          </div>
        </div>
        <div scSelectNextSeparator></div>
      </div>
      <div scSelectNextScrollDownButton><svg></svg></div>
    </div>
  </ng-template>
</div>
```

The root has no box of its own, as Base UI's: its label and trigger are laid out by their container (a field); give the trigger its width. It needs a name: its label, or `aria-label` on the trigger.

## Positioning

The popup opens below the trigger, which stays in sight — above it when there is no room below (Radix's `popper`). With `[alignItemWithTrigger]="true"` on the popup it opens over the trigger instead, the selected item (or the first) where the value is (Radix's `item-aligned`, Base UI's default), except when opened by touch or without room. In right to left it lines up with the trigger's right edge.

## Keyboard

Focus stays on the trigger (APG select-only combobox). Enter, Space or the arrow keys open the list; the arrows, Home and End move through it; Enter or Space selects; Escape closes. A letter, open or closed, goes to the first option starting with it (an option's `label`, or its text).

## API reference

| Part                                                         | Selector                                                  | Inputs                                                                                                                                                            |
| ------------------------------------------------------------ | --------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScSelectNext`                                               | `div[scSelectNext]`                                       | `value` (`[formField]` or `[(value)]`), `items` (`{ value, label }[]`: labels before the list has opened), `disabled`, `readonly`, `required`, `invalid`, `class` |
| `ScSelectNextLabel`                                          | `div[scSelectNextLabel]`, `label[scSelectNextLabel]`      | `id`, `class` — names the trigger and the list; a click focuses the trigger                                                                                       |
| `ScSelectNextTrigger`                                        | `div[scSelectNextTrigger]`, `button[scSelectNextTrigger]` | `size` (`'default'` 32px, `'sm'` 28px), `id`, `class` — in a field, described by its description and errors                                                       |
| `ScSelectNextValue`                                          | `span[scSelectNextValue]`                                 | `placeholder`, `class` — its content, if any, shows the value your way                                                                                            |
| `ScSelectNextIcon`                                           | `svg[scSelectNextIcon]`                                   | `class` — flips while the list is open                                                                                                                            |
| `ScSelectNextPortal`                                         | `ng-template[scSelectNextPortal]`                         | —                                                                                                                                                                 |
| `ScSelectNextPopup`                                          | `div[scSelectNextPopup]`                                  | `alignItemWithTrigger` (`false`), `class` — the scroll container                                                                                                  |
| `ScSelectNextScrollUpButton`, `ScSelectNextScrollDownButton` | `div[…]`                                                  | `class` — shown while there is more; hovering scrolls; `aria-hidden`                                                                                              |
| `ScSelectNextList`                                           | `div[scSelectNextList]`                                   | `class` — the listbox                                                                                                                                             |
| `ScSelectNextGroup`, `ScSelectNextGroupLabel`                | `div[…]`                                                  | `class` — a `group` named by its label                                                                                                                            |
| `ScSelectNextItem`                                           | `div[scSelectNextItem]`                                   | `value`, `label`, `disabled`, `class`                                                                                                                             |
| `ScSelectNextItemText`, `ScSelectNextItemIndicator`          | `span[…]`                                                 | `class` — the indicator shows on the selected option only                                                                                                         |
| `ScSelectNextSeparator`                                      | `div[scSelectNextSeparator]`                              | `class`                                                                                                                                                           |

Every part's classes are the preset's (`injectPreset().select`): shadcn's Select on Radix, in each style. Its parts and behaviour follow Base UI; `alignItemWithTrigger` is Radix's `position="item-aligned"`, off is `"popper"`.

`data-slot`: `select` (root) and `select-trigger`, read by the control group and the input group; `select-value`, read by the trigger.

## Left out

- Several values: the Multiselect.
- Object values: the value is a string, as Signal Forms binds it.
- Base UI's Backdrop and Arrow: shadcn uses neither.

## Known issue

`@angular/aria` forwards keys from the trigger to the list once per render: keys arriving within the same frame are coalesced. Normal typing is unaffected; scripted input or barcode scanners can lose keystrokes.
