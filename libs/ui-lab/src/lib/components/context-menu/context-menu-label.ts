import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-context-menu-label]',
  host: {
    'data-slot': 'context-menu-label',
    '[class]': 'class()',
  },
})
export class ScContextMenuLabel {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly inset = input<boolean>(false);

  protected readonly class = computed(() =>
    cn(
      'px-2 py-1.5 text-sm font-semibold',
      this.inset() && 'pl-8',
      this.classInput(),
    ),
  );
}
