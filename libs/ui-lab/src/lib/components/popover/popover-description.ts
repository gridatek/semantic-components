import { computed, Directive, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'p[sc-popover-description]',
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
