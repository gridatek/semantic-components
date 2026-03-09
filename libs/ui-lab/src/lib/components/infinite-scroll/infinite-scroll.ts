import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  contentChild,
  inject,
  input,
  output,
} from '@angular/core';
import { ScInfiniteScrollSentinel } from './infinite-scroll-sentinel';

export const SC_INFINITE_SCROLL = new InjectionToken<ScInfiniteScroll>(
  'SC_INFINITE_SCROLL',
);

@Directive({
  selector: 'div[scInfiniteScroll]',
  exportAs: 'scInfiniteScroll',
  providers: [{ provide: SC_INFINITE_SCROLL, useExisting: ScInfiniteScroll }],
  host: {
    'data-slot': 'infinite-scroll',
    '[attr.data-disabled]': 'disabled() || null',
    '[attr.data-loading]': 'loading() || null',
  },
})
export class ScInfiniteScroll {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef<HTMLElement>);
  private readonly sentinel = contentChild.required(ScInfiniteScrollSentinel);

  readonly threshold = input<number>(100);
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly hasReachedEnd = input<boolean>(false);

  readonly loadMore = output<void>();

  private observer: IntersectionObserver | null = null;

  constructor() {
    afterNextRender(() => {
      const host = this.elementRef.nativeElement;
      const sentinelEl = this.sentinel().elementRef.nativeElement;

      this.observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (
            entry.isIntersecting &&
            !this.disabled() &&
            !this.loading() &&
            !this.hasReachedEnd()
          ) {
            this.loadMore.emit();
          }
        },
        {
          root: host,
          rootMargin: `${this.threshold()}px`,
          threshold: 0,
        },
      );

      this.observer.observe(sentinelEl);

      this.destroyRef.onDestroy(() => {
        this.observer?.disconnect();
      });
    });
  }

  scrollToTop(): void {
    this.elementRef.nativeElement.scrollTop = 0;
  }

  scrollToBottom(): void {
    const host = this.elementRef.nativeElement;
    host.scrollTop = host.scrollHeight;
  }
}
