# Confetti

A celebration animation effect with customizable particles for showing success or celebration moments.

## Installation

```typescript
import { ScConfetti } from '@/ui/confetti';
import type { ConfettiOptions, ConfettiParticle, ConfettiShape } from '@/ui/confetti';
```

## Usage

### Basic Usage

```html
<sc-confetti #confetti (complete)="onComplete()" />

<button (click)="confetti.fire()">Fire Confetti!</button>
```

### With Custom Options

```typescript
confetti.fire({
  particleCount: 100,
  spread: 70,
  colors: ['#ff0000', '#00ff00', '#0000ff'],
  origin: { x: 0.5, y: 0.5 },
});
```

### Fire from Element

```typescript
@ViewChild('celebrateBtn') celebrateBtn!: ElementRef;

fireFromButton(): void {
  this.confetti.fireFromElement(this.celebrateBtn.nativeElement, {
    particleCount: 50,
    spread: 60,
  });
}
```

### Multiple Bursts

```typescript
// Fire from multiple origins
confetti.fire({ origin: { x: 0.3, y: 0.6 }, particleCount: 50 });
confetti.fire({ origin: { x: 0.7, y: 0.6 }, particleCount: 50 });
```

## API Reference

### Inputs

| Input     | Type              | Default | Description              |
| --------- | ----------------- | ------- | ------------------------ |
| `options` | `ConfettiOptions` | `{}`    | Default confetti options |

### Outputs

| Output     | Type   | Description                      |
| ---------- | ------ | -------------------------------- |
| `complete` | `void` | Emitted when animation completes |

### Methods

| Method                               | Description                     |
| ------------------------------------ | ------------------------------- |
| `fire(options?)`                     | Fire confetti with options      |
| `fireFromElement(element, options?)` | Fire from specific element      |
| `stop()`                             | Stop animation and clear canvas |

## Type Definitions

```typescript
interface ConfettiOptions {
  particleCount?: number; // Number of particles (default: 100)
  spread?: number; // Spread angle in degrees (default: 70)
  startVelocity?: number; // Initial velocity (default: 30)
  decay?: number; // Velocity decay rate (default: 0.94)
  gravity?: number; // Gravity effect (default: 1)
  drift?: number; // Horizontal drift (default: 0)
  colors?: string[]; // Particle colors
  shapes?: ConfettiShape[]; // Particle shapes
  origin?: { x: number; y: number }; // Origin point (0-1)
  duration?: number; // Animation duration in ms (default: 3000)
}

type ConfettiShape = 'square' | 'circle' | 'triangle' | 'ribbon';
```

## Features

- Canvas-based particle animation
- Customizable particle count, colors, and shapes
- Adjustable spread, velocity, and gravity
- Fire from specific elements or custom origins
- Multiple simultaneous bursts support
- Automatic cleanup on completion
- Responsive canvas sizing
