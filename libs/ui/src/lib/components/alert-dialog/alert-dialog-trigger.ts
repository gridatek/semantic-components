import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ɵfocusOnPress } from '../../utils';
import { ScAlertDialogProvider } from './alert-dialog-provider';

@Directive({
  selector: 'button[scAlertDialogTrigger]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'alertDialogProvider.open()',
    '(click)': 'openDialog()',
  },
})
export class ScAlertDialogTrigger {
  private readonly alertDialogProvider = inject(ScAlertDialogProvider);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() => cn('', this.classInput()));

  private openDialog(): void {
    ɵfocusOnPress(this.element);
    this.alertDialogProvider.open.set(true);
  }
}
