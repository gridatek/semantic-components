import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'p[scPopoverDescription]',
  host: {
    'data-slot': 'popover-description',
    '[class]': 'class()',
  },
})
export class ScPopoverDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground', this.classInput()),
  );
}
