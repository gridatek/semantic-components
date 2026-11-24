import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ɵfocusOnPress } from '../../utils';
import { ScNativeDialogProvider } from './native-dialog-provider';

/** Opens the dialog, on any button (behaviour only: write `scButton` or another part's look). */
@Directive({
  selector: 'button[scNativeDialogTrigger]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'provider.open()',
    '(click)': 'openDialog()',
  },
})
export class ScNativeDialogTrigger {
  private readonly provider = inject(ScNativeDialogProvider);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('', this.classInput()));

  private openDialog(): void {
    // Focused first (Safari doesn't on a click): the browser gives focus back here.
    ɵfocusOnPress(this.element);
    this.provider.open.set(true);
  }
}
