import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
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
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly center = inject(SC_NOTIFICATION_CENTER);

  protected readonly disabled = computed(() => !this.center.unreadCount());

  constructor() {
    ɵwarnIfUnnamed('scNotificationMarkAllRead');
  }
}
