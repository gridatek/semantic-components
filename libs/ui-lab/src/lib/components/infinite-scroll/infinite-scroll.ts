import {
  ChangeDetectionStrategy,
  Component,
  computed,
  DestroyRef,
  ElementRef,
  inject,
  input,
  output,
  ViewEncapsulation,
  contentChild,
  afterNextRender,
} from '@angular/core';
import { cn } from '../../utils';
import { ScInfiniteScrollLoader } from './infinite-scroll-loader';
import { ScInfiniteScrollEnd } from './infinite-scroll-end';

@Component({
  selector: 'sc-infinite-scroll',
  exportAs: 'scInfiniteScroll',
  template: `
    <div #container [class]="containerClass()" (scroll)="onScroll($event)">
      <ng-content />

      @if (loading()) {
        <div [class]="loaderContainerClass()">
          <ng-content select="[sc-infinite-scroll-loader]" />
          @if (!hasCustomLoader()) {
            <div class="flex items-center justify-center gap-2 py-4">
              <svg
                class="size-5 animate-spin text-muted-foreground"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
              <span class="text-sm text-muted-foreground">Loading more...</span>
            </div>
          }
        </div>
      }

      @if (hasReachedEnd() && !loading()) {
        <div [class]="endContainerClass()">
          <ng-content select="[sc-infinite-scroll-end]" />
          @if (!hasCustomEnd()) {
            <div class="py-4 text-center text-sm text-muted-foreground">
              {{ endMessage() }}
            </div>
          }
        </div>
      }
    </div>
  `,
  host: {
    'data-slot': 'infinite-scroll',
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ScInfiniteScroll {
  private readonly destroyRef = inject(DestroyRef);
  private readonly elementRef = inject(ElementRef);

  readonly classInput = input<string>('', { alias: 'class' });
  readonly threshold = input<number>(100);
  readonly disabled = input<boolean>(false);
  readonly loading = input<boolean>(false);
  readonly hasReachedEnd = input<boolean>(false);
  readonly endMessage = input<string>('No more items to load');
  readonly direction = input<'down' | 'up'>('down');

  readonly loadMore = output<void>();

  private readonly customLoader = contentChild(ScInfiniteScrollLoader);
  private readonly customEnd = contentChild(ScInfiniteScrollEnd);

  protected readonly hasCustomLoader = computed(() => !!this.customLoader());
  protected readonly hasCustomEnd = computed(() => !!this.customEnd());

  private observer: IntersectionObserver | null = null;
  private sentinelEl: HTMLElement | null = null;

  protected readonly containerClass = computed(() =>
    cn('overflow-auto', this.classInput()),
  );

  protected readonly loaderContainerClass = computed(() => cn(''));

  protected readonly endContainerClass = computed(() => cn(''));

  constructor() {
    afterNextRender(() => {
      this.setupIntersectionObserver();

      this.destroyRef.onDestroy(() => {
        this.cleanup();
      });
    });
  }

  private setupIntersectionObserver(): void {
    // Create sentinel element
    this.sentinelEl = document.createElement('div');
    this.sentinelEl.style.height = '1px';
    this.sentinelEl.style.width = '100%';
    this.sentinelEl.setAttribute('data-sentinel', 'true');

    const container =
      this.elementRef.nativeElement.querySelector(
        '[data-slot="infinite-scroll"] > div',
      ) || this.elementRef.nativeElement;

    if (this.direction() === 'down') {
      container.appendChild(this.sentinelEl);
    } else {
      container.prepend(this.sentinelEl);
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
        root: container,
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

  onScroll(event: Event): void {
    // Fallback scroll-based detection
    const target = event.target as HTMLElement;
    const threshold = this.threshold();

    if (this.disabled() || this.loading() || this.hasReachedEnd()) return;

    if (this.direction() === 'down') {
      const scrollBottom =
        target.scrollHeight - target.scrollTop - target.clientHeight;
      if (scrollBottom <= threshold) {
        this.loadMore.emit();
      }
    } else {
      if (target.scrollTop <= threshold) {
        this.loadMore.emit();
      }
    }
  }

  scrollToTop(): void {
    const container = this.elementRef.nativeElement.querySelector('div');
    if (container) {
      container.scrollTop = 0;
    }
  }

  scrollToBottom(): void {
    const container = this.elementRef.nativeElement.querySelector('div');
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }
}
