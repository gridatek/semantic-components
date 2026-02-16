# Pagination Component - Accessibility & Keyboard Navigation Review

**Date:** 2026-02-12
**Reviewer:** Claude
**Status:** Needs fixes for WCAG AA compliance

---

## Executive Summary

The pagination component has a solid foundation with good ARIA practices, but requires **3 critical fixes** to meet WCAG AA standards. All issues are low-effort, high-impact changes.

---

## Current Implementation

### ✅ What's Working Well

#### Keyboard Navigation (Basic)

- **Tab** - Native browser behavior works correctly through all interactive elements
- **Enter/Space** - Native button activation (handled by browser)
- **↑ ↓** - Native `<select>` element handles page size options automatically

#### Accessibility Features

- ✅ `role="navigation"` with `aria-label="pagination"` on container
- ✅ ARIA labels on all navigation buttons:
  - `aria-label="Go to first page"`
  - `aria-label="Go to previous page"`
  - `aria-label="Go to next page"`
  - `aria-label="Go to last page"`
  - `aria-label="Go to page {n}"` on page links
- ✅ `aria-current="page"` on active page link
- ✅ `aria-disabled` on disabled navigation buttons
- ✅ Semantic HTML (buttons, anchors, nav, select)
- ✅ Good e2e test coverage in Playwright

#### Component Architecture

- Clean separation of concerns (link, previous, next, first, last, page-size)
- Smart pagination logic with ellipsis
- Supports both button and anchor elements
- Proper disabled state computation

---

## 🔴 Critical Issues (WCAG AA Violations)

### Issue 1: Disabled Buttons Still Focusable and Activatable

**Severity:** High
**WCAG:** 2.1.1 Keyboard (Level A)
**Effort:** Low

#### Problem

Components use `aria-disabled` without the native `disabled` attribute.

**Current implementation:**

```typescript
// pagination-previous.ts:21-22
host: {
  '[attr.aria-disabled]': 'disabled() || null',
}
```

**What's wrong:**

- Buttons with `aria-disabled="true"` remain in the tab order
- They can still receive keyboard focus
- They can still be activated with Enter/Space (though onClick prevents action)
- Creates confusing UX: user tabs to disabled button, tries to activate, nothing happens

**WCAG Failure:**
Per WCAG 2.1.1, disabled controls should not be keyboard-operable. While the `onClick` handler prevents action, the button is still technically operable (it receives and responds to keyboard events).

#### Solution

Use the native `disabled` attribute:

```typescript
// Option A: Use native disabled (recommended)
host: {
  '[disabled]': 'disabled()',
  // Remove aria-disabled - native disabled provides it automatically
}

// Option B: If disabled buttons must remain focusable (rare case)
host: {
  '[attr.aria-disabled]': 'disabled() || null',
  '(keydown)': 'onKeyDown($event)', // Prevent Enter/Space
}

onKeyDown(event: KeyboardEvent): void {
  if (this.disabled() && (event.key === 'Enter' || event.key === ' ')) {
    event.preventDefault();
    event.stopPropagation();
  }
}
```

**Recommendation:** Use Option A (native disabled). Option B is only needed if there's a specific UX requirement for disabled buttons to remain focusable.

#### Files to Update

- `libs/ui/src/lib/components/pagination/pagination-previous.ts`
- `libs/ui/src/lib/components/pagination/pagination-next.ts`
- `libs/ui/src/lib/components/pagination/pagination-first.ts`
- `libs/ui/src/lib/components/pagination/pagination-last.ts`
- `libs/ui/src/lib/components/pagination/pagination-link.ts`

---

### Issue 2: Page Size Select Missing Accessible Label

**Severity:** High
**WCAG:** 1.3.1 Info and Relationships (Level A), 4.1.2 Name, Role, Value (Level A)
**Effort:** Low

#### Problem

The page size `<select>` element has no programmatically associated label.

**Current implementation:**

