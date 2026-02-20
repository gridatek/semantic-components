# Meet Semantic Components — A Modern Angular UI Library

After waiting so long for an Angular UI library that actually met my needs, I decided to stop waiting and build my own. The result is **Semantic Components** — an open-source Angular UI library built on Tailwind CSS, Angular CDK, and Angular Aria, heavily inspired by [shadcn/ui](https://ui.shadcn.com).

**GitHub:** https://github.com/gridatek/semantic-components
**Package:** `@semantic-components/ui`

---

## Why Semantic Components?

The Angular ecosystem has always had fewer off-the-shelf UI options compared to React. Libraries like shadcn/ui, Radix, and Headless UI have raised the bar for what a component library can be — and Angular deserves the same quality.

Semantic Components is my attempt to bring that standard to Angular, while leaning fully into what makes Angular great: strong typing, a compiler that catches errors early, a predictable change detection model, and signals.

---

## Core Design Principles

### Semantic

Every directive or component is named to describe its **role** in the interface, not just the feature it belongs to. Take the tooltip as an example. Angular Material gives you a single `matTooltip` directive — it conflates the tooltip itself with what triggers it, everything in one attribute:

```html
<!-- Angular Material -->
<button matTooltip="Save changes">Save</button>
```

In Semantic Components, each piece has its own name that reflects its exact role:

```html
<!-- Semantic Components -->
<button scTooltipTrigger="Save changes">Save</button>
```

`scTooltipTrigger` — because `ScTooltip` is already the component that _renders_ the actual tooltip bubble. The directive on the button is not the tooltip — it's what triggers it. These are two different things, and the names reflect that. `ScDrawerTrigger`, `ScSelectValue`, `ScSelectTrigger`, `ScSidebarBody` — you know exactly what each piece does before reading a single line of docs.

This principle extends to the **HTML elements themselves**. When possible, components/directives are applied to the right native element rather than a generic `<div>`. The sidebar menu is a real `<ul>` with real `<li>` items. A menu button is a real `<button>` or `<a>`. This is not just stylistic — it means screen readers, keyboard users, and search engines see meaningful structure.

```html
<ul scSidebarMenu>
  <li scSidebarMenuItem>
    <a scSidebarMenuButton routerLink="/dashboard">Dashboard</a>
  </li>
  <li scSidebarMenuItem>
    <button scSidebarMenuButton>Settings</button>
  </li>
</ul>
```

You're not hiding a list inside a stack of `<div>` wrappers. The HTML is as semantic as the API.

### Declarative

The entire UI is described in the template — no imperative `open()`, `close()`, or `DialogService.create()` calls. Take the dialog as an example:

```html
<div scDialogProvider [(open)]="isOpen">
  <button scDialogTrigger scButton variant="outline">Open Dialog</button>

  <ng-template scDialogPortal>
    <div scDialog>
      <button scDialogClose>
        <svg siXIcon></svg>
        <span class="sr-only">Close</span>
      </button>
      <div scDialogHeader>
        <h2 scDialogTitle>Edit profile</h2>
        <p scDialogDescription>Make changes to your profile here.</p>
      </div>
      <!-- content -->
      <div scDialogFooter>
        <button scButton variant="outline" (click)="isOpen.set(false)">Cancel</button>
        <button scButton type="submit">Save changes</button>
      </div>
    </div>
  </ng-template>
</div>
```

```typescript
readonly isOpen = signal(false);
```

The open state is a signal. The trigger, the portal, the close button — all declared in the template. No service injection, no imperative show/hide, no `ViewContainerRef` gymnastics. You read the template and immediately understand the full structure of the dialog.

The naming reinforces this. `ScDialog` is not a service — it's the `<div role="dialog">` element itself. In Angular Material, `MatDialog` is a service you inject and call `.open()` on. Here, `scDialog` is the thing rendered in the DOM. Same naming principle: the name describes exactly what the piece _is_, not what it _does behind the scenes_.

There is a tradeoff: `scDialogProvider` requires an extra wrapper element in the DOM. It acts as the coordination point between the trigger, the portal, and the close button — sharing state through Angular's DI tree. It's a conscious choice in favor of keeping everything in the template, at the cost of one extra `<div>` that you may need to style or account for in your layout.

### Composable

Each component is a set of small, focused pieces that you assemble yourself. There are no magic `[content]` inputs or hidden `<ng-content>` slots — you write the structure, and the pieces plug into it.

The Select is a good example of how far this goes:

```html
<div scSelect #select="scSelect" placeholder="Select a label">
  <div scSelectTrigger aria-label="Label dropdown">
    <span scSelectValue>
      @if (displayIcon(); as icon) {
      <svg scSelectIcon siTagIcon></svg>
      }
      <span class="truncate">{{ select.displayValue() }}</span>
    </span>
  </div>
  <ng-template scSelectPortal>
    <div scSelectList>
      @for (item of items; track item.value) {
      <div scSelectItem [value]="item.value" [label]="item.label">
        <svg scSelectIcon siTagIcon></svg>
        <span>{{ item.label }}</span>
      </div>
      }
    </div>
  </ng-template>
</div>
```

- **You own the structure** — the trigger layout, the item layout, the icons, the display value
- **You extend freely** — want a custom empty state in the list? A header above the items? Just add it
- **The library handles behavior** — keyboard navigation, selection state, ARIA attributes — you handle the markup

This also composes across components. A button can be a drawer trigger, a tooltip trigger, and an icon button all at once:

```html
<button scButton size="icon" scDrawerTrigger scTooltipTrigger="Open menu">
  <svg siMenuIcon></svg>
</button>
```

One element. Three responsibilities. No wrappers.

The tradeoff is verbosity. Because you own the structure, you write more template code than you would with a batteries-included component that hides everything behind inputs. That's a deliberate choice — explicit over implicit. You always know what's in the DOM because you put it there.

### Tailwind + CVA for Variants

The library follows the [shadcn/ui](https://ui.shadcn.com) design system — same CSS variables, same color tokens (`bg-primary`, `text-muted-foreground`, `border-input`…), same default styles. If you're already familiar with shadcn, the visual language is instantly recognizable. If you're starting fresh, you get a well-thought-out design system out of the box.

Styles are written in Tailwind CSS and managed with [class-variance-authority](https://cva.style). This means:

- Predictable, overridable class names
- Consistent variants (`default`, `outline`, `ghost`, `destructive`, `link`) across all components

```typescript
export const buttonVariants = cva('inline-flex items-center justify-center rounded-lg border ...', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground',
      outline: 'border-border bg-background hover:bg-muted',
      ghost: 'hover:bg-muted hover:text-foreground',
      destructive: 'bg-destructive/10 text-destructive',
      link: 'text-primary underline-offset-4 hover:underline',
    },
    size: {
      default: 'h-8 px-2.5',
      sm: 'h-7 px-2.5 text-[0.8rem]',
      lg: 'h-9 px-2.5',
      icon: 'size-8',
    },
  },
});
```

### Built on Solid Foundations

The rest of the library's design is guided by a few core principles:

**Attribute selectors over element selectors.** Instead of custom elements like `<sc-button>`, the library uses attribute selectors on native HTML. No extra wrapper elements, native accessibility roles preserved, and multiple components/directives can stack on the same element:

```html
<button scButton variant="outline" scDrawerTrigger>Open</button>
```

**Modern Angular, all the way down.** Signals (`input()`, `output()`, `computed()`), standalone components, native control flow (`@if`, `@for`), `inject()`, and OnPush everywhere. Overlays and positioning are built on `@angular/cdk`. Accessible patterns like focus trapping and live regions use `@angular/cdk/a11y` and `@angular/aria`. Forms are signal-based. The library is also zoneless-compatible — no `zone.js` required. No legacy APIs, no NgModules.

```typescript
@Directive({ selector: 'button[scButton]' })
export class ScButton {
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');
  readonly disabled = input<boolean, unknown>(false, { transform: booleanAttribute });
}
```

**Accessible by default.** Every component is built to pass WCAG AA minimums — proper ARIA attributes, full keyboard navigation, focus management on dialogs and drawers, and screen reader support. Where possible, this is powered by Angular CDK's accessibility primitives (`@angular/cdk/a11y`) and `@angular/aria` rather than hand-rolled solutions.

---

## Tradeoffs

This library makes deliberate choices that prioritize the future of Angular over backwards compatibility. That means it is **not for every project** — and that's intentional.

- **Zoneless only.** The library is built for zoneless Angular apps.
- **OnPush only.** All components use `ChangeDetectionStrategy.OnPush`.
- **Signal-based forms only.** Form integrations are designed around signals, not `NgModel` or reactive forms.
- **No NgModules.** Everything is standalone. There are no module exports, no `forRoot()`, no compatibility shims for module-based apps.

---

## What's in the Box

### `@semantic-components/ui` — Core Library

40+ components:

| Category   | Components                                                                        |
| ---------- | --------------------------------------------------------------------------------- |
| Actions    | Button, Button Group, Link, Toggle, Toggle Group                                  |
| Layout     | Card, Separator, Aspect Ratio, Toolbar                                            |
| Forms      | Input, Textarea, Checkbox, Radio Group, Switch, Select, Label, Field, Input Group |
| Overlays   | Dialog, Alert Dialog, Drawer, Sheet, Popover, Hover Card, Tooltip, Toast          |
| Navigation | Breadcrumb, Pagination, Tabs                                                      |
| Display    | Badge, Avatar, Skeleton, Spinner, Progress, Kbd, Empty                            |
| Data       | Table, Accordion, Collapsible                                                     |

---

## Icons: `@semantic-icons/lucide-icons`

Icons are distributed as Angular components from `@semantic-icons/lucide-icons`. Every icon is a standalone component you apply to an `<svg>` element:

```html
<svg siStarIcon></svg>
<svg siUserIcon></svg>
<svg siArrowRightIcon></svg>
```

This approach is fully tree-shakable — only the icons you import end up in your bundle. No icon fonts, no sprite sheets.

---

## Getting Started

```bash
npm install @semantic-components/ui
```

Then import what you need directly in your standalone component:

```typescript
import { ScButton, ScDialog, ScDialogContent, ScDialogTitle } from '@semantic-components/ui';

@Component({
  imports: [ScButton, ScDialog, ScDialogContent, ScDialogTitle],
  template: `
    <button scButton>Open Dialog</button>
  `,
})
export class MyComponent {}
```

No module registration. No `forRoot()`. Just import and use.

---

## Links

- **GitHub:** https://github.com/gridatek/semantic-components
- **npm:** https://www.npmjs.com/package/@semantic-components/ui
- **License:** MIT

Feedback, stars, and contributions are very welcome. If you're building Angular apps and tired of fighting your UI library, give Semantic Components a try.
