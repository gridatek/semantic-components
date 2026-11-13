# Component Design Principles

This document outlines the design principles and patterns for building components in the semantic-components library. These guidelines ensure components are customizable, accessible, and follow consistent patterns.

## Core Philosophy

Components should be **verbose but easy to customize**. The library provides:

- Robust styling and behavior through CSS classes
- Accessibility features and ARIA attributes
- Content projection for maximum flexibility

Consumers provide:

- The actual content (icons, text, etc.)
- Context-specific behavior and data

## Naming Conventions

### Use Semantic Names

Component names should describe **what they are**, not just what they contain.

**Good:**

```typescript
// Describes a list of pagination items
ScPaginationList;
```

**Bad:**

```typescript
// Too generic, could be any content
ScPaginationContent;
```

### `Content`: only for content rendered later

`…Content` names a part on an `ng-template` whose content is rendered later — once its menu has opened, its panel expanded:

```html
<div scMenu>
  <ng-template scMenuContent>…the items…</ng-template>
</div>
```

It doesn't name one part among others, as the part between a header and a footer: that is one section of the component, and needs a name saying which. (`ScCardContent`, shadcn's name, doesn't follow this yet: its name, with the parts named `…Body`, is still to be found.)

### Attribute selectors, prefixed `sc`

A part is an attribute on the consumer's element, in camelCase with the `sc` prefix — never a custom element (`<sc-…>`), not even for an internal part. The element is named in the selector when the part needs it (`nav`, `button`, `a`).

```typescript
@Directive({
  selector: 'nav[scPagination], div[scPagination]',
  // ...
})
```

A part on a native `input` sets the input's `type` itself, as a host attribute — the selector names the element only, and the markup needs no `type` (the user, 2026-11-10). Fewer attributes to write, and the part works as a host directive on any input (the audio player's seek bar is a slider).

```typescript
@Directive({
  selector: 'input[scSlider]',
  host: { type: 'range' /* … */ },
})
// <input scSlider [(value)]="volume" aria-label="Volume" />
```

Checkbox, Switch, Radio and Slider do (2026-11-10). Parts that only add behaviour to someone else's input still name its type (`input[type="checkbox"][scDataTableSelectRow]`). One limit, Angular's: Signal Forms types a plain native radio's `[formField]` by the template's `type`, so a radio bound to a union value (`'off' | 'all' | 'one'`) without `type="radio"` doesn't compile — so the Radio Group is the control (its `[formField]`, typed by the group); a `[formField]` on each radio, the Angular way, still works with `type="radio"` written (radio-group README).

## The Consumer Writes the Content

