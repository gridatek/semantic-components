import { Service, type Signal, computed, signal } from '@angular/core';
import {
  type ScaleBand,
  type ScalePoint,
  scaleBand,
  scaleLinear,
  scalePoint,
} from 'd3-scale';
import { stack, stackOffsetDiverging, stackOffsetExpand } from 'd3-shape';
import type {
  ScChartConfig,
  ScChartDatum,
  ScChartMargin,
  ScChartStackOffset,
} from './chart-types';

/** A series drawn in the plot, as it registers. */
export interface ScChartSeries {
  readonly key: Signal<string>;
  readonly kind: 'area' | 'bar' | 'line';
  readonly stack: Signal<string | null>;
}

/** What the container gives: the rows and the series' names and colors. */
export interface ScChartSource {
  readonly data: Signal<readonly ScChartDatum[]>;
  readonly config: Signal<ScChartConfig>;
}

/** What the plot gives: the category key, the room around, the stacking. */
export interface ScChartPlotSource {
  readonly categoryKey: Signal<string>;
  readonly margin: Signal<ScChartMargin>;
  readonly stackOffset: Signal<ScChartStackOffset>;
}

/** A value, as a number (`NaN` and the rest as 0). */
export const numberOf = (value: unknown): number =>
  typeof value === 'number' ? value : Number(value) || 0;

const DEFAULT_MARGIN: ScChartMargin = {
  top: 8,
  right: 16,
  bottom: 8,
  left: 16,
};

/**
 * One chart's state, shared by its parts: the rows, the series registered in
 * the plot, the size, and from them the scales and the stacks. Provided by
 * `scChart`; the container and the plot give it their inputs.
 */
@Service({ autoProvided: false })
export class ScChartState {
  readonly source = signal<ScChartSource | null>(null);
  readonly plot = signal<ScChartPlotSource | null>(null);
  readonly series = signal<readonly ScChartSeries[]>([]);

  /** The plot's size, in px (a guess until measured, and on the server). */
  readonly width = signal(320);
  readonly height = signal(200);
  /** Where the plot is in the chart, in px: for the tooltip. */
  readonly offset = signal({ x: 0, y: 0 });
  /** The room the axes take, set by them. */
  readonly xAxisHeight = signal(0);
  /** The value axis' width input, while there is one. */
  readonly yAxis = signal<Signal<number> | null>(null);
  readonly yAxisWidth = computed(() => this.yAxis()?.() ?? 0);

  /** The category pointed at, or reached by the keyboard. */
  readonly activeIndex = signal<number | null>(null);

  readonly data = computed(() => this.source()?.data() ?? []);
  readonly config = computed(() => this.source()?.config() ?? {});
  readonly stackOffset = computed(() => this.plot()?.stackOffset() ?? 'none');

  /** Each category's name, from the plot's `categoryKey`. */
  readonly categories = computed(() => {
    const key = this.plot()?.categoryKey() ?? '';
    return this.data().map((row) => String(row[key] ?? ''));
  });

  /** The plot's drawing area, inside the margin and the axes. */
  readonly area = computed(() => {
    const margin = this.plot()?.margin() ?? DEFAULT_MARGIN;
    const left = margin.left + this.yAxisWidth();
    const top = margin.top;
    const right = Math.max(left, this.width() - margin.right);
    const bottom = Math.max(
      top,
      this.height() - margin.bottom - this.xAxisHeight(),
    );
    return { left, top, right, bottom };
  });

  /** With bars, a band per category; else a point. */
  readonly banded = computed(() =>
    this.series().some((series) => series.kind === 'bar'),
  );

  readonly x = computed<ScaleBand<number> | ScalePoint<number>>(() => {
    const { left, right } = this.area();
    const indices = this.data().map((_, index) => index);
    return this.banded()
      ? scaleBand<number>()
          .domain(indices)
          .range([left, right])
          .paddingInner(0.2)
          .paddingOuter(0.1)
      : scalePoint<number>().domain(indices).range([left, right]);
  });

  /** Each series' [low, high] per row: within its stack, else from 0. */
  readonly extents = computed(() => {
    const rows = this.data() as ScChartDatum[];
    const expand = this.stackOffset() === 'expand';
    const result = new Map<string, (readonly [number, number])[]>();
    const groups = new Map<string, string[]>();
    for (const series of this.series()) {
      const key = series.key();
      const group = series.stack() ?? (expand ? `\u0000${key}` : null);
      if (group === null) {
        result.set(
          key,
          rows.map((row) => [0, numberOf(row[key])] as const),
        );
      } else {
        const keys = groups.get(group) ?? [];
        if (!keys.includes(key)) keys.push(key);
        groups.set(group, keys);
      }
    }
    for (const keys of groups.values()) {
      const layers = stack<ScChartDatum, string>()
        .keys(keys)
        .value((row, key) => numberOf(row[key]))
        .offset(expand ? stackOffsetExpand : stackOffsetDiverging)(rows);
      for (const layer of layers)
        result.set(
          layer.key,
          layer.map((point) => [point[0], point[1]] as const),
        );
    }
    return result;
  });

  readonly y = computed(() => {
    const { top, bottom } = this.area();
    if (this.stackOffset() === 'expand')
      return scaleLinear().domain([0, 1]).range([bottom, top]);
    let low = 0;
    let high = 0;
    for (const extent of this.extents().values())
      for (const [a, b] of extent) {
        low = Math.min(low, a, b);
        high = Math.max(high, a, b);
      }
    if (high === low) high = low + 1;
    return scaleLinear().domain([low, high]).nice().range([bottom, top]);
  });

  /** Within a band, a slot per bar stack (or unstacked bar series). */
  readonly barSlots = computed(() => {
    const slots: string[] = [];
    for (const series of this.series())
      if (series.kind === 'bar') {
        const slot = series.stack() ?? `\u0000${series.key()}`;
        if (!slots.includes(slot)) slots.push(slot);
      }
    return scaleBand<string>()
      .domain(slots)
      .range([0, this.x().bandwidth()])
      .padding(slots.length > 1 ? 0.1 : 0);
  });

  /** The middle of a category, in px. */
  center(index: number): number {
    const x = this.x();
    return (x(index) ?? 0) + x.bandwidth() / 2;
  }

  /** The category nearest a point, in px. */
  indexAt(px: number): number | null {
    let best: number | null = null;
    let distance = Infinity;
    for (let index = 0; index < this.data().length; index++) {
      const d = Math.abs(this.center(index) - px);
      if (d < distance) {
        distance = d;
        best = index;
      }
    }
    return best;
  }

  /** Adds a series; the function returned removes it. */
  register(series: ScChartSeries): () => void {
    this.series.update((all) => [...all, series]);
    return () => this.series.update((all) => all.filter((s) => s !== series));
  }

  /** The series' keys, once each, in the plot's order. */
  readonly keys = computed(() => [
    ...new Set(this.series().map((series) => series.key())),
  ]);
}
