import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/** Marks every notification read (disabled when none is unread). Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationMarkAllRead]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'notification-mark-all-read',
    '[disabled]': 'disabled()',
    '(click)': 'center.markAllRead()',
  },
})
export class ScNotificationMarkAllRead {
  private readonly buttonStyles = injectStyle().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  private readonly center = inject(SC_NOTIFICATION_CENTER);

  private readonly disabled = computed(() => !this.center.unreadCount());

  constructor() {
    ɵwarnIfUnnamed('scNotificationMarkAllRead');
  }
}
