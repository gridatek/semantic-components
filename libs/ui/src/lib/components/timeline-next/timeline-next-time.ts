import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  LOCALE_ID,
  Renderer2,
  computed,
  effect,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimelineNextItem } from './timeline-next-item';

/** A moment the time can write. */
export type ScTimelineNextMoment =
  | Temporal.PlainDate
  | Temporal.PlainDateTime
  | Temporal.ZonedDateTime
  | Temporal.Instant;

/**
 * When the event was: your `<time>`. Give it a Temporal `[value]` and it
 * writes the date in the app's language (`options`: Intl.DateTimeFormat's)
 * and sets `datetime`; or write your own words ("Today, 2:32 PM") with a
 * `datetime`. It describes the event.
 */
@Directive({
  selector: 'time[scTimelineNextTime]',
  host: {
    '[id]': 'id()',
    '[attr.datetime]': 'datetime()',
    '[class]': 'class()',
  },
})
export class ScTimelineNextTime {
  private readonly styles = injectStyle().timeline;
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-timeline-time-'));
  /** The moment, written for you: a date as a date, a moment with its time. */
  readonly value = input<ScTimelineNextMoment>();
  /** How it is written (Intl.DateTimeFormat options). */
  readonly options = input<Intl.DateTimeFormatOptions>();
  /** Yours, beside your own words: machine-readable. */
  readonly datetimeInput = input<string | undefined>(undefined, {
    alias: 'datetime',
  });

  private readonly text = computed(() => {
    const value = this.value();
    if (!value) return null;
    const dateOnly = value instanceof Temporal.PlainDate;
    return value.toLocaleString(
      this.locale,
      this.options() ??
        (dateOnly
          ? { dateStyle: 'medium' }
          : { dateStyle: 'medium', timeStyle: 'short' }),
    );
  });

  /** A valid `datetime`: a zoned moment as its instant; else yours. */
  private readonly datetime = computed(() => {
    const value = this.value();
    if (!value) return this.datetimeInput() ?? null;
    return value instanceof Temporal.ZonedDateTime
      ? value.toInstant().toString()
      : value.toString();
  });

  private readonly class = computed(() =>
    cn('block', this.styles.time, this.classInput()),
  );

  constructor() {
    const item = inject(ScTimelineNextItem);
    const id = () => this.id();
    item.ɵdescriptions.update((ids) => [...ids, id]);
    inject(DestroyRef).onDestroy(() =>
      item.ɵdescriptions.update((ids) => ids.filter((each) => each !== id)),
    );

    // Written only from a value: without one, your words stay.
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const renderer = inject(Renderer2);
    effect(() => {
      const text = this.text();
      if (text !== null) renderer.setProperty(element, 'textContent', text);
    });
  }
}
