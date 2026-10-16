import { Directive, computed, inject, input } from '@angular/core';
import { cn, ɵwarnIfUnnamed } from '@semantic-components/ui';
import { ScImageAnnotatorNext } from './image-annotator-next';

/**
 * A colour to draw with — and for the selected annotation
 * (`scImageAnnotatorNextColor="#e11d48"`): a swatch, pressed while it is the
 * one. Name it ("Red"); put the colours in a group you name.
 */
@Directive({
  selector: 'button[scImageAnnotatorNextColor]',
  host: {
    type: 'button',
    'data-slot': 'image-annotator-color',
    '[attr.aria-pressed]': 'pressed()',
    '[disabled]': 'annotator.readonly()',
    '[style.background-color]': 'value()',
    '[class]': 'class()',
    '(click)': 'annotator.color.set(value())',
  },
})
export class ScImageAnnotatorNextColor {
  protected readonly annotator = inject(ScImageAnnotatorNext);

  readonly value = input.required<string>({
    alias: 'scImageAnnotatorNextColor',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly pressed = computed(
    () => this.annotator.color().toLowerCase() === this.value().toLowerCase(),
  );

  protected readonly class = computed(() =>
    cn(
      'size-6 shrink-0 rounded-full border-2 border-white shadow-[0_0_0_1px_var(--border)] outline-none transition-transform',
      'hover:scale-110 focus-visible:ring-3 focus-visible:ring-ring/50',
      'aria-pressed:shadow-[0_0_0_2px_var(--foreground)]',
      'disabled:pointer-events-none disabled:opacity-50',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scImageAnnotatorNextColor');
  }
}
