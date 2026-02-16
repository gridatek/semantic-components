# Popover Architecture

## Overview

The popover component uses a two-signal architecture pattern to ensure smooth animations before DOM cleanup. Unlike dialog/sheet/drawer components, popover has **no backdrop** and uses `cdkConnectedOverlay` for positioning relative to a trigger element.

**Popover-Specific Features:**

- Uses `cdkConnectedOverlay` directive for trigger-relative positioning
- No backdrop (closes on outside click via `overlayOutsideClick`)
- Positioned dynamically based on `side` and `align` inputs
- Lightweight fade + zoom + slide animations (100ms)
- `data-open`/`data-closed` boolean attributes for animation state
- `data-side` attribute for directional slide-in animations
- Provider uses `display: contents` CSS to be invisible in layout

## Component Structure

```
ScPopoverProvider (Root State Manager + Overlay Host)
├── ScPopoverTrigger (Trigger Element - provides CdkOverlayOrigin)
└── ng-template[scPopoverPortal] (Template captured via TemplateRef)
    └── ScPopover (Popover Content - positioned relative to trigger)
        ├── ScPopoverHeader (Optional header container)
        │   ├── ScPopoverTitle (Title text)
        │   └── ScPopoverDescription (Description text)
        └── ScPopoverClose (Optional close button)
```

### Portal as Directive

The `ScPopoverPortal` is a **directive** on `ng-template`, not a component. It captures the `TemplateRef` which the provider renders inside the CDK connected overlay using `ngTemplateOutlet`.

```typescript
// Portal: Simple directive capturing TemplateRef
@Directive({ selector: 'ng-template[scPopoverPortal]' })
export class ScPopoverPortal {
  readonly templateRef = inject(TemplateRef);
}

// Provider: Renders the portal content inside CDK overlay
template: `
  <ng-content />
  @if (origin(); as origin) {
    <ng-template
      cdkConnectedOverlay
      [cdkConnectedOverlayOrigin]="origin"
      [cdkConnectedOverlayOpen]="overlayOpen()"
      [cdkConnectedOverlayPositions]="[position()]"
      (overlayOutsideClick)="close()"
      (overlayKeydown)="onKeydown($event)"
    >
      <ng-container [ngTemplateOutlet]="popoverPortal().templateRef" />
    </ng-template>
  }
`;
```

### Provider CSS: `display: contents`

The provider uses `display: contents` so it doesn't create a layout box. This means the trigger and other content render as if the provider wrapper doesn't exist in the DOM layout.

```typescript
protected readonly class = computed(() => cn('contents', this.classInput()));
```

## The Two-Signal Pattern

Since popover has no backdrop, we only need to coordinate **one animation** (the popover itself). This simplifies the pattern to just two signals.

### Signal 1: `open` (Logical State)

**Purpose:** Controls what the popover _should_ be doing

```typescript
// In ScPopoverProvider
readonly open = model<boolean>(false);
```

**Responsibilities:**

- Represents user intent ("should the popover be visible?")
- Triggers animation state changes
- When `true`: Triggers entry animation
- When `false`: Triggers exit animation

### Signal 2: `overlayOpen` (Physical State)

**Purpose:** Controls whether DOM exists via `cdkConnectedOverlayOpen`

```typescript
// In ScPopoverProvider
readonly overlayOpen = signal<boolean>(false);
```

**Responsibilities:**

- Controls CDK connected overlay attachment/detachment
- Stays `true` during close animation (critical!)
- Only becomes `false` after animation completes
- Ensures animation can play before DOM removal
- Bound to `[cdkConnectedOverlayOpen]` in the provider template

## Animation Architecture

### Animation State Attributes

The popover uses `data-open`/`data-closed` boolean attributes instead of `data-state`:

```typescript
host: {
  '[attr.data-open]': 'state() === "open" ? true : null',
  '[attr.data-closed]': 'state() === "closed" ? true : null',
  '[attr.data-side]': 'popover.side()',
}
```

### Animation Classes

```typescript
protected readonly class = computed(() =>
  cn(
    // Base styles
    'bg-popover text-popover-foreground z-50 w-72 rounded-lg ring-1 ring-foreground/10 flex flex-col gap-2.5 p-2.5 text-sm shadow-md outline-hidden',

    // Entry animation
    'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95 duration-100',

    // Exit animation
    'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',

    // Directional slide-in based on side
    'data-[side=bottom]:slide-in-from-top-2',
    'data-[side=left]:slide-in-from-right-2',
    'data-[side=right]:slide-in-from-left-2',
    'data-[side=top]:slide-in-from-bottom-2',
  ),
);
```

### Animation Flow

**Opening:**

1. `open` set to `true`
2. Provider effect sets `overlayOpen = true` (DOM mounts)
3. Popover effect sets `state = 'open'`
4. `data-open` attribute triggers entry animation (fade + zoom + slide)

**Closing:**

1. `open` set to `false`
2. Popover effect sets `state = 'closed'`
3. `data-closed` attribute triggers exit animation
4. `overlayOpen` stays `true` (DOM remains for animation)
5. `animationend` fires → `onPopoverAnimationComplete()`
6. `overlayOpen` set to `false` → CDK removes overlay

## Sub-Components

### ScPopoverHeader

Container for title and description with consistent spacing:

```typescript
@Directive({ selector: 'div[sc-popover-header]' })
// Classes: 'flex flex-col gap-0.5 text-sm'
```

### ScPopoverTitle

Title text with medium font weight:

```typescript
@Directive({ selector: '[sc-popover-title]' })
// Classes: 'font-medium'
```

### ScPopoverDescription

Description text with muted color:

```typescript
@Directive({ selector: 'p[sc-popover-description]' })
// Classes: 'text-muted-foreground'
```

### ScPopoverClose

Close button directive:

```typescript
@Directive({ selector: 'button[sc-popover-close]' })
// Calls popover.open.set(false) on click
```

## Comparison: Popover vs Dialog/Sheet/Drawer

| Feature           | Popover                                | Dialog/Sheet/Drawer       |
| ----------------- | -------------------------------------- | ------------------------- |
| **Backdrop**      | None                                   | ScBackdrop component      |
| **Positioning**   | Trigger-relative (cdkConnectedOverlay) | Global (Overlay.create)   |
| **Animations**    | 1 (popover only)                       | 2 (content + backdrop)    |
| **Coordination**  | Direct cleanup                         | Signal counter            |
| **Duration**      | 100ms                                  | 300ms                     |
| **Outside Click** | overlayOutsideClick                    | backdropClick             |
| **Portal**        | ng-template directive                  | ng-template directive     |
| **Provider CSS**  | `display: contents`                    | `display: contents`       |
| **State attrs**   | `data-open`/`data-closed`              | `data-open`/`data-closed` |

## Accessibility

- `role="dialog"` on `ScPopover`
- `aria-haspopup="dialog"` on the trigger
- `aria-expanded` reflects open state on trigger
- `tabindex="-1"` on popover for programmatic focus
- Escape key closes the popover
- Click outside closes the popover
