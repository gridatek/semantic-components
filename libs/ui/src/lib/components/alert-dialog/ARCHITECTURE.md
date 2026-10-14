# Alert Dialog Architecture

## Overview

The alert dialog is a provider with parts. It opens and closes on one `open` signal; Angular's `animate.enter` / `animate.leave` play the parts' animations (see "Opening and closing").

## Component Structure

```
ScAlertDialogProvider (Root State Manager + CDK Overlay Manager)
├── ScAlertDialogTrigger (Opens dialog)
└── ng-template[scAlertDialogPortal] (Lazy content, portaled to CDK overlay)
    │
    Inside CDK Overlay (managed by Provider):
    ├── CDK Backdrop (Transparent - click blocking only)
    ├── ScBackdrop (Visual backdrop with animations)
    └── ScAlertDialog (Dialog Content)
        ├── ScAlertDialogHeader
        │   ├── ScAlertDialogMedia (Optional)
        │   └── ScAlertDialogTitle
        │   └── ScAlertDialogDescription
        └── ScAlertDialogFooter
            ├── ScAlertDialogCancel
            └── ScAlertDialogAction
```

### ScAlertDialogPortal Directive

`ScAlertDialogPortal` is a structural directive on `ng-template` that marks the lazy content to be portaled into the CDK overlay. It holds a reference to the `TemplateRef` which the provider reads via `contentChild`.

```typescript
@Directive({
  selector: 'ng-template[scAlertDialogPortal]',
})
export class ScAlertDialogPortal {
  readonly templateRef = inject(TemplateRef);
}
```

The provider queries it and projects the template into the overlay:

```typescript
// In ScAlertDialogProvider
protected readonly alertDialogPortal = contentChild.required(ScAlertDialogPortal);

// In provider's overlay template
<ng-container [ngTemplateOutlet]="alertDialogPortal().templateRef" />
```

### Why a Directive?

- **Explicit**: A bare `<ng-template>` is ambiguous; `scAlertDialogPortal` communicates intent
- **Lazy**: Content inside `ng-template` is not instantiated until the provider stamps it
- **Provider owns lifecycle**: The provider decides _when_ to stamp the template (on open)
- **DI preserved**: Using `TemplatePortal(overlayTemplate, viewContainerRef)` with the provider's own `ViewContainerRef` keeps the injector chain intact — `ScAlertDialog` can inject `ScAlertDialogProvider`

## Opening and closing

`open` on `ScAlertDialogProvider` is the only state. While it is true the overlay is attached (centred, with the backdrop and the focus trap); when it turns false the overlay is detached.

The animated parts — `scAlertDialog` (fade and zoom) and the `scBackdrop` behind it (fade) — declare their own animations with Angular's `animate.enter` / `animate.leave`:

```ts
host: {
  'animate.enter': 'animate-in …',  // added when it is shown, removed once played
  'animate.leave': 'animate-out …', // added when it goes; Angular removes it once played
}
```

So on close Angular keeps each part in the page until its leave animation has ended, then removes it — in that same frame. The CDK waits for the overlay's pane to empty before tidying up, so nothing cuts the animation short. There is no flag for "still in the DOM", no counter of finished animations and no `animationend` handler.

Why not the old way (a second, "physical" open state, set to false from `animationend`): when an exit animation ends the element snaps back to its visible style, and removing it then took a change detection run. With zoneless Angular that run came a frame late, and the alert dialog was painted fully visible once more before it went.

Where it slides or zooms from and to is set by plain classes (`slide-in-from-*`, `slide-out-to-*`, `zoom-*`): they only set the variables `animate-in` / `animate-out` read, so they can stay on the element all the time.

## Key Design Decisions

### 1. Provider Owns Everything

**Decision:** `ScAlertDialogProvider` manages state, overlay lifecycle, backdrop, and focus trap

**Why:**

- Provider controls _when_ content appears (open state)
- Provider controls _where_ content appears (CDK overlay)
- Single component owns the full lifecycle — no coordination between sibling components
- `ScAlertDialogPortal` directive just marks _what_ content to portal — no logic

### 2. `display: contents` on Provider

**Decision:** Provider uses `display: contents` to be invisible to CSS layout

**Why:**

- Provider is a `<div>` (required for CDK overlay's `ViewContainerRef`)
- But it shouldn't affect the consumer's layout
- `display: contents` makes the element's box disappear while keeping children in flow
- Consumer can place trigger and other content without layout interference

### 3. No Backdrop Click / Escape Handlers

**Decision:** Alert dialog does not close on backdrop click or Escape key

**Why:**

- Alert dialogs require explicit user action (Cancel or Action button)
- This follows WAI-ARIA alert dialog best practices
- Prevents accidental dismissal of critical confirmations
- Unlike `ScDialogProvider`, the provider does not subscribe to `overlayRef.backdropClick()` or `overlayRef.keydownEvents()`

## Accessibility Considerations

The animation system preserves accessibility:

1. **Focus Management:** Dialog auto-focuses on mount via `scFocusTrap`, which gives focus back on close — unless it has moved on elsewhere
2. **ARIA Attributes:** Set before animations start (`role="alertdialog"`, `aria-modal="true"`)
3. **Screen Readers:** Announce dialog immediately (not after animation)
4. **No Escape Dismiss:** Escape key does NOT close the alert dialog — user must choose an action
5. **No Backdrop Dismiss:** Clicking outside does NOT close the alert dialog — user must choose an action
6. **Reduced Motion:** Could add `@media (prefers-reduced-motion)` support

## Consumer API

```html
<div scAlertDialogProvider [(open)]="isOpen">
  <button scAlertDialogTrigger scButton>Delete</button>
  <ng-template scAlertDialogPortal>
    <div scAlertDialog>
      <div scAlertDialogHeader>
        <h2 scAlertDialogTitle>Are you sure?</h2>
        <p scAlertDialogDescription>This action cannot be undone.</p>
      </div>
      <div scAlertDialogFooter>
        <button scAlertDialogCancel scButton>Cancel</button>
        <button scAlertDialogAction scButton>Continue</button>
      </div>
    </div>
  </ng-template>
</div>
```

**Key points:**

- `scAlertDialogPortal` on `ng-template` marks lazy content
- Content is only instantiated when dialog opens
- `ScAlertDialogPortal` must be imported in the consumer's `imports` array
- `[(open)]` provides two-way binding for programmatic control
- No close button, escape, or backdrop click — user must choose Cancel or Action
