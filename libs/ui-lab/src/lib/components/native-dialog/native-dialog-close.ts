import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'button[scNativeDialogClose]',
  host: {
    'data-slot': 'native-dialog-close',
    type: 'button',
    '[class]': 'class()',
    '(click)': 'closeDialog()',
  },
})
export class ScNativeDialogClose {
  private readonly elementRef = inject(ElementRef<HTMLButtonElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'ring-offset-background focus:ring-ring absolute top-4 right-4 rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none',
      this.classInput(),
    ),
  );

  protected closeDialog(): void {
    const dialog = this.elementRef.nativeElement.closest('dialog');
    dialog?.close();
  }
}
