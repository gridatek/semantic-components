import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-card-body]',
  host: {
    'data-slot': 'card-body',
    '[class]': 'class()',
  },
})
export class ScCardBody {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('px-4 group-data-[size=sm]/card:px-3', this.classInput()),
  );
}
