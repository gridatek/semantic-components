import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { type ScButtonVariants } from '../button/button';
import { ScSheetProvider } from './sheet-provider';

/**
 * Closes the sheet: the style's button, ghost and icon-sized for the ✕ —
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
  private readonly buttonStyles = injectStyle().button;
  private readonly sheet = inject(ScSheetProvider);
  readonly classInput = input<string>('', { alias: 'class' });
  readonly type = input<'button' | 'submit' | 'reset'>('button');
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );
}
