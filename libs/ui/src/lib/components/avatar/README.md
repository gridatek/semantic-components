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
<span sc-avatar>
  <img sc-avatar-image src="https://example.com/avatar.jpg" alt="User" />
  <span sc-avatar-fallback>JD</span>
</span>
```

### Fallback Only

When no image is available:

```html
<span sc-avatar>
  <span sc-avatar-fallback>JD</span>
</span>
```

### With Icon Fallback

```html
<span sc-avatar>
  <img sc-avatar-image src="https://example.com/avatar.jpg" alt="User" />
  <span sc-avatar-fallback>
    <svg class="size-5"><!-- user icon --></svg>
  </span>
</span>
```

## Sizes

The avatar component supports three sizes: `sm`, `default`, and `lg`.

```html
<!-- Small -->
<span sc-avatar size="sm">
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback>JD</span>
</span>

<!-- Default -->
<span sc-avatar>
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback>JD</span>
</span>

<!-- Large -->
<span sc-avatar size="lg">
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback>JD</span>
</span>
```

## Avatar with Badge

Display a status indicator using the badge component:

```html
<span sc-avatar>
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback>JD</span>
  <span sc-avatar-badge></span>
</span>
```

### Badge with Icon

```html
<span sc-avatar>
  <img sc-avatar-image src="..." alt="User" />
  <span sc-avatar-fallback>JD</span>
  <span sc-avatar-badge>
    <svg><!-- check icon --></svg>
  </span>
</span>
```

## Avatar Group

Display multiple avatars with overlap:

```html
<div sc-avatar-group>
  <span sc-avatar>
    <img sc-avatar-image src="..." alt="User 1" />
    <span sc-avatar-fallback>U1</span>
  </span>
  <span sc-avatar>
    <img sc-avatar-image src="..." alt="User 2" />
    <span sc-avatar-fallback>U2</span>
  </span>
  <span sc-avatar>
    <img sc-avatar-image src="..." alt="User 3" />
    <span sc-avatar-fallback>U3</span>
  </span>
</div>
```

### Avatar Group with Count

Show overflow count for additional avatars:

```html
<div sc-avatar-group>
  <span sc-avatar>
    <img sc-avatar-image src="..." alt="User 1" />
    <span sc-avatar-fallback>U1</span>
  </span>
  <span sc-avatar>
    <span sc-avatar-fallback>U2</span>
  </span>
  <span sc-avatar>
    <span sc-avatar-fallback>U3</span>
  </span>
  <div sc-avatar-group-count>+5</div>
</div>
```

### Avatar Group with Count Icon

```html
<div sc-avatar-group>
  <span sc-avatar>
    <span sc-avatar-fallback>U1</span>
  </span>
  <span sc-avatar>
    <span sc-avatar-fallback>U2</span>
  </span>
  <div sc-avatar-group-count>
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
