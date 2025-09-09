# clock-picker

An interactive time picker component with a visual clock interface for selecting hours and minutes.

## Features

- **Visual Clock Interface**: Interactive circular clock face with draggable hand
- **Dual Format Support**: Both 12-hour (AM/PM) and 24-hour formats
- **Multiple Interaction Methods**: Click numbers or drag the hand to set time
- **Smooth Animations**: Fluid transitions and smart shortest-path rotations
- **Auto Mode Switching**: Automatically transitions from hours to minutes selection
- **Accessibility**: Full keyboard navigation and screen reader support
- **Touch Friendly**: Optimized for both mouse and touch interactions
- **Visual Feedback**: Subtle hover effects and scale animations
- **Customizable Theming**: CSS custom properties for easy customization

## Usage

```typescript
import { ScClockPicker, TimeValue } from '@semantic-components/ui';

@Component({
  template: `
    <div [(value)]="selectedTime" sc-clock-picker format="12h"></div>
  `,
})
export class MyComponent {
  selectedTime: TimeValue = { hours: 14, minutes: 30, period: 'PM' };
}
```

## API

### Inputs

- `format: '12h' | '24h'` - Time format (default: '12h')
- `disabled: boolean` - Disable all interactions
- `classInput: string` - Additional CSS classes

### Model

- `value: TimeValue` - Two-way binding for selected time

### TimeValue Interface

```typescript
interface TimeValue {
  hours: number; // 0-23
  minutes: number; // 0-59
  period?: 'AM' | 'PM'; // Only for 12h format
}
```

## Examples

### 12-Hour Format

```html
<div [(value)]="time12h" sc-clock-picker format="12h"></div>
```

### 24-Hour Format

```html
<div [(value)]="time24h" sc-clock-picker format="24h"></div>
```

### Disabled State

```html
<div [(value)]="time" [disabled]="true" sc-clock-picker></div>
```

## Customization

The clock-picker supports theming through CSS custom properties:

```css
.my-custom-clock {
  --clock-primary: #10b981; /* Primary color (hand, selected) */
  --clock-primary-foreground: #ffffff; /* Primary text color */
  --clock-background: #ffffff; /* Component background */
  --clock-foreground: #111827; /* Default text color */
  --clock-border: #d1d5db; /* Border color */
  --clock-accent: #f3f4f6; /* Hover background */
  --clock-accent-foreground: #111827; /* Hover text color */
  --clock-muted-foreground: #6b7280; /* Muted text (separator) */
}
```
