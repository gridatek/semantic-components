import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScCompare } from './compare';

/**
 * A side's name, in its corner (`scCompareLabel="before"`, `"after"`): your
 * text. It fades while the divider covers it.
 */
@Directive({
  selector: '[scCompareLabel]',
  host: {
    'data-slot': 'compare-label',
    '[attr.data-side]': 'side()',
    '[attr.data-covered]': 'covered() || null',
    '[class]': 'class()',
  },
})
export class ScCompareLabel {
  private readonly compare = inject(ScCompare);

  readonly side = input.required<'before' | 'after'>({
    alias: 'scCompareLabel',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  /** Its side has too little room left to show it. */
  protected readonly covered = computed(() =>
    this.side() === 'before'
      ? this.compare.position() < 20
      : this.compare.position() > 80,
  );

  protected readonly class = computed(() =>
    cn(
      'pointer-events-none absolute z-[5] m-3 rounded-md bg-black/60 px-2 py-1 text-xs font-medium text-white transition-opacity',
      'data-covered:opacity-0',
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
