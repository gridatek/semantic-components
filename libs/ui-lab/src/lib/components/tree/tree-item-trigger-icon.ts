import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TREE_ITEM } from './tree-item';

/** The expand/collapse chevron. Rotates when open; kept (invisible) on leaves for alignment. */
@Directive({
  selector: 'svg[scTreeItemTriggerIcon]',
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScTreeItemTriggerIcon {
  readonly item = inject(SC_TREE_ITEM);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground size-4 shrink-0 pointer-events-none transition-transform duration-200 motion-reduce:transition-none rtl:-scale-x-100',
      this.item.treeItem.expanded() && 'rotate-90 rtl:-rotate-90',
      // Use 'invisible' instead of 'hidden' to preserve space and maintain consistent alignment
      // across all tree items, regardless of whether they have children
      !this.item.hasChildren() && 'invisible',
      this.classInput(),
    ),
  );
}
