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
- `pages()`: the first and the last page (`boundaries`), the current one with `siblings` pages either side, ellipses between — as many items wherever the current page is (7 by default), all the pages when they fit.
- The current page is outlined and `aria-current="page"`.
- Previous and First are disabled on the first page, Next and Last on the last: `aria-disabled`, out of the tab order. A part's `disabled` disables it whatever the page.
- Use buttons when the page changes in place, links when each page has its own URL. On an `a` the href is yours (`href="?page=2"`, a `routerLink`) and the link follows it; read the page from the URL into `currentPage`. A disabled link goes nowhere on a click but keeps its href: leave it off for one that should not open in a new tab either. A button is `type="button"` unless you give it a `type`: it never submits a form round it by default.
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

`scPaginationStatus` says which page is shown and announces it when it changes (`role="status"`). Its text is yours: `Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}`, or the items shown, `{{ pagination.range().start }}–{{ pagination.range().end }} of {{ pagination.totalItems() }}`; visible or `sr-only`.

## API reference

### ScPagination — `nav[scPagination], div[scPagination]`

Exported as `scPagination`.

| Input         | Type     | Default | Description                                     |
| ------------- | -------- | ------- | ----------------------------------------------- |
| `totalItems`  | `number` | `0`     | How many items there are.                       |
| `pageSize`    | `number` | `10`    | Items per page; `[(pageSize)]` two-way.         |
| `currentPage` | `number` | `1`     | The page; `[(currentPage)]` two-way.            |
| `siblings`    | `number` | `1`     | Pages shown on each side of the current one.    |
| `boundaries`  | `number` | `1`     | Pages always shown at the start and at the end. |
| `class`       | `string` | `''`    | Classes merged over the preset.                 |

| Output   | Type                                 | Description                                        |
| -------- | ------------------------------------ | -------------------------------------------------- |
| `change` | `{ page: number; pageSize: number }` | The user changed the page or its size: to load it. |

Signals:

- `currentPage()`: the page, kept between 1 and the last page, even as items go (a filter);
- `pageSize()`, `totalPages()` (at least 1, with no items too);
- `previousPage()`, `nextPage()`: the page before and after, `null` at the ends (for links);
- `range()`: `{ start, end }`, the items shown, counted from 1 (`0`–`0` with none);
- `pages()`.

Methods: `goToPage(page)` (kept in range), `changePageSize(size)` (back to page 1).

### ScPaginationLink — `a[scPaginationLink], button[scPaginationLink]`

| Input      | Type                                | Default    | Description                     |
| ---------- | ----------------------------------- | ---------- | ------------------------------- |
| `page`     | `number`                            | —          | The page it goes to.            |
| `size`     | `ScButtonVariants['size']`          | `'icon'`   | The button size.                |
| `disabled` | `boolean`                           | `false`    | Not followed.                   |
| `type`     | `'button'`, `'submit'` or `'reset'` | `'button'` | On a button; not set on a link. |
| `class`    | `string`                            | `''`       |                                 |

### ScPaginationPrevious, ScPaginationNext, ScPaginationFirst, ScPaginationLast

On an `a` or a `button`.

| Input      | Type                                | Default     | Description                       |
| ---------- | ----------------------------------- | ----------- | --------------------------------- |
| `variant`  | `ScButtonVariants['variant']`       | `'ghost'`   | The button look.                  |
| `size`     | `ScButtonVariants['size']`          | `'default'` | `'icon'` for an icon-only button. |
| `disabled` | `boolean`                           | `false`     | Disabled whatever the page.       |
| `type`     | `'button'`, `'submit'` or `'reset'` | `'button'`  | On a button; not set on a link.   |
| `class`    | `string`                            | `''`        |                                   |

### ScPaginationList, ScPaginationItem, ScPaginationEllipsis, ScPaginationStatus

`ul[scPaginationList]`, `li[scPaginationItem]`, `span[scPaginationEllipsis]` (hidden from screen readers), `[scPaginationStatus]`. Input: `class`.

## Styles

From the preset (`pagination`): the list's gap, the ellipsis's size, and the padding by the arrow of a text Previous or Next. The buttons are the preset's buttons.
