import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_NOTIFICATION_CENTER } from './notification-center';
import { SC_NOTIFICATION_GROUP } from './notification-group';

/** Removes every notification — in a `scNotificationGroup`, those of the group (disabled when there are none). Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationClearAll]',
  host: {
    type: 'button',
    'data-slot': 'notification-clear-all',
    '[disabled]': 'disabled()',
    '(click)': 'center.clear(group?.id())',
  },
})
export class ScNotificationClearAll {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);
  protected readonly group = inject(SC_NOTIFICATION_GROUP, { optional: true });

  protected readonly disabled = computed(() => {
    const group = this.group?.id();
    return !this.center
      .notifications()
      .some((n) => group === undefined || n.group === group);
  });

  constructor() {
    ɵwarnIfUnnamed('scNotificationClearAll');
  }
}
