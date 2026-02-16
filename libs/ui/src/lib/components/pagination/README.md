# Pagination

Pagination with page navigation, next and previous links. Supports both manual and smart automatic page generation.

## Components

- `ScPagination` - Navigation container with optional smart pagination logic
- `ScPaginationList` - List container (ul)
- `ScPaginationItem` - List item (li)
- `ScPaginationLink` - Page number link/button
- `ScPaginationPrevious` - Previous page link/button
- `ScPaginationNext` - Next page link/button
- `ScPaginationFirst` - First page link/button
- `ScPaginationLast` - Last page link/button
- `ScPaginationEllipsis` - Ellipsis indicator
- `ScPaginationPageSizeSelect` - Page size selector (select dropdown)

## Features

- **Manual Mode**: Full control over pagination items (basic usage)
- **Smart Mode**: Automatic page number and ellipsis generation (always returns 7 items when totalPages > 7)
- Automatic calculation of total pages
- Disabled state support for navigation buttons
- **Internal state management**: Components handle state internally with automatic input syncing
- **Unified change event**: Single event for both page and page size changes
- **Auto-sized icons**: SVG icons automatically sized via `[&_svg]:size-4`

## Usage

### Basic Example

```html
<nav scPagination>
  <ul scPaginationList>
    <li scPaginationItem>
      <button scPaginationPrevious>
        <svg si-chevron-left-icon></svg>
        <span>Previous</span>
      </button>
    </li>
    <li scPaginationItem>
      <button scPaginationLink [page]="1">1</button>
    </li>
    <li scPaginationItem>
      <button scPaginationLink [page]="2">2</button>
    </li>
    <li scPaginationItem>
      <button scPaginationLink [page]="3">3</button>
    </li>
    <li scPaginationItem>
      <button scPaginationNext>
        <span>Next</span>
        <svg si-chevron-right-icon></svg>
      </button>
    </li>
  </ul>
</nav>
```

### With Icons (Lucide)

```typescript
import {
  SiChevronLeftIcon,
  SiChevronRightIcon,
  SiEllipsisIcon,
} from '@semantic-icons/lucide-icons';

@Component({
  imports: [
    ScPagination,
    ScPaginationList,
    ScPaginationItem,
    ScPaginationLink,
    ScPaginationPrevious,
    ScPaginationNext,
    ScPaginationEllipsis,
    SiChevronLeftIcon,
    SiChevronRightIcon,
    SiEllipsisIcon,
  ],
  template: `
    <nav scPagination>
      <ul scPaginationList>
        <li scPaginationItem>
          <button scPaginationPrevious>
            <svg si-chevron-left-icon></svg>
            <span>Previous</span>
          </button>
        </li>
        <!-- Page items here -->
        <li scPaginationItem>
          <button scPaginationNext>
            <span>Next</span>
            <svg si-chevron-right-icon></svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
})
```

**Note**: Icons are automatically sized via `[&_svg]:size-4`. No need to add `class="size-4"` manually.

## Smart Pagination (Automatic Page Generation)

The pagination component can automatically calculate and generate page numbers with ellipses:

```typescript
import { Component, signal } from '@angular/core';
import { ScPaginationChange } from '@semantic-components/ui-lab';

