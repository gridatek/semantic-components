# Badge

Displays a badge or a component that looks like a badge.

## Components

- `ScBadge` - A small status indicator with variant support

## Usage

```html
<div sc-badge>Badge</div>
```

## Variants

```html
<div sc-badge>Default</div>
<div sc-badge variant="secondary">Secondary</div>
<div sc-badge variant="destructive">Destructive</div>
<div sc-badge variant="outline">Outline</div>
```

## With Icons

```html
<div sc-badge class="gap-1">
  <svg class="size-3"><!-- icon --></svg>
  Premium
</div>
```

## Notification Count

```html
<div class="relative">
  <button><!-- button content --></button>
  <span sc-badge class="absolute -right-1 -top-1 flex size-5 items-center justify-center p-0">3</span>
</div>
```

## Custom Colors

Override the default colors with custom classes:

```html
<div sc-badge class="bg-green-500 hover:bg-green-500/80">Active</div>
<div sc-badge class="bg-yellow-500 hover:bg-yellow-500/80">Warning</div>
<div sc-badge class="bg-blue-500 hover:bg-blue-500/80">Info</div>
```

## Inputs

| Input     | Type                                                     | Default     | Description            |
| --------- | -------------------------------------------------------- | ----------- | ---------------------- |
| `variant` | `'default' \| 'secondary' \| 'destructive' \| 'outline'` | `'default'` | Badge variant          |
| `class`   | `string`                                                 | `''`        | Additional CSS classes |

## Variant Styles

| Variant       | Description                                     |
| ------------- | ----------------------------------------------- |
| `default`     | Primary background with primary-foreground text |
| `secondary`   | Secondary background with secondary-foreground  |
| `destructive` | Destructive background for errors/warnings      |
| `outline`     | Transparent with border                         |
