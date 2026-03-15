# Input Button

A button styled to look like an input field. Useful as a trigger for search dialogs, command palettes, or any action that visually resembles an input.

## Usage

```html
<button scInputButton>
  <svg siSearchIcon></svg>
  <span>Search...</span>
  <kbd scKbd>⌘J</kbd>
</button>
```

Import the directive:

```typescript
import { ScInputButton } from '@semantic-components/ui';
```

## Components

### ScInputButton

A directive applied to `<button>` elements to style them as input-like triggers. Builds on `buttonVariants` with the `outline` variant.

| Property | Type     | Default | Description                                          |
| -------- | -------- | ------- | ---------------------------------------------------- |
| `class`  | `string` | `''`    | Additional CSS classes to merge with default styles. |

**Selector:** `button[scInputButton]`

**Host data attributes:**

- `data-slot="input-button"`

## Examples

### Command dialog trigger

```html
<button scDialogTrigger scInputButton>
  <svg siSearchIcon></svg>
  <span>Search...</span>
  <kbd scKbd scHotkey="mod+j" #hk="scHotkey" (scHotkeyPressed)="toggleOpen()">{{ hk.displayKey() }}</kbd>
</button>
```

### Simple search trigger

```html
<button scInputButton (click)="openSearch()">
  <svg siSearchIcon></svg>
  <span>Search...</span>
</button>
```

## Accessibility

Uses a native `<button>` element with `type="button"`, ensuring proper keyboard interaction (Enter/Space to activate) and screen reader support out of the box.
