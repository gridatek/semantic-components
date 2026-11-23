import { Directive, ElementRef, computed, inject, input } from '@angular/core';
import { injectStyle } from '@semantic-components/ui';
import { cn } from 'cn';
import { ScCarouselNew } from './carousel-new';

/**
 * A page's indicator, a tab in the indicators' row: a click shows its page;
 * the current one is selected (`aria-selected`, wider, not only darker). A
 * 24px target (WCAG 2.5.8) that draws its mark itself; write its name
 * (`<span class="sr-only">Slide 2</span>`).
 */
@Directive({
  selector: 'button[scCarouselNewIndicator]',
  host: {
    type: 'button',
    role: 'tab',
    '[attr.aria-selected]': 'selected()',
    '[attr.aria-controls]': 'controls()',
    '[tabIndex]': 'selected() ? 0 : -1',
    '[class]': 'class()',
    '(click)': 'carousel.goTo(page())',
  },
})
export class ScCarouselNewIndicator {
  private readonly carousel = inject(ScCarouselNew);
  private readonly element =
    inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
  /** The style's corners for the indicator: its focus ring and its mark. */
  private readonly corners = injectStyle().carousel.dot;

  readonly classInput = input<string>('', { alias: 'class' });

  /** The page it shows (0 … the carousel's pageCount − 1). */
  readonly page = input.required<number>();

  /** Its page is the one shown. */
  readonly selected = computed(() => this.carousel.page() === this.page());

  /** The slides of its page. */
  private readonly controls = computed(
    () =>
      this.carousel
        .slidesOf(this.page())
        .map((slide) => slide.id)
        .filter(Boolean)
        .join(' ') || null,
  );

  /** @internal Focus, from the indicators' keys. */
  focus(): void {
    this.element.focus();
  }

  private readonly class = computed(() =>
    cn(
      'focus-visible:ring-ring/50 flex h-6 min-w-6 touch-manipulation items-center justify-center outline-none focus-visible:ring-[3px]',
      this.corners,
      "after:content-[''] after:transition-all motion-reduce:after:transition-none",
      this.corners
        .split(' ')
        .filter(Boolean)
        .map((corner) => `after:${corner}`),
      this.selected()
        ? 'after:bg-primary after:h-2 after:w-4 forced-colors:after:bg-[Highlight]'
        : 'after:bg-muted-foreground/50 after:size-2 forced-colors:after:bg-[ButtonText]',
      this.classInput(),
    ),
  );
}
