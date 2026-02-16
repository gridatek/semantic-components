# Writing a Component Documentation Page

This guide explains how to add a new component documentation page to the showcase app.

## Core Principle: One Demo = One Behavior

Each demo must be **minimal and isolated** — it showcases exactly one behavior or variant of the component. Do NOT group multiple examples into a single demo file.

For example, the accordion component has 3 separate demos:

- `basic-accordion-demo.ts` — single collapsible accordion
- `multiple-accordion-demo.ts` — multiple items open at once
- `disabled-accordion-demo.ts` — accordion with a disabled item

This keeps each demo focused and independently testable by Playwright.

## File Structure

```
apps/showcase/src/app/pages/docs/{component}/
  {component}-page.ts                              # Main documentation page
  demos/
    basic-{component}-demo.ts                      # Demo: basic usage
    basic-{component}-demo-container.ts            # Container for basic demo
    {variant}-{component}-demo.ts                  # Demo: specific variant/behavior
    {variant}-{component}-demo-container.ts        # Container for variant demo
```

## Step 1: Create Demo Components

Each demo is a minimal standalone component isolating one behavior.

**File:** `demos/basic-{component}-demo.ts`

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ScAccordion, ScAccordionPanel, ScAccordionItem, ScAccordionTrigger } from '@semantic-components/ui';

