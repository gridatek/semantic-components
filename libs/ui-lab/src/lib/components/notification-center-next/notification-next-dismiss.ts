import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  buttonVariants,
  cn,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { SC_NOTIFICATION_NEXT } from './notification-next';
import { SC_NOTIFICATION_NEXT_CENTER } from './notification-next-center';

/** Removes its notification. Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationNextDismiss]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'notification-dismiss',
    '(click)': 'center.dismiss(item.notification().id)',
  },
})
export class ScNotificationNextDismiss {
  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      buttonVariants({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly center = inject(SC_NOTIFICATION_NEXT_CENTER);
  protected readonly item = inject(SC_NOTIFICATION_NEXT);

  constructor() {
    ɵwarnIfUnnamed('scNotificationNextDismiss');
  }
}
