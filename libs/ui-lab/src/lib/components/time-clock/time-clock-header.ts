import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { buttonVariants, cn } from '@semantic-components/ui';
import { ScTimeClock } from './time-clock';

/**
 * The clock's header: the hour and the minute as the locale writes them —
 * each a button showing its view on the dial (pressed while shown) — and, in
 * 12 hours, AM and PM. Its own content: nothing to put inside it.
 */
@Component({
  selector: 'div[scTimeClockHeader]',
  template: `
    <div class="flex items-center">
      <button
        type="button"
        data-slot="time-clock-view"
        [class]="viewClass"
        [attr.aria-pressed]="clock.view() === 'hours'"
        [disabled]="clock.disabled()"
        (click)="clock.view.set('hours')"
      >
        <span class="sr-only">{{ clock.names().hours }}</span>
        {{ clock.hourText() }}
      </button>
      <span aria-hidden="true" class="text-3xl">{{ clock.separator() }}</span>
      <button
        type="button"
        data-slot="time-clock-view"
        [class]="viewClass"
        [attr.aria-pressed]="clock.view() === 'minutes'"
        [disabled]="clock.disabled()"
        (click)="clock.view.set('minutes')"
      >
        <span class="sr-only">{{ clock.names().minutes }}</span>
        {{ clock.minuteText() }}
      </button>
    </div>
    @if (clock.twelveHours()) {
      <div class="flex flex-col gap-1">
        @for (period of periods; track period) {
          <button
            type="button"
            data-slot="time-clock-period"
            [class]="periodClass"
            [attr.aria-pressed]="!!clock.value() && clock.period() === period"
            [disabled]="clock.disabled() || !clock.canPickPeriod(period)"
            (click)="clock.setPeriod(period)"
          >
            {{ clock.periodText(period) }}
          </button>
        }
      </div>
    }
  `,
  host: {
    'data-slot': 'time-clock-header',
    '[class]': 'class()',
  },
  encapsulation: ViewEncapsulation.None,
})
export class ScTimeClockHeader {
  protected readonly clock = inject(ScTimeClock);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly periods = ['am', 'pm'] as const;

  protected readonly viewClass = cn(
    buttonVariants({ variant: 'ghost', size: 'lg' }),
    'h-12 px-2 text-3xl font-medium tabular-nums aria-pressed:bg-accent aria-pressed:text-accent-foreground',
  );
  protected readonly periodClass = cn(
    buttonVariants({ variant: 'outline', size: 'xs' }),
    'aria-pressed:bg-primary aria-pressed:text-primary-foreground aria-pressed:border-primary',
  );

  protected readonly class = computed(() =>
    cn('flex items-center gap-3', this.classInput()),
  );
}
