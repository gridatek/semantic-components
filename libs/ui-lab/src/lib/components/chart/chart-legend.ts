import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  ViewEncapsulation,
} from '@angular/core';
import { cn } from '../../utils';
import { CHART_COLORS } from './chart-types';

@Component({
  selector: '[sc-chart-legend]',
  template: `
    <div class="flex flex-wrap items-center justify-center gap-4">
      @for (item of items(); track item.label; let i = $index) {
        <div class="flex items-center gap-2">
          <div
            class="size-3 rounded-sm"
            [style.background-color]="item.color || getColor(i)"
          ></div>
          <span class="text-sm text-muted-foreground">{{ item.label }}</span>
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'chart-legend',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScChartLegend {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly items = input<{ label: string; color?: string }[]>([]);

  protected readonly class = computed(() => cn('mt-4', this.classInput()));

  getColor(index: number): string {
    return CHART_COLORS[index % CHART_COLORS.length];
  }
}
