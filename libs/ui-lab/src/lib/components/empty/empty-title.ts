import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-empty-title]',
  host: {
    'data-slot': 'empty-title',
    '[class]': 'class()',
  },
})
export class ScEmptyTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm font-medium tracking-tight', this.classInput()),
  );
}
