import { Directive, computed, inject, input } from '@angular/core';
import { ScButtonVariants, buttonVariants, cn } from '@semantic-components/ui';
import { ScNativeDialogProvider } from './native-dialog-provider';

@Directive({
  selector: 'button[scNativeDialogClose]',
  host: {
    'data-slot': 'native-dialog-close',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'closeDialog()',
  },
})
export class ScNativeDialogClose {
  private readonly dialogProvider = inject(ScNativeDialogProvider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      'absolute top-2 right-2',
      this.classInput(),
    ),
  );

  protected closeDialog(): void {
    this.dialogProvider.open.set(false);
  }
}
