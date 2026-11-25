/**
 * A value axis's ticks, as Recharts makes them (its `getNiceTickValues`): a
 * step rounded to a nice number, 0 among the ticks when the values cross it,
 * and exactly `count` ticks. The first and last are the axis's domain.
 */
export function scChartNiceTicks(
  min: number,
  max: number,
  count = 5,
): number[] {
  const n = Math.max(count, 2);
  const [low, high] = min <= max ? [min, max] : [max, min];
  if (low === high) return singleValueTicks(low, n);
  const { step, tickMin } = calculateStep(low, high, n, 0);
  return Array.from({ length: n }, (_, i) => round(tickMin + i * step));
}

/** Floating point tidied: 0.30000000000000004 → 0.3. */
function round(value: number): number {
  return Number(value.toPrecision(12));
}

function digitCount(value: number): number {
  return value === 0 ? 1 : Math.floor(Math.log10(Math.abs(value))) + 1;
}

/** A rough step made nice: 76.25 → 80. */
function formatStep(rough: number, correction: number): number {
  if (rough <= 0) return 0;
  const digits = digitCount(rough);
  const unit = 10 ** digits;
  const ratioScale = digits !== 1 ? 0.05 : 0.1;
  const ratio =
    (Math.ceil(round(rough / unit / ratioScale)) + correction) * ratioScale;
  return round(ratio * unit);
}

function calculateStep(
  min: number,
  max: number,
  count: number,
  correction: number,
): { step: number; tickMin: number } {
  const step = formatStep((max - min) / (count - 1), correction);
  if (step === 0) return { step: 0, tickMin: min };
  // 0 among the ticks when the values cross it; else the middle, on a step.
  let middle = 0;
  if (!(min <= 0 && max >= 0)) {
    middle = (min + max) / 2;
    middle = round(middle - (middle % step));
  }
  let below = Math.ceil(round((middle - min) / step));
  const up = Math.ceil(round((max - middle) / step));
  const used = below + up + 1;
  // Too many: a bigger step.
  if (used > count) return calculateStep(min, max, count, correction + 1);
  // Too few: the rest above the values (below them when all are negative).
  if (used < count && max <= 0) below += count - used;
  return { step, tickMin: round(middle - below * step) };
}

/** One value: ticks a step around it. */
function singleValueTicks(value: number, count: number): number[] {
  let step = 1;
  let middle = value;
  if (value !== 0) {
    const abs = Math.abs(value);
    const digits = digitCount(abs) - 1;
    step = 10 ** digits;
    middle = round(Math.floor(value / step) * step);
  }
  const start = round(middle - Math.floor((count - 1) / 2) * step);
  return Array.from({ length: count }, (_, i) => round(start + i * step));
}
