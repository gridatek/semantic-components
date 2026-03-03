# Copy to Clipboard

A composable directive that wraps Angular CDK's `CdkCopyToClipboard` and exposes a `copied()` signal for visual feedback.

## Import

```typescript
import { ScCopyToClipboard } from '@semantic-components/ui';
```

## API

| Property            | Type              | Description                                               |
| ------------------- | ----------------- | --------------------------------------------------------- |
| `scCopyToClipboard` | `input (string)`  | The text to copy to clipboard                             |
| `copied()`          | `Signal<boolean>` | `true` for 2 seconds after a successful copy, then resets |

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
<button type="button" [scCopyToClipboard]="code" #copy="scCopyToClipboard" class="hover:bg-accent hover:text-accent-foreground inline-flex size-9 items-center justify-center rounded-md" aria-label="Copy to clipboard">
  @if (copy.copied()) {
  <svg siCheckIcon class="size-4"></svg>
  } @else {
  <svg siCopyIcon class="size-4"></svg>
  }
</button>
```

### With Any Button Style

The directive is fully composable — the consumer controls the button styling, variant, icons, and aria attributes.

```html
<button scButton variant="outline" [scCopyToClipboard]="url" #copy="scCopyToClipboard">
  @if (copy.copied()) {
  <svg siCheckIcon class="size-4"></svg>
  Link copied } @else {
  <svg siCopyIcon class="size-4"></svg>
  Copy link }
</button>
```
