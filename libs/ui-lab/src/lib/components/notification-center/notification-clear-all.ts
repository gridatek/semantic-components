import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/** Removes every notification (disabled when there are none). Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationClearAll]',
  host: {
    type: 'button',
    'data-slot': 'notification-clear-all',
    '[disabled]': 'disabled()',
    '(click)': 'center.clear()',
  },
})
export class ScNotificationClearAll {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);

  protected readonly disabled = computed(
    () => !this.center.notifications().length,
  );

  constructor() {
    ɵwarnIfUnnamed('scNotificationClearAll');
  }
}
