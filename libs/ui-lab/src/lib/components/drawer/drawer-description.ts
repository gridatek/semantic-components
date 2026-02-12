import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'p[sc-drawer-description]',
  host: {
    'data-slot': 'drawer-description',
    '[class]': 'class()',
  },
})
export class ScDrawerDescription {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-sm text-muted-foreground', this.classInput()),
  );
}
