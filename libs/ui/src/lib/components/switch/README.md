# Switch

A toggle control for switching between two states.

## Components

- `ScSwitchField` - Container `label` that wires the hidden input to the visual
- `ScSwitch` - Hidden native `input[type="checkbox"]` directive that drives state
- `ScSwitchVisual` - Visual track and thumb, rendered automatically by `ScSwitchField`

## Usage

```html
<label scSwitchField>
  <input type="checkbox" scSwitch />
  <span>Airplane Mode</span>
</label>
```

## With Two-Way Binding

```html
<label scSwitchField>
  <input type="checkbox" scSwitch [(checked)]="enabled" />
  <span>Notifications: {{ enabled() ? 'On' : 'Off' }}</span>
</label>
```

## Standalone (no label text)

Provide an `aria-label` when the label contains no visible text:

```html
<label scSwitchField aria-label="Dark Mode">
  <input type="checkbox" scSwitch />
</label>
```

## Disabled

```html
<label scSwitchField>
  <input type="checkbox" scSwitch disabled />
  <span>Disabled (Off)</span>
</label>

<label scSwitchField>
  <input type="checkbox" scSwitch [checked]="true" disabled />
  <span>Disabled (On)</span>
</label>
```

## With Signal Forms

```html
<label scSwitchField aria-label="Enable Notifications">
  <input type="checkbox" scSwitch [formField]="myForm.notifications" />
</label>
```

Add `FormField` to your component's `imports` array when using `[formField]`.

## Inputs (`ScSwitch`)

| Input     | Type      | Default | Description                       |
| --------- | --------- | ------- | --------------------------------- |
| `checked` | `boolean` | `false` | The checked state (two-way model) |
| `class`   | `string`  | `''`    | Additional CSS classes            |

## Inputs (`ScSwitchField`)

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Accessibility

- Uses `role="switch"` on the native input for screen readers
- `aria-checked` is reflected automatically by the browser
- Keyboard accessible — Space toggles, Tab moves focus
- Focus ring appears on the visual track via `peer-focus-visible`
- Disabled state communicated via `peer-disabled` styles and `data-disabled` on the field
