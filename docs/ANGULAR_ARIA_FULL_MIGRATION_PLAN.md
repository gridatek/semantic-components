# Complete Angular ARIA Migration Plan - All Components

## Executive Summary

This document outlines the migration strategy for ALL components in the semantic-components library to use Angular ARIA primitives where applicable. The goal is to achieve full WCAG AA compliance and WAI-ARIA pattern adherence.

**Package Status:** `@angular/aria` v21.0.6 already installed ✅

**Available Primitives:**

- accordion, tabs, menu, listbox, combobox, toolbar, tree, grid

---

## Tier 1: Components with Direct ARIA Primitive Mappings

### 1. ACCORDION COMPONENT

**Status:** Migration attempted but reverted - see `ACCORDION_ARIA_MIGRATION.md` for details

**Location:** `libs/ui/src/lib/components/accordion/`

**Current Implementation:**

- Uses CDK Accordion directives
- No ARIA attributes (aria-expanded, aria-controls, role attributes)
- Uses `data-state` attribute instead of ARIA

**Angular ARIA Primitive:** `@angular/aria/accordion`

**Migration Changes:**

1. **ScAccordion** → Use `AccordionGroup` host directive
2. **ScAccordionToggle** → Use `AccordionTrigger` host directive
3. **ScAccordionContent** → Use `AccordionPanel` + `AccordionContent` directives
4. **ScAccordionItem** → Simplify (remove state management)
5. Add `panelId` attributes to link triggers and panels

**Automatic ARIA Benefits:**

- `role="button"` on triggers
- `aria-expanded="true/false"` on triggers
- `aria-controls` linking triggers to panels
- `role="region"` on panels
- `inert` attribute on collapsed panels
- Keyboard navigation (Arrow keys, Home, End)

**Files to Modify:**

- `accordion.ts` - Replace CdkAccordion with AccordionGroup
- `accordion-toggle.ts` - Replace manual click handling with AccordionTrigger
- `accordion-content.ts` - Add AccordionPanel + AccordionContent
- `accordion-item.ts` - Simplify, remove state management
- `accordion-demo.ts` - Add panelId attributes

**Files to Delete:**

- `accordion-item-state.ts` - No longer needed

---

### 2. TABS COMPONENT

**Location:** `libs/ui/src/lib/components/tabs/`

**Current Implementation:**

- Manual ARIA implementation
- Has `aria-selected`, `aria-controls` already
- Manual keyboard navigation (arrow keys, home/end)
- Uses custom state management

**Angular ARIA Primitive:** `@angular/aria/tabs`

**Available Directives:**

- `TabGroup` - Container managing tab state
- `Tab` - Individual tab trigger
- `TabPanel` - Tab content panel

**Current Files to Review:**

- `tab.ts` - Current implementation with manual ARIA
- `tabs.ts` - Container component
- `tabs-content.ts` - Content wrapper
- `tabs-list.ts` - Tab list container
- `tabs-trigger.ts` - Tab trigger button

**Migration Changes:**

1. **ScTabs** (tabs.ts) → Use `TabGroup` host directive
2. **ScTabsTrigger** (tabs-trigger.ts) → Use `Tab` directive
3. **ScTabsContent** (tabs-content.ts) → Use `TabPanel` directive
4. Add `tabId`/`panelId` attributes to link tabs and panels
5. Remove manual keyboard handling (TabGroup provides it)
6. Remove manual aria-selected management

**Automatic ARIA Benefits:**

- Standardized `role="tab"`, `role="tablist"`, `role="tabpanel"`
- Automatic `aria-selected` management
- Automatic `aria-controls` and `aria-labelledby` linking
- Built-in keyboard navigation
- Automatic `tabindex` management for roving tabindex pattern
- Support for automatic vs manual activation modes

**Expected Changes:**

- Simpler component code
- Less manual state management
- Standardized keyboard behavior
- Better screen reader support

---

### 3. SELECT COMPONENT

**Location:** `libs/ui/src/lib/components/select/`

**Current Implementation:**

