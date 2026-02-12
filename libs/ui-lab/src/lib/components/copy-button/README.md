# Copy Button

A button component that copies text to clipboard with visual feedback.

## Usage

```html
<button sc-copy-button [value]="textToCopy"></button>
```

## Components

### ScCopyButton

Core copy button with icon and feedback animation.

**Selector:** `button[sc-copy-button]`

**Inputs:**

| Input      | Type                                  | Default   | Description            |
| ---------- | ------------------------------------- | --------- | ---------------------- |
| `value`    | `string`                              | Required  | Text to copy           |
| `disabled` | `boolean`                             | `false`   | Disabled state         |
| `timeout`  | `number`                              | `2000`    | Feedback duration (ms) |
| `variant`  | `'default' \| 'ghost' \| 'outline'`   | `'ghost'` | Visual style           |
| `size`     | `'sm' \| 'default' \| 'lg' \| 'icon'` | `'icon'`  | Button size            |
| `class`    | `string`                              | `''`      | Additional CSS         |

**Outputs:**

| Output        | Type     | Description           |
| ------------- | -------- | --------------------- |
| `copySuccess` | `string` | Emits copied value    |
| `copyError`   | `Error`  | Emits on copy failure |

**Methods:**

| Method    | Description           |
| --------- | --------------------- |
| `copy()`  | Trigger copy manually |
| `reset()` | Reset copied state    |

### ScCopyButtonWithText

Copy button with text label.

**Selector:** `[sc-copy-button-with-text]`

**Inputs:**

| Input        | Type                                | Default     | Description       |
| ------------ | ----------------------------------- | ----------- | ----------------- |
| `value`      | `string`                            | Required    | Text to copy      |
| `disabled`   | `boolean`                           | `false`     | Disabled state    |
| `timeout`    | `number`                            | `2000`      | Feedback duration |
| `variant`    | `'default' \| 'ghost' \| 'outline'` | `'default'` | Visual style      |
| `size`       | `'sm' \| 'default' \| 'lg'`         | `'default'` | Button size       |
| `copyText`   | `string`                            | `'Copy'`    | Text before copy  |
| `copiedText` | `string`                            | `'Copied!'` | Text after copy   |

### ScCopyInput

Input field with integrated copy button.

**Selector:** `[sc-copy-input]`

**Inputs:**

| Input      | Type      | Default  | Description           |
| ---------- | --------- | -------- | --------------------- |
| `value`    | `string`  | Required | Value to display/copy |
| `readonly` | `boolean` | `true`   | Input readonly state  |
| `class`    | `string`  | `''`     | Additional CSS        |

### ScCopyCode

Code block with copy button.

**Selector:** `[sc-copy-code]`

**Inputs:**

| Input   | Type     | Required | Description    |
| ------- | -------- | -------- | -------------- |
| `value` | `string` | Yes      | Code to copy   |
| `class` | `string` | No       | Additional CSS |

## Examples

### Basic

```html
<button sc-copy-button [value]="'Hello, World!'"></button>
```

### With Event Handler

```html
<button sc-copy-button [value]="text" (copySuccess)="onCopied($event)" (copyError)="onError($event)"></button>
```

### Variants

```html
<button sc-copy-button [value]="text" variant="ghost"></button>
<button sc-copy-button [value]="text" variant="outline"></button>
<button sc-copy-button [value]="text" variant="default"></button>
```

### Sizes

```html
<button sc-copy-button [value]="text" size="sm"></button>
<button sc-copy-button [value]="text" size="default"></button>
<button sc-copy-button [value]="text" size="lg"></button>
<button sc-copy-button [value]="text" size="icon"></button>
```

### With Text Label

```html
<div sc-copy-button-with-text [value]="'Copy this text'"></div>

<div sc-copy-button-with-text [value]="shareLink" copyText="Copy Link" copiedText="Link Copied!"></div>
```

### Copy Input

```html
<div sc-copy-input [value]="'https://example.com/share/abc123'"></div>

<div>
  <label>API Key</label>
  <div sc-copy-input [value]="apiKey"></div>
</div>
```

### Copy Code Block

```html
<div sc-copy-code [value]="codeSnippet">{{ codeSnippet }}</div>
```

### Inline with Text

```html
<div class="flex items-center gap-2 border rounded-md px-3 py-2">
  <code class="flex-1">npm install package</code>
  <button sc-copy-button [value]="'npm install package'" size="sm"></button>
</div>
```

### Custom Timeout

```html
<button sc-copy-button [value]="text" [timeout]="5000">Copy (5s feedback)</button>
```

### Disabled

```html
<button sc-copy-button [value]="text" [disabled]="true"></button>
```

### Share URL Pattern

```html
<div class="flex items-center gap-2">
  <input [value]="shareUrl" readonly class="flex-1 border rounded px-3 py-2" />
  <button sc-copy-button [value]="shareUrl" variant="outline"></button>
</div>
```

### Color Code Pattern

```html
<div class="flex items-center gap-3">
  <div class="size-10 rounded-md" [style.background]="color"></div>
  <span class="flex-1">{{ color }}</span>
  <button sc-copy-button [value]="color" variant="ghost"></button>
</div>
```

### Promo Code Pattern

```html
<div class="flex items-center justify-between">
  <code class="text-2xl font-bold">SAVE20</code>
  <button sc-copy-button [value]="'SAVE20'" variant="outline">Copy Code</button>
</div>
```

## Features

- **Clipboard API**: Uses modern `navigator.clipboard.writeText()`
- **Visual Feedback**: Icon changes to checkmark on success
- **Configurable Timeout**: Control how long feedback shows
- **Multiple Variants**: Ghost, outline, and default styles
- **Multiple Sizes**: Small, default, large, and icon-only
- **Convenience Components**: Input, code block, and text label wrappers
- **Events**: Success and error callbacks
- **Programmatic Control**: `copy()` and `reset()` methods

## Accessibility

- `aria-label` updates based on state
- `data-copied` attribute for styling
- Focus visible indicators
- Disabled state support
- Proper button semantics
