import {
  type CurveFactory,
  curveLinear,
  curveMonotoneX,
  curveMonotoneY,
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

/** A curve along the categories: across them laid out vertically. */
export function curveOf(name: ScChartCurve, vertical: boolean): CurveFactory {
  return vertical && name === 'monotone' ? curveMonotoneY : CURVES[name];
}
