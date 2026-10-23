import { Directive, computed, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';

/** A list of notifications: write a `li[scNotification]` for each of `visible()` (or of a section). */
@Directive({
  selector: 'ul[scNotificationList]',
  host: {
    'data-slot': 'notification-list',
    '[class]': 'class()',
  },
})
export class ScNotificationList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-1', this.classInput()),
  );
}
