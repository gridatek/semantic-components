import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from '../../utils/cn/cn';
import { badgeVariants } from '../badge/badge';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/**
 * The unread count, as a badge — on the bell that opens the center: hidden
 * at none, `max`+ beyond it ("9+"). Visual only: name the bell with the
 * count yourself ("Notifications, 3 unread").
 */
@Directive({
  selector: '[scNotificationCount]',
  host: {
    'data-slot': 'notification-count',
    'aria-hidden': 'true',
    '[hidden]': '!center.unreadCount()',
    '[textContent]': 'text()',
    '[class]': 'class()',
  },
})
export class ScNotificationCount {
  protected readonly center = inject(SC_NOTIFICATION_CENTER);
  private readonly locale = inject(LOCALE_ID);

  readonly classInput = input<string>('', { alias: 'class' });
  /** The most shown; beyond it, `max`+. */
  readonly max = input(99);

  protected readonly text = computed(() => {
    const count = this.center.unreadCount();
    const format = new Intl.NumberFormat(this.locale);
    return count > this.max()
      ? `${format.format(this.max())}+`
      : format.format(count);
  });

  protected readonly class = computed(() =>
    cn(
      badgeVariants({ variant: 'default' }),
      'pointer-events-none absolute -end-1.5 -top-1.5 h-4 min-w-4 px-1 tabular-nums',
      this.classInput(),
    ),
  );
}
