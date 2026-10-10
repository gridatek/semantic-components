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

@Component({
  selector: 'li[scTreeItem]',
  hostDirectives: [
    {
      directive: ScAriaTreeItem,
      inputs: ['value', 'label', 'disabled', 'expanded'],
    },
  ],
  providers: [{ provide: SC_TREE_ITEM, useExisting: ScTreeItem }],
  template: `
    <ng-content />
  `,
  host: {
    '[class]': 'class()',
    '[attr.data-state]': 'treeItem.expanded() ? "open" : "closed"',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTreeItem {
  private readonly parentItem = inject(SC_TREE_ITEM, {
    optional: true,
    skipSelf: true,
  });

  readonly treeItem = inject(ScAriaTreeItem);
  readonly groupContent = contentChild(ScTreeItemGroup);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly level = computed(() => {
    let level = 0;
    let parent = this.parentItem;
    while (parent) {
      level++;
      parent = parent.parentItem;
    }
    return level;
  });

  readonly hasChildren = computed(() => !!this.groupContent());

  protected readonly class = computed(() =>
    cn('flex flex-col', this.classInput()),
  );

  constructor() {
    // Nested items belong to the enclosing group, top-level items to the
    // tree. TreeItem reads `parent` in its ngOnInit to register.
    const group = inject(SC_TREE_ITEM_GROUP, { optional: true });
    if (group) group.adopt(this.treeItem);
    else setInput(this.treeItem.parent, inject(ScTree).tree);
  }
}
