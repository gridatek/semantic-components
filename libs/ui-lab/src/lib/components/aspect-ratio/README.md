# Aspect Ratio

Displays content within a desired ratio.

## Components

- `ScAspectRatio` - Container that maintains a specific aspect ratio

## Usage

```html
<div sc-aspect-ratio [ratio]="16 / 9">
  <img src="..." alt="..." class="size-full object-cover" />
</div>
```

## Common Ratios

### 16:9 (Widescreen)

```html
<div sc-aspect-ratio [ratio]="16 / 9">
  <img src="..." alt="..." class="size-full object-cover" />
</div>
```

### 4:3 (Standard)

```html
<div sc-aspect-ratio [ratio]="4 / 3">
  <img src="..." alt="..." class="size-full object-cover" />
</div>
```

### 1:1 (Square)

```html
<div sc-aspect-ratio [ratio]="1">
  <img src="..." alt="..." class="size-full object-cover" />
</div>
```

### 21:9 (Ultrawide)

```html
<div sc-aspect-ratio [ratio]="21 / 9">
  <img src="..." alt="..." class="size-full object-cover" />
</div>
```

### 9:16 (Portrait)

```html
<div sc-aspect-ratio [ratio]="9 / 16">
  <img src="..." alt="..." class="size-full object-cover" />
</div>
```

## With Placeholder

```html
<div sc-aspect-ratio [ratio]="16 / 9" class="bg-muted">
  <div class="flex size-full items-center justify-center">
    <span class="text-muted-foreground">No image</span>
  </div>
</div>
```

## Video Container

```html
<div sc-aspect-ratio [ratio]="16 / 9">
  <iframe src="..." class="size-full" allowfullscreen></iframe>
</div>
```

## Inputs

| Input   | Type     | Default | Description                 |
| ------- | -------- | ------- | --------------------------- |
| `ratio` | `number` | `1`     | Aspect ratio (width/height) |
| `class` | `string` | `''`    | Additional CSS classes      |

## Styling

The component uses the native CSS `aspect-ratio` property:

- `relative` - For absolute positioning of children
- `w-full` - Full width of container
- `[style.aspect-ratio]` - Dynamic aspect ratio

## Usage Tips

- Wrap in a container with a fixed width to control size
- Use `overflow-hidden rounded-md` on parent for rounded images
- Child content should use `size-full` to fill the container
- Use `object-cover` on images to maintain aspect without distortion
