import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScAlertDialogProvider } from './alert-dialog-provider';
import { buttonVariants, ScButtonVariants } from '../button';

@Directive({
  selector: 'button[sc-alert-dialog-action]',
  host: {
    'data-slot': 'alert-dialog-action',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'action()',
  },
})
export class ScAlertDialogAction {
  private readonly alertDialogProvider = inject(ScAlertDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  action(): void {
    this.alertDialogProvider.open.set(false);
  }
}
