import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-item-footer]',
  host: {
    'data-slot': 'item-footer',
    '[class]': 'class()',
  },
})
export class ScItemFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-2 flex basis-full items-center justify-between', this.classInput()),
  );
}
