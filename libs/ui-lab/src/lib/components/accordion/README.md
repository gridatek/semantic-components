## Import

```typescript
import { ScAccordion, ScAccordionItem, ScAccordionHeader, ScAccordionTrigger, ScAccordionPanel, ScAccordionContent, ScAccordionTriggerIcon } from '@semantic-components/ui-lab';
```

## Architecture

```
ScAccordion (Root - uses AccordionGroup)
    ├── multiExpandable: boolean
    ├── disabled: boolean
    ├── wrap: boolean
    │
    ├── ScAccordionItem (styling wrapper)
    │     │
    │     ├── ScAccordionHeader (flex container for trigger)
    │     │      └── ScAccordionTrigger (uses AccordionTrigger)
    │     │            ├── panelId: string (links to panel)
    │     │            ├── expanded: boolean
    │     │            └── disabled: boolean
    │     │            └── svg[sc-accordion-trigger-icon] (optional icon)
    │     │
    │     └── ScAccordionPanel (uses AccordionPanel + animation wrapper)
    │           │
    │           ├── panelId: string (links to trigger)
    │           ├── animate.enter / animate.leave (on internal div)
    │           │
    │           └── ScAccordionContent (content styling wrapper)
    │
    ├── ScAccordionItem
    └── ...
```

## Components

| Component                | Selector                         | Description                                             |
| ------------------------ | -------------------------------- | ------------------------------------------------------- |
| `ScAccordion`            | `div[sc-accordion]`              | Root wrapper using `AccordionGroup`                     |
| `ScAccordionItem`        | `div[sc-accordion-item]`         | Styling wrapper for accordion item                      |
| `ScAccordionHeader`      | `div[sc-accordion-header]`       | Flex container for trigger                              |
| `ScAccordionTrigger`     | `button[sc-accordion-trigger]`   | Button to toggle item using `AccordionTrigger`          |
| `ScAccordionPanel`       | `div[sc-accordion-panel]`        | Collapsible panel with animation using `AccordionPanel` |
| `ScAccordionContent`     | `div[sc-accordion-content]`      | Content styling wrapper with padding and typography     |
| `ScAccordionTriggerIcon` | `svg[sc-accordion-trigger-icon]` | Directive to flip an SVG icon                           |

## Inputs

### ScAccordion

| Input             | Type      | Default | Description                             |
| ----------------- | --------- | ------- | --------------------------------------- |
| `multiExpandable` | `boolean` | `true`  | Allow multiple items to be open at once |
| `disabled`        | `boolean` | `false` | Disable all accordion items             |
| `wrap`            | `boolean` | `false` | Wrap keyboard navigation at ends        |

### ScAccordionHeader

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

The `ScAccordionHeader` component is a flex container that wraps the `ScAccordionTrigger`. It provides the layout structure for the accordion header.

### ScAccordionTrigger

| Input      | Type      | Default      | Description                              |
| ---------- | --------- | ------------ | ---------------------------------------- |
| `panelId`  | `string`  | **required** | Links trigger to its corresponding panel |
| `expanded` | `boolean` | `false`      | Whether the item is expanded             |
| `disabled` | `boolean` | `false`      | Whether the trigger is disabled          |

The trigger is a button that toggles the expanded state of an accordion panel.

### ScAccordionPanel

| Input     | Type     | Default      | Description                              |
| --------- | -------- | ------------ | ---------------------------------------- |
| `panelId` | `string` | **required** | Links panel to its corresponding trigger |

The `ScAccordionPanel` component wraps collapsible content using `AccordionPanel` from Angular ARIA. It includes an internal animated div wrapper with `text-sm overflow-hidden` classes and Angular's `animate.enter`/`animate.leave` directives for smooth expand/collapse transitions.

### ScAccordionContent

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

The `ScAccordionContent` component provides content styling including padding (`pt-0 pb-2.5`), link styles (underlined with hover effects), and paragraph spacing. Must be nested inside `ScAccordionPanel`.

### ScAccordionTriggerIcon

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

The `ScAccordionTriggerIcon` directive applies rotation to an SVG icon based on the expanded state of the accordion trigger.

## Usage

### Basic Usage

Use `panelId` to link each trigger to its corresponding panel. By default, multiple panels can be open at the same time. Set `[multiExpandable]="false"` if you want only one panel open at a time.