- Uses CDK's `ActiveDescendantKeyManager`
- Has `aria-expanded`, `aria-haspopup`, `aria-controls`, `aria-activedescendant`
- 950+ lines of complex code
- Manual keyboard navigation

**Angular ARIA Primitive:** `@angular/aria/listbox` or `@angular/aria/select`

**Available Options:**

- **Listbox** - For simpler selection lists
- **Select** - For dropdown-style selects (single selection)
- **Multiselect** - For multiple selection dropdowns

**Current Key Files:**

- `select.ts` - Main select component (950+ lines)
- `select-content.ts` - Dropdown content
- `select-group.ts` - Option grouping
- `select-item.ts` - Individual option
- `select-trigger.ts` - Button that opens select
- `select-value.ts` - Selected value display

**Migration Strategy:**

1. Determine if select is single or multi-selection
2. Choose appropriate primitive (Select vs Multiselect)
3. Replace CDK ActiveDescendantKeyManager with Angular ARIA
4. Use `Listbox` + `ListboxOption` directives
5. Add proper option IDs for linking

**Automatic ARIA Benefits:**

- `role="listbox"` and `role="option"` on appropriate elements
- Automatic `aria-activedescendant` management
- Built-in keyboard navigation (Arrow keys, type-ahead, Home/End)
- Automatic `aria-selected` on options
- Better `aria-expanded` management

**Complexity:** HIGH - This is a large component with many features

**Recommendation:** Start with simpler components first, tackle this one last

---

### 4. MENU COMPONENT

**Location:** `libs/ui/src/lib/components/menu/`

**Current Implementation:**

- Uses CDK menu directives (`CdkMenu`, `CdkMenuItem`, `CdkMenuItemCheckbox`)
- Already has good accessibility via CDK
- Supports nested submenus

**Angular ARIA Primitive:** `@angular/aria/menu`

**Current Key Files:**

- `menu.ts` - Uses CdkMenu
- `menu-item.ts` - Uses CdkMenuItem
- `menu-checkbox-item.ts` - Uses CdkMenuItemCheckbox
- `menu-content.ts` - Menu content wrapper
- `menu-group.ts` - Menu grouping
- `menu-label.ts` - Menu labels
- `menu-radio-group.ts` - Radio button menus
- `menu-radio-item.ts` - Radio menu items
- `menu-separator.ts` - Menu separators
- `menu-shortcut.ts` - Keyboard shortcuts display
- `menu-sub-content.ts` - Submenu content
- `menu-sub-trigger.ts` - Submenu triggers

**Migration Decision:**

- CDK Menu already provides excellent accessibility
- Angular ARIA Menu might be redundant
- **Recommendation:** LOW PRIORITY - evaluate if Angular ARIA menu offers benefits over CDK

**Potential Benefits:**

- Consistency with other Angular ARIA components
- Potentially simpler API
- Native Angular ARIA keyboard handling

**Risk:**

- May not offer significant improvement over CDK
- Large refactor for minimal gain

**Action:** Research Angular ARIA menu capabilities vs CDK menu before migrating

---

## Tier 2: Form Controls (Standard ARIA Attributes)

These components may not need Angular ARIA primitives, but need proper ARIA attributes added.

### 5. FIELD COMPONENTS

**Location:** `libs/ui/src/lib/components/field/`

**Current Issues:**

- Missing `aria-describedby` linking inputs to error messages
- Missing `aria-invalid` on validation failures
- Error messages have `aria-live="polite"` ✅ (good!)

**Files:**

- `control.ts` - Form control wrapper
- `field-error-message.ts` - Error message display (has aria-live already)
- `field-help-text.ts` - Help text
- `field-label.ts` - Form labels

**Changes Needed:**

**control.ts:**

```typescript
// Add computed signal for aria-describedby
protected readonly ariaDescribedBy = computed(() => {
  const ids: string[] = [];
  if (this.hasError()) {
    ids.push(this.errorMessageId());
  }
  if (this.helpTextId()) {
    ids.push(this.helpTextId());
  }
  return ids.length > 0 ? ids.join(' ') : undefined;
});

host: {
  '[attr.aria-describedby]': 'ariaDescribedBy()',
  '[attr.aria-invalid]': 'hasError()',
}
```

