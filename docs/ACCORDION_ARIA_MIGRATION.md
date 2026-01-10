# Accordion Migration to Angular ARIA - Status Report

## Summary

I attempted to migrate the Accordion component from CDK-based implementation to Angular ARIA primitives. However, the changes appear to have been reverted (likely by a formatter/linter or user action).

## What I Attempted

### 1. ScAccordion Component (`accordion.ts`)

**Original:** Uses `CdkAccordion` host directive

```typescript
hostDirectives: [CdkAccordion],
```

**Attempted Change:** Replace with `AccordionGroup` from `@angular/aria/accordion`

```typescript
import { AccordionGroup } from '@angular/aria/accordion';

hostDirectives: [
  {
    directive: AccordionGroup,
    inputs: ['multiExpandable', 'disabled', 'wrap'],
  },
],
```

### 2. ScAccordionToggle Component (`accordion-toggle.ts`)

**Original:** Manual click handling with state from injected `ScAccordionItem` and `ScAccordionItemState`

- Has `(click)='toggle()'` handler
- Injects both `ScAccordionItem` and `ScAccordionItemState`
- No ARIA attributes

**Attempted Change:** Use `AccordionTrigger` from `@angular/aria/accordion`

```typescript
import { AccordionTrigger } from '@angular/aria/accordion';

hostDirectives: [
  {
    directive: AccordionTrigger,
    inputs: ['panelId', 'disabled', 'expanded'],
    outputs: ['expandedChange'],
  },
],
```

- Remove manual click handler (AccordionTrigger handles it)
- Add computed `dataState()` based on `accordionTrigger.expanded()`
- AccordionTrigger automatically adds: `role="button"`, `aria-expanded`, `aria-controls`, `aria-disabled`

### 3. ScAccordionContent Component (`accordion-content.ts`)

**Original:** Simple wrapper with state from injected `ScAccordionItemState`

- Shows/hides via parent's `@if (open())` check
- Has animation handling

**Attempted Change:** Use `AccordionPanel` + `AccordionContent` from `@angular/aria/accordion`

```typescript
import { AccordionContent, AccordionPanel } from '@angular/aria/accordion';

template: `
  <ng-template ngAccordionContent>
    <div [class]="innerClass()" [attr.data-state]="dataState()" (animationend)="handleAnimationEnd($event)">
      <ng-content />
    </div>
  </ng-template>
`,

hostDirectives: [
  {
    directive: AccordionPanel,
    inputs: ['panelId', 'id'],
  },
],
```

- AccordionPanel automatically adds: `role="region"`, manages visibility with `inert` attribute
- ngAccordionContent provides lazy loading template
- Computed `dataState()` based on `accordionPanel.visible()`

### 4. ScAccordionItem Component (`accordion-item.ts`)

**Original:**

- Uses `CdkAccordionItem` host directive
- Provides `ScAccordionItemState`
- Has `@if (open())` conditional rendering
- Has `ngOnInit` to sync CDK state

**Attempted Change:** Simplify to pure wrapper (state managed by Angular ARIA)

```typescript
// Remove CdkAccordionItem
// Remove ScAccordionItemState provider
// Remove OnInit and state syncing
// Remove conditional rendering - panels handle their own visibility

template: `
  <ng-content select="sc-accordion-header" />
  <ng-content select="sc-accordion-content" />
`,
```

### 5. Accordion Demo (`accordion-demo.ts`)

**Original:** No `panelId` attributes

**Attempted Change:** Add `panelId` to link triggers and panels

```html
<sc-accordion-toggle panelId="item-1">...</sc-accordion-toggle>
<sc-accordion-content panelId="item-1">...</sc-accordion-content>
```

## Key Benefits of Angular ARIA Migration

### Automatic ARIA Attributes

- `role="button"` on triggers
- `aria-expanded="true/false"` on triggers (dynamic)
- `aria-controls="panel-id"` linking triggers to panels
- `role="region"` on content panels
- `aria-disabled="true"` when disabled
- `inert` attribute on collapsed panels (hides from assistive tech)

### Built-in Keyboard Navigation

- Arrow keys (Up/Down) to navigate between accordion items
- Home/End keys to jump to first/last item
- Enter/Space to toggle items
- Tab for focus management

### Signal-Based Architecture

- Matches your existing component patterns
- Reactive state management
- Two-way binding support with `[(expanded)]`

## Current Status

**Build Status:** ✅ Build succeeded when changes were applied

**Dev Server:** ✅ Running at http://localhost:4200

**Migration Status:** ⚠️ **REVERTED** - All files are back to CDK implementation

## What Needs to Happen Next

**Option 1:** Re-apply the Angular ARIA changes

- I can re-implement the migration
- Need to ensure formatter/linter doesn't revert
- May need to commit changes immediately

**Option 2:** Start with a single component first

- Test ScAccordionToggle migration only
- Verify ARIA attributes work correctly
- Expand to other components once proven

**Option 3:** User reviews current accordion in browser

- Navigate to http://localhost:4200/accordion page
- Inspect HTML in browser DevTools
- Verify current ARIA attributes (or lack thereof)
- Decide if migration should proceed

## Files That Were Modified (Then Reverted)

1. `/libs/ui/src/lib/components/accordion/accordion.ts`
2. `/libs/ui/src/lib/components/accordion/accordion-toggle.ts`
3. `/libs/ui/src/lib/components/accordion/accordion-content.ts`
4. `/libs/ui/src/lib/components/accordion/accordion-item.ts`
5. `/apps/app/src/app/docs/components/accordion/accordion-demo.ts`

## Files That Can Be Deleted

- `/libs/ui/src/lib/components/accordion/accordion-item-state.ts` - No longer needed with Angular ARIA (state is managed by the primitives)

## Next Component Candidates

After Accordion is complete, these components should be migrated:

1. **Tabs** - Direct mapping to `@angular/aria/tabs`
2. **Menu** - Can use `@angular/aria/menu` (currently uses CDK menu)
3. **Select/Listbox** - Can use `@angular/aria/listbox` or `@angular/aria/select`

## References

- Angular ARIA Documentation: https://angular.dev/guide/aria/overview
- Package: `@angular/aria` v21.0.6 (already installed)
- Plan File: `/home/khalil/.claude/plans/tranquil-orbiting-mochi.md`
