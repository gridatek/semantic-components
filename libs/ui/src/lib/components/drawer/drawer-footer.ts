import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-drawer-footer]',
  host: {
    'data-slot': 'drawer-footer',
    '[class]': 'class()',
  },
})
export class ScDrawerFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('mt-auto flex flex-col gap-2 p-4', this.classInput()),
  );
}
