import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScChartNextState } from './chart-next-state';

/** The series of the plot: each one's color and name (the chart's `config`). */
@Component({
  selector: 'div[scChartNextLegend]',
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
export class ScChartNextLegend {
  private readonly state = inject(ScChartNextState);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly items = computed(() => {
    const config = this.state.config();
    return this.state.keys().map((key) => ({
      key,
      name: config[key]?.label ?? key,
      color: `var(--color-${key})`,
    }));
  });

  protected readonly class = computed(() =>
    cn('flex items-center justify-center gap-4 pt-3', this.classInput()),
  );
}
