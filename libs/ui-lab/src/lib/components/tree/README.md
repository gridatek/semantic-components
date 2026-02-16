# Tree

A hierarchical collapsible tree for displaying nested data. Built with Angular ARIA for full accessibility.

## Features

- ✨ **Simple API** - Minimal boilerplate with automatic parent-child management
- ♿ **Fully Accessible** - Built on Angular ARIA with complete keyboard navigation
- 🎨 **Customizable** - Style items, icons, and indentation
- 📁 **Unlimited Nesting** - Support for deeply nested structures
- 🎬 **Animated** - Smooth expand/collapse transitions
- 🎯 **Type-Safe** - Full TypeScript support

## Quick Start

```html
<ul scTree #tree="scTree">
  <li scTreeItem [parent]="tree.tree" value="folder">
    <button scTreeItemTrigger>
      <svg scTreeItemIcon><!-- folder icon --></svg>
      <span>Folder</span>
    </button>
    <ul scTreeItemGroup>
      <li scTreeItem [parent]="tree.tree" value="file">
        <button scTreeItemTrigger>
          <svg scTreeItemIcon><!-- file icon --></svg>
          <span>File.ts</span>
        </button>
      </li>
    </ul>
  </li>
</ul>
```

## Getting Started

To create a tree:

1. **Add the root tree** with a template reference:

   ```html
   <ul scTree #tree="scTree"></ul>
   ```

2. **Add tree items** with parent binding and unique value:

   ```html
   <li scTreeItem [parent]="tree.tree" value="unique-id"></li>
   ```

3. **Add a clickable trigger** to expand/collapse:

   ```html
   <button scTreeItemTrigger>Item Label</button>
   ```

4. **Wrap nested children** (no additional bindings needed):
   ```html
   <ul scTreeItemGroup>
     <!-- Child items here -->
   </ul>
   ```

**Key Points:**

- All items use `[parent]="tree.tree"` regardless of nesting depth
- Each item needs a unique `value` attribute
- `sc-tree-item-group` automatically connects to its parent item
- The component handles all ARIA attributes and accessibility

## Components

### ScTree

Root container with tree role. Uses Angular ARIA's `Tree` directive.

**Selector:** `ul[scTree]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

### ScTreeItem

Individual tree item that can have children. Uses Angular ARIA's `TreeItem` directive.

**Selector:** `li[scTreeItem]`

**Required Inputs:**

| Input    | Type                    | Description                                                    |
| -------- | ----------------------- | -------------------------------------------------------------- |
| `parent` | `Tree \| TreeItemGroup` | Reference to the root tree (use `tree.tree` from template ref) |
| `value`  | `string`                | Unique identifier for this item                                |

**Optional Inputs:**

| Input      | Type      | Default | Description                  |
| ---------- | --------- | ------- | ---------------------------- |
| `class`    | `string`  | `''`    | Additional CSS classes       |
| `label`    | `string`  | -       | Accessible label (optional)  |
| `disabled` | `boolean` | `false` | Whether the item is disabled |
| `expanded` | `boolean` | `false` | Initial expanded state       |

**Properties:**

- `level`: Computed nesting level (0 for root items)
- `hasChildren`: Computed based on presence of `sc-tree-item-group`
- `treeItem`: Access to Angular ARIA's TreeItem instance
  - `treeItem.expanded()`: Signal for expanded state
  - `treeItem.selected()`: Signal for selected state
  - `treeItem.disabled()`: Signal for disabled state

### ScTreeItemTrigger

Clickable button to expand/collapse the item.

**Selector:** `button[scTreeItemTrigger]`

Automatically includes:

- Chevron icon that rotates when expanded
- Proper indentation based on nesting level
- Full keyboard navigation support via Angular ARIA

### ScTreeItemGroup

Container for nested child items. Uses Angular ARIA's `TreeItemGroup` directive internally.

**Selector:** `ul[scTreeItemGroup]`

**Inputs:**

| Input   | Type     | Default | Description            |
| ------- | -------- | ------- | ---------------------- |
| `class` | `string` | `''`    | Additional CSS classes |

Automatically connects to its parent tree item - no manual bindings required. Hidden when parent item is collapsed.

### ScTreeItemIcon

Optional icon slot for tree items.

**Selector:** `[scTreeItemIcon]`

## Examples

### File Explorer with Icons

```html
<ul scTree #tree="scTree">
  <li scTreeItem [parent]="tree.tree" value="src" [expanded]="true">
    <button scTreeItemTrigger>
      <svg scTreeItemIcon class="text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      </svg>
      <span>src</span>
    </button>
    <ul scTreeItemGroup>
      <li scTreeItem [parent]="tree.tree" value="app" [expanded]="true">
        <button scTreeItemTrigger>
          <svg scTreeItemIcon class="text-blue-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
          </svg>
          <span>app</span>
        </button>
        <ul scTreeItemGroup>
          <li scTreeItem [parent]="tree.tree" value="main">
            <button scTreeItemTrigger>
              <svg scTreeItemIcon class="text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
              <span>main.ts</span>
            </button>
          </li>
          <li scTreeItem [parent]="tree.tree" value="app-component">
            <button scTreeItemTrigger>
              <svg scTreeItemIcon class="text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
                <path d="M14 2v4a2 2 0 0 0 2 2h4" />
              </svg>
              <span>app.component.ts</span>
            </button>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul>
