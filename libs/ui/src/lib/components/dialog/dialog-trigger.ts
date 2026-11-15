import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { ɵfocusOnPress } from '../../utils';
import { ScDialogProvider } from './dialog-provider';

@Directive({
  selector: 'button[scDialogTrigger]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '[attr.aria-haspopup]': '"dialog"',
    '[attr.aria-expanded]': 'dialogProvider.open()',
    '(click)': 'openDialog()',
  },
})
export class ScDialogTrigger {
  readonly dialogProvider = inject(ScDialogProvider);
  private readonly element =
    inject<ElementRef<HTMLButtonElement>>(ElementRef).nativeElement;
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn('', this.classInput()));

  openDialog(): void {
    ɵfocusOnPress(this.element);
    this.dialogProvider.open.set(true);
  }
}
