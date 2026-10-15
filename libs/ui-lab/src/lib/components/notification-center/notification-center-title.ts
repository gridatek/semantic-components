import { Directive, computed, input } from '@angular/core';
import { cn } from '@semantic-components/ui';

/** The center's title — a heading of yours (`h2`, `h3`…). */
@Directive({
  selector: '[scNotificationCenterTitle]',
  host: {
    'data-slot': 'notification-center-title',
    '[class]': 'class()',
  },
})
export class ScNotificationCenterTitle {
  readonly classInput = input<string>('', { alias: 'class' });

  protected readonly class = computed(() =>
    cn('flex items-center gap-2 text-base font-semibold', this.classInput()),
  );
}