```

### Navigation Tree

```html
<ul scTree #tree="scTree">
  <li scTreeItem [parent]="tree.tree" value="getting-started" [expanded]="true">
    <button scTreeItemTrigger>Getting Started</button>
    <ul scTreeItemGroup>
      <li scTreeItem [parent]="tree.tree" value="intro">
        <button scTreeItemTrigger>Introduction</button>
      </li>
      <li scTreeItem [parent]="tree.tree" value="install">
        <button scTreeItemTrigger>Installation</button>
      </li>
      <li scTreeItem [parent]="tree.tree" value="config">
        <button scTreeItemTrigger>Configuration</button>
      </li>
    </ul>
  </li>
  <li scTreeItem [parent]="tree.tree" value="components">
    <button scTreeItemTrigger>Components</button>
    <ul scTreeItemGroup>
      <li scTreeItem [parent]="tree.tree" value="button">
        <button scTreeItemTrigger>Button</button>
      </li>
      <li scTreeItem [parent]="tree.tree" value="input">
        <button scTreeItemTrigger>Input</button>
      </li>
    </ul>
  </li>
</ul>
```

### Simple Tree (No Icons)

```html
<ul scTree #tree="scTree">
  <li scTreeItem [parent]="tree.tree" value="fruits">
    <button scTreeItemTrigger>Fruits</button>
    <ul scTreeItemGroup>
      <li scTreeItem [parent]="tree.tree" value="apple">
        <button scTreeItemTrigger>Apple</button>
      </li>
      <li scTreeItem [parent]="tree.tree" value="banana">
        <button scTreeItemTrigger>Banana</button>
      </li>
    </ul>
  </li>
  <li scTreeItem [parent]="tree.tree" value="vegetables">
    <button scTreeItemTrigger>Vegetables</button>
    <ul scTreeItemGroup>
      <li scTreeItem [parent]="tree.tree" value="carrot">
        <button scTreeItemTrigger>Carrot</button>
      </li>
    </ul>
  </li>
</ul>
```

### Controlled Expansion

Access the Angular ARIA `TreeItem` instance to programmatically control expansion:

```typescript
@Component({
  imports: [ScTree, ScTreeItem, ScTreeItemTrigger, ScTreeItemGroup],
  template: `
    <ul scTree #tree="scTree">
      <li scTreeItem [parent]="tree.tree" value="item" #item="scTreeItem">
        <button scTreeItemTrigger>Item (Expanded: {{ item.treeItem.expanded() }})</button>
        <ul scTreeItemGroup>
          <li scTreeItem [parent]="tree.tree" value="child">
            <button scTreeItemTrigger>Child</button>
          </li>
        </ul>
      </li>
    </ul>
    <button (click)="item.treeItem.expanded.update(v => !v)">Toggle Item</button>
  `,
})
export class MyComponent {}
```

Or access from a child component:

```typescript
export class MyTreeItemComponent {
  readonly treeItem = inject(ScTreeItem);

  toggleExpansion() {
    this.treeItem.treeItem.expanded.update((v) => !v);
  }
}
```

## API Design

This tree component uses a **simplified API** compared to traditional hierarchical implementations:

- **Single parent reference**: All items use `[parent]="tree.tree"`, not nested group references
- **Automatic relationships**: `sc-tree-item-group` automatically connects to its parent item internally
- **No manual wiring**: No need for `[ownedBy]` bindings or complex template reference chains

This design prioritizes developer experience while maintaining full Angular ARIA accessibility features.

## Styling & Customization

All components accept a `class` input for custom styling:

```html
<ul scTree #tree="scTree" class="border rounded-lg p-4">
  <li scTreeItem [parent]="tree.tree" value="item" class="my-custom-item">
    <button scTreeItemTrigger class="font-bold hover:bg-blue-100">Custom Styled Item</button>
  </li>
</ul>
```

**Built-in Features:**

- Automatic indentation based on nesting level (12px per level)
- Animated chevron icon rotation on expand/collapse
- Hover and focus states for accessibility
- Selected item highlighting (via `aria-selected`)

**Customizing Icons:**

Use the `sc-tree-item-icon` attribute on any SVG or icon element:

```html
<button scTreeItemTrigger>
  <svg scTreeItemIcon class="text-blue-500">
    <!-- Your custom icon -->
  </svg>
  <span>Item Label</span>
</button>
```

## Keyboard Navigation

Angular ARIA provides comprehensive keyboard navigation:

| Key             | Action                                    |
| --------------- | ----------------------------------------- |
| `Enter`/`Space` | Activate/select item                      |
| `ArrowDown`     | Move to next visible item                 |
| `ArrowUp`       | Move to previous visible item             |
| `ArrowRight`    | Expand collapsed item/move to first child |
| `ArrowLeft`     | Collapse expanded item/move to parent     |
| `Home`          | Move to first item                        |
| `End`           | Move to last visible item                 |
| `a-z`           | Type-ahead to find items                  |

## Accessibility

Built with Angular ARIA for full accessibility:

- `role="tree"` on root container (via Angular ARIA)
- `role="treeitem"` on each item (via Angular ARIA)
- `role="group"` on nested content (via Angular ARIA)
- `aria-expanded` reflects expand state
- `aria-selected` reflects selection state
- `aria-disabled` for disabled items
- Full keyboard navigation support
- Focus management and roving tabindex
- Screen reader announcements
