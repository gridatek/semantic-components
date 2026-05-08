import {
  Directive,
  computed,
  contentChild,
  input,
  output,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScOrgChartNodeDef } from './org-chart-node-def';
import type {
  ScOrgChartDirection,
  ScOrgChartNodeExpandEvent,
} from './org-chart-types';
import { SC_ORG_CHART } from './org-chart-types';

@Directive({
  selector: 'div[scOrgChart]',
  providers: [{ provide: SC_ORG_CHART, useExisting: ScOrgChart }],
  host: {
    role: 'tree',
    '[attr.aria-label]': 'ariaLabel()',
    '[class]': 'class()',
  },
})
export class ScOrgChart {
  readonly direction = input<ScOrgChartDirection>('vertical');
  readonly collapsible = input(true);
  readonly compact = input(false);
  readonly ariaLabel = input<string>('Organization chart');

  readonly classInput = input<string>('', { alias: 'class' });

  readonly nodeExpand = output<ScOrgChartNodeExpandEvent>();

  readonly nodeDef = contentChild.required(ScOrgChartNodeDef);

  protected readonly class = computed(() =>
    cn(
      'inline-flex overflow-auto p-4',
      this.direction() === 'vertical'
        ? 'flex-col items-center'
        : 'flex-row items-start',
      this.classInput(),
    ),
  );
}
