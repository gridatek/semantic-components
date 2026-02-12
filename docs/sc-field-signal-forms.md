# ScField + Signal Forms Integration

This document explains how `ScField`, `ScInput`, and `ScTextarea` integrate with Angular Signal Forms to automatically reflect form state (invalid, disabled) without manual wiring.

## Overview

The architecture has two layers:

1. **ScField** (container) — reads `FormField` from content children via `contentChild(FormField)`, sets `data-invalid` and `data-disabled` on the wrapper to style labels, descriptions, etc.
2. **ScInput / ScTextarea** (form controls) — inject `FormField` directly from their own element injector, set `aria-invalid` and native `disabled` on the control itself.

Both layers read from the same Signal Forms state, but use different HTML attributes appropriate to their role.

## Attribute Strategy

| Component           | Invalid attribute | Disabled attribute | Why                                          |
| ------------------- | ----------------- | ------------------ | -------------------------------------------- |
| `ScField` (wrapper) | `data-invalid`    | `data-disabled`    | Container div, uses `data-*` for Tailwind    |
| `ScInput` (control) | `aria-invalid`    | `disabled`         | Native form control, uses standard HTML/ARIA |
| `ScTextarea`        | `aria-invalid`    | `disabled`         | Native form control, uses standard HTML/ARIA |

### Why this split?

- **`aria-invalid`** on form controls — standard ARIA attribute, matches `aria-invalid:` Tailwind selectors, accessible to screen readers.
- **`disabled`** on form controls — native HTML attribute, matches `:disabled` CSS pseudo-class (`disabled:` Tailwind), prevents user interaction.
- **`data-invalid` / `data-disabled`** on the wrapper — the container is a `<div>`, not a form control. `data-*` attributes are the correct approach for styling descendants (e.g. `data-[invalid=true]:text-destructive` turns the label red).

## How ScField Detects Form State

`ScField` uses `contentChild(FormField)` to query for the `FormField` directive in its content:

```typescript
@Directive({
  selector: '[sc-field]',
  host: {
    '[attr.data-invalid]': 'invalid()',
    '[attr.data-disabled]': 'disabled()',
  },
})
export class ScField {
  readonly invalidInput = input<boolean>(false, { alias: 'invalid' });
  readonly disabledInput = input<boolean>(false, { alias: 'disabled' });

  private readonly formFieldDirective = contentChild(FormField);

  readonly invalid = computed(() => {
    if (this.invalidInput()) return true;
    return this.formFieldDirective()?.state().invalid() ?? false;
  });

  readonly disabled = computed(() => {
    if (this.disabledInput()) return true;
    return this.formFieldDirective()?.state().disabled() ?? false;
  });
}
```

Priority: manual `[invalid]`/`[disabled]` inputs override Signal Forms state.

## How ScInput / ScTextarea Detect Form State

These inject `FormField` directly since `[formField]` lives on the same host element:

```typescript
@Directive({
  selector: 'input[sc-input]',
  host: {
    '[attr.aria-invalid]': 'invalid() || null',
    '[attr.disabled]': 'disabled() || null',
  },
})
export class ScInput {
  private readonly formField = inject(FormField, { optional: true });

  readonly invalid = computed(() => this.formField?.state().invalid() ?? false);
  readonly disabled = computed(() => this.formField?.state().disabled() ?? false);
}
```

The `|| null` ensures the attribute is removed entirely when `false` (not set to `"false"`).

## Usage

### Basic field with validation and errors

```html
<div sc-field>
  <label sc-label>Email</label>
  <input sc-input type="email" [formField]="myForm.email" placeholder="Email" />
  @for (error of myForm.email().errors(); track error.kind) {
  <p sc-field-error>{{ error.message }}</p>
  }
</div>
```

```typescript
readonly formModel = signal({ email: '' });
readonly myForm = form(this.formModel, (s) => {
  required(s.email, { message: 'Email is required' });
  email(s.email, { message: 'Please enter a valid email' });
});
```

When the field is invalid:

- The `<div sc-field>` gets `data-invalid="true"` → label turns red via `data-[invalid=true]:text-destructive`
- The `<input>` gets `aria-invalid="true"` → red ring/border via `aria-invalid:ring-destructive/20`
- Error messages render below the input via `sc-field-error` (`role="alert"`, red text)

### Validators with messages

Always pass a `{ message }` option to validators. This keeps error messages in code (localizable) and the template generic:

```typescript
readonly myForm = form(this.formModel, (s) => {
  required(s.name, { message: 'Name is required' });
  required(s.email, { message: 'Email is required' });
  email(s.email, { message: 'Please enter a valid email' });
  maxLength(s.bio, 500, { message: 'Bio must be 500 characters or less' });
});
```

The template pattern is always the same — loop over `errors()` and display `error.message`:

```html
@for (error of myForm.name().errors(); track error.kind) {
<p sc-field-error>{{ error.message }}</p>
}
```

