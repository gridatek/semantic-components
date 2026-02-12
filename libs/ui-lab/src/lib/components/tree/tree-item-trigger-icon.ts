import { Directive, inject, input, computed } from '@angular/core';
import { cn } from '../../utils';
import { SC_TREE_ITEM } from './tree-item';

@Directive({
  selector: 'svg[sc-tree-item-trigger-icon]',
  host: {
    'data-slot': 'tree-item-trigger-icon',
    '[class]': 'class()',
  },
})
export class ScTreeItemTriggerIcon {
  readonly item = inject(SC_TREE_ITEM);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'size-4 shrink-0 transition-transform duration-200 pointer-events-none',
      this.item.treeItem.expanded() && 'rotate-90',
      // Use 'invisible' instead of 'hidden' to preserve space and maintain consistent alignment
      // across all tree items, regardless of whether they have children
      !this.item.hasChildren() && 'invisible',
      this.classInput(),
    ),
  );
}
