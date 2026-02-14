# Card

A container for grouping related content with header, body, and footer sections.

## Usage

```html
<div sc-card>
  <div sc-card-header>
    <h3 sc-card-title>Title</h3>
    <p sc-card-description>Description</p>
  </div>
  <div sc-card-content>
    <p>Content goes here.</p>
  </div>
  <div sc-card-footer>
    <p>Footer</p>
  </div>
</div>
```

## Directives

### ScCard

The main card container.

**Selector:** `div[sc-card]`

**Inputs:**

| Input   | Type                | Default     | Description            |
| ------- | ------------------- | ----------- | ---------------------- |
| `size`  | `'default' \| 'sm'` | `'default'` | Size of the card       |
| `class` | `string`            | `''`        | Additional CSS classes |

### ScCardHeader

Header section of the card. Supports grid layout with automatic columns when a card action is present.

**Selector:** `div[sc-card-header]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCardTitle

Title text within a card header.

**Selector:** `[sc-card-title]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCardDescription

Description text within a card header.

**Selector:** `[sc-card-description]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCardAction

Action area positioned at the top-right of the card header.

**Selector:** `div[sc-card-action]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCardContent

Main content area of the card.

**Selector:** `div[sc-card-content]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScCardFooter

Footer section of the card with a muted background and top border.

**Selector:** `div[sc-card-footer]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

## Examples

### Basic

```html
<div sc-card class="w-[350px]">
  <div sc-card-header>
    <h3 sc-card-title>Card Title</h3>
    <p sc-card-description>Card description goes here.</p>
  </div>
  <div sc-card-content>
    <p>Card content goes here.</p>
  </div>
  <div sc-card-footer>
    <p class="text-sm text-muted-foreground">Card footer</p>
  </div>
</div>
```

### With Action

```html
<div sc-card>
  <div sc-card-header>
    <h3 sc-card-title>Notifications</h3>
    <p sc-card-description>You have 3 unread messages.</p>
    <div sc-card-action>
      <button sc-button variant="outline" size="sm">View all</button>
    </div>
  </div>
  <div sc-card-content>
    <p>Content here.</p>
  </div>
</div>
```

### Small Size

```html
<div sc-card size="sm">
  <div sc-card-header>
    <h3 sc-card-title>Compact Card</h3>
  </div>
  <div sc-card-content>
    <p>Smaller padding and gaps.</p>
  </div>
</div>
```

## Features

- **Size Variants**: Default and small sizes with responsive padding
- **Card Action**: Optional action slot in the header with automatic grid layout
- **Footer Styling**: Muted background with top border
- **Composable**: Mix and match sub-components as needed

## Accessibility

- Uses semantic HTML elements for title (`h3`) and description (`p`)
- Proper contrast ratios for text and backgrounds
