# Breadcrumb

Where the page is, in the site: the pages above it as links, the page itself last. In the look of the app's preset.

## Usage

```html
<nav scBreadcrumb aria-label="Breadcrumb">
  <ol scBreadcrumbList>
    <li scBreadcrumbItem><a scBreadcrumbLink routerLink="/">Home</a></li>
    <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
    <li scBreadcrumbItem><a scBreadcrumbLink routerLink="/docs/components">Components</a></li>
    <li scBreadcrumbSeparator><svg siChevronRightIcon></svg></li>
    <li scBreadcrumbItem><span scBreadcrumbPage>Breadcrumb</span></li>
  </ol>
</nav>
```

## Notes

- Every part is a directive on your element; the icons are yours.
- Name the navigation (`aria-label`), uniquely if the page has another.
- The current page is not a link: `aria-current="page"`, read as a link that goes nowhere (shadcn's).
- The separators and the ellipsis are hidden from screen readers: the list says the order.
- A separator's icon turns right to left (`rtl:[&>svg]:rotate-180`): a chevron points the reading way; a slash or a dot looks the same.
- A crumb can open a menu: put the menu's trigger in a `scBreadcrumbItem`.

## API reference

Each part takes `class`, merged over the preset.

| Part                    | Selector                     | Description                                       |
| ----------------------- | ---------------------------- | ------------------------------------------------- |
| `ScBreadcrumb`          | `nav[scBreadcrumb]`          | The navigation; its name is yours.                |
| `ScBreadcrumbList`      | `ol[scBreadcrumbList]`       | The ordered list, wrapping on a narrow screen.    |
| `ScBreadcrumbItem`      | `li[scBreadcrumbItem]`       | A step: a link, the page, the ellipsis or a menu. |
| `ScBreadcrumbLink`      | `a[scBreadcrumbLink]`        | A page above: your `href` or `routerLink`.        |
| `ScBreadcrumbPage`      | `span[scBreadcrumbPage]`     | The current page.                                 |
| `ScBreadcrumbSeparator` | `li[scBreadcrumbSeparator]`  | Between steps: your icon, turned right to left.   |
| `ScBreadcrumbEllipsis`  | `span[scBreadcrumbEllipsis]` | Steps left out.                                   |

## Styles

From the preset (`breadcrumb`): the list (its gaps, text size — `text-xs` in lyra and mira, uppercase in sera), the item's gap and the ellipsis's size.
