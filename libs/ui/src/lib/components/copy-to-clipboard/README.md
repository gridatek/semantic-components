# Copy to Clipboard

A composable directive that wraps Angular CDK's `CdkCopyToClipboard` and exposes a `copied()` signal for visual feedback.

## Import

```typescript
import { ScCopyToClipboard } from '@semantic-components/ui';
```

## API

| Property            | Type              | Default | Description                                                  |
| ------------------- | ----------------- | ------- | ------------------------------------------------------------ |
| `scCopyToClipboard` | `input (string)`  |         | The text to copy to clipboard                                |
| `duration`          | `input (number)`  | `2000`  | Duration in milliseconds before `copied()` resets to `false` |
| `copied()`          | `Signal<boolean>` |         | `true` after a successful copy, resets after `duration()` ms |

- **Selector**: `[scCopyToClipboard]`
- **Export As**: `scCopyToClipboard`

## Usage

Use `#ref="scCopyToClipboard"` to access the directive instance and its `copied()` signal in the template.

### Basic

```html
<button [scCopyToClipboard]="textToCopy" #copy="scCopyToClipboard">@if (copy.copied()) { Copied! } @else { Copy }</button>
```

### With Icons

```html
<button scButton variant="ghost" size="icon" [scCopyToClipboard]="code" #copy="scCopyToClipboard" aria-label="Copy to clipboard">
  @if (copy.copied()) {
  <svg siCheckIcon></svg>
  } @else {
  <svg siCopyIcon></svg>
  }
</button>
```

### With Any Button Style

The directive is fully composable — the consumer controls the button styling, variant, icons, and aria attributes.

```html
<button scButton variant="outline" [scCopyToClipboard]="url" #copy="scCopyToClipboard">
  @if (copy.copied()) {
  <svg siCheckIcon></svg>
  Link copied } @else {
  <svg siCopyIcon></svg>
  Copy link }
</button>
```
