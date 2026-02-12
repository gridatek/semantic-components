# Textarea

Displays a form textarea or a component that looks like a textarea.

## Components

- `ScTextarea` - Styled textarea directive for multi-line text input

## Usage

```html
<textarea sc-textarea placeholder="Type your message here."></textarea>
```

## With Label

```html
<div class="grid w-full gap-1.5">
  <label sc-label for="message">Your message</label>
  <textarea sc-textarea id="message" placeholder="Type your message here."></textarea>
</div>
```

## With Helper Text

```html
<div class="grid w-full gap-1.5">
  <label sc-label for="bio">Bio</label>
  <textarea sc-textarea id="bio" placeholder="Tell us about yourself"></textarea>
  <p class="text-sm text-muted-foreground">Your bio will be visible on your public profile.</p>
</div>
```

## Custom Rows

```html
<textarea sc-textarea rows="2" placeholder="Small"></textarea>
<textarea sc-textarea rows="6" placeholder="Large"></textarea>
```

## Disabled

```html
<textarea sc-textarea placeholder="Disabled" disabled></textarea>
```

## With Max Length

```html
<textarea sc-textarea maxlength="200" placeholder="Max 200 characters"></textarea>
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Styling

The textarea applies the following styles by default:

- `min-h-[80px]` - Minimum height
- `w-full` - Full width
- `rounded-md` - Rounded corners
- `border border-input` - Border styling
- `bg-background` - Background color
- `px-3 py-2` - Padding
- `text-sm` - Small text size
- `ring-offset-background` - Ring offset for focus
- `placeholder:text-muted-foreground` - Muted placeholder text
- `focus-visible:ring-2` - Focus ring
- `disabled:cursor-not-allowed disabled:opacity-50` - Disabled state

## Accessibility

- Uses native `<textarea>` element for built-in accessibility
- Supports all standard textarea attributes (`rows`, `cols`, `maxlength`, etc.)
- Focus ring for keyboard navigation
- Works with `<label>` elements via `id` attribute
