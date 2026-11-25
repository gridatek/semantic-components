import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  ViewEncapsulation,
  afterNextRender,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  signal,
  untracked,
  viewChild,
} from '@angular/core';
import { cn } from 'cn';

/**
 * More, as the reader nears the end — or, with `direction="start"`, the
 * start (a chat's older messages). Around your list: it scrolls with what
 * scrolls — itself, the box it is in, or the page — and asks again after
 * each load while the end is still near, so the content always fills it.
 * A `role="feed"` gets the feed's keys (WAI-ARIA): Page Down / Page Up move
 * between its `role="article"` items — Page Down on the last asks for more —
 * Ctrl+End / Ctrl+Home leave it after or before.
 */
@Component({
  selector: '[scInfiniteScroll]',
  exportAs: 'scInfiniteScroll',
  template: `
    @if (direction() === 'start') {
      <div
        #sentinel
        data-slot="infinite-scroll-sentinel"
        aria-hidden="true"
        class="h-px w-full shrink-0"
      ></div>
    }
    <ng-content />
    @if (direction() === 'end') {
      <div
        #sentinel
        data-slot="infinite-scroll-sentinel"
        aria-hidden="true"
        class="h-px w-full shrink-0"
      ></div>
    }
  `,
  host: {
    'data-slot': 'infinite-scroll',
    '[attr.aria-busy]': 'loading() || null',
    '[attr.data-loading]': 'loading() || null',
    '[attr.data-done]': 'done() || null',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScInfiniteScroll {
  private readonly host =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  private readonly document = inject(DOCUMENT);

  readonly classInput = input<string>('', { alias: 'class' });
  /** Your load is under way: no more is asked for. */
  readonly loading = input(false, { transform: booleanAttribute });
  /** There is no more. */
  readonly done = input(false, { transform: booleanAttribute });
  /** How near the end (in pixels) asks for more. */
  readonly distance = input(200);
  /** Where more is loaded: after the content, or before it (a chat). */
  readonly direction = input<'end' | 'start'>('end');
  /** Asks by itself as the reader scrolls; off, only loadMore() does (your button). */
  readonly auto = input(true, { transform: booleanAttribute });
  /** Load more: set `loading` while you do. */
  readonly more = output<void>();

  private readonly sentinel =
    viewChild.required<ElementRef<HTMLElement>>('sentinel');
  /** The sentinel is within `distance` of the scroller's edge. */
  private readonly near = signal(false);
  /** The content's size changed: worth a look again. */
  private readonly resized = signal(0);
  /**
   * In the page: rendered before it is (projected into a lazy tab panel, a
   * dialog…), it has no scroller to find yet.
   */
  private readonly connected = signal(false);
  /** With `start`: the distance from the end to keep, as content comes in. */
  private kept: number | null = null;
  private scroller: HTMLElement | null = null;

  private readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    const destroyRef = inject(DestroyRef);
    // The sentinel watched, against what scrolls.
    afterRenderEffect((onCleanup) => {
      if (!this.connected()) return;
      const sentinel = this.sentinel().nativeElement;
      const margin = `${this.distance()}px`;
      untracked(() => {
        this.scroller = scrollParent(this.host);
        const observer = new IntersectionObserver(
          ([entry]) => this.near.set(entry.isIntersecting),
          { root: this.scroller, rootMargin: `${margin} 0px` },
        );
        observer.observe(sentinel);
        onCleanup(() => observer.disconnect());
      });
    });
    // Near the edge, idle, not done: more — again after each load, while
    // near. Once rendered: the place kept first, then measured anew (the
    // observer's word may be from before the content came in).
    afterRenderEffect(() => {
      this.resized();
      const near = this.near();
      const idle = this.auto() && !this.loading() && !this.done();
      untracked(() => {
        this.keepPlace();
        if (near && idle && this.measureNear()) this.loadMore();
      });
    });
    afterNextRender(() => {
      const resize = new ResizeObserver(() => {
        // Shown at last: in the page now.
        if (!this.connected() && this.host.isConnected) this.shown();
        this.keepPlace();
        this.resized.update((n) => n + 1);
      });
      if (this.host.isConnected) this.shown();
      resize.observe(this.host);
      destroyRef.onDestroy(() => resize.disconnect());
    });
  }

  /** In the page: its scroller found — and a chat opens at its end. */
  private shown(): void {
    this.scroller = scrollParent(this.host);
    this.connected.set(true);
    if (this.direction() === 'start') {
      const scroller = this.scrollingElement();
      scroller.scrollTop = scroller.scrollHeight;
    }
  }

  /** Asks for more now (your Load more button): unless loading or done. */
  loadMore(): void {
    if (this.loading() || this.done()) return;
    if (this.direction() === 'start') {
      const scroller = this.scrollingElement();
      this.kept = scroller.scrollHeight - scroller.scrollTop;
    }
    this.more.emit();
  }

  /** The feed's keys: on a `role="feed"`, between its articles. */
  private onKeydown(event: KeyboardEvent): void {
    if (this.host.getAttribute('role') !== 'feed') return;
    const articles = Array.from(
      // An <article> is one without saying so.
      this.host.querySelectorAll<HTMLElement>('article, [role="article"]'),
    );
    const at = articles.findIndex((article) =>
      article.contains(event.target as Node),
    );
    if (event.ctrlKey && (event.key === 'End' || event.key === 'Home')) {
      const out = focusableOutside(this.host, event.key === 'End');
      if (!out) return;
      event.preventDefault();
      out.focus();
      return;
    }
    if (event.ctrlKey || event.altKey || event.metaKey) return;
    if (event.key !== 'PageDown' && event.key !== 'PageUp') return;
    event.preventDefault();
    const next = at + (event.key === 'PageDown' ? 1 : -1);
    if (next >= articles.length) {
      // The last: keyboard readers load more, as scrolling ones do.
      this.loadMore();
      return;
    }
    articles[Math.max(0, next)]?.focus();
  }

  /** Content came in before: the reader stays where they were. */
  private keepPlace(): void {
    if (this.kept === null) return;
    const scroller = this.scrollingElement();
    scroller.scrollTop = scroller.scrollHeight - this.kept;
    if (!this.loading()) this.kept = null;
  }

  /** The sentinel within `distance` of the scroller's edge, now. */
  private measureNear(): boolean {
    const sentinel = this.sentinel().nativeElement.getBoundingClientRect();
    const view = this.scroller?.getBoundingClientRect() ?? {
      top: 0,
      bottom: this.document.documentElement.clientHeight,
    };
    const distance = this.distance();
    return (
      sentinel.bottom >= view.top - distance &&
      sentinel.top <= view.bottom + distance
    );
  }

  private scrollingElement(): HTMLElement {
    return (
      this.scroller ??
      (this.document.scrollingElement as HTMLElement | null) ??
      this.document.documentElement
    );
  }
}

/** The nearest element that scrolls down, from `element` up; none: the page. */
function scrollParent(element: HTMLElement): HTMLElement | null {
  for (
    let node: HTMLElement | null = element;
    node && node !== node.ownerDocument.body;
    node = node.parentElement
  ) {
    if (/auto|scroll|overlay/.test(getComputedStyle(node).overflowY)) {
      return node;
    }
  }
  return null;
}

/** The first focusable element after `feed` (or the last before it). */
function focusableOutside(
  feed: HTMLElement,
  after: boolean,
): HTMLElement | null {
  const all = Array.from(
    feed.ownerDocument.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    ),
  ).filter(
    (element) => !feed.contains(element) && element.offsetParent !== null,
  );
  const position = (element: HTMLElement) =>
    feed.compareDocumentPosition(element);
  return after
    ? (all.find((e) => position(e) & Node.DOCUMENT_POSITION_FOLLOWING) ?? null)
    : ([...all]
        .reverse()
        .find((e) => position(e) & Node.DOCUMENT_POSITION_PRECEDING) ?? null);
}
