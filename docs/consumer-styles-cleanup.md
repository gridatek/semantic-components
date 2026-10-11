# Task: move styling out of consumer templates

Components should style themselves; consumers (demos, blocks, READMEs) should only write markup and content. Two concrete leftovers.

## 1. Remove `aria-hidden` from icons — S

`@semantic-icons` already sets `aria-hidden="true"` on every `<svg si…Icon>`, so writing it again is noise.

- **Scope:** 129 occurrences in 21 files. Most are in the menu, menu-bar and command demos, plus `apps/showcase/src/app/components/feature-grid`; 5 files are in `libs` (READMEs and component templates).
- **Fix:** remove `aria-hidden="true"` from `<svg si…Icon>` tags. Mechanical, safe.
- **Keep:** `aria-hidden` on non-icon elements (decorative dots, separators…) — only icons are covered by the library.

## 2. Let components size their icons — M

Consumers write `class="size-4"` (or other sizes) on icons that the component could size itself, the way `ScMenu`/`ScMenuItem` (`[&_svg:not([class*='size-'])]:size-4`) and `ScButton` already do.

- **Scope:** 530 icons with a `size-*` class in 165 files (top: menu-bar, dashboard and pricing blocks, speed-dial, pdf-viewer, menu demos); 24 files in `libs`.
- **Fix, per component:** add a default icon size to components that hold icons (`[&_svg:not([class*='size-'])]:size-4`, or the component's own size), then remove the matching `size-*` from consumers.
- **Keep:** sizes that differ on purpose (a larger icon in a hero, an avatar, a status badge) — only remove a class when it equals the component's default.
- **Why it matters beyond tidiness:** a component that doesn't size its own icons can misbehave. Overlays measure their content when they open, and unsized icons are 300×150 until styled — that made the data-table row menu open upward (fixed by putting the rule on `ScMenu`).

## How to work

1. Inventory per component: list the icons consumers size, and the size they use.
2. Add the default to the component (one rule, `[&_svg:not([class*='size-'])]:size-N`, so an explicit size still wins).
3. Remove the now-redundant classes and `aria-hidden` from demos, blocks and READMEs; run `node scripts/sync-demo-code.mjs`.
4. Check visually (sizes unchanged) and run the page axe specs.
5. Add the rule to [writing-a-component-page.md](./writing-a-component-page.md): demos write bare icons (`<svg siCopyIcon></svg>`).
