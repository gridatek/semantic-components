# Smart Pagination Feature

## Overview

Added intelligent automatic page generation to the pagination component. The component can now automatically calculate and generate page numbers with ellipses based on current page, page size, and total items.

## What Was Added

### New Type Export

```typescript
export type ScPaginationPage = { type: 'page'; value: number } | { type: 'ellipsis'; value: string };
```

### New Inputs to ScPagination

| Input          | Type      | Default | Description                                          |
| -------------- | --------- | ------- | ---------------------------------------------------- |
| `currentPage`  | `number`  | `1`     | Current active page (1-based)                        |
| `pageSize`     | `number`  | `10`    | Number of items per page                             |
| `totalItems`   | `number`  | `0`     | Total number of items across all pages               |
| `siblingCount` | `number`  | `1`     | Number of pages to show on each side of current page |
| `showEdges`    | `boolean` | `true`  | Whether to always show first and last pages          |

### New Computed Signals

- **`totalPages()`** - Automatically calculated from totalItems / pageSize
- **`pages()`** - Array of ScPaginationPage for rendering with @for loops

### Export As

The directive now uses `exportAs: 'scPagination'` allowing template reference access:

```html
<nav sc-pagination #pagination="scPagination" [currentPage]="1" [totalItems]="100">
  <!-- Access pagination.pages() and pagination.totalPages() -->
</nav>
```

## Usage

### Basic Smart Pagination

The pagination components handle clicks internally. Just listen to the `pageChange` event on the parent nav:

```typescript
import { Component, signal } from '@angular/core';

@Component({
  template: `
    <nav sc-pagination #pagination="scPagination" [currentPage]="currentPage()" [pageSize]="10" [totalItems]="100" (pageChange)="currentPage.set($event)">
      <ul sc-pagination-list>
        <li sc-pagination-item>
          <button sc-pagination-previous [disabled]="currentPage() === 1">
            <svg class="size-4"><!-- icon --></svg>
            <span>Previous</span>
          </button>
        </li>

        @for (page of pagination.pages(); track page.value) {
          <li sc-pagination-item>
            @if (page.type === 'ellipsis') {
              <span sc-pagination-ellipsis>
                <svg class="size-4"><!-- ellipsis icon --></svg>
                <span class="sr-only">More pages</span>
              </span>
            } @else {
              <button sc-pagination-link [page]="page.value" [isActive]="page.value === currentPage()">
                {{ page.value }}
              </button>
            }
          </li>
        }

        <li sc-pagination-item>
          <button sc-pagination-next [disabled]="currentPage() === pagination.totalPages()">
            <span>Next</span>
            <svg class="size-4"><!-- icon --></svg>
          </button>
        </li>
      </ul>
    </nav>
  `,
})
export class MyComponent {
  readonly currentPage = signal(1);
}
```

## How It Works

### Page Generation Algorithm

1. **Small Page Count** (≤7 pages): Shows all pages without ellipses
   - Example: `[1] [2] [3] [4] [5] [6] [7]`

2. **Large Page Count** (>7 pages): Intelligently places ellipses
   - Shows first page (if `showEdges: true`)
   - Shows pages around current page (controlled by `siblingCount`)
   - Shows last page (if `showEdges: true`)
   - Adds ellipses where pages are skipped

### Examples

#### Current Page: 1, Total Pages: 10

```
[1] [2] [3] [...] [10]
```

#### Current Page: 5, Total Pages: 10

```
[1] [...] [4] [5] [6] [...] [10]
```

#### Current Page: 10, Total Pages: 10

```
[1] [...] [8] [9] [10]
```

#### With siblingCount: 2

```
Current Page: 5, Total Pages: 15
[1] [...] [3] [4] [5] [6] [7] [...] [15]
```

#### With showEdges: false

```
Current Page: 5, Total Pages: 10
[4] [5] [6]
```

## Benefits

### ✅ For Library Consumers

1. **No Manual Page Calculation**
   - Library handles complex logic of determining which pages to show
   - Automatic ellipsis placement
   - Responsive to currentPage changes

2. **Simple Integration**
   - Just provide: currentPage, pageSize, totalItems
   - Use @for loop to render
   - Library does the rest

3. **Flexible Control**
   - Configure siblingCount for more/fewer page buttons
   - Toggle showEdges for different layouts
   - Still full control over rendering

### ✅ For the Library

1. **Maintains Composability**
   - Still uses directive pattern
   - Consumers still provide content via projection
   - Optional feature - manual mode still works

2. **Follows Design Principles**
   - Library provides logic and styling
   - Consumers provide content and handle events
   - Verbose but flexible

3. **Type Safety**
   - ScPaginationPage type ensures correct usage
   - TypeScript catches errors at compile time