```html
<!-- keyboard-navigation-pagination-demo.ts:90-93 -->
<label class="flex items-center gap-2">
  <span class="text-sm text-muted-foreground">Items per page:</span>
  <sc-pagination-page-size-select />
</label>
```

```typescript
// pagination-page-size.ts:19-23
<select
  [value]="pagination.pageSize()"
  (change)="onPageSizeChange($event)"
  class="..."
>
```

**What's wrong:**

- The `<label>` element doesn't have a `for` attribute
- The `<select>` doesn't have an `id` attribute
- They're not programmatically connected
- Screen readers won't announce "Items per page" when the select is focused
- Violates WCAG requirement that form inputs have accessible names

#### Solution

**Option A: Add aria-label to select (simplest)**

```typescript
// pagination-page-size.ts
<select
  aria-label="Items per page"
  [value]="pagination.pageSize()"
  (change)="onPageSizeChange($event)"
  class="..."
>
```

**Option B: Add id/for relationship (more semantic)**

```typescript
// pagination-page-size.ts
export class ScPaginationPageSizeSelect {
  private readonly idGenerator = inject(_IdGenerator);
  protected readonly selectId = computed(() => this.idGenerator.generate('sc-page-size-select-'));

  // Template:
  <select
    [id]="selectId()"
    [value]="pagination.pageSize()"
    (change)="onPageSizeChange($event)"
    class="..."
  >
```

```html
<!-- Consumer usage -->
<label [for]="pageSizeRef.selectId()">Items per page:</label>
<sc-pagination-page-size-select #pageSizeRef />
```

**Recommendation:** Use Option A (aria-label). It's simpler and doesn't require consumer template changes. Option B is more semantic but requires the consumer to connect the label manually.

#### File to Update

- `libs/ui/src/lib/components/pagination/pagination-page-size.ts`

---

### Issue 3: No Live Region for Page Changes

**Severity:** Medium
**WCAG:** 4.1.3 Status Messages (Level AA)
**Effort:** Low

#### Problem

When users navigate to a different page, screen reader users receive no feedback that the page has changed.

**What's wrong:**

- Clicking a page button updates the visual state
- `aria-current="page"` updates on the new active button
- BUT screen readers don't announce the change unless the user navigates back to the pagination controls
- Users don't know if their action succeeded
- Particularly problematic for dynamic content updates

#### Solution

Add an `aria-live` region that announces page changes:

```typescript
// pagination.ts
@Directive({
  selector: 'nav[sc-pagination]',
  host: {
    // ... existing bindings
  },
  template: `
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      Page {{ currentPage() }} of {{ totalPages() }}
    </div>
  `,
})
```

**However**, `@Directive` doesn't support templates. Solutions:

**Option A: Make ScPagination a Component**

```typescript
@Component({
  selector: 'nav[sc-pagination]',
  template: `
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      Page {{ currentPage() }} of {{ totalPages() }}
    </div>
    <ng-content />
  `,
})
```

**Option B: Consumer adds live region**

```html
<!-- Demo template -->
<nav sc-pagination #pagination="scPagination" ...>
  <div aria-live="polite" aria-atomic="true" class="sr-only">Page {{ pagination.currentPage() }} of {{ pagination.totalPages() }}</div>
  <!-- ... pagination content ... -->
</nav>
```

**Option C: Dedicated component**

```typescript
@Component({
  selector: 'sc-pagination-live-region',
  template: `
    <div aria-live="polite" aria-atomic="true" class="sr-only">
      {{ message() }}
    </div>
  `,
})
export class ScPaginationLiveRegion {
  private readonly pagination = inject(ScPagination);

  protected readonly message = computed(() => `Page ${this.pagination.currentPage()} of ${this.pagination.totalPages()}`);
}
```

**Recommendation:** Use Option C. It's composable, doesn't break existing templates, and keeps the live region logic separate.

#### Files to Update

