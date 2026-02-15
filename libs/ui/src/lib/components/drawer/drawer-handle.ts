import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-drawer-handle]',
  host: {
    'data-slot': 'drawer-handle',
    '[class]': 'class()',
  },
})
export class ScDrawerHandle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mx-auto mt-4 h-2 w-[100px] rounded-full bg-muted', this.classInput()),
  );
}
