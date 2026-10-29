import {
  DestroyRef,
  Directive,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  numberAttribute,
  untracked,
} from '@angular/core';
import { cn } from '../../utils';
import {
  type ScMessageScrollerPosition,
  type ScMessageScrollerScrollOptions,
  ScMessageScrollerState,
} from './message-scroller-state';

/**
 * A conversation that scrolls itself: it opens at the end, holds a new turn
 * near the top while its reply arrives (`scrollAnchor`), follows the end with
 * `autoScroll` until the reader scrolls away, keeps its place when older
 * messages load above. Fills its parent: give that a height.
 *
 * Its commands and state, through `#scroller="scMessageScroller"`.
 */
@Directive({
  selector: 'div[scMessageScroller]',
  exportAs: 'scMessageScroller',
  providers: [ScMessageScrollerState],
  host: {
    'data-slot': 'message-scroller',
    '[attr.data-scrollable]': 'scrollableAttr()',
    '[attr.data-autoscrolling]': 'state.autoscrolling() ? "" : null',
    '[attr.data-pending-scroll]': 'state.pendingDefaultScroll() ? "" : null',
    '[class]': 'class()',
  },
})
export class ScMessageScroller {
  protected readonly state = inject(ScMessageScrollerState);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Follow the end as messages arrive, until the reader scrolls away. */
  readonly autoScroll = input(false, { transform: booleanAttribute });
  /** Where it opens: `end`, `start`, or the last anchored turn. */
  readonly defaultScrollPosition = input<ScMessageScrollerPosition>('end');
  /** How far from an edge still counts as at it, in px. */
  readonly scrollEdgeThreshold = input(8, { transform: numberAttribute });
  /** How much of the previous message stays visible above a new turn, in px. */
  readonly scrollPreviousItemPeek = input(64, { transform: numberAttribute });
  /** Room above a message scrolled to, in px. */
  readonly scrollMargin = input(0, { transform: numberAttribute });

  /** The edges it can still scroll toward — at the end means `!end`. */
  readonly scrollable = this.state.scrollable.asReadonly();
  /** The messages on screen, and the turn being read. */
  readonly visibility = this.state.visibility.asReadonly();

  protected readonly scrollableAttr = computed(() => {
    const { start, end } = this.scrollable();
    return [start && 'start', end && 'end'].filter(Boolean).join(' ') || null;
  });

  protected readonly class = computed(() =>
    cn(
      'group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden',
      this.classInput(),
    ),
  );

  constructor() {
    this.state.connect({
      autoScroll: this.autoScroll,
      defaultScrollPosition: this.defaultScrollPosition,
      scrollEdgeThreshold: this.scrollEdgeThreshold,
      scrollPreviousItemPeek: this.scrollPreviousItemPeek,
      scrollMargin: this.scrollMargin,
    });
    let first = true;
    effect(() => {
      this.autoScroll();
      if (first) first = false;
      else untracked(() => this.state.autoScrollChanged());
    });
    inject(DestroyRef).onDestroy(() => this.state.destroy());
  }

  /** To the end — following again, with `autoScroll`. */
  scrollToEnd(options?: { behavior?: ScrollBehavior }): boolean {
    return this.state.scrollToEnd(options);
  }

  scrollToStart(options?: { behavior?: ScrollBehavior }): boolean {
    return this.state.scrollToStart(options);
  }

  /** To a message by its `messageId` (once it renders, if not yet). */
  scrollToMessage(
    messageId: string,
    options?: ScMessageScrollerScrollOptions,
  ): boolean {
    return this.state.scrollToMessage(messageId, options);
  }
}