## Comparison

### Before (Manual)

```html
<nav sc-pagination>
  <ul sc-pagination-list>
    <li sc-pagination-item>
      <button sc-pagination-previous>...</button>
    </li>
    <li sc-pagination-item>
      <button sc-pagination-link>1</button>
    </li>
    <li sc-pagination-item>
      <button sc-pagination-link [isActive]="true">2</button>
    </li>
    <!-- Manual ellipsis -->
    <li sc-pagination-item>
      <span sc-pagination-ellipsis>...</span>
    </li>
    <li sc-pagination-item>
      <button sc-pagination-link>10</button>
    </li>
    <li sc-pagination-item>
      <button sc-pagination-next>...</button>
    </li>
  </ul>
</nav>
```

**Issues:**

- Must manually determine which pages to show
- Must manually calculate when to show ellipses
- Must manually handle page transitions
- Lots of boilerplate code

### After (Smart)

```html
<nav sc-pagination #pagination="scPagination" [currentPage]="currentPage()" [pageSize]="10" [totalItems]="100" (pageChange)="currentPage.set($event)">
  <ul sc-pagination-list>
    <li sc-pagination-item>
      <button sc-pagination-previous [disabled]="currentPage() === 1">...</button>
    </li>

    @for (page of pagination.pages(); track page.value) {
    <li sc-pagination-item>
      @if (page.type === 'ellipsis') {
      <span sc-pagination-ellipsis>...</span>
      } @else {
      <button sc-pagination-link [page]="page.value" [isActive]="page.value === currentPage()">{{ page.value }}</button>
      }
    </li>
    }

    <li sc-pagination-item>
      <button sc-pagination-next [disabled]="currentPage() === pagination.totalPages()">...</button>
    </li>
  </ul>
</nav>
```

**Benefits:**

- ✅ Automatic page calculation
- ✅ Automatic ellipsis placement
- ✅ Clean, declarative code
- ✅ Reactive to currentPage changes
- ✅ Still customizable
- ✅ Internal click handling - single `pageChange` event instead of multiple click handlers

## Configuration Examples

### Show More Pages (siblingCount: 2)

```html
<nav sc-pagination [siblingCount]="2" ...>
  <!-- Shows more pages around current page -->
</nav>
```

Result: `[1] [...] [3] [4] [5] [6] [7] [...] [15]` (instead of `[1] [...] [4] [5] [6] [...] [15]`)

### Hide First/Last (showEdges: false)

```html
<nav sc-pagination [showEdges]="false" ...>
  <!-- Only shows pages around current page -->
</nav>
```

Result: `[4] [5] [6]` (instead of `[1] [...] [4] [5] [6] [...] [10]`)

### Compact Pagination (siblingCount: 0)

```html
<nav sc-pagination [siblingCount]="0" ...>
  <!-- Shows only current page with first/last -->
</nav>
```

Result: `[1] [...] [5] [...] [10]`

## Files Changed

1. **libs/ui/src/lib/components/pagination/pagination.ts**
   - Added smart pagination logic
   - Added new inputs
   - Added computed signals
   - Added exportAs

2. **libs/ui/src/lib/components/pagination/index.ts**
   - Exported ScPaginationPage type

3. **apps/showcase/src/app/pages/docs/pagination/demos/smart-pagination-demo.ts**
   - New demo showing smart pagination usage

4. **libs/ui/src/lib/components/pagination/README.md**
   - Added smart pagination section
   - Added new inputs documentation
   - Added usage examples

## Backward Compatibility

✅ **Fully backward compatible**

The smart pagination feature is completely optional. Existing manual implementations continue to work without any changes:

```html
<!-- Still works exactly as before -->
<nav sc-pagination>
  <ul sc-pagination-list>
    <li sc-pagination-item>
      <a sc-pagination-link href="#">1</a>
    </li>
  </ul>
</nav>
```

## Testing

The smart pagination logic handles:

- ✅ Small page counts (≤7 pages)
- ✅ Large page counts (>7 pages)
- ✅ Edge cases (first page, last page)
- ✅ Different siblingCount values
- ✅ Different showEdges values
- ✅ Dynamic currentPage changes
- ✅ Dynamic totalItems changes

## Future Enhancements

Potential future improvements:

- Server-side pagination support
- Custom ellipsis rendering
- Page jump dropdown
- Configurable display templates
- Mobile responsive variants

## Conclusion

The smart pagination feature adds intelligent page generation to the pagination component while maintaining:

- ✅ Composability
- ✅ Flexibility
- ✅ Design principles alignment
- ✅ Backward compatibility
- ✅ Type safety
- ✅ Clean API

Consumers can now choose between full manual control or automatic smart pagination based on their needs.
