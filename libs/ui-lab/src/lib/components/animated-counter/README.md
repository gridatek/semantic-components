# Animated Counter

A component that animates numbers smoothly between values with customizable easing, formatting, and duration.

## Installation

```typescript
import { ScAnimatedCounter } from '@/ui/animated-counter';
import type { AnimatedCounterEasing, AnimatedCounterOptions } from '@/ui/animated-counter';
```

## Usage

### Basic Usage

```html
<sc-animated-counter [value]="count" class="text-4xl font-bold" />
```

```typescript
count = signal(0);

increment(): void {
  this.count.update((v) => v + 100);
}
```

### With Prefix and Suffix

```html
<sc-animated-counter [value]="money" prefix="$" [decimalPlaces]="2" class="text-3xl font-bold text-green-600" />

<sc-animated-counter [value]="percent" suffix="%" [decimalPlaces]="1" class="text-3xl font-bold" />
```

### Custom Easing

```html
<sc-animated-counter [value]="value" easing="linear" [duration]="2000" />
<sc-animated-counter [value]="value" easing="easeIn" [duration]="2000" />
<sc-animated-counter [value]="value" easing="easeOut" [duration]="2000" />
<sc-animated-counter [value]="value" easing="easeInOut" [duration]="2000" />
```

### Large Numbers with Separators

```html
<sc-animated-counter [value]="largeNumber" separator="," class="text-3xl font-bold" />
```

## API Reference

### Inputs

| Input           | Type                                               | Default     | Description              |
| --------------- | -------------------------------------------------- | ----------- | ------------------------ |
| `value`         | `number`                                           | (required)  | Target number to display |
| `duration`      | `number`                                           | `1000`      | Animation duration in ms |
| `easing`        | `'linear' \| 'easeIn' \| 'easeOut' \| 'easeInOut'` | `'easeOut'` | Animation easing         |
| `decimalPlaces` | `number`                                           | `0`         | Number of decimal places |
| `separator`     | `string`                                           | `','`       | Thousands separator      |
| `prefix`        | `string`                                           | `''`        | Prefix text (e.g., '$')  |
| `suffix`        | `string`                                           | `''`        | Suffix text (e.g., '%')  |
| `class`         | `string`                                           | `''`        | Additional CSS classes   |

### Outputs

| Output              | Type     | Description                      |
| ------------------- | -------- | -------------------------------- |
| `animationComplete` | `number` | Emitted when animation completes |

### Methods

| Method    | Description        |
| --------- | ------------------ |
| `reset()` | Reset counter to 0 |

## Type Definitions

```typescript
type AnimatedCounterEasing = 'linear' | 'easeIn' | 'easeOut' | 'easeInOut';

interface AnimatedCounterOptions {
  duration?: number;
  easing?: AnimatedCounterEasing;
  decimalPlaces?: number;
  separator?: string;
  prefix?: string;
  suffix?: string;
}
```

## Features

- Smooth number animation with requestAnimationFrame
- Multiple easing functions
- Configurable decimal places
- Thousands separator formatting
- Prefix and suffix support
- Accessible with aria-label
- Automatic animation on value change
- Tabular numbers for stable width
