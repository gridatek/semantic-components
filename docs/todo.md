# To do

Open work found along the way, kept for later — tick an item when it's done. New components come first for now.

## Known issues

- [ ] **WebKit: the featured Data Table demo's "columns popover … Escape returns focus" fails** (`apps/showcase-e2e/src/demos/data-table/featured-data-table-demo.spec.ts`). It failed before the Tree Table work too: the popover's focus return in WebKit.
- [ ] **WebKit: the Tree file-explorer demo's "focus ring only on the focused row" fails** (`apps/showcase-e2e/src/demos/tree/file-explorer-tree-demo.spec.ts`): Tab doesn't reach the tree there. Found while building the JSON Viewer; Tree untouched. (The Tree Table demos also fail now and then with 3 workers on the dev server, pass on 1.)
- [ ] **`scDataTableSelectAll`'s `scope` input clashes with a lint rule** (`@angular-eslint/template/table-scope` reserves `scope` for `<th>`), static or bound. Rename it — `range`?
- [ ] **Confirm CI is green** after the fix for the `ui` build (TS4029: `ScDataTableTreePosition` moved to `data-table-types.ts`).

## Larger items

- [ ] **SSR: 16 components still throw on the server**; the CI `ssr` job may fail because of them.
- [ ] **Charts** (see [reference-libraries.md](reference-libraries.md#charts)):
  - [ ] Animations, as Recharts: series appearing and changing data (`isAnimationActive`, duration, easing); honour `prefers-reduced-motion`.
  - [ ] Recharts parts we don't have: `Brush`, `ReferenceLine`, `ReferenceArea`, `ErrorBar`, axis `domain` — checked against shadcn's examples first.
  - [ ] Treemap and sankey without `d3-hierarchy` / `d3-sankey` (their own layouts, as Recharts) — or keep their entry points.
- [ ] **Tree Table** (see [reference-libraries.md](reference-libraries.md#tree-table)):
  - [ ] Children loaded when a row opens.
  - [ ] Focus cell by cell inside a row (the treegrid pattern's cell navigation).
