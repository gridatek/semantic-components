# Tour Guide

Step-by-step UI tour component for user onboarding and feature discovery. Fully composable — pick only the pieces you need.

## Parts

| Part                     | Selector                     | Type      | Description                           |
| ------------------------ | ---------------------------- | --------- | ------------------------------------- |
| `ScTourGuide`            | `div[scTourGuide]`           | Directive | Root overlay — provides state context |
| `ScTourGuideMask`        | `svg[scTourGuideMask]`       | Component | SVG overlay with spotlight cutout     |
| `ScTourGuideHighlight`   | `div[scTourGuideHighlight]`  | Component | Animated highlight border             |
| `ScTourGuideTooltip`     | `div[scTourGuideTooltip]`    | Directive | Positioned tooltip container          |
| `ScTourGuideClose`       | `button[scTourGuideClose]`   | Directive | Close button                          |
| `ScTourGuideStepNumber`  | `[scTourGuideStepNumber]`    | Directive | Step number badge                     |
| `ScTourGuideTitle`       | `h3[scTourGuideTitle]`       | Directive | Step title                            |
| `ScTourGuideDescription` | `p[scTourGuideDescription]`  | Directive | Step description                      |
| `ScTourGuideProgress`    | `div[scTourGuideProgress]`   | Component | Progress bar                          |
| `ScTourGuideNavigation`  | `div[scTourGuideNavigation]` | Directive | Navigation footer                     |
| `ScTourGuideCounter`     | `[scTourGuideCounter]`       | Directive | "X of Y" counter text                 |
| `ScTourGuideAction`      | `button[scTourGuideAction]`  | Directive | Navigation button (prev/next/finish)  |
| `TourService`            | —                            | Service   | Singleton service for tour control    |

## Usage

```typescript
import { ScTourGuide, ScTourGuideAction, ScTourGuideClose, ScTourGuideCounter, ScTourGuideDescription, ScTourGuideHighlight, ScTourGuideMask, ScTourGuideNavigation, ScTourGuideProgress, ScTourGuideStepNumber, ScTourGuideTitle, ScTourGuideTooltip, TourService } from '@semantic-components/ui-lab';
import type { TourOptions } from '@semantic-components/ui-lab';
```

### Full Example

```html
@if (tourService.isActive()) {
<div scTourGuide (stepChange)="onStepChange($event)" (tourComplete)="onTourComplete()" (tourClosed)="onTourClosed()" #guide="scTourGuide">
  <svg scTourGuideMask></svg>

  @if (guide.targetRect()) {
  <div scTourGuideHighlight></div>
  } @if (guide.currentStep()) {
  <div scTourGuideTooltip>
    @if (guide.allowClose()) {
    <button scTourGuideClose aria-label="Close tour">
      <svg siXIcon class="size-4"></svg>
    </button>
    } @if (guide.showStepNumbers()) {
    <span scTourGuideStepNumber></span>
    }

    <div class="pr-6">
      <h3 scTourGuideTitle></h3>
      <p scTourGuideDescription></p>
    </div>

    @if (guide.showProgress()) {
    <div scTourGuideProgress></div>
    }

    <div scTourGuideNavigation>
      <span scTourGuideCounter></span>
      <div class="flex gap-2">
        @if (!guide.isFirstStep()) {
        <button scTourGuideAction action="previous">Previous</button>
        } @if (guide.isLastStep()) {
        <button scTourGuideAction action="finish">Finish</button>
        } @else {
        <button scTourGuideAction action="next">Next</button>
        }
      </div>
    </div>
  </div>
  }
</div>
}
```

### Starting a Tour

```typescript
const tourService = inject(TourService);

tourService.start({
  steps: [
    {
      target: '#dashboard',
      title: 'Dashboard',
      content: 'Your main overview.',
      placement: 'bottom',
    },
    {
      target: '#settings',
      title: 'Settings',
      content: 'Configure your preferences.',
    },
  ],
  showProgress: true,
  showStepNumbers: true,
});
```

### Minimal (No Progress / Step Numbers / Close)

Simply omit the parts you don't need from the template:

```html
@if (tourService.isActive()) {
<div scTourGuide #guide="scTourGuide">
  <svg scTourGuideMask></svg>
  @if (guide.targetRect()) {
  <div scTourGuideHighlight></div>
  } @if (guide.currentStep()) {
  <div scTourGuideTooltip>
    <h3 scTourGuideTitle></h3>
    <p scTourGuideDescription></p>
    <div scTourGuideNavigation>
      <span scTourGuideCounter></span>
      <div class="flex gap-2">
        @if (!guide.isFirstStep()) {
        <button scTourGuideAction action="previous">Previous</button>
        } @if (guide.isLastStep()) {
        <button scTourGuideAction action="finish">Finish</button>
        } @else {
        <button scTourGuideAction action="next">Next</button>
        }
      </div>
    </div>
  </div>
  }
</div>
}
```

## API

### TourService

| Member        | Type                      | Description            |
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

### ScTourGuide (root)

| Output         | Type     | Description                     |
| -------------- | -------- | ------------------------------- |
| `stepChange`   | `number` | Emits when step changes         |
| `tourComplete` | `void`   | Emits when tour finishes        |
| `tourClosed`   | `void`   | Emits when tour is closed early |

Exposed via `exportAs: 'scTourGuide'`:

| Signal            | Type                 | Description                    |
| ----------------- | -------------------- | ------------------------------ |
| `targetRect`      | `Signal<TargetRect>` | Current target element rect    |
| `currentStep`     | `Signal<TourStep>`   | Current step data              |
| `allowClose`      | `Signal<boolean>`    | Whether closing is allowed     |
| `showStepNumbers` | `Signal<boolean>`    | Whether step numbers are shown |
| `showProgress`    | `Signal<boolean>`    | Whether progress bar is shown  |
| `isFirstStep`     | `Signal<boolean>`    | Whether on first step          |
| `isLastStep`      | `Signal<boolean>`    | Whether on last step           |

### ScTourGuideAction

| Input    | Type                               | Description       |
| -------- | ---------------------------------- | ----------------- |
| `action` | `'previous' \| 'next' \| 'finish'` | Action to perform |

### TourStep

```typescript
interface TourStep {
  target: string;
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

## Keyboard Shortcuts

| Key     | Action             |
| ------- | ------------------ |
| `→`     | Next step          |
| `←`     | Previous step      |
| `Enter` | Next step / Finish |
| `Esc`   | Close tour         |