@Component({
  template: `
    <nav scPagination #pagination="scPagination" [currentPage]="currentPage()" [pageSize]="10" [totalItems]="100" (change)="onPaginationChange($event)">
      <ul scPaginationList>
        <li scPaginationItem>
          <button scPaginationPrevious>
            <svg si-chevron-left-icon></svg>
            <span>Previous</span>
          </button>
        </li>

        @for (page of pagination.pages(); track page.value) {
          <li scPaginationItem>
            @if (page.type === 'ellipsis') {
              <span scPaginationEllipsis>
                <svg si-ellipsis-icon></svg>
                <span class="sr-only">More pages</span>
              </span>
            } @else {
              <button scPaginationLink [page]="page.value">
                {{ page.value }}
              </button>
            }
          </li>
        }

        <li scPaginationItem>
          <button scPaginationNext>
            <span>Next</span>
            <svg si-chevron-right-icon></svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
})
export class MyComponent {
  readonly currentPage = signal(1);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
  }
}
```

### Smart Pagination Features

- Automatically generates page numbers based on `currentPage`, `pageSize`, and `totalItems`
- **Always returns exactly 7 items** when `totalPages > 7`
- Intelligently places ellipses when there are many pages
- Exposes `pagination.pages()` array for iteration
- Exposes `pagination.totalPages()` for total page count
- Each item in `pages()` has type `ScPaginationPage`: `{ type: 'page' | 'ellipsis', value: number | string }`
- Active state is automatically computed for pagination links

## Disabled State

Navigation buttons (Previous, Next, First, Last) automatically disable themselves based on the current page:

- **Previous** and **First**: Auto-disabled when on page 1
- **Next** and **Last**: Auto-disabled when on the last page

You can also manually disable any button:

```html
<!-- Manually disabled -->
<button scPaginationPrevious [disabled]="true">
  <!-- content -->
</button>

<!-- Disabled link -->
<button scPaginationLink [disabled]="true">1</button>
```

## First and Last Page Navigation

Use `ScPaginationFirst` and `ScPaginationLast` for quick navigation to the first and last pages:

```html
<nav scPagination #pagination="scPagination" [currentPage]="currentPage()" [pageSize]="10" [totalItems]="100" (change)="onPaginationChange($event)">
  <ul scPaginationList>
    <li scPaginationItem>
      <button scPaginationFirst>
        <svg si-chevrons-left-icon></svg>
        <span>First</span>
      </button>
    </li>
    <li scPaginationItem>
      <button scPaginationPrevious>
        <svg si-chevron-left-icon></svg>
        <span>Previous</span>
      </button>
    </li>

    <!-- Page numbers here -->

    <li scPaginationItem>
      <button scPaginationNext>
        <span>Next</span>
        <svg si-chevron-right-icon></svg>
      </button>
    </li>
    <li scPaginationItem>
      <button scPaginationLast>
        <span>Last</span>
        <svg si-chevrons-right-icon></svg>
      </button>
    </li>
  </ul>
</nav>
```

## Page Size Selector

Use `ScPaginationPageSizeSelect` to allow users to change the number of items displayed per page:

```typescript
import { Component, signal } from '@angular/core';
import { ScPaginationChange } from '@semantic-components/ui-lab';

@Component({
  template: `
    <nav scPagination #pagination="scPagination" [currentPage]="currentPage()" [pageSize]="pageSize()" [totalItems]="totalItems()" [pageSizes]="[10, 25, 50, 100]" (change)="onPaginationChange($event)">
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted-foreground">Items per page:</span>
        <scPaginationPageSizeSelect />
      </div>

      <ul scPaginationList>
        <!-- Pagination items here -->
      </ul>
    </nav>
  `,
})
export class MyComponent {
  readonly currentPage = signal(1);
  readonly pageSize = signal(10);
  readonly totalItems = signal(250);

  onPaginationChange(event: ScPaginationChange): void {
    this.currentPage.set(event.page);
    this.pageSize.set(event.pageSize);
  }
}
```

Key points:

- `ScPaginationPageSizeSelect` renders only the select element
- Wrap it with a label or other elements as needed in your template
- Must be a child of `<nav scPagination>` to access pagination context
- Configure available options via `[pageSizes]` on the parent `ScPagination`
- Listen to `(change)` to receive both page and pageSize updates
- The component automatically resets to page 1 when page size changes

## Inputs & Outputs

### ScPagination

| Input         | Type       | Default             | Description                            |
| ------------- | ---------- | ------------------- | -------------------------------------- |
| `currentPage` | `number`   | `1`                 | Current active page (1-based)          |
| `pageSize`    | `number`   | `10`                | Number of items per page               |
| `totalItems`  | `number`   | `0`                 | Total number of items across all pages |
| `pageSizes`   | `number[]` | `[10, 25, 50, 100]` | Available page size options            |
| `class`       | `string`   | `''`                | Additional CSS classes                 |

| Output   | Type                 | Description                           |
| -------- | -------------------- | ------------------------------------- |
| `change` | `ScPaginationChange` | Emitted when page or pageSize changes |

**ScPaginationChange interface:**

```typescript
interface ScPaginationChange {
  page: number;
  pageSize: number;
}
```

### ScPaginationLink

| Input      | Type                                  | Default  | Description                      |
| ---------- | ------------------------------------- | -------- | -------------------------------- |
| `page`     | `number`                              | -        | Page number this link represents |
| `size`     | `'default' \| 'sm' \| 'lg' \| 'icon'` | `'icon'` | Button size                      |
| `disabled` | `boolean`                             | `false`  | Disabled state                   |
| `class`    | `string`                              | `''`     | Additional CSS classes           |

**Note**: The active state is automatically computed by comparing the `page` input with the parent pagination's `currentPage`.

### ScPaginationPrevious

| Input      | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `disabled` | `boolean` | `false` | Disabled state         |
| `class`    | `string`  | `''`    | Additional CSS classes |

### ScPaginationNext

| Input      | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `disabled` | `boolean` | `false` | Disabled state         |
| `class`    | `string`  | `''`    | Additional CSS classes |

### ScPaginationFirst

| Input      | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `disabled` | `boolean` | `false` | Disabled state         |
| `class`    | `string`  | `''`    | Additional CSS classes |

### ScPaginationLast

| Input      | Type      | Default | Description            |
| ---------- | --------- | ------- | ---------------------- |
| `disabled` | `boolean` | `false` | Disabled state         |
| `class`    | `string`  | `''`    | Additional CSS classes |

### ScPaginationPageSizeSelect

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

**Note**: This component renders only the select element. The page size options are configured via the `pageSizes` input on the parent `ScPagination` component.

## Accessibility

- Uses `role="navigation"` with `aria-label="pagination"`
- Active page has `aria-current="page"`
- Previous/Next/First/Last have `aria-label` for screen readers
- Disabled state uses `aria-disabled` attribute with automatic styling
- Ellipsis is `aria-hidden` with `.sr-only` text
- Focus ring for keyboard navigation

## Internal State Management

The pagination component uses internal signals with effects to manage state:

- Accepts `currentPage` and `pageSize` as inputs
- Maintains internal state that syncs with inputs
- Updates internal state when user interacts (clicks links, changes page size)
- Emits `change` event with both page and pageSize
- Parent can optionally update inputs in response to the event
- Works in both controlled and semi-controlled modes
