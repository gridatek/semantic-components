import { Directive, InjectionToken, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';
import type { ScNotificationNext as ScNotificationNextData } from './notification-next-types';

export const SC_NOTIFICATION_NEXT = new InjectionToken<ScNotificationNextItem>(
  'SC_NOTIFICATION_NEXT',
);

/**
 * One notification, in a `scNotificationNextList`:
 * `<li [scNotificationNext]="notification">`. Its parts — icon, content, time,
 * unread marker, buttons — act on it. `data-read`, `data-type`.
 */
@Directive({
  selector: 'li[scNotificationNext]',
  exportAs: 'scNotificationNext',
  providers: [
    { provide: SC_NOTIFICATION_NEXT, useExisting: ScNotificationNextItem },
  ],
  host: {
    'data-slot': 'notification',
    '[attr.data-read]': 'notification().read',
    '[attr.data-type]': 'notification().type ?? null',
    '[class]': 'class()',
  },
})
export class ScNotificationNextItem {
  readonly notification = input.required<ScNotificationNextData>({
    alias: 'scNotificationNext',
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
