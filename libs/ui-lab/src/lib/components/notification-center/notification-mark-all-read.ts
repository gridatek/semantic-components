import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/** Marks every notification read (disabled when none is unread). Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationMarkAllRead]',
  host: {
    type: 'button',
    'data-slot': 'notification-mark-all-read',
    '[disabled]': 'disabled()',
    '(click)': 'center.markAllRead()',
  },
})
export class ScNotificationMarkAllRead {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);

  protected readonly disabled = computed(() => !this.center.unreadCount());

  constructor() {
    ɵwarnIfUnnamed('scNotificationMarkAllRead');
  }
}
