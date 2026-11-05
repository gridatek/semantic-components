import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScDialogProvider } from './dialog-provider';

/**
 * Closes the dialog: the preset's button, ghost and icon-sized for the ✕ —
 * straight in the dialog, the dialog puts it in its corner (`data-slot`).
 * Cancel or Done in the footer: `variant="outline" size="default"`, where it
 * stands. Code to run before closing (Save) closes through the provider's
 * `[(open)]` instead.
 */
@Directive({
  selector: 'button[scDialogClose]',
  host: {
    'data-slot': 'dialog-close',
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'close()',
  },
})
export class ScDialogClose {
  private readonly dialogProvider = inject(ScDialogProvider);
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected close(): void {
    this.dialogProvider.open.set(false);
  }
}
