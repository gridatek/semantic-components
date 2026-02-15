import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScDialog } from './dialog';

@Directive({
  selector: 'h2[sc-dialog-title]',
  host: {
    'data-slot': 'dialog-title',
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScDialogTitle {
  readonly dialog = inject(ScDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-base leading-none font-medium', this.classInput()),
  );
}
