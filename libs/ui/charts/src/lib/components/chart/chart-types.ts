// Chart colors from CSS variables
export const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
] as const;

export interface ScChartDataPoint {
  label: string;
  value: number;
  color?: string;
}

export interface ScChartConfig {
  [key: string]: {
    label: string;
    color?: string;
  };
}
