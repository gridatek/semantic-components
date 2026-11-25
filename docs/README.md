# Docs

How the library is built, and how to work on it. The user-facing documentation is the showcase site (`apps/showcase`); the rules an agent must follow are in [`.claude/CLAUDE.md`](../.claude/CLAUDE.md), which links here.

## Principles — how a component is designed

- [component-design-principles.md](principles/component-design-principles.md) — the main reference: naming, the consumer writes the content, a provider and its parts, state in the template, accessibility, sides and directions, links in popups, bounds from the form.
- [button-parts-styling.md](principles/button-parts-styling.md) — a part on a `button` styles itself (variant and size), and the exceptions.
- [content-body-naming.md](principles/content-body-naming.md) — Provider › X › Content › Header / Body / Footer, and the parts still to rename.
- [data-slot-pattern.md](principles/data-slot-pattern.md) — a `data-slot` only when another component styles by it.
- [form-control-contract.md](principles/form-control-contract.md) — how a control takes Signal Forms' state (`invalid`, `touched`, `disabled`).
- [id-generation.md](principles/id-generation.md) — how fields give ids to their label and control.
- [signal-forms-migration.md](principles/signal-forms-migration.md) — Signal Forms only: why, and how to move a form to it.

## Guides — how we work

- [writing-a-component-page.md](guides/writing-a-component-page.md) — a component's page: its sections, demos, routes, tests.
- [rtl-demos.md](guides/rtl-demos.md) — the right-to-left demo every component has.
- [shadcn-style-reference.md](guides/shadcn-style-reference.md) — finding shadcn's styles in the generated reference app, comparing them with ours, CSS variable names.
- [reference-libraries.md](guides/reference-libraries.md) — how we research a component (Base UI for shadcn's, the most used libraries for the others), and for what shadcn doesn't have: the libraries we follow, what we took, what is open.

## Testing

- [e2e-testing.md](testing/e2e-testing.md) — the Playwright suite: projects, running specs, CSR and SSR.
- [webkit-workarounds.md](testing/webkit-workarounds.md) — where Safari differs and the library works around it (`FIXME(webkit)` in the code).

## Maintenance

- [publishing.md](maintenance/publishing.md) — releasing the packages to npm.
- [update-commands.md](maintenance/update-commands.md) — updating dependencies.
- [aria-upstream-issues.md](maintenance/aria-upstream-issues.md) — issues found in Angular Aria, drafted for angular/angular; each worked around here.

## Ideas

- [custom-styles.md](ideas/custom-styles.md) — a consumer's own style as a feature (generator, CLI, merging): ideas and decisions for later.

## The rest

- [todo.md](todo.md) — open issues and larger items; tick an item when it's done.
- [why-semantic-components.md](why-semantic-components.md) — the article introducing the library; kept up to date with every API change.
