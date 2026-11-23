import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScCompareNext } from './compare-next';

/**
 * A side's name, in its corner (`scCompareNextLabel="before"`, `"after"`): your
 * text. It fades while the divider covers it.
 */
@Directive({
  selector: '[scCompareNextLabel]',
  host: {
    'data-slot': 'compare-label',
    '[attr.data-side]': 'side()',
    '[attr.data-covered]': 'covered() || null',
    '[class]': 'class()',
  },
})
export class ScCompareNextLabel {
  private readonly compare = inject(ScCompareNext);
  private readonly styles = injectStyle().compare;

  readonly side = input.required<'before' | 'after'>({
    alias: 'scCompareNextLabel',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  /** Its side has too little room left to show it. */
  private readonly covered = computed(() =>
    this.side() === 'before'
      ? this.compare.position() < 20
      : this.compare.position() > 80,
  );

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute z-[5] m-3 bg-black/60 px-2 py-1 text-xs font-medium text-white transition-opacity motion-reduce:transition-none',
      this.styles.label,
      // Its side too small to show it: it fades.
      this.covered() && 'opacity-0',
      this.compare.orientation() === 'vertical'
        ? this.side() === 'before'
          ? 'start-0 top-0'
          : 'start-0 bottom-0'
        : this.side() === 'before'
          ? 'start-0 top-0'
          : 'end-0 top-0',
      this.classInput(),
    ),
  );
}
