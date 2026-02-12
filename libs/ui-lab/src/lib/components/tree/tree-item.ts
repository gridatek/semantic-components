import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  inject,
  InjectionToken,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { TreeItem } from '@angular/aria/tree';
import { cn } from '../../utils';
import { ScTreeItemGroup } from './tree-item-group';

// Token for tree item context
export const SC_TREE_ITEM = new InjectionToken<ScTreeItem>('SC_TREE_ITEM');

@Component({
  selector: 'li[sc-tree-item]',
  hostDirectives: [
    {
      directive: TreeItem,
      inputs: ['value', 'parent', 'label', 'disabled', 'expanded'],
    },
  ],
  providers: [{ provide: SC_TREE_ITEM, useExisting: ScTreeItem }],
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'tree-item',
    '[class]': 'class()',
    '[attr.data-state]': 'treeItem.expanded() ? "open" : "closed"',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScTreeItem {
  private readonly parentItem = inject(SC_TREE_ITEM, {
    optional: true,
    skipSelf: true,
  });

  readonly treeItem = inject(TreeItem);
  readonly groupContent = contentChild(ScTreeItemGroup);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly level = computed(() => {
    let level = 0;
    let parent = this.parentItem;
    while (parent) {
      level++;
      parent = (parent as any).parentItem;
    }
    return level;
  });

  readonly hasChildren = computed(() => !!this.groupContent());

  protected readonly class = computed(() =>
    cn('flex flex-col', this.classInput()),
  );
}
