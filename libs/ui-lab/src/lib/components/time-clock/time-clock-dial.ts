import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScTimeClock } from './time-clock';

interface Mark {
  /** The hour (0–23) or the minute it stands for. */
  readonly value: number;
  readonly label: string;
  /** From the dial's centre, in % of its size. */
  readonly x: number;
  readonly y: number;
  readonly inner: boolean;
  readonly disabled: boolean;
}

const OUTER = 40;
const INNER = 26;

/**
 * The clock's face: a slider (`role="slider"`) — drag or click the hand to
 * an hour, then a minute; or the keyboard: arrows (±1, the minutes by the
 * step), Page Up/Down (±5 minutes), Home/End, Enter (on to the minutes). In
 * 24 hours, 13–00 on an inner ring. The numbers are the locale's; out of
 * `minTime` / `maxTime`, dimmed. Name it (`aria-label`).
 */
@Component({
  selector: 'div[scTimeClockDial]',
  template: `
    @if (angle(); as a) {
      <span
        aria-hidden="true"
        class="bg-primary absolute bottom-1/2 left-1/2 w-0.5 origin-bottom -translate-x-1/2"
        [style.height.%]="a.radius"
        [style.transform]="'rotate(' + a.degrees + 'deg)'"
      ></span>
      <span
        aria-hidden="true"
        class="bg-primary absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        [style.left.%]="50 + a.x"
        [style.top.%]="50 + a.y"
      ></span>
    }
    <span
      aria-hidden="true"
      class="bg-primary absolute top-1/2 left-1/2 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full"
    ></span>
    @for (mark of marks(); track mark.value) {
      <span
        aria-hidden="true"
        data-slot="time-clock-number"
        [attr.data-value]="mark.value"
        [attr.data-selected]="mark.value === selected() || null"
        [attr.data-disabled]="mark.disabled || null"
        [class]="numberClass"
        [class.text-xs]="mark.inner"
        [style.left.%]="50 + mark.x"
        [style.top.%]="50 + mark.y"
      >
        {{ mark.label }}
      </span>
    }
  `,
  host: {
    'data-slot': 'time-clock-dial',
    role: 'slider',
    '[attr.tabindex]': 'clock.disabled() ? -1 : 0',
    '[attr.aria-valuemin]': '0',
    '[attr.aria-valuemax]': 'clock.view() === "hours" ? 23 : 59',
    '[attr.aria-valuenow]': 'selected() ?? 0',
    '[attr.aria-valuetext]': 'clock.text() || null',
    '[attr.aria-disabled]': 'clock.disabled() || null',
    '[attr.data-view]': 'clock.view()',
    '[attr.data-dragging]': 'dragging() || null',
    '[class]': 'class()',
    '(pointerdown)': 'onPointerDown($event)',
    '(pointermove)': 'onPointerMove($event)',
    '(pointerup)': 'onPointerUp($event)',
    '(pointercancel)': 'dragging.set(false)',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimeClockDial {
  protected readonly clock = inject(ScTimeClock);
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly dragging = signal(false);
  /** An hour picked in this drag — only then on to the minutes. */
  private pickedHour = false;

  /** The value on this view: the hour (0–23), or the minute. */
  protected readonly selected = computed(() => {
    const value = this.clock.value();
    if (!value) return null;
    return this.clock.view() === 'hours' ? value.hour : value.minute;
  });

  protected readonly marks = computed<Mark[]>(() => {
    const clock = this.clock;
    const { plain, padded } = clock.number();
    const at = (index: number, radius: number) => {
      const radians = ((index * 30 - 90) * Math.PI) / 180;
      return { x: radius * Math.cos(radians), y: radius * Math.sin(radians) };
    };
    if (clock.view() === 'minutes') {
      return [...Array(12).keys()].map((i) => ({
        value: i * 5,
        label: padded.format(i * 5),
        ...at(i, OUTER),
        inner: false,
        disabled: !clock.canPickMinute(i * 5),
      }));
    }
    if (clock.twelveHours()) {
      const offset = clock.period() === 'pm' ? 12 : 0;
      return [...Array(12).keys()].map((i) => ({
        value: i + offset,
        label: plain.format(i || 12),
        ...at(i, OUTER),
        inner: false,
        disabled: !clock.canPickHour(i + offset),
      }));
    }
    const outer = [...Array(12).keys()].map((i) => ({
      value: i || 12,
      label: plain.format(i || 12),
      ...at(i, OUTER),
      inner: false,
      disabled: !clock.canPickHour(i || 12),
    }));
    const inner = [...Array(12).keys()].map((i) => ({
      value: i ? i + 12 : 0,
      label: padded.format(i ? i + 12 : 0),
      ...at(i, INNER),
      inner: true,
      disabled: !clock.canPickHour(i ? i + 12 : 0),
    }));
    return [...outer, ...inner];
  });

  /** The hand: where it points, and how long it is. */
  protected readonly angle = computed(() => {
    const value = this.clock.value();
    if (!value) return null;
    const hours = this.clock.view() === 'hours';
    const degrees = hours ? (value.hour % 12) * 30 : value.minute * 6;
    const inner =
      hours &&
      !this.clock.twelveHours() &&
      (value.hour === 0 || value.hour > 12);
    const radius = inner ? INNER : OUTER;
    const radians = ((degrees - 90) * Math.PI) / 180;
    return {
      degrees,
      radius,
      x: radius * Math.cos(radians),
      y: radius * Math.sin(radians),
    };
  });

  protected readonly numberClass = cn(
    'pointer-events-none absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-sm tabular-nums',
    'data-selected:text-primary-foreground data-disabled:text-muted-foreground/50',
  );

  protected readonly class = computed(() =>
    cn(
      'bg-muted relative size-56 shrink-0 touch-none rounded-full outline-none select-none',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.classInput(),
    ),
  );

  protected onPointerDown(event: PointerEvent): void {
    if (this.clock.disabled() || event.button !== 0) return;
    event.preventDefault();
    this.host.focus();
    this.host.setPointerCapture?.(event.pointerId);
    this.dragging.set(true);
    this.pickedHour = false;
    this.pick(event);
  }

  protected onPointerMove(event: PointerEvent): void {
    if (this.dragging()) this.pick(event);
  }

  protected onPointerUp(event: PointerEvent): void {
    if (!this.dragging()) return;
    this.dragging.set(false);
    this.pick(event);
    if (this.clock.view() === 'hours' && this.pickedHour)
      this.clock.hourPicked();
  }

  protected onKeydown(event: KeyboardEvent): void {
    if (this.clock.disabled()) return;
    const hours = this.clock.view() === 'hours';
    const step = hours ? 1 : this.clock.stepMinutes();
    const current =
      this.selected() ?? (hours ? this.nowHour() : this.nowMinute());
    let next: number;
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowRight':
        next = current + step;
        break;
      case 'ArrowDown':
      case 'ArrowLeft':
        next = current - step;
        break;
      case 'PageUp':
        next = current + (hours ? 1 : 5);
        break;
      case 'PageDown':
        next = current - (hours ? 1 : 5);
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = hours ? 23 : 60 - step;
        break;
      case 'Enter':
        if (hours) this.clock.hourPicked();
        event.preventDefault();
        return;
      default:
        return;
    }
    event.preventDefault();
    const size = hours ? 24 : 60;
    const value = ((next % size) + size) % size;
    if (hours) this.clock.setHour(value);
    else this.clock.setMinute(value - (value % step));
  }

  /** The pointer's place on the dial, as an hour or a minute. */
  private pick(event: PointerEvent): void {
    const rect = this.host.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    let degrees = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;
    if (this.clock.view() === 'minutes') {
      const step = this.clock.stepMinutes();
      const minute = (Math.round(degrees / 6 / step) * step) % 60;
      if (this.clock.canPickMinute(minute)) this.clock.setMinute(minute);
      return;
    }
    const index = Math.round(degrees / 30) % 12;
    let hour: number;
    if (this.clock.twelveHours()) {
      hour = index + (this.clock.period() === 'pm' ? 12 : 0);
    } else {
      const distance = (Math.hypot(x, y) / rect.width) * 100;
      const inner = distance < (OUTER + INNER) / 2;
      hour = inner ? (index ? index + 12 : 0) : index || 12;
    }
    if (!this.clock.canPickHour(hour)) return;
    this.clock.setHour(hour);
    this.pickedHour = true;
  }

  private nowHour(): number {
    return Temporal.Now.plainTimeISO().hour;
  }

  private nowMinute(): number {
    const minute = Temporal.Now.plainTimeISO().minute;
    return minute - (minute % this.clock.stepMinutes());
  }
}
