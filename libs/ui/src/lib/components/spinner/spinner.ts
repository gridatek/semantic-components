import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[sc-spinner]',
  host: {
    'data-slot': 'spinner',
    role: 'status',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'class()',
  },
})
export class ScSpinner {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly ariaLabel = input<string>('Loading', { alias: 'aria-label' });

  protected readonly class = computed(() =>
    cn('size-4 animate-spin', this.classInput()),
  );
}
