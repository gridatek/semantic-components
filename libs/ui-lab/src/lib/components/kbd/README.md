# Kbd

A component for displaying keyboard keys and shortcuts.

## Components

- `ScKbd` - A keyboard key indicator
- `ScKbdGroup` - A group of keyboard keys displayed inline

## Usage

```html
<kbd sc-kbd>⌘</kbd>
```

## Keyboard Shortcuts

```html
<div class="flex items-center gap-2">
  <kbd sc-kbd>⌘</kbd>
  <span>+</span>
  <kbd sc-kbd>K</kbd>
</div>
```

## Kbd Group

```html
<kbd sc-kbd-group>
  <kbd sc-kbd>⌘</kbd>
  <kbd sc-kbd>K</kbd>
</kbd>
```

## Inline Usage

```html
<p>
  Press
  <kbd sc-kbd>⌘</kbd>
  <kbd sc-kbd>K</kbd>
  to open the command palette.
</p>
```

## Inputs

### ScKbd

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScKbdGroup

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |
