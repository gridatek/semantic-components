# Password Field

A composable password input component with visibility toggle and optional strength indicator.

## Architecture

The Password Field component follows a composable pattern with multiple sub-components:

- **ScPasswordField**: Root container that manages state and provides context
- **ScPasswordFieldInputGroup**: Container for input and toggle button
- **ScPasswordFieldInput**: The password input field
- **ScPasswordFieldToggle**: Button to toggle password visibility

## Basic Usage

```html
<div sc-password-field [(value)]="password">
  <div sc-password-field-input-group>
    <input sc-password-field-input placeholder="Enter password" />
    <button sc-password-field-toggle></button>
  </div>
</div>
```

## Components

### ScPasswordField

Root container directive that manages the password state and visibility.

**Selector:** `[sc-password-field]`

**Inputs:**

| Input           | Type      | Default | Description              |
| --------------- | --------- | ------- | ------------------------ |
| `disabled`      | `boolean` | `false` | Disabled state           |
| `showByDefault` | `boolean` | `false` | Show password by default |

**Two-way Bindings:**

| Binding | Type     | Default | Description   |
| ------- | -------- | ------- | ------------- |
| `value` | `string` | `''`    | Current value |

**Outputs:**

| Output             | Type      | Description                     |
| ------------------ | --------- | ------------------------------- |
| `valueChange`      | `string`  | Emitted when value changes      |
| `visibilityChange` | `boolean` | Emitted when visibility toggles |

### ScPasswordFieldInputGroup

Container for grouping the input field with the toggle button.

**Selector:** `[sc-password-field-input-group]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScPasswordFieldInput

The password input field.

**Selector:** `input[sc-password-field-input]`

**Features:**

- Auto-switches between password/text type
- Supports placeholder, autocomplete
- Respects disabled/readonly states

**Inputs:**

| Input          | Type      | Default              | Description            |
| -------------- | --------- | -------------------- | ---------------------- |
| `placeholder`  | `string`  | `''`                 | Placeholder text       |
| `readonly`     | `boolean` | `false`              | Readonly state         |
| `autocomplete` | `string`  | `'current-password'` | Autocomplete attribute |
| `class`        | `string`  | `''`                 | Additional CSS classes |

### ScPasswordFieldToggle

Button to toggle password visibility.

**Selector:** `button[sc-password-field-toggle]`

**Features:**

- Auto-disables when field is disabled
- Shows eye/eye-off icons
- Custom icon support via content projection
- Keyboard accessible

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Examples

### Basic

```html
<div sc-password-field [(value)]="password">
  <div sc-password-field-input-group>
    <input sc-password-field-input placeholder="Enter password" />
    <button sc-password-field-toggle></button>
  </div>
</div>
```

### With Label

```html
<div class="space-y-2">
  <label sc-label for="password">Password</label>
  <div sc-password-field [(value)]="password">
    <div sc-password-field-input-group>
      <input sc-password-field-input id="password" placeholder="Enter password" />
      <button sc-password-field-toggle></button>
    </div>
  </div>
</div>
```

### Show by Default

```html
<div sc-password-field [(value)]="password" [showByDefault]="true">
  <div sc-password-field-input-group>
    <input sc-password-field-input placeholder="API Key" />
    <button sc-password-field-toggle></button>
  </div>
</div>
```

### Disabled

```html
<div sc-password-field [value]="'********'" [disabled]="true">
  <div sc-password-field-input-group>
    <input sc-password-field-input />
    <button sc-password-field-toggle></button>
  </div>
</div>
```

### New Password

```html
<div sc-password-field [(value)]="newPassword">
  <div sc-password-field-input-group>
    <input sc-password-field-input placeholder="New password" autocomplete="new-password" />
    <button sc-password-field-toggle></button>
  </div>
</div>
```

### Custom Icons

```html
<div sc-password-field [(value)]="password">
  <div sc-password-field-input-group>
    <input sc-password-field-input />
    <button sc-password-field-toggle>
      <!-- Custom icon content -->
      @if (visible()) {
      <span>Hide</span>
      } @else {
      <span>Show</span>
      }
    </button>
  </div>
</div>
```

### With Description

```html
<div class="space-y-2">
  <label sc-label>Password</label>
  <div sc-password-field [(value)]="password">
    <div sc-password-field-input-group>
      <input sc-password-field-input />
      <button sc-password-field-toggle></button>
    </div>
  </div>
  <p class="text-sm text-muted-foreground">Must be at least 8 characters</p>
</div>
```

## Features

- **Visibility Toggle**: Show/hide password text
- **Disabled State**: Full disabled support across all sub-components
- **Autocomplete Support**: Proper autocomplete attributes
- **Two-way Binding**: Sync with `[(value)]`
- **Composable**: Mix and match sub-components as needed
- **Accessible**: Proper ARIA labels and keyboard support

## Accessibility

- Proper `aria-label` on toggle button
- `aria-pressed` state on toggle button
- Labels properly associated with inputs
- Disabled states properly communicated
- Focus management within component
- Screen reader friendly announcements

## Styling

All components accept a `class` input for custom styling. Default styles provide:

- Consistent border and spacing
- Focus states with ring
- Hover states on toggle button
- Disabled state opacity
- Proper positioning for toggle button

## Component Communication

Components communicate through the `SC_PASSWORD_FIELD` injection token:

```typescript
export const SC_PASSWORD_FIELD = new InjectionToken<ScPasswordField>('SC_PASSWORD_FIELD');
```

Child components inject the parent context to access:

- Current value
- Visibility state
- Disabled state
- Toggle methods

## Best Practices

1. **Always provide a label** for accessibility
2. **Use appropriate autocomplete** values (current-password, new-password)
3. **Add password requirements** in description text
4. **Consider password strength** indicators for new passwords
5. **Test keyboard navigation** to ensure accessibility
