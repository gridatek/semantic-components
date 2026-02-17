import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScAlertDialog } from './alert-dialog';

@Directive({
  selector: 'h2[scAlertDialogTitle]',
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
    cn(
      'text-base font-medium',
      'sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2',
      this.classInput(),
    ),
  );
}
