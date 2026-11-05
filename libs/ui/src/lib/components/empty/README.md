# Empty

What to show where there is nothing yet — what is empty, why, what to do — in the look of the app's preset (`empty` key: shadcn's in each of the eight styles). Add `border` for a dashed outline.

## Components

- `ScEmpty` - Root container with centered layout
- `ScEmptyHeader` - Groups media, title, and description
- `ScEmptyMedia` - Icon or image wrapper with variant support
- `ScEmptyTitle` - What is empty: on a `div`, or best a heading (`h2`–`h6`, at the page's level)
- `ScEmptyDescription` - Explanatory text below the title
- `ScEmptyBody` - Slot for action buttons or additional content

## Usage

```html
<div scEmpty class="border">
  <div scEmptyHeader>
    <div scEmptyMedia variant="icon">
      <svg><!-- icon --></svg>
    </div>
    <h2 scEmptyTitle>No results found</h2>
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
    <h2 scEmptyTitle>No projects yet</h2>
    <div scEmptyDescription>Get started by creating your first project.</div>
  </div>
  <div scEmptyBody>
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

### ScEmptyBody

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |
