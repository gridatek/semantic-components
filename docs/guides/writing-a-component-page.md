# Writing a Component Documentation Page

How to add a component's page to the showcase. The Button page is the model: `apps/showcase/src/app/pages/docs/button/button-page.ts`.

## Core Principle: One Demo = One Behavior

Each demo is **minimal and isolated**: it shows exactly one behavior or variant, so a Playwright spec can test it alone. Demos hold no behaviour of their own — what a component does, the library does; a demo writes markup and the app's state. The accordion has one demo per case (`basic`, `multiple`, `disabled`), not one demo with three accordions.

## The Page's Sections

In this order:

1. **Title and description**, and the component's badges: `<h1 scTypeset>`, a muted lead, `<app-component-badges path="…" />`. A component with an entry point of its own (`@semantic-components/ui/<entry>`) gets an **Installation** section next: `<app-entry-install entry="…" library="…" href="…" names="…" />`.
2. **Usage** — the smallest complete use: a `<component>-usage-demo`.
3. **Anatomy** — as Base UI's pages: what to import, then the parts as markup, nested as they go together, with a sentence on what is optional. `<app-anatomy [imports]="…" [markup]="…" />` (`components/anatomy/anatomy.ts`).
4. **Notes** the component needs (the Button's **Cursor**, the Emoji Picker's **Data**, **Keyboard**, **Accessibility**), each its own section.
5. **Examples** — one demo per example, each introduced by a sentence on what it shows, in the order of shadcn's page when shadcn has the component; the **RTL** demo last (see [rtl-demos.md](rtl-demos.md)).
6. **API reference** — the showcase's shared tables, never hand-written table markup: `<app-api-table label="ScBadge inputs" [inputs]="inputs" />` (Input, Type, Default, Description) and `<app-parts-table label="Accordion parts" [parts]="parts" />` (Part, Selector, Description). A table that isn't an API list (a page's keys, CSS variables, statuses) is the library's Table, its cells in the same style: plain `font-mono text-sm` code (no `bg-muted` chips), one value per line, keys in `scKbd`.

Headings are `<h2 scTypeset appToc>` (the page's table of contents reads them); text is plain — the style and typeset give the look, the page writes no font sizes or colours. Any key named in the text is `<kbd scKbd>` — Tab, Enter, Escape, the arrows (← → ↑ ↓), letters, combinations written `Ctrl + Shift + Z`; a typed character (Markdown's `#`) is `<kbd scKbd class="font-mono">`.

## File Structure

```
apps/showcase/src/app/pages/docs/{component}/
  {component}-page.ts                       # The page (default export)
  demos/
    {component}-usage-demo.ts               # Usage
    {component}-usage-demo-container.ts
    {variant}-{component}-demo.ts           # One per example
    {variant}-{component}-demo-container.ts
    rtl-{component}-demo.ts                 # Right to left, last
    rtl-{component}-demo-container.ts
```

## Step 1: Demos

A demo is a standalone component with a **named export** (the demo routes load it by name), selector `app-{variant}-{component}-demo`:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScAccordion, ScAccordionItem, ScAccordionPanel, ScAccordionTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-accordion-demo',
  imports: [ScAccordion, ScAccordionItem, ScAccordionPanel, ScAccordionTrigger],
  template: `
    <div scAccordion class="w-full max-w-md">
      <div scAccordionItem value="item-1">
        <button scAccordionTrigger>Is it accessible?</button>
        <div scAccordionPanel>Yes. It adheres to the WAI-ARIA design pattern.</div>
      </div>
    </div>
  `,
  encapsulation: ViewEncapsulation.None,
})
export class BasicAccordionDemo {}
```

A component in an entry point of its own is imported from it (`@semantic-components/ui/emoji-picker`). Icons are bare (`<svg siCopyIcon></svg>`): the component sizes them and hides them from screen readers; an icon-only button is named by an `sr-only` span inside it.

## Step 2: Demo Containers

Each demo gets a container: the title, the demo's own page (`demoUrl`) and its code.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAccordionDemo } from './basic-accordion-demo';

@Component({
  selector: 'app-basic-accordion-demo-container',
  imports: [DemoContainer, BasicAccordionDemo],
  template: `
    <app-demo-container title="Basic" demoUrl="/demos/accordion/basic-accordion-demo" [code]="code">
      <app-basic-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block w-full' },
  encapsulation: ViewEncapsulation.None,
})
export class BasicAccordionDemoContainer {
  private readonly code = '';
}
```

- Leave `code` empty: `node scripts/sync-demo-code.mjs` fills it with the demo's source (and keeps it in step after every change). Never edit it by hand.
- The `title` is short and names the variant ("Basic", "Multiple", "RTL"), not the component.

## Step 3: The Page

A default export (the routes load pages without `.then()`), importing the containers and the shared parts (`TocHeading`, `ComponentBadges`, `Anatomy`, `ApiTable`, `PartsTable`, `ScTypeset`, `ScKbd`). Write the sections above; keep the anatomy, inputs and parts as private fields of the class.

## Step 4: Routes

- **The page**, under its sidebar group's address: `/docs/components/…` in `routes/components-routes.ts` — or `charts-routes.ts`, `utilities-routes.ts`, `recipes-routes.ts` for those groups (the address follows the category, `docsPath()` in `data/components.ts`).
- **Every demo**, in `routes/demos-routes.ts`, under `demos/{component}` — Playwright opens each at its own URL (`/demos/accordion/basic-accordion-demo`), away from the page's layout and the other demos:

```typescript
{
  path: 'demos/accordion',
  children: [
    {
      path: 'basic-accordion-demo',
      loadComponent: () =>
        import('../pages/docs/accordion/demos/basic-accordion-demo').then((m) => m.BasicAccordionDemo),
    },
  ],
},
```

## Step 5: The Components List

Add the component to `apps/showcase/public/components.json` — the sidebar, the components list, the search and the MCP server's manifest read it:

```json
{
  "name": "Accordion",
  "path": "accordion",
  "description": "A vertically stacked set of headings that each reveal a section of content.",
  "status": "Experimental",
  "library": "ui",
  "category": "Layout"
}
```

New pages are public (no `hidden`); every component stays `Experimental` until decided otherwise.

## Step 6: Tests

- A page spec (`apps/showcase-e2e/src/pages/{component}-page.spec.ts`): no axe violations, in light and dark. The console-clean spec covers every public page by itself.
- Demo specs (`apps/showcase-e2e/src/demos/{component}/`) for the behaviour — see [e2e-testing.md](../testing/e2e-testing.md).

## Demo Container Preview Layout

The container's preview panel uses `flex justify-center` with `*:contents` on its children:

```html
<div class="flex min-h-40 items-center justify-center rounded-md border p-6 *:contents">
  <ng-content />
</div>
```

Every Angular component renders inside a host element (`<app-basic-accordion-demo>`), which in a flex row would shrink to its content's width — a full-width accordion would change width as its panels open. `*:contents` takes the host out of the layout (`display: contents`), so the demo's own root is the flex child, as in React: full-width demos stretch and stay stable, small ones are centred.

## Checklist

1. One demo per behavior (named export), a usage demo, and an RTL demo last.
2. One container per demo, `code` left empty, then `node scripts/sync-demo-code.mjs`.
3. The page (default export) with its sections in order.
4. The page's route in its group's routes file; every demo in `demos-routes.ts`.
5. The entry in `public/components.json`.
6. The page spec, and the demos' specs.
