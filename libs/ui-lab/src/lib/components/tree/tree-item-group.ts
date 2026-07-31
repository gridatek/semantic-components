import { TreeItemGroup } from '@angular/aria/tree';
import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_TREE_ITEM } from './tree-item';

@Component({
  selector: 'ul[scTreeItemGroup]',
  imports: [TreeItemGroup],
  template: `
    <ng-template ngTreeItemGroup [ownedBy]="item.treeItem">
      <ng-content />
    </ng-template>
  `,
  host: {
    role: 'group',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTreeItemGroup {
  readonly item = inject(SC_TREE_ITEM);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex flex-col gap-1 overflow-hidden',
      'data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
      this.classInput(),
    ),
  );
}
