import {
  Directive,
  computed,
  contentChildren,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { ScCarouselNew } from './carousel-new';
import { ScCarouselNewIndicator } from './carousel-new-indicator';

/**
 * The indicators' row, a tablist (name it: `aria-label`), inside the
 * carousel: one tab stop, the arrows move between its indicators and show
 * each one's page (mirrored right to left), Home and End the first and last.
 */
@Directive({
  selector: 'div[scCarouselNewIndicators]',
  host: {
    role: 'tablist',
    '[class]': 'class()',
    '(keydown)': 'onKeydown($event)',
  },
})
export class ScCarouselNewIndicators {
  private readonly carousel = inject(ScCarouselNew);
  private readonly indicators = contentChildren(ScCarouselNewIndicator, {
    descendants: true,
  });

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn('flex items-center justify-center', this.classInput()),
  );

  private onKeydown(event: KeyboardEvent): void {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    const indicators = this.indicators();
    const at = indicators.findIndex((i) => i.selected());
    if (!indicators.length) return;
    const rtl =
      getComputedStyle(event.currentTarget as Element).direction === 'rtl';
    let to: number;
    switch (event.key) {
      case rtl ? 'ArrowLeft' : 'ArrowRight':
      case 'ArrowDown':
        to = (at + 1) % indicators.length;
        break;
      case rtl ? 'ArrowRight' : 'ArrowLeft':
      case 'ArrowUp':
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
    // Handled here: the carousel's own keys leave it.
    event.preventDefault();
    const indicator = indicators[to];
    this.carousel.goTo(indicator.page());
    indicator.focus();
  }
}
