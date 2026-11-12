import { Directive, LOCALE_ID, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
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
      // A counter, not a label: a filled pill in every preset (sera's badges
      // are bare text).
      'bg-primary text-primary-foreground pointer-events-none absolute -end-1.5 -top-1.5 inline-flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-xs font-medium whitespace-nowrap tabular-nums',
      this.classInput(),
    ),
  );
}
