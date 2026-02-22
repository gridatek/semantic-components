import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'svg[scSelectItemIcon]',
  host: {
    'data-slot': 'select-item-icon',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScSelectItemIcon {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground size-4 shrink-0', this.classInput()),
  );
}
