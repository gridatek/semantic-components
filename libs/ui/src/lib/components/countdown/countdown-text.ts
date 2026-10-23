import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScCountdown } from './countdown';

/**
 * The time left in words, in the app's language ("2 days, 3 hours, 4
 * minutes, 5 seconds") — for screen readers (visually hidden), or shown
 * (`class="not-sr-only"`). In a timer, it is read when reached, not as it
 * changes.
 */
@Directive({
  selector: '[scCountdownText]',
  host: {
    'data-slot': 'countdown-text',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScCountdownText {
  private readonly countdown = inject(ScCountdown);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly format = new Intl.DurationFormat(this.countdown.ɵlocale, {
    style: 'long',
  });
  /** Zero units are left out — all of them, at zero: then seconds show. */
  private readonly zero = new Intl.DurationFormat(this.countdown.ɵlocale, {
    style: 'long',
    secondsDisplay: 'always',
  });

  protected readonly text = computed(() => {
    const left = this.countdown.left();
    return this.countdown.done()
      ? this.zero.format({ seconds: 0 })
      : this.format.format(left);
  });

  protected readonly class = computed(() => cn('sr-only', this.classInput()));
}
