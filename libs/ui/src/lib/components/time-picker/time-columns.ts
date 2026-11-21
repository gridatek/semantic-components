import { InjectionToken, type Signal } from '@angular/core';
import type {
  ScDateTimeParts,
  ScSegmentedInput,
} from '../segmented-input/segmented-input';
import type { ScTimeInputPart } from '../time-input';

/** A value in a column: an hour, a minute, a second — or AM / PM. */
export type ScTimePickerValue = number | 'am' | 'pm';

/**
 * What the time columns (`scTimePickerColumns`) work with: the Time Picker,
 * or the Date Time Picker — the input whose parts they set, their values,
 * which can be picked.
 */
export interface ScTimeColumnsHost {
  /** The input the columns set: its parts, its names, its clock. */
  readonly segmentedInput: Signal<ScSegmentedInput<unknown>>;
  /** The columns' values, by part. */
  readonly values: Signal<Record<ScTimeInputPart, ScTimePickerValue[]>>;
  /** A value can be picked. */
  enabled(type: ScTimeInputPart, value: ScTimePickerValue): boolean;
  /** A value picked: its part set. */
  pick(type: ScTimeInputPart, value: ScTimePickerValue): void;
  /** Closes the popover. */
  close(): void;
  /** The columns take their box's height (beside a calendar), instead of their own. */
  readonly fillHeight?: boolean;
}

/** The picker the time columns belong to (each one provides itself). */
export const SC_TIME_COLUMNS = new InjectionToken<ScTimeColumnsHost>(
  'SC_TIME_COLUMNS',
);

/** Each column's values: 12 or 24 hours, minutes and seconds on their steps, AM / PM. */
export function scTimeColumnValues(
  twelve: boolean,
  minuteStep: number,
  secondStep: number,
): Record<ScTimeInputPart, ScTimePickerValue[]> {
  const every = (step: number) =>
    Array.from(
      { length: Math.ceil(60 / Math.max(1, step)) },
      (_, i) => i * Math.max(1, step),
    );
  return {
    hour: twelve
      ? [12, ...Array.from({ length: 11 }, (_, i) => i + 1)]
      : Array.from({ length: 24 }, (_, i) => i),
    minute: every(minuteStep),
    second: every(secondStep),
    dayPeriod: ['am', 'pm'],
  };
}

/**
 * A value can be picked: some time with it — and the other parts as they are
 * — falls within `earliest` and `latest` (either may be open).
 */
export function scTimeEnabled(
  type: ScTimeInputPart,
  value: ScTimePickerValue,
  parts: ScDateTimeParts,
  twelve: boolean,
  earliest: Temporal.PlainTime | undefined,
  latest: Temporal.PlainTime | undefined,
): boolean {
  if (!earliest && !latest) return true;
  const periods: ('am' | 'pm' | undefined)[] = !twelve
    ? [undefined]
    : type === 'dayPeriod'
      ? [value as 'am' | 'pm']
      : parts.dayPeriod
        ? [parts.dayPeriod]
        : ['am', 'pm'];
  const to24 = (hour: number, period: 'am' | 'pm' | undefined) =>
    twelve ? (hour % 12) + (period === 'pm' ? 12 : 0) : hour;
  const within = (from: Temporal.PlainTime, to: Temporal.PlainTime) =>
    (!earliest || Temporal.PlainTime.compare(to, earliest) >= 0) &&
    (!latest || Temporal.PlainTime.compare(from, latest) <= 0);
  const time = (hour: number, minute = 0, second = 0) =>
    Temporal.PlainTime.from({ hour, minute, second });
  return periods.some((period) => {
    if (type === 'dayPeriod' && parts.hour === undefined)
      return period === 'am'
        ? within(time(0), time(11, 59, 59))
        : within(time(12), time(23, 59, 59));
    const hour = type === 'hour' ? (value as number) : parts.hour;
    if (hour === undefined) return true;
    const h = to24(hour, period);
    if (type === 'hour' || type === 'dayPeriod')
      return within(time(h), time(h, 59, 59));
    if (type === 'minute')
      return within(time(h, value as number), time(h, value as number, 59));
    if (parts.minute === undefined) return true;
    const exact = time(h, parts.minute, value as number);
    return within(exact, exact);
  });
}
