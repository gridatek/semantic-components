import {
  Component,
  DestroyRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import {
  SC_CHART_SERIES,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
  ScChartState,
  numberOf,
} from '@semantic-components/ui/charts';
import { hierarchy, treemap, treemapSquarify } from 'd3-hierarchy';

interface ScTreemapChartNode {
  name: string;
  index?: number;
  value?: number;
  children?: ScTreemapChartNode[];
}

interface ScTreemapChartBox {
  index: number;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
}

interface ScTreemapChartGroup {
  name: string;
  x: number;
  y: number;
}

/** The room a group's name takes above its boxes, in px. */
const GROUP_HEADER = 20;

/** The smallest box a label goes on, in px. */
const MIN_LABEL_WIDTH = 40;
const MIN_LABEL_HEIGHT = 24;

/**
 * A series as a treemap: a box per row, its area its value, squarified — in
 * groups (`groupKey`) under their names, if given. Each box in its category's
 * color, or its group's (`--color-<group>`).
 */
@Component({
  selector: 'g[scChartTreemap]',
  providers: [{ provide: SC_CHART_SERIES, useExisting: ScChartTreemap }],
  template: `
    @for (group of groups(); track group.name) {
      <svg:text
        class="fill-muted-foreground"
        [attr.x]="group.x"
        [attr.y]="group.y"
        dominant-baseline="hanging"
      >
        {{ group.name }}
      </svg:text>
    }
    @for (box of boxes(); track box.index) {
      <svg:rect
        rx="4"
        [attr.x]="box.x"
        [attr.y]="box.y"
        [attr.width]="box.width"
        [attr.height]="box.height"
        [attr.fill]="box.color"
        [attr.fill-opacity]="box.index === active() ? 1 : 0.85"
        (pointerenter)="point(box.index)"
      />
    }
    <ng-content />
  `,
  host: {
    'data-slot': 'chart-treemap',
    '[attr.data-key]': 'key()',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScChartTreemap implements ScChartSeriesLabels {
  private readonly state = inject(ScChartState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The series' key in the rows: each box's value. */
  readonly key = input.required<string>();
  /** The key of each row's group: boxes gathered under it, in its color. */
  readonly groupKey = input('');
  /** The space between boxes, in px. */
  readonly gap = input(2);

  protected readonly active = this.state.activeIndex;

  private readonly layout = computed(() => {
    const rows = this.state.data();
    const key = this.key();
    const groupKey = this.groupKey();
    const leaf = (index: number): ScTreemapChartNode => ({
      name: this.state.categories()[index],
      index,
      value: Math.max(0, numberOf(rows[index][key])),
    });
    const indices = rows.map((_, index) => index);
    const children: ScTreemapChartNode[] = groupKey
      ? [...new Set(rows.map((row) => String(row[groupKey] ?? '')))].map(
          (name) => ({
            name,
            children: indices
              .filter((index) => String(rows[index][groupKey] ?? '') === name)
              .map(leaf),
          }),
        )
      : indices.map(leaf);
    const { left, top, right, bottom } = this.state.area();
    const root = hierarchy<ScTreemapChartNode>({ name: '', children })
      .sum((node) => node.value ?? 0)
      .sort(() => 0);
    return treemap<ScTreemapChartNode>()
      .tile(treemapSquarify)
      .size([right - left, bottom - top])
      .paddingInner(this.gap())
      .paddingTop((node) => (groupKey && node.depth === 1 ? GROUP_HEADER : 0))(
      root,
    );
  });

  protected readonly boxes = computed<ScTreemapChartBox[]>(() => {
    const { left, top } = this.state.area();
    const groupKey = this.groupKey();
    const rows = this.state.data();
    return this.layout()
      .leaves()
      .filter((leaf) => leaf.data.index !== undefined)
      .map((leaf) => {
        const index = leaf.data.index ?? 0;
        const name = groupKey
          ? String(rows[index][groupKey] ?? '')
          : leaf.data.name;
        return {
          index,
          x: left + leaf.x0,
          y: top + leaf.y0,
          width: Math.max(0, leaf.x1 - leaf.x0),
          height: Math.max(0, leaf.y1 - leaf.y0),
          color: `var(--color-${name})`,
        };
      })
      .sort((a, b) => a.index - b.index);
  });

  /** The groups' names, above their boxes. */
  protected readonly groups = computed<ScTreemapChartGroup[]>(() => {
    if (!this.groupKey()) return [];
    const { left, top } = this.state.area();
    const config = this.state.config();
    return (this.layout().children ?? []).map((group) => ({
      name: config[group.data.name]?.label ?? group.data.name,
      x: left + group.x0 + 2,
      y: top + group.y0 + 4,
    }));
  });

  protected readonly class = computed(() => cn(this.classInput()));

  constructor() {
    const unregister = this.state.register({
      key: this.key,
      kind: 'treemap',
      stack: computed(() => null),
      colorBy: computed(() => 'category' as const),
      colorOf: (index) => {
        const groupKey = this.groupKey();
        const row = this.state.data()[index];
        return groupKey
          ? `var(--color-${String(row?.[groupKey] ?? '')})`
          : `var(--color-${this.state.categories()[index]})`;
      },
      legend: computed(() =>
        this.groupKey()
          ? (this.layout().children ?? []).map((group) => group.data.name)
          : [...new Set(this.state.categories())],
      ),
    });
    inject(DestroyRef).onDestroy(unregister);
  }

  protected point(index: number): void {
    this.state.activeIndex.set(index);
  }

  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): ScChartLabelPoint[] {
    const rows = this.state.data();
    // None on boxes too small for them.
    const roomy = this.boxes().filter(
      (box) => box.width >= MIN_LABEL_WIDTH && box.height >= MIN_LABEL_HEIGHT,
    );
    return roomy.map((box) => {
      const value = numberOf(rows[box.index]?.[this.key()]);
      // Start: its top start corner; else its middle.
      return position === 'start'
        ? {
            index: box.index,
            value,
            x: box.x + offset,
            y: box.y + offset,
            anchor: 'start',
            baseline: 'hanging',
          }
        : {
            index: box.index,
            value,
            x: box.x + box.width / 2,
            y: box.y + box.height / 2,
            anchor: 'middle',
            baseline: 'middle',
          };
    });
  }
}
