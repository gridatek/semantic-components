import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { isTyped } from './ink';
import { ScSignaturePadNext } from './signature-pad-next';

/**
 * Signs by typing — the way without a pointer: your `input`, its text the
 * signature, in its font (give it one: a script font reads as a signature).
 * Label it ("Type your name").
 */
@Directive({
  selector: 'input[scSignaturePadNextText]',
  host: {
    'data-slot': 'signature-pad-text',
    type: 'text',
    autocomplete: 'name',
    '[value]': 'text()',
    '[disabled]': 'pad.disabled()',
    '[readOnly]': 'pad.readonly()',
    '[class]': 'class()',
    '(input)': 'onInput()',
    '(blur)': 'pad.touch.emit()',
  },
})
export class ScSignaturePadNextText {
  protected readonly pad = inject(ScSignaturePadNext);
  private readonly element =
    inject<ElementRef<HTMLInputElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The typed name; empty while the signature is drawn. */
  protected readonly text = computed(() => {
    const value = this.pad.value();
    return isTyped(value) ? value.text : '';
  });

  protected readonly class = computed(() =>
    cn(
      'border-input placeholder:text-muted-foreground h-14 w-full min-w-0 rounded-md border bg-transparent px-3 text-2xl shadow-xs outline-none',
      'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
      'disabled:cursor-not-allowed disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected onInput(): void {
    this.pad.ɵsetText(
      this.element.value,
      getComputedStyle(this.element).fontFamily,
    );
  }
}
