# Breadcrumb

Displays the path to the current resource using a hierarchy of links.

## Components

| Component               | Selector                     | Role                                               |
| ----------------------- | ---------------------------- | -------------------------------------------------- |
| `ScBreadcrumb`          | `nav[scBreadcrumb]`          | Root `<nav>` with `aria-label="breadcrumb"`        |
| `ScBreadcrumbList`      | `ol[scBreadcrumbList]`       | Ordered list container                             |
| `ScBreadcrumbItem`      | `li[scBreadcrumbItem]`       | Individual item wrapper                            |
| `ScBreadcrumbLink`      | `a[scBreadcrumbLink]`        | Clickable link to a page                           |
| `ScBreadcrumbPage`      | `span[scBreadcrumbPage]`     | Current page with `aria-current="page"`            |
| `ScBreadcrumbSeparator` | `li[scBreadcrumbSeparator]`  | Visual separator (defaults to `ChevronRight` icon) |
| `ScBreadcrumbEllipsis`  | `span[scBreadcrumbEllipsis]` | Collapsed items indicator with `Ellipsis` icon     |

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

### With Ellipsis

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

### Custom Separator

```html
<li scBreadcrumbSeparator>/</li>
```

### With RouterLink

```html
<li scBreadcrumbItem>
  <a scBreadcrumbLink routerLink="/components">Components</a>
</li>
```
