import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
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
    'data-slot': 'scheduler-more',
    '[class]': 'class()',
    '(click)': 'scheduler.goTo(day(), "day")',
  },
})
export class ScSchedulerMore {
  protected readonly scheduler = inject(ScScheduler);

  readonly day = input.required<Temporal.PlainDate>({
    alias: 'scSchedulerMore',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:bg-muted hover:text-foreground w-full rounded-md px-1.5 py-0.5 text-start text-xs font-medium outline-none',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      this.classInput(),
    ),
  );
}
