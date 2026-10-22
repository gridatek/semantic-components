import { Directive, computed, inject, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import { SC_NOTIFICATION_NEXT } from './notification-next';

/**
 * The unread marker: a dot, shown while the notification is unread. Write
 * what it says to screen readers inside (`<span class="sr-only">Unread</span>`).
 */
@Directive({
  selector: '[scNotificationNextUnread]',
  host: {
    'data-slot': 'notification-unread',
    '[hidden]': 'item.notification().read',
    '[class]': 'class()',
  },
})
export class ScNotificationNextUnread {
  protected readonly item = inject(SC_NOTIFICATION_NEXT);
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-primary absolute start-2 top-5 size-1.5 rounded-full',
      this.classInput(),
    ),
  );
}
