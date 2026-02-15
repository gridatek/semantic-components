import { computed, Directive, input } from '@angular/core';
import { cn } from '../../utils';

@Directive({
  selector: 'div[sc-sheet-footer]',
  host: {
    'data-slot': 'sheet-footer',
    '[class]': 'class()',
  },
})
export class ScSheetFooter {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex flex-col-reverse gap-2 sm:flex-row sm:justify-end',
      this.classInput(),
    ),
  );
}