### Disabled field

```html
<div sc-field>
  <label sc-label>Disabled</label>
  <input sc-input type="text" [formField]="myForm.text" placeholder="..." />
</div>
```

```typescript
readonly formModel = signal({ text: '' });
readonly myForm = form(this.formModel, (s) => {
  disabled(s.text);
});
```

When disabled:

- The `<div sc-field>` gets `data-disabled="true"` → label opacity reduced via `group-data-[disabled=true]/field:opacity-50`
- The `<input>` gets native `disabled` → grayed out, non-interactive via `disabled:opacity-50 disabled:cursor-not-allowed`

### Field with description

```html
<div sc-field>
  <label sc-label>Bio</label>
  <textarea sc-textarea [formField]="myForm.bio" placeholder="Tell us about yourself"></textarea>
  <p sc-field-description>Max 500 characters.</p>
  @for (error of myForm.bio().errors(); track error.kind) {
  <p sc-field-error>{{ error.message }}</p>
  }
</div>
```

### Complete form example

```typescript
interface ContactForm {
  name: string;
  email: string;
  message: string;
}

readonly formModel = signal<ContactForm>({ name: '', email: '', message: '' });

readonly contactForm = form(this.formModel, (s) => {
  required(s.name, { message: 'Name is required' });
  required(s.email, { message: 'Email is required' });
  email(s.email, { message: 'Please enter a valid email' });
  required(s.message, { message: 'Message is required' });
  maxLength(s.message, 1000, { message: 'Message must be 1000 characters or less' });
});
```

```html
<div sc-field>
  <label sc-label>Name</label>
  <input sc-input type="text" [formField]="contactForm.name" placeholder="John Doe" />
  @for (error of contactForm.name().errors(); track error.kind) {
  <p sc-field-error>{{ error.message }}</p>
  }
</div>

<div sc-field>
  <label sc-label>Email</label>
  <input sc-input type="email" [formField]="contactForm.email" placeholder="john@example.com" />
  @for (error of contactForm.email().errors(); track error.kind) {
  <p sc-field-error>{{ error.message }}</p>
  }
</div>

<div sc-field>
  <label sc-label>Message</label>
  <textarea sc-textarea [formField]="contactForm.message" placeholder="Your message..."></textarea>
  @for (error of contactForm.message().errors(); track error.kind) {
  <p sc-field-error>{{ error.message }}</p>
  }
</div>
```

### Manual override (no Signal Forms)

ScField can be used without Signal Forms by passing `[invalid]` and `[disabled]` manually:

```html
<div sc-field [invalid]="true">
  <label sc-label>Email</label>
  <input sc-input type="email" placeholder="Email" />
</div>
```

Note: the input won't have `aria-invalid` in this case since there's no `FormField` directive. The manual inputs only affect the field container.

## Auto ID Wiring

`ScField` also provides `SC_FIELD` token for auto ID generation (see `id-generation.md`). No manual `id`/`for` needed:

```html
<!-- Label auto-connects to input via SC_FIELD -->
<div sc-field>
  <label sc-label>Email</label>
  <input sc-input type="email" [formField]="myForm.email" />
</div>
```

Generated DOM:

```html
<div sc-field id="sc-field-0" data-invalid="true">
  <label for="sc-field-0">Email</label>
  <input id="sc-field-0" aria-invalid="true" />
</div>
```

## Refactoring Checklist

When refactoring other field components to follow this pattern:

### For the field container (e.g. `ScMyField`):

1. Add `contentChild(FormField)` to detect Signal Forms state
2. Add `invalidInput` and `disabledInput` inputs as manual overrides
3. Create `invalid` and `disabled` computed signals (manual override > FormField state)
4. Bind `[attr.data-invalid]` and `[attr.data-disabled]` in host

### For the form control (e.g. `ScMyControl`):

1. Add `inject(FormField, { optional: true })` to read form state from same element
2. Create `invalid` computed → `this.formField?.state().invalid() ?? false`
3. Create `disabled` computed → `this.formField?.state().disabled() ?? false`
4. Bind `[attr.aria-invalid]`: `'invalid() || null'` in host
5. Bind `[attr.disabled]`: `'disabled() || null'` in host
6. Ensure CSS uses `aria-invalid:` selectors (not `data-[invalid]`) for the control
7. Ensure CSS uses `disabled:` selectors for disabled styling

### For demos:

1. Wrap controls inside `<div sc-field>` with `<label sc-label>`
2. Use `form()` + `FormField` binding: `[formField]="myForm.fieldName"`
3. Use validators with messages: `required(s.field, { message: '...' })`
4. Display errors in template:
   ```html
   @for (error of myForm.field().errors(); track error.kind) {
   <p sc-field-error>{{ error.message }}</p>
   }
   ```
5. Remove all manual `id`/`for` wiring
