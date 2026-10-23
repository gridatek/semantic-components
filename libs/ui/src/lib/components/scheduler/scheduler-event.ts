import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { SC_SCHEDULER_EVENT } from './scheduler-types';

/**
 * An event, the root of your `scSchedulerEventTemplate` (a `button` to open
 * it, or a `div`): a line in a month's day, a chip in the all-day row, a
 * block in the time grid. Write its title and `scSchedulerEventTime`.
 */
@Directive({
  selector: '[scSchedulerEvent]',
  host: {
    'data-slot': 'scheduler-event',
    '[attr.data-place]': 'context.place',
    '[attr.data-all-day]': 'context.event.allDay || null',
    '[class]': 'class()',
  },
})
export class ScSchedulerEvent {
  protected readonly context = inject(SC_SCHEDULER_EVENT);

  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex w-full min-w-0 rounded-md text-start text-xs outline-none transition-colors',
      'focus-visible:ring-3 focus-visible:ring-ring/50',
      'bg-primary/10 text-foreground hover:bg-primary/15',
      'data-[place=month]:items-center data-[place=month]:gap-1 data-[place=month]:px-1.5 data-[place=month]:py-0.5',
      'data-[place=all-day]:items-center data-[place=all-day]:gap-1 data-[place=all-day]:px-1.5 data-[place=all-day]:py-0.5',
      // In the time grid: title and time on a line while they fit, then wrapped.
      'data-[place=time]:size-full data-[place=time]:flex-wrap data-[place=time]:content-start data-[place=time]:gap-x-1 data-[place=time]:overflow-hidden data-[place=time]:border-s-2 data-[place=time]:border-primary data-[place=time]:px-1.5 data-[place=time]:py-0.5',
      '*:max-w-full *:truncate',
      this.classInput(),
    ),
  );
}
