import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[sc-toast-title]',
  host: {
    'data-slot': 'toast-title',
    '[class]': 'class()',
  },
})
export class ScToastTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm font-semibold', this.classInput()),
  );
}
