import { computed, Directive, inject, input } from '@angular/core';
import { cn } from '../../utils';
import { ScSheetProvider } from './sheet-provider';

@Directive({
  selector: 'button[sc-sheet-trigger]',
  host: {
    'data-slot': 'sheet-trigger',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'sheetProvider.open()',
    '(click)': 'openSheet()',
  },
})
export class ScSheetTrigger {
  readonly sheetProvider = inject(ScSheetProvider);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  openSheet(): void {
    this.sheetProvider.open.set(true);
  }
}