- Create: `libs/ui/src/lib/components/pagination/pagination-live-region.ts`
- Update: `libs/ui/src/lib/components/pagination/index.ts` (export new component)
- Update: Demo templates to include `<sc-pagination-live-region />`

---

## 🟡 Enhancement Opportunities (Not Required for WCAG)

### Enhancement 1: Arrow Key Navigation

**Severity:** Low
**Standard:** Common UX pattern (not required by WCAG)
**Effort:** Medium

#### Proposal

Add ← → arrow key support when focused on pagination buttons.

**Expected behavior:**

- Focus on any pagination button
- Press → to go to next page (same as clicking Next)
- Press ← to go to previous page (same as clicking Previous)
- Respects disabled states (can't go beyond first/last page)

#### Implementation

```typescript
// Add to ScPagination directive
host: {
  // ... existing
  '(keydown.ArrowLeft)': 'onArrowLeft($event)',
  '(keydown.ArrowRight)': 'onArrowRight($event)',
  '[attr.tabindex]': '0', // Make nav itself focusable
}

onArrowLeft(event: KeyboardEvent): void {
  if (this.currentPage() > 1) {
    event.preventDefault();
    this.goToPage(this.currentPage() - 1);
  }
}

onArrowRight(event: KeyboardEvent): void {
  if (this.currentPage() < this.totalPages()) {
    event.preventDefault();
    this.goToPage(this.currentPage() + 1);
  }
}
```

**Alternative:** Only handle arrow keys when focus is on Previous/Next buttons (more conservative).

#### Discussion Points

- Should arrow keys work when nav is focused, or only when buttons are focused?
- Should arrow keys skip the button tab order and jump pages directly?
- Does this conflict with any other keyboard patterns?

---

### Enhancement 2: Home/End Key Support

**Severity:** Low
**Standard:** Common UX pattern (not required by WCAG)
**Effort:** Low

#### Proposal

Add Home/End key support to jump to first/last page.

**Expected behavior:**

- Focus on pagination
- Press Home → Go to page 1
- Press End → Go to last page

#### Implementation

```typescript
// Add to ScPagination directive
host: {
  // ... existing
  '(keydown.Home)': 'onHome($event)',
  '(keydown.End)': 'onEnd($event)',
}

onHome(event: KeyboardEvent): void {
  event.preventDefault();
  this.goToPage(1);
}

onEnd(event: KeyboardEvent): void {
  event.preventDefault();
  this.goToPage(this.totalPages());
}
```

---

### Enhancement 3: Focus Management After Page Change

**Severity:** Low
**Standard:** Best practice (not required by WCAG)
**Effort:** Medium

#### Current Behavior

When a user clicks a page button, the page changes but focus behavior is unclear.

#### Proposal Options

**Option A: Keep focus on the same button**

- If user clicks "Next", focus stays on "Next" button after page change
- Pros: Predictable, easy to navigate through pages quickly
- Cons: If Next button becomes disabled (last page), focus is lost

**Option B: Move focus to the new active page link**

- If user clicks "Next" from page 2→3, focus moves to the "3" button
- Pros: Announces current page, clear state
- Cons: Harder to navigate quickly through pages

**Option C: Move focus to content area**

- After page change, focus moves to `#content` or first heading
- Pros: Screen reader users can immediately read new content
- Cons: Requires consumer to mark content area, harder to navigate back

**Recommendation:** Option A for keyboard navigation. Let browser handle focus naturally. If a button becomes disabled, browser will move focus to the next focusable element.

---

## 📋 Implementation Checklist

### Phase 1: Critical Fixes (Required for WCAG AA)

- [ ] **Issue 1:** Replace `aria-disabled` with native `disabled` attribute
  - [ ] Update `pagination-previous.ts`
  - [ ] Update `pagination-next.ts`
  - [ ] Update `pagination-first.ts`
  - [ ] Update `pagination-last.ts`
  - [ ] Update `pagination-link.ts`
  - [ ] Update e2e tests (disabled buttons should not be focusable)

- [ ] **Issue 2:** Add accessible label to page size select
  - [ ] Update `pagination-page-size.ts` with `aria-label`
  - [ ] Update demo templates if needed
  - [ ] Add e2e test for aria-label

- [ ] **Issue 3:** Add live region for page changes
  - [ ] Create `pagination-live-region.ts` component
  - [ ] Export from `index.ts`
  - [ ] Update demo templates to include live region
  - [ ] Add e2e test for live region announcements

### Phase 2: Enhancements (Optional)

- [ ] **Enhancement 1:** Arrow key navigation
  - [ ] Implement ← → handlers
  - [ ] Add e2e tests
  - [ ] Update keyboard navigation demo

- [ ] **Enhancement 2:** Home/End key support
  - [ ] Implement Home/End handlers
  - [ ] Add e2e tests
  - [ ] Update keyboard navigation demo

- [ ] **Enhancement 3:** Focus management
  - [ ] Decide on focus strategy
  - [ ] Implement focus management
  - [ ] Add e2e tests

---

## Testing Strategy

### Automated Tests (Playwright)

- [ ] Test that disabled buttons are not focusable via Tab
- [ ] Test that disabled buttons cannot be activated with Enter/Space
- [ ] Test that page size select has accessible name (via aria-label or label[for])
- [ ] Test that live region updates when page changes
- [ ] Test arrow key navigation (if implemented)
- [ ] Test Home/End keys (if implemented)

### Manual Tests (Screen Reader)

- [ ] NVDA (Windows) + Firefox
- [ ] JAWS (Windows) + Chrome
- [ ] VoiceOver (macOS) + Safari
- [ ] TalkBack (Android) + Chrome

**Test scenarios:**

1. Navigate pagination with Tab key
2. Activate buttons with Enter and Space
3. Verify disabled buttons are skipped
4. Verify page changes are announced
5. Verify page size select is properly labeled
6. Navigate page size options with arrow keys

### Axe DevTools

- [ ] Run axe on all pagination demos
- [ ] Verify no violations
- [ ] Document any intentional warnings/incomplete findings

---

## Open Questions

1. **Disabled button behavior:** Should disabled buttons be completely unfocusable (native `disabled`), or should they remain focusable for screen reader discovery?
   - **Recommendation:** Unfocusable (native disabled). This is standard web behavior.

2. **Live region verbosity:** Should the live region announce "Page 3 of 10" or just "Page 3"?
   - **Recommendation:** Include "of {total}" for context.

3. **Arrow key scope:** Should arrow keys work when the `<nav>` itself is focused, or only when individual buttons are focused?
   - **Recommendation:** Only when nav or buttons are focused, not globally.

4. **Page size label:** Should the label be built into the component or left to consumers?
   - **Recommendation:** Built-in `aria-label` for simplicity. Consumers can override if needed.

5. **First/Last buttons:** Are these always needed, or should they be optional?
   - **Current:** Optional (consumer includes them in template).
   - **Recommendation:** Keep optional. Small datasets don't need them.

---

## References

- [WCAG 2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html)
- [WCAG 1.3.1 Info and Relationships](https://www.w3.org/WAI/WCAG21/Understanding/info-and-relationships.html)
- [WCAG 4.1.2 Name, Role, Value](https://www.w3.org/WAI/WCAG21/Understanding/name-role-value.html)
- [WCAG 4.1.3 Status Messages](https://www.w3.org/WAI/WCAG21/Understanding/status-messages.html)
- [ARIA: button role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/button_role)
- [ARIA: navigation role](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/Roles/navigation_role)
- [Using aria-live](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA/ARIA_Live_Regions)

---

## Revision History

| Date       | Author | Changes                      |
| ---------- | ------ | ---------------------------- |
| 2026-02-12 | Claude | Initial accessibility review |
