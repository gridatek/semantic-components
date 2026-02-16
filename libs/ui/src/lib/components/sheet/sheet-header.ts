import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-sheet-header]',
  host: {
    'data-slot': 'sheet-header',
    '[class]': 'class()',
  },
})
export class ScSheetHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-2 text-center sm:text-left', this.classInput()),
  );
}
