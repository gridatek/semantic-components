# Tree Component TODO

## Resolved: TreeItemGroup parent wiring (2026-10-10)

Nested `TreeItem`s need their `parent` (the enclosing `TreeItemGroup`) when their `ngOnInit` registers them, but they are projected content: they are created and initialised before `ScTreeItemGroup`'s own view (where the aria `TreeItemGroup` lives) is built. A view query is too late, and binding `[parent]` by hand put every item at the root (`aria-level="1"` everywhere, ArrowLeft/Right not following the nesting).

How it works now:

- `ScAriaTreeItem` extends aria's `TreeItem` with `parent` made optional, so `ScTreeItem` can host it without re-exposing a required input (angular/angular#50510).
- `ScTreeItem` resolves the parent itself: `SC_TREE_ITEM_GROUP.adopt(item)` for nested items, the root `Tree` otherwise.
- `ScTreeItemGroup` queues adopted items until `ScTreeItemGroupRef` (on the `ngTreeItemGroup` template) hands it the aria group as soon as that is created; it also sets the group's `ownedBy` right away, since registration reads it before the view's bindings run.
- Consumers no longer bind `[parent]` or use a `#tree` reference.
