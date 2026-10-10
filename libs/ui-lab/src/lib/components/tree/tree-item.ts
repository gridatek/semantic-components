import {
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  contentChild,
  inject,
  input,
} from '@angular/core';
import { cn, setInput } from '@semantic-components/ui';
import { ScAriaTreeItem } from './aria-tree-item';
import { ScTree } from './tree';
import { ScTreeItemGroup } from './tree-item-group';
import { SC_TREE_ITEM_GROUP } from './tree-tokens';

// Token for tree item context
export const SC_TREE_ITEM = new InjectionToken<ScTreeItem>('SC_TREE_ITEM');

/**
 * A tree item (`role="treeitem"`). The `li` itself is the focusable element —
 * `@angular/aria` moves a roving `tabindex` between items — so its visible row
 * (`scTreeItemTrigger`) must not be focusable.
 */
@Component({
  selector: 'li[scTreeItem]',
  hostDirectives: [
    {
      directive: ScAriaTreeItem,
      inputs: ['value', 'label', 'disabled', 'selectable', 'expanded'],
      outputs: ['expandedChange'],
    },
  ],
  providers: [{ provide: SC_TREE_ITEM, useExisting: ScTreeItem }],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'tree-item',
    '[attr.data-state]': 'treeItem.expanded() ? "open" : "closed"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTreeItem {
  readonly treeItem = inject(ScAriaTreeItem);
  readonly groupContent = contentChild(ScTreeItemGroup);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Depth in the tree, starting at 1 (same as `aria-level`). */
  readonly level = computed(() => this.treeItem.level());

  readonly hasChildren = computed(() => !!this.groupContent());

  protected readonly class = computed(() =>
    cn(
      'flex flex-col outline-none',
      // Focus ring on this item's own row only (direct child), not on the rows
      // of nested items, which are descendants too.
      'focus-visible:*:data-[slot=tree-item-trigger]:ring-3 focus-visible:*:data-[slot=tree-item-trigger]:ring-ring/50',
      this.classInput(),
    ),
  );

  constructor() {
    // Nested items belong to the enclosing group, top-level items to the
    // tree. TreeItem reads `parent` in its ngOnInit to register.
    const group = inject(SC_TREE_ITEM_GROUP, { optional: true });
    if (group) group.adopt(this.treeItem);
    else setInput(this.treeItem.parent, inject(ScTree).tree);
  }
}
