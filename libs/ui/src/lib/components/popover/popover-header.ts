import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-popover-header]',
  host: {
    'data-slot': 'popover-header',
    '[class]': 'class()',
  },
})
export class ScPopoverHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-0.5 text-sm', this.classInput()),
  );
}
