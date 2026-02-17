# Tag Input

A multi-tag input component with chips for adding and removing tags.

## Usage

```html
<div scTagInput [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
</div>
```

## Components

### ScTagInput

Root container that manages tag state.

**Selector:** `[scTagInput]`

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

**Selector:** `input[scTagInputField]`

**Inputs:**

| Input       | Type      | Default | Description               |
| ----------- | --------- | ------- | ------------------------- |
| `addOnBlur` | `boolean` | `false` | Add tag when losing focus |
| `class`     | `string`  | `''`    | Additional CSS            |

### ScTagInputTag

Individual tag chip.

**Selector:** `[scTagInputTag]`

**Inputs:**

| Input     | Type                                    | Default     | Description    |
| --------- | --------------------------------------- | ----------- | -------------- |
| `tag`     | `string`                                | Required    | Tag text       |
| `variant` | `'default' \| 'secondary' \| 'outline'` | `'default'` | Visual style   |
| `class`   | `string`                                | `''`        | Additional CSS |

### ScTagInputClear

Button to clear all tags.

**Selector:** `button[scTagInputClear]`

### ScTagInputCount

Display tag count with optional max.

**Selector:** `[scTagInputCount]`

**Inputs:**

| Input     | Type      | Default | Description         |
| --------- | --------- | ------- | ------------------- |
| `showMax` | `boolean` | `true`  | Show max in "x / y" |
| `class`   | `string`  | `''`    | Additional CSS      |

## Examples

### Basic

```html
<div scTagInput [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
</div>
```

### With Clear Button

```html
<div scTagInput [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
  <button scTagInputClear></button>
</div>
```

### With Max Tags

```html
<div scTagInput [(tags)]="tags" [maxTags]="5">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
</div>
<span scTagInputCount></span>
```

### Different Variants

```html
<!-- Default (Primary) -->
<span scTagInputTag [tag]="tag" variant="default"></span>

<!-- Secondary -->
<span scTagInputTag [tag]="tag" variant="secondary"></span>

<!-- Outline -->
<span scTagInputTag [tag]="tag" variant="outline"></span>
```

### Custom Delimiters

```html
<!-- Add tags with Space or Tab -->
<div scTagInput [(tags)]="tags" [delimiters]="['Enter', ' ', 'Tab']">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
</div>
```

### Allow Duplicates

```html
<div scTagInput [(tags)]="tags" [allowDuplicates]="true">
  @for (tag of tags(); track $index) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
</div>
```

### Add on Blur

```html
<div scTagInput [(tags)]="tags">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField [addOnBlur]="true" />
</div>
```

### With Validation

```html
<div scTagInput [(tags)]="tags" [minLength]="2" [maxLength]="20">
  @for (tag of tags(); track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
</div>
```

### Disabled

```html
<div scTagInput [tags]="['Fixed', 'Tags']" [disabled]="true">
  @for (tag of ['Fixed', 'Tags']; track tag) {
  <span scTagInputTag [tag]="tag"></span>
  }
  <input scTagInputField />
</div>
```

### Form Field

```html
<div class="space-y-2">
  <label class="text-sm font-medium">Skills</label>
  <div scTagInput [(tags)]="skills" [maxTags]="10" placeholder="Add a skill...">
    @for (tag of skills(); track tag) {
    <span scTagInputTag [tag]="tag" variant="secondary"></span>
    }
    <input scTagInputField />
  </div>
  <div class="flex justify-between text-xs text-muted-foreground">
    <span>Add up to 10 skills</span>
    <span scTagInputCount></span>
  </div>
</div>
```

### Email Recipients

```html
<div scTagInput [(tags)]="emails" placeholder="Add recipient...">
  @for (email of emails(); track email) {
  <span scTagInputTag [tag]="email" variant="outline" class="rounded-full"></span>
  }
  <input scTagInputField [addOnBlur]="true" />
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
