# Keyboard Navigation

This document describes the keyboard navigation patterns for pagination components, ensuring full keyboard accessibility.

## Overview

All pagination components support full keyboard navigation following WAI-ARIA best practices. Users can navigate through pagination controls using standard keyboard interactions without requiring a mouse.

## Supported Keys

### Tab Navigation

- **Tab** - Move focus to the next interactive element in the pagination
- **Shift + Tab** - Move focus to the previous interactive element

### Activation

- **Enter** - Activate focused pagination control (links or buttons)
- **Space** - Activate focused pagination control (buttons only)

### Page Size Selector

- **Arrow Up/Down** - Navigate through page size options (when select is focused)
- **Enter/Space** - Open the dropdown (when select is focused)
- **Escape** - Close the dropdown without changing selection

## Component Keyboard Behavior

### ScPaginationLink

**Element**: Button or anchor

**Keys**:

- **Tab** - Focus the page link
- **Enter** - Navigate to the page
- **Space** - Navigate to the page (button only)

**Focus indicator**: Visible focus ring using `focus-visible:ring-2`

```html
<button sc-pagination-link [page]="2">2</button>
```

### ScPaginationPrevious / ScPaginationNext

**Element**: Button or anchor

**Keys**:

- **Tab** - Focus the navigation control
- **Enter** - Navigate to previous/next page
- **Space** - Navigate to previous/next page (button only)

**Disabled state**: When disabled, element is focusable but activation does nothing

```html
<button sc-pagination-previous [disabled]="currentPage() === 1">Previous</button>
```

### ScPaginationFirst / ScPaginationLast

**Element**: Button or anchor

**Keys**:

- **Tab** - Focus the navigation control
- **Enter** - Navigate to first/last page
- **Space** - Navigate to first/last page (button only)

**Disabled state**: When disabled, element is focusable but activation does nothing

```html
<button sc-pagination-first [disabled]="currentPage() === 1">First</button>
```

### ScPaginationPageSizeSelect

**Element**: Select element

**Keys**:

- **Tab** - Focus the select
- **Enter/Space** - Open dropdown
- **Arrow Up** - Select previous option
- **Arrow Down** - Select next option
- **Home** - Jump to first option
- **End** - Jump to last option
- **Escape** - Close dropdown without change

**Focus indicator**: Visible focus ring using `focus-visible:ring-2`

```html
<select sc-pagination-page-size-select></select>
```

## Focus Management

### Focus Order

The natural tab order follows the visual layout:

1. Page size selector (if present)
2. First page button (if present)
3. Previous page button
4. Page number links/buttons
5. Next page button
6. Last page button (if present)

### Focus Indicators

All interactive elements have visible focus indicators:

```css
focus-visible:outline-none
focus-visible:ring-2
focus-visible:ring-ring
focus-visible:ring-offset-2
```

### Disabled State Focus

Disabled controls remain in the tab order with `aria-disabled="true"` but do not perform actions when activated. This maintains consistent focus order regardless of pagination state.

## ARIA Attributes

### Navigation Container

```html
<nav sc-pagination role="navigation" aria-label="pagination"></nav>
```

- **role="navigation"** - Identifies the pagination region
- **aria-label="pagination"** - Provides accessible name

### Active Page

```html
<button sc-pagination-link [isActive]="true" aria-current="page">2</button>
```

- **aria-current="page"** - Indicates the current page

### Navigation Buttons

```html
<button sc-pagination-previous aria-label="Go to previous page">Previous</button>

<button sc-pagination-next aria-label="Go to next page">Next</button>

<button sc-pagination-first aria-label="Go to first page">First</button>

<button sc-pagination-last aria-label="Go to last page">Last</button>
```

- **aria-label** - Provides clear button purpose for screen readers

### Disabled Controls

```html
<button sc-pagination-previous [disabled]="true" aria-disabled="true">Previous</button>
```

- **aria-disabled="true"** - Announces disabled state to screen readers
- Element remains focusable but activation is prevented

### Ellipsis (Non-interactive)

```html
<span sc-pagination-ellipsis aria-hidden="true">
  <svg><!-- dots icon --></svg>
  <span class="sr-only">More pages</span>
</span>
```

- **aria-hidden="true"** - Hides decorative ellipsis from screen readers
- **.sr-only** - Provides screen reader text without visual display

## Best Practices

### Use Semantic HTML

