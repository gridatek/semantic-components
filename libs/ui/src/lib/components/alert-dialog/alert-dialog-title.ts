import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScAlertDialog } from './alert-dialog';

@Directive({
  selector: 'h2[sc-alert-dialog-title]',
  host: {
    'data-slot': 'alert-dialog-title',
    '[id]': 'dialog.titleId',
    '[class]': 'class()',
  },
})
export class ScAlertDialogTitle {
  readonly dialog = inject(ScAlertDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('text-base font-medium', this.classInput()),
  );
}