A part is a directive on the consumer's element, so what is inside is the consumer's already: icons, text, labels. A part never hard-codes them — no template with an icon, no default text, not even an `aria-label` (translation is the consumer's).

### ❌ Don't: Hardcode Content

```typescript
@Component({
  selector: 'button[scPaginationPrevious]',
  template: `
    <svg><!-- icon --></svg>
    <span>Previous</span>
  `,
})
export class ScPaginationPrevious {}
```

### ✅ Do: A Directive on the Consumer's Element

```typescript
@Directive({
  selector: 'a[scPaginationPrevious], button[scPaginationPrevious]',
  host: { '[class]': 'class()' },
})
export class ScPaginationPrevious {}
```

**Usage:**

```html
<button scPaginationPrevious>
  <svg><!-- custom icon --></svg>
  <span>Previous</span>
</button>
```

This allows consumers to:

- Use different icons
- Change text/labels
- Add additional content
- Completely customize the UI while maintaining consistent behavior and styling

## Boolean Inputs

Use the `input<boolean, unknown>` signature with `booleanAttribute` transform for all boolean inputs.

### ❌ Don't: Simple Boolean Input

```typescript
readonly disabled = input<boolean>(false);
```

### ✅ Do: Use Transform

```typescript
import { booleanAttribute } from '@angular/core';

readonly disabled = input<boolean, unknown>(false, {
  transform: booleanAttribute,
});
```

**Benefits:**

- Works with `[disabled]="true"` (property binding)
- Works with `disabled` (attribute without value)
- Works with `disabled="false"` (string attribute)

## State Management

### Library Provides Styling

The library should handle all styling for different states through CSS classes and host bindings.

### ❌ Don't: Require Manual CSS

```html
<!-- User has to add classes manually -->
<button scPaginationPrevious class="pointer-events-none opacity-50"></button>
```

### ✅ Do: Provide Input-Driven Styling

```typescript
@Directive({
  host: {
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class ScPaginationPrevious {
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  protected readonly class = computed(() => cn('base-classes', 'aria-disabled:pointer-events-none aria-disabled:opacity-50', this.classInput()));
}
```

**Usage:**

```html
<!-- Simple and semantic -->
<button scPaginationPrevious [disabled]="true">
  <!-- content -->
</button>
```

## Accessibility

### Always Include ARIA Attributes

Parts set the roles and states (ARIA attributes that follow their state); the names are the consumer's.

```typescript
@Directive({
  host: {
    role: 'navigation',
    '[attr.aria-current]': 'isActive() ? "page" : null',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
```

```html
<!-- The name: the consumer's, in their language. -->
<nav scPagination aria-label="Results">…</nav>
```

### Screen Reader Support

An icon-only button is named by an `sr-only` span inside it (not `aria-label`); a decorative part is hidden from screen readers, with nothing to read inside:

```html
<button scPaginationNext size="icon">
  <svg siChevronRightIcon></svg>
  <span class="sr-only">Next</span>
</button>

<!-- aria-hidden on the part: the pages left out are not read. -->
<span scPaginationEllipsis><svg siEllipsisIcon></svg></span>
```

## Modern Angular

No lifecycle hooks (`ngOnInit`, `ngOnChanges`, `ngAfterViewInit`, `ngAfterContentInit`, `ngOnDestroy`, and their `implements`):

| Instead of           | Use                                                                                       |
| -------------------- | ----------------------------------------------------------------------------------------- |
| `ngOnInit`           | the constructor: `inject()` and `input()` fields are ready, the host element exists       |
| `ngOnChanges`        | `computed()`, `linkedSignal()`, `effect()` on the inputs                                  |
| `ngAfterViewInit`    | `afterNextRender()` (once), `afterRenderEffect()` (each render)                           |
| `ngAfterContentInit` | signal queries (`contentChild()`, `contentChildren()`) read in `computed()` or `effect()` |
| `ngOnDestroy`        | `inject(DestroyRef).onDestroy()`                                                          |

An input's value isn't read in the constructor (it isn't bound yet): read it in a `computed()` or `effect()`. The avatar's image is a model: it checks in its constructor whether the picture already loaded (the element and its `src` exist then).

## Sides and Directions: Logical Outside, Physical Inside

A rule (the user, 2026-11-13). The consumer speaks logical first — `side="inline-start"`, `alignment="end"`, which flip right to left — and may say physical (`left`, `right`) for a side that stays put. Inside, the library works only in physical sides:

- **Convert as soon as possible**, in one place: `physicalSide(side, direction)` (`utils/overlay-positions`), in the first `computed()` that needs the side. Positions, flips, fallbacks, fits and `data-side` all use the physical result; no code past that point checks for `inline-start`.
- **The direction is a signal**: CDK's `Directionality.valueSignal()`, injected as is — the document's, or the nearest CDK `Dir` directive's. A part provides no `Directionality` of its own and never reads `direction` from the DOM (2026-11-13). An app in one direction sets `dir` on `<html>` and needs nothing else; a box in another direction is the consumer's to mark with `Dir` (`@angular/cdk/bidi`), as our RTL examples do (the Right to left docs page). Never a plain `.value` inside a `computed()`; an event handler reading the current `.value` is fine.
- **`data-side` is physical** — the side the box landed on, after a flip (`top`, `right`, `bottom`, `left`). The presets carry rules for those four only: no `data-[side=inline-…]` and no logical slide utilities (tw-animate's `start` / `end` slides build invalid CSS anyway).
- **The one exception: a part placed by CSS** — the Sidebar. Nothing to convert in script: its `data-side` is the word given, and its CSS uses logical utilities (`start-0`, `border-e`), right in both directions before any script runs, server-rendered pages included. Converting it would need the direction in the browser, and the page would jump on first paint.

Names: `side` is the edge (`top`, `bottom`, `inline-start`, `inline-end`, `left`, `right`); `alignment` is the place along it (`start`, `center`, `end`); their offsets `sideOffset` and `alignmentOffset`. `start` / `end` never name a side.

## Component Structure Template

A part is a `@Directive` on the consumer's element — a `@Component` only when it needs a template of its own, encapsulation or a CDK base class. It sets no text (no default label: the consumer writes it), and a `data-slot` only when another component styles by it ([data-slot-pattern.md](data-slot-pattern.md)).

```typescript
import { Directive, booleanAttribute, computed, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';

@Directive({
  selector: 'button[scComponentName]',
  host: {
    '[class]': 'class()',
    '[attr.aria-disabled]': 'disabled() || null',
  },
})
export class ScComponentName {
  // What changes from style to style: the preset's (libs/presets/<style>/src).
  private readonly styles = injectPreset().componentName;

  // Class input for custom styling, merged last.
  readonly classInput = input<string>('', { alias: 'class' });

  // Boolean inputs with transform
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  // The preset's classes, then what is the same in every style, then yours.
  protected readonly class = computed(() => cn(this.styles.root, 'aria-disabled:opacity-50', this.classInput()));
}
```

## Styling Guidelines

### Provide Comprehensive Base Styles

Include all necessary base styles in the component:

- Layout (flex, grid, spacing)
- Typography
- Interactive states (hover, focus, disabled)
- Transitions

### Support Custom Classes

Always accept a `class` input for consumer customization:

```typescript
readonly classInput = input<string>('', { alias: 'class' });
```

This allows consumers to override or extend styles:

```html
<button scPaginationLink class="custom-spacing custom-color">1</button>
```

## Multi-Element Selectors

Support both `<a>` and `<button>` elements where appropriate:

```typescript
@Directive({
  selector: 'a[scPaginationLink], button[scPaginationLink]',
})
```

This provides flexibility for different use cases:

- Links for server-side navigation
- Buttons for client-side interactions

## Documentation Requirements

Each component should include:

1. **README.md** with:
   - Component description
   - All sub-components
   - Usage examples
   - Input/output tables
   - Accessibility notes

2. **Input tables** documenting:
   - Input name
   - Type
   - Default value
   - Description

3. **Examples** showing:
   - Basic usage
   - All variants
   - State variations (disabled, active, etc.)

## Refactoring Checklist

When refactoring components, ensure:

- [ ] Names are semantic and descriptive
- [ ] Uses `<ng-content />` for customizable content
- [ ] Boolean inputs use `input<boolean, unknown>` with `booleanAttribute`
- [ ] No lifecycle hooks: the constructor, signals, `afterNextRender()`, `DestroyRef` (see Modern Angular)
- [ ] Library handles all state styling (no manual CSS needed by consumers)
- [ ] ARIA attributes are properly set
- [ ] Supports both `<a>` and `<button>` where appropriate
- [ ] Includes `class` input for customization
- [ ] Documentation is updated
- [ ] Demo files are updated with new patterns

## Examples from Codebase

### Pagination Components

See the pagination components for reference implementations:

- `ScPagination` (`nav[scPagination]`) - the navigation, its state
- `ScPaginationList` (`ul[scPaginationList]`) - the list of buttons
- `ScPaginationPrevious`, `ScPaginationNext` - Previous and Next, their content the consumer's
- `ScPaginationLink` - a page, with its states (`aria-current`)
- `ScPaginationEllipsis` - pages left out, hidden from screen readers

All follow these principles and demonstrate:

- The consumer's content, inside directives on the consumer's elements
- Disabled state management
- ARIA attributes
- Flexible styling

## Future Considerations

This is a living document. Update it as patterns evolve and new best practices emerge.
