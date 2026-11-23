import {
  Directive,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScCarousel } from './carousel';
import { ScCarouselIndicator } from './carousel-indicator';

/**
 * The indicators' row, a tablist (name it: `aria-label`), inside the
 * carousel: one tab stop; ← and → (mirrored right to left) move between its
 * indicators and show each one's position, Home and End the first and last.
 */
@Directive({
  selector: 'div[scCarouselIndicators]',
  host: {
    role: 'tablist',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScCarouselIndicators {
  private readonly carousel = inject(ScCarousel);
  private readonly indicators = contentChildren(ScCarouselIndicator, {
    descendants: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('flex items-center justify-center', this.classInput()),
  );

  private onKeydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const indicators = this.indicators();
    if (!indicators.length) return;
    const at = Math.max(
      0,
      indicators.findIndex((i) => i.selected()),
    );
    const rtl =
      getComputedStyle(event.currentTarget as Element).direction === 'rtl';
    let to: number;
    switch (event.key) {
      case rtl ? 'ArrowLeft' : 'ArrowRight':
        to = (at + 1) % indicators.length;
        break;
      case rtl ? 'ArrowRight' : 'ArrowLeft':
        to = (at - 1 + indicators.length) % indicators.length;
        break;
      case 'Home':
        to = 0;
        break;
      case 'End':
        to = indicators.length - 1;
        break;
      default:
        return;
    }
    // Handled here: the carousel's own arrows leave it.
    event.preventDefault();
    const indicator = indicators[to];
    this.carousel.activeIndex.set(indicator.index());
    indicator.focus();
  }
}
