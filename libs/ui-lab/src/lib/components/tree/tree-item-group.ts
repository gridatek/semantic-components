import { type TreeItem, TreeItemGroup } from '@angular/aria/tree';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn, setInput } from '@semantic-components/ui';
import { SC_TREE_ITEM } from './tree-item';
import { ScTreeItemGroupRef } from './tree-item-group-ref';
import { SC_TREE_ITEM_GROUP, type ScTreeItemGroupContext } from './tree-tokens';

@Component({
  selector: 'ul[scTreeItemGroup]',
  imports: [TreeItemGroup, ScTreeItemGroupRef],
  providers: [{ provide: SC_TREE_ITEM_GROUP, useExisting: ScTreeItemGroup }],
  template: `
    <ng-template ngTreeItemGroup scTreeItemGroupRef [ownedBy]="item.treeItem">
      <ng-content />
    </ng-template>
  `,
  host: {
    role: 'group',
    'data-slot': 'tree-item-group',
    '[attr.data-state]': 'item.treeItem.expanded() ? "open" : "closed"',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTreeItemGroup implements ScTreeItemGroupContext {
  readonly item = inject(SC_TREE_ITEM);
  readonly classInput = input<string>('', { alias: 'class' });

  get owner(): TreeItem<unknown> {
    return this.item.treeItem as TreeItem<unknown>;
  }

  private ariaGroup: TreeItemGroup<unknown> | undefined;
  private readonly pending: TreeItem<unknown>[] = [];

  adopt(item: TreeItem<unknown>): void {
    if (this.ariaGroup) setInput(item.parent, this.ariaGroup);
    else this.pending.push(item);
  }

  setAriaGroup(group: TreeItemGroup<unknown>): void {
    this.ariaGroup = group;
    for (const item of this.pending.splice(0)) setInput(item.parent, group);
  }

  protected readonly class = computed(() =>
    cn(
      // Collapsed groups hold only comment anchors: take no space.
      'flex flex-col gap-1 empty:hidden',
      // Children are rendered when the item opens, so animate their entrance.
      // (They are removed on close, so there is nothing to animate out.)
      'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1 data-[state=open]:duration-150 motion-reduce:animate-none',
      this.classInput(),
    ),
  );
}
