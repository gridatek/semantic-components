# @semantic-components/timezone

A timezone picker component built on top of the semantic components UI library. Provides an accessible, searchable dropdown for selecting timezones with localized labels and automatic browser timezone detection.

## Features

- 🌍 **Comprehensive timezone support** - Uses `Intl.DateTimeFormat` with fallback list
- 🔍 **Search and filter** - Built-in filtering by timezone name or ID
- 🎯 **Auto-detection** - Automatically selects user's browser timezone
- 🌐 **Localization** - Supports localized timezone labels and offsets
- ♿ **Accessibility** - Full keyboard navigation and screen reader support
- 📱 **Responsive** - Works seamlessly across different screen sizes
- 🎨 **Design system integration** - Uses your existing UI component library

## Installation

```bash
npm install @semantic-components/timezone
```

## Basic Usage

```typescript
import { ScTimezonePicker } from '@semantic-components/timezone';
import { ScField, ScLabel } from '@semantic-components/ui';

@Component({
  imports: [ScTimezonePicker, ScField, ScLabel],
  template: `
    <div sc-field>
      <label sc-label>Timezone</label>
      <sc-timezone-picker placeholder="Select your timezone" />
    </div>
  `,
})
export class MyComponent {}
```

## Form Integration

```typescript
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [ScTimezonePicker, ReactiveFormsModule],
  template: `
    <sc-timezone-picker [formControl]="timezoneControl" placeholder="Choose your timezone" />
  `,
})
export class MyComponent {
  timezoneControl = new FormControl('America/New_York');
}
```

## API Reference

### ScTimezonePicker

| Input         | Type     | Default             | Description                          |
| ------------- | -------- | ------------------- | ------------------------------------ |
| `placeholder` | `string` | `'Select timezone'` | Placeholder text for the input       |
| `locale`      | `string` | Browser locale      | Locale for timezone label formatting |

### Events

| Event             | Type     | Description                             |
| ----------------- | -------- | --------------------------------------- |
| `selectionChange` | `string` | Emitted when timezone selection changes |

### Form Control Support

The component implements `ControlValueAccessor` and works seamlessly with Angular reactive forms:

```typescript
// Get selected timezone
const selectedTimezone = this.timezoneControl.value; // e.g., 'America/New_York'

// Set timezone programmatically
this.timezoneControl.setValue('Europe/London');

// Listen to changes
this.timezoneControl.valueChanges.subscribe((timezone) => {
  console.log('Selected timezone:', timezone);
});
```

## Advanced Examples

### With Custom Locale

```typescript
@Component({
  template: `
    <sc-timezone-picker
      placeholder="Choisissez un fuseau horaire"
      locale="fr"
    />
  `
})
```

### In a Form with Validation

```typescript
import { Validators } from '@angular/forms';

@Component({
  template: `
    <div sc-field>
      <label sc-label>Timezone *</label>
      <sc-timezone-picker [formControl]="timezoneControl" placeholder="Select timezone" />
      @if (timezoneControl.invalid && timezoneControl.touched) {
        <div sc-field-error-message>Timezone is required</div>
      }
    </div>
  `,
})
export class MyComponent {
  timezoneControl = new FormControl('', [Validators.required]);
}
```

### Displaying Selected Value

```typescript
@Component({
  template: `
    <sc-timezone-picker [formControl]="timezoneControl" />
    <p>Selected: {{ timezoneControl.value || 'None' }}</p>
  `,
})
export class MyComponent {
  timezoneControl = new FormControl('');
}
```

## Timezone Format

The component displays timezones in the format:

```
(GMT+02:00) Berlin
(GMT-05:00) New York
(GMT+09:00) Tokyo
```

- **Offset**: Localized GMT offset (e.g., GMT+02:00)
- **City**: Human-readable city name extracted from timezone ID
- **Subtitle**: Full timezone ID (e.g., Europe/Berlin) shown as secondary text

## Browser Compatibility

- **Modern browsers**: Full support including `Intl.supportedValuesOf`
- **Older browsers**: Graceful fallback to curated timezone list
- **Localization**: Uses `Intl.DateTimeFormat` for timezone offset formatting

## Architecture

The timezone picker is built on top of:

- **ScCombobox** - Provides search, filtering, and accessibility
- **TimezoneService** - Handles timezone data loading and formatting
- **Angular Signals** - Modern reactive state management
- **ControlValueAccessor** - Standard Angular form integration

## Development

### Building

```bash
nx build timezone
```

### Testing

```bash
nx test timezone
```

### Linting

```bash
nx lint timezone
```

## Dependencies

### Peer Dependencies

- `@angular/common ^20.3.0`
- `@angular/core ^20.3.0`
- `@angular/forms ^20.3.0`
- `@semantic-components/ui *`
- `rxjs ^7.8.0`

### Features Provided by UI Library

- Accessibility (ARIA support, keyboard navigation)
- Search and filtering
- Responsive design
- Loading states
- Error handling
- Consistent styling

## License

This library follows the same license as the parent semantic-components project.
