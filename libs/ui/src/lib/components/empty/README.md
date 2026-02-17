# Empty

Displays an empty state with optional media, header, and action content.

## Components

- `ScEmpty` - Root container with centered layout
- `ScEmptyHeader` - Groups media, title, and description
- `ScEmptyMedia` - Icon or image wrapper with variant support
- `ScEmptyTitle` - Short heading for the empty state
- `ScEmptyDescription` - Explanatory text below the title
- `ScEmptyContent` - Slot for action buttons or additional content

## Usage

```html
<div scEmpty class="border">
  <div scEmptyHeader>
    <div scEmptyMedia variant="icon">
      <svg><!-- icon --></svg>
    </div>
    <div scEmptyTitle>No results found</div>
    <div scEmptyDescription>Try adjusting your search or filter to find what you're looking for.</div>
  </div>
</div>
```

## With Actions

```html
<div scEmpty class="border">
  <div scEmptyHeader>
    <div scEmptyMedia variant="icon">
      <svg><!-- icon --></svg>
    </div>
    <div scEmptyTitle>No projects yet</div>
    <div scEmptyDescription>Get started by creating your first project.</div>
  </div>
  <div scEmptyContent>
    <button scButton>Create Project</button>
  </div>
</div>
```

## ScEmptyMedia Variants

| Variant   | Description                                                |
| --------- | ---------------------------------------------------------- |
| `default` | Transparent background, full-size media                    |
| `icon`    | Muted background, rounded container sized for a small icon |

## Inputs

### ScEmpty

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScEmptyHeader

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScEmptyMedia

| Input     | Type                  | Default     | Description            |
| --------- | --------------------- | ----------- | ---------------------- |
| `variant` | `'default' \| 'icon'` | `'default'` | Media display style    |
| `class`   | `string`              | `''`        | Additional CSS classes |

### ScEmptyTitle

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScEmptyDescription

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScEmptyContent

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |
