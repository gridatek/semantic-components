import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ScSheetProvider } from './sheet-provider';

/** Opens the sheet, on any button: behaviour only, the look is the button's. */
@Directive({
  selector: 'button[scSheetTrigger]',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'sheet.open()',
    '[class]': 'class()',
    '(click)': 'sheet.open.set(true)',
  },
})
export class ScSheetTrigger {
  protected readonly sheet = inject(ScSheetProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));
}
