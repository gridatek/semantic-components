# Tooltip Animations

This document explains how animations work in the tooltip component.

## Overview

The tooltip uses a state-based animation system that coordinates between the service and overlay component to provide smooth fade-in and fade-out effects.

## Architecture

### State Management

The tooltip overlay has two states:

```typescript
type ScTooltipState = 'open' | 'closed';
```

The state is managed by a signal in `ScTooltip`:

```typescript
readonly state = signal<ScTooltipState>('open');
```

### State Attribute

The state is exposed as a `data-state` attribute on the tooltip element:

```typescript
host: {
  '[attr.data-state]': 'state()',
}
```

This allows CSS to target different states:

- `[data-state="open"]` - Tooltip is visible
- `[data-state="closed"]` - Tooltip is closing

## Animation Flow

### 1. Show Animation (Fade In)

When a tooltip is created:

```typescript
// ScTooltipManager.show()
this.tooltipRef = this.overlayRef.attach(portal);
```

The overlay component initializes with `state = 'open'`, triggering CSS animations:

```css
.animate-in.fade-in-0.zoom-in-95
```

This creates a smooth fade-in with a subtle zoom effect.

### 2. Hide Animation (Fade Out)

When hiding a tooltip, the process is:

**Step 1**: Trigger close state

```typescript
// ScTooltipManager.hide()
this.tooltipRef.instance.close();
```

**Step 2**: Overlay component sets state to 'closed'

```typescript
// ScTooltip.close()
close(): void {
  this.state.set('closed');
}
```

**Step 3**: CSS animations activate

```css
[data-state='closed'] {
  /* Apply exit animations */
  animation: fade-out, zoom-out;
}
```

**Step 4**: Listen for animation completion

```typescript
// ScTooltip component listens to animationend event
protected onAnimationEnd(event: AnimationEvent): void {
  if (this.state() === 'closed' && event.target === this.elementRef.nativeElement) {
    this.animationComplete.emit(); // Notify manager
  }
}

// ScTooltipManager subscribes to animation complete
this.animationSubscription = this.tooltipRef.instance.animationComplete.subscribe(() => {
  this.disposeTooltip(); // Dispose after animation
});
```

The animation completes automatically based on CSS animation duration (~200ms).

## CSS Classes

The tooltip uses Tailwind CSS utility classes for animations:

### Entry Animations (data-state="open")

```css
animate-in          /* Base animation class */
fade-in-0           /* Fade from opacity 0 */
zoom-in-95          /* Zoom from 95% scale */
```

### Exit Animations (data-state="closed")

```css
data-[state=closed]:animate-out      /* Base exit animation */
data-[state=closed]:fade-out-0       /* Fade to opacity 0 */
data-[state=closed]:zoom-out-95      /* Zoom to 95% scale */
```

## Timing

### Animation Duration

The animation duration is defined as a static constant:

```typescript
private static readonly ANIMATION_DURATION = 200; // ms
```

This value must match your CSS animation duration for smooth transitions.

### Show/Hide Delays

Users can configure delays before showing or hiding tooltips:

- **`tooltipDelay`** (default: 200ms) - Delay before showing
- **`tooltipHideDelay`** (default: 0ms) - Delay before hiding

These are separate from the animation duration and controlled by the directive.

## Why This Approach?

### 1. Smooth Exit Animations

Simply disposing the overlay would cause an instant disappearance. By:

1. Setting state to 'closed'
2. Waiting for animation to complete
3. Then disposing the overlay

We ensure users see a smooth fade-out effect.

### 2. No JavaScript Animations

All animations are pure CSS, which:

- Performs better (GPU accelerated)
- Respects user's reduced motion preferences
- Easier to customize with Tailwind classes

### 3. Event-Driven Disposal

The service listens to actual animation completion events, preventing:

- Memory leaks from undisposed overlays
- Visual glitches from early disposal
- Timing mismatches between CSS and JavaScript
- Issues with custom animation durations

## Customizing Animations

### Change Animation Duration

Update your CSS animation duration:

```css
/* Change animation duration in your custom classes */
.my-custom-tooltip {
  animation-duration: 300ms !important;
}
```

The manager automatically waits for the `animationend` event, so no timing constants need updating.

### Custom Animation Classes

Use the `tooltipClass` input to add custom animations:

```html
<button scTooltip="Hello" tooltipClass="custom-bounce">Click me</button>
```

```css
.custom-bounce {
  animation: bounce 0.3s ease-in-out;
}
```

### Disable Animations

Remove animation classes from `ScTooltip.hostClass`:

```typescript
protected readonly hostClass = computed(() =>
  cn(
    'bg-primary text-primary-foreground z-50 rounded-md px-3 py-1.5 text-xs max-w-xs',
    // Remove these lines for no animations:
    // 'animate-in fade-in-0 zoom-in-95',
    // 'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
    this.data.tooltipClass,
  ),
);
```

The component will still emit `animationComplete` even without animations.

## Accessibility

The animation system respects accessibility:

- **Reduced Motion**: Tailwind's animation utilities automatically respect `prefers-reduced-motion`
- **Screen Readers**: The `aria-live="polite"` attribute ensures content changes are announced smoothly
- **No Motion Sickness**: The subtle zoom (95% scale) avoids dramatic movements

## Debugging

To debug animation issues:

1. **Check State Transitions**

   ```typescript
   // Add logging in ScTooltip
   close(): void {
     console.log('Tooltip closing, state:', this.state());
     this.state.set('closed');
     console.log('Tooltip state after close:', this.state());
   }
   ```

2. **Verify Animation Events**

   ```typescript
   // Add logging in ScTooltip
   protected onAnimationEnd(event: AnimationEvent): void {
     console.log('Animation ended:', event.animationName, 'State:', this.state());
     if (this.state() === 'closed' && event.target === this.elementRef.nativeElement) {
       console.log('Emitting animationComplete');
       this.animationComplete.emit();
     }
   }
   ```

3. **Inspect DOM**
   - Open DevTools while tooltip is closing
   - Check the `data-state` attribute changes from `"open"` to `"closed"`
   - Verify animation classes are present

## Summary

The tooltip animation system provides:

- ✅ Smooth fade-in/fade-out with zoom effects
- ✅ State-based animations using CSS
- ✅ Coordinated timing between service and overlay
- ✅ Accessible and performant
- ✅ Easy to customize

The key is the two-step hide process: set state to 'closed', then dispose after animation completes.
