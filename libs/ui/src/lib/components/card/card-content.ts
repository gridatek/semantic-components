import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-card-content]',
  host: {
    'data-slot': 'card-content',
    '[class]': 'class()',
  },
})
export class ScCardContent {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('px-4 group-data-[size=sm]/card:px-3', this.classInput()),
  );
}
