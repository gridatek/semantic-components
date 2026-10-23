import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';

/**
 * The host element's size, as signals: for what a template builds only when
 * there is room (`@if (size.width() >= 480)`). To hide something by width,
 * a CSS container query does it without JavaScript.
 *
 * SSR-safe: measured only in the browser, after the first render — until
 * then the size is 0, so a template starts with its narrowest layout.
 *
 * @example
 * <div scResizeObserver #size="scResizeObserver">
 *   @if (size.width() >= 480) {
 *     <button>…</button>
 *   }
 * </div>
 */
@Directive({
  selector: '[scResizeObserver]',
  exportAs: 'scResizeObserver',
  host: {
    '[class]': 'class()',
  },
})
export class ScResizeObserver {
  private readonly host = inject<ElementRef<Element>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() => cn(this.classInput()));

  /** Emits the latest entry each time the size changes. */
  readonly resizeObserver = output<ResizeObserverEntry>();

  private readonly size = signal({ width: 0, height: 0 });

  /** The content box's width, in CSS pixels (0 before it is measured). */
  readonly width = computed(() => this.size().width);

  /** The content box's height, in CSS pixels (0 before it is measured). */
  readonly height = computed(() => this.size().height);

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      if (typeof ResizeObserver === 'undefined') return;
      const observer = new ResizeObserver((entries) => {
        const entry = entries[entries.length - 1];
        const { width, height } = entry.contentRect;
        this.size.set({ width, height });
        this.resizeObserver.emit(entry);
      });
      observer.observe(this.host);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
