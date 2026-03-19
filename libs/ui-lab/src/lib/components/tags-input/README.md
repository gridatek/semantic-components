# Tags Input

A composable multi-tag input component for adding, removing, and navigating tags with keyboard support.

## Components

- `ScTagsInput` - Root container directive (provides `SC_FIELD` integration)
- `ScTagsInputItem` - Individual tag chip with keyboard navigation
- `ScTagsInputItemDelete` - Remove button inside a tag
- `ScTagsInputControl` - Text input for typing new tags
- `ScTagsInputClear` - Clear all tags button
- `ScTagsInputCount` - Live tag count display

## Usage

### Basic Usage

```html
<div scTagsInput [(tags)]="tags">
  @for (tag of tags(); track $index) {
  <span scTagsInputItem [tag]="tag" [index]="$index">
    {{ tag }}
    <button scTagsInputItemDelete>
      <svg siXIcon class="size-3"></svg>
    </button>
  </span>
  }
  <input scTagsInputControl />
</div>
```

### With Clear Button and Count

```html
<div scTagsInput [(tags)]="tags" [maxTags]="5">
  @for (tag of tags(); track $index) {
  <span scTagsInputItem [tag]="tag" [index]="$index">
    {{ tag }}
    <button scTagsInputItemDelete>
      <svg siXIcon class="size-3"></svg>
    </button>
  </span>
  }
  <input scTagsInputControl />
  <span scTagsInputCount class="ml-auto text-xs"></span>
  <button scTagsInputClear>
    <svg siXIcon class="size-4"></svg>
  </button>
</div>
```

## API

### ScTagsInput (root)

| Input             | Type             | Default          | Description                    |
| ----------------- | ---------------- | ---------------- | ------------------------------ |
| `class`           | `string`         | `''`             | Additional CSS classes         |
| `id`              | `string`         | auto-generated   | ID for label association       |
| `aria-label`      | `string`         | `''`             | Accessible label               |
| `tags`            | `string[]`       | `[]`             | Two-way binding for tag list   |
| `placeholder`     | `string`         | `'Add tag...'`   | Input placeholder text         |
| `disabled`        | `boolean`        | `false`          | Disable the entire component   |
| `maxTags`         | `number \| null` | `null`           | Maximum number of tags         |
| `allowDuplicates` | `boolean`        | `false`          | Allow duplicate tag values     |
| `delimiters`      | `string[]`       | `['Enter', ',']` | Keys that trigger tag creation |
| `minLength`       | `number`         | `1`              | Minimum tag text length        |
| `maxLength`       | `number \| null` | `null`           | Maximum tag text length        |

| Output      | Type     | Description                 |
| ----------- | -------- | --------------------------- |
| `tagAdd`    | `string` | Emits when a tag is added   |
| `tagRemove` | `string` | Emits when a tag is removed |

### ScTagsInputItem

| Input     | Type                                    | Default     | Description       |
| --------- | --------------------------------------- | ----------- | ----------------- |
| `class`   | `string`                                | `''`        | Additional CSS    |
| `tag`     | `string` (required)                     | —           | Tag text value    |
| `index`   | `number` (required)                     | —           | Index from `@for` |
| `variant` | `'default' \| 'secondary' \| 'outline'` | `'default'` | Visual style      |

### ScTagsInputControl

| Input       | Type      | Default | Description              |
| ----------- | --------- | ------- | ------------------------ |
| `class`     | `string`  | `''`    | Additional CSS           |
| `addOnBlur` | `boolean` | `false` | Add tag when input blurs |

### ScTagsInputCount

| Input     | Type      | Default | Description               |
| --------- | --------- | ------- | ------------------------- |
| `class`   | `string`  | `''`    | Additional CSS            |
| `showMax` | `boolean` | `true`  | Show "count / max" format |

## Keyboard Navigation

| Key                    | Context | Action                       |
| ---------------------- | ------- | ---------------------------- |
| `Enter` / `,`          | Input   | Add current text as tag      |
| `Backspace`            | Input   | Remove last tag (when empty) |
| `ArrowLeft`            | Input   | Focus last tag (when empty)  |
| `ArrowLeft` / `Right`  | Tag     | Navigate between tags        |
| `Home`                 | Tag     | Focus first tag              |
| `End`                  | Tag     | Return focus to input        |
| `Delete` / `Backspace` | Tag     | Remove focused tag           |

## Accessibility

- Root has `role="group"` on `<div>` (omitted on `<label>` for native semantics)
- Provides `SC_FIELD` for label/description association
- Roving `tabindex` on tags for keyboard navigation
- Count element has `role="status"` with `aria-live="polite"` for screen reader announcements
- Remove buttons have computed `aria-label` (e.g. "Remove Angular")
- Clear button has `aria-label="Clear all tags"`
- Focus management: focus moves to input after clearing or removing last tag
