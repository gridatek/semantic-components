import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScAlertDialog } from './alert-dialog';

@Directive({
  selector: 'p[sc-alert-dialog-description]',
  host: {
    'data-slot': 'alert-dialog-description',
    '[id]': 'dialog.descriptionId',
    '[class]': 'class()',
  },
})
export class ScAlertDialogDescription {
  readonly dialog = inject(ScAlertDialog);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground text-sm text-balance md:text-pretty',
      '*:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground',
      this.classInput(),
    ),
  );
}