**field-error-message.ts:**

```typescript
// Already has:
host: {
  role: 'alert',
  'aria-live': 'polite',
}

// Needs to expose ID for linking
readonly id = input<string>(); // Generate unique ID
```

**field-help-text.ts:**

```typescript
// Needs ID for aria-describedby linking
readonly id = input<string>(); // Generate unique ID
```

**Implementation Notes:**

- Use existing `_IdGenerator` service for IDs
- Automatically link controls to errors and help text
- Add `aria-invalid="true"` when validation fails

---

### 6. INPUT COMPONENT

**Location:** `libs/ui/src/lib/components/input/`

**Current Issues:**

- Missing label association via `aria-labelledby`
- No `aria-describedby` for help text
- No `aria-invalid` for validation state

**File:** `input.ts`

**Changes Needed:**

```typescript
host: {
  '[attr.aria-labelledby]': 'labelId()',
  '[attr.aria-describedby]': 'describedBy()',
  '[attr.aria-invalid]': 'invalid()',
  '[attr.aria-required]': 'required()',
}
```

**Inputs to Add:**

```typescript
readonly labelId = input<string>(); // Link to field-label
readonly describedBy = input<string>(); // Link to help text/errors
readonly invalid = input<boolean>(false);
readonly required = input<boolean>(false);
```

---

### 7. CHECKBOX COMPONENT

**Location:** `libs/ui/src/lib/components/checkbox/`

**Current Implementation:**

- Uses native `<input type="checkbox">`
- Good semantic foundation

**Current Issues:**

- Missing `aria-invalid` for validation errors
- Missing `aria-describedby` for error messages

**File:** `checkbox.ts`

**Changes Needed:**

```typescript
host: {
  '[attr.aria-invalid]': 'invalid()',
  '[attr.aria-describedby]': 'describedBy()',
}

readonly invalid = input<boolean>(false);
readonly describedBy = input<string>(); // Link to error messages
```

---

### 8. RADIO GROUP COMPONENT

**Location:** `libs/ui/src/lib/components/radio-group/`

**Current Implementation:**

- Uses native `<input type="radio">`
- Good semantic foundation

**Current Issues:**

- Missing `aria-invalid` for validation errors
- Missing `aria-describedby` for error messages
- Radio group needs proper `role="radiogroup"`

**Files:**

- `radio-group.ts` - Container
- `radio.ts` - Individual radio button

**Changes Needed:**

**radio-group.ts:**

```typescript
host: {
  role: 'radiogroup',
  '[attr.aria-invalid]': 'invalid()',
  '[attr.aria-describedby]': 'describedBy()',
  '[attr.aria-labelledby]': 'labelId()',
}

readonly invalid = input<boolean>(false);
readonly describedBy = input<string>();
readonly labelId = input<string>();
```

---

### 9. SLIDER COMPONENT

**Location:** `libs/ui/src/lib/components/slider/`

**Current Issues:**

- Missing `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Missing `aria-valuetext` for formatted values
- Missing `aria-orientation`
- Missing `aria-labelledby` for labels

**File:** `slider.ts`

**Changes Needed:**

```typescript
host: {
  role: 'slider',
  '[attr.aria-valuemin]': 'min()',
  '[attr.aria-valuemax]': 'max()',
  '[attr.aria-valuenow]': 'value()',
  '[attr.aria-valuetext]': 'valueText()',
  '[attr.aria-orientation]': 'orientation()',
  '[attr.aria-labelledby]': 'labelId()',
  '[attr.aria-disabled]': 'disabled()',
}

