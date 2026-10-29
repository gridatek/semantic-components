import { InjectionToken } from '@angular/core';

/** Where a label goes: beyond its value, inside its shape, at its base. */
export type ScChartLabelPosition = 'outside' | 'inside' | 'start';

/** A label's place, in the series' own coordinates. */
export interface ScChartLabelPoint {
  index: number;
  value: number;
  x: number;
  y: number;
  anchor: 'start' | 'middle' | 'end';
  baseline: 'auto' | 'middle' | 'hanging';
}

/** What a series tells its labels (`scChartLabels`, inside it). */
export interface ScChartSeriesLabels {
  labelPoints(
    position: ScChartLabelPosition,
    offset: number,
  ): readonly ScChartLabelPoint[];
}

/** The series a label list is in. */
export const SC_CHART_SERIES = new InjectionToken<ScChartSeriesLabels>(
  'SC_CHART_SERIES',
);

/** A text's anchor beside a point at an angle (0 at the top, clockwise). */
export function anchorAt(angle: number): ScChartLabelPoint['anchor'] {
  const side = Math.sin(angle);
  return Math.abs(side) < 0.1 ? 'middle' : side > 0 ? 'start' : 'end';
}
