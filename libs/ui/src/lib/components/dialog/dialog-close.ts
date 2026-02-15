import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScDialogProvider } from './dialog-provider';
import { buttonVariants, ScButtonVariants } from '../button';

@Directive({
  selector: 'button[sc-dialog-close]',
  host: {
    'data-slot': 'dialog-close',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'closeDialog()',
  },
})
export class ScDialogClose {
  private readonly dialogProvider = inject(ScDialogProvider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      'absolute top-2 right-2',
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected closeDialog(): void {
    this.dialogProvider.open.set(false);
  }
}
