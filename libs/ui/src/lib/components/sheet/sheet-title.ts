import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSheet } from './sheet';

@Directive({
  selector: 'h2[sc-sheet-title]',
  host: {
    'data-slot': 'sheet-title',
    '[id]': 'sheet.titleId',
    '[class]': 'class()',
  },
})
export class ScSheetTitle {
  readonly sheet = inject(ScSheet);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-lg font-semibold text-foreground', this.classInput()),
  );
}
