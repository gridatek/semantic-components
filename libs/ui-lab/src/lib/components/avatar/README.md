# Avatar

An image element with a fallback for representing the user.

## Components

- `ScAvatar` - Container with rounded styling
- `ScAvatarImage` - The image element with load/error handling
- `ScAvatarFallback` - Fallback content when image is unavailable

## Usage

```html
<span sc-avatar>
  <img sc-avatar-image src="https://example.com/avatar.jpg" alt="User" />
  <span sc-avatar-fallback>JD</span>
</span>
```

## Fallback Only

When no image is available:

```html
<span sc-avatar>
  <span sc-avatar-fallback>JD</span>
</span>
```

## With Icon Fallback

```html
<span sc-avatar>
  <img sc-avatar-image src="https://example.com/avatar.jpg" alt="User" />
  <span sc-avatar-fallback>
    <svg class="size-5"><!-- user icon --></svg>
  </span>
</span>
```

## Different Sizes

```html
<!-- Small -->
<span sc-avatar class="size-6">
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback class="text-xs">JD</span>
</span>

<!-- Medium (default) -->
<span sc-avatar>
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback>JD</span>
</span>

<!-- Large -->
<span sc-avatar class="size-14">
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback class="text-lg">JD</span>
</span>
```

## Avatar Group

```html
<div class="flex -space-x-4">
  <span sc-avatar class="border-2 border-background">
    <img sc-avatar-image src="..." alt="User 1" />
    <span sc-avatar-fallback>U1</span>
  </span>
  <span sc-avatar class="border-2 border-background">
    <span sc-avatar-fallback>U2</span>
  </span>
  <span sc-avatar class="border-2 border-background">
    <span sc-avatar-fallback class="text-xs">+3</span>
  </span>
</div>
```

## With Status Indicator

```html
<div class="relative">
  <span sc-avatar>
    <img sc-avatar-image src="..." alt="User" />
    <span sc-avatar-fallback>JD</span>
  </span>
  <span class="absolute bottom-0 right-0 size-3 rounded-full border-2 border-background bg-green-500"></span>
</div>
```

## Inputs

### ScAvatar

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScAvatarImage

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScAvatarFallback

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## How It Works

1. `ScAvatarImage` starts loading and hides itself
2. `ScAvatarFallback` is visible while image loads
3. On successful load, image shows and fallback hides
4. On error, fallback remains visible
