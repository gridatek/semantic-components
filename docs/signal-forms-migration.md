# Migrating to Signal Forms

This repository uses **Angular Signal Forms** (`@angular/forms/signals`) exclusively. Template-driven forms (`FormsModule`, `ngModel`) and reactive forms (`ReactiveFormsModule`, `FormControl`, `FormGroup`) are not used anywhere in the codebase and must not be reintroduced.

## Why Signal Forms Only?

- One forms API instead of three — nothing to choose between
- State lives in a plain signal, so `computed()` and `effect()` work on it directly
- Validation, disabled state, touched/dirty state and error messages all come from the same field object
- `ScField`, `ScInput` and `ScTextarea` read Signal Forms state automatically (see [ScField + Signal Forms](./sc-field-signal-forms.md))
- Smaller bundles — `FormsModule` and `ReactiveFormsModule` never get pulled in

## The Core Pattern

Every form is a writable signal holding the model, wrapped by `form()`:

```typescript
import { Component, ViewEncapsulation, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';

@Component({
  selector: 'app-example',
  imports: [FormField],
  template: `
    <input type="text" [formField]="profileForm.name" placeholder="Name" />
  `,
  encapsulation: ViewEncapsulation.None,
})
export class Example {
  readonly formModel = signal({ name: '' });
  readonly profileForm = form(this.formModel);
}
```

Read a field's value with `profileForm.name().value()` and write it with `profileForm.name().value.set('Ada')`. The model signal itself (`formModel()`) always reflects the current value too.

## Quick Reference

| Old API                                           | Signal Forms                                         |
| ------------------------------------------------- | ---------------------------------------------------- |
| `imports: [FormsModule]`                          | `imports: [FormField]`                               |
| `imports: [ReactiveFormsModule]`                  | `imports: [FormField]` (plus `FormRoot` on `<form>`) |
| `[(ngModel)]="name"`                              | `[formField]="myForm.name"`                          |
| `[ngModel]="x()" (ngModelChange)="x.set($event)"` | `[formField]="myForm.x"`                             |
| `new FormControl('', Validators.required)`        | `required(path.name)` inside the `form()` schema     |
| `new FormGroup({ ... })`                          | `form(signal({ ... }))`                              |
| `control.value`                                   | `myForm.name().value()`                              |
| `control.setValue(v)`                             | `myForm.name().value.set(v)`                         |
| `control.invalid`                                 | `myForm.name().invalid()`                            |
| `control.disable()`                               | `disabled(path.name)` inside the `form()` schema     |

Native `<input>`, `<textarea>` and `<select>` elements are all supported by `[formField]` — there is no separate directive per control type.

## Examples

### Text input

**Before (`ngModel`):**

```typescript
@Component({
  imports: [FormsModule],
  template: `
    <input [(ngModel)]="name" />
  `,
})
export class MyComponent {
  name = '';
}
```

**After (Signal Forms):**

```typescript
@Component({
  imports: [FormField],
  template: `
    <input [formField]="myForm.name" />
  `,
})
export class MyComponent {
  readonly formModel = signal({ name: '' });
  readonly myForm = form(this.formModel);
}
```

### Checkbox

```typescript
@Component({
  imports: [FormField],
  template: `
    <input type="checkbox" [formField]="myForm.enabled" />
  `,
})
export class MyComponent {
  readonly formModel = signal({ enabled: false });
  readonly myForm = form(this.formModel);
}
```

### Select

```typescript
@Component({
  imports: [FormField],
  template: `
    <select [formField]="myForm.language">
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  `,
})
export class MyComponent {
  readonly formModel = signal({ language: 'en' });
  readonly myForm = form(this.formModel);
}
```

### Number input

Constraints such as `min`, `max`, `minlength`, `maxlength`, `pattern`, `required` and `disabled` are owned by Signal Forms — setting them as static attributes on a `[formField]` element is a template error (`NG8022`). Declare them in the schema instead and Angular mirrors them onto the DOM:

```typescript
@Component({
  imports: [FormField],
  template: `
    <input type="number" [formField]="myForm.page" />
  `,
})
export class MyComponent {
  readonly formModel = signal({ page: 1 });
  readonly myForm = form(this.formModel, (path) => {
    min(path.page, 1, { message: 'Page must be at least 1' });
  });
}
```

### Validation and errors

Always pass a `{ message }` option so error text stays in code and the template stays generic:

```typescript
import { FormField, FormRoot, email, form, required } from '@angular/forms/signals';

@Component({
  imports: [FormField, FormRoot, ScField, ScFieldErrors, ScInput, ScLabel],
  template: `
    <form [formRoot]="loginForm" (submit)="onSubmit($event)">
      <div scField>
        <label scLabel>Email</label>
        <input scInput type="email" [formField]="loginForm.email" />
        <div scFieldErrors></div>
      </div>
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  readonly formModel = signal({ email: '', password: '' });

  readonly loginForm = form(this.formModel, (path) => {
    required(path.email, { message: 'Email is required' });
    email(path.email, { message: 'Please enter a valid email' });
    required(path.password, { message: 'Password is required' });
  });

  onSubmit(event: Event) {
    event.preventDefault();
    console.log(this.formModel());
  }
}
```

See [ScField + Signal Forms](./sc-field-signal-forms.md) for how `ScField`, `ScInput` and `ScTextarea` pick up invalid/disabled state automatically, and the [Signal Forms documentation](https://angular.dev/guide/forms/signals/overview) for the full API.

## Bindings That Are Not Forms

Signal Forms covers form state. Component inputs that happen to be two-way (`model()` inputs such as `[(value)]` on `ScComboboxSearchInput`) are plain signal bindings and need no forms import at all:

```html
<input scComboboxSearchInput [(value)]="searchString" />
```

```typescript
readonly searchString = signal('');
```
