# Avoiding ngModel: Signal-Based Alternatives

This guide shows how to replace `ngModel` and `FormsModule` with native event binding and Angular signals.

## Why Avoid ngModel?

- Reduces bundle size (no `FormsModule` needed)
- Better performance with signals
- More explicit data flow
- Aligns with Angular's signal-based future

## Quick Reference

| Input Type | ngModel Approach         | Signal Alternative                   |
| ---------- | ------------------------ | ------------------------------------ |
| Text Input | `[(ngModel)]="value"`    | `[value]="value()"` + `(input)`      |
| Checkbox   | `[(ngModel)]="checked"`  | `[checked]="checked()"` + `(change)` |
| Select     | `[(ngModel)]="selected"` | `[value]="selected()"` + `(change)`  |
| Textarea   | `[(ngModel)]="text"`     | `[value]="text()"` + `(input)`       |

---

## Examples

### Text Input

**Before (ngModel):**

```typescript
import { FormsModule } from '@angular/forms';

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

**After (Signals):**

```typescript
import { signal } from '@angular/core';

@Component({
  template: `
    <input [value]="name()" (input)="name.set($any($event.target).value)" />
  `,
})
export class MyComponent {
  readonly name = signal('');
}
```

---

### Checkbox

**Before (ngModel):**

```typescript
@Component({
  imports: [FormsModule],
  template: `
    <input type="checkbox" [(ngModel)]="enabled" />
  `,
})
export class MyComponent {
  enabled = false;
}
```

**After (Signals):**

```typescript
@Component({
  template: `
    <input type="checkbox" [checked]="enabled()" (change)="enabled.set($any($event.target).checked)" />
  `,
})
export class MyComponent {
  readonly enabled = signal(false);
}
```

---

### Select Dropdown

**Before (ngModel):**

```typescript
@Component({
  imports: [FormsModule],
  template: `
    <select [(ngModel)]="selectedLanguage">
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  `,
})
export class MyComponent {
  selectedLanguage = 'en';
}
```

**After (Signals):**

```typescript
@Component({
  template: `
    <select [value]="selectedLanguage()" (change)="selectedLanguage.set($any($event.target).value)">
      <option value="en">English</option>
      <option value="es">Spanish</option>
    </select>
  `,
})
export class MyComponent {
  readonly selectedLanguage = signal('en');
}
```

---

### Textarea

**Before (ngModel):**

```typescript
@Component({
  imports: [FormsModule],
  template: `
    <textarea [(ngModel)]="bio"></textarea>
  `,
})
export class MyComponent {
  bio = '';
}
```

**After (Signals):**

```typescript
@Component({
  template: `
    <textarea [value]="bio()" (input)="bio.set($any($event.target).value)"></textarea>
  `,
})
export class MyComponent {
  readonly bio = signal('');
}
```

---

## For Forms with Validation

Use **Angular Signal Forms** instead of Reactive Forms:

```typescript
import { signal } from '@angular/core';
import { form, FormField, required, email } from '@angular/forms/signals';

@Component({
  imports: [FormField],
  template: `
    <form (ngSubmit)="onSubmit()">
      <input [formField]="loginForm.email" type="email" />
      <input [formField]="loginForm.password" type="password" />
      <button type="submit">Login</button>
    </form>
  `,
})
export class LoginComponent {
  private readonly model = signal({ email: '', password: '' });

  readonly loginForm = form(this.model, (path) => {
    required(path.email);
    email(path.email);
    required(path.password);
  });

  onSubmit() {
    console.log(this.model());
  }
}
```

See the [Signal Forms documentation](https://angular.dev/guide/forms/signals/overview) for more details.
