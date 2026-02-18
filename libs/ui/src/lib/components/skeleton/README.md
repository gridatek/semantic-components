# Skeleton

A placeholder to show while content is loading.

## Components

- `ScSkeleton` - An animated pulse placeholder applied as a directive on a `div`

## Usage

```html
<div scSkeleton class="h-4 w-48"></div>
```

## Examples

### Text lines

```html
<div class="space-y-2">
  <div scSkeleton class="h-4 w-full"></div>
  <div scSkeleton class="h-4 w-3/4"></div>
  <div scSkeleton class="h-4 w-1/2"></div>
</div>
```

### Card

```html
<div class="space-y-4 p-4">
  <div scSkeleton class="h-40 w-full rounded-xl"></div>
  <div class="space-y-2">
    <div scSkeleton class="h-4 w-3/4"></div>
    <div scSkeleton class="h-4 w-1/2"></div>
  </div>
</div>
```

### Avatar with text

```html
<div class="flex items-center gap-3">
  <div scSkeleton class="size-10 rounded-full"></div>
  <div class="space-y-2">
    <div scSkeleton class="h-4 w-32"></div>
    <div scSkeleton class="h-3 w-24"></div>
  </div>
</div>
```

## Inputs

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |
