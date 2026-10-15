import { Directive, InjectionToken, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { ScNotification as ScNotificationData } from './notification-types';

export const SC_NOTIFICATION = new InjectionToken<ScNotificationItem>(
  'SC_NOTIFICATION',
);

/**
 * One notification, in a `scNotificationList`:
 * `<li [scNotification]="notification">`. Its parts — icon, content, time,
 * unread marker, buttons — act on it. `data-read`, `data-type`.
 */
@Directive({
  selector: 'li[scNotification]',
  exportAs: 'scNotification',
  providers: [{ provide: SC_NOTIFICATION, useExisting: ScNotificationItem }],
  host: {
    'data-slot': 'notification',
    '[attr.data-read]': 'notification().read',
    '[attr.data-type]': 'notification().type ?? null',
    '[class]': 'class()',
  },
})
export class ScNotificationItem {
  readonly notification = input.required<ScNotificationData>({
    alias: 'scNotification',
  });
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'group/notification relative flex items-start gap-3 rounded-lg p-3 ps-5 transition-colors',
      'hover:bg-muted/50 data-[read=false]:bg-primary/5',
      this.classInput(),
    ),
  );
}
