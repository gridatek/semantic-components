import { Directive, computed, inject } from '@angular/core';
import { ɵwarnIfUnnamed } from '@semantic-components/ui';
import { SC_NOTIFICATION } from './notification';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/** Removes its notification. Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationDismiss]',
  host: {
    type: 'button',
    'data-slot': 'notification-dismiss',
    '[disabled]': 'disabled()',
    '(click)': 'center.dismiss(item.notification().id)',
  },
})
export class ScNotificationDismiss {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);
  protected readonly item = inject(SC_NOTIFICATION);

  protected readonly disabled = computed(() => false);

  constructor() {
    ɵwarnIfUnnamed('scNotificationDismiss');
  }
}
