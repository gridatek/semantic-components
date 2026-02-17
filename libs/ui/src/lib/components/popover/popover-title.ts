import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: '[scPopoverTitle]',
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