Prefer `<button>` over `<a>` for client-side navigation:

```html
<!-- Good: Button for client-side navigation -->
<button sc-pagination-link [page]="2">2</button>

<!-- Also good: Anchor for server-side navigation -->
<a sc-pagination-link href="/page/2">2</a>
```

### Provide Clear Labels

Always provide text labels for navigation controls:

```html
<!-- Good: Text label provided -->
<button sc-pagination-previous>
  <svg><!-- icon --></svg>
  <span>Previous</span>
</button>

<!-- Avoid: Icon only -->
<button sc-pagination-previous>
  <svg><!-- icon --></svg>
</button>
```

If you must use icon-only, add `aria-label`:

```html
<button sc-pagination-previous aria-label="Go to previous page">
  <svg><!-- icon --></svg>
</button>
```

### Maintain Focus Context

When page changes, consider where to move focus:

```typescript
export class MyComponent {
  readonly currentPage = signal(1);

  onPageChange(newPage: number): void {
    this.currentPage.set(newPage);

    // Option 1: Announce page change
    // Screen readers will announce the new active page

    // Option 2: Move focus to main content
    // document.querySelector('[role="main"]')?.focus();

    // Option 3: Keep focus on pagination
    // Natural behavior - focus stays on clicked control
  }
}
```

### Page Size Selector Accessibility

Wrap the select with a visible label:

```html
<!-- Good: Visible label associated -->
<div class="flex items-center gap-2">
  <span class="text-sm text-muted-foreground">Items per page:</span>
  <sc-pagination-page-size-select />
</div>

<!-- Better: Using label element -->
<label class="flex items-center gap-2">
  <span class="text-sm text-muted-foreground">Items per page:</span>
  <sc-pagination-page-size-select />
</label>
```

### Loading States

When loading new page data, provide feedback:

```typescript
export class MyComponent {
  readonly loading = signal(false);
  readonly currentPage = signal(1);

  async onPageChange(newPage: number): Promise<void> {
    this.loading.set(true);
    try {
      await this.loadData(newPage);
      this.currentPage.set(newPage);
    } finally {
      this.loading.set(false);
    }
  }
}
```

```html
<nav sc-pagination [attr.aria-busy]="loading()" [currentPage]="currentPage()" (pageChange)="onPageChange($event)">
  <!-- pagination content -->
</nav>
```

## Testing Keyboard Navigation

### Manual Testing Checklist

1. ✅ All controls are reachable via Tab key
2. ✅ Focus indicators are clearly visible
3. ✅ Enter/Space keys activate controls
4. ✅ Disabled controls don't perform actions
5. ✅ Page size select works with arrow keys
6. ✅ Active page is announced by screen readers
7. ✅ Tab order matches visual layout
8. ✅ No keyboard traps

### Automated Testing

Use Playwright or similar tools to test keyboard interactions:

```typescript
test('pagination keyboard navigation', async ({ page }) => {
  await page.goto('/demos/pagination/page-size-pagination-demo');

  // Test Tab navigation
  await page.keyboard.press('Tab');
  await expect(page.locator('[sc-pagination-previous]')).toBeFocused();

  // Test Enter activation
  await page.keyboard.press('Enter');

  // Test focus indicators
  const focused = page.locator(':focus');
  await expect(focused).toHaveCSS('outline', expect.stringContaining('ring'));
});
```

## Common Issues and Solutions

### Issue: Focus Ring Not Visible

**Problem**: Custom styles override focus indicators

**Solution**: Use `focus-visible` instead of `focus`:

```css
/* Avoid */
.button:focus {
  outline: none;
}

/* Prefer */
.button:focus-visible {
  outline: 2px solid blue;
}
```

### Issue: Disabled Controls Skip in Tab Order

**Problem**: Using `disabled` attribute removes controls from tab order

**Solution**: The component handles this correctly with `aria-disabled` while keeping controls focusable.

### Issue: Select Opens on Space

**Problem**: Native select behavior may vary across browsers

**Solution**: This is standard behavior and should be maintained. Don't override native select interactions.

## Resources

- [WAI-ARIA Authoring Practices - Pagination](https://www.w3.org/WAI/ARIA/apg/patterns/)
- [WebAIM - Keyboard Accessibility](https://webaim.org/techniques/keyboard/)
- [WCAG 2.1 - Keyboard Accessible](https://www.w3.org/WAI/WCAG21/quickref/#keyboard-accessible)
