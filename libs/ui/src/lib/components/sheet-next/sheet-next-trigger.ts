import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSheetNextProvider } from './sheet-next-provider';

/** Opens the sheet, on any button: behaviour only, the look is the button's. */
@Directive({
  selector: 'button[scSheetNextTrigger]',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'sheet.open()',
    '[class]': 'class()',
    '(click)': 'sheet.open.set(true)',
  },
})
export class ScSheetNextTrigger {
  protected readonly sheet = inject(ScSheetNextProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