```html
<div sc-accordion [multiExpandable]="false">
  <div sc-accordion-item>
    <div sc-accordion-header>
      <button sc-accordion-trigger panelId="item-1">
        Is it accessible?
        <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
      </button>
    </div>
    <div sc-accordion-panel panelId="item-1">
      <div sc-accordion-content>Yes. It adheres to the WAI-ARIA design pattern.</div>
    </div>
  </div>
  <div sc-accordion-item>
    <div sc-accordion-header>
      <button sc-accordion-trigger panelId="item-2">
        Is it styled?
        <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
      </button>
    </div>
    <div sc-accordion-panel panelId="item-2">
      <div sc-accordion-content>Yes. It comes with default styles that match other components.</div>
    </div>
  </div>
  <div sc-accordion-item>
    <div sc-accordion-header>
      <button sc-accordion-trigger panelId="item-3">
        Is it animated?
        <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
      </button>
    </div>
    <div sc-accordion-panel panelId="item-3">
      <div sc-accordion-content>Yes. It's animated by default with smooth transitions.</div>
    </div>
  </div>
</div>
```

### Multiple Expandable

Allow multiple items to be open simultaneously.

```html
<div sc-accordion [multiExpandable]="true">
  <div sc-accordion-item>
    <div sc-accordion-header>
      <button sc-accordion-trigger panelId="item-1" [expanded]="true">
        Section 1
        <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
      </button>
    </div>
    <div sc-accordion-panel panelId="item-1">
      <div sc-accordion-content>Content 1</div>
    </div>
  </div>
  <div sc-accordion-item>
    <div sc-accordion-header>
      <button sc-accordion-trigger panelId="item-2" [expanded]="true">
        Section 2
        <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
      </button>
    </div>
    <div sc-accordion-panel panelId="item-2">
      <div sc-accordion-content>Content 2</div>
    </div>
  </div>
  <div sc-accordion-item>
    <div sc-accordion-header>
      <button sc-accordion-trigger panelId="item-3">
        Section 3
        <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
      </button>
    </div>
    <div sc-accordion-panel panelId="item-3">
      <div sc-accordion-content>Content 3</div>
    </div>
  </div>
</div>
```

### Two-Way Binding

Bind to the `expanded` state of individual triggers.

```html
<button sc-accordion-trigger panelId="item-1" [(expanded)]="isOpen">Section 1</button>
```

### Disabled Item

Disable individual triggers.

```html
<div sc-accordion-item>
  <div sc-accordion-header>
    <button sc-accordion-trigger panelId="disabled" [disabled]="true">
      Disabled Section
      <svg si-chevron-down-icon sc-accordion-trigger-icon></svg>
    </button>
  </div>
  <div sc-accordion-panel panelId="disabled">
    <div sc-accordion-content>Won't be shown</div>
  </div>
</div>
```

### Disabled Accordion

Disable the entire accordion.

```html
<div sc-accordion [disabled]="true">...</div>
```

## Features

- **Single or Multiple Expansion**: Control whether one or multiple panels can be open simultaneously
- **Smooth Animations**: Uses Angular's `animate.enter`/`animate.leave` with `tw-animate-css`
- **Keyboard Navigation**: Full keyboard support with arrow keys
- **Fully Accessible**: Built on `@angular/aria/accordion` with proper ARIA attributes
- **Customizable**: All components accept custom classes
- **Type-Safe**: Full TypeScript support with Angular signals

## Accessibility

Built on `@angular/aria/accordion`, providing:

- Trigger buttons have `aria-expanded` indicating open state
- Trigger buttons have `aria-controls` pointing to their panel
- Panels have `role="region"` and `aria-labelledby` pointing to their trigger
- Keyboard navigation with arrow keys between triggers
- `data-state` attribute on triggers and panels (`open` / `closed`)
- Disabled items have `disabled` attribute and are skipped in keyboard navigation

## Styling

The components use Tailwind CSS with shadcn/ui design tokens:

- Items have `border-b` for visual separation (via `ScAccordionItem`)
- Triggers show underline on hover (removed when focused for better UX)
- Built-in chevron icons automatically rotate 180° based on expanded state
- `ScAccordionPanel` includes an internal animated wrapper with `text-sm overflow-hidden` for smooth transitions
- `ScAccordionContent` provides content styling with padding (`pt-0 pb-2.5`), link underlines, and paragraph spacing
- Focus states use a ring style for keyboard navigation
- All components support custom classes via the `class` input

## Animation

The accordion uses Angular's built-in `animate.enter` and `animate.leave` API combined with animations from `tw-animate-css`. Animation is handled by an internal div wrapper within the `ScAccordionPanel` component.

### Setup

Make sure you have `tw-animate-css` imported in your CSS:

```css
@import 'tw-animate-css';
```

### How It Works

- **Opening**: When a panel expands, Angular applies the `animate-accordion-down` class via `animate.enter` on the internal animated div within `ScAccordionPanel`
- **Closing**: When a panel collapses, Angular applies the `animate-accordion-up` class via `animate.leave` on the internal animated div
- **Timing**: Angular handles all animation timing and cleanup automatically

The animations provide smooth height transitions from `0` to the content height when opening, and back to `0` when closing. The `overflow-hidden` class on the animated wrapper ensures content is properly clipped during the transition.
