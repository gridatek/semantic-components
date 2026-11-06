import { Directive, computed, inject, input } from '@angular/core';
import { injectPreset } from '../../config/preset';
import { cn } from '../../utils';
import { type ScButtonVariants } from '../button/button';
import { ScSheetNextProvider } from './sheet-next-provider';

/**
 * Closes the sheet: the preset's button, ghost and icon-sized for the ✕ —
 * straight in the sheet, the sheet puts it in its corner (`data-slot`).
 * Cancel or Done in the footer: `variant="outline" size="default"`.
 */
@Directive({
  selector: 'button[scSheetNextClose]',
  host: {
    'data-slot': 'sheet-close',
    '[attr.type]': 'type()',
    '[class]': 'class()',
    '(click)': 'sheet.close()',
  },
})
export class ScSheetNextClose {
  private readonly buttonStyles = injectPreset().button;
  protected readonly sheet = inject(ScSheetNextProvider);
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
