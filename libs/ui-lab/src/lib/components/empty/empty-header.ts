import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-empty-header]',
  host: {
    'data-slot': 'empty-header',
    '[class]': 'class()',
  },
})
export class ScEmptyHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-2 flex max-w-sm flex-col items-center', this.classInput()),
  );
}
