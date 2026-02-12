# Switch

A control that allows the user to toggle between checked and not checked.

## Components

- `ScSwitch` - Toggle switch with built-in thumb

## Usage

```html
<button sc-switch></button>
```

## With Label

```html
<div class="flex items-center space-x-2">
  <button sc-switch id="airplane-mode"></button>
  <label for="airplane-mode">Airplane Mode</label>
</div>
```

## Two-Way Binding

```typescript
@Component({
  template: `
    <button sc-switch [(checked)]="enabled"></button>
    <p>Switch is {{ enabled() ? 'on' : 'off' }}</p>
  `,
})
export class MyComponent {
  enabled = signal(false);
}
```

## With Signal Forms

ScSwitch implements `FormCheckboxControl` and works seamlessly with Angular Signal Forms:

```typescript
import { signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { required } from '@angular/forms/signals';

readonly formModel = signal({ notifications: true });
readonly myForm = form(this.formModel, (schemaPath) => {
  required(schemaPath.notifications);
});
```

```html
<button sc-switch [formField]="myForm.notifications" id="notifications"></button>
<label for="notifications">Enable notifications</label>
```

Note: Add `FormField` to your component's `imports` array to use the `[formField]` directive. When using `[formField]`, you cannot use other property bindings like `[checked]` on the same element.

## Disabled State

```html
<button sc-switch [disabled]="true"></button>
<button sc-switch [checked]="true" [disabled]="true"></button>
```

## In a Form

```html
<div class="flex items-center justify-between">
  <div class="space-y-0.5">
    <label for="notifications">Notifications</label>
    <p class="text-sm text-muted-foreground">Receive email notifications.</p>
  </div>
  <button sc-switch [(checked)]="notifications" id="notifications"></button>
</div>
```

## Inputs

| Input      | Type      | Default | Description                |
| ---------- | --------- | ------- | -------------------------- |
| `checked`  | `boolean` | `false` | The checked state (model)  |
| `disabled` | `boolean` | `false` | Whether switch is disabled |
| `class`    | `string`  | `''`    | Additional CSS classes     |

## Outputs

| Output          | Type      | Description                      |
| --------------- | --------- | -------------------------------- |
| `checkedChange` | `boolean` | Emits when checked state changes |

## Accessibility

- Uses `role="switch"` for screen readers
- `aria-checked` reflects the current state
- Keyboard accessible with Space key to toggle
- Focus ring for keyboard navigation
- Disabled state properly communicated
