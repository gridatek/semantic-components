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
import { cn } from '@semantic-components/ui';

/**
 * More, as the reader nears the end — or, with `direction="start"`, the
 * start (a chat's older messages). Around your list: it scrolls with what
 * scrolls — itself, the box it is in, or the page — and asks again after
 * each load while the end is still near, so the content always fills it.
 */
@Component({
  selector: '[scInfiniteScrollNext]',
  exportAs: 'scInfiniteScrollNext',
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
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScInfiniteScrollNext {
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
  /** Asks by itself as the reader scrolls; off, only the More button does. */
  readonly auto = input(true, { transform: booleanAttribute });
  /** Load more: set `loading` while you do. */
  readonly more = output<void>();

  private readonly sentinel =
    viewChild.required<ElementRef<HTMLElement>>('sentinel');
  /** The sentinel is within `distance` of the scroller's edge. */
  private readonly near = signal(false);
  /** The content's size changed: worth a look again. */
  private readonly resized = signal(0);
  /** With `start`: the distance from the end to keep, as content comes in. */
  private kept: number | null = null;
  private scroller: HTMLElement | null = null;

  protected readonly class = computed(() => cn('block', this.classInput()));

  constructor() {
    const destroyRef = inject(DestroyRef);
    // The sentinel watched, against what scrolls.
    afterRenderEffect((onCleanup) => {
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
        this.keepPlace();
        this.resized.update((n) => n + 1);
      });
      resize.observe(this.host);
      destroyRef.onDestroy(() => resize.disconnect());
      // A chat opens at its end.
      if (this.direction() === 'start') {
        const scroller = this.scrollingElement();
        scroller.scrollTop = scroller.scrollHeight;
      }
    });
  }

  /** Asks for more now (the More button): unless loading or done. */
  loadMore(): void {
    if (this.loading() || this.done()) return;
    if (this.direction() === 'start') {
      const scroller = this.scrollingElement();
      this.kept = scroller.scrollHeight - scroller.scrollTop;
    }
    this.more.emit();
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
