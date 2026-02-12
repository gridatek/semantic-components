# ID Generation

This document explains how field components auto-generate IDs and provide them to children, so consumers can compose without manually wiring `id` and `for` attributes.

## The Problem

Connecting a `<label>` to its control requires matching `id` and `for` attributes:

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox id="terms" />
  <label sc-label for="terms">Accept terms</label>
</div>
```

This is tedious, error-prone, and creates maintenance overhead — especially when multiple fields exist on the same page.

## The Solution

Field components auto-generate an ID and share it with their children via the `SC_FIELD` token. Labels read this token automatically. No manual `id` or `for` needed:

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox />
  <label sc-label>Accept terms</label>
</div>
```

The generated DOM:

```html
<div sc-checkbox-field>
  <input type="checkbox" id="sc-checkbox-field-0" />
  <label for="sc-checkbox-field-0">Accept terms</label>
</div>
```

## How It Works

### 1. Field Generates an ID

Each field component generates a unique ID using Angular CDK's `_IdGenerator` and provides it via the `SC_FIELD` token:

```typescript
// checkbox-field.ts
@Component({
  providers: [{ provide: SC_FIELD, useExisting: ScCheckboxField }],
})
export class ScCheckboxField {
  readonly id = input(inject(_IdGenerator).getId('sc-checkbox-field-'));
}
```

The `id` is an `input()` — it defaults to an auto-generated value but consumers can override it.

### 2. Control Reads the Field's ID

The control (e.g. `ScCheckbox`) injects the field context optionally and uses the field's ID as its default:

```typescript
// checkbox.ts
export class ScCheckbox {
  private readonly checkboxField = inject(SC_CHECKBOX_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-checkbox-');

  readonly idInput = input('', { alias: 'id' });

  // Priority: explicit id > field's id > own fallback id
  readonly id = computed(() => this.idInput() || this.checkboxField?.id() || this.fallbackId);
}
```

### 3. Label Reads the Field's ID

`ScLabel` injects `SC_FIELD` and automatically sets its `for` attribute:

```typescript
// label.ts
export class ScLabel {
  private readonly field = inject(SC_FIELD, { optional: true });

  readonly forInput = input<string>('', { alias: 'for' });

  protected readonly for = computed(() => {
    const forValue = this.forInput() || this.field?.id();
    return forValue || null;
  });
}
```

### The Full Chain

```
ScCheckboxField
  │
  ├─ generates id: "sc-checkbox-field-0"
  ├─ provides SC_FIELD  ──────────────────────► ScLabel reads SC_FIELD
  │                                                  └─ sets for="sc-checkbox-field-0"
  └─ provides SC_CHECKBOX_FIELD ─► ScCheckbox reads id
                                     └─ sets id="sc-checkbox-field-0"
```

Both the `<input>` and the `<label>` point to the same ID without any manual wiring.

## ID Resolution Priority

### Control (e.g. ScCheckbox)

| Priority         | Source                             | Example               |
| ---------------- | ---------------------------------- | --------------------- |
| 1. Explicit `id` | Consumer sets `id="terms"`         | `terms`               |
| 2. Field's ID    | From parent field component        | `sc-checkbox-field-0` |
| 3. Fallback      | Own auto-generated ID (standalone) | `sc-checkbox-1`       |

### Label (ScLabel)

| Priority          | Source                      | Example               |
| ----------------- | --------------------------- | --------------------- |
| 1. Explicit `for` | Consumer sets `for="terms"` | `terms`               |
| 2. Field's ID     | From `SC_FIELD` token       | `sc-checkbox-field-0` |

## Consumer Override

Consumers can override the auto-generated ID at the field level:

```html
<div sc-checkbox-field id="accept-terms">
  <input type="checkbox" sc-checkbox />
  <label sc-label>Accept terms</label>
</div>
```

Both the input and label will use `accept-terms`.

Or override at the control level for full manual control:

```html
<div sc-checkbox-field>
  <input type="checkbox" sc-checkbox id="my-checkbox" />
  <label sc-label for="my-checkbox">Accept terms</label>
</div>
```

## The SC_FIELD Token

```typescript
// field.ts
export interface ScFieldContext {
  id: () => string;
}

export const SC_FIELD = new InjectionToken<ScFieldContext>('SC_FIELD');
```

A minimal interface with a single `id` method. Any field component that provides `SC_FIELD` automatically connects to `ScLabel`.

Each field also provides its own specific token (e.g. `SC_CHECKBOX_FIELD`, `SC_PASSWORD_FIELD`, `SC_NUMBER_FIELD`) for domain-specific children that need more than just `id`.

## Implementing for New Field Components

Every field component should:

1. **Generate an ID** using `_IdGenerator` with a descriptive prefix
2. **Provide `SC_FIELD`** so labels auto-connect
3. **Expose the ID** to child controls via its own context token

```typescript
@Component({
  selector: '[sc-my-field]',
  providers: [
    { provide: SC_MY_FIELD, useExisting: ScMyField },
    { provide: SC_FIELD, useExisting: ScMyField },
  ],
})
export class ScMyField {
  readonly id = input(inject(_IdGenerator).getId('sc-my-field-'));
}
```

The child control reads the field's ID as its default:

```typescript
@Directive({
  selector: 'input[sc-my-input]',
  host: { '[id]': 'id()' },
})
export class ScMyInput {
  private readonly field = inject(SC_MY_FIELD, { optional: true });
  private readonly fallbackId = inject(_IdGenerator).getId('sc-my-input-');

  readonly idInput = input('', { alias: 'id' });

  readonly id = computed(() => this.idInput() || this.field?.id() || this.fallbackId);
}
```

This ensures that `ScLabel` works with any field component without extra configuration from the consumer.
