import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_NOTIFICATION } from './notification';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/** Marks its notification read — or unread again when it is. Name it from its state (`n.read ? "Mark as unread" : "Mark as read"`). */
@Directive({
  selector: 'button[scNotificationMarkRead]',
  host: {
    type: 'button',
    'data-slot': 'notification-mark-read',
    '[disabled]': 'disabled()',
    '(click)':
      'center.markRead(item.notification().id, !item.notification().read)',
  },
})
export class ScNotificationMarkRead {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);
  protected readonly item = inject(SC_NOTIFICATION);

  protected readonly disabled = computed(() => false);

  constructor() {
    ɵwarnIfUnnamed('scNotificationMarkRead');
  }
}
