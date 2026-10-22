import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** A list of notifications: write a `li[scNotificationNext]` for each of `visible()` (or of a section). */
@Directive({
  selector: 'ul[scNotificationNextList]',
  host: {
    'data-slot': 'notification-list',
    '[class]': 'class()',
  },
})
export class ScNotificationNextList {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex flex-col gap-1', this.classInput()),
  );
}
