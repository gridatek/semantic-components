# Password

A composable password input component with visibility toggle and optional strength indicator.

## Architecture

The Password component follows a composable pattern with multiple sub-components:

- **ScPassword**: Root container that manages state and provides context
- **ScPasswordInputGroup**: Container for input and toggle button
- **ScPasswordInput**: The password input field
- **ScPasswordToggle**: Button to toggle password visibility

## Basic Usage

```html
<div scPassword [(value)]="password">
  <div scPasswordInputGroup>
    <input scPasswordInput placeholder="Enter password" />
    <button scPasswordToggle></button>
  </div>
</div>
```

## Components

### ScPassword

Root container directive that manages the password state and visibility.

**Selector:** `[scPassword]`

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

### ScPasswordInputGroup

Container for grouping the input field with the toggle button.

**Selector:** `[scPasswordInputGroup]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScPasswordInput

The password input field.

**Selector:** `input[scPasswordInput]`

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

### ScPasswordToggle

Button to toggle password visibility.

**Selector:** `button[scPasswordToggle]`

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
<div scPassword [(value)]="password">
  <div scPasswordInputGroup>
    <input scPasswordInput placeholder="Enter password" />
    <button scPasswordToggle></button>
  </div>
</div>
```

### With Label

```html
<div class="space-y-2">
  <label scLabel for="password">Password</label>
  <div scPassword [(value)]="password">
    <div scPasswordInputGroup>
      <input scPasswordInput id="password" placeholder="Enter password" />
      <button scPasswordToggle></button>
    </div>
  </div>
</div>
```

### Show by Default

```html
<div scPassword [(value)]="password" [showByDefault]="true">
  <div scPasswordInputGroup>
    <input scPasswordInput placeholder="API Key" />
    <button scPasswordToggle></button>
  </div>
</div>
```

### Disabled

```html
<div scPassword [value]="'********'" [disabled]="true">
  <div scPasswordInputGroup>
    <input scPasswordInput />
    <button scPasswordToggle></button>
  </div>
</div>
```

### New Password

```html
<div scPassword [(value)]="newPassword">
  <div scPasswordInputGroup>
    <input scPasswordInput placeholder="New password" autocomplete="new-password" />
    <button scPasswordToggle></button>
  </div>
</div>
```

### Custom Icons

```html
<div scPassword [(value)]="password">
  <div scPasswordInputGroup>
    <input scPasswordInput />
    <button scPasswordToggle>
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
  <label scLabel>Password</label>
  <div scPassword [(value)]="password">
    <div scPasswordInputGroup>
      <input scPasswordInput />
      <button scPasswordToggle></button>
    </div>
  </div>
  <p class="text-muted-foreground text-sm">Must be at least 8 characters</p>
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

Components communicate through the `SC_PASSWORD` injection token:

```typescript
export const SC_PASSWORD = new InjectionToken<ScPassword>('SC_PASSWORD');
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
