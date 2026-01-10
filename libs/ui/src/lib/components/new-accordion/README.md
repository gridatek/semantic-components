# New Accordion

A set of wrapper directives for Angular ARIA's accordion components that include built-in styling and animations, following shadcn/ui design patterns.

## Overview

These wrapper directives provide a cleaner, more opinionated implementation of Angular ARIA accordions with pre-configured styles and smooth animations. They eliminate the need to repeat CSS classes and animation setup across your application.

## Architecture

The accordion system is split into semantic components with distinct responsibilities:

- **ScNewAccordionGroup**: Container that manages expansion behavior
- **ScNewAccordionTrigger**: Interactive button that toggles panels
- **ScNewAccordionPanel**: Wrapper for panel content with overflow handling
- **ScNewAccordionContent**: Plain content wrapper (use when you need custom animations or static content)
- **ScNewAccordionAnimatedContent**: Animated content wrapper with built-in slide/fade transitions

All components include `data-slot` attributes for programmatic identification and testing.

## Components

### ScNewAccordionGroup

Wraps `@angular/aria/accordion`'s `AccordionGroup` directive with built-in container styling.

**Features:**

- Container layout with borders and dividers
- Forwards `multiExpandable` input to control expansion behavior
- Includes `data-slot="accordion-group"` for identification
- Accepts `class` input for style customization

**Usage:**

```html
<div scNewAccordionGroup [multiExpandable]="false">
  <!-- Accordion items -->
</div>

<!-- With custom styling -->
<div class="max-w-2xl" scNewAccordionGroup [multiExpandable]="false">
  <!-- Accordion items -->
</div>
```

### ScNewAccordionTrigger

Wraps `@angular/aria/accordion`'s `AccordionTrigger` directive with button styling.

**Features:**

- Interactive button with hover effects and transitions
- Automatic chevron rotation when expanded
- Forwards Angular ARIA inputs: `panelId`, `expanded`, `disabled`
- Includes `data-slot="accordion-trigger"` for identification
- Accepts `class` input for style customization

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

- Overflow handling for smooth animations
- Forwards `panelId` input
- Includes `data-slot="accordion-panel"` for identification
- Accepts `class` input for style customization

**Usage:**

```html
<div scNewAccordionPanel panelId="item1">
  <ng-template scNewAccordionContent>
    <div scNewAccordionAnimatedContent>Content here</div>
  </ng-template>
</div>
```

### ScNewAccordionContent

Wraps `@angular/aria/accordion`'s `AccordionContent` directive without additional styling or animations.

**Features:**

- Plain wrapper for Angular ARIA's content directive
- Includes `data-slot="accordion-content"` for identification
- Use when you need full control over animations or static content

**Usage:**

```html
<ng-template scNewAccordionContent>
  <!-- Your custom content with optional animations -->
  <div>Static content without animations</div>
</ng-template>
```

**Use Cases:**

- Static content that doesn't need animations
- Custom animation implementations
- Third-party animation libraries
- Performance-critical scenarios where animations should be disabled

### ScNewAccordionAnimatedContent

Provides built-in slide and fade animations for accordion content.

**Features:**

- Enter animation: slides down and fades in
- Leave animation: slides up and fades out
- Includes `data-slot="accordion-animated-content"` for identification
- Accepts `class` input for style customization

**Usage:**

```html
<ng-template scNewAccordionContent>
  <div scNewAccordionAnimatedContent>Answer content here</div>
</ng-template>

<!-- With custom styling -->
<ng-template scNewAccordionContent>
  <div class="text-base" scNewAccordionAnimatedContent>Custom styled content</div>
</ng-template>
```

**Use Cases:**

- Standard accordion panels with smooth transitions
- FAQ sections
- Collapsible documentation
- Settings panels with show/hide functionality

## Complete Example

```typescript
import {
  ScNewAccordionAnimatedContent,
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
    ScNewAccordionAnimatedContent,
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
            <div scNewAccordionAnimatedContent>Yes. It adheres to the WAI-ARIA design pattern.</div>
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
            <div scNewAccordionAnimatedContent>
              Yes. It supports arrow keys, Home, and End for navigation.
            </div>
          </ng-template>
        </div>
      </div>
    </div>
  `,
})
export class FaqComponent {}
```

## Common Use Cases

### FAQ Section (Animated)

Standard FAQ with smooth animations:

```html
<div scNewAccordionGroup [multiExpandable]="false">
  <div>
    <h3 class="flex">
      <button scNewAccordionTrigger panelId="q1">
        What is your return policy?
        <svg si-chevron-down-icon></svg>
      </button>
    </h3>
    <div scNewAccordionPanel panelId="q1">
      <ng-template scNewAccordionContent>
        <div scNewAccordionAnimatedContent>You can return items within 30 days of purchase.</div>
      </ng-template>
    </div>
  </div>
