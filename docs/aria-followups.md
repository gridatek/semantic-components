# Angular Aria follow-ups

Open tasks after migrating the `@angular/aria` 22.2 based components (select, multiselect, autocomplete, combobox, command, menu, menu bar, context menu, tree, calendar). Each item is independent; pick what is worth it.

Effort: **S** < 1h · **M** a few hours · **L** a day or more.

## Done (2026-10-10)

- Disabled options styled (`aria-disabled:`, not `data-disabled:`) in select, multiselect, autocomplete, combobox; disabled option in the select group demo.
- Lighter hover than the active/selected row in every list (select, multiselect, autocomplete, combobox, command, tree), so adjacent rows no longer merge.
- Shared portal outlet renamed `ScPortalOutlet` (`components/portal-outlet`).
- `registerLabel` reads its map untracked in select, multiselect, autocomplete (as combobox already did).
- Menu bar: Tab / Shift+Tab from an open menu leaves the menubar (aria refocused the bar item).
- Context menu: focus returns to the trigger also when the menu is closed straight away with Escape; demo shows the selected action (`itemSelected`).
- Tree production-ready and moved from `ui-lab` to `ui`: one Tab stop, selection API, nav mode, height animation, RTL-safe indentation.
- Interaction e2e tests: `apps/showcase-e2e/src/demos/{select,multiselect,autocomplete,combobox,phone-input,command,menu,menu-bar,context-menu,tree,calendar}`, helpers in `src/interaction.ts`.
- Tailwind no longer scans `apps/showcase-e2e` (`@source not` in the showcase stylesheet).

## Bugs

### 1. Vertical line next to an input, "sometimes" — ? (needs a repro)

Reported from a screenshot: a thin vertical line just right of a rounded input. Not reproduced on the autocomplete/select demo pages (idle, typing, open/close frames, clear button).

- Needed: the page, the action that triggers it, the browser, and a wider screenshot.

### 2. Input group: focus-ring override loses on specificity — S

`ScInputGroup` has `in-data-[slot=combobox-content]:focus-within:ring-0` to stay flat inside a popup, but `has-[[data-slot=control]:focus-visible]:ring-3` wins (Tailwind's `in-*` adds no specificity). `ScComboboxPopup` works around it locally.

- File: `libs/ui/src/lib/components/input-group/input-group.ts`
- Fix: make the in-popup reset win in the input group itself, then drop the override in `combobox-popup.ts`.

## UX

### 3. Highlight follows the pointer — M

Hover is now lighter than the keyboard-active row, so they no longer merge, but two rows can still be tinted at once. In shadcn the highlight follows the pointer.

- Fix: on `pointermove` over an item, make it the active option, and drop the separate `hover:` styles.
- Applies to select, multiselect, autocomplete, combobox, command (tree keeps hover: it has a separate selection).

### 4. Labels before the first open — M

Popups render lazily, so `ScSelectValue` / `ScMultiselectValue` / `ScComboboxValue` show the raw value (e.g. `apple`) for an initial value until the list has been opened once. Consumers can project their own label today.

- Option: an optional `[itemToLabel]` / `[labels]` input on the root, used before options have rendered.

### 5. Type-ahead on a closed select — S/M

A native `<select>` lets you type to change the value without opening it; the Aria combobox only handles type-ahead while open.

### 6. Autocomplete clear button is a second tab stop — S

Keeps it keyboard-reachable; some designs prefer `tabindex="-1"` (text can still be selected and deleted). Decide and document.

### 7. Input group focus ring for an embedded trigger — S

The currency demo adds `has-[[data-slot=select-trigger]:focus-visible]:…` classes so the input group shows a ring when the embedded select is focused. Could live in `ScInputGroup` (also covering `multiselect-trigger` / `combobox-trigger`).

### 8. Tree: visibility and status in the docs — S (decision)

The tree is in `ui` now but `apps/showcase/public/components.json` still lists it as `"status": "Experimental"`, `"hidden": true`. Decide whether to show it in the navigation and which status to give it.

## Code health

### 9. Demo icon mapping — S

The select, multiselect and command demos store icon _names_ (`'tag'`, `'star'`…) and map them with a big `@switch` in an `<ng-template>`. Icons must stay in the consumer template (they do), but the mapping could be simpler. Revisit together.

### 10. Drop the workarounds when Angular catches up — S each

- `bindInput` / `setInput` (`utils/bind-input`) write to input signal nodes through `@angular/core/primitives/signals`. Replace with host-directive bindings once [angular/angular#50510](https://github.com/angular/angular/issues/50510) ships.
- `ScComboboxListContainer` / `ScCommandListContainer` are plain template markers, and `ScAriaTreeItem` makes `TreeItem.parent` optional, only because required inputs of host directives can't be hidden (same issue).
- Menu bar Escape (`ScMenuBar`) and menu Tab (`ScMenu`) handling — see the upstream drafts.

## Upstream

Drafts ready to file: [`aria-upstream-issues.md`](./aria-upstream-issues.md).

- Combobox relays only the last key per render (coalescing).
- Menubar has no Escape handling for a menu opened from the bar.
- Menus have no Tab handling (menu stays open; in a menubar, focus is pulled back to the bar item).
