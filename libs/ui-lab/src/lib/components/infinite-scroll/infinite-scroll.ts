import {
  DestroyRef,
  Directive,
  ElementRef,
  InjectionToken,
  afterNextRender,
  inject,
  input,
  output,
} from '@angular/core';

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

  readonly threshold = input<number>(100);
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly hasReachedEnd = input<boolean>(false);
  readonly direction = input<'down' | 'up'>('down');

  readonly loadMore = output<void>();

  private observer: IntersectionObserver | null = null;
  private sentinelEl: HTMLElement | null = null;

  constructor() {
    afterNextRender(() => {
      this.setupIntersectionObserver();

      this.destroyRef.onDestroy(() => {
        this.cleanup();
      });
    });
  }

  private setupIntersectionObserver(): void {
    const host = this.elementRef.nativeElement;

    this.sentinelEl = document.createElement('div');
    this.sentinelEl.style.height = '1px';
    this.sentinelEl.style.width = '100%';
    this.sentinelEl.setAttribute('data-sentinel', 'true');

    if (this.direction() === 'down') {
      host.appendChild(this.sentinelEl);
    } else {
      host.prepend(this.sentinelEl);
    }

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

    this.observer.observe(this.sentinelEl);
  }

  private cleanup(): void {
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
    if (this.sentinelEl) {
      this.sentinelEl.remove();
      this.sentinelEl = null;
    }
  }

  scrollToTop(): void {
    this.elementRef.nativeElement.scrollTop = 0;
  }

  scrollToBottom(): void {
    const host = this.elementRef.nativeElement;
    host.scrollTop = host.scrollHeight;
  }
}
