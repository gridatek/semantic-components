import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  booleanAttribute,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { arc } from 'd3-shape';
import { ScChartState } from '../chart/chart-state';

interface Ring {
  index: number;
  path: string;
  track: string;
  color: string;
}

/**
 * A series as radial bars: a ring per row, the first innermost, its value as
 * an arc from the plot's `startAngle` towards its `endAngle` — on the other
 * series' arcs, within a `stack`. Colored by its key, or by each row's
 * category (`colorBy`).
 */
@Component({
  selector: 'g[scChartRadialBar]',
  template: `
    @if (track()) {
      @for (ring of rings(); track ring.index) {
        <svg:path
          class="fill-muted"
          [attr.d]="ring.track"
          (pointerenter)="point(ring.index)"
        />
      }
    }
    @for (ring of rings(); track ring.index) {
      <svg:path
        [attr.d]="ring.path"
        [attr.fill]="ring.color"
        (pointerenter)="point(ring.index)"
      />
    }
  `,
  host: {
    'data-slot': 'chart-radial-bar',
    '[attr.data-key]': 'key()',
    '[attr.transform]': 'transform()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartRadialBar {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows. */
  readonly key = input.required<string>();
  /** Radial bars of a stack are drawn one after the other along the ring. */
  readonly stack = input<string | null>(null);
  /** Its color: its key's, or each row's category's. */
  readonly colorBy = input<'key' | 'category'>('key');
  /** Where the rings start, as a share of the radius. */
  readonly innerRadius = input(0.3);
  /** Where they end, as a share of the radius. */
  readonly outerRadius = input(1);
  readonly cornerRadius = input(0);
  /** Each ring's full length behind it. */
  readonly track = input(false, { transform: booleanAttribute });

  protected readonly transform = computed(() => {
    const { cx, cy } = this.state.circle();
    return `translate(${cx},${cy})`;
  });

  protected readonly rings = computed<Ring[]>(() => {
    const extent = this.state.extents().get(this.key()) ?? [];
    const share = this.state.share();
    const [start, end] = this.state.angles();
    const { radius } = this.state.circle();
    const inner = radius * this.innerRadius();
    const outer = radius * this.outerRadius();
    const step = (outer - inner) / Math.max(1, extent.length);
    const gap = extent.length > 1 ? step * 0.2 : 0;
    const categories = this.state.categories();
    return extent.map(([low, high], index) => {
      const shape = arc()
        .innerRadius(inner + index * step + gap / 2)
        .outerRadius(inner + (index + 1) * step - gap / 2)
        .cornerRadius(this.cornerRadius());
      const at = (value: number) => start + (end - start) * share(value);
      const angles = { innerRadius: 0, outerRadius: 0, padAngle: 0 };
      return {
        index,
        path:
          shape({ ...angles, startAngle: at(low), endAngle: at(high) }) ?? '',
        track: shape({ ...angles, startAngle: start, endAngle: end }) ?? '',
        color: `var(--color-${this.colorBy() === 'category' ? categories[index] : this.key()})`,
      };
    });
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'radial',
      stack: this.stack,
      colorBy: this.colorBy,
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  protected point(index: number): void {
    this.state.activeIndex.set(index);
  }
}
