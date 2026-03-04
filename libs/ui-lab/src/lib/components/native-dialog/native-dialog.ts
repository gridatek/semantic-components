import {
  Directive,
  ElementRef,
  computed,
  effect,
  inject,
  input,
  model,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

@Directive({
  selector: 'dialog[scNativeDialog]',
  host: {
    'data-slot': 'native-dialog',
    '[class]': 'class()',
    '(close)': 'onClose()',
    '(click)': 'onBackdropClick($event)',
  },
})
export class ScNativeDialog {
  private readonly elementRef = inject(ElementRef<HTMLDialogElement>);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly open = model<boolean>(false);
  readonly closed = output<void>();

  protected readonly class = computed(() =>
    cn(
      'bg-background text-foreground relative w-full max-w-sm rounded-xl border p-4 shadow-lg backdrop:bg-black/50',
      'focus:outline-none',
      this.classInput(),
    ),
  );

  constructor() {
    effect(() => {
      const dialogEl = this.elementRef.nativeElement;
      if (this.open()) {
        if (!dialogEl.open) {
          dialogEl.showModal();
        }
      } else {
        if (dialogEl.open) {
          dialogEl.close();
        }
      }
    });
  }

  protected onClose(): void {
    this.open.set(false);
    this.closed.emit();
  }

  protected onBackdropClick(event: MouseEvent): void {
    const dialogEl = this.elementRef.nativeElement;
    if (event.target === dialogEl) {
      dialogEl.close();
    }
  }
}
