# clock-picker

An interactive time picker component with a visual clock interface for selecting hours and minutes, built with a modular architecture for maximum flexibility and reusability.

## Features

- **Visual Clock Interface**: Interactive circular clock face with draggable hand
- **Modular Architecture**: Composed of 9 smaller, reusable components
- **Dual Format Support**: Both 12-hour (AM/PM) and 24-hour formats
- **Multiple Interaction Methods**: Click numbers or drag the hand to set time
- **Smooth Animations**: Fluid transitions and smart shortest-path rotations
- **Auto Mode Switching**: Automatically transitions from hours to minutes selection
- **Accessibility**: Full keyboard navigation and screen reader support
- **Touch Friendly**: Optimized for both mouse and touch interactions
- **Visual Feedback**: Subtle hover effects and scale animations
- **Customizable Theming**: CSS custom properties for easy customization

## Component Architecture

The `ScClockPicker` is built using a modular architecture with 9 individual components:

### Core Components

1. **`ScClockPickerDisplay`** - Wrapper for the time display section
2. **`ScClockPickerTime`** - Container for time parts and period
3. **`ScClockPickerTimePart`** - Individual time part buttons (hours/minutes)
4. **`ScClockPickerSeparator`** - Colon separator between time parts
5. **`ScClockPickerPeriod`** - Container for AM/PM period buttons
6. **`ScClockPickerFace`** - Clock face with click handling and aria support
7. **`ScClockPickerNumber`** - Individual number buttons on the clock face
8. **`ScClockPickerHand`** - Clock hand with drag functionality
9. **`ScClockPickerPeriodButton`** - Individual AM/PM buttons

### Benefits of Modular Design

- **Reusability**: Each component can be used independently
- **Maintainability**: Smaller, focused components are easier to test and maintain
- **Customization**: Individual components can be styled or replaced
- **Separation of Concerns**: Each component handles its own styling, logic, and accessibility

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

### Basic Usage

#### 12-Hour Format

```html
<div [(value)]="time12h" sc-clock-picker format="12h"></div>
```

#### 24-Hour Format

```html
<div [(value)]="time24h" sc-clock-picker format="24h"></div>
```

#### Disabled State

```html
<div [(value)]="time" [disabled]="true" sc-clock-picker></div>
```

### Advanced Usage with Custom Components

Since the clock-picker is built with modular components, you can also compose custom layouts:

```html
<!-- Custom layout with separate time display -->
<div class="custom-time-picker">
  <!-- Standalone time display -->
  <div sc-clock-picker-display>
    <div sc-clock-picker-time>
      <button sc-clock-picker-time-part [active]="true" [value]="14">14</button>
      <span sc-clock-picker-separator>:</span>
      <button sc-clock-picker-time-part [active]="false" [value]="30">30</button>
    </div>
  </div>

  <!-- Standalone clock face -->
  <div sc-clock-picker-face>
    <button sc-clock-picker-number [value]="12" [x]="124" [y]="24" [selected]="true">12</button>
    <!-- More numbers... -->
    <sc-clock-picker-hand [angle]="90" [isDragging]="false"></sc-clock-picker-hand>
  </div>
</div>
```

### Component Structure in Template

The main `ScClockPicker` template structure uses:

```html
<div sc-clock-picker [class]="rootClass()">
  <div sc-clock-picker-display>
    <div sc-clock-picker-time>
      <button sc-clock-picker-time-part>{{ hours }}</button>
      <span sc-clock-picker-separator>:</span>
      <button sc-clock-picker-time-part>{{ minutes }}</button>
      <div sc-clock-picker-period>
        <button sc-clock-picker-period-button>AM</button>
        <button sc-clock-picker-period-button>PM</button>
      </div>
    </div>
  </div>

  <div sc-clock-picker-face>
    <button sc-clock-picker-number *ngFor="...">{{ number }}</button>
    <sc-clock-picker-hand [angle]="angle" [isDragging]="isDragging"></sc-clock-picker-hand>
  </div>
</div>
```

## Individual Component APIs

### ScClockPickerTimePart

```typescript
// Inputs
value: string | number; // Time value to display
active: boolean; // Whether this part is currently selected
ariaLabel: string; // Accessibility label
ariaSelected: boolean; // Accessibility selected state

// Outputs
clicked: EventEmitter<void>; // When clicked
keyPressed: EventEmitter<KeyboardEvent>; // When key is pressed
```

### ScClockPickerNumber

```typescript
// Inputs
value: number; // The number value (0-59 for minutes, 1-12/0-23 for hours)
x: number; // X position on clock face
y: number; // Y position on clock face
selected: boolean; // Whether this number is selected

// Outputs
clicked: EventEmitter<number>; // When clicked, emits the number value
```

### ScClockPickerHand

```typescript
// Inputs
angle: number; // Rotation angle in degrees
isDragging: boolean; // Whether currently being dragged
ariaLabel: string; // Accessibility label
valueMin: number; // Minimum value for accessibility
valueMax: number; // Maximum value for accessibility
valueNow: number; // Current value for accessibility
valueText: string; // Current value text for accessibility

// Outputs
dragStarted: EventEmitter<MouseEvent | TouchEvent>; // When drag starts
```

### ScClockPickerFace

```typescript
// Inputs
ariaLabel: string; // Accessibility label
tabindex: number; // Tab index for keyboard navigation

// Outputs
keyPressed: EventEmitter<KeyboardEvent>; // When key is pressed
faceClicked: EventEmitter<{
  // When face is clicked
  clientX: number;
  clientY: number;
  rect: DOMRect;
}>;
```

### ScClockPickerPeriodButton

```typescript
// Inputs
period: 'AM' | 'PM'; // The period this button represents
active: boolean; // Whether this period is selected
disabled: boolean; // Whether the button is disabled
ariaLabel: string; // Accessibility label

// Outputs
clicked: EventEmitter<'AM' | 'PM'>; // When clicked
keyPressed: EventEmitter<{
  // When key is pressed
  event: KeyboardEvent;
  period: 'AM' | 'PM';
}>;
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
