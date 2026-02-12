# Data Slot Pattern

This document explains how `data-slot` attributes are used in Semantic Components for layout and spacing, and how consumers can leverage them for style overrides.

## Overview

Every sub-component in the library sets a `data-slot` attribute on its host element. Parent containers use these attributes to position children in a CSS Grid layout.

```html
<div sc-checkbox-field>
  <!-- grid container -->
  <input sc-checkbox data-slot="checkbox" />
  <!-- col-1, row-1 -->
  <label sc-label data-slot="label">...</label>
  <!-- col-2, row-1 -->
  <p sc-field-description data-slot="field-description">...</p>
  <!-- col-2, row-2 -->
</div>
```

The `data-slot` values are set automatically by each directive — consumers never write them by hand.

## The Rule: Layout, Not Styling

`data-slot` is used by parent containers **only for layout and spacing** — grid placement, gaps, and alignment. Each component is responsible for its own visual styles (colors, borders, typography, focus rings, etc.).

### Parent Responsibility: Layout

The parent container uses `*:data-[slot=...]` selectors to control **where** children go:

```typescript
// ScCheckboxField — positions children in a 2-column grid
cn(
  'grid grid-cols-[1rem_1fr] items-start gap-x-2 gap-y-1',

  // Layout: grid placement
  '*:data-[slot=checkbox]:col-start-1 *:data-[slot=checkbox]:row-start-1',
  '*:data-[slot=visual-checkbox]:col-start-1 *:data-[slot=visual-checkbox]:row-start-1',
  '*:data-[slot=label]:col-start-2 *:data-[slot=label]:row-start-1',
  '*:data-[slot=field-description]:col-start-2 *:data-[slot=field-description]:row-start-2',

  // Conditional layout: bold label when description is present
  'has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium',
);
```

### Child Responsibility: Styling

Each component owns its own appearance. The parent never reaches into a child's visual styles through `data-slot`:

```typescript
// ScCheckboxIndicator — owns its own visual styles
cn('pointer-events-none inline-flex size-4 shrink-0 items-center justify-center', 'rounded-sm border border-primary transition-colors', 'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground', 'data-[state=indeterminate]:bg-primary data-[state=indeterminate]:text-primary-foreground');

// ScVisualCheckbox — owns its own focus/disabled styles
cn('pointer-events-none inline-flex size-4 shrink-0 items-center justify-center', 'ring-offset-background', 'peer-focus-visible:outline-none peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2', 'peer-disabled:cursor-not-allowed peer-disabled:opacity-50');
```

### What Belongs Where

| Concern                                                     | Who Handles It   | Via                                        |
| ----------------------------------------------------------- | ---------------- | ------------------------------------------ |
| Grid placement (`col-start`, `row-start`)                   | Parent container | `*:data-[slot=...]`                        |
| Gaps (`gap-x`, `gap-y`)                                     | Parent container | Grid classes                               |
| Alignment (`items-start`, `self-center`)                    | Parent container | Grid classes                               |
| Conditional layout (`font-medium` when description present) | Parent container | `has-[>[data-slot=...]]:*:data-[slot=...]` |
| Colors, borders, backgrounds                                | Each component   | Own `class` computed                       |
| Focus rings, hover states                                   | Each component   | Own `class` computed                       |
| Typography (size, weight, color)                            | Each component   | Own `class` computed                       |
| Transitions, animations                                     | Each component   | Own `class` computed                       |

## Consumer Overrides via Data Slot

While the library follows the "layout only" rule internally, consumers are free to use `data-slot` selectors to override styles from the outside. This is a deliberate escape hatch.

### Overriding a Specific Slot

```html
<div sc-checkbox-field class="*:data-[slot=label]:text-blue-600 *:data-[slot=label]:uppercase">
  <input type="checkbox" sc-checkbox id="custom" />
  <label sc-label for="custom">Custom styled label</label>
</div>
```

The `*:data-[slot=label]:text-blue-600` selector targets the label by its slot and overrides the text color. This works because the consumer's classes are merged after the component's base classes via `cn()`.

### Overriding the Visual Checkbox

```html
<div sc-checkbox-field class="*:data-[slot=visual-checkbox]:rounded-full *:data-[slot=visual-checkbox]:ring-offset-4">
  <input type="checkbox" sc-checkbox id="round" />
  <label sc-label for="round">Round checkbox</label>
</div>
```

### Conditional Overrides

Consumers can combine `:has()` with `data-slot` for conditional styling:

```html
<!-- Make description red when checkbox is unchecked -->
<div sc-checkbox-field class="has-[[data-state=unchecked]]:*:data-[slot=field-description]:text-destructive">
  <input type="checkbox" sc-checkbox id="required" />
  <label sc-label for="required">Required field</label>
  <p sc-field-description>You must accept to continue.</p>
</div>
```

### Overriding in a Wrapper

For repeated overrides, wrap multiple fields:

```html
<div class="*:*:data-[slot=label]:text-sm *:*:data-[slot=label]:text-muted-foreground space-y-4">
  <div sc-checkbox-field>
    <input type="checkbox" sc-checkbox id="a" />
    <label sc-label for="a">Option A</label>
  </div>
  <div sc-checkbox-field>
    <input type="checkbox" sc-checkbox id="b" />
    <label sc-label for="b">Option B</label>
  </div>
</div>
```

## Why This Separation Matters

### Components Stay Predictable

When each component owns its styles, changing one component's appearance doesn't accidentally affect siblings. A parent only decides _where_ things go, never _how_ they look.

### Overrides Are Explicit

Consumer overrides through `data-slot` are always visible in the template. There is no hidden CSS specificity battle — the consumer intentionally reaches in from the parent level.

### Components Are Portable

Because a component's visual styles don't depend on a specific parent, the same `ScLabel` or `ScFieldDescription` directive works inside `sc-checkbox-field`, `sc-radio-field`, `sc-switch-field`, or any other container. The parent only needs to position it.

## Available Data Slots

Each component declares its `data-slot` in its `host` metadata:

```typescript
@Directive({
  host: {
    'data-slot': 'label',      // ScLabel
  },
})

@Directive({
  host: {
    'data-slot': 'field-description',  // ScFieldDescription
  },
})

@Directive({
  host: {
    'data-slot': 'checkbox',   // ScCheckbox
  },
})
```

Consumers can discover available slots by inspecting the DOM or reading the component's README.

## Tailwind CSS v4 Syntax Reference

The `*:data-[slot=...]` syntax is a Tailwind CSS v4 feature combining two variants:

- `*:` — targets direct children (`& > *`)
- `data-[slot=value]:` — matches elements with `data-slot="value"`

Combined: `*:data-[slot=label]:col-start-2` generates:

```css
& > *[data-slot='label'] {
  grid-column-start: 2;
}
```

For conditional styles based on a child's presence:

```
has-[>[data-slot=field-description]]:*:data-[slot=label]:font-medium
```

Generates:

```css
&:has(> [data-slot='field-description']) > *[data-slot='label'] {
  font-weight: 500;
}
```
