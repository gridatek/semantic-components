import { Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  ElementRef,
  afterRenderEffect,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScScheduler } from './scheduler';
import { SC_SCHEDULER_EVENT } from './scheduler-types';

/**
 * An event's root, in your template: your `button` (or link) and its click.
 * A line in a month's week (a bar when it is all day or over days), a bar in
 * the all-day row, a block in the time grid, a row in the agenda.
 *
 * Its colour: `--sc-scheduler-event` (`class="[--sc-scheduler-event:var(--color-emerald-600)]"`),
 * the primary by default.
 *
 * `editable`: Alt with ↑ ↓ moves it by `slotMinutes` (in the time grid; by a
 * week in the month), Alt with ← → by a day (mirrored right to left), Alt +
 * Shift with ↑ ↓ makes it end sooner or later; the keyboard stays on it.
 */
@Directive({
  selector: 'button[scSchedulerEvent], a[scSchedulerEvent]',
  host: {
    '[attr.data-event-id]': 'context.event.id',
    '[attr.data-all-day]': 'context.event.allDay ? "" : null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScSchedulerEvent {
  private readonly context = inject(SC_SCHEDULER_EVENT);
  private readonly scheduler = inject(ScScheduler);
  private readonly direction = inject(Directionality).valueSignal;
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().scheduler;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly dragged = computed(
    () => this.scheduler.preview()?.id === this.context.event.id,
  );

  private readonly class = computed(() => {
    const { place, continuesBefore, continuesAfter } = this.context;
    const editable = this.scheduler.editable();
    return cn(
      'flex w-full min-w-0 text-start text-xs outline-none transition-colors motion-reduce:transition-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      // Its colour (--sc-scheduler-event, the primary by default) mixed into
      // the background: opaque, so a bar hides the day lines under it.
      'text-foreground bg-[color-mix(in_oklab,var(--sc-scheduler-event,var(--primary))_12%,var(--background))] hover:bg-[color-mix(in_oklab,var(--sc-scheduler-event,var(--primary))_18%,var(--background))]',
      this.styles.event,
      place === 'time'
        ? cn(
            // A block: title and time on a line while they fit, then wrapped.
            'relative size-full flex-wrap content-start gap-x-1 overflow-hidden border-s-2 border-[var(--sc-scheduler-event,var(--primary))] px-1.5 py-0.5',
            // Its bottom edge: dragged to end sooner or later.
            editable &&
              "after:absolute after:inset-x-0 after:bottom-0 after:h-1.5 after:cursor-ns-resize after:content-['']",
          )
        : place === 'agenda'
          ? 'items-center gap-2 px-2 py-1.5 text-sm'
          : 'items-center gap-1 px-1.5 py-0.5',
      continuesBefore && 'rounded-s-none',
      continuesAfter && 'rounded-e-none',
      this.dragged() &&
        'bg-[color-mix(in_oklab,var(--sc-scheduler-event,var(--primary))_25%,var(--background))] shadow-md',
      '*:max-w-full *:truncate',
      this.classInput(),
    );
  });

  constructor() {
    // Moved by the keys, it may be drawn anew: the keyboard comes back to it.
    afterRenderEffect(() => {
      if (this.scheduler.refocus() !== this.context.event.id) return;
      this.scheduler.refocus.set(null);
      this.element.focus();
    });
  }

  private onKeydown(keydown: Event): void {
    const event = keydown as KeyboardEvent;
    if (!this.scheduler.editable() || !event.altKey) return;
    const { place } = this.context;
    const rtl = this.direction() === 'rtl';
    const slot = this.scheduler.slotMinutes();
    let move: Temporal.DurationLike | null = null;
    let resize: Temporal.DurationLike | null = null;
    switch (event.key) {
      case 'ArrowLeft':
        move = { days: rtl ? 1 : -1 };
        break;
      case 'ArrowRight':
        move = { days: rtl ? -1 : 1 };
        break;
      case 'ArrowUp':
      case 'ArrowDown': {
        const sign = event.key === 'ArrowUp' ? -1 : 1;
        if (place === 'time') {
          if (event.shiftKey) resize = { minutes: sign * slot };
          else move = { minutes: sign * slot };
        } else if (place === 'month') {
          move = { days: sign * 7 };
        }
        break;
      }
    }
    if (!move && !resize) return;
    event.preventDefault();
    const { id, start, end } = this.context.event;
    if (move) {
      this.scheduler.change(id, start.add(move), end.add(move), true);
    } else if (resize) {
      const later = end.add(resize);
      // At least one step long.
      if (
        Temporal.ZonedDateTime.compare(later, start.add({ minutes: slot })) < 0
      ) {
        return;
      }
      this.scheduler.change(id, start, later, true);
    }
  }
}
