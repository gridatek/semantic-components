# Angular Aria follow-ups

Open tasks left after migrating select, multiselect, autocomplete, combobox and command to the `@angular/aria` 22.2 combobox API. Each item is independent; pick what is worth it.

Effort: **S** < 1h · **M** a few hours · **L** a day or more.

## Bugs

### 1. Disabled options are not styled — S

`@angular/aria`'s `Option` sets `aria-disabled="true"`, not `data-disabled`. The item classes in select, multiselect, autocomplete and combobox use `data-disabled:pointer-events-none data-disabled:opacity-50`, which never matches, so a disabled option looks enabled (it still can't be picked). Command already uses `aria-disabled:`.

- Files: `select-item.ts`, `multiselect-item.ts`, `autocomplete-item.ts`, `combobox-item.ts`
- Fix: `data-disabled:` → `aria-disabled:`; add a disabled option to one demo to see it.

### 2. Vertical line next to an input, "sometimes" — ? (needs a repro)

Reported from a screenshot: a thin vertical line just right of a rounded input. Not reproduced on the autocomplete/select demo pages (idle, typing, open/close frames, clear button).

- Needed: the page, the action that triggers it, the browser, and a wider screenshot.

### 3. Input group: focus-ring override loses on specificity — S

`ScInputGroup` has `in-data-[slot=combobox-content]:focus-within:ring-0` to stay flat inside a popup, but `has-[[data-slot=control]:focus-visible]:ring-3` wins (Tailwind's `in-*` adds no specificity). `ScComboboxPopup` works around it locally.

- File: `libs/ui/src/lib/components/input-group/input-group.ts`
- Fix: make the in-popup reset win in the input group itself (e.g. an `in-data-[slot=combobox-content]:has-[…:focus-visible]:ring-0` variant), then drop the override in `combobox-popup.ts`.

## UX

### 4. Only one highlighted row in lists — M

Hover and the keyboard-active option use the same colour, so with the mouse over a row two rows can look highlighted. In shadcn the highlight follows the pointer.

- Fix: on `pointermove` over an item, make it the active option (Listbox pattern), and drop the separate `hover:` styles.
- Applies to select, multiselect, autocomplete, combobox, command.

### 5. Labels before the first open — M

Popups render lazily, so `ScSelectValue` / `ScMultiselectValue` / `ScComboboxValue` show the raw value (e.g. `apple`) for an initial value until the list has been opened once. Consumers can project their own label today.

- Option: an optional `[itemToLabel]` / `[labels]` input on the root, used before options have rendered.

### 6. Type-ahead on a closed select — S/M

A native `<select>` lets you type to change the value without opening it; the Aria combobox only handles type-ahead while open.

### 7. Autocomplete clear button is a second tab stop — S

Keeps it keyboard-reachable; some designs prefer `tabindex="-1"` (text can still be selected and deleted). Decide and document.

### 8. Input group focus ring for a select trigger — S

The currency demo adds `has-[[data-slot=select-trigger]:focus-visible]:…` classes so the input group shows a ring when the embedded select is focused. Could live in `ScInputGroup` (also covering `multiselect-trigger` / `combobox-trigger`).

## Code health

### 9. Rename the shared portal outlet — S

`ScSelectPortalOutlet` is now used by select, multiselect, autocomplete, combobox (twice) and command. Move it to a neutral place/name (e.g. `utils/portal-outlet`, `ScPortalOutlet`) and keep the old export as an alias if needed.

### 10. Tracked reads in `registerLabel` — S

`ScSelect`, `ScMultiselect` and `ScAutocomplete` read `this.labels()` inside `registerLabel`, which items call from an effect, so every label write re-runs every item effect (O(n²) on open; not a loop). `ScCombobox` already reads it with `untracked`; do the same.

### 11. Demo icon mapping — S

The select, multiselect and command demos store icon _names_ (`'tag'`, `'star'`…) and map them with a big `@switch` in an `<ng-template>`. Icons must stay in the consumer template (they do), but the mapping could be simpler. Revisit together.

### 12. Drop the workarounds when Angular catches up — S each

- `bindInput` / `setInput` (`utils/bind-input`) write to input signal nodes through `@angular/core/primitives/signals`. Replace with host-directive bindings once [angular/angular#50510](https://github.com/angular/angular/issues/50510) ships.
- The list-container template markers (`ScComboboxListContainer`, `ScCommandListContainer`) exist only because `ComboboxPopup.combobox` is a required input that a host directive can't hide (same issue).

## Testing

### 13. Interaction e2e tests — M

All behaviour checks during the migration were temporary specs. Nothing guards keyboard, selection, form value, clear, or popup closing against the next Aria update. Suggested one behaviour spec per component (not axe — axe stays page-level):

- select / multiselect: one tab stop, open with ↓/Enter/Space, arrows + Enter, click, re-pick keeps value (select), stays open while toggling (multiselect), Escape, form value.
- autocomplete: type → filter, ↓ + Enter writes label, click, clear button.
- combobox: open moves focus to search, search resets on open, filter keeps the popup open with a value selected, Escape, clear.
- command: Enter/click fire `(select)` once, same item twice, palette navigates.

Pace keys ~60–80 ms apart (see item 14).

## Upstream

### 14. Report the Aria key-relay bug — S

`Combobox` stores each keydown in a signal and relays it to the popup in an `afterRenderEffect`. Keys arriving within one frame are coalesced and only the last is applied (scripted input, barcode scanners, very fast type-ahead). Documented as a known issue in the select, multiselect, autocomplete, combobox and command READMEs.

- Draft an issue for `angular/angular` with a minimal repro (`ngCombobox` + `ngListbox`, press `ArrowDown` twice in the same task → moves once).
