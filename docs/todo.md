# To do

Open work found along the way, kept for later — tick an item when it's done. New components come first for now.

## Known issues

- [ ] **Label: no `text-sm font-medium`** (`libs/ui/src/lib/components/label/label.ts`): shadcn's Label has `text-sm leading-none font-medium`; ours has neither, so labels render at 16px, regular weight (seen on the Input page, 2026-10-30). For Label's turn.
- [ ] **tw-animate-css: `slide-in-from-start-*` / `-end-*` (and `slide-out-to-start/end-*`) build invalid CSS** — its minified `dist` (1.4.0, the latest) writes `[dir="ltr"]*` for `[dir="ltr"] *`, so the showcase build warns `Unexpected "*"`. Nothing of ours uses them now (the Base UI Select presets did: `data-[side=inline-*]:slide-in-from-start-2`; the Select takes Radix's, 2026-10-30). Keep them out of presets and parts, or report it upstream.
- [ ] **Unnamed inputs in demos**: `scInput` now warns in development without a name (a label or `aria-label`; a placeholder is not one). QR Code's interactive demo has one (2026-10-30; Input Group's were named in its turn). Name it in QR Code's turn: its tests may find the input by its placeholder.
- [ ] **WebKit: the featured Data Table demo's "columns popover … Escape returns focus" fails** (`apps/showcase-e2e/src/demos/data-table/featured-data-table-demo.spec.ts`). It failed before the Tree Table work too: the popover's focus return in WebKit.
- [ ] **WebKit: the Tree file-explorer demo's "focus ring only on the focused row" fails** (`apps/showcase-e2e/src/demos/tree/file-explorer-tree-demo.spec.ts`): Tab doesn't reach the tree there. Found while building the JSON Viewer; Tree untouched. (The Tree Table demos also fail now and then with 3 workers on the dev server, pass on 1.)
- [ ] **`scDataTableSelectAll`'s `scope` input clashes with a lint rule** (`@angular-eslint/template/table-scope` reserves `scope` for `<th>`), static or bound. Rename it — `range`?
- [ ] **Menu: a click opens it with the first item highlighted** (`libs/ui/src/lib/components/menu/`): Angular Aria's `MenuTrigger` makes the first item active however the menu opens, and our item styles `data-[active=true]`. shadcn (Base UI) highlights nothing on a pointer open — items light up as the pointer moves over them — and the first item only on a keyboard open (Enter, Space, arrows), which ours does right. Seen in the Breadcrumb's Dropdown example (2026-11-04: "Documentation" lit up on click; `apps/showcase/src/app/pages/docs/breadcrumb/demos/dropdown-breadcrumb-demo.ts`), and in every menu. For Menu's turn: check how Aria tracks the active item, and Base UI's docs; then recheck the Breadcrumb's Dropdown.
- [ ] **Overlays don't take their trigger's direction (and language)**: the CDK puts a menu, dialog or popover in the overlay container at the end of `<body>`, outside an RTL island (`<div dir="rtl" lang="ar">`), so the RTL demos repeat `dir="rtl" lang="ar"` on the overlay itself (Breadcrumb's RTL menu, Alert Dialog's RTL dialog; 2026-11-04). The Select already reads its trigger's computed direction and gives it to its overlay (`ScElementDirectionality`); do the same for the Menu — and the Alert Dialog, Dialog, Popover… in their turns — and copy `lang` too, then drop the repeats from the demos. (An app set RTL on `<html>` needs none of it: the overlay container inherits.)
- [ ] **Lifecycle hooks left in the libs** (the rule, 2026-11-04: none — see [component-design-principles.md](component-design-principles.md#modern-angular)): Phone Input's `ngOnInit` (`libs/ui/phone-input/src/lib/components/phone-input/phone-input.ts`), the Sidebar provider's `ngOnInit` (`libs/ui/src/lib/components/sidebar/sidebar-provider.ts`), the Stepper's `ngAfterContentInit` (`libs/ui/src/lib/components/stepper/stepper.ts`). Move them to the constructor, signals or signal queries in each component's turn.
- [ ] **Confirm CI is green** after the fix for the `ui` build (TS4029: `ScDataTableTreePosition` moved to `data-table-types.ts`).

## Larger items

- [ ] **Part names across the whole library**, after the styles rewrite (the user, 2026-11-05). `…Content` only for an `ng-template` rendered later (`ng-template[scMenuNextContent]`; the rule in [component-design-principles.md](component-design-principles.md#content-only-for-content-rendered-later)), never for one section between a header and a footer; `ScCardContent` breaks it, and `…Body` (ScAccordionBody, ScCollapsibleBody, ScEmptyBody, ScFieldBody, ScItemBody, ScNativeDialogBody, ScTableBody) has no defined meaning. Find the name for a section, then check every part's name.
- [ ] **SSR: 16 components still throw on the server**; the CI `ssr` job may fail because of them.
- [ ] **Charts** (see [reference-libraries.md](reference-libraries.md#charts)):
  - [ ] Animations, as Recharts: series appearing and changing data (`isAnimationActive`, duration, easing); honour `prefers-reduced-motion`.
  - [ ] Recharts parts we don't have: `Brush`, `ReferenceLine`, `ReferenceArea`, `ErrorBar`, axis `domain` — checked against shadcn's examples first.
  - [ ] Treemap and sankey without `d3-hierarchy` / `d3-sankey` (their own layouts, as Recharts) — or keep their entry points.
- [ ] **Tree Table** (see [reference-libraries.md](reference-libraries.md#tree-table)):
  - [ ] Children loaded when a row opens.
  - [ ] Focus cell by cell inside a row (the treegrid pattern's cell navigation).
