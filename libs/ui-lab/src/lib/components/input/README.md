# Input

Displays a form input field or a component that looks like an input field.

## Components

- `ScInput` - Styled input directive for form fields

## Usage

```html
<input sc-input type="text" placeholder="Enter text..." />
```

## With Label

```html
<div class="grid w-full max-w-sm items-center gap-1.5">
  <label sc-label for="email">Email</label>
  <input sc-input type="email" id="email" placeholder="Email" />
</div>
```

## Input Types

```html
<input sc-input type="text" placeholder="Text" />
<input sc-input type="email" placeholder="Email" />
<input sc-input type="password" placeholder="Password" />
<input sc-input type="number" placeholder="0" />
<input sc-input type="date" />
<input sc-input type="time" />
<input sc-input type="search" placeholder="Search..." />
```

## File Input

```html
<input sc-input type="file" />
```

## Disabled

```html
<input sc-input type="text" placeholder="Disabled" disabled />
```

## With Button

```html
<div class="flex w-full max-w-sm items-center space-x-2">
  <input sc-input type="email" placeholder="Email" />
  <button class="...">Subscribe</button>
</div>
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Styling

The input applies the following styles by default:

- `h-10` - Fixed height
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

## File Input Styling

File inputs have additional styling:

- `file:border-0` - No border on file button
- `file:bg-transparent` - Transparent background
- `file:text-sm file:font-medium` - Text styling
- `file:text-foreground` - Text color

## Accessibility

- Uses native `<input>` element for built-in accessibility
- Supports all standard input attributes
- Focus ring for keyboard navigation
- Works with `<label>` elements via `id` attribute
