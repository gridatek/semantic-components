# Item

A flexible layout component for displaying structured content with media, titles, descriptions, and actions.

## Usage

```html
<div scItemGroup>
  <div scItem>
    <div scItemMedia variant="icon">
      <svg><!-- icon --></svg>
    </div>
    <div scItemBody>
      <div scItemTitle>Title</div>
      <p scItemDescription>Description text</p>
    </div>
    <div scItemActions>
      <button scButton variant="ghost" size="icon">Action</button>
    </div>
  </div>
</div>
```

## Directives

### ScItemGroup

Groups multiple items together in a vertical list.

**Selector:** `div[scItemGroup]`

**Host attributes:** `role="list"`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemSeparator

A visual separator between items.

**Selector:** `div[scItemSeparator]`

**Host attributes:** `role="separator"`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItem

The main item container with variant and size support.

**Selector:** `div[scItem]`

**Inputs:**

| Input     | Type          | Default     | Description            |
| --------- | ------------- | ----------- | ---------------------- |
| `variant` | `ItemVariant` | `'default'` | Visual style           |
| `size`    | `ItemSize`    | `'default'` | Size of the item       |
| `class`   | `string`      | `''`        | Additional CSS classes |

**ItemVariant:**

- `default` - Transparent border
- `outline` - Visible border
- `muted` - Muted background

**ItemSize:**

- `default` - Standard padding and gap
- `sm` - Same as default
- `xs` - Compact padding and gap

### ScItemMedia

Container for media content (icons, images) within an item.

**Selector:** `div[scItemMedia]`

**Inputs:**

| Input     | Type               | Default     | Description            |
| --------- | ------------------ | ----------- | ---------------------- |
| `variant` | `ItemMediaVariant` | `'default'` | Media display style    |
| `class`   | `string`           | `''`        | Additional CSS classes |

**ItemMediaVariant:**

- `default` - Transparent background
- `icon` - Sized for icons
- `image` - Sized for images with overflow hidden

### ScItemBody

Main body area within an item.

**Selector:** `div[scItemBody]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemTitle

Title text within an item.

**Selector:** `div[scItemTitle]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemDescription

Description text within an item.

**Selector:** `p[scItemDescription]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemActions

Container for action buttons within an item.

**Selector:** `div[scItemActions]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemHeader

Full-width header row within an item.

**Selector:** `div[scItemHeader]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemFooter

Full-width footer row within an item.

**Selector:** `div[scItemFooter]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Examples

### Basic

```html
<div scItemGroup>
  <div scItem>
    <div scItemBody>
      <div scItemTitle>Notifications</div>
      <p scItemDescription>Manage your notification preferences.</p>
    </div>
  </div>
  <div scItemSeparator></div>
  <div scItem>
    <div scItemBody>
      <div scItemTitle>Privacy</div>
      <p scItemDescription>Control your privacy settings.</p>
    </div>
  </div>
</div>
```

### With Media

```html
<div scItem>
  <div scItemMedia variant="icon">
    <svg><!-- icon --></svg>
  </div>
  <div scItemBody>
    <div scItemTitle>Settings</div>
    <p scItemDescription>Configure your account.</p>
  </div>
</div>
```

### With Actions

```html
<div scItem>
  <div scItemBody>
    <div scItemTitle>Profile</div>
    <p scItemDescription>Update your personal information.</p>
  </div>
  <div scItemActions>
    <button scButton variant="outline" size="sm">Edit</button>
  </div>
</div>
```

## Features

- **Multiple Variants**: 3 visual variants (default, outline, muted)
- **Size Options**: 3 sizes (default, sm, xs)
- **Media Support**: Icon and image variants with automatic sizing
- **Composable**: Mix and match sub-components as needed
- **Accessible**: Item group uses `role="list"`, separator uses `role="separator"`

## Accessibility

- `ScItemGroup` sets `role="list"` for screen readers
- `ScItemSeparator` sets `role="separator"` for semantic separation
- Focus-visible ring on items for keyboard navigation
