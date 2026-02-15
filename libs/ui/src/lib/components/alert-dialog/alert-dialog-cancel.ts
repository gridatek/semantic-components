import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScAlertDialogProvider } from './alert-dialog-provider';
import { buttonVariants, ScButtonVariants } from '../button';

@Directive({
  selector: 'button[sc-alert-dialog-cancel]',
  host: {
    'data-slot': 'alert-dialog-cancel',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'cancel()',
  },
})
export class ScAlertDialogCancel {
  private readonly alertDialogProvider = inject(ScAlertDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('outline');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  cancel(): void {
    this.alertDialogProvider.open.set(false);
  }
}
