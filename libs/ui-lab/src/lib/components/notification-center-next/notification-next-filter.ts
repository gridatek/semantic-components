import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_NOTIFICATION_NEXT_CENTER } from './notification-next-center';
import type { ScNotificationNextFilterValue } from './notification-next-types';

/**
 * Shows the notifications of one filter: `all` or `unread`
 * (`aria-pressed` when it is the center's). Write its text.
 */
@Directive({
  selector: 'button[scNotificationNextFilter]',
  host: {
    type: 'button',
    'data-slot': 'notification-filter',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'class()',
    '(click)': 'center.filter.set(value())',
  },
})
export class ScNotificationNextFilter {
  protected readonly center = inject(SC_NOTIFICATION_NEXT_CENTER);

  readonly value = input.required<ScNotificationNextFilterValue>({
    alias: 'scNotificationNextFilter',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly pressed = computed(
    () => this.center.filter() === this.value(),
  );

  protected readonly class = computed(() =>
    cn(
      'text-muted-foreground hover:text-foreground focus-visible:ring-ring/50 rounded-md px-2.5 py-1 text-xs font-medium outline-none transition-colors focus-visible:ring-3',
      'aria-pressed:bg-background aria-pressed:text-foreground aria-pressed:shadow-sm',
      this.classInput(),
    ),
  );
}
