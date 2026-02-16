# Avatar

An image element with a fallback for representing the user.

## Components

- `ScAvatar` - Container with rounded styling and size variants
- `ScAvatarImage` - The image element with load/error handling
- `ScAvatarFallback` - Fallback content when image is unavailable
- `ScAvatarBadge` - Status badge/indicator (e.g., online/offline)
- `ScAvatarGroup` - Container for displaying multiple avatars with overlap
- `ScAvatarGroupCount` - Count indicator for overflow avatars

## Usage

### Basic Avatar

```html
<span scAvatar>
  <img scAvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <span scAvatarFallback>JD</span>
</span>
```

### Fallback Only

When no image is available:

```html
<span scAvatar>
  <span scAvatarFallback>JD</span>
</span>
```

### With Icon Fallback

```html
<span scAvatar>
  <img scAvatarImage src="https://example.com/avatar.jpg" alt="User" />
  <span scAvatarFallback>
    <svg class="size-5"><!-- user icon --></svg>
  </span>
</span>
```

## Sizes

The avatar component supports three sizes: `sm`, `default`, and `lg`.

```html
<!-- Small -->
<span scAvatar size="sm">
  <img scAvatarImage src="..." alt="User" />
  <span scAvatarFallback>JD</span>
</span>

<!-- Default -->
<span scAvatar>
  <img scAvatarImage src="..." alt="User" />
  <span scAvatarFallback>JD</span>
</span>

<!-- Large -->
<span scAvatar size="lg">
  <img scAvatarImage src="..." alt="User" />
  <span scAvatarFallback>JD</span>
</span>
```

## Avatar with Badge

Display a status indicator using the badge component:

```html
<span scAvatar>
  <img scAvatarImage src="..." alt="User" />
  <span scAvatarFallback>JD</span>
  <span scAvatarBadge></span>
</span>
```

### Badge with Icon

```html
<span scAvatar>
  <img scAvatarImage src="..." alt="User" />
  <span scAvatarFallback>JD</span>
  <span scAvatarBadge>
    <svg><!-- check icon --></svg>
  </span>
</span>
```

## Avatar Group

Display multiple avatars with overlap:

```html
<div scAvatarGroup>
  <span scAvatar>
    <img scAvatarImage src="..." alt="User 1" />
    <span scAvatarFallback>U1</span>
  </span>
  <span scAvatar>
    <img scAvatarImage src="..." alt="User 2" />
    <span scAvatarFallback>U2</span>
  </span>
  <span scAvatar>
    <img scAvatarImage src="..." alt="User 3" />
    <span scAvatarFallback>U3</span>
  </span>
</div>
```

### Avatar Group with Count

Show overflow count for additional avatars:

```html
<div scAvatarGroup>
  <span scAvatar>
    <img scAvatarImage src="..." alt="User 1" />
    <span scAvatarFallback>U1</span>
  </span>
  <span scAvatar>
    <span scAvatarFallback>U2</span>
  </span>
  <span scAvatar>
    <span scAvatarFallback>U3</span>
  </span>
  <div scAvatarGroupCount>+5</div>
</div>
```

### Avatar Group with Count Icon

```html
<div scAvatarGroup>
  <span scAvatar>
    <span scAvatarFallback>U1</span>
  </span>
  <span scAvatar>
    <span scAvatarFallback>U2</span>
  </span>
  <div scAvatarGroupCount>
    <svg><!-- users icon --></svg>
  </div>
</div>
```

## Inputs

### ScAvatar

| Input   | Type                        | Default     | Description            |
| ------- | --------------------------- | ----------- | ---------------------- |
| `class` | `string`                    | `''`        | Additional CSS classes |
| `size`  | `'sm' \| 'default' \| 'lg'` | `'default'` | Avatar size variant    |

### ScAvatarImage

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScAvatarFallback

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScAvatarBadge

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScAvatarGroup

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScAvatarGroupCount

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## How It Works

1. `ScAvatarImage` starts loading and hides itself
2. `ScAvatarFallback` is visible while image loads
3. On successful load, image shows and fallback hides
4. On error, fallback remains visible

## Size Behavior

- **Small (`sm`)**: 6x6 (24px), text-xs for fallback, size-2 for badge
- **Default**: 8x8 (32px), text-sm for fallback, size-2.5 for badge
- **Large (`lg`)**: 10x10 (40px), text-sm for fallback, size-3 for badge

The badge automatically adjusts its size based on the avatar size and hides icons on small avatars.
