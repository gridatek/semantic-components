# Select On Focus

A directive that automatically selects the text content of an input when it receives focus, using Angular CDK's `FocusMonitor`. Configurable to respond to specific focus origins.

## Import

```typescript
import { ScSelectOnFocus } from '@semantic-components/ui';
```

## API

| Property          | Type              | Default                                     | Description                               |
| ----------------- | ----------------- | ------------------------------------------- | ----------------------------------------- |
| `scSelectOnFocus` | `ScFocusOrigin[]` | `['program', 'keyboard', 'mouse', 'touch']` | Focus origins that trigger text selection |

- **Selector**: `input[scSelectOnFocus]`
- **Type**: `ScFocusOrigin = 'program' | 'keyboard' | 'mouse' | 'touch'`

## Usage

### Basic (all focus origins)

```html
<input scSelectOnFocus value="Select me on focus" />
```

### With cdkFocusInitial

Commonly used with `cdkFocusInitial` inside dialogs so the input text is automatically selected when the dialog opens.

```html
<dialog scNativeDialog>
  <ng-template scNativeDialogContent>
    <input cdkFocusInitial scSelectOnFocus value="Pedro Duarte" />
  </ng-template>
</dialog>
```

### Restrict to specific origins

```html
<!-- Select only on programmatic focus -->
<input [scSelectOnFocus]="['program']" value="Select me" />

<!-- Select on keyboard and programmatic focus -->
<input [scSelectOnFocus]="['program', 'keyboard']" value="Select me" />
```

## How It Works

1. Uses `FocusMonitor` to detect the origin of focus events on the input.
2. When the focus origin matches one of the configured origins and the input has a non-empty value, calls `select()` to highlight all text.
3. By default, responds to all focus origins (`program`, `keyboard`, `mouse`, `touch`).
