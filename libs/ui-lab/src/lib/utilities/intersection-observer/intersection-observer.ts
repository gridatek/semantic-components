import {
  Directive,
  ElementRef,
  afterNextRender,
  booleanAttribute,
  computed,
  effect,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '@semantic-components/ui';

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
 *   once
 *   (intersectionObserver)="onIntersect($event)"
 * >
 *   {{ io.isIntersecting() ? 'Visible' : 'Hidden' }}
 * </div>
 */
@Directive({
  selector: '[scIntersectionObserver]',
  exportAs: 'scIntersectionObserver',
  host: {
    '[attr.data-intersecting]': 'isIntersecting()',
    '[class]': 'class()',
  },
})
export class ScIntersectionObserver {
  private readonly host = inject<ElementRef<Element>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  /** Visibility ratio(s) at which the observer fires. */
  readonly threshold = input<number | number[]>(0);

  /** Margin around the root, same syntax as CSS margin. */
  readonly rootMargin = input<string>('0px');

  /** Scrollable ancestor used as viewport. Defaults to the browser viewport. */
  readonly root = input<Element | Document | null>(null);

  /** Stop observing after the element becomes visible for the first time. */
  readonly once = input(false, { transform: booleanAttribute });

  /** Emits the latest entry each time the observer fires. */
  readonly intersectionObserver = output<IntersectionObserverEntry>();

  private readonly intersecting = signal(false);

  /** Current visibility of the host element. */
  readonly isIntersecting = this.intersecting.asReadonly();

  // Only true in the browser, so SSR never touches IntersectionObserver.
  private readonly browserReady = signal(false);

  // Set once a `once` observer has fired, so option changes don't restart it.
  private readonly done = signal(false);

  constructor() {
    afterNextRender(() => {
      if (typeof IntersectionObserver !== 'undefined') {
        this.browserReady.set(true);
      }
    });

    effect((onCleanup) => {
      if (!this.browserReady() || this.done()) return;

      const observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[entries.length - 1];
          this.intersecting.set(entry.isIntersecting);
          this.intersectionObserver.emit(entry);

          if (this.once() && entry.isIntersecting) {
            this.done.set(true);
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
