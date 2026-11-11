# Combobox Next

A select to filter: an input over a list of options, one or several of which are its value — never free text (that is an autocomplete). Base UI's Combobox, on Angular Aria's Combobox and Listbox, in the look of the app's preset (the `combobox` key). Built beside [Combobox](../combobox/README.md), to compare.

## Usage

The input is the field, in our input group; the popup hangs from it.

```html
<div scComboboxNext #cb="scComboboxNext" [formField]="form.framework" class="w-56">
  <div scInputGroup>
    <input scInput scComboboxNextInput placeholder="Select a framework" aria-label="Framework" />
    <div scInputGroupAddon align="inline-end">
      <button scComboboxNextTrigger><svg siChevronDownIcon></svg><span class="sr-only">Show the list</span></button>
      <button scComboboxNextClear><svg siXIcon></svg><span class="sr-only">Clear</span></button>
    </div>
  </div>
  <ng-template scComboboxNextPortal>
    <div scComboboxNextPopup>
      <div scComboboxNextEmpty>No items found.</div>
      <div scComboboxNextList aria-label="Frameworks">
        @for (framework of matching(cb.query()); track framework) {
        <div scComboboxNextItem [value]="framework">
          {{ framework }}
          <span scComboboxNextItemIndicator><svg siCheckIcon></svg></span>
        </div>
        }
      </div>
    </div>
  </ng-template>
</div>
```

```ts
protected matching(query: string): string[] {
  return this.frameworks.filter((name) => scComboboxNextMatches(name, query));
}
```

## Filtering is yours

Angular Aria's listbox moves through every option it is given, so the options you render are the list: filter them by `query()`, the text typed since the list opened (empty until then — a list opened on a selected value shows them all). `scComboboxNextMatches(text, query)` is a match with accents and case ignored. A group with no match, your `@for` leaves out; with no option rendered, the popup shows your `scComboboxNextEmpty`. For a server search, the options are its results (the Async search example).

## Three layouts

- **The input is the field** (above): `input scInput scComboboxNextInput` in a `scInputGroup`, the trigger (a chevron) and the clear button at its end.
- **Several values**: `<div scComboboxNext multiple [(value)]="values">`, with `scComboboxNextChips` holding a `scComboboxNextChip` (and its `scComboboxNextChipRemove`) for each value, then the `scComboboxNextInput`. Picking adds or removes and keeps the list open.
- **A trigger, the search inside the popup**: `button scComboboxNextTrigger` holding a `scComboboxNextValue` — with no input beside it, the trigger takes the field's look by itself (outline, as wide as the combobox); in the popup, the input, then the list in an `ng-template scComboboxNextListContent` — Angular Aria renders a combobox's list from a template, and here that combobox is the search beside it. In a `scField`, the label names the trigger (with the value it shows) and the popup, and a click on it focuses the trigger. Without a field, name them yourself: `aria-labelledby="label-id value-id"` on the trigger (an `aria-label` alone leaves the text it shows out of its name), `aria-label` on the popup.

  ```html
  <div scField>
    <label scLabel>Country</label>
    <div scComboboxNext #cb="scComboboxNext" [(value)]="country" class="w-full">
      <button scComboboxNextTrigger>
        <span scComboboxNextValue placeholder="Select a country"></span>
        <svg siChevronDownIcon></svg>
      </button>
      <ng-template scComboboxNextPortal>
        <div scComboboxNextPopup>
          <div scInputGroup><input scInput scComboboxNextInput placeholder="Search" aria-label="Search countries" /></div>
          <div scComboboxNextEmpty>No items found.</div>
          <ng-template scComboboxNextListContent>
            <div scComboboxNextList aria-label="Countries">…</div>
          </ng-template>
        </div>
      </ng-template>
    </div>
  </div>
  ```

## Parts

