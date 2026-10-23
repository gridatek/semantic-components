import { Directive, computed, inject, input } from '@angular/core';
import {
  type ScButtonVariants,
  cn,
  injectPreset,
  ɵwarnIfUnnamed,
} from '@semantic-components/ui';
import { SC_NOTIFICATION_CENTER } from './notification-center';

/** Removes every notification (disabled when there are none). Write its icon and name it. */
@Directive({
  selector: 'button[scNotificationClearAll]',
  host: {
    '[class]': 'class()',
    type: 'button',
    'data-slot': 'notification-clear-all',
    '[disabled]': 'disabled()',
    '(click)': 'center.clear()',
  },
})
export class ScNotificationClearAll {
  private readonly buttonStyles = injectPreset().button;

  readonly classInput = input<string>('', { alias: 'class' });
  readonly variant = input<ScButtonVariants['variant']>('ghost');
  readonly size = input<ScButtonVariants['size']>('icon-sm');

  protected readonly class = computed(() =>
    cn(
      this.buttonStyles({ variant: this.variant(), size: this.size() }),
      this.classInput(),
    ),
  );

  protected readonly center = inject(SC_NOTIFICATION_CENTER);

  protected readonly disabled = computed(
    () => !this.center.notifications().length,
  );

  constructor() {
    ɵwarnIfUnnamed('scNotificationClearAll');
  }
}
