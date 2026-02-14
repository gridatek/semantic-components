# Item

A flexible layout component for displaying structured content with media, titles, descriptions, and actions.

## Usage

```html
<div sc-item-group>
  <div sc-item>
    <div sc-item-media variant="icon">
      <svg><!-- icon --></svg>
    </div>
    <div sc-item-content>
      <div sc-item-title>Title</div>
      <p sc-item-description>Description text</p>
    </div>
    <div sc-item-actions>
      <button sc-button variant="ghost" size="icon">Action</button>
    </div>
  </div>
</div>
```

## Directives

### ScItemGroup

Groups multiple items together in a vertical list.

**Selector:** `div[sc-item-group]`

**Host attributes:** `role="list"`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemSeparator

A visual separator between items.

**Selector:** `div[sc-item-separator]`

**Host attributes:** `role="separator"`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItem

The main item container with variant and size support.

**Selector:** `div[sc-item]`

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

**Selector:** `div[sc-item-media]`

**Inputs:**

| Input     | Type               | Default     | Description            |
| --------- | ------------------ | ----------- | ---------------------- |
| `variant` | `ItemMediaVariant` | `'default'` | Media display style    |
| `class`   | `string`           | `''`        | Additional CSS classes |

**ItemMediaVariant:**

- `default` - Transparent background
- `icon` - Sized for icons
- `image` - Sized for images with overflow hidden

### ScItemContent

Flexible content area within an item.

**Selector:** `div[sc-item-content]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemTitle

Title text within an item.

**Selector:** `div[sc-item-title]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemDescription

Description text within an item.

**Selector:** `p[sc-item-description]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemActions

Container for action buttons within an item.

**Selector:** `div[sc-item-actions]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemHeader

Full-width header row within an item.

**Selector:** `div[sc-item-header]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScItemFooter

Full-width footer row within an item.

**Selector:** `div[sc-item-footer]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Examples

### Basic

```html
<div sc-item-group>
  <div sc-item>
    <div sc-item-content>
      <div sc-item-title>Notifications</div>
      <p sc-item-description>Manage your notification preferences.</p>
    </div>
  </div>
  <div sc-item-separator></div>
  <div sc-item>
    <div sc-item-content>
      <div sc-item-title>Privacy</div>
      <p sc-item-description>Control your privacy settings.</p>
    </div>
  </div>
</div>
```

### With Media

```html
<div sc-item>
  <div sc-item-media variant="icon">
    <svg><!-- icon --></svg>
  </div>
  <div sc-item-content>
    <div sc-item-title>Settings</div>
    <p sc-item-description>Configure your account.</p>
  </div>
</div>
```

### With Actions

```html
<div sc-item>
  <div sc-item-content>
    <div sc-item-title>Profile</div>
    <p sc-item-description>Update your personal information.</p>
  </div>
  <div sc-item-actions>
    <button sc-button variant="outline" size="sm">Edit</button>
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
