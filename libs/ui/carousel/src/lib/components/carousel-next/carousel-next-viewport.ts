import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The window the slides move in (Embla's viewport): what overflows is clipped. */
@Directive({
  selector: 'div[scCarouselNextViewport]',
  host: {
    '[class]': 'class()',
  },
})
export class ScCarouselNextViewport {
  private readonly elementRef = inject(ElementRef<HTMLElement>);

  readonly classInput = input<string>('', { alias: 'class' });

  /** Embla's viewport. */
  readonly element: HTMLElement = this.elementRef.nativeElement;

  protected readonly class = computed(() =>
    cn('overflow-hidden', this.classInput()),
  );
}
