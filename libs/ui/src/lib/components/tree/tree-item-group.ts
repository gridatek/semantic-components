import { type TreeItem, TreeItemGroup } from '@angular/aria/tree';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn, setInput } from '../../utils';
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
      'flex flex-col',
      // Expand/collapse: height animates between auto and 0 (global
      // `interpolate-size: allow-keywords`; other browsers switch instantly).
      // Children stay rendered once opened (ScTreeItem preserves them), and a
      // closed group — opened before or not — is 0 high and ends `invisible`
      // (out of the accessibility tree, not focusable) after the transition.
      // Padding + negative margin give the rows' focus ring room inside the
      // clipped area; vertically only while open, so a closed group takes no
      // space at all.
      '-mx-1 overflow-hidden px-1 transition-[height,padding,margin,visibility] duration-200 ease-out motion-reduce:transition-none',
      'data-[state=open]:-my-1 data-[state=open]:py-1',
      'data-[state=closed]:invisible data-[state=closed]:h-0',
      this.classInput(),
    ),
  );
}
