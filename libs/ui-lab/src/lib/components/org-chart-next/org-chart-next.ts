import { Tree } from '@angular/aria/tree';
import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** Which way the chart grows: `down` (reports below), `across` (reports at the inline end). */
export type ScOrgChartNextDirection = 'down' | 'across';

/**
 * An organization chart: your people (`scOrgChartNextItem`), their reports
 * nested in groups (`scOrgChartNextGroup`), joined by lines. A tree
 * (`@angular/aria`'s): one Tab stop, ↑ ↓ between people in reading order,
 * → ← to open, close, or go in and out; `[(value)]` the selected.
 */
@Directive({
  selector: 'ul[scOrgChartNext]',
  exportAs: 'scOrgChartNext',
  hostDirectives: [
    {
      directive: Tree,
      inputs: ['value', 'multi', 'selectionMode', 'disabled'],
      outputs: ['valueChange'],
    },
  ],
  host: {
    'data-slot': 'org-chart',
    '[attr.data-direction]': 'direction()',
    '[class]': 'class()',
  },
})
export class ScOrgChartNext {
  readonly tree = inject(Tree);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly direction = input<ScOrgChartNextDirection>('down');

  protected readonly class = computed(() =>
    cn(
      // A chart larger than its box scrolls; smaller, it is centred.
      'flex max-w-full overflow-auto p-4',
      this.direction() === 'down'
        ? 'justify-center-safe'
        : 'flex-col items-start',
      this.classInput(),
    ),
  );
}
