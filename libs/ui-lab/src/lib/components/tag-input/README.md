# Tag Input

A composable multi-tag input with chips for adding and removing tags.

## Parts

| Part               | Selector                   | Type      | Description                        |
| ------------------ | -------------------------- | --------- | ---------------------------------- |
| `ScTagInput`       | `[scTagInput]`             | Directive | Root container — manages tag state |
| `ScTagInputField`  | `input[scTagInputField]`   | Directive | Input field for typing new tags    |
| `ScTagInputTag`    | `[scTagInputTag]`          | Directive | Individual tag chip styling        |
| `ScTagInputRemove` | `button[scTagInputRemove]` | Directive | Remove button inside a tag         |
| `ScTagInputClear`  | `button[scTagInputClear]`  | Directive | Clear all tags button              |
| `ScTagInputCount`  | `[scTagInputCount]`        | Directive | Tag count display (e.g. "3 / 10")  |

## Usage

```typescript
import { ScTagInput, ScTagInputClear, ScTagInputCount, ScTagInputField, ScTagInputRemove, ScTagInputTag } from '@semantic-components/ui-lab';
```

### Basic

```html
<div scTagInput [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag">
    {{ tag }}
    <button scTagInputRemove>
      <svg siXIcon class="size-3"></svg>
    </button>
  </span>
  }
  <input scTagInputField />
</div>
```

### With Clear Button

```html
<div scTagInput [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag">
    {{ tag }}
    <button scTagInputRemove>
      <svg siXIcon class="size-3"></svg>
    </button>
  </span>
  }
  <input scTagInputField />
  <button scTagInputClear>
    <svg siXIcon class="size-4"></svg>
  </button>
</div>
```

### With Max Tags & Count

```html
<div scTagInput [(tags)]="tags" [maxTags]="5">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag">
    {{ tag }}
    <button scTagInputRemove>
      <svg siXIcon class="size-3"></svg>
    </button>
  </span>
  }
  <input scTagInputField />
  <span scTagInputCount class="ml-auto text-xs"></span>
</div>
```

### Variants

```html
<!-- Default (Primary) -->
<span scTagInputTag [tag]="tag" variant="default">{{ tag }}...</span>

<!-- Secondary -->
<span scTagInputTag [tag]="tag" variant="secondary">{{ tag }}...</span>

<!-- Outline -->
<span scTagInputTag [tag]="tag" variant="outline">{{ tag }}...</span>
```

## API

### ScTagInput (root)

| Input             | Type             | Default          | Description            |
| ----------------- | ---------------- | ---------------- | ---------------------- |
| `tags`            | `string[]`       | `[]`             | Two-way tag array      |
| `placeholder`     | `string`         | `'Add tag...'`   | Input placeholder      |
| `disabled`        | `boolean`        | `false`          | Disabled state         |
| `maxTags`         | `number \| null` | `null`           | Maximum number of tags |
| `allowDuplicates` | `boolean`        | `false`          | Allow duplicate tags   |
| `delimiters`      | `string[]`       | `['Enter', ',']` | Keys that add tags     |
| `minLength`       | `number`         | `1`              | Minimum tag length     |
| `maxLength`       | `number \| null` | `null`           | Maximum tag length     |

| Output      | Type     | Description     |
| ----------- | -------- | --------------- |
| `tagAdd`    | `string` | Tag was added   |
| `tagRemove` | `string` | Tag was removed |

### ScTagInputField

| Input       | Type      | Default | Description               |
| ----------- | --------- | ------- | ------------------------- |
| `addOnBlur` | `boolean` | `false` | Add tag when losing focus |

### ScTagInputTag

| Input     | Type                                    | Default     | Description  |
| --------- | --------------------------------------- | ----------- | ------------ |
| `tag`     | `string`                                | Required    | Tag text     |
| `variant` | `'default' \| 'secondary' \| 'outline'` | `'default'` | Visual style |

### ScTagInputRemove

Placed inside `ScTagInputTag`. Automatically reads the parent tag value and sets `aria-label`. Auto-disables when the root `ScTagInput` is disabled.

### ScTagInputClear

Consumer provides the icon via content projection.

### ScTagInputCount

| Input     | Type      | Default | Description         |
| --------- | --------- | ------- | ------------------- |
| `showMax` | `boolean` | `true`  | Show max in "x / y" |

## Keyboard Navigation

| Key         | Action                               |
| ----------- | ------------------------------------ |
| `Enter`     | Add tag (default delimiter)          |
| `,`         | Add tag (default delimiter)          |
| `Backspace` | Remove last tag (when input empty)   |
| `Tab`       | Move focus / add tag (if configured) |

## Features

- Composable — pick only the parts you need
- Flexible delimiters for tag addition
- Duplicate prevention (optional)
- Max tags limit with count display
- Min/max length validation
- Add on blur support
- Paste support (splits by delimiters)
- Multiple visual variants
- Two-way binding with `[(tags)]`

## Accessibility

- Auto-generated `aria-label` on remove buttons
- Click container to focus input
- Keyboard navigation support
- Focus indicators
- Disabled state propagation
