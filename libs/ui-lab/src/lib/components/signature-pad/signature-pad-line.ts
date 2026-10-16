import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** Your "Sign here" line, at the bottom of the surface: write its text (and a ×). */
@Directive({
  selector: '[scSignaturePadLine]',
  host: {
    'data-slot': 'signature-pad-line',
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
})
export class ScSignaturePadLine {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground pointer-events-none absolute inset-x-6 bottom-6 border-b border-dashed pb-1 text-xs select-none',
      this.classInput(),
    ),
  );
}
