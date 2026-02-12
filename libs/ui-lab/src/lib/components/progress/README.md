# Progress

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

## Components

- `ScProgress` - The progress bar component with value and max inputs

## Usage

```html
<div sc-progress [value]="33"></div>
```

## With Custom Max

```html
<div sc-progress [value]="50" [max]="200"></div>
```

## With Signal Forms

ScProgress implements `FormValueControl<number | null>` and can be used to visualize form completion:

```typescript
import { signal, computed } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';

readonly formModel = signal({ name: '', email: '', bio: '' });
readonly myForm = form(this.formModel);

// Calculate completion percentage
readonly completionPercentage = computed(() => {
  const data = this.formModel();
  const fields = [data.name, data.email, data.bio];
  const filledFields = fields.filter(f => f.trim().length > 0).length;
  return Math.round((filledFields / fields.length) * 100);
});
```

```html
<div sc-progress [value]="completionPercentage()"></div>
```

Note: While progress implements `FormValueControl`, it's typically used to display computed values rather than being directly bound with `[formField]`. When using `[formField]`, you cannot use other property bindings like `[value]` or `[max]` on the same element.

## Custom Styling

Override the default height or width:

```html
<div sc-progress [value]="66" class="h-4 w-[60%]"></div>
```

## Inputs

| Input   | Type                  | Default | Description            |
| ------- | --------------------- | ------- | ---------------------- |
| `value` | `number \| null`      | `null`  | Current progress value |
| `max`   | `number \| undefined` | `100`   | Maximum value          |
| `class` | `string`              | `''`    | Additional CSS classes |

## States

The component exposes a `data-state` attribute:

- `indeterminate` - When value is null
- `loading` - When value is less than max
- `complete` - When value equals or exceeds max

## Accessibility

- Uses `role="progressbar"` for screen readers
- Proper `aria-valuemin`, `aria-valuemax`, and `aria-valuenow` attributes
- State is communicated via `data-state` attribute
