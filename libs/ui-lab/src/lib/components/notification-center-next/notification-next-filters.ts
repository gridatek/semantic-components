import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The filter buttons, as a segmented control. Name it (`aria-label`). */
@Directive({
  selector: 'div[scNotificationNextFilters]',
  host: {
    'data-slot': 'notification-filters',
    role: 'group',
    '[class]': 'class()',
  },
})
export class ScNotificationNextFilters {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn(
      'bg-muted inline-flex items-center gap-0.5 rounded-lg p-0.5',
      this.classInput(),
    ),
  );
}
