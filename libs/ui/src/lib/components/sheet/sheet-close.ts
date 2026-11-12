import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectPreset } from '../../config/preset';
import { type ScButtonVariants } from '../button/button';
import { ScSheetProvider } from './sheet-provider';

/**
 * Closes the sheet: the preset's button, ghost and icon-sized for the ✕ —
 * straight in the sheet, the sheet puts it in its corner (`data-slot`).
 * Cancel or Done in the footer: `variant="outline" size="default"`.
 */
@Directive({
  selector: 'button[scSheetClose]',
  host: {
    'data-slot': 'sheet-close',
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'sheet.close()',
  },
})
export class ScSheetClose {
  private readonly buttonStyles = injectPreset().button;
  protected readonly sheet = inject(ScSheetProvider);
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
}