readonly min = input<number>(0);
readonly max = input<number>(100);
readonly value = input<number>(0);
readonly valueText = input<string>(); // Optional formatted value
readonly orientation = input<'horizontal' | 'vertical'>('horizontal');
readonly labelId = input<string>();
readonly disabled = input<boolean>(false);
```

**Implementation Notes:**

- `aria-valuenow` should update reactively with value changes
- `aria-valuetext` is optional but helpful for formatted values (e.g., "$50" instead of "50")

---

## Tier 3: Navigation Components

### 10. PAGINATION COMPONENT

**Location:** `libs/ui/src/lib/components/paginator/`

**Current Issues:**

- Missing `role="navigation"` on container
- Missing comprehensive `aria-label` attributes
- Has `aria-current="page"` on active page ✅ (good!)
- Missing descriptive labels on navigation buttons

**Files:**

- `paginator.ts` - Main container
- `pagination-link.ts` - Page number links
- `pagination-next.ts` - Next button
- `pagination-previous.ts` - Previous button
- `pagination-first.ts` - First page button
- `pagination-last.ts` - Last page button

**Changes Needed:**

**paginator.ts:**

```typescript
host: {
  role: 'navigation',
  'aria-label': 'Pagination Navigation',
}
```

**pagination-link.ts:**

```typescript
host: {
  '[attr.aria-label]': 'ariaLabel()',
  '[attr.aria-current]': "isActive() ? 'page' : undefined",
}

protected readonly ariaLabel = computed(() => {
  const page = this.page();
  return `Go to page ${page}`;
});
```

**pagination-next.ts:**

```typescript
host: {
  'aria-label': 'Go to next page',
  '[attr.aria-disabled]': 'disabled()',
}
```

**pagination-previous.ts:**

```typescript
host: {
  'aria-label': 'Go to previous page',
  '[attr.aria-disabled]': 'disabled()',
}
```

**pagination-first.ts:**

```typescript
host: {
  'aria-label': 'Go to first page',
  '[attr.aria-disabled]': 'disabled()',
}
```

**pagination-last.ts:**

```typescript
host: {
  'aria-label': 'Go to last page',
  '[attr.aria-disabled]': 'disabled()',
}
```

---

## Tier 4: Dialog/Overlay Components

### 11. DIALOG COMPONENT

**Location:** `libs/ui/src/lib/components/dialog/`

**Current Implementation:**

- Uses CDK Dialog internally
- CDK Dialog provides focus trapping

**Current Issues:**

- Missing explicit `role="dialog"` attribute
- Missing `aria-modal="true"`
- Missing `aria-labelledby` linking to dialog title
- Missing `aria-describedby` linking to dialog description

**Files:**

- `dialog-content.ts` - Dialog content wrapper
- `dialog-header.ts` - Dialog header
- `dialog-title.ts` - Dialog title
- `dialog-description.ts` - Dialog description
- `dialog-footer.ts` - Dialog footer
- `dialog-close.ts` - Close button

**Changes Needed:**

**dialog-content.ts:**

```typescript
host: {
  role: 'dialog',
  'aria-modal': 'true',
  '[attr.aria-labelledby]': 'titleId()',
  '[attr.aria-describedby]': 'descriptionId()',
}

readonly titleId = input<string>(); // Link to dialog-title
readonly descriptionId = input<string>(); // Link to dialog-description
```

**dialog-title.ts:**

```typescript
host: {
  '[id]': 'id()', // Generate unique ID
}

readonly id = input<string>(() => this._idGenerator.generate('dialog-title'));
```

**dialog-description.ts:**

```typescript
host: {
  '[id]': 'id()', // Generate unique ID
}

readonly id = input<string>(() => this._idGenerator.generate('dialog-description'));
```

**dialog-close.ts:**

```typescript
host: {
  'aria-label': 'Close dialog',
}
```

---

### 12. ALERT DIALOG COMPONENT

**Location:** `libs/ui/src/lib/components/alert-dialog/`

**Current Issues:**

- Same as Dialog component
- Should use `role="alertdialog"` instead of `role="dialog"`

**Files:** Similar structure to dialog

**Changes Needed:**

**alert-dialog-content.ts:**

```typescript
host: {
  role: 'alertdialog', // Different from regular dialog
  'aria-modal': 'true',
  '[attr.aria-labelledby]': 'titleId()',
  '[attr.aria-describedby]': 'descriptionId()',
}
```

**Note:** Alert dialogs are for important messages that require immediate attention. Use `role="alertdialog"` to indicate urgency to screen readers.

---

## Tier 5: Additional Components Needing ARIA Improvements

### 13. TOAST COMPONENT

**Location:** `libs/ui/src/lib/components/toast/`

**Current Issues:**

- Missing `role="status"` or `role="alert"` depending on urgency
- Missing `aria-live` region attributes
- Missing `aria-atomic`

**Changes Needed:**

```typescript
host: {
  role: 'status', // or 'alert' for urgent messages
  'aria-live': 'polite', // or 'assertive' for urgent
  'aria-atomic': 'true',
}

