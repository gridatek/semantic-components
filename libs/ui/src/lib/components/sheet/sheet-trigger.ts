import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ɵfocusOnPress } from '../../utils';
import { ScSheetProvider } from './sheet-provider';

/** Opens the sheet, on any button: behaviour only, the look is the button's. */
@Directive({
  selector: 'button[scSheetTrigger]',
  host: {
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'sheet.open()',
    '[class]': 'class()',
    '(click)': 'openSheet()',
  },
})
export class ScSheetTrigger {
  protected readonly sheet = inject(ScSheetProvider);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  protected openSheet(): void {
    ɵfocusOnPress(this.element);
    this.sheet.open.set(true);
  }
}
