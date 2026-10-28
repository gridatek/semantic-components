import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from '../common/chart-state';

/** Corners' radii: top start, top end, bottom end, bottom start. */
export type ScChartRadius = number | readonly [number, number, number, number];

interface Bar {
  index: number;
  path: string;
}

/** A rectangle with each corner's own radius (clamped to fit). */
function roundedRect(
  x: number,
  y: number,
  width: number,
  height: number,
  [tl, tr, br, bl]: readonly [number, number, number, number],
): string {
  const max = Math.min(width, height) / 2;
  const [a, b, c, d] = [tl, tr, br, bl].map((r) =>
    Math.max(0, Math.min(r, max)),
  );
  return [
    `M${x + a},${y}`,
    `H${x + width - b}`,
    `A${b},${b} 0 0 1 ${x + width},${y + b}`,
    `V${y + height - c}`,
    `A${c},${c} 0 0 1 ${x + width - c},${y + height}`,
    `H${x + d}`,
    `A${d},${d} 0 0 1 ${x},${y + height - d}`,
    `V${y + a}`,
    `A${a},${a} 0 0 1 ${x + a},${y}`,
    'Z',
  ].join('');
}

/**
 * A series as bars: one per category, side by side with the other series — or
 * on one another, within a `stack`. Below 0, downwards. In `--color-<key>`.
 */
@Component({
  selector: 'g[scChartBar]',
  template: `
    @for (bar of bars(); track bar.index) {
      <svg:path [attr.d]="bar.path" [attr.fill]="fill() || color()" />
    }
  `,
  host: {
    'data-slot': 'chart-bar',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartBar {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  /** Bars of a stack are drawn on one another. */
  readonly stack = input<string | null>(null);
  /** Its corners' radius — one, or each: `[4, 4, 0, 0]`. Below 0, upside down. */
  readonly radius = input<ScChartRadius>(4);
  /** Instead of its color: `url(#gradient)`. */
  readonly fill = input('');

  protected readonly color = computed(() => `var(--color-${this.key()})`);

  protected readonly bars = computed<Bar[]>(() => {
    const x = this.state.x();
    const y = this.state.y();
    const slots = this.state.barSlots();
    const offset = slots(this.stack() ?? `\u0000${this.key()}`) ?? 0;
    const width = slots.bandwidth();
    const radius = this.radius();
    const corners =
      typeof radius === 'number'
        ? ([radius, radius, radius, radius] as const)
        : radius;
    return (this.state.extents().get(this.key()) ?? []).map(
      ([low, high], index) => {
        const a = y(low);
        const b = y(high);
        const up = high >= low;
        const [tl, tr, br, bl] = corners;
        return {
          index,
          path: roundedRect(
            (x(index) ?? 0) + offset,
            Math.min(a, b),
            width,
            Math.abs(a - b),
            up ? [tl, tr, br, bl] : [bl, br, tr, tl],
          ),
        };
      },
    );
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'bar',
      stack: this.stack,
    });
    inject(DestroyRef).onDestroy(unregister);
  }
}
