import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
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
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-xs');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly center = inject(SC_NOTIFICATION_CENTER);
  protected readonly item = inject(SC_NOTIFICATION);

  constructor() {
    ɵwarnIfUnnamed('scNotificationDismiss');
  }
}
