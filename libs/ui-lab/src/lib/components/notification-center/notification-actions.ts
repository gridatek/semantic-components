import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** A notification's buttons and links (Reply, Mark as read, Dismiss…). */
@Directive({
  selector: 'div[scNotificationActions]',
  host: {
    'data-slot': 'notification-actions',
    '[class]': 'class()',
  },
})
export class ScNotificationActions {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-wrap items-center gap-1 pt-1', this.classInput()),
  );
}
