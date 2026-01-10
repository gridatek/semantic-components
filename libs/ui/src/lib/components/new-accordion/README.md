# New Accordion

A set of wrapper directives for Angular ARIA's accordion components that include built-in styling and animations, following shadcn/ui design patterns.

## Overview

These wrapper directives provide a cleaner, more opinionated implementation of Angular ARIA accordions with pre-configured styles and smooth animations. They eliminate the need to repeat CSS classes and animation setup across your application.

## Components

### ScNewAccordionGroup

Wraps `@angular/aria/accordion`'s `AccordionGroup` directive with built-in container styling.

**Features:**

- Border and rounded corners (`rounded-md border`)
- Divider lines between items (`divide-y divide-border`)
- Full width layout (`w-full`)
- Forwards `multiExpandable` input to control expansion behavior

**Usage:**

```html
<div scNewAccordionGroup [multiExpandable]="false">
  <!-- Accordion items -->
</div>
```

### ScNewAccordionTrigger

Wraps `@angular/aria/accordion`'s `AccordionTrigger` directive with button styling.

**Features:**

- Flexbox layout with space-between alignment
- Padding and typography styling (`py-4 px-4 text-sm font-medium`)
- Smooth transitions on all properties
- Hover underline effect
- Automatic chevron rotation when expanded (`[&[aria-expanded=true]>svg]:rotate-180`)
- Forwards all Angular ARIA inputs: `panelId`, `expanded`, `disabled`, `softDisabled`

**Usage:**

```html
<button scNewAccordionTrigger panelId="item1" [expanded]="true">
  Question text
  <svg si-chevron-down-icon></svg>
</button>
```

### ScNewAccordionPanel

Wraps `@angular/aria/accordion`'s `AccordionPanel` directive with layout constraints.

**Features:**

- Overflow hidden for smooth animations
- Small text sizing (`text-sm`)
- Forwards `panelId` input

**Usage:**

```html
<div scNewAccordionPanel panelId="item1">
  <ng-template scNewAccordionContent>Content here</ng-template>
</div>
```

### ScNewAccordionContent

Wraps `@angular/aria/accordion`'s `AccordionContent` directive with padding and animations.

**Features:**

- Content padding (`pb-4 pt-0 px-4`)
- Enter animation: `animate-accordion-down` (slides down and fades in)
- Leave animation: `animate-accordion-up` (slides up and fades out)
- Uses Angular's `animate.enter` and `animate.leave` compiler features

**Usage:**

```html
<ng-template scNewAccordionContent>Answer content here</ng-template>
```

## Complete Example

```typescript
import {
  ScNewAccordionContent,
  ScNewAccordionGroup,
  ScNewAccordionPanel,
  ScNewAccordionTrigger,
} from '@semantic-components/ui';
import { SiChevronDownIcon } from '@semantic-icons/lucide-icons';

@Component({
  selector: 'app-faq',
  imports: [
    ScNewAccordionGroup,
    ScNewAccordionTrigger,
    ScNewAccordionPanel,
    ScNewAccordionContent,
    SiChevronDownIcon,
  ],
  template: `
    <div [multiExpandable]="false" scNewAccordionGroup>
      <!-- FAQ Item 1 -->
      <div>
        <h3 class="flex">
          <button [expanded]="true" scNewAccordionTrigger panelId="faq1">
            Is it accessible?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="faq1">
          <ng-template scNewAccordionContent>
            Yes. It adheres to the WAI-ARIA design pattern.
          </ng-template>
        </div>
      </div>

      <!-- FAQ Item 2 -->
      <div>
        <h3 class="flex">
          <button scNewAccordionTrigger panelId="faq2">
            Does it support keyboard navigation?
            <svg
              class="h-4 w-4 shrink-0 text-muted-foreground transition-transform duration-200"
              si-chevron-down-icon
            ></svg>
          </button>
        </h3>
        <div scNewAccordionPanel panelId="faq2">
          <ng-template scNewAccordionContent>
            Yes. It supports arrow keys, Home, and End for navigation.
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export class FaqComponent {}
```

## Expansion Modes

### Single Expansion

Only one panel can be open at a time. When you open a panel, others close automatically.

```html
<div scNewAccordionGroup [multiExpandable]="false">
  <!-- Items -->
