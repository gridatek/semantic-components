# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Components

- `ScBreadcrumb` - Root nav element with aria-label
- `ScBreadcrumbList` - Ordered list container
- `ScBreadcrumbItem` - Individual item wrapper
- `ScBreadcrumbLink` - Clickable link to a page
- `ScBreadcrumbPage` - Current page (non-clickable)
- `ScBreadcrumbSeparator` - Visual separator between items
- `ScBreadcrumbEllipsis` - Collapsed items indicator

## Usage

```html
<nav scBreadcrumb>
  <ol scBreadcrumbList>
    <li scBreadcrumbItem>
      <a scBreadcrumbLink href="/">Home</a>
    </li>
    <li scBreadcrumbSeparator></li>
    <li scBreadcrumbItem>
      <a scBreadcrumbLink href="/components">Components</a>
    </li>
    <li scBreadcrumbSeparator></li>
    <li scBreadcrumbItem>
      <span scBreadcrumbPage>Breadcrumb</span>
    </li>
  </ol>
</nav>
```

## With Ellipsis

For long paths, use the ellipsis to indicate collapsed items:

```html
<nav scBreadcrumb>
  <ol scBreadcrumbList>
    <li scBreadcrumbItem>
      <a scBreadcrumbLink href="/">Home</a>
    </li>
    <li scBreadcrumbSeparator></li>
    <li scBreadcrumbItem>
      <span scBreadcrumbEllipsis></span>
    </li>
    <li scBreadcrumbSeparator></li>
    <li scBreadcrumbItem>
      <span scBreadcrumbPage>Current Page</span>
    </li>
  </ol>
</nav>
```

## Custom Separator

Pass content to the separator to customize it:

```html
<li scBreadcrumbSeparator>/</li>
```

## With RouterLink

Use Angular's routerLink for navigation:

```html
<li scBreadcrumbItem>
  <a scBreadcrumbLink routerLink="/components">Components</a>
</li>
```

## Accessibility

- Uses semantic `<nav>` element with `aria-label="breadcrumb"`
- Uses `<ol>` for ordered list semantics
- Current page marked with `aria-current="page"`
- Separators are hidden from assistive technology with `aria-hidden="true"`
