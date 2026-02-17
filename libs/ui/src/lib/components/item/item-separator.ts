import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scItemSeparator]',
  host: {
    'data-slot': 'item-separator',
    role: 'separator',
    '[class]': 'class()',
  },
})
export class ScItemSeparator {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('bg-border my-2 h-px w-full', this.classInput()),
  );
}
