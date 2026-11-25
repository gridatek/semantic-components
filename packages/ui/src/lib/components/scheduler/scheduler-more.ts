import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ScScheduler } from './scheduler';

/**
 * Opens the day, for the events a month's day has no room for: in your
 * `scSchedulerMoreTemplate`, `[scSchedulerMore]="day"`. Write its text
 * ("2 more").
 */
@Directive({
  selector: 'button[scSchedulerMore]',
  host: {
    type: 'button',
    '[class]': 'class()',
    '(click)': 'scheduler.goTo(day(), "day")',
  },
})
export class ScSchedulerMore {
  private readonly scheduler = inject(ScScheduler);
  private readonly corners = injectStyle().scheduler.event;

  readonly day = input.required<Temporal.PlainDate>({
    alias: 'scSchedulerMore',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  private readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:bg-muted hover:text-foreground w-full px-1.5 py-0.5 text-start text-xs font-medium outline-none',
      this.corners,
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );
}