// For variant-based role:
protected readonly role = computed(() => {
  return this.variant() === 'destructive' ? 'alert' : 'status';
});

protected readonly ariaLive = computed(() => {
  return this.variant() === 'destructive' ? 'assertive' : 'polite';
});
```

---

### 14. PROGRESS COMPONENT

**Location:** `libs/ui/src/lib/components/progress/`

**Current Issues:**

- Missing `role="progressbar"`
- Missing `aria-valuemin`, `aria-valuemax`, `aria-valuenow`
- Missing `aria-valuetext` for percentage

**Changes Needed:**

```typescript
host: {
  role: 'progressbar',
  '[attr.aria-valuemin]': '0',
  '[attr.aria-valuemax]': 'max()',
  '[attr.aria-valuenow]': 'value()',
  '[attr.aria-valuetext]': 'valueText()',
}

readonly max = input<number>(100);
readonly value = input<number>(0);

protected readonly valueText = computed(() => {
  const percent = (this.value() / this.max()) * 100;
  return `${Math.round(percent)}%`;
});
```

---

### 15. ALERT COMPONENT

**Location:** `libs/ui/src/lib/components/alert/`

**Current Issues:**

- Missing consistent `role="alert"` or `role="status"`
- Should vary based on alert variant

**Changes Needed:**

```typescript
protected readonly role = computed(() => {
  const variant = this.variant();
  if (variant === 'destructive') return 'alert';
  return 'status';
});

