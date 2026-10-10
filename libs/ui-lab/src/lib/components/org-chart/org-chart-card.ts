import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_ORG_CHART } from './org-chart-types';

/**
 * The visible card of a person. The node around it (`role="treeitem"`) takes
 * focus and handles clicks and keys, so the card is plain content — use a
 * `div`, not a button. It shows the focus ring while its node is focused.
 */
@Directive({
  selector: '[scOrgChartCard]',
  host: {
    'data-slot': 'org-chart-card',
    '[class]': 'class()',
  },
})
export class ScOrgChartCard {
  private readonly orgChart = inject(SC_ORG_CHART);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center gap-3 p-3 rounded-lg border bg-card text-card-foreground',
      'shadow-sm hover:shadow-md transition-shadow cursor-pointer select-none',
      this.orgChart.compact() ? 'min-w-[160px]' : 'min-w-[200px]',
      this.classInput(),
    ),
  );
}
