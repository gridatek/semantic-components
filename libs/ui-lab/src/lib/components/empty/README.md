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
<div sc-empty class="border">
  <div sc-empty-header>
    <div sc-empty-media variant="icon">
      <svg si-search-icon></svg>
    </div>
    <div sc-empty-title>No results found</div>
    <div sc-empty-description>Try adjusting your search or filter to find what you're looking for.</div>
  </div>
</div>
```

## With Actions

```html
<div sc-empty class="border">
  <div sc-empty-header>
    <div sc-empty-media variant="icon">
      <svg si-folder-icon></svg>
    </div>
    <div sc-empty-title>No projects yet</div>
    <div sc-empty-description>Get started by creating your first project.</div>
  </div>
  <div sc-empty-content>
    <button sc-button>Create Project</button>
  </div>
</div>
```

## Media Variants

```html
<!-- Default: transparent background -->
<div sc-empty-media>
  <svg si-inbox-icon class="size-12"></svg>
</div>

<!-- Icon: muted background with rounded container -->
<div sc-empty-media variant="icon">
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
