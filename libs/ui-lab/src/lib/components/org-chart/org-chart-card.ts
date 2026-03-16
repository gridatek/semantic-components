import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_ORG_CHART } from './org-chart-types';

@Directive({
  selector: 'button[scOrgChartCard]',
  host: {
    'data-slot': 'org-chart-card',
    type: 'button',
    '[class]': 'class()',
  },
})
export class ScOrgChartCard {
  private readonly orgChart = inject(SC_ORG_CHART);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground',
      'shadow-sm hover:shadow-md transition-shadow',
      'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
      this.orgChart.compact() ? 'min-w-[160px]' : 'min-w-[200px]',
      this.classInput(),
    ),
  );
}
