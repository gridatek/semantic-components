import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-card-action]',
  host: {
    'data-slot': 'card-action',
    '[class]': 'class()',
  },
})
export class ScCardAction {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'col-start-2 row-span-2 row-start-1 self-start justify-self-end',
      this.classInput(),
    ),
  );
}
