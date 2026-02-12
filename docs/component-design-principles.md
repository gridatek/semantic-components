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

### Prefix with `sc-`

All selectors should be prefixed with `sc-` to avoid naming conflicts.

```typescript
@Component({
  selector: 'nav[sc-pagination]',
  // ...
})
```

## Content Projection Pattern

Components should use `<ng-content />` to allow consumers to provide their own content instead of hardcoding UI elements.

### ❌ Don't: Hardcode Content

```typescript
@Component({
  selector: 'button[sc-pagination-previous]',
  template: `
    <svg><!-- icon --></svg>
    <span>Previous</span>
  `,
})
export class ScPaginationPrevious {}
```

### ✅ Do: Use Content Projection

```typescript
@Component({
  selector: 'a[sc-pagination-previous], button[sc-pagination-previous]',
  template: `
    <ng-content />
  `,
})
export class ScPaginationPrevious {}
```

**Usage:**

```html
<button sc-pagination-previous>
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
<button sc-pagination-previous class="pointer-events-none opacity-50"></button>
```

### ✅ Do: Provide Input-Driven Styling

```typescript
@Component({
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
<button sc-pagination-previous [disabled]="true">
  <!-- content -->
</button>
```

## Accessibility

### Always Include ARIA Attributes

Components must include appropriate ARIA attributes for accessibility.

```typescript
@Component({
  host: {
    role: 'navigation',
    '[attr.aria-label]': '"pagination"',
    '[attr.aria-current]': 'isActive() ? "page" : null',
    '[attr.aria-disabled]': 'disabled() || null',
    '[attr.aria-hidden]': 'true', // for decorative elements
  },
})
```

### Screen Reader Support

Include screen reader text where appropriate:

```html
<span sc-pagination-ellipsis>
  <svg><!-- ellipsis icon --></svg>
  <span class="sr-only">More pages</span>
</span>
```

## Component Structure Template

```typescript
import { booleanAttribute, computed, Component, input } from '@angular/core';
import { cn } from '../../utils';

@Component({
  selector: 'element[sc-component-name]',
  host: {
    'data-slot': 'component-name',
    '[class]': 'class()',
    // ARIA attributes
    '[attr.aria-label]': '"Label"',
    '[attr.aria-disabled]': 'disabled() || null',
  },
  template: `
    <ng-content />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScComponentName {
  // Class input for custom styling
  readonly classInput = input<string>('', { alias: 'class' });

  // Boolean inputs with transform
  readonly disabled = input<boolean, unknown>(false, {
    transform: booleanAttribute,
  });

  // State-based classes
  protected readonly class = computed(() => cn('base-styling-classes', 'hover:state-classes', 'aria-disabled:disabled-classes', this.classInput()));
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
<button sc-pagination-link class="custom-spacing custom-color">1</button>
```

## Multi-Element Selectors

Support both `<a>` and `<button>` elements where appropriate:

```typescript
@Directive({
  selector: 'a[sc-pagination-link], button[sc-pagination-link]',
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
- [ ] Library handles all state styling (no manual CSS needed by consumers)
- [ ] ARIA attributes are properly set
- [ ] Supports both `<a>` and `<button>` where appropriate
- [ ] Includes `class` input for customization
- [ ] Documentation is updated
- [ ] Demo files are updated with new patterns

## Examples from Codebase

### Pagination Components

See the pagination components for reference implementations:

- `sc-pagination` - Navigation container
- `sc-pagination-list` - List container (renamed from `pagination-content`)
- `sc-pagination-previous` - Previous button with content projection
- `sc-pagination-next` - Next button with content projection
- `sc-pagination-link` - Page link with states
- `sc-pagination-ellipsis` - Ellipsis indicator with content projection

All follow these principles and demonstrate:

- Content projection for customization
- Disabled state management
- ARIA attributes
- Flexible styling

## Future Considerations

This is a living document. Update it as patterns evolve and new best practices emerge.
