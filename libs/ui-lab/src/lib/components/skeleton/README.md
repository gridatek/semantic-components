# Skeleton

Use to show a placeholder while content is loading.

## Components

- `ScSkeleton` - A pulsing placeholder element

## Usage

```html
<div sc-skeleton class="h-4 w-[250px]"></div>
```

## Examples

### Card Skeleton

```html
<div class="flex items-center space-x-4">
  <div sc-skeleton class="size-12 rounded-full"></div>
  <div class="space-y-2">
    <div sc-skeleton class="h-4 w-[250px]"></div>
    <div sc-skeleton class="h-4 w-[200px]"></div>
  </div>
</div>
```

### Article Skeleton

```html
<div class="space-y-3">
  <div sc-skeleton class="h-[125px] w-[250px] rounded-xl"></div>
  <div class="space-y-2">
    <div sc-skeleton class="h-4 w-[250px]"></div>
    <div sc-skeleton class="h-4 w-[200px]"></div>
  </div>
</div>
```

### List Skeleton

```html
@for (i of [1, 2, 3]; track i) {
<div class="flex items-center space-x-4">
  <div sc-skeleton class="size-10 rounded-full"></div>
  <div class="flex-1 space-y-2">
    <div sc-skeleton class="h-4 w-3/4"></div>
    <div sc-skeleton class="h-3 w-1/2"></div>
  </div>
</div>
}
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Styling

The skeleton uses:

- `animate-pulse` for the pulsing animation
- `bg-muted` for the background color
- `rounded-md` for default border radius

Override with custom classes:

```html
<!-- Circular skeleton -->
<div sc-skeleton class="size-12 rounded-full"></div>

<!-- Large rounded skeleton -->
<div sc-skeleton class="h-[200px] w-full rounded-xl"></div>

<!-- Custom background -->
<div sc-skeleton class="h-4 w-full bg-primary/20"></div>
```
