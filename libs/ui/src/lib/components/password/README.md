# Password

A composable password input with visibility toggle, built on top of `ScField` and `ScInputGroup`.

## Architecture

- **ScPasswordProvider**: Provides visibility toggle context (`display: contents`, no layout impact)
- **ScPasswordInput**: The password input field (auto-switches between password/text type)
- **ScPasswordToggle**: Button to toggle password visibility
- **ScPasswordStrength**: Password strength indicator
- **ScPasswordRequirements**: Password requirements checklist

`ScPasswordProvider` is not a field — it must be used inside a `ScField`.

## Basic Usage

```html
<div scField class="space-y-2">
  <label scLabel>Password</label>
  <div scPasswordProvider>
    <div scInputGroup>
      <input scPasswordInput [formField]="form.password" placeholder="Enter password" />
      <div scInputGroupAddon align="inline-end">
        <button scPasswordToggle>
          <span class="sr-only">Toggle password visibility</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

## Components

### ScPasswordProvider

Provider directive that manages visibility state. Uses `display: contents` so it has no effect on layout.

**Selector:** `div[scPasswordProvider]`
**Export As:** `scPasswordProvider`

**Two-way Bindings:**

| Binding   | Type      | Default | Description      |
| --------- | --------- | ------- | ---------------- |
| `visible` | `boolean` | `false` | Visibility state |

### ScPasswordInput

The password input field.

**Selector:** `input[scPasswordInput]`

**Features:**

- Auto-switches between password/text type based on visibility
- Supports `[formField]` for Signal Forms integration
- Inherits `id` and `aria-describedby` from parent `ScField`

### ScPasswordToggle

Button to toggle password visibility.

**Selector:** `button[scPasswordToggle]`

**Features:**

- `aria-pressed` reflects visibility state
- Custom icon support via content projection
- Use `<span class="sr-only">` for accessible label

### ScPasswordStrength

Purely presentational password strength indicator. The consumer computes the strength score and passes it in.

**Selector:** `div[scPasswordStrength]`
**Export As:** `scPasswordStrength`

**Inputs:**

| Input      | Type     | Default | Description                               |
| ---------- | -------- | ------- | ----------------------------------------- |
| `strength` | `number` | `0`     | Strength score (0–4) computed by consumer |

### ScPasswordRequirements

Password requirements checklist.

**Selector:** `[scPasswordRequirements]`

**Inputs:**

| Input          | Type                      | Default              | Description         |
| -------------- | ------------------------- | -------------------- | ------------------- |
| `value`        | `string`                  | `''`                 | Password value      |
| `requirements` | `ScPasswordRequirement[]` | Default requirements | Custom requirements |

## Examples

### Show by Default

```html
<div scField class="space-y-2">
  <label scLabel>API Key</label>
  <div scPasswordProvider [(visible)]="visible">
    <div scInputGroup>
      <input scPasswordInput value="sk-1234567890abcdef" />
      <div scInputGroupAddon align="inline-end">
        <button scPasswordToggle>
          <span class="sr-only">Toggle visibility</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

### Disabled

```html
<div scField class="space-y-2">
  <label scLabel>Password (Disabled)</label>
  <div scPasswordProvider>
    <div scInputGroup>
      <input scPasswordInput value="********" disabled />
      <div scInputGroupAddon align="inline-end">
        <button scPasswordToggle>
          <span class="sr-only">Toggle visibility</span>
        </button>
      </div>
    </div>
  </div>
</div>
```

### With Strength Indicator

```html
<div scField class="space-y-2">
  <label scLabel>Password</label>
  <div scPasswordProvider>
    <div scInputGroup>
      <input scPasswordInput [formField]="form.password" autocomplete="new-password" />
      <div scInputGroupAddon align="inline-end">
        <button scPasswordToggle>
          <span class="sr-only">Toggle visibility</span>
        </button>
      </div>
    </div>
  </div>
  <div scPasswordStrength [strength]="strength()"></div>
</div>
```

### With zxcvbn

Since `ScPasswordStrength` is purely presentational, you can use any scoring algorithm. Here's an example using [zxcvbn](https://github.com/dropbox/zxcvbn):

```typescript
import zxcvbn from 'zxcvbn';

// zxcvbn returns a score from 0–4, which maps directly to the strength input
readonly strength = computed(() => {
  const password = this.formModel().password;
  if (!password) return 0;
  return zxcvbn(password).score;
});
```

```html
<div scPasswordStrength [strength]="strength()">
  <div class="flex gap-1">
    @for (i of [0, 1, 2, 3]; track i) {
    <div scPasswordStrengthBar [index]="i"></div>
    }
  </div>
  <p scPasswordStrengthLabel>{{ strengthLabels[strength()] }}</p>
</div>
```

## Component Communication

Components communicate through the `SC_PASSWORD_PROVIDER` injection token:

```typescript
export const SC_PASSWORD_PROVIDER = new InjectionToken<ScPasswordProvider>('SC_PASSWORD_PROVIDER');
```

Child components inject the provider to access:

- Visibility state
- Toggle method
