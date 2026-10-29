import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartState } from './chart-state';

/**
 * The series of the plot — or, for a pie's slices and radial bars, the
 * categories; a sunburst's groups, a sankey's nodes: each one's color and
 * name (the chart's `config`).
 */
@Component({
  selector: 'div[scChartLegend]',
  template: `
    @for (item of items(); track item.key) {
      <div class="flex items-center gap-1.5">
        <div
          aria-hidden="true"
          class="size-2 shrink-0 rounded-[2px]"
          [style.background-color]="item.color"
        ></div>
        {{ item.name }}
      </div>
    }
  `,
  host: {
    'data-slot': 'chart-legend',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartLegend {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly items = computed(() => {
    const config = this.state.config();
    // A series' own list (groups, nodes); a pie's slices, radial bars: their
    // categories.
    const own = this.state
      .series()
      .find((s) => s.legend)
      ?.legend?.();
    const names =
      own ??
      (this.state.categoryKeys().size
        ? [...new Set(this.state.categories())]
        : this.state.keys());
    return names.map((key) => ({
      key,
      name: config[key]?.label ?? key,
      color: `var(--color-${key})`,
    }));
  });

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-4 pt-3', this.classInput()),
  );
}
