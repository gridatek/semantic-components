# Empty

A composable empty state component for displaying placeholder content.

## Components

- `ScEmpty` - Root container with dashed border and centered layout
- `ScEmptyHeader` - Header section for icon, title, and description
- `ScEmptyMedia` - Media/icon container with variant support
- `ScEmptyTitle` - Title text
- `ScEmptyDescription` - Description text
- `ScEmptyContent` - Content section for actions or additional content

## Usage

```html
<div scEmpty class="border">
  <div scEmptyHeader>
    <div scEmptyMedia variant="icon">
      <svg si-search-icon></svg>
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
      <svg si-folder-icon></svg>
    </div>
    <div scEmptyTitle>No projects yet</div>
    <div scEmptyDescription>Get started by creating your first project.</div>
  </div>
  <div scEmptyContent>
    <button scButton>Create Project</button>
  </div>
</div>
```

## Media Variants

```html
<!-- Default: transparent background -->
<div scEmptyMedia>
  <svg si-inbox-icon class="size-12"></svg>
</div>

<!-- Icon: muted background with rounded container -->
<div scEmptyMedia variant="icon">
  <svg si-search-icon></svg>
</div>
```

## Inputs

### ScEmpty

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScEmptyMedia

| Input     | Type                  | Default     | Description            |
| --------- | --------------------- | ----------- | ---------------------- |
| `variant` | `'default' \| 'icon'` | `'default'` | Media container style  |
| `class`   | `string`              | `''`        | Additional CSS classes |
