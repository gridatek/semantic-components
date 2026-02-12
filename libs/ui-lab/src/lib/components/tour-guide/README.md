# Tour Guide

Step-by-step UI tour component for user onboarding and feature discovery.

## Usage

```typescript
import { TourService, TourOptions, ScTourGuide } from './ui/tour-guide';

// Inject the service
const tourService = inject(TourService);

// Start a tour
const options: TourOptions = {
  steps: [
    {
      target: '#element-1',
      title: 'Welcome',
      content: 'This is the first step of the tour.',
      placement: 'bottom',
    },
    {
      target: '#element-2',
      title: 'Settings',
      content: 'Configure your preferences here.',
    },
  ],
  showProgress: true,
  showStepNumbers: true,
};

tourService.start(options);
```

```html
<!-- Add the component to your template -->
<sc-tour-guide (stepChange)="onStepChange($event)" (tourComplete)="onTourComplete()" (tourClosed)="onTourClosed()" />
```

## API

### TourStep

```typescript
interface TourStep {
  target: string; // CSS selector for the target element
  title: string;
  content: string;
  placement?: 'top' | 'bottom' | 'left' | 'right' | 'auto';
  highlightPadding?: number;
  disableInteraction?: boolean;
  beforeShow?: () => void | Promise<void>;
  afterHide?: () => void | Promise<void>;
}
```

### TourOptions

```typescript
interface TourOptions {
  steps: TourStep[];
  overlayOpacity?: number; // Default: 0.5
  animationDuration?: number; // Default: 300
  showProgress?: boolean; // Default: true
  showStepNumbers?: boolean; // Default: true
  allowClose?: boolean; // Default: true
  allowKeyboardNavigation?: boolean; // Default: true
  scrollBehavior?: ScrollBehavior; // Default: 'smooth'
  scrollPadding?: number; // Default: 100
}
```

### TourService

| Method        | Type                      | Description            |
| ------------- | ------------------------- | ---------------------- |
| `start`       | `(options: TourOptions)`  | Start a new tour       |
| `stop`        | `() => void`              | Stop the current tour  |
| `next`        | `() => void`              | Go to next step        |
| `previous`    | `() => void`              | Go to previous step    |
| `goTo`        | `(index: number) => void` | Jump to specific step  |
| `isActive`    | `Signal<boolean>`         | Whether tour is active |
| `currentStep` | `Signal<number>`          | Current step index     |
| `steps`       | `Signal<TourStep[]>`      | All tour steps         |
| `progress`    | `Signal<number>`          | Progress percentage    |

### ScTourGuide

| Output         | Type     | Description                     |
| -------------- | -------- | ------------------------------- |
| `stepChange`   | `number` | Emits when step changes         |
| `tourComplete` | `void`   | Emits when tour finishes        |
| `tourClosed`   | `void`   | Emits when tour is closed early |

## Examples

### Basic Tour

```typescript
tourService.start({
  steps: [
    { target: '#dashboard', title: 'Dashboard', content: 'Your main overview.' },
    { target: '#settings', title: 'Settings', content: 'Configure options.' },
    { target: '#help', title: 'Help', content: 'Get support.' },
  ],
});
```

### Minimal Tour (No Progress/Numbers)

```typescript
tourService.start({
  steps: [...],
  showProgress: false,
  showStepNumbers: false,
  overlayOpacity: 0.7
});
```

### Custom Placement

```typescript
{
  target: '#sidebar',
  title: 'Navigation',
  content: 'Access all sections here.',
  placement: 'right',
  highlightPadding: 16
}
```

## Keyboard Shortcuts

| Key     | Action             |
| ------- | ------------------ |
| `→`     | Next step          |
| `←`     | Previous step      |
| `Enter` | Next step / Finish |
| `Esc`   | Close tour         |

## Features

- SVG mask-based overlay with spotlight cutout
- Auto-positioning tooltips with smart placement
- Progress bar and step number indicators
- Keyboard navigation support
- Scroll target elements into view
- Customizable highlight padding
- Lifecycle hooks for before/after step actions
- Injectable service for programmatic control
- Responsive overlay that tracks window resize/scroll

## Accessibility

- ARIA dialog role with modal attribute
- Keyboard navigable
- Focus management
- Screen reader friendly labels