</div>
```

### Settings Panel (Static Content)

Settings that don't benefit from animations:

```html
<div scNewAccordionGroup [multiExpandable]="true">
  <div>
    <h3 class="flex">
      <button scNewAccordionTrigger panelId="display">Display Settings</button>
    </h3>
    <div scNewAccordionPanel panelId="display">
      <ng-template scNewAccordionContent>
        <!-- Static form without animations for instant feedback -->
        <form class="p-4">
          <label>
            <input type="checkbox" />
            Dark mode
          </label>
        </form>
      </ng-template>
    </div>
  </div>
</div>
```

### Documentation with Custom Animations

Using third-party animation library:

```html
<div scNewAccordionGroup [multiExpandable]="true">
  <div>
    <h3 class="flex">
      <button scNewAccordionTrigger panelId="docs1">API Reference</button>
    </h3>
    <div scNewAccordionPanel panelId="docs1">
      <ng-template scNewAccordionContent>
        <div class="p-4" @customAnimation>
          <!-- Your custom animation defined in component -->
          API documentation content
        </div>
      </ng-template>
    </div>
  </div>
</div>
```

## Expansion Modes

### Single Expansion

Only one panel can be open at a time. When you open a panel, others close automatically.

```html
<div scNewAccordionGroup [multiExpandable]="false">
  <!-- Items -->
</div>
```

**Use Cases:** FAQs, product details, mobile navigation menus

### Multiple Expansion

Multiple panels can be open simultaneously.

```html
<div scNewAccordionGroup [multiExpandable]="true">
  <!-- Items -->
</div>
```

**Use Cases:** Filters, settings panels, complex forms with grouped sections

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

The accordion animation system is separated into two components:

### ScNewAccordionAnimatedContent

Provides built-in animations using Tailwind CSS (from `tw-animate-css`):

- **Opening**: Content slides down and fades in
- **Closing**: Content slides up and fades out
- Uses Angular's `animate.enter` and `animate.leave` compiler features

### ScNewAccordionContent

Plain wrapper without animations, allowing you to:

- Implement custom animations
- Use third-party animation libraries
- Display static content without transitions
- Optimize performance by disabling animations when not needed

### Chevron Animation

The trigger automatically rotates chevron icons (SVG elements) 180° when the panel expands, regardless of which content component you use.

## Styling Customization

All components (except `ScNewAccordionContent`) accept a `class` input for style overrides. Additional classes are merged with the default styles using the `cn()` utility.

```html
<!-- Customize any component -->
<div class="max-w-2xl" scNewAccordionGroup [multiExpandable]="false">
  <button class="font-bold" scNewAccordionTrigger panelId="item1">Question</button>
  <div class="text-base" scNewAccordionPanel panelId="item1">
    <ng-template scNewAccordionContent>
      <div class="px-8" scNewAccordionAnimatedContent>Content</div>
    </ng-template>
  </div>
</div>
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
      <ng-template scNewAccordionContent>
        <div scNewAccordionAnimatedContent>Answer</div>
      </ng-template>
    </div>
  </div>
</div>
```

**Benefits:**

- Less boilerplate HTML
- Cleaner template structure
- Separation of concerns (content vs. animation)
- Flexible animation control
- Consistent styling across application
- `data-slot` attributes for easier testing and debugging

## Technical Implementation

### Composition with hostDirectives

Components that wrap Angular ARIA directives use the `hostDirectives` feature for composition:

```typescript
@Directive({
  selector: '[scNewAccordionTrigger]',
  hostDirectives: [
    {
      directive: AccordionTrigger,
      inputs: ['panelId', 'expanded', 'disabled'],
    },
  ],
  host: {
    'data-slot': 'accordion-trigger',
    '[class]': 'class()',
  },
})
export class ScNewAccordionTrigger {
  readonly classInput = input<string>('', { alias: 'class' });
  protected readonly class = computed(() => cn('...default classes...', this.classInput()));
}
```

### Content vs. Animated Content

The split architecture separates concerns:

- **ScNewAccordionContent**: Wraps Angular ARIA's `AccordionContent` directive only
- **ScNewAccordionAnimatedContent**: Standalone directive with animation configuration

This allows users to choose:

1. Use `ScNewAccordionAnimatedContent` for built-in animations
2. Use plain `ScNewAccordionContent` with custom animation directives
3. Use plain `ScNewAccordionContent` with static content (no animations)

### Data Slots

All components include `data-slot` attributes:

```html
<div data-slot="accordion-group">
  <button data-slot="accordion-trigger"></button>
  <div data-slot="accordion-panel">
    <ng-template data-slot="accordion-content">
      <div data-slot="accordion-animated-content"></div>
    </ng-template>
  </div>
</div>
```

**Use Cases for data-slot:**

- E2E testing: `cy.get('[data-slot="accordion-trigger"]')`
- CSS targeting: `[data-slot="accordion-group"] { ... }`
- Debugging: Easily identify component boundaries in DevTools
- Documentation: Clear component hierarchy visualization

This approach ensures:

- Full compatibility with Angular ARIA
- Zero runtime overhead (beyond Angular's built-in features)
- Type-safe input forwarding
- Flexible styling and animation control
- Clear component identification
