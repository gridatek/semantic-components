import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-tree-item-icon]',
  host: {
    'data-slot': 'tree-item-icon',
    '[class]': 'class()',
  },
})
export class ScTreeItemIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('size-4 shrink-0', this.classInput()),
  );
}
