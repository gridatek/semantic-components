# I Built a Modern Angular UI Library — Here's Why and How

After waiting so long for an Angular UI library that actually met my needs, I decided to stop waiting and build my own. The result is **Semantic Components** — an open-source Angular UI library built on Tailwind CSS, Angular CDK, and Angular Aria, heavily inspired by [shadcn/ui](https://ui.shadcn.com).

**GitHub:** https://github.com/gridatek/semantic-components
**Package:** `@semantic-components/ui`

---

## Core Design Principles

### Semantic by Name

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

This principle extends to the **HTML elements themselves**. When possible, directives are applied to the right native element rather than a generic `<div>`. The sidebar menu is a real `<ul>` with real `<li>` items. A menu button is a real `<button>` or `<a>`. This is not just stylistic — it means screen readers, keyboard users, and search engines see meaningful structure.

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

### Declarative Templates

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

### Attribute Selectors Over Element Selectors

Instead of custom elements like `<sc-button>`, the library uses attribute selectors applied to native HTML elements. This means:

- No extra wrapper elements in the DOM
- Native elements keep their accessibility roles
- Multiple attributes can be stacked on the same element

```html
<!-- Native button, two attribute selectors -->
<button scButton variant="outline" scDrawerTrigger>Open</button>
```

### Fully Composable

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

### Modern Angular — All the Way Down

The library is built exclusively with modern Angular APIs:

- **Signals** for reactive state (`input()`, `output()`, `computed()`, `signal()`)
- **Standalone components** — no NgModules anywhere
- **Native control flow** — `@if`, `@for`, `@switch` instead of structural directives
- **`inject()`** instead of constructor injection
- **OnPush** change detection everywhere

```typescript
@Directive({
  selector: 'button[scButton]',
  host: {
    'data-slot': 'button',
    '[attr.type]': 'type()',
    '[disabled]': 'disabled()',
    '[class]': 'class()',
  },
})
export class ScButton {
  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });
}
```

### Tailwind + CVA for Variants

Styles are written in Tailwind CSS and managed with [class-variance-authority](https://cva.style). This means:

- Zero runtime CSS-in-JS overhead
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

### Accessible by Default

Every component is built to pass WCAG AA minimums:

- Proper ARIA attributes on all interactive elements
- Full keyboard navigation
- Focus management on dialogs, drawers, and sheets
- Screen reader support

---

## What's in the Box

### `@semantic-components/ui` — Core Library

40+ production-ready components:

| Category   | Components                                                                        |
| ---------- | --------------------------------------------------------------------------------- |
| Actions    | Button, Button Group, Link, Toggle, Toggle Group                                  |
| Layout     | Card, Separator, Aspect Ratio, Toolbar                                            |
| Forms      | Input, Textarea, Checkbox, Radio Group, Switch, Select, Label, Field, Input Group |
| Overlays   | Dialog, Alert Dialog, Drawer, Sheet, Popover, Hover Card, Tooltip, Toast          |
| Navigation | Breadcrumb, Pagination, Tabs                                                      |
| Display    | Badge, Avatar, Skeleton, Spinner, Progress, Kbd, Empty                            |
| Data       | Table, Accordion, Collapsible                                                     |

### `@semantic-components/ui-lab` — Extended Library

Experimental and more complex components, including a full **Sidebar** system:

```html
<div scSidebarProvider>
  <div scSidebar collapsible="icon">
    <div scSidebarHeader>...</div>

    <div scSidebarBody>
      <div scSidebarGroup>
        <div scSidebarGroupLabel>Navigation</div>
        <div scSidebarGroupContent>
          <ul scSidebarMenu>
            <li scSidebarMenuItem>
              <a scSidebarMenuButton routerLink="/dashboard">Dashboard</a>
            </li>
          </ul>
        </div>
      </div>
    </div>

    <div scSidebarFooter>...</div>
    <button scSidebarRail></button>
  </div>

  <main scSidebarInset>
    <router-outlet />
  </main>
</div>
```

Features out of the box: icon-only collapse mode, keyboard shortcut (`Ctrl/Cmd + B`), localStorage state persistence, and mobile sheet drawer.

### `@semantic-components/carousel` — Embla-Powered

A carousel built on top of [Embla Carousel](https://www.embla-carousel.com), with Angular signals driving all reactive state.

---

## Icons: `@semantic-icons/lucide-icons`

Icons are distributed as Angular directives from `@semantic-icons/lucide-icons`. Every icon is a standalone directive you apply to an `<svg>` element:

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

## Why Angular?

The Angular ecosystem has always had fewer off-the-shelf UI options compared to React. Libraries like shadcn/ui, Radix, and Headless UI have raised the bar for what a component library can be — and Angular deserves the same quality.

Semantic Components is my attempt to bring that standard to Angular, while leaning fully into what makes Angular great: strong typing, a compiler that catches errors early, a predictable change detection model, and signals.

---

## Status and Roadmap

The library is at **v0.65** and actively developed. It's already being used in production in real projects.

What's coming:

- More `ui-lab` components graduating to stable
- More showcase demos and documentation
- More icon sets under `@semantic-icons/*`

---

## Links

- **GitHub:** https://github.com/gridatek/semantic-components
- **npm:** https://www.npmjs.com/package/@semantic-components/ui
- **License:** MIT

Feedback, stars, and contributions are very welcome. If you're building Angular apps and tired of fighting your UI library, give Semantic Components a try.

---

_Built with Angular v20+, Tailwind CSS v4, and a lot of respect for the people using it._
