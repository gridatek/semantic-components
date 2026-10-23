import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils/cn/cn';
import { ScButtonVariants } from '../button/button';
import { ScNativeDialogProvider } from './native-dialog-provider';

@Directive({
  selector: 'button[scNativeDialogClose]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'closeDialog()',
  },
})
export class ScNativeDialogClose {
  private readonly buttonStyles = injectPreset().button;

  private readonly dialogProvider = inject(ScNativeDialogProvider);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      'absolute top-2 end-2',
      this.classInput(),
    ),
  );

  protected closeDialog(): void {
    this.dialogProvider.open.set(false);
  }
}
