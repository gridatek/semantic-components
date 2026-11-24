import { signal } from '@angular/core';
import type { ScScheduler } from './scheduler';

/** The day (`data-day`) under a point: a month's cell or an all-day column. */
function dayAt(x: number, y: number): Temporal.PlainDate | null {
  for (const element of document.elementsFromPoint(x, y)) {
    const day = (element as HTMLElement).dataset?.['day'];
    if (day) return Temporal.PlainDate.from(day);
  }
  return null;
}

/**
 * The pointer on a row of days (a month, the all-day row): a drag over empty
 * days picks them (`pickable`), a drag of an event moves it by whole days
 * (`editable`), a click on an empty day picks it. Mouse and pen; a touch
 * scrolls, and a tap stays a click. Elements carry their day in `data-day`,
 * events their id in `data-event-id`.
 */
export class ScSchedulerDayPointer {
  /** The days being picked, from the first to the last. */
  readonly range = signal<{
    from: Temporal.PlainDate;
    to: Temporal.PlainDate;
  } | null>(null);

  private drag: {
    mode: 'move' | 'pick';
    id?: string;
    origin: Temporal.PlainDate;
    x: number;
    y: number;
    started: boolean;
  } | null = null;
  /** A drag just ended: the click it makes isn't one. */
  private swallowClick = false;

  constructor(
    private readonly scheduler: ScScheduler,
    host: HTMLElement,
  ) {
    host.addEventListener(
      'click',
      (event) => {
        if (!this.swallowClick) return;
        this.swallowClick = false;
        event.preventDefault();
        event.stopPropagation();
      },
      true,
    );
  }

  down(event: PointerEvent): void {
    if (event.button !== 0 || event.pointerType === 'touch') return;
    const target = event.target as HTMLElement;
    const origin = dayAt(event.clientX, event.clientY);
    if (!origin) return;
    const eventElement = target.closest<HTMLElement>('[data-event-id]');
    if (eventElement) {
      if (!this.scheduler.editable()) return;
      this.drag = {
        mode: 'move',
        id: eventElement.dataset['eventId'],
        origin,
        x: event.clientX,
        y: event.clientY,
        started: false,
      };
    } else {
      if (
        !this.scheduler.pickable() ||
        target.closest('button, a, input, select, textarea')
      ) {
        return;
      }
      this.drag = {
        mode: 'pick',
        origin,
        x: event.clientX,
        y: event.clientY,
        started: false,
      };
    }
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  move(event: PointerEvent): void {
    const drag = this.drag;
    if (!drag) return;
    if (
      !drag.started &&
      Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 4
    ) {
      return;
    }
    drag.started = true;
    const day = dayAt(event.clientX, event.clientY) ?? drag.origin;
    if (drag.mode === 'pick') {
      const forward = Temporal.PlainDate.compare(day, drag.origin) >= 0;
      this.range.set(
        forward
          ? { from: drag.origin, to: day }
          : { from: day, to: drag.origin },
      );
      return;
    }
    const original = this.scheduler.events().find((e) => e.id === drag.id);
    if (!original) return;
    const days = drag.origin.until(day).days;
    this.scheduler.preview.set({
      id: original.id,
      start: original.start.add({ days }),
      end: original.end.add({ days }),
    });
  }

  up(): void {
    const drag = this.drag;
    this.drag = null;
    if (!drag) return;
    if (drag.mode === 'move') {
      const preview = this.scheduler.preview();
      if (!drag.started || !preview) return;
      this.swallowClick = true;
      this.scheduler.change(preview.id, preview.start, preview.end);
      return;
    }
    const range = this.range() ?? { from: drag.origin, to: drag.origin };
    this.range.set(null);
    const timeZone = this.scheduler.timeZone();
    this.scheduler.pick({
      start: range.from.toZonedDateTime(timeZone),
      end: range.to.add({ days: 1 }).toZonedDateTime(timeZone),
      allDay: true,
    });
  }

  /** Escape, or the pointer lost: nothing moved, nothing picked. */
  cancel(): void {
    this.drag = null;
    this.range.set(null);
    this.scheduler.preview.set(null);
  }

  /** Whether `day` is being picked. */
  picking(day: Temporal.PlainDate): boolean {
    const range = this.range();
    return (
      !!range &&
      Temporal.PlainDate.compare(day, range.from) >= 0 &&
      Temporal.PlainDate.compare(day, range.to) <= 0
    );
  }
}
