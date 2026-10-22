import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { SC_NOTIFICATION_NEXT_CENTER } from './notification-next-center';

/** Marks every notification read (disabled when none is unread). Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationNextMarkAllRead]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'notification-mark-all-read',
    '[disabled]': 'disabled()',
    '(click)': 'center.markAllRead()',
  },
})
export class ScNotificationNextMarkAllRead {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly center = inject(SC_NOTIFICATION_NEXT_CENTER);

  protected readonly disabled = computed(() => !this.center.unreadCount());

  constructor() {
    ɵwarnIfUnnamed('scNotificationNextMarkAllRead');
  }
}
