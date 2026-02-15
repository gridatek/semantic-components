import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'h2[sc-drawer-title]',
  host: {
    'data-slot': 'drawer-title',
    '[class]': 'class()',
  },
})
export class ScDrawerTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-lg font-semibold leading-none tracking-tight', this.classInput()),
  );
}
