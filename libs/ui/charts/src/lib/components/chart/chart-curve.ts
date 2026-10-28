import {
  type CurveFactory,
  curveLinear,
  curveMonotoneX,
  curveNatural,
  curveStep,
} from 'd3-shape';
import type { ScChartCurve } from './chart-types';

/** d3's curve for each name. */
export const CURVES: Record<ScChartCurve, CurveFactory> = {
  natural: curveNatural,
  linear: curveLinear,
  step: curveStep,
  monotone: curveMonotoneX,
};
