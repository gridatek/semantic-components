import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { ScCountdown } from './countdown';

/** A timer's time left as a ring that empties. Decorative; size it with classes, put the digits in it. */
@Component({
  selector: '[scCountdownRing]',
  template: `
    <svg
      viewBox="0 0 100 100"
      class="absolute inset-0 size-full -rotate-90"
      aria-hidden="true"
    >
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke-width="6"
        class="stroke-muted"
      />
      <circle
        cx="50"
        cy="50"
        r="45"
        fill="none"
        stroke-width="6"
        stroke-linecap="round"
        pathLength="100"
        class="stroke-primary transition-[stroke-dashoffset] duration-1000 ease-linear motion-reduce:transition-none"
        stroke-dasharray="100"
        [attr.stroke-dashoffset]="100 - left()"
      />
    </svg>
    <ng-content />
  `,
  host: {
    'data-slot': 'countdown-ring',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScCountdownRing {
  private readonly countdown = inject(ScCountdown);

  readonly classInput = input<string>('', { alias: 'class' });

  /** The share left, in percent. */
  protected readonly left = computed(
    () => (this.countdown.progress() ?? 1) * 100,
  );

  protected readonly class = computed(() =>
    cn('relative inline-grid size-40 place-items-center', this.classInput()),
  );
}
