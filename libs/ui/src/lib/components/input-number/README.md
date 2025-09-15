# Input Number Component

## Design Decision: Text Input with Numeric Input Mode

This component uses `<input type="text" inputmode="numeric">` instead of `<input type="number">` for better accessibility and user experience.

### Why Text + InputMode Instead of Number Input?

#### Accessibility Benefits

- **Screen Reader Compatibility**: Text inputs are handled more consistently by screen readers and assistive technologies
- **Predictable Behavior**: Avoids browser-specific quirks and inconsistencies with number inputs
- **Better Validation Control**: Custom validation provides clearer error messaging

#### User Experience Benefits

- **Mobile Keyboards**: `inputmode="numeric"` shows the numeric keyboard on mobile without spinner controls
- **No Browser Spinners**: Eliminates unwanted browser UI that can interfere with custom controls
- **Consistent Styling**: Text inputs are easier to style consistently across browsers

#### Technical Benefits

- **Custom Validation**: Full control over input validation and formatting
- **Flexible Input Handling**: Can handle partial inputs gracefully (e.g., "-", ".")
- **Better Error States**: More granular control over error handling and display

### Implementation Details

The component maintains all number input functionality:

- Min/max validation through `clampValue()` method
- Step operations for increment/decrement
- Precision handling for decimal places
- Keyboard navigation (Arrow keys, Page Up/Down)
- Input sanitization and validation

### Usage

```html
<div
  sc-input-number
  [(value)]="numberValue"
  [min]="0"
  [max]="100"
  [step]="1"
  [precision]="2"
  [showControls]="true"
></div>
```

This approach follows modern accessibility guidelines while maintaining full numeric input functionality.
