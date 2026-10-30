# Input

A native text field, in the look of the app's preset. In a Field it takes the field's label and description; with Signal Forms it shows itself invalid once touched. For a longer text, use a Textarea; for a choice among options, a Select.

## Usage

```html
<div scField>
  <label scLabel>Name</label>
  <input scInput placeholder="Jordan Lee" />
</div>
```

## Anatomy

```ts
import { ScInput } from '@semantic-components/ui';
```

```html
<div scField>
  <label scLabel>Label</label>
  <input scInput />
  <p scFieldDescription>Description</p>
</div>
```

One part, on a native `input`. It needs a name: a label — in a Field, the field links them — or `aria-label`; in development it warns without one. A placeholder is not a name.

## Forms

With `[formField]`, the form owns its state: its constraints (`required`, `disabled`, `email`…) are declared in the form's schema, not on the input, and the input is marked invalid (`aria-invalid`) once the field is touched.

```ts
readonly profile = form(signal({ email: '' }), (s) => {
  required(s.email);
  email(s.email, { message: 'Enter a valid email address.' });
});
```

```html
<div scField>
  <label scLabel>Email</label>
  <input scInput type="email" [formField]="profile.email" />
  <div scFieldErrors></div>
</div>
```

## API reference

### ScInput — `input[scInput]`

Its classes are the preset's (`injectPreset().input`, from `provideScConfig({ preset })`; nova by default). Every native attribute (`type`, `placeholder`, `autocomplete`…) is the input's own.

| Input              | Type      | Default                 | Description                                                            |
| ------------------ | --------- | ----------------------- | ---------------------------------------------------------------------- |
| `id`               | `string`  | the field's, or made up | In a field, the field's id: its label points to it                     |
| `aria-describedby` | `string`  | the field's description | In a field, its description and errors                                 |
| `disabled`         | `boolean` | `false`                 | Without a form. With `[formField]`, declare `disabled()` in the schema |
| `class`            | `string`  | `''`                    | Classes merged over the preset (`cn`: a later class wins)              |

`data-slot="control"`: read by the input group and the control group (focus, invalid, border). In an input group (`div[scInputGroup]`) the group gives it the look of being inside — no border, ring or corners of its own — as it does for every control in it.

## Examples

### Field

```html
<div scField>
  <label scLabel>Username</label>
  <input scInput type="text" placeholder="Enter your username" />
  <p scFieldDescription>Choose a unique username for your account.</p>
</div>
```

### Disabled

Declared in the schema: `form(model, (s) => disabled(s.email))`.

### Invalid

```ts
readonly emailForm = form(signal({ email: 'jordan@' }), (s) => email(s.email, { message: 'Enter a valid email address.' }));
```

Marked invalid once touched; `scFieldErrors` shows the message, and the input is described by it.

### File

```html
<input scInput type="file" accept="image/*" />
```

### Inline

```html
<div scField orientation="horizontal">
  <input scInput type="search" placeholder="Search..." aria-label="Search" />
  <button scButton>Search</button>
</div>
```

### Required

`required(s.name)` in the schema: the input gets `required`; mark the label yourself (`<span aria-hidden="true">*</span>`).

### Input Group, Control Group

In a `div[scInputGroup]` beside text and icons; in a `div[scControlGroup]` joined to a button.

### RTL

Logical properties: the text starts at the right. An email or a URL is typed left to right: `dir="ltr"` on that input.

## Accessibility

- A native input: its role, value and keyboard are the browser's.
- Named by a label or `aria-label`; a dev warning when it has neither.
- In a field: described by its description and errors; `aria-invalid` once touched and invalid.
- 16px text on small screens (`text-base md:text-sm`): phones don't zoom in on focus.
