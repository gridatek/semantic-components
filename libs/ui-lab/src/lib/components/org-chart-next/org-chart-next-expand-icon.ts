import { Directive, computed, forwardRef, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScOrgChartNextItem } from './org-chart-next-item';

/** Your chevron, in a card: turned while the person's reports are shown. */
@Directive({
  selector: 'svg[scOrgChartNextExpandIcon]',
  host: {
    'data-slot': 'org-chart-expand-icon',
    '[class]': 'class()',
  },
})
export class ScOrgChartNextExpandIcon {
  private readonly item = inject(forwardRef(() => ScOrgChartNextItem));

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground size-4 shrink-0 transition-transform duration-200 motion-reduce:transition-none',
      this.item.expanded() && 'rotate-180',
      this.classInput(),
    ),
  );
}
