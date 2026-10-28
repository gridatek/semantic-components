/** A row of the data: its category (`month: 'January'`) and one value per series. */
export type ScChartDatum = Readonly<Record<string, unknown>>;

/** Each series, by its key in the data: its name and its color (`--color-<key>`). */
export type ScChartConfig = Readonly<
  Record<string, { readonly label?: string; readonly color?: string }>
>;

/** How a line or an area's edge goes from point to point. */
export type ScChartCurve = 'natural' | 'linear' | 'step' | 'monotone';

/** Stacks as they are (`none`), or each category to 100% (`expand`). */
export type ScChartStackOffset = 'none' | 'expand';

/** Room around the plot, in px. */
export interface ScChartMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** A tooltip's mark beside each value. */
export type ScChartIndicator = 'dot' | 'line' | 'dashed';