</div>
```

### Multiple Expansion

Multiple panels can be open simultaneously.

```html
<div scNewAccordionGroup [multiExpandable]="true">
  <!-- Items -->
</div>
```

## Accessibility Features

All Angular ARIA accessibility features are preserved:

- **ARIA Attributes**: Automatically manages `aria-expanded`, `aria-controls`, and `aria-labelledby`
- **Keyboard Navigation**:
  - Arrow keys to move between triggers
  - Home/End to jump to first/last trigger
  - Space/Enter to toggle panels
- **Focus Management**: Proper focus handling and visual indicators
- **Screen Reader Support**: Semantic HTML with proper heading hierarchy

## Animations

The accordion uses Tailwind CSS animations (from `tw-animate-css`):

- **Opening**: Content slides down and fades in (`animate-accordion-down`)
- **Closing**: Content slides up and fades out (`animate-accordion-up`)
- **Chevron**: Rotates 180° when panel expands

Animations are handled by Angular's `animate.enter` and `animate.leave` compiler features, ensuring smooth transitions and proper DOM cleanup.

## Styling Customization

While these wrappers provide opinionated defaults, you can still add additional classes:

```html
<!-- Add custom classes alongside the directive -->
<div class="max-w-2xl mx-auto" scNewAccordionGroup [multiExpandable]="false">
  <!-- Items -->
</div>

<button class="font-bold" scNewAccordionTrigger panelId="item1">
  <!-- Custom styling -->
</button>
```

## Comparison with Raw Angular ARIA

### Before (Raw Angular ARIA)

```html
<div
  class="w-full divide-y divide-border rounded-md border"
  ngAccordionGroup
  [multiExpandable]="false"
>
  <div>
    <h3 class="flex">
      <button
        class="flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180"
        ngAccordionTrigger
        panelId="faq1"
        [expanded]="true"
        #trigger1="ngAccordionTrigger"
      >
        Question
        <svg si-chevron-down-icon></svg>
      </button>
    </h3>
    <div class="overflow-hidden text-sm" ngAccordionPanel panelId="faq1">
      <ng-template ngAccordionContent>
        <div
          class="pb-4 pt-0 px-4"
          animate.enter="animate-accordion-down"
          animate.leave="animate-accordion-up"
        >
          Answer
        </div>
      </ng-template>
    </div>
  </div>
</div>
```

### After (With Wrappers)

```html
<div scNewAccordionGroup [multiExpandable]="false">
  <div>
    <h3 class="flex">
      <button scNewAccordionTrigger panelId="faq1" [expanded]="true">
        Question
        <svg si-chevron-down-icon></svg>
      </button>
    </h3>
    <div scNewAccordionPanel panelId="faq1">
      <ng-template scNewAccordionContent>Answer</ng-template>
    </div>
  </div>
</div>
```

**Benefits:**

- ✅ Less boilerplate HTML
- ✅ No need to remember class combinations
- ✅ Animations configured automatically
- ✅ Consistent styling across application
- ✅ Easier to maintain and update

## Technical Implementation

These wrappers use Angular's `hostDirectives` feature to compose the original Angular ARIA directives with pre-configured host bindings:

```typescript
@Directive({
  selector: '[scNewAccordionTrigger]',
  hostDirectives: [
    {
      directive: AccordionTrigger,
      inputs: ['panelId', 'expanded', 'disabled', 'softDisabled'],
    },
  ],
  host: {
    class:
      'flex flex-1 items-center justify-between py-4 px-4 text-sm font-medium transition-all hover:underline [&[aria-expanded=true]>svg]:rotate-180',
  },
})
export class ScNewAccordionTrigger {}
```

This approach ensures:

- Full compatibility with Angular ARIA
- Zero runtime overhead
- Type-safe input forwarding
- Easy to extend or customize
