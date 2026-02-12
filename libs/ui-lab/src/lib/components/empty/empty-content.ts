import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-empty-content]',
  host: {
    'data-slot': 'empty-content',
    '[class]': 'class()',
  },
})
export class ScEmptyContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-2.5 text-sm flex w-full max-w-sm min-w-0 flex-col items-center text-balance',
      this.classInput(),
    ),
  );
}
