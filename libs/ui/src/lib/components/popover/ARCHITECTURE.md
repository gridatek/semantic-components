# Popover Architecture

## Overview

The popover component uses a two-signal architecture pattern to ensure smooth animations before DOM cleanup. Unlike dialog/sheet/drawer components, popover has **no backdrop** and uses `cdkConnectedOverlay` for positioning relative to a trigger element.

**Popover-Specific Features:**

- Uses `cdkConnectedOverlay` directive for trigger-relative positioning
- No backdrop (closes on outside click via `overlayOutsideClick`)
- Positioned dynamically based on `side` and `align` inputs
- Lightweight fade + zoom + slide animations (100ms)
- `animate.enter` / `animate.leave` for its animations (see "Opening and closing")
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
      [cdkConnectedOverlayOpen]="open()"
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

## Opening and closing

`open` on `ScPopoverProvider` is the only state. While it is true the overlay is attached (a connected overlay next to its trigger, with the focus trap); when it turns false the overlay is detached.

The animated parts — `scPopover` (fade and zoom, from the side it opens on) — declare their own animations with Angular's `animate.enter` / `animate.leave`:

```ts
host: {
  'animate.enter': 'animate-in …',  // added when it is shown, removed once played
  'animate.leave': 'animate-out …', // added when it goes; Angular removes it once played
}
```

So on close Angular keeps each part in the page until its leave animation has ended, then removes it — in that same frame. The CDK waits for the overlay's pane to empty before tidying up, so nothing cuts the animation short. There is no flag for "still in the DOM", no counter of finished animations and no `animationend` handler.

Why not the old way (a second, "physical" open state, set to false from `animationend`): when an exit animation ends the element snaps back to its visible style, and removing it then took a change detection run. With zoneless Angular that run came a frame late, and the popover was painted fully visible once more before it went.

Where it slides or zooms from and to is set by plain classes (`slide-in-from-*`, `slide-out-to-*`, `zoom-*`): they only set the variables `animate-in` / `animate-out` read, so they can stay on the element all the time.

## Sub-Components

### ScPopoverHeader

Container for title and description with consistent spacing:

```typescript
@Directive({ selector: 'div[scPopoverHeader]' })
// Classes: 'flex flex-col gap-0.5 text-sm'
```

### ScPopoverTitle

Title text with medium font weight:

```typescript
@Directive({ selector: '[scPopoverTitle]' })
// Classes: 'font-medium'
```

### ScPopoverDescription

Description text with muted color:

```typescript
@Directive({ selector: 'p[scPopoverDescription]' })
// Classes: 'text-muted-foreground'
```

### ScPopoverClose

Close button directive:

```typescript
@Directive({ selector: 'button[scPopoverClose]' })
// Calls popover.open.set(false) on click
```

## Accessibility

- `role="dialog"` on `ScPopover`
- `aria-haspopup="dialog"` on the trigger
- `aria-expanded` reflects open state on trigger
- `tabindex="-1"` on popover for programmatic focus
- Escape key closes the popover
- Click outside closes the popover
