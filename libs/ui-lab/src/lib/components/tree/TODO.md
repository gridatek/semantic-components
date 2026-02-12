# Tree Component TODO

## Critical Issue: TreeItemGroup Implementation

### Problem

The current `ScTreeItemGroup` implementation has a critical timing issue that causes runtime errors.

**Error:**

```
TypeError: Cannot read properties of undefined (reading '_register')
    at _TreeItem.ngOnInit (tree.mjs:377:17)
```

### Root Cause

Child `TreeItem` components need their `parent` reference during `ngOnInit`, but the `ScTreeItemGroup.group()` method returns `undefined` at that point.

**Current Implementation (BROKEN):**

```typescript
@Component({
  selector: 'ul[sc-tree-item-group]',
  template: `
    <ng-template ngTreeItemGroup [ownedBy]="item.treeItem">
      <ng-content />
    </ng-template>
  `,
})
export class ScTreeItemGroup {
  @ViewChild(TreeItemGroup) private readonly treeItemGroup!: TreeItemGroup<unknown>;

  group() {
    return this.treeItemGroup; // UNDEFINED during child ngOnInit!
  }
}
```

**Consumer Usage:**

```html
<ul sc-tree-item-group #srcGroup>
  <li sc-tree-item [parent]="srcGroup.group()" value="child">
    <!-- srcGroup.group() is undefined when TreeItem initializes -->
  </li>
</ul>
```

### Why It Fails

1. `@ViewChild` queries are resolved **after** `ngOnInit` (during `AfterViewInit`)
2. Child `TreeItem` components call `ngOnInit` and try to access `parent.register()`
3. `srcGroup.group()` returns `undefined` because ViewChild hasn't resolved yet
4. TreeItem tries to call `undefined._register()` → **CRASH**

### Attempted Solutions (All Failed)

1. ❌ **`@ViewChild` with `static: true`** - Still undefined for ng-template content
2. ❌ **TreeItemGroup as host directive** - Cannot bind `ownedBy` input (not a DOM property)
3. ❌ **Using `effect()` to set ownedBy** - InputSignal is read-only, cannot use `.set()`

### Required Solution

Need to find a way to make `TreeItemGroup` instance available **synchronously** when `ScTreeItemGroup` is instantiated, before any child components initialize.

**Possible approaches to investigate:**

- [ ] Use `TreeItemGroup` as host directive with proper input binding strategy
- [ ] Provide `TreeItemGroup` via dependency injection token
- [ ] Restructure to avoid wrapper component entirely
- [ ] Use Angular ARIA Tree's native pattern without wrapping

### Reference

Angular ARIA Tree documentation pattern:

```html
<ul role="group">
  <ng-template ngTreeItemGroup [ownedBy]="treeItem" #group="ngTreeItemGroup">
    <li ngTreeItem [parent]="group" value="child">
      <!-- Works because 'group' reference is available immediately -->
    </li>
  </ng-template>
</ul>
```

### Status

🚫 **BLOCKED** - Current implementation reverted. Do not use `ScTreeItemGroup.group()` pattern until this is resolved.

---

**Last Updated:** 2026-02-03
