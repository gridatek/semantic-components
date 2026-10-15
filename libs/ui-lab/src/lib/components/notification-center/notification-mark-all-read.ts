import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_NOTIFICATION_CENTER } from './notification-center';
import { SC_NOTIFICATION_GROUP } from './notification-group';

/** Marks every notification read — in a `scNotificationGroup`, those of the group (disabled when none is unread). Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationMarkAllRead]',
  host: {
    type: 'button',
    'data-slot': 'notification-mark-all-read',
    '[disabled]': 'disabled()',
    '(click)': 'center.markAllRead(group?.id())',
  },
})
export class ScNotificationMarkAllRead {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);
  protected readonly group = inject(SC_NOTIFICATION_GROUP, { optional: true });

  protected readonly disabled = computed(
    () => !this.center.unreadIn(this.group?.id()),
  );

  constructor() {
    ɵwarnIfUnnamed('scNotificationMarkAllRead');
  }
}
