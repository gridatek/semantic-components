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
import { ɵwarnIfUnnamed } from '../../utils';

/** Which way the events run. */
export type ScTimelineNextOrientation = 'vertical' | 'horizontal';

/** What the timeline knows of an event: set by `scTimelineNextItem`. */
export interface ScTimelineNextEntry {
  readonly value: () => string;
  readonly element: HTMLElement;
  readonly current: () => boolean;
}

/**
 * Dated events in order — an activity feed, a changelog, an order's steps:
 * a list for screen readers (a feed with `feed`), one tab stop, the arrow
 * keys between events. Put `scTimelineNextItem`s inside; name it
 * (`aria-label`).
 */
@Directive({
  selector: '[scTimelineNext]',
  exportAs: 'scTimelineNext',
  host: {
    '[attr.role]': 'feed() ? "feed" : "list"',
    '[attr.aria-busy]': 'feed() && busy() ? true : null',
    '[attr.data-orientation]': 'orientation()',
    '[attr.data-busy]': 'feed() && busy() ? "" : null',
    '[style.--sc-timeline-count]': 'entries().length',
    '[class]': 'class()',
  },
})
export class ScTimelineNext {
  private readonly direction = inject(Directionality);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly orientation = input<ScTimelineNextOrientation>('vertical');
  /** The arrows wrap from the last event to the first. */
  readonly loop = input(true, { transform: booleanAttribute });
  /** A feed of articles that loads more (role feed). */
  readonly feed = input(false, { transform: booleanAttribute });
  /** Loading more (aria-busy): in a feed. */
  readonly busy = input(false, { transform: booleanAttribute });

  /** The events, in the page's order. */
  readonly entries = signal<readonly ScTimelineNextEntry[]>([]);
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
        ? 'grid grid-cols-[repeat(var(--sc-timeline-count),minmax(0,1fr))]'
        : 'flex flex-col',
      '[--sc-timeline-marker:0.75rem]',
      this.classInput(),
    ),
  );

  constructor() {
    ɵwarnIfUnnamed('scTimelineNext');
  }

  /** Focuses an event by its `value`, or the one holding the tab stop. */
  focus(value?: string): void {
    const target = value ?? this.tabStop();
    this.entries()
      .find((e) => e.value() === target)
      ?.element.focus();
  }

  /** An event: kept in the page's order. */
  ɵadd(entry: ScTimelineNextEntry): void {
    this.entries.update((entries) =>
      [...entries, entry].sort((a, b) =>
        // 4: b follows a (Node.DOCUMENT_POSITION_FOLLOWING, a browser global).
        a.element.compareDocumentPosition(b.element) & 4 ? -1 : 1,
      ),
    );
  }

  ɵremove(entry: ScTimelineNextEntry): void {
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
