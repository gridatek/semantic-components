import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScButtonVariants } from '../button';
import { ScAlertDialogProvider } from './alert-dialog-provider';

@Directive({
  selector: 'button[scAlertDialogAction]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'action()',
  },
})
export class ScAlertDialogAction {
  private readonly buttonStyles = injectStyle().button;

  private readonly alertDialogProvider = inject(ScAlertDialogProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  readonly variant = input<ScButtonVariants['variant']>('default');
  readonly size = input<ScButtonVariants['size']>('default');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  private action(): void {
    this.alertDialogProvider.open.set(false);
  }
}
