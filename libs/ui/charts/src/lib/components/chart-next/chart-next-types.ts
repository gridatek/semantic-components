/** A row of the data: its category (`month: 'January'`) and one value per series. */
export type ScChartNextDatum = Readonly<Record<string, unknown>>;

/** Each series, by its key in the data: its name and its color (`--color-<key>`). */
export type ScChartNextConfig = Readonly<
  Record<string, { readonly label?: string; readonly color?: string }>
>;

/** How a line or an area's edge goes from point to point. */
export type ScChartNextCurve = 'natural' | 'linear' | 'step' | 'monotone';

/** Stacks as they are (`none`), or each category to 100% (`expand`). */
export type ScChartNextStackOffset = 'none' | 'expand';

/** Room around the plot, in px. */
export interface ScChartNextMargin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/** A tooltip's mark beside each value. */
export type ScChartNextIndicator = 'dot' | 'line' | 'dashed';
