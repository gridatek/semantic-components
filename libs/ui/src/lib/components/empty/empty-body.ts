import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scEmptyBody]',
  host: {
    'data-slot': 'empty-body',
    '[class]': 'class()',
  },
})
export class ScEmptyBody {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'gap-2.5 text-sm flex w-full max-w-sm min-w-0 flex-col items-center text-balance',
      this.classInput(),
    ),
  );
}