host: {
  '[attr.role]': 'role()',
}
```

---

### 16. BUTTON COMPONENT

**Location:** `libs/ui/src/lib/components/button/`

**Current Issues:**

- Uses `[attr.data-disabled]` instead of standard `disabled` attribute
- Should use proper `aria-disabled` for button-like elements that aren't native buttons

**File:** `button-base.ts`

**Review Needed:**

- Check if using native `<button>` or styled div
- If native button: use `disabled` attribute
- If div with role="button": use `aria-disabled`

**Current code shows:**

```typescript
'[attr.data-disabled]': 'disabled()'
```

**Should be:**

```typescript
'[disabled]': 'disabled()', // If native button
// OR
'[attr.aria-disabled]': 'disabled()', // If role="button" on div
```

---

## Tier 6: Future Components (Angular ARIA Primitives Available)

These Angular ARIA primitives are available but you may not have built these components yet:

### TOOLBAR

**Primitive:** `@angular/aria/toolbar`
**Use Case:** If you build a toolbar component for grouping controls
**Provides:** Keyboard navigation, proper roles, aria-orientation

### TREE

**Primitive:** `@angular/aria/tree`
**Use Case:** If you build a tree view component
**Provides:** Hierarchical navigation, expand/collapse, keyboard support

### GRID

**Primitive:** `@angular/aria/grid`
**Use Case:** If you build a data grid component
**Provides:** 2D navigation, cell selection, proper grid roles

### COMBOBOX

**Primitive:** `@angular/aria/combobox`
**Use Case:** If you build a combobox (different from select)
**Provides:** Text input + popup coordination

---

## Implementation Priority Recommendation

### Phase 1: Quick Wins (Form Controls - ARIA Attributes Only)

1. Field components (aria-describedby, aria-invalid)
2. Input (aria-labelledby, aria-invalid)
3. Checkbox (aria-invalid)
4. Radio Group (role="radiogroup", aria-invalid)
5. Slider (aria-value\* attributes)
6. Button (fix disabled state)

**Estimated Complexity:** LOW
**Impact:** HIGH - affects all forms
**Time:** 2-3 hours

### Phase 2: Navigation & Feedback

7. Pagination (role="navigation", aria-labels)
8. Toast (role="status"/"alert", aria-live)
9. Progress (role="progressbar", aria-value\*)
10. Alert (role="alert"/"status")

**Estimated Complexity:** LOW
**Impact:** MEDIUM
**Time:** 1-2 hours

### Phase 3: Dialogs

11. Dialog (role="dialog", aria-modal, aria-labelledby)
12. Alert Dialog (role="alertdialog")

**Estimated Complexity:** LOW-MEDIUM
**Impact:** MEDIUM
**Time:** 1 hour

### Phase 4: Angular ARIA Primitives

13. **Accordion** (AccordionGroup, AccordionTrigger, AccordionPanel)
14. **Tabs** (TabGroup, Tab, TabPanel)
15. **Menu** (evaluate vs CDK - may skip)

**Estimated Complexity:** MEDIUM
**Impact:** HIGH - major accessibility improvement
**Time:** 3-4 hours

### Phase 5: Complex Components

16. **Select** (Listbox/Select primitive)

**Estimated Complexity:** HIGH - 950+ lines of code
**Impact:** HIGH
**Time:** 4-6 hours

---

## Testing Strategy

For each component after migration:

### 1. Automated Testing

- Run `axe-core` accessibility checker
- Verify no ARIA violations
- Check for WCAG AA compliance

### 2. Keyboard Testing

- Tab navigation works correctly
- Arrow keys navigate within components
- Enter/Space activate buttons
- Escape closes dialogs/dropdowns
- Home/End jump to start/end

### 3. Screen Reader Testing

- NVDA (Windows - free)
- JAWS (Windows - paid)
- VoiceOver (Mac - built-in)

Test:

- All interactive elements are announced
- State changes are announced (expanded/collapsed, selected, etc.)
- Form errors are announced
- Live regions work (toasts, alerts)

### 4. Browser DevTools Inspection

- Open Accessibility tree
- Verify ARIA attributes are present
- Check computed roles
- Verify focus order

---

## Files to Create

1. **Migration test checklist** for each component
2. **ARIA attribute reference** for common patterns
3. **Keyboard shortcut documentation** for users
4. **Accessibility testing guide** for contributors

---

## Summary Statistics

**Total Components to Migrate:** 16

**ARIA Primitives Available:** 8 (accordion, tabs, menu, listbox, select, multiselect, toolbar, tree, grid, combobox)

**Quick Wins (ARIA attributes only):** 10 components

**Complex Migrations (Angular ARIA primitives):** 4-5 components

**Estimated Total Time:** 15-20 hours

**Biggest Impact:** Form controls (affects every form in applications)

**Biggest Challenge:** Select component (950+ lines, complex keyboard handling)

---

## Notes & Considerations

### Breaking Changes

- Adding required `panelId` attributes to accordion, tabs
- Changing ARIA attribute management
- Potential keyboard navigation changes

### Backwards Compatibility

- Keep existing CSS class names
- Maintain data-state attributes for styling
- Keep component selectors unchanged
- Add new inputs as optional where possible

### Documentation Updates Needed

- Component API documentation
- Accessibility features documentation
- Keyboard navigation guides
- Migration guides for users

### Package Dependencies

- `@angular/aria` v21.0.6 already installed ✅
- `@angular/cdk` v21.0.6 already installed ✅
- No additional packages needed

---

## Next Steps

1. **Review this document** - Verify the plan makes sense for all components
2. **Prioritize components** - Choose which components to migrate first
3. **Start with Phase 1** - Quick wins with form control ARIA attributes
4. **Test thoroughly** - Each component before moving to next
5. **Document patterns** - Create reusable patterns for future components
6. **User feedback** - Gather feedback on accessibility improvements

---

## Questions to Answer Before Starting

1. Should we migrate all components or just high-priority ones?
2. Do you want breaking changes (require panelId) or backwards compatible (optional)?
3. Should we create v2 components or update in place?
4. What's the testing strategy - manual, automated, or both?
5. Do you want to commit after each component or all at once?
6. Should we update documentation alongside code or after?

---

**Document Created:** 2026-01-10
**Based on:** Codebase exploration + Angular ARIA v21 documentation
**Status:** Ready for review and approval
