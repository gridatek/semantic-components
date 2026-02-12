import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-toast-description]',
  host: {
    'data-slot': 'toast-description',
    '[class]': 'class()',
  },
})
export class ScToastDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm opacity-90', this.classInput()),
  );
}
