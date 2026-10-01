import {
  Directive,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';

/**
 * Observes when the host element enters or leaves a viewport (or a custom root).
 *
 * SSR-safe: the observer is only created in the browser, after the first render.
 * Changing any option recreates the observer.
 *
 * @example
 * <div
 *   scIntersectionObserver
 *   #io="scIntersectionObserver"
 *   [threshold]="[0, 0.5, 1]"
 *   rootMargin="100px"
 *   [once]="true"
 *   (intersectionObserver)="onIntersect($event)"
 * >
 *   {{ io.isIntersecting() ? 'Visible' : 'Hidden' }}
 * </div>
 */
@Directive({
  selector: '[scIntersectionObserver]',
  exportAs: 'scIntersectionObserver',
})
export class ScIntersectionObserver {
  private readonly host = inject<ElementRef<Element>>(ElementRef).nativeElement;

  /** Visibility ratio(s) at which the observer fires. */
  readonly threshold = input<number | number[]>(0);

  /** Margin around the root, same syntax as CSS margin. */
  readonly rootMargin = input<string>('0px');

  /** Scrollable ancestor used as viewport. Defaults to the browser viewport. */
  readonly root = input<Element | Document | null>(null);

  /** Stop observing after the element becomes visible for the first time. */
  readonly once = input<boolean>(false);

  /** Emits the latest entry each time the observer fires. */
  readonly intersectionObserver = output<IntersectionObserverEntry>();

  /** Current visibility of the host element. */
  readonly isIntersecting = signal(false);

  // Only true in the browser, so SSR never touches IntersectionObserver.
  private readonly browserReady = signal(false);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver !== 'undefined') {
        this.browserReady.set(true);
      }
    });

    effect((onCleanup) => {
      if (!this.browserReady()) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          this.isIntersecting.set(entry.isIntersecting);
          this.intersectionObserver.emit(entry);

          if (this.once() && entry.isIntersecting) {
            observer.disconnect();
          }
        },
        {
          root: this.root(),
          rootMargin: this.rootMargin(),
          threshold: this.threshold(),
        },
      );

      observer.observe(this.host);

      onCleanup(() => observer.disconnect());
    });
  }
}
