import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSheet } from './sheet';

@Directive({
  selector: 'h2[scSheetTitle]',
  host: {
    '[id]': 'sheet.titleId',
    '[class]': 'class()',
  },
})
export class ScSheetTitle {
  readonly sheet = inject(ScSheet);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-base font-medium text-foreground', this.classInput()),
  );
}
