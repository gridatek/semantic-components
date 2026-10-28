import {
  type CurveFactory,
  curveLinear,
  curveMonotoneX,
  curveNatural,
  curveStep,
} from 'd3-shape';
import type { ScChartNextCurve } from './chart-next-types';

/** d3's curve for each name. */
export const CURVES: Record<ScChartNextCurve, CurveFactory> = {
  natural: curveNatural,
  linear: curveLinear,
  step: curveStep,
  monotone: curveMonotoneX,
};
