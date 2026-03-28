# Password

A composable password input with visibility toggle, built on top of `ScField` and `ScInputGroup`.

## Architecture

- **ScPasswordProvider**: Provides visibility toggle context (`display: contents`, no layout impact)
- **ScPasswordInput**: The password input field (auto-switches between password/text type)
- **ScPasswordToggle**: Button to toggle password visibility

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

## Component Communication

Components communicate through the `SC_PASSWORD_PROVIDER` injection token:

```typescript
export const SC_PASSWORD_PROVIDER = new InjectionToken<ScPasswordProvider>('SC_PASSWORD_PROVIDER');
```

Child components inject the provider to access:

- Visibility state
- Toggle method
