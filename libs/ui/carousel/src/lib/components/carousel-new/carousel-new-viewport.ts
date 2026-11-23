import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { cn } from 'cn';

/** The window the slides move in (Embla's viewport). */
@Directive({
  selector: 'div[scCarouselNewViewport]',
  host: {
    '[class]': 'class()',
  },
})
export class ScCarouselNewViewport {
  readonly classInput = input<string>('', { alias: 'class' });

  /** Embla's viewport. */
  readonly element: HTMLElement =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  private readonly class = computed(() =>
    cn('overflow-hidden', this.classInput()),
  );
}
