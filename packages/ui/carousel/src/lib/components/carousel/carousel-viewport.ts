import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';

/** The window the slides move in (Embla's viewport): what overflows is clipped. A tab stop, so the arrows move it once focus is here, or after a click on a slide. */
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
}
