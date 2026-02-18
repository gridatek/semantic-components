# Separator

Visually separates content with a line.

## Components

- `ScSeparator` - A horizontal or vertical divider line applied as a directive on a `div`

## Usage

```html
<div scSeparator></div>
```

## Orientation

```html
<!-- Horizontal (default) -->
<div scSeparator></div>

<!-- Vertical -->
<div scSeparator orientation="vertical"></div>
```

## Decorative vs Semantic

By default the separator is decorative (`role="none"`, `aria-hidden="true"`). Set `decorative` to `false` for semantic separators that convey structure to assistive technologies.

```html
<div scSeparator [decorative]="false"></div>
```

## Examples

### Between content sections

```html
<div>
  <p>Section one</p>
  <div scSeparator class="my-4"></div>
  <p>Section two</p>
</div>
```

### Vertical separator in a toolbar

```html
<div class="flex items-center gap-2 h-8">
  <button>Cut</button>
  <div scSeparator orientation="vertical"></div>
  <button>Copy</button>
  <div scSeparator orientation="vertical"></div>
  <button>Paste</button>
</div>
```

## Inputs

| Input         | Type                         | Default        | Description                                           |
| ------------- | ---------------------------- | -------------- | ----------------------------------------------------- |
| `orientation` | `'horizontal' \| 'vertical'` | `'horizontal'` | Direction of the separator                            |
| `decorative`  | `boolean`                    | `true`         | When `false`, exposes the separator to screen readers |
| `class`       | `string`                     | `''`           | Additional CSS classes                                |
