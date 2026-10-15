import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The center's header: its title, its filters and buttons, in a row. */
@Directive({
  selector: 'div[scNotificationCenterHeader]',
  host: {
    'data-slot': 'notification-center-header',
    '[class]': 'class()',
  },
})
export class ScNotificationCenterHeader {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'flex items-center justify-between gap-2 border-b px-4 py-3',
      this.classInput(),
    ),
  );
}
