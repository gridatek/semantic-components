import {
  Component,
  ElementRef,
  ViewEncapsulation,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimeClockNext } from './time-clock-next';

interface ScTimeClockNextMark {
  /** The hour (0–23), minute or second it stands for. */
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
/** Page Up / Page Down: a bigger step, on its multiples — as the Time Input. */
const BIG_STEP = { hours: 2, minutes: 15, seconds: 15 } as const;

/**
 * The clock's face: a slider (`role="slider"`) — drag or click the hand to
 * an hour, then a minute (then a second); or the keyboard: the arrows (one
 * step), Page Up / Down (hours by 2, minutes and seconds by 15), Home / End,
 * Enter (on to the next view). In 24 hours, 13–00 on an inner ring. The
 * numbers are the locale's; out of `minTime` / `maxTime`, dimmed. Its look is
 * the style's (`timeClock`). Name it (`aria-label`), by view.
 */
@Component({
  selector: 'div[scTimeClockNextDial]',
  template: `
    @if (hand(); as hand) {
      <span
        aria-hidden="true"
        class="bg-primary absolute bottom-1/2 left-1/2 w-0.5 origin-bottom -translate-x-1/2"
        [style.height.%]="hand.radius"
        [style.transform]="'rotate(' + hand.degrees + 'deg)'"
      ></span>
      <span
        aria-hidden="true"
        class="bg-primary absolute size-8 -translate-x-1/2 -translate-y-1/2 rounded-full"
        [style.left.%]="50 + hand.x"
        [style.top.%]="50 + hand.y"
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
        [class]="mark.inner ? innerClass() : numberClass()"
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
    '[attr.aria-readonly]': 'clock.readonly() || null',
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
export class ScTimeClockNextDial {
  private readonly clock = inject(ScTimeClockNext);
  private readonly styles = injectStyle().timeClock;
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly dragging = signal(false);
  /** A value picked in this drag — only then on to the next view. */
  private picked = false;

  /** The value on this view: the hour (0–23), the minute or the second. */
  private readonly selected = computed(() => {
    const value = this.clock.value();
    if (!value) return null;
    const view = this.clock.view();
    return view === 'hours'
      ? value.hour
      : view === 'minutes'
        ? value.minute
        : value.second;
  });

  private readonly marks = computed<ScTimeClockNextMark[]>(() => {
    const clock = this.clock;
    const { plain, padded } = clock.number();
    const at = (index: number, radius: number) => {
      const radians = ((index * 30 - 90) * Math.PI) / 180;
      return { x: radius * Math.cos(radians), y: radius * Math.sin(radians) };
    };
    const view = clock.view();
    if (view !== 'hours') {
      const can = (value: number) =>
        view === 'minutes'
          ? clock.canPickMinute(value)
          : clock.canPickSecond(value);
      return [...Array(12).keys()].map((i) => ({
        value: i * 5,
        label: padded.format(i * 5),
        ...at(i, OUTER),
        inner: false,
        disabled: !can(i * 5),
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
  private readonly hand = computed(() => {
    const value = this.clock.value();
    if (!value) return null;
    const view = this.clock.view();
    const degrees =
      view === 'hours'
        ? (value.hour % 12) * 30
        : (view === 'minutes' ? value.minute : value.second) * 6;
    const inner =
      view === 'hours' &&
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

  // A number not picked has the face's background: the hand passes under it
  // (24 hours: the inner number on its line stays readable); the picked one
  // lets the knob show.
  private readonly baseNumber =
    'pointer-events-none absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full tabular-nums data-selected:text-primary-foreground data-disabled:text-muted-foreground/50 bg-inherit data-selected:bg-transparent';
  private readonly numberClass = computed(() =>
    cn(this.baseNumber, this.styles.number),
  );
  private readonly innerClass = computed(() =>
    cn(this.baseNumber, this.styles.numberInner),
  );

  private readonly class = computed(() =>
    cn(
      'relative shrink-0 touch-none rounded-full outline-none select-none',
      'focus-visible:ring-ring/50 focus-visible:ring-3',
      'aria-disabled:pointer-events-none aria-disabled:opacity-50',
      this.styles.face,
      this.classInput(),
    ),
  );

  private onPointerDown(event: PointerEvent): void {
    if (this.clock.locked() || event.button !== 0) return;
    event.preventDefault();
    this.host.focus();
    this.host.setPointerCapture?.(event.pointerId);
    this.dragging.set(true);
    this.picked = false;
    this.pick(event);
  }

  private onPointerMove(event: PointerEvent): void {
    if (this.dragging()) this.pick(event);
  }

  private onPointerUp(event: PointerEvent): void {
    if (!this.dragging()) return;
    this.dragging.set(false);
    this.pick(event);
    if (this.picked) this.clock.moveOn();
  }

  private onKeydown(event: KeyboardEvent): void {
    if (this.clock.disabled()) return;
    const view = this.clock.view();
    if (event.key === 'Enter') {
      this.clock.moveOn();
      event.preventDefault();
      return;
    }
    if (this.clock.readonly()) return;
    const step = view === 'hours' ? 1 : this.clock.stepOf(view);
    const size = view === 'hours' ? 24 : 60;
    const current = this.selected() ?? this.now(view);
    const big = BIG_STEP[view];
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
        next = Math.floor(current / big) * big + big;
        break;
      case 'PageDown':
        next = Math.ceil(current / big) * big - big;
        break;
      case 'Home':
        next = 0;
        break;
      case 'End':
        next = view === 'hours' ? 23 : 60 - step;
        break;
      default:
        return;
    }
    event.preventDefault();
    const value = ((next % size) + size) % size;
    if (view === 'hours') this.clock.setHour(value);
    else if (view === 'minutes') this.clock.setMinute(value - (value % step));
    else this.clock.setSecond(value - (value % step));
  }

  /** The pointer's place on the dial, as an hour, a minute or a second. */
  private pick(event: PointerEvent): void {
    const rect = this.host.getBoundingClientRect();
    const x = event.clientX - rect.left - rect.width / 2;
    const y = event.clientY - rect.top - rect.height / 2;
    let degrees = (Math.atan2(y, x) * 180) / Math.PI + 90;
    if (degrees < 0) degrees += 360;
    const view = this.clock.view();
    if (view !== 'hours') {
      const step = this.clock.stepOf(view);
      const value = (Math.round(degrees / 6 / step) * step) % 60;
      const can =
        view === 'minutes'
          ? this.clock.canPickMinute(value)
          : this.clock.canPickSecond(value);
      if (!can) return;
      if (view === 'minutes') this.clock.setMinute(value);
      else this.clock.setSecond(value);
      this.picked = true;
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
    this.picked = true;
  }

  /** Where an empty view starts: now (on its step). */
  private now(view: 'hours' | 'minutes' | 'seconds'): number {
    const now = Temporal.Now.plainTimeISO();
    if (view === 'hours') return now.hour;
    const value = view === 'minutes' ? now.minute : now.second;
    return value - (value % this.clock.stepOf(view));
  }
}
