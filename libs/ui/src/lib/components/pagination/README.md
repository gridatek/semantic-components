# Pagination

Moves through pages of results — the pages, previous and next — in the look of the app's preset. It counts the pages from the number of items and the page size, and works out which to show.

## Usage

```html
<nav scPagination aria-label="Results" #pagination="scPagination" [totalItems]="200" [pageSize]="10">
  <ul scPaginationList>
    <li scPaginationItem>
      <button scPaginationPrevious>
        <svg siChevronLeftIcon data-icon="inline-start"></svg>
        Previous
      </button>
    </li>
    @for (item of pagination.pages(); track item.value) {
    <li scPaginationItem>
      @if (item.type === 'ellipsis') {
      <span scPaginationEllipsis><svg siEllipsisIcon></svg></span>
      } @else {
      <button scPaginationLink [page]="item.value">{{ item.value }}</button>
      }
    </li>
    }
    <li scPaginationItem>
      <button scPaginationNext>
        Next
        <svg siChevronRightIcon data-icon="inline-end"></svg>
      </button>
    </li>
  </ul>
</nav>
```

## Anatomy

shadcn's parts, each a directive on your element; the icons and the text are yours:

```html
<nav scPagination>
  <ul scPaginationList>
    <li scPaginationItem><button scPaginationFirst></button></li>
    <li scPaginationItem><button scPaginationPrevious></button></li>
    <li scPaginationItem><button scPaginationLink></button></li>
    <li scPaginationItem><span scPaginationEllipsis></span></li>
    <li scPaginationItem><button scPaginationNext></button></li>
    <li scPaginationItem><button scPaginationLast></button></li>
  </ul>
  <p scPaginationStatus></p>
</nav>
```

- Name the navigation (`aria-label`) and every icon-only button (an `sr-only` span).
- `pages()` gives every page up to 7, then 7 items: the first, the last, the current with its neighbours, and ellipses.
- The current page is outlined and `aria-current="page"`.
- Previous and First are disabled on the first page, Next and Last on the last: `aria-disabled`, out of the tab order. A part's `disabled` disables it whatever the page.
- Use buttons when the page changes in place. On an `a` the parts set `href="#"` and keep the click.
- Previous's and Next's chevrons flip right to left.

## Rows per page

Not a part: put a Select beside it and call `changePageSize()`, which goes back to page 1.

```html
<div scSelect [value]="'' + pagination.pageSize()" (valueChange)="pagination.changePageSize(+$event)">
  <div scSelectLabel>Rows per page</div>
  …
</div>
```

## Status

`scPaginationStatus` says which page is shown and announces it when it changes (`role="status"`). Its text is yours: `Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}`, visible or `sr-only`.

## API reference

### ScPagination — `nav[scPagination], div[scPagination]`

Exported as `scPagination`.

| Input         | Type     | Default | Description                                                        |
| ------------- | -------- | ------- | ------------------------------------------------------------------ |
| `totalItems`  | `number` | `0`     | How many items there are.                                          |
| `pageSize`    | `number` | `10`    | Items per page, at first.                                          |
| `currentPage` | `number` | `1`     | The page, at first and whenever it changes; kept by it after that. |
| `class`       | `string` | `''`    | Classes merged over the preset.                                    |

| Output   | Type                                 | Description                        |
| -------- | ------------------------------------ | ---------------------------------- |
| `change` | `{ page: number; pageSize: number }` | The page or the page size changed. |

Signals: `currentPage()`, `pageSize()`, `totalPages()`, `pages()`. Methods: `goToPage(page)`, `changePageSize(size)`.

### ScPaginationLink — `a[scPaginationLink], button[scPaginationLink]`

| Input      | Type                       | Default  | Description          |
| ---------- | -------------------------- | -------- | -------------------- |
| `page`     | `number`                   | —        | The page it goes to. |
| `size`     | `ScButtonVariants['size']` | `'icon'` | The button size.     |
| `disabled` | `boolean`                  | `false`  | Not followed.        |
| `class`    | `string`                   | `''`     |                      |

### ScPaginationPrevious, ScPaginationNext, ScPaginationFirst, ScPaginationLast

On an `a` or a `button`.

| Input      | Type                          | Default     | Description                       |
| ---------- | ----------------------------- | ----------- | --------------------------------- |
| `variant`  | `ScButtonVariants['variant']` | `'ghost'`   | The button look.                  |
| `size`     | `ScButtonVariants['size']`    | `'default'` | `'icon'` for an icon-only button. |
| `disabled` | `boolean`                     | `false`     | Disabled whatever the page.       |
| `class`    | `string`                      | `''`        |                                   |

### ScPaginationList, ScPaginationItem, ScPaginationEllipsis, ScPaginationStatus

`ul[scPaginationList]`, `li[scPaginationItem]`, `span[scPaginationEllipsis]` (hidden from screen readers), `[scPaginationStatus]`. Input: `class`.

## Styles

From the preset (`pagination`): the list's gap, the ellipsis's size, and the padding by the arrow of a text Previous or Next. The buttons are the preset's buttons.
