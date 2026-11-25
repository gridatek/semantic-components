import { Directionality } from '@angular/cdk/bidi';
import {
  Directive,
  booleanAttribute,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils';

/** Which way the events run. */
export type ScTimelineOrientation = 'vertical' | 'horizontal';

/** Which side of the line the events are on (vertical): after it, before it, or in turn. */
export type ScTimelineAlignment = 'start' | 'end' | 'alternate';

/** What the timeline knows of an event: set by `scTimelineItem`. */
export interface ScTimelineEntry {
  readonly value: () => string;
  readonly element: HTMLElement;
  readonly current: () => boolean;
}

/**
 * Dated events in order — an activity feed, a changelog, an order's steps:
 * a list for screen readers (a feed with `feed`), one tab stop, the arrow
 * keys between events. Put `scTimelineItem`s inside; name it
 * (`aria-label`).
 */
@Directive({
  selector: '[scTimeline]',
  exportAs: 'scTimeline',
  host: {
    '[attr.role]': 'feed() ? "feed" : "list"',
    '[attr.aria-busy]': 'feed() && busy() ? true : null',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-busy]': 'feed() && busy() ? "" : null',
    '[style.--sc-timeline-count]': 'entries().length',
    '[class]': 'class()',
  },
})
export class ScTimeline {
  private readonly direction = inject(Directionality);
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScTimelineOrientation>('vertical');
  /** Vertical: the events after the line (start), before it (end), or in turn (alternate, the line in the middle). */
  readonly alignment = input<ScTimelineAlignment>('start');
  /** The arrows wrap from the last event to the first. */
  readonly loop = input(true, { transform: booleanAttribute });
  /** A feed of articles that loads more (role feed). */
  readonly feed = input(false, { transform: booleanAttribute });
  /** Loading more (aria-busy): in a feed. */
  readonly busy = input(false, { transform: booleanAttribute });

  /** The events, in the page's order. */
  readonly entries = signal<readonly ScTimelineEntry[]>([]);
  /** The event focused last. */
  private readonly lastFocused = signal<string | null>(null);

  /** The tab stop: the event focused last, else the current one, else the first. */
  readonly tabStop = computed(() => {
    const entries = this.entries();
    const last = this.lastFocused();
    if (last && entries.some((e) => e.value() === last)) return last;
    return (entries.find((e) => e.current()) ?? entries[0])?.value() ?? null;
  });

  private readonly class = computed(() =>
    cn(
      this.orientation() === 'horizontal'
        ? // A row, scrolled across when narrow (room kept for the focus ring).
          '-m-1.5 grid grid-cols-[repeat(var(--sc-timeline-count),minmax(10rem,1fr))] overflow-x-auto p-1.5'
        : // One grid for all events (each a subgrid row): the line stays straight.
          {
            start:
              'grid grid-cols-[auto_calc(var(--sc-timeline-marker)+0.75rem)_minmax(0,1fr)]',
            end: 'grid grid-cols-[minmax(0,1fr)_calc(var(--sc-timeline-marker)+0.75rem)_auto]',
            alternate:
              'grid grid-cols-[minmax(0,1fr)_calc(var(--sc-timeline-marker)+1.5rem)_minmax(0,1fr)]',
          }[this.alignment()],
      '[--sc-timeline-marker:0.75rem]',
      // The title line's height, which the markers line up with.
      this.styles.root,
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTimeline');
  }

  /** Focuses an event by its `value`, or the one holding the tab stop. */
  focus(value?: string): void {
    const target = value ?? this.tabStop();
    this.entries()
      .find((e) => e.value() === target)
      ?.element.focus();
  }

  /** An event: kept in the page's order. */
  ɵadd(entry: ScTimelineEntry): void {
    this.entries.update((entries) =>
      [...entries, entry].sort((a, b) =>
        // 4: b follows a (Node.DOCUMENT_POSITION_FOLLOWING, a browser global).
        a.element.compareDocumentPosition(b.element) & 4 ? -1 : 1,
      ),
    );
  }

  ɵremove(entry: ScTimelineEntry): void {
    this.entries.update((entries) => entries.filter((e) => e !== entry));
  }

  ɵfocused(value: string): void {
    this.lastFocused.set(value);
  }

  /** The keys, on an event: arrows (on the event itself), Home, End; Page Up and Down in a feed. */
  ɵkeydown(event: KeyboardEvent, value: string, onItself: boolean): void {
    const entries = this.entries();
    const index = entries.findIndex((e) => e.value() === value);
    if (index < 0) return;
    const last = entries.length - 1;
    const wrap = (i: number) =>
      this.loop()
        ? (i + entries.length) % entries.length
        : Math.min(Math.max(i, 0), last);
    let next: number | null = null;

    if (this.feed() && (event.key === 'PageDown' || event.key === 'PageUp')) {
      next = Math.min(
        Math.max(index + (event.key === 'PageDown' ? 1 : -1), 0),
        last,
      );
    } else if (onItself) {
      const vertical = this.orientation() === 'vertical';
      const rtl = this.direction.value === 'rtl';
      const forward = vertical ? 'ArrowDown' : rtl ? 'ArrowLeft' : 'ArrowRight';
      const back = vertical ? 'ArrowUp' : rtl ? 'ArrowRight' : 'ArrowLeft';
      if (event.key === forward) next = wrap(index + 1);
      else if (event.key === back) next = wrap(index - 1);
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = last;
    }
    if (next === null) return;
    event.preventDefault();
    entries[next].element.focus();
  }
}