| Part                                                | Selector                                     | What it does                                                                                                                                                                                                                                                                    |
| --------------------------------------------------- | -------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScComboboxNext`                                    | `div[scComboboxNext]`                        | One value, `T \| null`: `[formField]` or `[(value)]`. `[(inputValue)]`, `[(open)]`, `itemToStringLabel`, `isItemEqualToValue`, `autoHighlight`, `highlightItemOnHover`, `loopFocus`, `openOnInputClick`. exportAs: `query()`, `selectedLabel()`, `show()`, `close()`, `clear()` |
| `ScComboboxNextMultiple`                            | `div[scComboboxNext][multiple]`              | Several values, `T[]`; the same inputs                                                                                                                                                                                                                                          |
| `ScComboboxNextInput`                               | `input[scComboboxNextInput]`                 | The input (Aria's Combobox): the field, the chips' input, or the search inside the popup — it reads where it is                                                                                                                                                                 |
| `ScComboboxNextTrigger`                             | `button[scComboboxNextTrigger]`              | Opens and closes: the preset's button (`variant`, `size`; ghost, icon-xs). Beside the input, not a tab stop; alone, the field                                                                                                                                                   |
| `ScComboboxNextValue`                               | `span[scComboboxNextValue]`                  | In a trigger: the value's label, or its `placeholder`                                                                                                                                                                                                                           |
| `ScComboboxNextClear`                               | `button[scComboboxNextClear]`                | Clears the value; shown only with a value, in the trigger's place                                                                                                                                                                                                               |
| `ScComboboxNextChips`, `…Chip`, `…ChipRemove`       | `div[…]`, `span[…]`, `button[…]`             | The field of several values; a chip (`value`); its remove button                                                                                                                                                                                                                |
| `ScComboboxNextPortal`, `ScComboboxNextPopup`       | `ng-template[…]`, `div[scComboboxNextPopup]` | The popup, rendered while open: its field's width, below it (above without room); `data-empty` with no option                                                                                                                                                                   |
| `ScComboboxNextListContent`                         | `ng-template[scComboboxNextListContent]`     | Round the list, only when the search is inside the popup                                                                                                                                                                                                                        |
| `ScComboboxNextList`                                | `div[scComboboxNextList]`                    | The options (Aria's Listbox). Name it                                                                                                                                                                                                                                           |
| `ScComboboxNextItem`, `ScComboboxNextItemIndicator` | `div[scComboboxNextItem]`, `span[…]`         | An option (Aria's Option): `value`, `label`, `disabled`; the check on a selected one                                                                                                                                                                                            |
| `ScComboboxNextGroup`, `…GroupLabel`, `…Separator`  | `div[…]`                                     | A named group; a line between groups                                                                                                                                                                                                                                            |
| `ScComboboxNextEmpty`, `ScComboboxNextStatus`       | `div[…]`                                     | Your text with no option; a text read out, not shown                                                                                                                                                                                                                            |
| `scComboboxNextMatches`                             | function                                     | `(text, query) => boolean`                                                                                                                                                                                                                                                      |

## A value's label

The options' texts are only known once the list has opened. `itemToStringLabel` (a function from a value to its label) gives the label before — and is how an object value is shown (the Custom items example). Without it, a string value shows as itself.

## Keyboard

| Where                   | Key                 | Does                                                                              |
| ----------------------- | ------------------- | --------------------------------------------------------------------------------- |
| Input                   | typing              | Opens the list; the text is `query()`                                             |
| Input                   | ↓                   | Opens the list; then ↓ / ↑ move the highlight (round, `loopFocus`)                |
| Input, open             | Home / End          | The first / last option (Angular Aria's; not the caret)                           |
| Input, open             | Enter               | Picks the highlighted option                                                      |
| Input, open             | Escape              | Closes; the input shows the value again                                           |
| Input, emptied          |                     | One value: cleared                                                                |
| Chips' input, empty     | Backspace           | Removes the last chip                                                             |
| Chips' input, at start  | ← (→ right to left) | To the last chip's remove button; ← / → between them, Backspace or Delete removes |
| Trigger (search inside) | Enter, Space, ↓     | Opens the popup, focus in the search; Escape or a pick, back on it                |

## Signal Forms

`[formField]` on the root: `required` (`aria-required`), invalid once touched (`aria-invalid`, on the input or the trigger), `disabled`. Touched when focus leaves the input (or the popup a trigger opened). In a `scField`, the label names the input and the errors are read with it.

## Angular Aria

- **Keys pressed in one frame**: Aria relays them to the list once per render, so several arrow keys within a frame move the highlight once (checked on 22.2.6). Typing is not affected.
- **Home and End** go to the list while it is open (Base UI leaves them to the caret).
- **The list template** in the search-inside layout (above).

## Left out

Virtualization, a grid, `limit`, `modal`, an inline list; Base UI's Creatable example (app code); its Arrow, Backdrop, Positioner, Collection and Row parts (the CDK and `@for`); its Label part (`scLabel`, a field).
