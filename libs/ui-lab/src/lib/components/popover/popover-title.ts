import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: '[sc-popover-title]',
  host: {
    'data-slot': 'popover-title',
    '[class]': 'class()',
  },
})
export class ScPopoverTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('font-medium', this.classInput()),
  );
}
