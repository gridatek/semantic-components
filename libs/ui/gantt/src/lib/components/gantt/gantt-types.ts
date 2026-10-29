/** What a Gantt column stands for: the lower line of its scale. */
export type ScGanttScaleUnit = 'day' | 'week' | 'month';

/** A bar's new dates, proposed by a drag or the keyboard: `end` inclusive. */
export interface ScGanttDates {
  readonly start: Temporal.PlainDate;
  readonly end: Temporal.PlainDate;
}

/** A bar as the Gantt knows it: for its links and the keyboard. */
export interface ScGanttBarRef {
  readonly id: () => string | undefined;
  readonly dependencies: () => readonly string[];
  readonly milestone: () => boolean;
  /** Its offset and width from the timeline's start, in px (as shown, during a drag too). */
  readonly x: () => number;
  readonly width: () => number;
  readonly element: HTMLElement;
  /** Its row, for the keyboard. */
  readonly row: HTMLElement | null;
  /** Moves (`shift`), or changes its end (`resize`), by days; or its progress by points. */
  step(kind: 'shift' | 'resize' | 'progress', amount: number): void;
}

/** Days from `from` to `to` (negative before it). */
export function daysBetween(
  from: Temporal.PlainDate,
  to: Temporal.PlainDate,
): number {
  return from.until(to, { largestUnit: 'day' }).days;
}
