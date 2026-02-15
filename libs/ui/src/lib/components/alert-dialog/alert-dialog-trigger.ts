import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScAlertDialogProvider } from './alert-dialog-provider';

@Directive({
  selector: 'button[sc-alert-dialog-trigger]',
  host: {
    'data-slot': 'alert-dialog-trigger',
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"alertdialog"',
    '[attr.aria-expanded]': 'alertDialogProvider.open()',
    '(click)': 'openDialog()',
  },
})
export class ScAlertDialogTrigger {
  readonly alertDialogProvider = inject(ScAlertDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  openDialog(): void {
    this.alertDialogProvider.open.set(true);
  }
}