@Component({
  selector: 'app-basic-accordion-demo',
  imports: [ScAccordion, ScAccordionPanel, ScAccordionItem, ScAccordionTrigger],
  template: `
    <div scAccordion [value]="'item-1'" [collapsible]="true" class="w-full max-w-md">
      <div scAccordionItem value="item-1">
        <button scAccordionTrigger>Is it accessible?</button>
        <div scAccordionPanel>Yes. It adheres to the WAI-ARIA design pattern.</div>
      </div>
      <div scAccordionItem value="item-2">
        <button scAccordionTrigger>Is it styled?</button>
        <div scAccordionPanel>Yes. It comes with default styles that match the other components' aesthetic.</div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAccordionDemo {}
```

Key points:

- Use a **named export** (not default) — the demos router references the class by name.
- One component, one behavior, one template. No headings, no wrappers, no grouping.
- The naming convention is `{variant}-{component}-demo` (e.g. `basic-accordion-demo`, `multiple-accordion-demo`).

## Step 2: Create Demo Containers

Each demo gets a container that wraps it with a title and code viewer.

**File:** `demos/basic-{component}-demo-container.ts`

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DemoContainer } from '../../../../components/demo-container/demo-container';
import { BasicAccordionDemo } from './basic-accordion-demo';

@Component({
  selector: 'app-basic-accordion-demo-container',
  imports: [DemoContainer, BasicAccordionDemo],
  template: `
    <app-demo-container title="Basic" [code]="code">
      <app-basic-accordion-demo />
    </app-demo-container>
  `,
  host: { class: 'block' },
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BasicAccordionDemoContainer {
  readonly code = `// The exact content of basic-accordion-demo.ts goes here
// Backticks in the demo source must be escaped with \\`;
}
```

Key points:

- Use a **named export** — only page components use default exports.
- The `code` property contains the **exact source code** of the demo file (backticks escaped with `\`).
- The `title` should be short and describe the variant (e.g. "Basic", "Multiple", "Disabled"), not repeat the component name.

## Step 3: Create the Page Component

The page imports all containers and displays them.

**File:** `{component}-page.ts`

```typescript
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BasicAccordionDemoContainer } from './demos/basic-accordion-demo-container';
import { MultipleAccordionDemoContainer } from './demos/multiple-accordion-demo-container';
import { DisabledAccordionDemoContainer } from './demos/disabled-accordion-demo-container';

@Component({
  selector: 'app-accordion-page',
  imports: [BasicAccordionDemoContainer, MultipleAccordionDemoContainer, DisabledAccordionDemoContainer],
  template: `
    <div class="space-y-8">
      <div class="space-y-2">
        <h1 class="text-3xl font-bold tracking-tight">Accordion</h1>
        <p class="text-muted-foreground">A vertically stacked set of interactive headings that reveal or hide associated content.</p>
      </div>

      <section class="space-y-8">
        <h2 class="text-xl font-semibold tracking-tight">Examples</h2>
        <app-basic-accordion-demo-container />
        <app-multiple-accordion-demo-container />
        <app-disabled-accordion-demo-container />
      </section>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export default class AccordionPage {}
```

Key points:

- Use a **default export** — the components router uses `import(...)` without `.then()`.

## Step 4: Register the Components Route

**File:** `apps/showcase/src/app/routes/components.routes.ts`

```typescript
{
  path: 'accordion',
  loadComponent: () => import('../pages/docs/accordion/accordion-page'),
},
```

## Step 5: Add to the Components Data

**File:** `apps/showcase/src/app/data/components.ts`

```typescript
{ name: 'Accordion', path: 'accordion', description: 'A vertically stacked set of interactive headings.' },
```

## Step 6: Register ALL Demos in the Demos Router (Required for Playwright)

Every demo **must** be registered so Playwright can test it in isolation.

**File:** `apps/showcase/src/app/routes/demos.routes.ts`

```typescript
{
  path: 'demos/accordion',
  children: [
    {
      path: 'basic-accordion-demo',
      loadComponent: () =>
        import('../pages/docs/accordion/demos/basic-accordion-demo').then(
          (m) => m.BasicAccordionDemo,
        ),
    },
    {
      path: 'multiple-accordion-demo',
      loadComponent: () =>
        import('../pages/docs/accordion/demos/multiple-accordion-demo').then(
          (m) => m.MultipleAccordionDemo,
        ),
    },
    {
      path: 'disabled-accordion-demo',
      loadComponent: () =>
        import('../pages/docs/accordion/demos/disabled-accordion-demo').then(
          (m) => m.DisabledAccordionDemo,
        ),
    },
  ],
},
```

This gives Playwright isolated URLs:

- `/demos/accordion/basic-accordion-demo`
- `/demos/accordion/multiple-accordion-demo`
- `/demos/accordion/disabled-accordion-demo`

### Why this matters

- Playwright tests navigate directly to individual demo URLs to test component behavior without interference from the page layout, sidebar, or other demos.
- If a demo is not registered here, it cannot be tested in isolation.
- The `.then((m) => m.BasicAccordionDemo)` pattern requires the demo to use a **named export**.

## Demo Container Preview Layout

The demo container's preview panel uses `flex justify-center` with `*:contents` on its children:

```html
<div class="flex min-h-40 items-center justify-center rounded-md border p-6 *:contents">
  <ng-content />
</div>
```

### Why `*:contents`?

In Angular, every component renders inside a host element (e.g., `<app-basic-accordion-demo>`). When the preview panel uses `flex justify-center`, this host element becomes a flex child and **shrinks to its content width**. This causes full-width components like accordion to change width when panels open/close.

In React/shadcn, there is no wrapper element — the component's root element (e.g., the accordion `<div>`) is the direct flex child. If that element has `w-full`, it stretches properly.

`*:contents` bridges this gap. It sets `display: contents` on the Angular host elements, removing them from the layout tree. The demo's actual template content becomes the direct flex child — exactly like React. This means:

- **Full-width demos** (e.g., accordion with `w-full max-w-lg`) stretch properly and stay stable
- **Small demos** (e.g., buttons) shrink to content and get centered by `justify-center`

The demo container affects only the demo host element, not the demo's children.

## Summary Checklist

1. Identify all distinct behaviors/variants of the component
2. Create one minimal demo per behavior (named export)
3. Create one container per demo (named export)
4. Create the page component importing all containers (**default export** — only pages use default exports)
5. Add route to `components.routes.ts`
6. Add entry to `data/components.ts`
7. Register **every** demo in `demos.routes.ts` for Playwright testing
