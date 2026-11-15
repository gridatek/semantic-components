import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartSeriesLabels,
  ScChartState,
  numberOf,
} from '@semantic-components/ui/charts';
import { cn } from 'cn';
import { sankey } from 'd3-sankey';
import { linkHorizontal } from 'd3-shape';

interface ScSankeyChartFlow {
  index: number;
  path: string;
  color: string;
  width: number;
  x: number;
  y: number;
}

interface ScSankeyChartNode {
  name: string;
  label: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  /** Its name: beside it, towards the middle of the chart. */
  labelX: number;
  anchor: 'start' | 'end';
}

/**
 * A series as a sankey: each row a flow (`key`, its value) from a node
 * (`sourceKey`) to another (`targetKey`), the nodes in columns, each in its
 * color (`--color-<node>`), the flows in their source's.
 */
@Component({
  selector: 'g[scChartSankey]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartSankey }],
  template: `
    @for (flow of flows(); track flow.index) {
      <svg:path
        fill="none"
        [attr.d]="flow.path"
        [attr.stroke]="flow.color"
        [attr.stroke-width]="flow.width"
        [attr.stroke-opacity]="flow.index === active() ? 0.6 : 0.3"
        (pointerenter)="point(flow.index)"
      />
    }
    @for (node of nodes(); track node.name) {
      <svg:rect
        rx="2"
        [attr.x]="node.x"
        [attr.y]="node.y"
        [attr.width]="node.width"
        [attr.height]="node.height"
        [attr.fill]="node.color"
      />
      <svg:text
        class="fill-foreground"
        dominant-baseline="middle"
        [attr.x]="node.labelX"
        [attr.y]="node.y + node.height / 2"
        [attr.text-anchor]="node.anchor"
      >
        {{ node.label }}
      </svg:text>
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-sankey',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartSankey implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows: each flow's value. */
  readonly key = input.required<string>();
  /** The key of each flow's source node. */
  readonly sourceKey = input('source');
  /** The key of each flow's target node. */
  readonly targetKey = input('target');
  /** Its nodes' width, in px. */
  readonly nodeWidth = input(12);
  /** The space between nodes in a column, in px. */
  readonly nodePadding = input(16);

  protected readonly active = this.state.activeIndex;

  private readonly sourceOf = (index: number) =>
    String(this.state.data()[index]?.[this.sourceKey()] ?? '');

  private readonly layout = computed(() => {
    const rows = this.state.data();
    const targetKey = this.targetKey();
    const names = [
      ...new Set(
        rows.flatMap((row, index) => [
          this.sourceOf(index),
          String(row[targetKey] ?? ''),
        ]),
      ),
    ];
    const { left, top, right, bottom } = this.state.area();
    return sankey<{ name: string }, { index: number }>()
      .nodeId((node) => node.name)
      .nodeWidth(this.nodeWidth())
      .nodePadding(this.nodePadding())
      .extent([
        [left, top],
        [right, bottom],
      ])({
      nodes: names.map((name) => ({ name })),
      links: rows.map((row, index) => ({
        index,
        source: this.sourceOf(index),
        target: String(row[targetKey] ?? ''),
        value: Math.max(0, numberOf(row[this.key()])),
      })),
    });
  });

  /** Mirrored (right to left, the app following it): flowing from the right. */
  private readonly mirrored = this.state.mirrored;

  /** An x as laid out, or flipped across the plot when mirrored. */
  private readonly across = computed(() => {
    const { left, right } = this.state.area();
    return this.mirrored() ? (x: number) => left + right - x : (x: number) => x;
  });

  protected readonly flows = computed<ScSankeyChartFlow[]>(() => {
    const across = this.across();
    const sourceX = (link: { source: unknown }) =>
      across(
        typeof link.source === 'object' && link.source
          ? ((link.source as { x1?: number }).x1 ?? 0)
          : 0,
      );
    const targetX = (link: { target: unknown }) =>
      across(
        typeof link.target === 'object' && link.target
          ? ((link.target as { x0?: number }).x0 ?? 0)
          : 0,
      );
    return this.layout()
      .links.map((link) => {
        // From its source's side to its target's (as d3-sankey's link).
        const path = linkHorizontal<typeof link, [number, number]>()
          .source((l) => [sourceX(l), l.y0 ?? 0])
          .target((l) => [targetX(l), l.y1 ?? 0]);
        return {
          index: link.index,
          path: path(link) ?? '',
          color: `var(--color-${this.sourceOf(link.index)})`,
          width: Math.max(1, link.width ?? 0),
          x: (sourceX(link) + targetX(link)) / 2,
          y: ((link.y0 ?? 0) + (link.y1 ?? 0)) / 2,
        };
      })
      .sort((a, b) => a.index - b.index);
  });

  protected readonly nodes = computed<ScSankeyChartNode[]>(() => {
    const config = this.state.config();
    const { right } = this.state.area();
    const across = this.across();
    const mirrored = this.mirrored();
    return this.layout().nodes.map((node) => {
      const x0 = node.x0 ?? 0;
      const x1 = node.x1 ?? 0;
      // The last column's names go inside, the others' outside: towards the
      // middle — the other way round when mirrored.
      const last = x1 >= right - 1;
      const x = Math.min(across(x0), across(x1));
      const width = x1 - x0;
      const before = last !== mirrored;
      return {
        name: node.name,
        label: config[node.name]?.label ?? node.name,
        x,
        y: node.y0 ?? 0,
        width,
        height: Math.max(1, (node.y1 ?? 0) - (node.y0 ?? 0)),
        color: `var(--color-${node.name})`,
        labelX: before ? x - 6 : x + width + 6,
        anchor: before ? 'end' : 'start',
      };
    });
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'sankey',
      stack: computed(() => null),
      colorBy: computed(() => 'category' as const),
      colorOf: (index) => `var(--color-${this.sourceOf(index)})`,
      legend: computed(() => this.layout().nodes.map((node) => node.name)),
      // The keyboard's item: across its flow's middle, as thick as it.
      anchor: (index) => {
        const flow = this.flows().find((f) => f.index === index);
        return flow
          ? {
              x: flow.x,
              y: flow.y - flow.width / 2,
              width: 0,
              height: flow.width,
            }
          : null;
      },
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  protected point(index: number): void {
    this.state.activeIndex.set(index);
  }

  /** In the middle of each flow, whatever the position. */
  labelPoints(): ScChartLabelPoint[] {
    const rows = this.state.data();
    return this.flows().map((flow) => ({
      index: flow.index,
      value: numberOf(rows[flow.index]?.[this.key()]),
      x: flow.x,
      y: flow.y,
      anchor: 'middle',
      baseline: 'middle',
    }));
  }
}
