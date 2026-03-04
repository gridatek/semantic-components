# Auto Select

A directive that automatically selects the text content of an input when it receives programmatic focus, using Angular CDK's `FocusMonitor`.

## Import

```typescript
import { ScAutoSelect } from '@semantic-components/ui';
```

## API

- **Selector**: `input[scAutoSelect]`

The directive has no inputs or outputs. It monitors the host input for programmatic focus and selects its text if the value is non-empty.

## Usage

### Basic

```html
<input scAutoSelect value="Select me on focus" />
```

### With cdkFocusInitial

Commonly used with `cdkFocusInitial` inside dialogs so the input text is automatically selected when the dialog opens.

```html
<dialog scNativeDialog>
  <ng-template scNativeDialogContent>
    <input cdkFocusInitial scAutoSelect value="Pedro Duarte" />
  </ng-template>
</dialog>
```

## How It Works

1. Uses `FocusMonitor` to detect the origin of focus events on the input.
2. When focus origin is `program` (e.g., `cdkFocusInitial`, `.focus()`) and the input has a non-empty value, calls `select()` to highlight all text.
3. Ignores keyboard, mouse, and touch focus to avoid disrupting manual interaction.
