import {
  Component,
  ViewEncapsulation,
  computed,
  inject,
  input,
} from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScTimeClock } from './time-clock';

/**
 * The clock's header: the hour, the minute (the second) as the locale writes
 * them — each a button showing its view on the dial (pressed while shown) —
 * and, in 12 hours, AM and PM. Its own content: nothing to put inside it.
 */
@Component({
  selector: 'div[scTimeClockHeader]',
  template: `
    <div class="flex items-center" dir="ltr">
      @for (view of clock.views(); track view; let first = $first) {
        @if (!first) {
          <span aria-hidden="true" [class]="separatorClass()">{{
            clock.separator()
          }}</span>
        }
        <button
          type="button"
          data-slot="time-clock-view"
          [class]="viewClass()"
          [attr.aria-pressed]="clock.view() === view"
          [disabled]="clock.disabled()"
          (click)="clock.view.set(view)"
        >
          <span class="sr-only">{{ clock.names()[view] }}</span>
          {{ clock.partText(view) }}
        </button>
      }
    </div>
    @if (clock.twelveHours()) {
      <div class="flex flex-col gap-1">
        @for (period of periods; track period) {
          <button
            type="button"
            data-slot="time-clock-period"
            [class]="periodClasses()[period]"
            [attr.aria-pressed]="pressedPeriod() === period"
            [disabled]="clock.locked() || !clock.canPickPeriod(period)"
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
  private readonly buttonStyles = injectStyle().button;
  private readonly styles = injectStyle().timeClock;
  private readonly clock = inject(ScTimeClock);

  readonly classInput = input<string>('', { alias: 'class' });

  private readonly periods = ['am', 'pm'] as const;

  private readonly viewClass = computed(() =>
    cn(
      this.buttonStyles({ variant: 'ghost', size: 'lg' }),
      'h-12 px-2 tabular-nums aria-pressed:bg-accent aria-pressed:text-accent-foreground',
      this.styles.time,
    ),
  );
  private readonly separatorClass = computed(() => cn(this.styles.time));
  /** The period of the time picked; none while there is none. */
  private readonly pressedPeriod = computed(() =>
    this.clock.value() ? this.clock.period() : null,
  );
  /**
   * The pressed one filled (the default button), the other outlined: chosen
   * here, not by `aria-pressed:` classes, which the outline's dark background
   * outranks.
   */
  private readonly periodClasses = computed(() => {
    const pressed = this.pressedPeriod();
    const look = (period: 'am' | 'pm') =>
      cn(
        this.buttonStyles({
          variant: pressed === period ? 'default' : 'outline',
          size: 'xs',
        }),
      );
    return { am: look('am'), pm: look('pm') };
  });

  private readonly class = computed(() =>
    cn('flex items-center gap-3', this.classInput()),
  );
}
