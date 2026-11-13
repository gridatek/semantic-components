# Meet Semantic Components — A Modern Angular UI Library

After waiting so long for an Angular UI library that actually met my needs, I decided to stop waiting and build my own. The result is **Semantic Components** — an open-source Angular UI library built on Tailwind CSS, Angular CDK, and Angular Aria, heavily inspired by [shadcn/ui](https://ui.shadcn.com).

**GitHub:** https://github.com/gridatek/semantic-components  
**Package:** `@semantic-components/ui`  
**Website:** `https://semantic-components.com`

---

## Why Semantic Components?

The Angular ecosystem has always had fewer off-the-shelf UI options compared to React. Libraries like shadcn/ui, Radix, and Headless UI have raised the bar for what a component library can be — and Angular deserves the same quality.

Semantic Components is my attempt to bring that standard to Angular, while leaning fully into what makes Angular great.

---

## Core Design Principles

### Semantic

Every directive or component is named to describe its **role** in the interface, not just the feature it belongs to. Take the tooltip as an example. Angular Material gives you a single `matTooltip` directive:

```html
<!-- Angular Material -->
<button matTooltip="Save changes">Save</button>
```

In Semantic Components, it's scTooltipTrigger:

```html
<!-- Semantic Components -->
<button scTooltipTrigger="Save changes">Save</button>
```

`scTooltipTrigger` — because `ScTooltip` is already the component that _renders_ the actual tooltip bubble. The directive on the button is not the tooltip — it's what triggers it. These are two different things, and the names reflect that. `ScDrawerTrigger`, `ScSelectTrigger`, `ScSidebarContent` — you know exactly what each piece does before reading a single line of docs.

This principle extends to the **HTML elements themselves**. When possible, components/directives are applied to the right native element rather than a generic `<div>`.

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
        <button scDialogClose variant="outline" size="default">Cancel</button>
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

The same goes for every component that holds state: a pagination's page is `[(currentPage)]` and its size `[(pageSize)]`. The pages it shows, the one before and after, the items on the page are signals you read in the template (`pagination.pages()`, `pagination.range()`). Its links are your `<a>`s, with your `href` or `routerLink`.

The naming reinforces this. `ScDialog` is not a service — it's the `<div role="dialog">` element itself. In Angular Material, `MatDialog` is a service you inject and call `.open()` on. Here, `scDialog` is the thing rendered in the DOM. Same naming principle: the name describes exactly what the piece _is_, not what it _does behind the scenes_.

There is a tradeoff: `scDialog` requires an extra wrapper element in the DOM `scDialogProvider`. It acts as the coordination point between the trigger, the portal, and the close button — sharing state through Angular's DI tree. It's a conscious choice in favor of keeping everything in the template, at the cost of one extra `<div>` that you may need to style or account for in your layout.

### Composable

Each component is a set of small, focused pieces that you assemble yourself. There are no magic `[content]` inputs or hidden `<ng-content>` slots — you write the structure, and the pieces plug into it.

The Select is a good example of how far this goes:

```html
<div scSelect [formField]="form.label" [items]="items">
  <div scSelectLabel>Label</div>
  <div scSelectTrigger>
    <span scSelectValue placeholder="Select a label"></span>
    <svg scSelectIcon siChevronDownIcon></svg>
  </div>
  <ng-template scSelectPortal>
    <div scSelectPopup>
      <div scSelectList>
        <div scSelectGroup>
          @for (item of items; track item.value) {
          <div scSelectItem [value]="item.value">
            <span scSelectItemText><svg siTagIcon></svg> {{ item.label }}</span>
            <span scSelectItemIndicator><svg siCheckIcon></svg></span>
          </div>
          }
        </div>
      </div>
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

The library follows the [shadcn/ui](https://ui.shadcn.com) design system — same CSS variables, same color tokens (`bg-primary`, `text-muted-foreground`, `border-input`…), same default styles. If you're already familiar with shadcn, the visual language is instantly recognizable.

Styles are written in Tailwind CSS and managed with [class-variance-authority](https://cva.style). This means:

- Predictable, overridable class names
- Consistent variants (`default`, `outline`, `ghost`, `destructive`, `link`) across all components

And shadcn's eight styles are presets — nova, vega, maia, lyra, mira, luma, sera, rhea — chosen once, when the app starts. A preset holds the classes of the components whose look changes from style to style: the alert, the alert dialog, the avatar group's count, the backdrop behind every overlay, the breadcrumb, the badge (the tags input's tags too), the button (every part that looks like one, a link included), the card and the frame it shares with any framed box, the code block, the control group (shadcn's Button Group), with its text, the input (every part that looks like one: password, date, number, phone), the input group with its addon, button and text, the menu — and the same parts in a menubar or a context menu, in their own looks —, the select (its trigger, popup and items), the pagination (its list, ellipsis and the padding by its arrows), the table (its text size, cells and caption) and the tabs, so far.

```typescript
import { nova } from '@semantic-components/presets/nova';

provideSemanticComponents({ preset: nova });
```

What an entry needs set up comes with it, as a feature of the same call — the Angular way, as `provideRouter(routes, withComponentInputBinding())`: one place to set the library up, and an app that doesn't use an entry doesn't load it.

```typescript
import { withCodeHighlighter } from '@semantic-components/ui/code-block';
import { withI18n } from '@semantic-components/ui/i18n';

provideSemanticComponents({ preset: nova }, withCodeHighlighter(), withI18n(I18N));
```

```typescript
// libs/presets/nova/src/button.ts — shadcn's nova, as a cva
export const button = cva('group/button inline-flex shrink-0 items-center justify-center rounded-lg border ...', {
  variants: {
    variant: {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      outline: 'border-border bg-background hover:bg-muted ...',
      // secondary, ghost, destructive, link
    },
    size: {
      default: 'h-8 gap-1.5 px-2.5 ...',
      // xs, sm, lg, icon, icon-xs, icon-sm, icon-lg
    },
  },
});
```

A part reads its preset's classes (`injectPreset().button({ variant, size })`, `injectPreset().controlGroup({ orientation })`); your `class` is merged over them.

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

**Accessible by default.** Every component is built to pass WCAG AA minimums — proper ARIA attributes, full keyboard navigation, focus management on dialogs and drawers, and screen reader support. Where possible, this is powered by Angular CDK's accessibility primitives (`@angular/cdk/a11y`) and `@angular/aria`.

---

## Tradeoffs

This library makes deliberate choices that prioritize the future of Angular over backwards compatibility. That means it is **not for every project** — and that's intentional.

- **Zoneless only.** The library is built for zoneless Angular apps.
- **OnPush only.** All components use OnPush change detection, the Angular v22+ default.
- **Signal-based forms only.** Form integrations are designed around signals, not `NgModel` or reactive forms.
- **No NgModules.** Everything is standalone. There are no module exports, no `forRoot()`, no compatibility shims for module-based apps.
- **Input names that aren't HTML attributes.** A part is a directive on your own element, so a static input stays in the DOM as an attribute. Where shadcn and Base UI say `align`, ours is `alignment` (Menu, Tooltip, Popover, Preview Card, Navigation Menu, Bubble, Message, Timeline): `align` is an old HTML attribute that browsers read as text alignment on a `div`. Its values are logical only (`start`, `center`, `end`): `start` is the reading start, flipped right to left — no `left` / `right`. Positioning pairs it with `side` (which edge): `inline-start` / `inline-end` (logical, the words never shared with `alignment`), `top`, `bottom`, and `left` / `right` for who wants a fixed side; the offsets are `sideOffset` and `alignmentOffset`. The Input Group addon takes a `side` too (shadcn's `align`): `inline-start`, `inline-end`, `top`, `bottom`. Names say where a part is: a section between a header and a footer is a Body (`scCardBody`, shadcn's CardContent), and `…Content` is a component's whole content. A popup's `data-side` is the side it landed on, physical; the Sidebar's is the word given, so its CSS is right in both directions before any script.

---

## What's in the Box

### `@semantic-components/ui` — Core Library

50+ components:

| Category   | Components                                                                                                             |
| ---------- | ---------------------------------------------------------------------------------------------------------------------- |
| Actions    | Button, Control Group, Link, Toggle, Toggle Group                                                                      |
| Layout     | Card, Separator, Aspect Ratio, Toolbar, Scroll Area, Typography                                                        |
| Forms      | Input, Textarea, Checkbox, Radio Group, Switch, Select, Native Select, Label, Field, Input Group, Slider, Range Slider |
| Overlays   | Dialog, Alert Dialog, Drawer, Sheet, Popover, Preview Card, Tooltip, Toast, Backdrop                                   |
| Navigation | Breadcrumb, Pagination, Tabs, Menu, Menubar, Navigation Menu                                                           |
| Display    | Alert, Badge, Avatar, Skeleton, Spinner, Progress, Kbd, Empty, Item                                                    |
| Data       | Table, Accordion, Collapsible, Calendar, Date Picker, Time Picker                                                      |
| File       | File Upload                                                                                                            |

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

Add the styles to your global stylesheet:

```css
@import '@semantic-components/ui/styles';
@source '../node_modules/@semantic-components/ui';
```

The `@import` brings in the CDK overlay styles and the shadcn-compatible CSS variables (colors, radius, spacing tokens). The `@source` tells Tailwind v4 to scan the library's files so its utility classes are included in your build.

Then import what you need directly in your standalone component:

```typescript
import { ScButton, ScDialog, ScDialogHeader, ScDialogTitle } from '@semantic-components/ui';

@Component({
  imports: [ScButton, ScDialog, ScDialogHeader, ScDialogTitle],
  template: ` <button scButton>Open Dialog</button> `,
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
