# Angular Aria follow-ups

Open tasks after migrating the `@angular/aria` 22.2 based components (select, multiselect, autocomplete, combobox, command, menu, menu bar, context menu, tree, calendar, tabs, toolbar) and the ui-lab components moved onto Aria (stepper, speed dial, org chart, emoji picker, image annotator, PDF signature dialog). Each item is independent; pick what is worth it.

Effort: **S** < 1h · **M** a few hours · **L** a day or more.

## Done (2026-10-10)

- Disabled options styled (`aria-disabled:`, not `data-disabled:`) in select, multiselect, autocomplete, combobox; disabled option in the select group demo.
- Lighter hover than the selected row in the tree, so adjacent rows no longer merge (the popup lists now go further, see below).
- Shared portal outlet renamed `ScPortalOutlet` (`components/portal-outlet`).
- `registerLabel` reads its map untracked in select, multiselect, autocomplete (as combobox already did).
- Menu bar: Tab / Shift+Tab from an open menu leaves the menubar (aria refocused the bar item).
- Context menu: focus returns to the trigger also when the menu is closed straight away with Escape; demo shows the selected action (`itemSelected`).
- Tree production-ready and moved from `ui-lab` to `ui`: one Tab stop, selection API, nav mode, height animation, RTL-safe indentation.
- Interaction e2e tests: `apps/showcase-e2e/src/demos/{select,multiselect,autocomplete,combobox,phone-input,command,menu,menu-bar,context-menu,tree,calendar}`, helpers in `src/interaction.ts`.
- Tailwind no longer scans `apps/showcase-e2e` (`@source not` in the showcase stylesheet).
- Hand-written ARIA replaced by Aria: stepper (`Tabs`), speed dial (`MenuTrigger`/`Menu`/`MenuItem`), org chart (`Tree`), emoji picker categories and image annotator (`Toolbar`), PDF signature dialog (`Tabs`). Mention input keeps its own listbox, now wired with `aria-controls`/`aria-activedescendant`.
- Tabs: a vertical `ScTabs` makes its tab list vertical (`aria-orientation`, ↑/↓).
- Lightbox: ←/→ (RTL-aware, wrapping with `loop`) handled by the provider, not only by the carousel.
- Toolbar demo named (`aria-label="Text formatting"`).
- Input group: the in-popup ring reset wins on specificity (override in `combobox-popup.ts` removed); an embedded select/multiselect/combobox trigger rings the group (currency demo classes removed).
- Highlight follows the pointer in select, multiselect, autocomplete, combobox, command (`useActiveOption`, `utils/active-option`); separate `hover:` styles dropped; hovering doesn't scroll the list.
- `displayWith` on select, multiselect, combobox: labels for an initial value before the popup has opened.
- Type-ahead on a closed select / multiselect opens the list at the first match (APG select-only combobox).
- Decisions: autocomplete clear button stays a Tab stop; tree visible in the docs; every component stays `Experimental` for now.
- Org chart: sibling connector lines drawn (they never rendered), and a chart wider than its box overflows to the end only (safe centering), so it can be scrolled in full.
- Behaviour tests added for tabs, accordion, collapsible, lightbox, toolbar, stepper, speed dial, org chart, emoji picker, image annotator, PDF signature dialog, mention input.

## Bugs

### 1. Vertical line next to an input, "sometimes" — ? (needs a repro)

Reported from a screenshot: a thin vertical line just right of a rounded input. Not reproduced on the autocomplete/select demo pages (idle, typing, open/close frames, clear button).

- Needed: the page, the action that triggers it, the browser, and a wider screenshot.

## Deferred

### 2. PDF viewer toolbar — L

The PDF viewer toolbar is still a plain row of buttons. Making it an Aria `Toolbar` means first turning its hand-built dropdowns (highlight colour, image, Tools) into Aria `Menu`s — otherwise the toolbar's arrow keys fight the dropdowns'. A project of its own.

### 3. Combobox: type-ahead on the closed trigger — S

A printable key on a closed `ScComboboxTrigger` could open the popup with that character in the search box. Today Enter/Space/↓ open it.

## Code health

### 4. Demo icon mapping — S

The select, multiselect and command demos store icon _names_ (`'tag'`, `'star'`…) and map them with a big `@switch` in an `<ng-template>`. Icons must stay in the consumer template (they do), but the mapping could be simpler. Revisit together.

### 5. Drop the workarounds when Angular catches up — S each

- `bindInput` / `setInput` (`utils/bind-input`) write to input signal nodes through `@angular/core/primitives/signals`. Replace with host-directive bindings once [angular/angular#50510](https://github.com/angular/angular/issues/50510) ships.
- `ScComboboxListContainer` / `ScCommandListContainer` are plain template markers, and `ScAriaTreeItem` / `ScAriaOrgChartItem` / `ScAriaStepperTab` / `ScAriaStepperPanel` make required Aria inputs optional, only because required inputs of host directives can't be hidden (same issue).
- Menu bar Escape (`ScMenuBar`) and menu Tab (`ScMenu`) handling — see the upstream drafts.

## Upstream

Drafts ready to file: [`aria-upstream-issues.md`](./aria-upstream-issues.md).

- Combobox relays only the last key per render (coalescing).
- Menubar has no Escape handling for a menu opened from the bar.
- Menus have no Tab handling (menu stays open; in a menubar, focus is pulled back to the bar item).
