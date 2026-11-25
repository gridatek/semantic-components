import { Component, ViewEncapsulation, computed, input } from '@angular/core';
import { cn } from 'cn';

/**
 * Guide lines in the selection, thirds by default (`columns`, `rows`):
 * faint, clearer while the crop is dragged. Restyle the lines from its
 * class (`*:border-amber-400`); `opacity-100` keeps them clear.
 */
@Component({
  selector: 'div[scImageCropperGrid]',
  template: `
    @for (at of verticals(); track at) {
      <div
        class="absolute inset-y-0 border-l border-white/60"
        [style.left.%]="at"
      ></div>
    }
    @for (at of horizontals(); track at) {
      <div
        class="absolute inset-x-0 border-t border-white/60"
        [style.top.%]="at"
      ></div>
    }
  `,
  host: {
    'aria-hidden': 'true',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScImageCropperGrid {
  readonly classInput = input<string>('', { alias: 'class' });
  /** How many columns the lines make (1: no vertical line). */
  readonly columns = input(3);
  /** How many rows (1: no horizontal line). */
  readonly rows = input(3);

  private readonly verticals = computed(() => this.lines(this.columns()));
  private readonly horizontals = computed(() => this.lines(this.rows()));

  private readonly class = computed(() =>
    cn(
      'pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit] opacity-70 transition-opacity',
      'in-data-dragging:opacity-100',
      this.classInput(),
    ),
  );

  /** Where the lines between `count` parts are, in percent. */
  private lines(count: number): number[] {
    return Array.from(
      { length: Math.max(0, Math.round(count) - 1) },
      (_, i) => ((i + 1) / count) * 100,
    );
  }
}
