import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scDrawerFooter]',
  host: {
    'data-slot': 'drawer-footer',
    '[class]': 'class()',
  },
})
export class ScDrawerFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-2 p-4 mt-auto flex flex-col', this.classInput()),
  );
}
