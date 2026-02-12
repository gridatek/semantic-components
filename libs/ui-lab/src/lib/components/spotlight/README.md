# Spotlight

Highlight specific UI elements with a spotlight overlay effect for feature discovery and user guidance.

## Usage

```html
<button (click)="spotlight.show('#my-element')">Show Spotlight</button>

<sc-spotlight #spotlight [padding]="12">
  <sc-spotlight-title>Feature Title</sc-spotlight-title>
  <sc-spotlight-description>Description of the highlighted feature.</sc-spotlight-description>
  <sc-spotlight-actions>
    <button (click)="spotlight.close()">Got it</button>
  </sc-spotlight-actions>
</sc-spotlight>
```

## API

### ScSpotlight

| Input                 | Type                | Default    | Description                     |
| --------------------- | ------------------- | ---------- | ------------------------------- |
| `target`              | `string \| Element` | `null`     | CSS selector or Element         |
| `padding`             | `number`            | `8`        | Padding around highlighted area |
| `borderRadius`        | `number`            | `8`        | Border radius of spotlight      |
| `overlayOpacity`      | `number`            | `0.75`     | Overlay darkness (0-1)          |
| `animationDuration`   | `number`            | `300`      | Animation duration in ms        |
| `showClose`           | `boolean`           | `true`     | Show close button               |
| `closeOnOverlayClick` | `boolean`           | `true`     | Close when clicking overlay     |
| `closeOnEscape`       | `boolean`           | `true`     | Close on Escape key             |
| `scrollIntoView`      | `boolean`           | `true`     | Scroll target into view         |
| `scrollBehavior`      | `ScrollBehavior`    | `'smooth'` | Scroll animation type           |
| `contentPlacement`    | `string`            | `'auto'`   | Position of content panel       |
| `class`               | `string`            | `''`       | Additional CSS classes          |

| Output   | Type   | Description                 |
| -------- | ------ | --------------------------- |
| `opened` | `void` | Emits when spotlight opens  |
| `closed` | `void` | Emits when spotlight closes |

| Method   | Type                          | Description               |
| -------- | ----------------------------- | ------------------------- |
| `show`   | `(target: string \| Element)` | Show spotlight on element |
| `hide`   | `() => void`                  | Hide the spotlight        |
| `toggle` | `(target: string \| Element)` | Toggle visibility         |
| `close`  | `() => void`                  | Close the spotlight       |

### ScSpotlightTitle

Styled title for the spotlight content.

### ScSpotlightDescription

Styled description text for the spotlight content.

### ScSpotlightActions

Container for action buttons with proper spacing.

## Examples

### Basic Spotlight

```html
<button (click)="spotlight.show('#feature-card')">Highlight Feature</button>

<sc-spotlight #spotlight>
  <sc-spotlight-title>New Feature!</sc-spotlight-title>
  <sc-spotlight-description>Check out this exciting new capability.</sc-spotlight-description>
</sc-spotlight>
```

### With Custom Styling

```html
<sc-spotlight #spotlight [padding]="16" [borderRadius]="12" [overlayOpacity]="0.85">
  <sc-spotlight-title>Premium Feature</sc-spotlight-title>
  <sc-spotlight-description>Upgrade to access this feature.</sc-spotlight-description>
  <sc-spotlight-actions>
    <button (click)="spotlight.close()">Maybe Later</button>
    <button (click)="upgrade()">Upgrade Now</button>
  </sc-spotlight-actions>
</sc-spotlight>
```

### Programmatic Target

```typescript
// Using CSS selector
spotlight.show('#my-element');

// Using Element reference
const element = document.querySelector('.my-class');
spotlight.show(element);
```

### Input-Driven

```html
<sc-spotlight [target]="activeTarget()">
  <!-- Content automatically updates when target changes -->
</sc-spotlight>
```

```typescript
activeTarget = signal<string | null>(null);

highlightElement(selector: string) {
  this.activeTarget.set(selector);
}

clearHighlight() {
  this.activeTarget.set(null);
}
```

## Features

- SVG mask-based overlay with spotlight cutout
- Animated pulse effect on highlighted element
- Auto-positioning content panel
- Customizable padding, border radius, and opacity
- Close on overlay click or Escape key
- Scroll target into view automatically
- ResizeObserver for dynamic element tracking
- Content slot for custom tooltips and actions
- Smooth enter/exit animations

## Accessibility

- ARIA dialog role with modal attribute
- Keyboard navigable (Escape to close)
- Focus trap within spotlight
- Screen reader friendly
