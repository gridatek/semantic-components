import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[sc-alert-action]',
  host: {
    'data-slot': 'alert-action',
    '[class]': 'class()',
  },
})
export class ScAlertAction {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('absolute top-2 right-2', this.classInput()),
  );
}
