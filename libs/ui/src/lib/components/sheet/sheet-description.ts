import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSheet } from './sheet';

@Directive({
  selector: 'p[sc-sheet-description]',
  host: {
    'data-slot': 'sheet-description',
    '[id]': 'sheet.descriptionId',
    '[class]': 'class()',
  },
})
export class ScSheetDescription {
  readonly sheet = inject(ScSheet);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-muted-foreground text-sm', this.classInput()),
  );
}
