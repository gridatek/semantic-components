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
  type ScChartAnimationEasing,
  type ScChartLabelPoint,
  type ScChartLabelPosition,
  type ScChartSeriesLabels,
  ScChartState,
  numberOf,
  scChartEntrance,
} from '@semantic-components/ui/charts';
import { cn } from 'cn';
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
  anchor: 'start' | 'end';
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
        [attr.text-anchor]="group.anchor"
        dominant-baseline="hanging"
      >
        {{ group.name }}
      </svg:text>
    }
    @for (box of boxes(); track box.index) {
      <!-- Its corners: the style's, as the bars' (the preset sets --chart-bar-radius). -->
      <svg:rect
        class="[rx:var(--chart-bar-radius,0px)]"
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
  /** Its boxes slide in from the left when it appears (Recharts'); not with reduced motion. */
  readonly isAnimationActive = input(true);
  /** The wait before they slide, in ms. */
  readonly animationBegin = input(0);
  /** How long they slide, in ms. */
  readonly animationDuration = input(1500);
  readonly animationEasing = input<ScChartAnimationEasing>('linear');

  /** Its entrance: 0 to 1 once, after its first render. */
  private readonly entrance = scChartEntrance({
    begin: this.animationBegin,
    duration: this.animationDuration,
    easing: this.animationEasing,
  });
  /** Mirrored (right to left, the app following it): laid out from the right. */
  private readonly mirrored = this.state.mirrored;

  /**
   * Where a box goes across, from its layout's x0 and x1 (in the plot): as
   * laid out, or mirrored — from the right.
   */
  private readonly across = computed(() => {
    const { left, right } = this.state.area();
    const width = right - left;
    return this.mirrored()
      ? (x0: number, x1: number) => ({ x0: width - x1, x1: width - x0 })
      : (x0: number, x1: number) => ({ x0, x1 });
  });

  /**
   * How far a box still is from its place, given its x (in the plot) and its
   * width: sliding in, from just past the plot's left edge (Recharts') — its
   * right edge, mirrored.
   */
  private readonly away = computed(() => {
    const left = 1 - (this.isAnimationActive() ? this.entrance() : 1);
    const { left: start, right } = this.state.area();
    const width = right - start;
    return this.mirrored()
      ? (x: number) => (width - x) * left
      : (x: number, size: number) => -(x + size) * left;
  });

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
    const away = this.away();
    const across = this.across();
    return this.layout()
      .leaves()
      .filter((leaf) => leaf.data.index !== undefined)
      .map((leaf) => {
        const index = leaf.data.index ?? 0;
        const name = groupKey
          ? String(rows[index][groupKey] ?? '')
          : leaf.data.name;
        const { x0, x1 } = across(leaf.x0, leaf.x1);
        return {
          index,
          x: left + x0 + away(x0, x1 - x0),
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
    const away = this.away();
    const across = this.across();
    const mirrored = this.mirrored();
    return (this.layout().children ?? []).map((group) => {
      const { x0, x1 } = across(group.x0, group.x1);
      // At its start: its left, or its right when mirrored.
      return {
        name: config[group.data.name]?.label ?? group.data.name,
        x: left + (mirrored ? x1 - 2 : x0 + 2) + away(x0, x1 - x0),
        y: top + group.y0 + 4,
        anchor: mirrored ? ('end' as const) : ('start' as const),
      };
    });
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
      // The keyboard's item: its box.
      anchor: (index) => {
        const box = this.boxes().find((b) => b.index === index);
        return box
          ? { x: box.x, y: box.y, width: box.width, height: box.height }
          : null;
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
      // Start: its top start corner (the right one, mirrored); else its middle.
      const mirrored = this.mirrored();
      return position === 'start'
        ? {
            index: box.index,
            value,
            x: mirrored ? box.x + box.width - offset : box.x + offset,
            y: box.y + offset,
            anchor: mirrored ? 'end' : 'start',
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
