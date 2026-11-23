import { _IdGenerator } from '@angular/cdk/a11y';
import {
  DestroyRef,
  Directive,
  ElementRef,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScCarouselNew } from './carousel-new';

/**
 * A slide, a group: say what it is (`aria-roledescription`, your word for
 * "slide") and where (`aria-label`, "2 of 5" from `index()` and `count()`).
 * Less than half in view, it is inert: Tab and screen readers reach only what
 * shows. `data-active` in the current page, `data-in-view`.
 */
@Directive({
  selector: 'div[scCarouselNewItem]',
  exportAs: 'scCarouselNewItem',
  host: {
    role: 'group',
    '[id]': 'id()',
    '[attr.inert]': 'inView() ? null : ""',
    '[attr.data-active]': 'active() || null',
    '[attr.data-in-view]': 'inView() || null',
    '[class]': 'class()',
  },
})
export class ScCarouselNewItem {
  private readonly carousel = inject(ScCarouselNew);

  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly id = input(inject(_IdGenerator).getId('sc-carousel-item-'));

  /** Its place among the slides, from 0. */
  readonly index = computed(() => this.carousel.slides().indexOf(this.element));
  /** How many slides there are. */
  readonly count = computed(() => this.carousel.slides().length);
  /** In the current page. */
  readonly active = computed(() => this.carousel.isActive(this.element));
  /** At least half in view. */
  readonly inView = computed(() => this.carousel.isInView(this.element));

  constructor() {
    inject(DestroyRef).onDestroy(this.carousel.register(this.element));
  }

  private readonly class = computed(() => {
    const isHorizontal = this.carousel.orientation() === 'horizontal';
    return cn(
      'min-w-0 shrink-0 grow-0 basis-full',
      isHorizontal ? 'ps-4' : 'pt-4',
      this.classInput(),
    );
  });
}
