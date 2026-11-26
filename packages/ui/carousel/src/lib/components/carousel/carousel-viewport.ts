import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';

/**
 * The window the slides move in (Embla's viewport): what overflows is
 * clipped. A tab stop, so the arrows move it once focus is here, or after a
 * click on a slide. It writes where it sits in the carousel —
 * `--sc-carousel-viewport-top` and `--sc-carousel-viewport-bottom` on it —
 * so Previous and Next centre on the slides, not on the carousel with what
 * else it holds (its dots). Measured in the browser; until then, 0: the
 * carousel's own middle.
 */
@Directive({
  selector: 'div[scCarouselViewport]',
  host: {
    tabindex: '0',
    '[class]': 'class()',
  },
})
export class ScCarouselViewport {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Embla's viewport. */
  readonly element: HTMLElement = this.elementRef.nativeElement;

  private readonly class = computed(() =>
    cn(
      'focus-visible:ring-ring/50 overflow-hidden outline-none focus-visible:ring-[3px]',
      this.classInput(),
    ),
  );

  constructor() {
    const destroyRef = inject(DestroyRef);
    afterNextRender(() => {
      // The box the buttons are placed in, and offsetTop measures from: the
      // carousel (relative), whatever wraps the viewport.
      const carousel = this.element.offsetParent as HTMLElement | null;
      if (!carousel) return;
      const measure = () => {
        const top = this.element.offsetTop;
        const bottom =
          carousel.clientHeight - (top + this.element.offsetHeight);
        carousel.style.setProperty('--sc-carousel-viewport-top', `${top}px`);
        carousel.style.setProperty(
          '--sc-carousel-viewport-bottom',
          `${bottom}px`,
        );
      };
      // Its size, or the carousel's (dots, a caption, a resize).
      const observer = new ResizeObserver(measure);
      observer.observe(this.element);
      observer.observe(carousel);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
