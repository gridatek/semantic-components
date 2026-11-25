# Autocomplete

Free text with suggestions, as Base UI's Autocomplete: the value is the input's text, and a suggestion picked writes its label there — the text may be anything. When the value must be one of the options (never free text), use the [Combobox](../combobox/README.md).

Inside, the Combobox's parts as they are: one new root, `div[scAutocomplete]`, beside `scCombobox` and `scCombobox[multiple]` (all three on `ScComboboxBase`).

## Usage

```html
<div scField>
  <label scLabel>Country</label>
  <div scAutocomplete [formField]="form.country" #ac="scAutocomplete">
    <input scInput scComboboxInput placeholder="Type a country" />
    <ng-template scComboboxPortal>
      <div scComboboxPopup>
        <div scComboboxEmpty>No country found.</div>
        <div scComboboxList aria-label="Countries">
          @for (country of matching(ac.query()); track country) {
          <div scComboboxItem [value]="country">{{ country }}</div>
          }
        </div>
      </div>
    </ng-template>
  </div>
</div>
```

```ts
private matching(query: string) {
  return this.countries.filter((name) => scComboboxMatches(name, query));
}
```

## Parts

| Part                 | Selector              | What it does                                                                                                                                                                                                                                                                                                                                                         |
| -------------------- | --------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ScAutocomplete`     | `div[scAutocomplete]` | The root. `value`: the input's text (`string`), two-way or a `[formField]` (`FormValueControl<string>`: `required`, `maxLength`, `pattern`… in its schema). `mode`: `list` (default) or `both`; `autoHighlight`; `openOnInputClick` (off, as Base UI's); `disabled`; `readonly`. exportAs `scAutocomplete`: `query()` (the text to filter by, while open), `open()`. |
| The Combobox's parts | `[scCombobox…]`       | `scComboboxInput`, `…Trigger`, `…Clear`, `…Portal`, `…Popup`, `…List`, `…Item`, `…Group`, `…GroupLabel`, `…Separator`, `…Empty`, `…Status` — see the Combobox. A picked item writes its label (`label`, or its text) into the input.                                                                                                                                 |

## Behaviour

- **The text is the value**, as typed: no selection to remember. Closing the list keeps it; Escape closes, the text stays.
- **`mode="both"`**: the highlighted suggestion also completes the text inline, the completed part selected (typing on replaces it), `aria-autocomplete="both"` while it does. Angular Aria completes from the start of a suggestion: filter by prefix for it.
- **Filtering is yours**, by `query()` (`scComboboxMatches`, a prefix, a server — async is your own signal and a `scComboboxStatus`).

## Accessibility

- Angular Aria's editable combobox: focus stays in the input; ↓ / ↑ open the list and move the highlight, Enter picks, Escape closes.
- Name the input (its field's label, or `aria-label`) and the list; `scComboboxStatus` reads out what you write (the number of results, "Searching…").

## Left out

Base UI's `grid`, `virtualized`, `submitOnItemClick` (native forms), `inline` / `none` modes (Angular Aria derives `aria-autocomplete` from the inline suggestion: `list` or `both`), and the command palette — the [Command](../command/README.md) is that.
