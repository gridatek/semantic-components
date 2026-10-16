import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { ScCountdownNext } from './countdown-next';

/**
 * The time left in words, in the app's language ("2 days, 3 hours, 4
 * minutes, 5 seconds") — for screen readers (visually hidden), or shown
 * (`class="not-sr-only"`). In a timer, it is read when reached, not as it
 * changes.
 */
@Directive({
  selector: '[scCountdownNextText]',
  host: {
    'data-slot': 'countdown-text',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScCountdownNextText {
  private readonly countdown = inject(ScCountdownNext);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly format = new Intl.DurationFormat(this.countdown.ɵlocale, {
    style: 'long',
  });

  protected readonly text = computed(() => {
    const left = this.countdown.left();
    // Zero left is still a time: "0 seconds".
    return this.format.format(this.countdown.done() ? { seconds: 0 } : left);
  });

  protected readonly class = computed(() => cn('sr-only', this.classInput()));
}
