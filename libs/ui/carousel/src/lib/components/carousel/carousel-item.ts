import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScCarousel } from './carousel';

/**
 * A slide (`role="group"`): say what it is (`aria-roledescription`, your word
 * for "slide") and where (`aria-label`, e.g. "2 of 5": `index()` and
 * `count()` give you the numbers).
 */
@Directive({
  selector: 'div[scCarouselItem]',
  exportAs: 'scCarouselItem',
  host: {
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScCarouselItem {
  private readonly carousel = inject(ScCarousel);

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  /** Its place among the slides, from 0. */
  readonly index = computed(() => this.carousel.slides().indexOf(this.element));
  /** How many slides there are. */
  readonly count = computed(() => this.carousel.slides().length);

  constructor() {
    inject(DestroyRef).onDestroy(this.carousel.register(this.element));
  }

  protected readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      isHorizontal ? 'ps-4' : 'pt-4',
      this.classInput(),
    );
  });
}
