import { Tree } from '@angular/aria/tree';
import {
  Directive,
  computed,
  contentChild,
  inject,
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

/**
 * An organization chart. Built on `@angular/aria`'s `Tree` (`role="tree"`):
 * one Tab stop, arrow keys between visible people, ArrowRight/Left and click
 * to expand/collapse, Enter/Space to select.
 */
@Directive({
  selector: 'div[scOrgChart]',
  hostDirectives: [Tree],
  providers: [{ provide: SC_ORG_CHART, useExisting: ScOrgChart }],
  host: {
    'data-slot': 'org-chart',
    '[class]': 'class()',
  },
})
export class ScOrgChart {
  readonly tree = inject(Tree);

  readonly direction = input<ScOrgChartDirection>('vertical');
  readonly collapsible = input(true);
  readonly compact = input(false);

  readonly classInput = input<string>('', { alias: 'class' });

  readonly nodeExpand = output<ScOrgChartNodeExpandEvent>();

  readonly nodeDef = contentChild.required(ScOrgChartNodeDef);

  protected readonly class = computed(() =>
    cn(
      'inline-flex overflow-auto p-4',
      // Where horizontal connectors meet a card: half the card's height.
      '[--sc-org-chart-anchor:2.25rem]',
      // Safe centering: a chart wider than the box overflows to the end only,
      // so all of it can be scrolled to.
      this.direction() === 'vertical'
        ? 'flex-col items-center-safe'
        : 'flex-row items-start',
      this.classInput(),
    ),
  );
}
