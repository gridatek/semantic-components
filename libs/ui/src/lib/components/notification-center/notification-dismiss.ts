import { Directive, computed, inject, input } from '@angular/core';
import { cn } from 'cn';
import { injectStyle } from '../../config/style';
import { ɵwarnIfUnnamed } from '../../utils/accessible-name/accessible-name';
import { type ScButtonVariants } from '../button/button';
import { SC_NOTIFICATION } from './notification';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/** Removes its notification. Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationDismiss]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'notification-dismiss',
    '(click)': 'center.dismiss(item.notification().id)',
  },
})
export class ScNotificationDismiss {
  private readonly buttonStyles = injectStyle().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  private readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  private readonly center = inject(SC_NOTIFICATION_CENTER);
  private readonly item = inject(SC_NOTIFICATION);

  constructor() {
    ɵwarnIfUnnamed('scNotificationDismiss');
  }
}
