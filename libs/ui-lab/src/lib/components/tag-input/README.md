# Tag Input

A multi-tag input component with chips for adding and removing tags.

## Usage

```html
<div sc-tag-input [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
</div>
```

## Components

### ScTagInput

Root container that manages tag state.

**Selector:** `[sc-tag-input]`

**Inputs:**

| Input             | Type             | Default          | Description            |
| ----------------- | ---------------- | ---------------- | ---------------------- |
| `placeholder`     | `string`         | `'Add tag...'`   | Input placeholder      |
| `disabled`        | `boolean`        | `false`          | Disabled state         |
| `maxTags`         | `number \| null` | `null`           | Maximum number of tags |
| `allowDuplicates` | `boolean`        | `false`          | Allow duplicate tags   |
| `delimiters`      | `string[]`       | `['Enter', ',']` | Keys that add tags     |
| `minLength`       | `number`         | `1`              | Minimum tag length     |
| `maxLength`       | `number \| null` | `null`           | Maximum tag length     |
| `class`           | `string`         | `''`             | Additional CSS         |

**Two-way Bindings:**

| Binding | Type       | Default | Description   |
| ------- | ---------- | ------- | ------------- |
| `tags`  | `string[]` | `[]`    | Array of tags |

**Outputs:**

| Output      | Type     | Description     |
| ----------- | -------- | --------------- |
| `tagAdd`    | `string` | Tag was added   |
| `tagRemove` | `string` | Tag was removed |

**Methods:**

| Method                    | Description                |
| ------------------------- | -------------------------- |
| `addTag(value)`           | Add a tag programmatically |
| `removeTag(tag)`          | Remove a specific tag      |
| `removeTagAtIndex(index)` | Remove tag by index        |
| `removeLastTag()`         | Remove the last tag        |
| `clearAll()`              | Remove all tags            |
| `focusInput()`            | Focus the input field      |

### ScTagInputField

The input field for typing new tags.

**Selector:** `input[sc-tag-input-field]`

**Inputs:**

| Input       | Type      | Default | Description               |
| ----------- | --------- | ------- | ------------------------- |
| `addOnBlur` | `boolean` | `false` | Add tag when losing focus |
| `class`     | `string`  | `''`    | Additional CSS            |

### ScTagInputTag

Individual tag chip.

**Selector:** `[sc-tag-input-tag]`

**Inputs:**

| Input     | Type                                    | Default     | Description    |
| --------- | --------------------------------------- | ----------- | -------------- |
| `tag`     | `string`                                | Required    | Tag text       |
| `variant` | `'default' \| 'secondary' \| 'outline'` | `'default'` | Visual style   |
| `class`   | `string`                                | `''`        | Additional CSS |

### ScTagInputClear

Button to clear all tags.

**Selector:** `button[sc-tag-input-clear]`

### ScTagInputCount

Display tag count with optional max.

**Selector:** `[sc-tag-input-count]`

**Inputs:**

| Input     | Type      | Default | Description         |
| --------- | --------- | ------- | ------------------- |
| `showMax` | `boolean` | `true`  | Show max in "x / y" |
| `class`   | `string`  | `''`    | Additional CSS      |

## Examples

### Basic

```html
<div sc-tag-input [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
</div>
```

### With Clear Button

```html
<div sc-tag-input [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
  <button sc-tag-input-clear></button>
</div>
```

### With Max Tags

```html
<div sc-tag-input [(tags)]="tags" [maxTags]="5">
  @for (tag of tags(); track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
</div>
<span sc-tag-input-count></span>
```

### Different Variants

```html
<!-- Default (Primary) -->
<span sc-tag-input-tag [tag]="tag" variant="default"></span>

<!-- Secondary -->
<span sc-tag-input-tag [tag]="tag" variant="secondary"></span>

<!-- Outline -->
<span sc-tag-input-tag [tag]="tag" variant="outline"></span>
```

### Custom Delimiters

```html
<!-- Add tags with Space or Tab -->
<div sc-tag-input [(tags)]="tags" [delimiters]="['Enter', ' ', 'Tab']">
  @for (tag of tags(); track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
</div>
```

### Allow Duplicates

```html
<div sc-tag-input [(tags)]="tags" [allowDuplicates]="true">
  @for (tag of tags(); track $index) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
</div>
```

### Add on Blur

```html
<div sc-tag-input [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field [addOnBlur]="true" />
</div>
```

### With Validation

```html
<div sc-tag-input [(tags)]="tags" [minLength]="2" [maxLength]="20">
  @for (tag of tags(); track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
</div>
```

### Disabled

```html
<div sc-tag-input [tags]="['Fixed', 'Tags']" [disabled]="true">
  @for (tag of ['Fixed', 'Tags']; track tag) {
  <span sc-tag-input-tag [tag]="tag"></span>
  }
  <input sc-tag-input-field />
</div>
```

### Form Field

```html
<div class="space-y-2">
  <label class="text-sm font-medium">Skills</label>
  <div sc-tag-input [(tags)]="skills" [maxTags]="10" placeholder="Add a skill...">
    @for (tag of skills(); track tag) {
    <span sc-tag-input-tag [tag]="tag" variant="secondary"></span>
    }
    <input sc-tag-input-field />
  </div>
  <div class="flex justify-between text-xs text-muted-foreground">
    <span>Add up to 10 skills</span>
    <span sc-tag-input-count></span>
  </div>
</div>
```

### Email Recipients

```html
<div sc-tag-input [(tags)]="emails" placeholder="Add recipient...">
  @for (email of emails(); track email) {
  <span sc-tag-input-tag [tag]="email" variant="outline" class="rounded-full"></span>
  }
  <input sc-tag-input-field [addOnBlur]="true" />
</div>
```

## Keyboard Navigation

| Key         | Action                               |
| ----------- | ------------------------------------ |
| `Enter`     | Add tag (default delimiter)          |
| `,`         | Add tag (default delimiter)          |
| `Backspace` | Remove last tag (when input empty)   |
| `Tab`       | Move focus / add tag (if configured) |

## Features

- **Flexible Delimiters**: Configure any keys to trigger tag addition
- **Duplicate Prevention**: Optional duplicate checking
- **Max Tags Limit**: Enforce maximum number of tags
- **Validation**: Min/max length constraints
- **Add on Blur**: Optionally add tag when input loses focus
- **Paste Support**: Paste comma-separated values
- **Keyboard Support**: Full keyboard navigation
- **Clear All**: Remove all tags at once
- **Count Display**: Show current/max tag count
- **Multiple Variants**: Default, secondary, outline styles
- **Two-way Binding**: Sync with `[(tags)]`

## Accessibility

- Click container to focus input
- ARIA labels on remove buttons
- Keyboard navigation support
- Focus indicators
- Disabled state support
