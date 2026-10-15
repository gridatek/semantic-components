import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_NOTIFICATION_CENTER } from './notification-center';
import type { ScNotificationFilterValue } from './notification-types';

/**
 * Shows the notifications of one filter: `all`, `unread` or `read`
 * (`aria-pressed` when it is the center's). Write its text.
 */
@Directive({
  selector: 'button[scNotificationFilter]',
  host: {
    type: 'button',
    'data-slot': 'notification-filter',
    '[attr.aria-pressed]': 'pressed()',
    '[class]': 'class()',
    '(click)': 'center.filter.set(value())',
  },
})
export class ScNotificationFilter {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);

  readonly value = input.required<ScNotificationFilterValue>({
    alias: 'scNotificationFilter',
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
