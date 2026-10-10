import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TREE_ITEM } from './tree-item';

/**
 * The visible row of a tree item: indentation, chevron, icon and label.
 * It is deliberately not focusable — the tree item (`li`) takes focus and
 * handles clicks and keys — so use a `div` or `span`, not a `button`.
 */
@Component({
  selector: 'div[scTreeItemTrigger], span[scTreeItemTrigger]',
  template: `
    <ng-content />
  `,
  host: {
    'data-slot': 'tree-item-trigger',
    '[attr.data-selected]': 'item.treeItem.selected() || null',
    '[attr.data-disabled]': 'item.treeItem.disabled() || null',
    '[style.padding-inline-start]': 'indent()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTreeItemTrigger {
  readonly item = inject(SC_TREE_ITEM);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex w-full cursor-pointer select-none items-center gap-2 rounded-md py-1.5 pe-2 text-sm transition-colors duration-100',
      // Hover is lighter than selection, so a hovered row next to the selected
      // one doesn't merge with it.
      'hover:bg-accent/50 hover:text-accent-foreground',
      'data-selected:bg-accent data-selected:hover:bg-accent data-selected:text-accent-foreground data-selected:font-medium',
      'data-disabled:pointer-events-none data-disabled:opacity-50',
      '[&_svg:not([class*=size-])]:size-4',
      this.classInput(),
    ),
  );

  /** 0.5rem, plus 0.75rem per level below the root. */
  protected readonly indent = computed(
    () => `calc(${this.item.level() - 1} * 0.75rem + 0.5rem)`,
  );
}
