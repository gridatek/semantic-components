/** A span: when it started, how long it lasted (ms, on a shared clock), what it started. */
export interface ScWaterfallItem {
  /** Unique. */
  readonly value: string;
  /** Its name: the row's text, what typing finds it by. */
  readonly label: string;
  readonly start: number;
  readonly duration: number;
  readonly children?: readonly ScWaterfallItem[];
}

/** A span as a row: where it sits in the tree. */
export interface ScWaterfallRowData {
  readonly item: ScWaterfallItem;
  /** Its parent's value; null at the top. */
  readonly parent: string | null;
  /** Its depth, from 1. */
  readonly level: number;
  /** Its place among its siblings, from 1, and how many they are. */
  readonly position: number;
  readonly siblings: number;
  /** It started others. */
  readonly branch: boolean;
}

/** Every span, depth first, as rows. */
export function scWaterfallRows(
  items: readonly ScWaterfallItem[],
): ScWaterfallRowData[] {
  const rows: ScWaterfallRowData[] = [];
  const walk = (
    list: readonly ScWaterfallItem[],
    parent: string | null,
    level: number,
  ) => {
    list.forEach((item, i) => {
      rows.push({
        item,
        parent,
        level,
        position: i + 1,
        siblings: list.length,
        branch: !!item.children?.length,
      });
      if (item.children?.length) walk(item.children, item.value, level + 1);
    });
  };
  walk(items, null, 1);
  return rows;
}

/** Round times across a range: 1, 2 or 5 × a power of ten apart, at most `max`. */
export function scWaterfallTicks(
  [from, to]: readonly [number, number],
  max: number,
): number[] {
  const span = to - from;
  if (!(span > 0) || max < 1) return [];
  const rough = span / max;
  const power = 10 ** Math.floor(Math.log10(rough));
  const step =
    [1, 2, 5, 10].map((m) => m * power).find((s) => span / s <= max) ??
    10 * power;
  const ticks: number[] = [];
  for (let t = Math.ceil(from / step) * step; t <= to + 1e-9; t += step)
    ticks.push(Math.round(t * 1e6) / 1e6);
  return ticks;
}
