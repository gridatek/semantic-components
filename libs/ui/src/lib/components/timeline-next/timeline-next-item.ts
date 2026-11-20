import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimelineNext } from './timeline-next';

/** Where an event is in a process: done, now, to come — or failed. */
export type ScTimelineNextStatus =
  'complete' | 'current' | 'upcoming' | 'failed';

/**
 * An event: a list item (an article in a feed), one tab stop for all of
 * them. Named by its title, described by its time and description. Put its
 * marker, connector, title, time and description inside, as you need.
 */
@Directive({
  selector: '[scTimelineNextItem]',
  host: {
    '[attr.role]': 'timeline.feed() ? "article" : "listitem"',
    '[attr.tabindex]': 'timeline.tabStop() === value() ? 0 : -1',
    '[attr.aria-current]': 'status() === "current" ? "step" : null',
    '[attr.aria-labelledby]': 'titleId()',
    '[attr.aria-describedby]': 'describedBy()',
    '[attr.aria-posinset]': 'timeline.feed() ? index() + 1 : null',
    '[attr.aria-setsize]': 'timeline.feed() ? timeline.entries().length : null',
    '[attr.data-complete]': 'status() === "complete" ? "" : null',
    '[attr.data-current]': 'status() === "current" ? "" : null',
    '[attr.data-upcoming]': 'status() === "upcoming" ? "" : null',
    '[attr.data-failed]': 'status() === "failed" ? "" : null',
    '[attr.data-side]': 'vertical() ? side() : null',
    '[attr.data-orientation]': 'timeline.orientation()',
    '[attr.data-first]': 'index() === 0 ? "" : null',
    '[attr.data-last]': 'isLast() ? "" : null',
    '[style.--sc-timeline-index]': 'index()',
    '[class]': 'class()',
    '(focus)': 'onFocus()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScTimelineNextItem {
  readonly timeline = inject(ScTimelineNext);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly styles = injectStyle().timeline;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Names the event for `focus(value)`. */
  readonly value = input(inject(_IdGenerator).getId('sc-timeline-item-'));
  /** Where it is in a process; none for a plain event. */
  readonly status = input<ScTimelineNextStatus | undefined>(undefined);

  /** Its title's id: set by `scTimelineNextTitle`. */
  readonly ɵtitle = signal<(() => string) | null>(null);
  /** Its time's and description's ids. */
  readonly ɵdescriptions = signal<readonly (() => string)[]>([]);

  private readonly index = computed(() =>
    this.timeline.entries().findIndex((e) => e.element === this.element),
  );
  readonly isLast = computed(
    () => this.index() === this.timeline.entries().length - 1,
  );
  readonly vertical = computed(
    () => this.timeline.orientation() === 'vertical',
  );
  /** Vertical: its content after the line, or before it (end, and every other one in alternate). */
  readonly side = computed<'after' | 'before'>(() => {
    const alignment = this.timeline.alignment();
    if (alignment === 'end') return 'before';
    if (alignment === 'alternate' && this.index() % 2 === 1) return 'before';
    return 'after';
  });

  private readonly titleId = computed(() => this.ɵtitle()?.() ?? null);
  private readonly describedBy = computed(
    () =>
      this.ɵdescriptions()
        .map((id) => id())
        .join(' ') || null,
  );

  private readonly class = computed(() =>
    cn(
      // The style's ring, clear of the marker on its edge.
      'ring-offset-background relative outline-none focus-visible:ring-offset-2',
      this.styles.item,
      this.vertical()
        ? cn(
            // A row of the timeline's grid; its content on its side of the line.
            'col-span-full grid grid-cols-subgrid content-start',
            this.side() === 'after'
              ? '*:col-start-3'
              : 'text-end *:col-start-1',
          )
        : // Room above for the marker; the opposite first.
          'flex flex-col pe-4 pt-[calc(var(--sc-timeline-marker)+0.75rem)]',
      this.vertical() && !this.isLast() && this.styles.gap,
      this.classInput(),
    ),
  );

  constructor() {
    const entry = {
      value: () => this.value(),
      element: this.element,
      current: () => this.status() === 'current',
    };
    this.timeline.ɵadd(entry);
    inject(DestroyRef).onDestroy(() => this.timeline.ɵremove(entry));
  }

  private onFocus(): void {
    this.timeline.ɵfocused(this.value());
  }

  private onKeydown(event: KeyboardEvent): void {
    this.timeline.ɵkeydown(event, this.value(), event.target === this.element);
  }
}
