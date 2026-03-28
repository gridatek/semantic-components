import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[scItemFooter]',
  host: {
    '[class]': 'class()',
  },
})
export class ScItemFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('gap-2 flex basis-full items-center justify-between', this.classInput()),
  );
}
